"use strict";
/**
 * @fileoverview Security middleware for HRMS Elite application
 * @description Comprehensive security middleware including rate limiting, input validation,
 * security headers, and error handling for the HRMS application
 * @author HRMS Elite Team
 * @version 1.0.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityConfig = exports.cspUtils = exports.enhancedRateLimiters = exports.rateLimiters = exports.apiKeyAuth = exports.securityMonitoring = exports.ipWhitelist = exports.requestValidation = exports.additionalSecurityHeaders = exports.securityHeaders = exports.createRateLimiter = exports.createEnhancedRateLimiter = void 0;
var express_rate_limit_1 = __importStar(require("express-rate-limit"));
var helmet_1 = __importDefault(require("helmet"));
var node_crypto_1 = __importDefault(require("node:crypto"));
var logger_1 = require("../utils/logger");
var sanitize_1 = require("../utils/sanitize");
var rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
var ioredis_1 = __importDefault(require("ioredis"));
// Initialize rate limit store with Redis and fallback to in-memory store if Redis is unavailable
var rateLimitStore;
try {
    var redisClient_1 = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379', {
        connectTimeout: 1000,
    });
    await redisClient_1.ping();
    redisClient_1.on('error', function (err) {
        logger_1.log.error('Redis connection error for rate limiter', { error: err }, 'SECURITY');
    });
    rateLimitStore = new rate_limit_redis_1.default({
        sendCommand: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return redisClient_1.call.apply(redisClient_1, args);
        },
    });
}
catch (err) {
    logger_1.log.warn('Redis unavailable for rate limiter, falling back to in-memory store', { error: err }, 'SECURITY');
    rateLimitStore = new express_rate_limit_1.MemoryStore();
}
// Security configuration
var SECURITY_CONFIG = {
    // Rate Limiting Configuration
    rateLimit: {
        // General API rate limiting
        general: {
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
            max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '60'), // limit each IP to 60 requests per windowMs
            userMax: parseInt(process.env.RATE_LIMIT_USER_MAX_REQUESTS || '120'), // limit each user to 120 requests per windowMs
            burstWindowMs: 60 * 1000, // 1 minute burst window
            burstMax: 20, // max 20 requests per burst window
            message: {
                error: 'تم تجاوز حد الطلبات',
                message: 'يرجى المحاولة مرة أخرى بعد فترة',
                retryAfter: '15 دقيقة',
            },
            standardHeaders: true,
            legacyHeaders: false,
            skipSuccessfulRequests: false,
            skipFailedRequests: false,
        },
        // Login rate limiting (stricter)
        login: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 5, // limit each IP to 5 login attempts per windowMs
            userMax: 5, // limit each user to 5 login attempts per windowMs
            message: {
                error: 'تم تجاوز حد محاولات تسجيل الدخول',
                message: 'يرجى المحاولة مرة أخرى بعد 15 دقيقة',
                retryAfter: '15 دقيقة',
            },
            standardHeaders: true,
            legacyHeaders: false,
            skipSuccessfulRequests: true,
            skipFailedRequests: false,
        },
        // Document upload rate limiting
        document: {
            windowMs: 5 * 60 * 1000, // 5 minutes
            max: 10, // limit each IP to 10 document uploads per windowMs
            userMax: 20, // limit each user to 20 document uploads per windowMs
            message: {
                error: 'تم تجاوز حد رفع الملفات',
                message: 'يرجى المحاولة مرة أخرى بعد 5 دقائق',
                retryAfter: '5 دقائق',
            },
            standardHeaders: true,
            legacyHeaders: false,
            skipSuccessfulRequests: false,
            skipFailedRequests: false,
        },
        // Search rate limiting
        search: {
            windowMs: 60 * 1000, // 1 minute
            max: 30, // limit each IP to 30 search requests per windowMs
            userMax: 60, // limit each user to 60 search requests per windowMs
            message: {
                error: 'تم تجاوز حد عمليات البحث',
                message: 'يرجى المحاولة مرة أخرى بعد دقيقة',
                retryAfter: '1 دقيقة',
            },
            standardHeaders: true,
            legacyHeaders: false,
            skipSuccessfulRequests: false,
            skipFailedRequests: false,
        },
    },
    // Security Headers Configuration
    headers: {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'strict-dynamic'"], // Will be dynamically updated with nonce
                styleSrc: ["'self'"],
                fontSrc: ["'self'", 'data:'],
                imgSrc: ["'self'", 'data:', 'https:'],
                connectSrc: ["'self'"],
                frameAncestors: ["'none'"],
                objectSrc: ["'none'"],
                baseUri: ["'self'"],
                upgradeInsecureRequests: [],
            },
        },
        hsts: {
            maxAge: 31536000, // 1 year
            includeSubDomains: true,
            preload: true,
        },
    },
};
/**
 * Enhanced Rate Limiting Middleware Factory with Per-IP and Per-User Limits
 */
