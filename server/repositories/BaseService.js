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
exports.BaseService = void 0;
/**
 * Base Service Class for Repositories
 * Provides common error handling and utility methods
 */
var BaseService = /** @class */ (function () {
    function BaseService() {
    }
    /**
     * Handle service errors consistently
     */
    BaseService.prototype.handleError = function (error) {
        var _a, _b;
        if ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
            throw new Error(error.response.data.message);
        }
        if (error.message) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    };
    /**
     * Validate required fields
     */
    BaseService.prototype.validateRequired = function (data, requiredFields) {
        for (var _i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
            var field = requiredFields_1[_i];
            if (!data[field]) {
                throw new Error("".concat(field, " is required"));
            }
        }
    };
    /**
     * Sanitize data for database operations
     */
    BaseService.prototype.sanitizeData = function (data) {
        var sanitized = __assign({}, data);
        // Remove undefined values
        Object.keys(sanitized).forEach(function (key) {
            if (sanitized[key] === undefined) {
                delete sanitized[key];
            }
        });
        return sanitized;
    };
    /**
     * Generate unique ID
     */
    BaseService.prototype.generateId = function () {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };
    /**
     * Format date for database
     */
    BaseService.prototype.formatDate = function (date) {
        if (typeof date === 'string') {
            return date;
        }
        return date.toISOString();
    };
    return BaseService;
}());
exports.BaseService = BaseService;
