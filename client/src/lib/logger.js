"use strict";
// Removed conflicting import. This module defines and exports `logger`.
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
exports.LoggingErrorBoundary = exports.log = exports.logger = exports.LogLevel = void 0;
exports.useLogger = useLogger;
/**
 * Comprehensive logging utility for HRMS Elite
 * Provides structured logging with different levels and environments
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["NONE"] = 4] = "NONE";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger() {
        var _a, _b;
        this.isDevelopment = typeof import.meta !== 'undefined' ? (_a = import.meta.env) === null || _a === void 0 ? void 0 : _a.DEV : process.env.NODE_ENV !== 'production';
        this.isProduction = typeof import.meta !== 'undefined' ? (_b = import.meta.env) === null || _b === void 0 ? void 0 : _b.PROD : process.env.NODE_ENV === 'production';
        this.logLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO;
    }
    Logger.prototype.formatMessage = function (level, message, data, source) {
        var timestamp = new Date().toISOString();
        var levelName = LogLevel[level];
        var sourceInfo = source ? " [".concat(source, "]") : '';
        var dataInfo = data ? " | Data: ".concat(JSON.stringify(data, null, 2)) : '';
        return "[".concat(timestamp, "] ").concat(levelName).concat(sourceInfo, ": ").concat(message).concat(dataInfo);
    };
    Logger.prototype.shouldLog = function (level) {
        return level >= this.logLevel;
    };
    Logger.prototype.logToConsole = function (level, message, data, source) {
        if (!this.shouldLog(level)) {
            return;
        }
        var formattedMessage = this.formatMessage(level, message, data, source);
        switch (level) {
            case LogLevel.DEBUG:
                console.debug(formattedMessage);
                break;
            case LogLevel.INFO:
                console.info(formattedMessage);
                break;
            case LogLevel.WARN:
                console.warn(formattedMessage);
                break;
            case LogLevel.ERROR:
                console.error(formattedMessage);
                break;
        }
    };
    Logger.prototype.logToService = function (_logData) {
        // In production, send logs to external service
        if (this.isProduction) {
            // TODO: Implement external logging service (e.g., Sentry, LogRocket)
            // For now, we'll just use console in production too
            this.logToConsole(_logData.level, _logData.message, _logData.data, _logData.source);
        }
    };
    Logger.prototype.debug = function (message, data, source) {
        this.logToConsole(LogLevel.DEBUG, message, data, source);
    };
    Logger.prototype.info = function (message, data, source) {
        this.logToConsole(LogLevel.INFO, message, data, source);
        this.logToService(__assign({ 'timestamp': new Date().toISOString(), 'level': LogLevel.INFO, message: message, data: data }, (source && { source: source })));
    };
    Logger.prototype.warn = function (message, data, source) {
        this.logToConsole(LogLevel.WARN, message, data, source);
        this.logToService(__assign({ 'timestamp': new Date().toISOString(), 'level': LogLevel.WARN, message: message, data: data }, (source && { source: source })));
    };
    Logger.prototype.error = function (message, error, source) {
        var errorData = error instanceof Error
            ? { 'message': error.message, 'stack': error.stack, 'name': error.name }
            : error;
        this.logToConsole(LogLevel.ERROR, message, errorData, source);
        this.logToService(__assign({ 'timestamp': new Date().toISOString(), 'level': LogLevel.ERROR, message: message, 'data': errorData }, (source && { source: source })));
    };
    // Specialized logging methods
    Logger.prototype.apiCall = function (endpoint, method, status, duration) {
        this.info("API ".concat(method, " ").concat(endpoint), { status: status, duration: duration }, 'API');
    };
    Logger.prototype.userAction = function (action, userId, data) {
        this.info("User action: ".concat(action), __assign({ userId: userId }, data), 'USER_ACTION');
    };
    Logger.prototype.performance = function (operation, duration, data) {
        this.info("Performance: ".concat(operation), __assign({ duration: duration }, data), 'PERFORMANCE');
    };
    Logger.prototype.security = function (event, data) {
        this.warn("Security event: ".concat(event), data, 'SECURITY');
    };
    // Development helpers
    Logger.prototype.dev = function (message, data, source) {
        if (this.isDevelopment) {
            this.debug(message, data, source);
        }
    };
    // Set log level
    Logger.prototype.setLogLevel = function (level) {
        this.logLevel = level;
    };
    // Get current log level
    Logger.prototype.getLogLevel = function () {
        return this.logLevel;
    };
    return Logger;
}());
// Create singleton instance
exports.logger = new Logger();
// Export convenience functions
exports.log = {
    'debug': function (message, data, source) { return exports.logger.debug(message, data, source); },
    'info': function (message, data, source) { return exports.logger.info(message, data, source); },
    'warn': function (message, data, source) { return exports.logger.warn(message, data, source); },
    'error': function (message, error, source) { return exports.logger.error(message, error, source); },
    'api': function (endpoint, method, status, duration) { return exports.logger.apiCall(endpoint, method, status, duration); },
    'user': function (action, userId, data) { return exports.logger.userAction(action, userId, data); },
    'perf': function (operation, duration, data) { return exports.logger.performance(operation, duration, data); },
    'security': function (event, data) { return exports.logger.security(event, data); },
    'dev': function (message, data, source) { return exports.logger.dev(message, data, source); }
};
/**
 * Lightweight UI logging helper for components
 * Matches usage in pages by providing apiRequest/apiResponse helpers
 */
function useLogger(componentName) {
    return {
        'debug': function (message, data) { return exports.logger.debug(message, data, componentName); },
        'info': function (message, data) { return exports.logger.info(message, data, componentName); },
        'warn': function (message, data) { return exports.logger.warn(message, data, componentName); },
        'error': function (message, dataOrError, possibleError) {
            var errorPayload = possibleError instanceof Error
                ? { 'message': possibleError.message, 'stack': possibleError.stack, 'name': possibleError.name }
                : undefined;
            var combined = errorPayload
                ? { 'data': dataOrError, 'error': errorPayload }
                : dataOrError;
            exports.logger.error(message, combined, componentName);
        },
        'apiRequest': function (method, url, data) {
            exports.logger.info("API ".concat(method, " ").concat(url), data, componentName);
        },
        'apiResponse': function (method, url, status, data) {
            if (status >= 400) {
                exports.logger.error("API ".concat(method, " ").concat(url, " - ").concat(status), data, componentName);
            }
            else {
                exports.logger.info("API ".concat(method, " ").concat(url, " - ").concat(status), data, componentName);
            }
        }
    };
}
exports.default = exports.logger;
// Re-export UI Logging Error Boundary for convenient access via '@/lib/logger'
var logger_ui_1 = require("./logger-ui");
Object.defineProperty(exports, "LoggingErrorBoundary", { enumerable: true, get: function () { return logger_ui_1.LoggingErrorBoundary; } });