var createEnhancedRateLimiter = function (type) {
    var config = SECURITY_CONFIG.rateLimit[type];
    // Create IP-based rate limiter
    var ipLimiter = (0, express_rate_limit_1.default)({
        store: rateLimitStore,
        windowMs: config.windowMs,
        max: config.max,
        standardHeaders: config.standardHeaders,
        legacyHeaders: config.legacyHeaders,
        skipSuccessfulRequests: config.skipSuccessfulRequests,
        skipFailedRequests: config.skipFailedRequests,
        keyGenerator: function (req) {
            return "ip:".concat(req.ip || req.connection.remoteAddress || 'unknown');
        },
        handler: function (req, res) {
            var _a, _b, _c;
            var logData = {
                ip: req.ip,
                url: req.url,
                method: req.method,
                userAgent: req.get('User-Agent'),
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                timestamp: new Date().toISOString(),
            };
            (_b = req.log) === null || _b === void 0 ? void 0 : _b.warn("IP rate limit exceeded for ".concat(type), logData);
            (_c = req.metrics) === null || _c === void 0 ? void 0 : _c.increment('security_alerts_total', {
                type: "".concat(type, "_rate_limit"),
                limitType: 'ip',
            });
            logger_1.log.warn("IP rate limit exceeded for ".concat(type), logData, 'SECURITY');
            res.status(429).json({
                error: config.message.error,
                message: config.message.message,
                retryAfter: config.message.retryAfter,
                code: "RATE_LIMIT_IP_".concat(type.toUpperCase()),
                limitType: 'IP',
                timestamp: new Date().toISOString(),
            });
        },
    });
    // Create user-based rate limiter (only for authenticated users)
    var userLimiter = (0, express_rate_limit_1.default)({
        store: rateLimitStore,
        windowMs: config.windowMs,
        max: config.userMax,
        standardHeaders: config.standardHeaders,
        legacyHeaders: config.legacyHeaders,
        skipSuccessfulRequests: config.skipSuccessfulRequests,
        skipFailedRequests: config.skipFailedRequests,
        keyGenerator: function (req) {
            var _a;
            return ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) ? "user:".concat(req.user.id) : 'anonymous';
        },
        skip: function (req) {
            var _a;
            // Skip user-based rate limiting for unauthenticated requests
            return !((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        },
        handler: function (req, res) {
            var _a, _b, _c;
            var logData = {
                ip: req.ip,
                url: req.url,
                method: req.method,
                userAgent: req.get('User-Agent'),
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                timestamp: new Date().toISOString(),
            };
            (_b = req.log) === null || _b === void 0 ? void 0 : _b.warn("User rate limit exceeded for ".concat(type), logData);
            (_c = req.metrics) === null || _c === void 0 ? void 0 : _c.increment('security_alerts_total', {
                type: "".concat(type, "_rate_limit"),
                limitType: 'user',
            });
            logger_1.log.warn("User rate limit exceeded for ".concat(type), logData, 'SECURITY');
            res.status(429).json({
                error: config.message.error,
                message: config.message.message,
                retryAfter: config.message.retryAfter,
                code: "RATE_LIMIT_USER_".concat(type.toUpperCase()),
                limitType: 'USER',
                timestamp: new Date().toISOString(),
            });
        },
    });
    // Optional burst limiter for rapid request bursts
    var burstLimiter = config.burstWindowMs && config.burstMax
        ? (0, express_rate_limit_1.default)({
            store: rateLimitStore,
            windowMs: config.burstWindowMs,
            max: config.burstMax,
            standardHeaders: config.standardHeaders,
            legacyHeaders: config.legacyHeaders,
            keyGenerator: function (req) {
                return "burst:".concat(req.ip || req.connection.remoteAddress || 'unknown');
            },
            handler: function (req, res) {
                var _a, _b, _c;
                var logData = {
                    ip: req.ip,
                    url: req.url,
                    method: req.method,
                    userAgent: req.get('User-Agent'),
                    userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                    timestamp: new Date().toISOString(),
                };
                (_b = req.log) === null || _b === void 0 ? void 0 : _b.warn("Burst rate limit exceeded for ".concat(type), logData);
                (_c = req.metrics) === null || _c === void 0 ? void 0 : _c.increment('security_alerts_total', {
                    type: "".concat(type, "_rate_limit"),
                    limitType: 'burst',
                });
                logger_1.log.warn("Burst rate limit exceeded for ".concat(type), logData, 'SECURITY');
                res.status(429).json({
                    error: config.message.error,
                    message: config.message.message,
                    retryAfter: '1 دقيقة',
                    code: "RATE_LIMIT_BURST_".concat(type.toUpperCase()),
                    limitType: 'BURST',
                    timestamp: new Date().toISOString(),
                });
            },
        })
        : null;
    // Return middleware that applies burst, IP, and user limiters
    return function (req, res, next) {
        var applyUserLimiter = function () { return userLimiter(req, res, next); };
        var applyIpLimiter = function () { return ipLimiter(req, res, function (err) {
            if (err)
                return next(err);
            applyUserLimiter();
        }); };
        if (burstLimiter) {
            burstLimiter(req, res, function (err) {
                if (err)
                    return next(err);
                applyIpLimiter();
            });
        }
        else {
            applyIpLimiter();
        }
    };
};
exports.createEnhancedRateLimiter = createEnhancedRateLimiter;
/**
 * Legacy Rate Limiting Middleware Factory (for backward compatibility)
 */
var createRateLimiter = function (type) {
    var config = SECURITY_CONFIG.rateLimit[type];
    return (0, express_rate_limit_1.default)({
        store: rateLimitStore,
        windowMs: config.windowMs,
        max: config.max,
        message: config.message,
        standardHeaders: config.standardHeaders,
        legacyHeaders: config.legacyHeaders,
        skipSuccessfulRequests: config.skipSuccessfulRequests,
        skipFailedRequests: config.skipFailedRequests,
        handler: function (req, res) {
            var _a;
            logger_1.log.warn("Rate limit exceeded for ".concat(type), {
                ip: req.ip,
                url: req.url,
                method: req.method,
                userAgent: req.get('User-Agent'),
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                timestamp: new Date().toISOString(),
            }, 'SECURITY');
            res.status(429).json({
                error: config.message.error,
                message: config.message.message,
                retryAfter: config.message.retryAfter,
                code: "RATE_LIMIT_".concat(type.toUpperCase()),
                timestamp: new Date().toISOString(),
            });
        },
        keyGenerator: function (req) {
            var _a;
            // Use user ID if authenticated, otherwise use IP
            return ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)
                ? "user:".concat(req.user.id)
                : "ip:".concat(req.ip || req.connection.remoteAddress || 'unknown');
        },
    });
};
exports.createRateLimiter = createRateLimiter;
/**
 * Security Headers Middleware with Dynamic CSP
 */
