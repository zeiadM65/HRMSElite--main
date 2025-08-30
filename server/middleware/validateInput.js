"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
exports.validate = validate;
exports.validateQuery = validateQuery;
exports.validateParams = validateParams;
exports.validateMultiple = validateMultiple;
exports.sanitizeInput = sanitizeInput;
var logger_1 = require("../utils/logger");
var sanitize_1 = require("../utils/sanitize");
// Enhanced validation middleware with proper TypeScript support
function validate(schema) {
    return function (req, res, next) {
        try {
            // Validate request body
            var result = schema.safeParse(req.body);
            if (!result.success) {
                // Enhanced error handling with detailed validation errors
                var errors = result.error.errors.map(function (error) { return ({
                    'field': error.path.join('.'),
                    'message': error.message,
                    'code': error.code
                }); });
                logger_1.log.warn('Validation failed', {
                    'path': req.path,
                    'method': req.method,
                    errors: errors,
                    'ip': req.ip
                });
                return res.status(400).json({
                    'error': 'Validation failed',
                    'message': 'بيانات غير صحيحة',
                    'details': errors,
                    'timestamp': new Date().toISOString()
                });
            }
            // If validation passes, replace req.body with validated data
            req.body = result.data;
            next();
        }
        catch (error) {
            logger_1.log.error('Validation middleware error', {
                'error': error instanceof Error ? error.message : 'Unknown error',
                'path': req.path,
                'method': req.method
            });
            return res.status(500).json({
                'error': 'Internal validation error',
                'message': 'خطأ في التحقق من البيانات'
            });
        }
    };
}
// Query parameter validation
function validateQuery(schema) {
    return function (req, res, next) {
        try {
            var result = schema.safeParse(req.query);
            if (!result.success) {
                var errors = result.error.errors.map(function (error) { return ({
                    'field': error.path.join('.'),
                    'message': error.message,
                    'code': error.code
                }); });
                logger_1.log.warn('Query validation failed', {
                    'path': req.path,
                    'method': req.method,
                    errors: errors
                });
                return res.status(400).json({
                    'error': 'Query validation failed',
                    'message': 'معاملات البحث غير صحيحة',
                    'details': errors
                });
            }
            req.query = result.data;
            next();
        }
        catch (error) {
            logger_1.log.error('Query validation middleware error', {
                'error': error instanceof Error ? error.message : 'Unknown error',
                'path': req.path
            });
            return res.status(500).json({
                'error': 'Internal query validation error',
                'message': 'خطأ في التحقق من معاملات البحث'
            });
        }
    };
}
// URL parameters validation
function validateParams(schema) {
    return function (req, res, next) {
        try {
            var result = schema.safeParse(req.params);
            if (!result.success) {
                var errors = result.error.errors.map(function (error) { return ({
                    'field': error.path.join('.'),
                    'message': error.message,
                    'code': error.code
                }); });
                logger_1.log.warn('Parameters validation failed', {
                    'path': req.path,
                    'method': req.method,
                    errors: errors
                });
                return res.status(400).json({
                    'error': 'Parameters validation failed',
                    'message': 'معاملات الرابط غير صحيحة',
                    'details': errors
                });
            }
            req.params = result.data;
            next();
        }
        catch (error) {
            logger_1.log.error('Parameters validation middleware error', {
                'error': error instanceof Error ? error.message : 'Unknown error',
                'path': req.path
            });
            return res.status(500).json({
                'error': 'Internal parameters validation error',
                'message': 'خطأ في التحقق من معاملات الرابط'
            });
        }
    };
}
// Multiple source validation
function validateMultiple(validations) {
    return function (req, res, next) {
        try {
            var allErrors_1 = [];
            // Validate body if schema provided
            if (validations.body) {
                var bodyResult = validations.body.safeParse(req.body);
                if (!bodyResult.success) {
                    bodyResult.error.errors.forEach(function (error) {
                        allErrors_1.push({
                            source: 'body',
                            field: error.path.join('.'),
                            message: error.message,
                            code: error.code
                        });
                    });
                }
                else {
                    req.body = bodyResult.data;
                }
            }
            // Validate query if schema provided
            if (validations.query) {
                var queryResult = validations.query.safeParse(req.query);
                if (!queryResult.success) {
                    queryResult.error.errors.forEach(function (error) {
                        allErrors_1.push({
                            source: 'query',
                            field: error.path.join('.'),
                            message: error.message,
                            code: error.code
                        });
                    });
                }
                else {
                    req.query = queryResult.data;
                }
            }
            // Validate params if schema provided
            if (validations.params) {
                var paramsResult = validations.params.safeParse(req.params);
                if (!paramsResult.success) {
                    paramsResult.error.errors.forEach(function (error) {
                        allErrors_1.push({
                            source: 'params',
                            field: error.path.join('.'),
                            message: error.message,
                            code: error.code
                        });
                    });
                }
                else {
                    req.params = paramsResult.data;
                }
            }
            // If there are any errors, return them
            if (allErrors_1.length > 0) {
                logger_1.log.warn('Multiple validation failed', {
                    'path': req.path,
                    'method': req.method,
                    errors: allErrors_1
                });
                return res.status(400).json({
                    'error': 'Validation failed',
                    'message': 'بيانات غير صحيحة',
                    'details': allErrors_1,
                    'timestamp': new Date().toISOString()
                });
            }
            next();
        }
        catch (error) {
            logger_1.log.error('Multiple validation middleware error', {
                'error': error instanceof Error ? error.message : 'Unknown error',
                'path': req.path,
                'method': req.method
            });
            return res.status(500).json({
                'error': 'Internal validation error',
                'message': 'خطأ في التحقق من البيانات'
            });
        }
    };
}
// Input sanitization middleware
function sanitizeInput(req, res, next) {
    req.body = (0, sanitize_1.deepSanitize)(req.body);
    req.query = (0, sanitize_1.deepSanitize)(req.query);
    req.params = (0, sanitize_1.deepSanitize)(req.params);
    next();
}
// Export a structured object for easier imports
exports.validateInput = {
    body: validate,
    query: validateQuery,
    params: validateParams,
    multiple: validateMultiple,
    sanitize: sanitizeInput
};
