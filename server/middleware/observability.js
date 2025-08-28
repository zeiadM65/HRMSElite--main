"use strict";
/**
 * Enhanced Observability Middleware for HRMS Elite
 * Provides request tracing, sensitive data redaction, and monitoring integration
 */
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
exports.observability = exports.securityMonitoringMiddleware = exports.performanceMiddleware = exports.errorTrackingMiddleware = exports.observabilityMiddleware = void 0;
var node_crypto_1 = require("node:crypto");
var logger_1 = require("../utils/logger");
var prom_client_1 = require("prom-client");
/**
 * Sensitive data redaction configuration
 */
var SENSITIVE_FIELDS = {
    // Headers
    headers: [
        'authorization',
        'cookie',
        'x-csrf-token',
        'x-xsrf-token',
        'x-api-key',
        'x-auth-token'
    ],
    // Request body fields
    body: [
        'password',
        'confirmPassword',
        'currentPassword',
        'newPassword',
        'token',
        'refreshToken',
        'accessToken',
        '_csrf',
        'secret',
        'apiKey',
        'privateKey'
    ],
    // Query parameters
    query: [
        'token',
        'access_token',
        'refresh_token',
        'api_key',
        'secret'
    ],
    // Response body fields
    response: [
        'token',
        'accessToken',
        'refreshToken',
        'password',
        '_csrf',
        'secret',
        'privateKey'
    ]
};
/**
 * Redact sensitive data from objects
 */
function redactSensitiveData(obj, fields) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    var redacted = __assign({}, obj);
    fields.forEach(function (field) {
        if (field in redacted) {
            redacted[field] = '[REDACTED]';
        }
    });
    return redacted;
}
/**
 * Deep redact sensitive data from nested objects
 */
function deepRedactSensitiveData(obj, fields) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(function (item) { return deepRedactSensitiveData(item, fields); });
    }
    var redacted = __assign({}, obj);
    Object.keys(redacted).forEach(function (key) {
        if (fields.includes(key.toLowerCase())) {
            redacted[key] = '[REDACTED]';
        }
        else if (typeof redacted[key] === 'object' && redacted[key] !== null) {
            redacted[key] = deepRedactSensitiveData(redacted[key], fields);
        }
    });
    return redacted;
}
/**
 * Create request logger with context
 */
function createRequestLogger(req) {
    var requestId = req.id;
    return {
        info: function (message, data) {
            var _a, _b;
            logger_1.log.info(message, __assign(__assign({}, data), { requestId: requestId, method: req.method, url: req.url, ip: req.ip, userAgent: req.get('User-Agent'), userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, userRole: (_b = req.user) === null || _b === void 0 ? void 0 : _b.role, timestamp: new Date().toISOString() }), 'REQUEST');
        },
        warn: function (message, data) {
            var _a, _b;
            logger_1.log.warn(message, __assign(__assign({}, data), { requestId: requestId, method: req.method, url: req.url, ip: req.ip, userAgent: req.get('User-Agent'), userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, userRole: (_b = req.user) === null || _b === void 0 ? void 0 : _b.role, timestamp: new Date().toISOString() }), 'REQUEST');
        },
        error: function (message, data) {
            var _a, _b;
            logger_1.log.error(message, __assign(__assign({}, data), { requestId: requestId, method: req.method, url: req.url, ip: req.ip, userAgent: req.get('User-Agent'), userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, userRole: (_b = req.user) === null || _b === void 0 ? void 0 : _b.role, timestamp: new Date().toISOString() }), 'REQUEST');
        },
        debug: function (message, data) {
            var _a, _b;
            logger_1.log.debug(message, __assign(__assign({}, data), { requestId: requestId, method: req.method, url: req.url, ip: req.ip, userAgent: req.get('User-Agent'), userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, userRole: (_b = req.user) === null || _b === void 0 ? void 0 : _b.role, timestamp: new Date().toISOString() }), 'REQUEST');
        }
    };
}
/**
 * Create metrics interface for request
 */
