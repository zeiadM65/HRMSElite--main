"use strict";
/**
 * @fileoverview Main server entry point for HRMS Elite application
 * @description Express.js server with security middleware, rate limiting, CSRF protection,
 * and comprehensive API endpoints for human resource management
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var node_crypto_1 = __importDefault(require("node:crypto"));
var session_1 = require("./utils/session");
var encryption_guard_1 = require("./bootstrap/encryption-guard");
// Import observability middleware
var observability_1 = require("./middleware/observability");
var metrics_1 = require("./middleware/metrics");
var log_shipper_1 = require("./utils/log-shipper");
var security_1 = require("./middleware/security");
var csrf_1 = require("./middleware/csrf");
var auth_1 = require("./middleware/auth");
var logger_1 = require("./utils/logger");
var env_1 = require("./utils/env");
var errorMessages_1 = require("./utils/errorMessages");
var rateLimiter_1 = require("./rateLimiter");
// Import routes
var ai_1 = __importDefault(require("./routes/ai"));
var quality_routes_1 = __importDefault(require("./routes/quality-routes"));
var cacheControl_1 = require("./middleware/cacheControl");
var apiVersioningRedirect_1 = require("./middleware/apiVersioningRedirect");
var csp_1 = require("./config/csp");
var cors_1 = __importDefault(require("./config/cors"));
var headers_1 = require("./security/headers");
// Enforce at-rest encryption before anything touches the DB
(0, encryption_guard_1.assertDatabaseEncryption)();
// Import versioned routes
var auth_routes_1 = require("./routes/v1/auth-routes");
var employee_routes_1 = require("./routes/v1/employee-routes");
var document_routes_1 = require("./routes/v1/document-routes");
exports.app = (0, express_1.default)();
var PORT = env_1.env.PORT;
var vitalsRateLimiter = (0, security_1.createRateLimiter)('general');
// Trust proxy for rate limiting
exports.app.set('trust proxy', 1);
// Initialize observability systems
function initializeObservability() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Initialize Prometheus metrics
                    (0, metrics_1.initializeMetrics)();
                    // Initialize log shipper
                    return [4 /*yield*/, (0, log_shipper_1.initializeLogShipper)()];
                case 1:
                    // Initialize log shipper
                    _a.sent();
                    logger_1.log.info('Observability systems initialized successfully', {}, 'SERVER');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger_1.log.error('Failed to initialize observability systems', { error: error_1 }, 'SERVER');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Generate per-request CSP nonce and apply CSP
