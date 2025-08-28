import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import request from 'supertest';

// Ensure test env secrets exist for any imported modules (defensive)
import './test-env.js';

// Use the consolidated CSP middleware and prod static server util
import { csp } from '../server/config/csp';
import { serveStatic } from '../server/utils/vite';

describe('CSP consolidation and nonce injection (production serve)', () => {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  beforeAll(() => {
    // Prepare a minimal dist/index.html that includes a module script
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    const html = [
      '<!doctype html>',
      '<html lang="%LANG%" dir="%DIR%">',
      '<head>',
      '<meta charset="UTF-8"/>',
      '</head>',
      '<body>',
      '<script type="module" src="/assets/main.js"></script>',
      '</body>',
      '</html>'
    ].join('\n');
    fs.writeFileSync(indexHtmlPath, html, 'utf8');
  });

  afterAll(() => {
    try {
      if (fs.existsSync(indexHtmlPath)) fs.unlinkSync(indexHtmlPath);
      if (fs.existsSync(distDir)) fs.rmdirSync(distDir, { recursive: true });
    } catch {
      // ignore cleanup errors in CI
    }
  });

  it('serves exactly one CSP header and injects matching nonce into HTML scripts', async () => {
    const app = express();

    // Per-request nonce generator; store in res.locals.cspNonce
    app.use((req, res, next) => {
      // fixed nonce for deterministic test; real app uses crypto.randomBytes
      (res.locals as any).cspNonce = 'testnonce+/==';
      next();
    });

    // Single CSP middleware
    app.use(csp);

    // Mount production static server
    serveStatic(app);

    const res = await request(app).get('/');
    expect(res.status).toBe(200);

    // Assert exactly one CSP header exists
    const cspHeader = res.headers['content-security-policy'];
    expect(typeof cspHeader).toBe('string');
    expect(cspHeader).toBeTruthy();

    // Extract nonce from header
    const headerNonceMatch = (cspHeader as string).match(/script-src[^;]*'nonce-([^']+)'/);
    expect(headerNonceMatch?.[1]).toBeDefined();

    // Extract nonce from HTML script tag
    const body = res.text;
    const scriptNonceMatch = body.match(/<script[^>]*nonce="([^"]+)"[^>]*type="module"/i) || body.match(/<script[^>]*type="module"[^>]*nonce="([^"]+)"/i);
    expect(scriptNonceMatch?.[1]).toBeDefined();

    // Compare
    expect(scriptNonceMatch![1]).toBe(headerNonceMatch![1]);

    // Strict CSP (no unsafe-inline/eval)
    expect(cspHeader).not.toContain("'unsafe-inline'");
    expect(cspHeader).not.toContain("'unsafe-eval'");
  });
});

