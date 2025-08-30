import { rateLimit, MemoryStore, Store } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { createClient } from 'redis';
import { log } from '../utils/logger';

// Initialize rate limit store with Redis and fallback to in-memory store
let rateLimitStore: Store;
try {
  const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: { connectTimeout: 1000 }
  });
  await redisClient.connect();
  redisClient.on('error', (err) => {
    log.error('Redis connection error for rate limiter', { error: err }, 'SECURITY');
  });
  rateLimitStore = new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(...args),
  });
} catch (err) {
  log.warn('Redis unavailable for rate limiter, falling back to in-memory store', { error: err }, 'SECURITY');
  rateLimitStore = new MemoryStore();
}

// Rate limiting configuration
export const rateLimitConfig = {
  // General API rate limiting
  general: rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '60'), // 60 requests per window
    userMax: parseInt(process.env.RATE_LIMIT_USER_MAX_REQUESTS || '120'), // 120 requests per user
    burstWindowMs: 60 * 1000, // 1 minute burst window
    burstMax: 20, // max 20 requests per burst
    message: {
      error: 'تم تجاوز حد الطلبات',
      message: 'يرجى المحاولة مرة أخرى بعد فترة',
      retryAfter: '15 دقيقة',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    store: rateLimitStore,
  }),

  // Login rate limiting (stricter)
  login: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 login attempts per window
    userMax: 5, // 5 login attempts per user
    message: {
      error: 'تم تجاوز حد محاولات تسجيل الدخول',
      message: 'يرجى المحاولة مرة أخرى بعد 15 دقيقة',
      retryAfter: '15 دقيقة',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
    store: rateLimitStore,
  }),

  // Document upload rate limiting
  document: rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // 10 uploads per window
    userMax: 20, // 20 uploads per user
    message: {
      error: 'تم تجاوز حد رفع الملفات',
      message: 'يرجى المحاولة مرة أخرى بعد 5 دقائق',
      retryAfter: '5 دقائق',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    store: rateLimitStore,
  }),

  // Search rate limiting
  search: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // 30 search requests per window
    userMax: 60, // 60 search requests per user
    message: {
      error: 'تم تجاوز حد عمليات البحث',
      message: 'يرجى المحاولة مرة أخرى بعد دقيقة',
      retryAfter: '1 دقيقة',
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    store: rateLimitStore,
  }),

  // Default rate limiter (fallback)
  default: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // 60 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    store: rateLimitStore,
    skipFailedRequests: false,
  }),
};

// Export individual limiters for specific use cases
export const generalLimiter = rateLimitConfig.general;
export const loginLimiter = rateLimitConfig.login;
export const documentLimiter = rateLimitConfig.document;
export const searchLimiter = rateLimitConfig.search;
export const defaultLimiter = rateLimitConfig.default;

// Export the store for other uses
export { rateLimitStore };
