"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingErrorBoundary = exports.uiLogger = void 0;
exports.useLogger = useLogger;
exports.withLogging = withLogging;
// Internal Logging System for HRMS Elite
var react_1 = __importDefault(require("react"));
var logger_1 = require("./logger");
var useAppStore_1 = require("../stores/useAppStore");
var LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    FATAL: 4,
};
var Logger = /** @class */ (function () {
    function Logger() {
        this.logs = [];
        this.maxLogs = 1000;
        this.currentLevel = LOG_LEVELS.INFO;
        this.isProduction = process.env.NODE_ENV === 'production';
        this.setupGlobalErrorHandling();
    }
    Logger.getInstance = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.prototype.setupGlobalErrorHandling = function () {
        var _this = this;
        // Only setup global error handling in browser environment
        if (typeof window === 'undefined') {
            return;
        }
        // Global error handler
        window.addEventListener('error', function (event) {
            _this.error('Global Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error,
            });
        });
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', function (event) {
            _this.error('Unhandled Promise Rejection', {
                reason: event.reason,
                promise: event.promise,
            });
        });
        // React error boundary fallback
        window.__REACT_ERROR_BOUNDARY_FALLBACK__ = function (error, errorInfo) {
            _this.error('React Error Boundary', {
                error: error.message,
                stack: error.stack,
                componentStack: errorInfo.componentStack,
            });
        };
    };
    Logger.prototype.createLogEntry = function (level, message, data, error, component) {
        return {
            timestamp: new Date().toISOString(),
            level: level,
            message: message,
            data: data !== null && data !== void 0 ? data : undefined,
            error: error !== null && error !== void 0 ? error : undefined,
            component: component !== null && component !== void 0 ? component : undefined,
            userId: this.getCurrentUserId(),
            sessionId: this.getSessionId(),
        };
    };
    Logger.prototype.getCurrentUserId = function () {
        var _a;
        try {
            return (_a = useAppStore_1.useAppStore.getState().user) === null || _a === void 0 ? void 0 : _a.id;
        }
        catch (_b) {
            return undefined;
        }
    };
    Logger.prototype.getSessionId = function () {
        var _a;
        var storage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
        var sessionId = (_a = storage === null || storage === void 0 ? void 0 : storage.getItem('hrms-session-id')) !== null && _a !== void 0 ? _a : '';
        if (!sessionId) {
            sessionId = "session_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
            storage === null || storage === void 0 ? void 0 : storage.setItem('hrms-session-id', sessionId);
        }
        return sessionId;
    };
    Logger.prototype.addLog = function (entry) {
        this.logs.push(entry);
        // Keep only the last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs);
        }
        // Console output based on environment
        if (!this.isProduction || entry.level === 'ERROR' || entry.level === 'FATAL') {
            this.outputToConsole(entry);
        }
        // Send critical errors to server in production
        if (this.isProduction && (entry.level === 'ERROR' || entry.level === 'FATAL')) {
            this.sendToServer(entry);
        }
    };
    Logger.prototype.outputToConsole = function (entry) {
        var _a;
        var prefix = "[".concat(entry.timestamp, "] [").concat(entry.level, "]");
        var componentPrefix = entry.component ? "[".concat(entry.component, "]") : '';
        switch (entry.level) {
            case 'DEBUG':
                break;
            case 'INFO':
                break;
            case 'WARN':
                break;
            case 'ERROR':
            case 'FATAL':
                logger_1.logger.error("".concat(prefix, " ").concat(componentPrefix, " ").concat(entry.message), (_a = entry.error) !== null && _a !== void 0 ? _a : entry.data, entry.component);
                break;
        }
    };
    Logger.prototype.sendToServer = function (entry) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch('/api/logs', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify(entry),
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        // Fallback to console if server logging fails
                        logger_1.logger.error('Failed to send log to server:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Public logging methods
    Logger.prototype.debug = function (message, data, component) {
        if (this.currentLevel <= LOG_LEVELS.DEBUG) {
            this.addLog(this.createLogEntry('DEBUG', message, data, undefined, component));
        }
    };
    Logger.prototype.info = function (message, data, component) {
        if (this.currentLevel <= LOG_LEVELS.INFO) {
            this.addLog(this.createLogEntry('INFO', message, data, undefined, component));
        }
    };
    Logger.prototype.warn = function (message, data, component) {
        if (this.currentLevel <= LOG_LEVELS.WARN) {
            this.addLog(this.createLogEntry('WARN', message, data, undefined, component));
        }
    };
    Logger.prototype.error = function (message, data, error, component) {
        if (this.currentLevel <= LOG_LEVELS.ERROR) {
            this.addLog(this.createLogEntry('ERROR', message, data, error, component));
        }
    };
    Logger.prototype.fatal = function (message, data, error, component) {
        if (this.currentLevel <= LOG_LEVELS.FATAL) {
            this.addLog(this.createLogEntry('FATAL', message, data, error, component));
        }
    };
    // Performance logging
    Logger.prototype.time = function (label, component) {
        var _this = this;
        var getNow = function () {
            var g = typeof globalThis !== 'undefined' ? globalThis : undefined;
            if (g &&
                typeof g === 'object' &&
                'performance' in g &&
                g.performance &&
                typeof g.performance.now === 'function') {
                return g.performance.now();
            }
            return Date.now();
        };
        var startTime = getNow();
        return {
            end: function (data) {
                var endTime = getNow();
                var duration = endTime - startTime;
                _this.info("".concat(label, " completed in ").concat(duration.toFixed(2), "ms"), data, component);
            }
        };
    };
    // API request logging
    Logger.prototype.apiRequest = function (method, url, data, component) {
        this.info("API ".concat(method, " ").concat(url), data, component);
    };
    Logger.prototype.apiResponse = function (method, url, status, data, component) {
        var level = status >= 400 ? 'ERROR' : 'INFO';
        var message = "API ".concat(method, " ").concat(url, " - ").concat(status);
        if (level === 'ERROR') {
            this.error(message, data, undefined, component);
        }
        else {
            this.info(message, data, component);
        }
    };
    // User action logging
    Logger.prototype.userAction = function (action, data, component) {
        this.info("User Action: ".concat(action), data, component);
    };
    // Navigation logging
    Logger.prototype.navigation = function (from, to, component) {
        this.info("Navigation: ".concat(from, " \u2192 ").concat(to), undefined, component);
    };
    // Get logs for debugging
    Logger.prototype.getLogs = function () {
        return __spreadArray([], this.logs, true);
    };
    // Clear logs
    Logger.prototype.clearLogs = function () {
        this.logs = [];
    };
    // Set log level
    Logger.prototype.setLevel = function (level) {
        this.currentLevel = LOG_LEVELS[level];
    };
    // Export logs
    Logger.prototype.exportLogs = function () {
        return JSON.stringify(this.logs, null, 2);
    };
    return Logger;
}());
// Create singleton instance
exports.uiLogger = Logger.getInstance();
// React Hook for component logging
function useLogger(componentName) {
    return {
        debug: function (message, data) { return exports.uiLogger.debug(message, data, componentName); },
        info: function (message, data) { return exports.uiLogger.info(message, data, componentName); },
        warn: function (message, data) { return exports.uiLogger.warn(message, data, componentName); },
        error: function (message, data, error) { return exports.uiLogger.error(message, data, error, componentName); },
        fatal: function (message, data, error) { return exports.uiLogger.fatal(message, data, error, componentName); },
        time: function (label) { return exports.uiLogger.time(label, componentName); },
    };
}
// Higher-order component for automatic logging
function withLogging(WrappedComponent, componentName) {
    return function WithLoggingComponent(props) {
        var log = useLogger(componentName);
        react_1.default.useEffect(function () {
            log.info('Component mounted');
            return function () { return log.info('Component unmounted'); };
        }, []);
        return react_1.default.createElement(WrappedComponent, props);
    };
}
// Error boundary with logging
var LoggingErrorBoundary = /** @class */ (function (_super) {
    __extends(LoggingErrorBoundary, _super);
    function LoggingErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    LoggingErrorBoundary.getDerivedStateFromError = function (error) {
        return { hasError: true, error: error };
    };
    LoggingErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        // Log rich context as info, and the error separately
        logger_1.logger.info('React Error Boundary context', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
        }, 'ErrorBoundary');
        logger_1.logger.error('React Error Boundary Caught Error', error, 'ErrorBoundary');
    };
    LoggingErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            if (this.props.fallback && this.state.error) {
                return react_1.default.createElement(this.props.fallback, { error: this.state.error });
            }
            return react_1.default.createElement('div', { className: 'p-4 text-center' }, react_1.default.createElement('h2', { className: 'text-lg font-semibold text-red-600' }, 'حدث خطأ'), react_1.default.createElement('p', {
                className: 'text-sm text-gray-600'
            }, 'يرجى تحديث الصفحة أو المحاولة مرة أخرى'));
        }
        return this.props.children;
    };
    return LoggingErrorBoundary;
}(react_1.default.Component));
exports.LoggingErrorBoundary = LoggingErrorBoundary;
