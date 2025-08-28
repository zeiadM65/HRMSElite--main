import cors from 'cors';
import type { CorsOptions } from 'cors';
import { env } from '../utils/env';

// Read CORS_ORIGINS from validated env; provide sensible defaults in development
const raw = env.CORS_ORIGINS || '';
let ALLOWED = raw.split(',').map(s => s.trim()).filter(Boolean);
if (!ALLOWED.length && env.NODE_ENV !== 'production') {
  ALLOWED = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178', 'http://localhost:5179'];
}
if (!ALLOWED.length) {
  throw new Error('CORS_ORIGINS must be set');
}

const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(new Error('CORS: Missing Origin'), false);
    if (ALLOWED.includes(origin)) return cb(null, true);
    return cb(new Error('CORS: Origin not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'If-None-Match', 'If-Match'],
  exposedHeaders: ['ETag'],
  maxAge: 600,
};

export default cors(corsOptions);
