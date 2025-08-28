"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfErrorHandler = exports.csrfTokenHandler = exports.csrfTokenMiddleware = exports.csrfProtection = void 0;
var csrf_1 = __importDefault(require("csrf"));
// Initialize token generator
var tokens = new csrf_1.default();
// CSRF protection middleware verifying token for state-changing requests
var csrfProtection = function (req, res, next) {
    var _a;
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next();
    }
    var secret = (_a = req.session) === null || _a === void 0 ? void 0 : _a.csrfSecret;
    var token = req.get('x-csrf-token') ||
        (req.body && req.body._csrf) ||
        (req.cookies && req.cookies._csrf);
    if (!secret || !token || !tokens.verify(secret, token)) {
        var err = new Error('Invalid CSRF token');
        err.code = 'EBADCSRFTOKEN';
        return next(err);
    }
    next();
};
exports.csrfProtection = csrfProtection;
// Issue a CSRF token per session and expose it via cookie and locals
var csrfTokenMiddleware = function (req, res, next) {
    var _a;
    try {
        var secret = (_a = req.session) === null || _a === void 0 ? void 0 : _a.csrfSecret;
        if (!secret) {
            secret = tokens.secretSync();
            req.session.csrfSecret = secret;
        }
        var token = tokens.create(secret);
        res.cookie('_csrf', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
        });
        res.setHeader('X-CSRF-Token', token);
        res.locals.csrfToken = token;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.csrfTokenMiddleware = csrfTokenMiddleware;
// Endpoint handler for clients to retrieve the current token
var csrfTokenHandler = function (_req, res) {
    res.json({
        csrfToken: res.locals.csrfToken,
        message: 'CSRF token generated successfully',
        timestamp: new Date().toISOString()
    });
};
exports.csrfTokenHandler = csrfTokenHandler;
// Error handler for CSRF validation failures
var csrfErrorHandler = function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }
    res.status(403).json({
        error: 'Invalid CSRF token',
        code: 'CSRF_TOKEN_INVALID',
        requestId: req.id
    });
};
exports.csrfErrorHandler = csrfErrorHandler;
