import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Image optimization
import viteImagemin from 'vite-plugin-imagemin';
// Security: Prevents source map exposure in production
import sri from 'vite-plugin-sri';
import { execSync } from 'child_process';
import path from 'path';
import { promises as fs } from 'fs';
import { glob } from 'glob';

function secureSourceMaps() {
  return {
    name: 'secure-source-maps',
    apply: 'build',
    async closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      
      // Remove any source map files that might have been created
      const mapFiles = await glob('**/*.map', { cwd: distDir });
      for (const file of mapFiles) {
        const filePath = path.join(distDir, file);
        await fs.unlink(filePath);
      }

      // Remove sourceMappingURL comments from all bundle files
      const bundleFiles = await glob('**/*.{js,css}', { cwd: distDir });
      for (const file of bundleFiles) {
        const filePath = path.join(distDir, file);
        const code = await fs.readFile(filePath, 'utf8');
        await fs.writeFile(
          filePath,
          code.replace(/\n?\/\/\# sourceMappingURL=.*\.map\n?/g, '\n'),
          'utf8'
        );
      }
    },
  };
}

const buildHash = execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  define: {
    __BUILD_HASH__: JSON.stringify(buildHash),
  },
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 3, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75, progressive: true },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'cleanupIDs', active: true },
        ],
      },
    }),
    sri(),
    secureSourceMaps(),
  ],
  build: {
    sourcemap: false,
    manifest: true,
    // Keep warning limit modest to surface large chunks during dev
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Create a separate vendor chunk to keep the main entry small
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Ensure no source maps are generated
        sourcemap: false,
      },
    },
  },
});