function createRequestMetrics(req) {
    var getCounter = function (name, labelNames) {
        return prom_client_1.register.getSingleMetric(name) ||
            new prom_client_1.Counter({ name: name, help: "".concat(name, " counter"), labelNames: labelNames });
    };
    var getHistogram = function (name, labelNames) {
        return prom_client_1.register.getSingleMetric(name) ||
            new prom_client_1.Histogram({ name: name, help: "".concat(name, " histogram"), labelNames: labelNames });
    };
    var getGauge = function (name, labelNames) {
        return prom_client_1.register.getSingleMetric(name) ||
            new prom_client_1.Gauge({ name: name, help: "".concat(name, " gauge"), labelNames: labelNames });
    };
    return {
        increment: function (name, labels) {
            if (labels === void 0) { labels = {}; }
            var counter = getCounter(name, Object.keys(labels));
            counter.inc(labels);
        },
        histogram: function (name, value, labels) {
            if (labels === void 0) { labels = {}; }
            var histogram = getHistogram(name, Object.keys(labels));
            histogram.observe(labels, value);
        },
        gauge: function (name, value, labels) {
            if (labels === void 0) { labels = {}; }
            var gauge = getGauge(name, Object.keys(labels));
            gauge.set(labels, value);
        }
    };
}
/**
 * Enhanced observability middleware
 */
var observabilityMiddleware = function (req, res, next) {
    // Generate or use existing request ID
    var requestId = req.headers['x-request-id'] || (0, node_crypto_1.randomUUID)();
    req.id = requestId;
    // Set start time for performance tracking
    req.startTime = Date.now();
    // Add request ID to response headers
    res.setHeader('X-Request-ID', requestId);
    res.setHeader('X-Request-Start', req.startTime.toString());
    // Create request logger and metrics
    req.log = createRequestLogger(req);
    req.metrics = createRequestMetrics(req);
    // Redact sensitive data from request
    var redactedHeaders = redactSensitiveData(req.headers, SENSITIVE_FIELDS.headers);
    var redactedQuery = redactSensitiveData(req.query, SENSITIVE_FIELDS.query);
    var redactedBody = deepRedactSensitiveData(req.body, SENSITIVE_FIELDS.body);
    // Log request start with redacted data
    req.log.info("".concat(req.method, " ").concat(req.url, " - Request started"), {
        headers: redactedHeaders,
        query: redactedQuery,
        body: redactedBody,
        contentLength: req.get('content-length'),
        contentType: req.get('content-type')
    });
    // Override res.send to log response and redact sensitive data
    var originalSend = res.send;
    res.send = function (data) {
        var responseTime = Date.now() - req.startTime;
        var responseSize = Buffer.byteLength(data, 'utf8');
        // Redact sensitive data from response
        var redactedData = data;
        if (typeof data === 'string') {
            try {
                var parsed = JSON.parse(data);
                redactedData = JSON.stringify(deepRedactSensitiveData(parsed, SENSITIVE_FIELDS.response));
            }
            catch (_a) {
                // Not JSON, keep as is
                redactedData = data;
            }
        }
        else if (typeof data === 'object') {
            redactedData = deepRedactSensitiveData(data, SENSITIVE_FIELDS.response);
        }
        // Log response with appropriate level
        if (res.statusCode >= 500) {
            req.log.error("".concat(req.method, " ").concat(req.url, " - ").concat(res.statusCode), {
                responseTime: responseTime,
                statusCode: res.statusCode,
                responseSize: responseSize,
                data: redactedData
            });
            // Increment error metrics
            req.metrics.increment('http_requests_total', {
                method: req.method,
                status: res.statusCode.toString(),
                endpoint: req.url
            });
        }
        else if (res.statusCode >= 400) {
            req.log.warn("".concat(req.method, " ").concat(req.url, " - ").concat(res.statusCode), {
                responseTime: responseTime,
                statusCode: res.statusCode,
                responseSize: responseSize,
                data: redactedData
            });
            // Increment client error metrics
            req.metrics.increment('http_requests_total', {
                method: req.method,
                status: res.statusCode.toString(),
                endpoint: req.url
            });
        }
        else {
            req.log.info("".concat(req.method, " ").concat(req.url, " - ").concat(res.statusCode), {
                responseTime: responseTime,
                statusCode: res.statusCode,
                responseSize: responseSize
            });
            // Increment success metrics
            req.metrics.increment('http_requests_total', {
                method: req.method,
                status: res.statusCode.toString(),
                endpoint: req.url
            });
        }
        // Record response time histogram
        req.metrics.histogram('http_request_duration_seconds', responseTime / 1000, {
            method: req.method,
            endpoint: req.url
        });
        // Add response headers for observability
        res.setHeader('X-Response-Time', "".concat(responseTime, "ms"));
        res.setHeader('X-Response-Size', responseSize.toString());
        return originalSend.call(this, data);
    };
    // Override res.json to ensure consistent logging
    var originalJson = res.json;
    res.json = function (data) {
        return res.send(JSON.stringify(data));
    };
    next();
};
exports.observabilityMiddleware = observabilityMiddleware;
/**
 * Error tracking middleware
 */
