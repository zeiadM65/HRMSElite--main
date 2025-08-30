"use strict";
/**
 * Prometheus Metrics Middleware for HRMS Elite
 * Provides comprehensive metrics collection for monitoring and alerting
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMetrics = exports.healthCheckHandler = exports.metricsHandler = exports.metricsAuth = exports.prometheusMiddleware = exports.metricsUtils = void 0;
var prom_client_1 = require("prom-client");
var env_1 = require("../utils/env");
// Enable default metrics collection
(0, prom_client_1.collectDefaultMetrics)({ register: prom_client_1.register });
/**
 * HTTP Request Metrics
 */
var httpRequestsTotal = new prom_client_1.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'endpoint', 'status', 'version']
});
var httpRequestDuration = new prom_client_1.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['route', 'status'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});
var httpRequestSize = new prom_client_1.Histogram({
    name: 'http_request_size_bytes',
    help: 'HTTP request size in bytes',
    labelNames: ['method', 'endpoint'],
    buckets: [100, 500, 1000, 5000, 10000, 50000, 100000]
});
var httpResponseSize = new prom_client_1.Histogram({
    name: 'http_response_size_bytes',
    help: 'HTTP response size in bytes',
    labelNames: ['method', 'endpoint', 'status'],
    buckets: [100, 500, 1000, 5000, 10000, 50000, 100000]
});
/**
 * Additional Counters
 */
var httpRequestsErrorsTotal = new prom_client_1.Counter({
    name: 'http_requests_errors_total',
    help: 'Total number of HTTP requests that resulted in errors',
    labelNames: ['method', 'route', 'status']
});
var uploadsTotal = new prom_client_1.Counter({
    name: 'uploads_total',
    help: 'Total number of uploads',
    labelNames: ['type', 'status']
});
/**
 * Error Metrics
 */
var httpErrorsTotal = new prom_client_1.Counter({
    name: 'http_errors_total',
    help: 'Total number of HTTP errors',
    labelNames: ['method', 'endpoint', 'status', 'error_type']
});
var httpClientErrorsTotal = new prom_client_1.Counter({
    name: 'http_client_errors_total',
    help: 'Total number of HTTP client errors (4xx)',
    labelNames: ['method', 'endpoint', 'status']
});
var httpServerErrorsTotal = new prom_client_1.Counter({
    name: 'http_server_errors_total',
    help: 'Total number of HTTP server errors (5xx)',
    labelNames: ['method', 'endpoint', 'status']
});
/**
 * Authentication Metrics
 */
var authFailuresTotal = new prom_client_1.Counter({
    name: 'auth_failures_total',
    help: 'Total number of authentication failures',
    labelNames: ['method', 'endpoint', 'reason']
});
var authSuccessTotal = new prom_client_1.Counter({
    name: 'auth_success_total',
    help: 'Total number of successful authentications',
    labelNames: ['method', 'user_role']
});
var activeSessions = new prom_client_1.Gauge({
    name: 'active_sessions',
    help: 'Number of active user sessions'
});
var loginFailuresTotal = new prom_client_1.Counter({
    name: 'login_failures_total',
    help: 'Total number of failed login attempts',
    labelNames: ['reason']
});
/**
 * Security Metrics
 */
var securityAlertsTotal = new prom_client_1.Counter({
    name: 'security_alerts_total',
    help: 'Total number of security alerts',
    labelNames: ['type', 'severity', 'pattern']
});
var suspiciousRequestsTotal = new prom_client_1.Counter({
    name: 'suspicious_requests_total',
    help: 'Total number of suspicious requests',
    labelNames: ['type', 'pattern']
});
var avScanFailuresTotal = new prom_client_1.Counter({
    name: 'av_scan_failures_total',
    help: 'Total number of antivirus scan failures',
    labelNames: ['provider'],
});
/**
 * Database Metrics
 */
var dbQueriesTotal = new prom_client_1.Counter({
    name: 'db_queries_total',
    help: 'Total number of database queries',
    labelNames: ['operation', 'table', 'status']
});
var dbQueryDuration = new prom_client_1.Histogram({
    name: 'db_query_duration_seconds',
    help: 'Database query duration in seconds',
    labelNames: ['operation', 'table'],
    buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});
var dbConnectionsActive = new prom_client_1.Gauge({
    name: 'db_connections_active',
    help: 'Number of active database connections'
});
/**
 * File Upload Metrics
 */
var fileUploadsTotal = new prom_client_1.Counter({
    name: 'file_uploads_total',
    help: 'Total number of file uploads',
    labelNames: ['type', 'status', 'size_range']
});
var fileUploadSize = new prom_client_1.Histogram({
    name: 'file_upload_size_bytes',
    help: 'File upload size in bytes',
    labelNames: ['type'],
    buckets: [1024, 10240, 102400, 1048576, 10485760, 104857600]
});
/**
 * Business Logic Metrics
 */
