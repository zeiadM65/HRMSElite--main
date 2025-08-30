import session from 'express-session';
import { RedisStore } from 'connect-redis';
import Redis from 'ioredis';
import { env } from './env';
import { log } from './logger';

export function createSessionMiddleware() {
  // Use in-memory store in development when REDIS_URL is not set
  const useMemoryStore = env.NODE_ENV !== 'production' && !env.REDIS_URL;

  const store = useMemoryStore
    ? new (session as any).MemoryStore()
    : new RedisStore({
        client: new Redis(env.REDIS_URL || 'redis://localhost:6379'),
      });

  if (!useMemoryStore) {
    // Attach error handler only when using Redis
    (store as any).client?.on?.('error', (err: Error) => {
      log.error('Redis connection error', { error: err }, 'SESSION');
    });
  } else {
    log.warn('Using MemoryStore for sessions (development only). Do not use in production.', {}, 'SESSION');
  }

  return session({
    store,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: env.NODE_ENV === 'production' ? '__Host-hrms-elite-session' : 'hrms-elite-session',
    cookie: {
      // Only secure cookies in production; dev runs on http://localhost
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    },
  });
}
