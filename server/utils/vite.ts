import express, { type Express } from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer, createLogger } from 'vite';
import { type Server } from 'http';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import { log } from './logger';
import { getLocale } from './errorMessages';

const viteLogger = createLogger();

export function logVite (message: string, source = 'express') {

  const formattedTime = new Date().toLocaleTimeString('en-US', {
    'hour': 'numeric',
    'minute': '2-digit',
    'second': '2-digit',
    'hour12': true
  });

  log.info(`${formattedTime} [${source}] ${message}`, undefined, 'VITE');

}

export async function setupVite (app: Express, server: Server) {

  const serverOptions = {
    'hmr': {server},
    'allowedHosts': true as const
  };

  const vite = await createViteServer({
    // Let Vite load its own config file to avoid TS importing it here
    'configFile': true,
    'customLogger': {
      ...viteLogger,
      'error': (msg, options) => {

        viteLogger.error(msg, options);
        process.exit(1);

      }
    },
    'server': serverOptions,
    'appType': 'custom'
  });

  app.use(vite.middlewares);
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const clientTemplate = path.resolve(__dirname, '..', '..', 'client', 'index.html');
      let template = await fs.promises.readFile(clientTemplate, 'utf-8');
      template = template.replace(
        'src="/src/main.tsx"',
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const locale = getLocale(req.headers['accept-language']);
      const dir = locale === 'ar' ? 'rtl' : 'ltr';
      template = template
        .replace('%LANG%', locale)
        .replace('%DIR%', dir);

      const page = await vite.transformIndexHtml(url, template);
      res
        .status(200)
        .set({ 'Content-Type': 'text/html', 'Content-Language': locale })
        .end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

}

export function serveStatic (app: Express) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.resolve(__dirname, '..', '..', 'dist');

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath, { index: false }));

  app.get('*', (req, res, next) => {
    try {
      const locale = getLocale(req.headers['accept-language']);
      const dir = locale === 'ar' ? 'rtl' : 'ltr';
      const indexPath = path.resolve(distPath, 'index.html');
      let template = fs.readFileSync(indexPath, 'utf-8');
      template = template.replace('%LANG%', locale).replace('%DIR%', dir);

      // Inject CSP nonce into module scripts and inline styles in production
      const nonce: string = (res.locals as any).cspNonce || '';
      if (nonce) {
        // Add nonce to <script type="module" ...> (with or without quotes)
        template = template.replace(
          /<script(?![^>]*\bnonce=)([^>]*\btype=("|')module\2[^>]*)>/g,
          (_m, attrs) => `<script nonce="${nonce}"${attrs}>`
        );
        template = template.replace(
          /<script(?![^>]*\bnonce=)([^>]*\btype=module[^>]*)>/g,
          (_m, attrs) => `<script nonce="${nonce}"${attrs}>`
        );
        // Add nonce to inline <style> tags when missing or replace existing
        template = template
          .replace(/<style(?![^>]*\bnonce=)([^>]*)>/g, (_m, attrs) => `<style nonce="${nonce}"${attrs}>`)
          .replace(/<style[^>]*\bnonce="[^"]*"/g, (m) => m.replace(/nonce="[^"]*"/, `nonce="${nonce}"`));
      }
      res
        .status(200)
        .set({ 'Content-Type': 'text/html', 'Content-Language': locale })
        .send(template);
    } catch (e) {
      next(e);
    }
  });
}