var errorTrackingMiddleware = function (err, req, res, next) {
    var _a, _b;
    var responseTime = Date.now() - req.startTime;
    // Log error with full context
    req.log.error('Unhandled error occurred', {
        error: {
            message: err.message,
            stack: err.stack,
            name: err.name,
            code: err.code
        },
        request: {
            method: req.method,
            url: req.url,
            headers: redactSensitiveData(req.headers, SENSITIVE_FIELDS.headers),
            query: redactSensitiveData(req.query, SENSITIVE_FIELDS.query),
            body: deepRedactSensitiveData(req.body, SENSITIVE_FIELDS.body)
        },
        response: {
            time: responseTime,
            statusCode: res.statusCode
        },
        user: {
            id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            role: (_b = req.user) === null || _b === void 0 ? void 0 : _b.role
        }
    });
    // Increment error metrics
    req.metrics.increment('http_errors_total', {
        method: req.method,
        endpoint: req.url,
        errorType: err.name || 'Unknown'
    });
    next(err);
};
exports.errorTrackingMiddleware = errorTrackingMiddleware;
/**
 * Performance monitoring middleware
 */
var performanceMiddleware = function (req, res, next) {
    var startTime = process.hrtime.bigint();
    res.on('finish', function () {
        var endTime = process.hrtime.bigint();
        var duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
        // Log slow requests
        if (duration > 1000) { // 1 second threshold
            req.log.warn('Slow request detected', {
                duration: duration,
                method: req.method,
                url: req.url,
                statusCode: res.statusCode
            });
        }
        // Record performance metrics
        req.metrics.histogram('http_request_duration_ms', duration, {
            method: req.method,
            endpoint: req.url
        });
    });
    next();
};
exports.performanceMiddleware = performanceMiddleware;
/**
 * Security monitoring middleware
 */
var securityMonitoringMiddleware = function (req, res, next) {
    // Monitor for suspicious patterns
    var suspiciousPatterns = [
        /\.\.\//, // Directory traversal
        /<script/i, // XSS attempts
        /union\s+select/i, // SQL injection
        /eval\s*\(/i, // Code injection
        /document\.cookie/i // Cookie theft attempts
    ];
    var requestString = JSON.stringify({
        url: req.url,
        headers: req.headers,
        body: req.body,
        query: req.query
    });
    suspiciousPatterns.forEach(function (pattern, index) {
        if (pattern.test(requestString)) {
            req.log.warn('Suspicious request pattern detected', {
                pattern: pattern.toString(),
                patternIndex: index,
                method: req.method,
                url: req.url,
                ip: req.ip,
                userAgent: req.get('User-Agent')
            });
            // Increment security alert metrics
            req.metrics.increment('security_alerts_total', {
                type: 'suspicious_pattern',
                pattern: pattern.toString()
            });
        }
    });
    // Monitor authentication failures
    if (res.statusCode === 401 || res.statusCode === 403) {
        req.log.warn('Authentication/Authorization failure', {
            method: req.method,
            url: req.url,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
            statusCode: res.statusCode
        });
        // Increment auth failure metrics
        req.metrics.increment('auth_failures_total', {
            method: req.method,
            endpoint: req.url,
            statusCode: res.statusCode.toString()
        });
    }
    next();
};
exports.securityMonitoringMiddleware = securityMonitoringMiddleware;
/**
 * Export all middleware for easy import
 */
exports.observability = {
    middleware: exports.observabilityMiddleware,
    errorTracking: exports.errorTrackingMiddleware,
    performance: exports.performanceMiddleware,
    security: exports.securityMonitoringMiddleware
};
exports.default = exports.observability;
