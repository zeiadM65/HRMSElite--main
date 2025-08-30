import cors from 'cors';
import type { CorsOptions } from 'cors';
import { env } from '../utils/env';

/**
 * Enhanced CORS Configuration for HRMS Elite
 * Provides secure cross-origin resource sharing with fail-closed security
 */

// Read CORS_ORIGINS from validated env; provide sensible defaults in development
const raw = env.CORS_ORIGINS || '';
let ALLOWED = raw.split(',').map(s => s.trim()).filter(Boolean);

// Development defaults (only if no origins specified)
if (!ALLOWED.length && env.NODE_ENV !== 'production') {
  ALLOWED = [
    'http://localhost:3000',
    'http://localhost:3001', 
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ];
}

// Security: Fail closed if no origins specified in production
if (!ALLOWED.length) {
  throw new Error('CORS_ORIGINS must be set for security');
}

const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    // Security: Block requests without origin in production
    if (!origin && env.NODE_ENV === 'production') {
      return cb(new Error('CORS: Origin required in production'), false);
    }
    
    // Allow requests without origin in development (e.g., Postman, curl)
    if (!origin && env.NODE_ENV !== 'production') {
      return cb(null, true);
    }
    
    // Check if origin is allowed
    if (ALLOWED.includes(origin)) {
      return cb(null, true);
    }
    
    // Log blocked origins for security monitoring
    console.warn(`CORS blocked origin: ${origin}`);
    return cb(new Error('CORS: Origin not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-CSRF-Token', 
    'If-None-Match', 
    'If-Match',
    'X-Requested-With'
  ],
  exposedHeaders: ['ETag'],
  maxAge: 600,
  // Security: Prevent preflight caching for too long
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Export CORS options for testing and configuration
export { corsOptions };

// Export configured CORS middleware
export default cors(corsOptions);
