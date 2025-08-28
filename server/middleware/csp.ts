import { contentSecurityPolicy } from 'helmet';
export const csp = contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'strict-dynamic'", "'nonce-{nonce}'"],
    "style-src": ["'self'"],
    "connect-src": ["'self'", "https://trusted-domain.com"],  // اضغط على دومينات موثوقة فقط
    "object-src": ["'none'"],
    "frame-ancestors": ["'none'"]
  }
});
