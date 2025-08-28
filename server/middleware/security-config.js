"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitConfigs = exports.securityHeaders = exports.developmentSecurityConfig = exports.productionSecurityConfig = exports.defaultSecurityConfig = void 0;
exports.getSecurityConfig = getSecurityConfig;
/**
 * Security Configuration for HRMS Elite
 * This file contains all security-related configurations and settings
 */
var secrets_1 = require("../config/secrets");
// Default security configuration
exports.defaultSecurityConfig = {
    'rateLimit': {
        'windowMs': 15 * 60 * 1000, // 15 minutes
        'max': 100, // 100 requests per window
        'skipSuccessfulRequests': false,
        'skipFailedRequests': false
    },
    'csrf': {
        'cookie': {
            'httpOnly': true,
            'secure': process.env.NODE_ENV === 'production',
            'sameSite': 'strict'
        }
    },
    'session': {
        'secret': secrets_1.SESSION_SECRET,
        'resave': false,
        'saveUninitialized': false,
        'cookie': {
            'secure': process.env.NODE_ENV === 'production',
            'httpOnly': true,
            'sameSite': 'strict',
            'maxAge': 24 * 60 * 60 * 1000 // 24 hours
        }
    },
    'helmet': {
        'contentSecurityPolicy': {
            'directives': __assign({ 'defaultSrc': ['\'self\''], 'scriptSrc': ['\'self\'', '\'strict-dynamic\''], 'styleSrc': ['\'self\''], 'fontSrc': ['\'self\'', 'data:'], 'imgSrc': ['\'self\'', 'data:', 'https:'], 'connectSrc': ['\'self\''], 'frameAncestors': ['\'none\''], 'objectSrc': ['\'none\''], 'baseUri': ['\'self\''] }, (process.env.NODE_ENV === 'production' && { 'upgradeInsecureRequests': [] }))
        },
        'crossOriginOpenerPolicy': false,
        'crossOriginEmbedderPolicy': false,
        'crossOriginResourcePolicy': {
            'policy': 'cross-origin'
        }
    },
    'fileUpload': {
        'maxSize': 10 * 1024 * 1024, // 10MB
        'allowedTypes': [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ],
        'maxFiles': 5
    },
    'inputValidation': {
        'maxStringLength': 10000, // 10KB
        'allowedHtmlTags': [], // No HTML allowed by default
        'blockedPatterns': [
            /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /data:text\/html/gi,
            /vbscript:/gi,
            /expression\s*\(/gi
        ]
    }
};
// Production security configuration (stricter)
exports.productionSecurityConfig = __assign(__assign({}, exports.defaultSecurityConfig), { 'rateLimit': __assign(__assign({}, exports.defaultSecurityConfig.rateLimit), { 'max': 50 // More restrictive in production
     }), 'helmet': __assign(__assign({}, exports.defaultSecurityConfig.helmet), { 'crossOriginOpenerPolicy': { 'policy': 'same-origin' }, 'crossOriginEmbedderPolicy': { 'policy': 'require-corp' }, 'contentSecurityPolicy': {
            'directives': __assign(__assign({}, exports.defaultSecurityConfig.helmet.contentSecurityPolicy.directives), { 'upgradeInsecureRequests': [] // Force HTTPS in production
             })
        } }), 'fileUpload': __assign(__assign({}, exports.defaultSecurityConfig.fileUpload), { 'maxSize': 5 * 1024 * 1024 // 5MB in production
     }) });
// Development security configuration (more permissive)
exports.developmentSecurityConfig = __assign(__assign({}, exports.defaultSecurityConfig), { 'rateLimit': __assign(__assign({}, exports.defaultSecurityConfig.rateLimit), { 'max': 200 // More permissive in development
     }), 'helmet': __assign(__assign({}, exports.defaultSecurityConfig.helmet), { 'crossOriginOpenerPolicy': false, 'crossOriginEmbedderPolicy': false // Disable for development
     }), 'fileUpload': __assign(__assign({}, exports.defaultSecurityConfig.fileUpload), { 'maxSize': 20 * 1024 * 1024 // 20MB in development
     }) });
// Get security configuration based on environment
function getSecurityConfig() {
    var env = process.env.NODE_ENV || 'development';
    switch (env) {
        case 'production':
            return exports.productionSecurityConfig;
        case 'development':
            return exports.developmentSecurityConfig;
        default:
            return exports.defaultSecurityConfig;
    }
}
// Security headers configuration
exports.securityHeaders = {
    // Basic security headers
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
    // Additional security headers
    'X-DNS-Prefetch-Control': 'off',
    'X-Download-Options': 'noopen',
    'X-Permitted-Cross-Domain-Policies': 'none',
    // Cache control for sensitive pages
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
};
// Rate limiting configurations for different endpoints
exports.rateLimitConfigs = {
    // General API rate limiting
    'api': {
        'windowMs': 15 * 60 * 1000, // 15 minutes
        'max': 50 // 50 requests per window
    },
    // Login rate limiting (very restrictive)
    'login': {
        'windowMs': 15 * 60 * 1000, // 15 minutes
        'max': 5 // 5 attempts per window
    },
    // File upload rate limiting
    'upload': {
        'windowMs': 15 * 60 * 1000, // 15 minutes
        'max': 10 // 10 uploads per window
    },
    // Document operations rate limiting
    'documents': {
        'windowMs': 15 * 60 * 1000, // 15 minutes
        'max': 30 // 30 operations per window
    }
};
exports.default = {
    defaultSecurityConfig: exports.defaultSecurityConfig,
    productionSecurityConfig: exports.productionSecurityConfig,
    developmentSecurityConfig: exports.developmentSecurityConfig,
    getSecurityConfig: getSecurityConfig,
    securityHeaders: exports.securityHeaders,
    rateLimitConfigs: exports.rateLimitConfigs
};
