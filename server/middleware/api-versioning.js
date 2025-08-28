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
exports.extractPaginationParams = extractPaginationParams;
exports.generatePaginationLinks = generatePaginationLinks;
exports.createErrorResponse = createErrorResponse;
exports.createSuccessResponse = createSuccessResponse;
exports.createPaginatedResponse = createPaginatedResponse;
exports.errorHandler = errorHandler;
exports.apiVersioning = apiVersioning;
exports.paginationMiddleware = paginationMiddleware;
var node_crypto_1 = require("node:crypto");
var logger_1 = require("../utils/logger");
// Extract pagination parameters from request
function extractPaginationParams(req) {
    var page = Math.max(1, parseInt(req.query.page) || 1);
    var pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize) || 20));
    return { page: page, pageSize: pageSize };
}
// Generate pagination links
function generatePaginationLinks(req, page, totalPages, total) {
    var baseUrl = "".concat(req.protocol, "://").concat(req.get('host')).concat(req.path);
    var queryParams = new URLSearchParams(req.query);
    var links = {
        first: "".concat(baseUrl, "?").concat(queryParams.toString()),
        last: "".concat(baseUrl, "?").concat(new URLSearchParams(__assign(__assign({}, req.query), { page: totalPages.toString() })).toString())
    };
    if (page > 1) {
        links.prev = "".concat(baseUrl, "?").concat(new URLSearchParams(__assign(__assign({}, req.query), { page: (page - 1).toString() })).toString());
    }
    if (page < totalPages) {
        links.next = "".concat(baseUrl, "?").concat(new URLSearchParams(__assign(__assign({}, req.query), { page: (page + 1).toString() })).toString());
    }
    return links;
}
// Standardized error response middleware
function createErrorResponse(code, message, details, statusCode) {
    if (statusCode === void 0) { statusCode = 500; }
    var traceId = (0, node_crypto_1.randomUUID)();
    return {
        statusCode: statusCode,
        body: {
            code: code,
            message: message,
            details: details,
            traceId: traceId
        }
    };
}
// Standardized success response
function createSuccessResponse(data, message) {
    return {
        success: true,
        data: data,
        message: message,
        timestamp: new Date().toISOString()
    };
}
// Standardized paginated response
function createPaginatedResponse(req, data, total, page, pageSize, message) {
    var totalPages = Math.ceil(total / pageSize);
    var links = generatePaginationLinks(req, page, totalPages, total);
    return {
        success: true,
        data: data,
        pagination: {
            page: page,
            pageSize: pageSize,
            total: total,
            totalPages: totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        },
        links: links,
        message: message,
        timestamp: new Date().toISOString()
    };
}
// Error handling middleware
function errorHandler(error, req, res, next) {
    var traceId = (0, node_crypto_1.randomUUID)();
    // Log error with trace ID
    logger_1.log.error("[".concat(traceId, "] Error"), { error: error });
    // CSRF errors
    if (error.code === 'EBADCSRFTOKEN') {
        var errorResponse_1 = createErrorResponse('CSRF_TOKEN_INVALID', 'Invalid CSRF token', { reason: 'token_mismatch' }, 403);
        return res.status(errorResponse_1.statusCode).json(errorResponse_1.body);
    }
    // Rate limit errors
    if (error.status === 429) {
        var errorResponse_2 = createErrorResponse('RATE_LIMIT_EXCEEDED', 'Rate limit exceeded', {
            limit: error.limit,
            remaining: error.remaining,
            resetTime: error.resetTime,
            retryAfter: error.retryAfter
        }, 429);
        return res.status(errorResponse_2.statusCode).json(errorResponse_2.body);
    }
    // Validation errors
    if (error.name === 'ValidationError') {
        var errorResponse_3 = createErrorResponse('VALIDATION_ERROR', 'Validation failed', error.details || error.message, 400);
        return res.status(errorResponse_3.statusCode).json(errorResponse_3.body);
    }
    // Authentication errors
    if (error.name === 'AuthenticationError') {
        var errorResponse_4 = createErrorResponse('AUTHENTICATION_ERROR', 'Authentication failed', { reason: error.reason || 'invalid_credentials' }, 401);
        return res.status(errorResponse_4.statusCode).json(errorResponse_4.body);
    }
    // Authorization errors
    if (error.name === 'AuthorizationError') {
        var errorResponse_5 = createErrorResponse('AUTHORIZATION_ERROR', 'Access denied', {
            requiredRole: error.requiredRole,
            userRole: error.userRole,
            resource: error.resource,
            action: error.action
        }, 403);
        return res.status(errorResponse_5.statusCode).json(errorResponse_5.body);
    }
    // Not found errors
    if (error.status === 404 || error.name === 'NotFoundError') {
        var errorResponse_6 = createErrorResponse('NOT_FOUND', 'Resource not found', { resource: error.resource, id: error.id }, 404);
        return res.status(errorResponse_6.statusCode).json(errorResponse_6.body);
    }
    // Conflict errors
    if (error.status === 409 || error.name === 'ConflictError') {
        var errorResponse_7 = createErrorResponse('CONFLICT', 'Resource conflict', {
            resource: error.resource,
            field: error.field,
            value: error.value,
            existingId: error.existingId
        }, 409);
        return res.status(errorResponse_7.statusCode).json(errorResponse_7.body);
    }
    // Default error response
    var isDevelopment = process.env.NODE_ENV === 'development';
    var errorResponse = createErrorResponse('INTERNAL_ERROR', isDevelopment ? error.message : 'Internal server error', isDevelopment ? { stack: error.stack } : undefined, error.status || 500);
    res.status(errorResponse.statusCode).json(errorResponse.body);
}
// API versioning middleware
function apiVersioning(version) {
    if (version === void 0) { version = 'v1'; }
    return function (req, res, next) {
        // Add version info to request
        req.apiVersion = version;
        // Add version to response headers
        res.setHeader('X-API-Version', version);
        next();
    };
}
// Pagination middleware
function paginationMiddleware(req, res, next) {
    var _a = extractPaginationParams(req), page = _a.page, pageSize = _a.pageSize;
    // Add pagination info to request
    req.pagination = { page: page, pageSize: pageSize };
    // Add pagination headers
    res.setHeader('X-Pagination-Page', page.toString());
    res.setHeader('X-Pagination-PageSize', pageSize.toString());
    next();
}