var securityHeaders = function (req, res, next) {
    // NOTE: CSP is handled centrally in server/config/csp.ts using res.locals.cspNonce.
    // Do not set CSP here to avoid duplicate/overlapping headers.
    // Apply helmet for additional security headers (CSP disabled to use custom header)
    var isProd = process.env.NODE_ENV === 'production';
    (0, helmet_1.default)({
        contentSecurityPolicy: false,
        hsts: SECURITY_CONFIG.headers.hsts,
        noSniff: true,
        frameguard: { action: 'deny' },
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
        crossOriginEmbedderPolicy: isProd ? { policy: 'require-corp' } : false,
        crossOriginOpenerPolicy: isProd ? { policy: 'same-origin' } : false,
        crossOriginResourcePolicy: { policy: isProd ? 'same-origin' : 'cross-origin' },
    })(req, res, next);
};
exports.securityHeaders = securityHeaders;
/**
 * Additional Security Headers
 */
var additionalSecurityHeaders = function (req, res, next) {
    // X-Content-Type-Options
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // X-Frame-Options
    res.setHeader('X-Frame-Options', 'DENY');
    // Remove legacy X-XSS-Protection (modern browsers ignore it); rely on CSP.
    // Permissions-Policy
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()');
    // Referrer-Policy
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Clear-Site-Data (for logout)
    if (req.path === '/api/auth/logout') {
        res.setHeader('Clear-Site-Data', '"cache", "cookies", "storage"');
    }
    next();
};
exports.additionalSecurityHeaders = additionalSecurityHeaders;
/**
 * Request Validation Middleware
 */