var employeeOperationsTotal = new prom_client_1.Counter({
    name: 'employee_operations_total',
    help: 'Total number of employee operations',
    labelNames: ['operation', 'status', 'user_role']
});
var documentOperationsTotal = new prom_client_1.Counter({
    name: 'document_operations_total',
    help: 'Total number of document operations',
    labelNames: ['operation', 'status', 'user_role']
});
var payrollOperationsTotal = new prom_client_1.Counter({
    name: 'payroll_operations_total',
    help: 'Total number of payroll operations',
    labelNames: ['operation', 'status', 'user_role']
});
/**
 * System Metrics
 */
var memoryUsage = new prom_client_1.Gauge({
    name: 'memory_usage_bytes',
    help: 'Memory usage in bytes',
    labelNames: ['type']
});
var cpuUsage = new prom_client_1.Gauge({
    name: 'cpu_usage_percent',
    help: 'CPU usage percentage'
});
var diskUsage = new prom_client_1.Gauge({
    name: 'disk_usage_bytes',
    help: 'Disk usage in bytes',
    labelNames: ['path']
});
/**
 * Web Vitals Metrics
 */
var webVitalsLCP = new prom_client_1.Gauge({
    name: 'web_vitals_lcp',
    help: 'Largest Contentful Paint (ms)'
});
var webVitalsCLS = new prom_client_1.Gauge({
    name: 'web_vitals_cls',
    help: 'Cumulative Layout Shift'
});
var webVitalsFID = new prom_client_1.Gauge({
    name: 'web_vitals_fid',
    help: 'First Input Delay (ms)'
});
/**
 * Metrics utilities
 */
exports.metricsUtils = {
    // HTTP Metrics
    incrementHttpRequest: function (method, endpoint, status, version) {
        if (version === void 0) { version = 'v1'; }
        httpRequestsTotal.inc({ method: method, endpoint: endpoint, status: status.toString(), version: version });
    },
    incrementHttpRequestError: function (method, route, status) {
        httpRequestsErrorsTotal.inc({ method: method, route: route, status: status.toString() });
    },
    recordHttpDuration: function (route, status, duration) {
        httpRequestDuration.observe({ route: route, status: status.toString() }, duration);
    },
    recordHttpRequestSize: function (method, endpoint, size) {
        httpRequestSize.observe({ method: method, endpoint: endpoint }, size);
    },
    recordHttpResponseSize: function (method, endpoint, status, size) {
        httpResponseSize.observe({ method: method, endpoint: endpoint, status: status.toString() }, size);
    },
    // Error Metrics
    incrementHttpError: function (method, endpoint, status, errorType) {
        httpErrorsTotal.inc({ method: method, endpoint: endpoint, status: status.toString(), error_type: errorType });
    },
    incrementClientError: function (method, endpoint, status) {
        httpClientErrorsTotal.inc({ method: method, endpoint: endpoint, status: status.toString() });
    },
    incrementServerError: function (method, endpoint, status) {
        httpServerErrorsTotal.inc({ method: method, endpoint: endpoint, status: status.toString() });
    },
    // Authentication Metrics
    incrementAuthFailure: function (method, endpoint, reason) {
        authFailuresTotal.inc({ method: method, endpoint: endpoint, reason: reason });
    },
    incrementAuthSuccess: function (method, userRole) {
        authSuccessTotal.inc({ method: method, user_role: userRole });
    },
    incrementLoginFailure: function (reason) {
        loginFailuresTotal.inc({ reason: reason });
    },
    setActiveSessions: function (count) {
        activeSessions.set(count);
    },
    // Security Metrics
    incrementSecurityAlert: function (type, severity, pattern) {
        securityAlertsTotal.inc({ type: type, severity: severity, pattern: pattern });
    },
    incrementSuspiciousRequest: function (type, pattern) {
        suspiciousRequestsTotal.inc({ type: type, pattern: pattern });
    },
    incrementAvScanFailure: function (provider) {
        avScanFailuresTotal.inc({ provider: provider });
    },
    // Database Metrics
    incrementDbQuery: function (operation, table, status) {
        dbQueriesTotal.inc({ operation: operation, table: table, status: status });
    },
    recordDbDuration: function (operation, table, duration) {
        dbQueryDuration.observe({ operation: operation, table: table }, duration);
    },
    setDbConnections: function (count) {
        dbConnectionsActive.set(count);
    },
    // File Upload Metrics
    incrementFileUpload: function (type, status, sizeRange) {
        fileUploadsTotal.inc({ type: type, status: status, size_range: sizeRange });
        uploadsTotal.inc({ type: type, status: status });
    },
    recordFileUploadSize: function (type, size) {
        fileUploadSize.observe({ type: type }, size);
    },
    // Business Logic Metrics
    incrementEmployeeOperation: function (operation, status, userRole) {
        employeeOperationsTotal.inc({ operation: operation, status: status, user_role: userRole });
    },
    incrementDocumentOperation: function (operation, status, userRole) {
        documentOperationsTotal.inc({ operation: operation, status: status, user_role: userRole });
    },
    incrementPayrollOperation: function (operation, status, userRole) {
        payrollOperationsTotal.inc({ operation: operation, status: status, user_role: userRole });
    },
    // System Metrics
    setMemoryUsage: function (type, bytes) {
        memoryUsage.set({ type: type }, bytes);
    },
    setCpuUsage: function (percent) {
        cpuUsage.set(percent);
    },
    setDiskUsage: function (path, bytes) {
        diskUsage.set({ path: path }, bytes);
    },
    // Web Vitals
    recordWebVital: function (metric, value) {
        var gauges = {
            LCP: webVitalsLCP,
            CLS: webVitalsCLS,
            FID: webVitalsFID
        };
        var gauge = gauges[metric];
        if (gauge) {
            gauge.set(value);
        }
    }
};
/**
 * Prometheus metrics middleware
 */
