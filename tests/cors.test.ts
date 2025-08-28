/**
 * @fileoverview CORS allow-list enforcement tests
 */

import './test-env.js';
import express from 'express';
import request from 'supertest';
import cors from 'cors';

let strictCors: any;

describe('Strict CORS middleware', () => {
  let app: express.Application;

  beforeEach(async () => {
    process.env.CORS_ORIGINS = 'https://allowed.example';
    delete process.env.INTERNAL_CIDR_ALLOWLIST;
    ({ strictCors } = await import('../server/middleware/cors'));

    app = express();
    app.use(cors(strictCors));
    app.get('/test', (_req, res) => res.json({ ok: true }));
  });

  it('rejects requests with disallowed Origin', async () => {
    await request(app)
      .get('/test')
      .set('Origin', 'https://evil.example')
      .expect(500);
  });

  it('rejects requests with no Origin header', async () => {
    await request(app).get('/test').expect(500);
  });

  it('allows requests from allowed Origin', async () => {
    const res = await request(app)
      .get('/test')
      .set('Origin', 'https://allowed.example')
      .expect(200);
    expect(res.headers['access-control-allow-origin']).toBe(
      'https://allowed.example'
    );
  });
});