exports.app.use(function (req, res, next) {
    res.locals.cspNonce = node_crypto_1.default.randomBytes(16).toString('base64');
    next();
});
exports.app.use(csp_1.csp);
// Apply observability middleware
exports.app.use(observability_1.observability.middleware);
exports.app.use(observability_1.observability.performance);
exports.app.use(observability_1.observability.security);
exports.app.use(metrics_1.prometheusMiddleware);
// Security middleware (order matters!)
exports.app.use(security_1.securityHeaders);
exports.app.use(security_1.additionalSecurityHeaders);
exports.app.use(headers_1.coopCoep);
exports.app.use(security_1.securityMonitoring);
// CORS configuration
exports.app.use(cors_1.default);
// Cookie parsing middleware
exports.app.use((0, cookie_parser_1.default)());
// Body parsing middleware
exports.app.use(express_1.default.json({ limit: '1mb' }));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
// Session configuration with Redis store
exports.app.use((0, session_1.createSessionMiddleware)());
// CSRF protection
exports.app.use(csrf_1.csrfProtection);
exports.app.use(csrf_1.csrfTokenMiddleware);
exports.app.get('/api/csrf-token', csrf_1.csrfTokenHandler);
// Rate limiting
exports.app.use(rateLimiter_1.limiter);
// Request validation middleware
exports.app.use(security_1.requestValidation);
// Prevent caching of sensitive responses
exports.app.use(cacheControl_1.cacheControlGuard);
// Health check endpoint
exports.app.get('/health', metrics_1.healthCheckHandler);
// Metrics endpoint for Prometheus
exports.app.get('/metrics', metrics_1.metricsAuth, metrics_1.metricsHandler);
exports.app.post('/metrics/vitals', metrics_1.metricsAuth, vitalsRateLimiter, function (req, res) {
    var _a = req.body, name = _a.name, value = _a.value;
    if (typeof name !== 'string' || typeof value !== 'number') {
        return res.status(400).json({ error: 'Invalid metric' });
    }
    metrics_1.metricsUtils.recordWebVital(name, value);
    res.status(204).end();
});
// API documentation
exports.app.get('/api-docs', function (req, res) {
    res.json({
        name: 'HRMS Elite API',
        version: '1.0.0',
        description: 'Human Resource Management System Elite API',
        endpoints: {
            auth: '/api/v1/auth',
            employees: '/api/v1/employees',
            documents: '/api/v1/documents',
            ai: '/api/v1/ai',
            quality: '/api/v1/quality'
        },
        health: '/health',
        metrics: '/metrics'
    });
});
// API versioning redirect for legacy routes
exports.app.use(apiVersioningRedirect_1.apiVersioningRedirect);
// Versioned API routes
exports.app.use('/api/v1/auth', auth_routes_1.publicAuthRouter);
exports.app.use('/api/v1/auth', auth_1.isAuthenticated, auth_routes_1.privateAuthRouter);
(0, employee_routes_1.registerEmployeeRoutes)(exports.app);
(0, document_routes_1.registerDocumentRoutes)(exports.app);
exports.app.use('/api/v1/ai', auth_1.isAuthenticated, ai_1.default);
exports.app.use('/api/v1/quality', auth_1.isAuthenticated, quality_routes_1.default);
// Optional auth routes (for public endpoints)
exports.app.use('/api/v1/public', auth_1.optionalAuth);
// CSRF error handler
exports.app.use(csrf_1.csrfErrorHandler);
// Error handling middleware with observability
exports.app.use(observability_1.observability.errorTracking);
// Global error handler
exports.app.use(function (err, req, res, _next) {
    logger_1.log.error('Unhandled error', { error: err, requestId: req.id }, 'SERVER');
    res.status(500).json({ error: 'Internal Server Error', requestId: req.id });
});
// 404 handler
exports.app.use('*', function (req, res) {
    var locale = (0, errorMessages_1.getLocale)(req.headers['accept-language']);
    res.status(404).json({
        code: 'NOT_FOUND',
        message: (0, errorMessages_1.t)(locale, 'NOT_FOUND'),
        locale: locale,
        requestId: req.id
    });
});
// Graceful shutdown
process.on('SIGTERM', function () { return __awaiter(void 0, void 0, void 0, function () {
    var closeLogShipper;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.log.info('SIGTERM received, shutting down gracefully', {}, 'SERVER');
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./utils/log-shipper')); })];
            case 1:
                closeLogShipper = (_a.sent()).closeLogShipper;
                return [4 /*yield*/, closeLogShipper()];
            case 2:
                _a.sent();
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
process.on('SIGINT', function () { return __awaiter(void 0, void 0, void 0, function () {
    var closeLogShipper;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.log.info('SIGINT received, shutting down gracefully', {}, 'SERVER');
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./utils/log-shipper')); })];
            case 1:
                closeLogShipper = (_a.sent()).closeLogShipper;
                return [4 /*yield*/, closeLogShipper()];
            case 2:
                _a.sent();
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); });
// Start server
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Initialize observability systems
                    return [4 /*yield*/, initializeObservability()];
                case 1:
                    // Initialize observability systems
                    _a.sent();
                    // Start the server
                    exports.app.listen(PORT, function () {
                        logger_1.log.info("\uD83D\uDE80 HRMS Elite server started on port ".concat(PORT), {
                            port: PORT,
                            environment: env_1.env.NODE_ENV,
                            nodeVersion: process.version,
                            platform: process.platform,
                            arch: process.arch
                        }, 'SERVER');
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    logger_1.log.error('Failed to start server', { error: error_2 }, 'SERVER');
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Start the server
startServer();
exports.default = exports.app;