var prometheusMiddleware = function (req, res, next) {
    var startTime = process.hrtime.bigint();
    var requestSize = parseInt(req.get('content-length') || '0');
    // Record request size
    if (requestSize > 0) {
        exports.metricsUtils.recordHttpRequestSize(req.method, req.url, requestSize);
    }
    // Override res.send to record metrics
    var originalSend = res.send;
    res.send = function (data) {
        var _a;
        var endTime = process.hrtime.bigint();
        var duration = Number(endTime - startTime) / 1000000000; // Convert to seconds
        var responseSize = Buffer.byteLength(data, 'utf8');
        var route = ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || req.path;
        // Record metrics
        exports.metricsUtils.incrementHttpRequest(req.method, req.url, res.statusCode);
        exports.metricsUtils.recordHttpDuration(route, res.statusCode, duration);
        exports.metricsUtils.recordHttpResponseSize(req.method, req.url, res.statusCode, responseSize);
        // Record errors
        if (res.statusCode >= 400 && res.statusCode < 500) {
            exports.metricsUtils.incrementClientError(req.method, req.url, res.statusCode);
        }
        else if (res.statusCode >= 500) {
            exports.metricsUtils.incrementServerError(req.method, req.url, res.statusCode);
        }
        if (res.statusCode >= 400) {
            exports.metricsUtils.incrementHttpRequestError(req.method, route, res.statusCode);
        }
        return originalSend.call(this, data);
    };
    next();
};
exports.prometheusMiddleware = prometheusMiddleware;
/**
 * Metrics endpoint authentication
 */
var metricsAuth = function (req, res, next) {
    var token = env_1.env.METRICS_TOKEN;
    if (!token) {
        return res.status(403).json({ error: 'Metrics disabled' });
    }
    if (req.get('x-metrics-token') !== token) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};
exports.metricsAuth = metricsAuth;
/**
 * Metrics endpoint handler
 */
var metricsHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                res.set('Content-Type', prom_client_1.register.contentType);
                _b = (_a = res).end;
                return [4 /*yield*/, prom_client_1.register.metrics()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                res.status(500).end(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.metricsHandler = metricsHandler;
/**
 * Health check endpoint with metrics
 */
var healthCheckHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var health, memUsage;
    return __generator(this, function (_a) {
        health = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.env.npm_package_version || '1.0.0',
            environment: process.env.NODE_ENV || 'development'
        };
        memUsage = process.memoryUsage();
        exports.metricsUtils.setMemoryUsage('rss', memUsage.rss);
        exports.metricsUtils.setMemoryUsage('heapUsed', memUsage.heapUsed);
        exports.metricsUtils.setMemoryUsage('heapTotal', memUsage.heapTotal);
        exports.metricsUtils.setMemoryUsage('external', memUsage.external);
        res.json(health);
        return [2 /*return*/];
    });
}); };
exports.healthCheckHandler = healthCheckHandler;
/**
 * Initialize metrics collection
 */
var initializeMetrics = function () {
    // Update system metrics periodically
    setInterval(function () {
        var memUsage = process.memoryUsage();
        exports.metricsUtils.setMemoryUsage('rss', memUsage.rss);
        exports.metricsUtils.setMemoryUsage('heapUsed', memUsage.heapUsed);
        exports.metricsUtils.setMemoryUsage('heapTotal', memUsage.heapTotal);
        exports.metricsUtils.setMemoryUsage('external', memUsage.external);
    }, 30000); // Every 30 seconds
    // Update CPU usage (simplified)
    setInterval(function () {
        var startUsage = process.cpuUsage();
        setTimeout(function () {
            var endUsage = process.cpuUsage(startUsage);
            var cpuPercent = (endUsage.user + endUsage.system) / 1000000; // Convert to seconds
            exports.metricsUtils.setCpuUsage(cpuPercent);
        }, 100);
    }, 5000); // Every 5 seconds
};
exports.initializeMetrics = initializeMetrics;
exports.default = {
    middleware: exports.prometheusMiddleware,
    handler: exports.metricsHandler,
    health: exports.healthCheckHandler,
    utils: exports.metricsUtils,
    initialize: exports.initializeMetrics,
    auth: exports.metricsAuth
};