var requestValidation = function (req, res, next) {
    // Validate Content-Type for POST/PUT requests
    if ((req.method === 'POST' || req.method === 'PUT') && req.path.startsWith('/api/')) {
        var contentType = req.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(400).json({
                error: 'نوع المحتوى غير صالح',
                message: 'يجب أن يكون المحتوى من نوع JSON',
                code: 'INVALID_CONTENT_TYPE',
                timestamp: new Date().toISOString(),
            });
        }
    }
    // Validate request size
    var contentLength = parseInt(req.get('Content-Length') || '0');
    var maxSize = 10 * 1024 * 1024; // 10MB
    if (contentLength > maxSize) {
        return res.status(413).json({
            error: 'حجم الطلب كبير جداً',
            message: 'الحد الأقصى لحجم الطلب هو 10 ميجابايت',
            code: 'REQUEST_TOO_LARGE',
            timestamp: new Date().toISOString(),
        });
    }
    // Sanitize request body
    if (req.body && typeof req.body === 'object') {
        req.body = (0, sanitize_1.deepSanitize)(req.body);
    }
    next();
};
exports.requestValidation = requestValidation;
/**
 * IP Whitelist Middleware
 */
var ipWhitelist = function (allowedIPs) {
    return function (req, res, next) {
        var clientIP = req.ip || req.connection.remoteAddress || '';
        if (!allowedIPs.includes(clientIP) && !allowedIPs.includes('*')) {
            logger_1.log.warn('Access denied from IP', {
                ip: clientIP,
                url: req.url,
                method: req.method,
                timestamp: new Date().toISOString(),
            }, 'SECURITY');
            return res.status(403).json({
                error: 'غير مصرح بالوصول',
                message: 'عنوان IP غير مسموح به',
                code: 'IP_NOT_ALLOWED',
                timestamp: new Date().toISOString(),
            });
        }
        next();
    };
};
exports.ipWhitelist = ipWhitelist;
/**
 * Security Monitoring Middleware
 */
var securityMonitoring = function (req, res, next) {
    var startTime = Date.now();
    var originalSend = res.send;
    // Monitor response
    res.send = function (data) {
        var responseTime = Date.now() - startTime;
        // Log suspicious activities
        if (responseTime > 5000) {
            // 5 seconds
            logger_1.log.warn('Slow response detected', {
                url: req.url,
                method: req.method,
                ip: req.ip,
                responseTime: responseTime,
                userAgent: req.get('User-Agent'),
                timestamp: new Date().toISOString(),
            }, 'SECURITY');
        }
        if (res.statusCode >= 400) {
            logger_1.log.warn('Error response', {
                url: req.url,
                method: req.method,
                ip: req.ip,
                statusCode: res.statusCode,
                userAgent: req.get('User-Agent'),
                timestamp: new Date().toISOString(),
            }, 'SECURITY');
        }
        return originalSend.call(this, data);
    };
    next();
};
exports.securityMonitoring = securityMonitoring;
function parseApiKeys() {
    var raw = process.env.API_KEYS;
    if (!raw)
        return {};
    try {
        var parsed = JSON.parse(raw);
        logger_1.log.info('API keys configured', { count: Object.keys(parsed).length }, 'SECURITY');
        return parsed;
    }
    catch (_a) {
        logger_1.log.warn('Invalid API_KEYS format, ignoring', {}, 'SECURITY');
        return {};
    }
}
var apiKeys = parseApiKeys();
/**
 * API key authentication middleware with optional HMAC verification
 */
