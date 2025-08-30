// Minimal shims to unblock type-check without full Node types
declare module 'fs' { const anyFs: any; export = anyFs; }
declare module 'path' { const anyPath: any; export = anyPath; }
declare module 'glob' { const anyGlob: any; export = anyGlob; }

// Vite plugins without shipped types in this project
declare module '@tailwindcss/vite';
declare module '@replit/vite-plugin-runtime-error-modal';
declare module '@replit/vite-plugin-cartographer';
declare module 'wouter';

// Common asset/module shims
declare module '*.svg' { const src: string; export default src; }
declare module '*.png' { const src: string; export default src; }
declare module '*.jpg' { const src: string; export default src; }

// Minimal process/import.meta to satisfy usage
declare const process: any;
interface ImportMeta { url: string; env?: Record<string, unknown>; }

export {};
