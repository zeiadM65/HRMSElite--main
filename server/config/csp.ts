import type { RequestHandler } from 'express';

const raw = process.env.CSP_CONNECT_ORIGINS || '';
const allow = raw.split(' ').map(s => s.trim()).filter(Boolean);
const bad = allow.find(a => a === '*' || /^https:$/.test(a) || /^wss:$/.test(a) || /^http:/.test(a));
if (bad) {
  throw new Error(`Insecure connect-src entry: ${bad}`);
}

export function buildCspHeader(nonce: string): string {
  const connect = ["'self'", ...allow].join(' ');
  return [
    "default-src 'self'",
    `script-src 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data:",
    `connect-src ${connect}`,
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'"
  ].join('; ');
}

export const csp: RequestHandler = (_req, res, next) => {
  res.setHeader('Content-Security-Policy', buildCspHeader(res.locals.cspNonce));
  next();
};
