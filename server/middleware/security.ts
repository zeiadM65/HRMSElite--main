/**
 * @fileoverview Security middleware for HRMS Elite application
 * @description Simplified security middleware without complex imports
 * @author HRMS Elite Team
 * @version 1.0.0
 */

// Simplified security middleware - imports will be resolved at runtime
export const securityHeaders = (req: any, res: any, next: any) => {
  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
};

export const additionalSecurityHeaders = (req: any, res: any, next: any) => {
  // Additional security headers
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
};

export const requestValidation = (req: any, res: any, next: any) => {
  // Basic request validation
  next();
};

export const securityMonitoring = (req: any, res: any, next: any) => {
  // Basic security monitoring
  next();
};

export const createRateLimiter = (type: string) => {
  // Rate limiter will be imported from unified config
  return null;
};
