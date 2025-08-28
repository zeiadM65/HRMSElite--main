import { Request, Response, NextFunction } from 'express';

export function coopCoep(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Cross-Origin-Opener-Policy','same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy','require-corp');
  }
  next();
}
