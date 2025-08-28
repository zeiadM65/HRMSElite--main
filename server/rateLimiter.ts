import { rateLimit, MemoryStore } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { createClient } from 'redis';

// Prefer Redis if available; gracefully fall back to in-memory store in development
let store: InstanceType<typeof RedisStore> | MemoryStore;
try {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: { connectTimeout: 1000 }
  });
  await client.connect();
  client.on('error', () => {/* non-fatal in dev */});
  store = new RedisStore({ sendCommand: (...a: string[]) => client.sendCommand(a) }) as any;
} catch {
  store = new MemoryStore();
}

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  store,
  skipFailedRequests: false
});
