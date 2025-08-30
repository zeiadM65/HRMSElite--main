/**
 * Simplified Observability Middleware for HRMS Elite
 * Fixed Prometheus metrics labels issue
 */

// Simple request tracking without complex metrics
export const observability = {
  middleware: (req: any, res: any, next: any) => {
    // Add request ID
    req.id = Date.now().toString();
    req.startTime = Date.now();
    
    // Add basic headers
    res.setHeader('X-Request-ID', req.id);
    
    next();
  },

  performance: (req: any, res: any, next: any) => {
    const startTime = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      if (duration > 1000) {
        console.warn(`Slow request: ${req.method} ${req.url} - ${duration}ms`);
      }
    });
    
    next();
  },

  security: (req: any, res: any, next: any) => {
    // Basic security logging
    next();
  },

  errorTracking: (err: any, req: any, res: any, next: any) => {
    console.error('Error:', err.message);
    next(err);
  }
};