var apiKeyAuth = function (requiredScope) {
    return function (req, res, next) {
        var apiKey = req.header('x-api-key');
        if (!apiKey || !apiKeys[apiKey]) {
            return res.status(401).json({
                error: 'مفتاح API غير صالح',
                message: 'Authentication required',
                code: 'API_KEY_INVALID',
                timestamp: new Date().toISOString(),
            });
        }
        var config = apiKeys[apiKey];
        if (!config.routes.some(function (route) { return req.path.startsWith(route); })) {
            return res.status(403).json({
                error: 'غير مصرح بالوصول',
                message: 'Route not allowed for this API key',
                code: 'API_KEY_ROUTE_FORBIDDEN',
                timestamp: new Date().toISOString(),
            });
        }
        if (requiredScope && !config.scopes.includes(requiredScope)) {
            return res.status(403).json({
                error: 'غير مصرح بالوصول',
                message: 'Scope not allowed for this API key',
                code: 'API_KEY_SCOPE_FORBIDDEN',
                timestamp: new Date().toISOString(),
            });
        }
        var signature = req.header('x-signature');
        if (signature) {
            var timestamp = req.header('x-timestamp');
            if (!timestamp) {
                return res.status(401).json({
                    error: 'Signature timestamp missing',
                    code: 'SIGNATURE_MISSING_TIMESTAMP',
                    timestamp: new Date().toISOString(),
                });
            }
            var tsNum = parseInt(timestamp, 10);
            if (Number.isNaN(tsNum) || Math.abs(Date.now() - tsNum) > 5 * 60 * 1000) {
                return res.status(401).json({
                    error: 'Signature expired',
                    code: 'SIGNATURE_EXPIRED',
                    timestamp: new Date().toISOString(),
                });
            }
            var body = req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';
            var expected = node_crypto_1.default
                .createHmac('sha256', config.secret)
                .update(body + timestamp)
                .digest('hex');
            try {
                var valid = node_crypto_1.default.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(signature, 'hex'));
                if (!valid) {
                    return res.status(401).json({
                        error: 'Invalid signature',
                        code: 'SIGNATURE_INVALID',
                        timestamp: new Date().toISOString(),
                    });
                }
            }
            catch (_a) {
                return res.status(401).json({
                    error: 'Invalid signature',
                    code: 'SIGNATURE_INVALID',
                    timestamp: new Date().toISOString(),
                });
            }
        }
        req.apiKey = apiKey;
        req.apiKeyScopes = config.scopes;
        next();
    };
};
exports.apiKeyAuth = apiKeyAuth;
/**
 * Export rate limiters
 */
exports.rateLimiters = {
    general: (0, exports.createRateLimiter)('general'),
    login: (0, exports.createRateLimiter)('login'),
    document: (0, exports.createRateLimiter)('document'),
    search: (0, exports.createRateLimiter)('search'),
};
/**
 * Export enhanced rate limiters with per-IP and per-user limits
 */
exports.enhancedRateLimiters = {
    general: (0, exports.createEnhancedRateLimiter)('general'),
    login: (0, exports.createEnhancedRateLimiter)('login'),
    document: (0, exports.createEnhancedRateLimiter)('document'),
    search: (0, exports.createEnhancedRateLimiter)('search'),
};
/**
 * CSP Nonce Utility Functions
 */
exports.cspUtils = {
    /**
     * Get CSP nonce from request
     */
    getNonce: function (req) {
        return req.cspNonce || '';
    },
    /**
     * Generate script tag with nonce
     */
    scriptTag: function (req, content) {
        var nonce = exports.cspUtils.getNonce(req);
        return "<script nonce=\"".concat(nonce, "\">").concat(content, "</script>");
    },
    /**
     * Generate style tag with nonce
     */
    styleTag: function (req, content) {
        var nonce = exports.cspUtils.getNonce(req);
        return "<style nonce=\"".concat(nonce, "\">").concat(content, "</style>");
    },
    /**
    * Validate nonce format
     */
    validateNonce: function (nonce) {
        return /^[A-Za-z0-9+/=]+$/.test(nonce);
    },
};
/**
 * Export security configuration
 */
exports.securityConfig = SECURITY_CONFIG;
