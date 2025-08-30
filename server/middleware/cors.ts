
import type { CorsOptions } from 'cors';

const ALLOWED = (process.env.CORS_ORIGINS ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

if (ALLOWED.length === 0) {
  throw new Error('CORS_ORIGINS empty: failing closed');
}

const isAllowed = (origin?: string) => !!origin && ALLOWED.includes(origin);

export const strictCors: CorsOptions = {
  origin(origin, cb) {
    const allowed = isAllowed(origin);
    cb(allowed ? null : new Error('CORS blocked'), allowed);
  },
  credentials: process.env.CORS_ALLOW_CREDENTIALS === 'true',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'X-CSRF-Token',
    'X-Requested-With',
    'Authorization'
  ]
};

export default strictCors;

