"use strict";
/**
 * Server-side logging utility for HRMS Elite
 * Provides structured logging with different levels and environments
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
var pii_1 = require("./pii");
// Create enum-like structure for log levels
var LogLevels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    FATAL: 4
};
// Map string log levels to numeric values
var logLevelMap = {
    debug: LogLevels.DEBUG,
    info: LogLevels.INFO,
    warn: LogLevels.WARN,
    error: LogLevels.ERROR,
    fatal: LogLevels.FATAL
};
// Map numeric values back to string names
var logLevelNames = (_a = {},
    _a[LogLevels.DEBUG] = 'DEBUG',
    _a[LogLevels.INFO] = 'INFO',
    _a[LogLevels.WARN] = 'WARN',
    _a[LogLevels.ERROR] = 'ERROR',
    _a[LogLevels.FATAL] = 'FATAL',
    _a);
var ServerLogger = /** @class */ (function () {
    function ServerLogger() {
        this.isDevelopment = process.env.NODE_ENV === 'development';
        this.isProduction = process.env.NODE_ENV === 'production';
        this.logLevel = this.isDevelopment ? LogLevels.DEBUG : LogLevels.INFO;
        this.externalUrl = process.env.LOG_SHIPPER_URL;
        this.shipperType = process.env.LOG_SHIPPER_TYPE || 'loki';
    }
    ServerLogger.prototype.formatMessage = function (level, message, data, source) {
        var timestamp = new Date().toISOString();
        var levelName = logLevelNames[level];
        var sourceInfo = source ? " [".concat(source, "]") : '';
        var masked = data ? (0, pii_1.maskPII)(data) : undefined;
        var dataInfo = masked ? " | Data: ".concat(JSON.stringify(masked, null, 2)) : '';
        return "[".concat(timestamp, "] ").concat(levelName).concat(sourceInfo, ": ").concat(message).concat(dataInfo);
    };
    ServerLogger.prototype.shouldLog = function (level) {
        return level >= this.logLevel;
    };
    ServerLogger.prototype.logToConsole = function (level, message, data, source) {
        if (!this.shouldLog(level)) {
            return;
        }
        var formattedMessage = this.formatMessage(level, message, data, source);
        switch (level) {
            case LogLevels.DEBUG:
                console.debug(formattedMessage);
                break;
            case LogLevels.INFO:
                console.info(formattedMessage);
                break;
            case LogLevels.WARN:
                console.warn(formattedMessage);
                break;
            case LogLevels.ERROR:
            case LogLevels.FATAL:
                // Use console.error for error and fatal levels
                console.error(formattedMessage);
                break;
        }
    };
    ServerLogger.prototype.attachCorrelation = function (data) {
        if (!data)
            return { data: data };
        var requestId = data.correlationId || data.requestId;
        if (requestId && !data.correlationId) {
            return { data: __assign(__assign({}, data), { correlationId: requestId }), correlationId: requestId };
        }
        return { data: data, correlationId: requestId };
    };
    ServerLogger.prototype.logToService = function (logData) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isProduction || !this.externalUrl) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(this.shipperType === 'loki')) return [3 /*break*/, 3];
                        payload = {
                            streams: [
                                {
                                    stream: { level: logData.level, app: 'hrms-elite' },
                                    values: [["".concat(Date.now(), "000000"), JSON.stringify(logData)]]
                                }
                            ]
                        };
                        return [4 /*yield*/, fetch(this.externalUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, fetch(this.externalUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(logData)
                        })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        this.logToConsole(LogLevels.ERROR, 'Failed to ship log', { error: err_1.message }, 'LOGGER');
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ServerLogger.prototype.debug = function (message, data, source) {
        var enriched = this.attachCorrelation(data).data;
        this.logToConsole(LogLevels.DEBUG, message, enriched, source);
    };
    ServerLogger.prototype.info = function (message, data, source) {
        var _a = this.attachCorrelation(data), enriched = _a.data, correlationId = _a.correlationId;
        this.logToConsole(LogLevels.INFO, message, enriched, source);
        void this.logToService(__assign(__assign(__assign({ 'timestamp': new Date().toISOString(), 'level': 'info', message: message }, (enriched && { data: enriched })), (source && { source: source })), (correlationId && { correlationId: correlationId })));
    };
    ServerLogger.prototype.warn = function (message, data, source) {
        var _a = this.attachCorrelation(data), enriched = _a.data, correlationId = _a.correlationId;
        this.logToConsole(LogLevels.WARN, message, enriched, source);
        void this.logToService(__assign(__assign(__assign({ 'timestamp': new Date().toISOString(), 'level': 'warn', message: message }, (enriched && { data: enriched })), (source && { source: source })), (correlationId && { correlationId: correlationId })));
    };
    ServerLogger.prototype.error = function (message, error, source) {
        var errorData = error instanceof Error
            ? { 'message': error.message, 'stack': error.stack, 'name': error.name }
            : error !== null && error !== void 0 ? error : {};
        var _a = this.attachCorrelation(errorData), enriched = _a.data, correlationId = _a.correlationId;
        this.logToConsole(LogLevels.ERROR, message, enriched, source);
        void this.logToService(__assign(__assign({ 'timestamp': new Date().toISOString(), 'level': 'error', message: message, 'data': enriched }, (source && { source: source })), (correlationId && { correlationId: correlationId })));
    };
    // Specialized logging methods
    ServerLogger.prototype.apiCall = function (endpoint, method, status, duration, ip) {
        this.info("API ".concat(method, " ").concat(endpoint), { status: status, duration: duration, ip: ip }, 'API');
    };
    ServerLogger.prototype.database = function (operation, table, duration, data) {
        this.info("Database ".concat(operation), __assign({ table: table, duration: duration }, data), 'DATABASE');
    };
    ServerLogger.prototype.auth = function (event, userId, data) {
        this.info("Auth event: ".concat(event), __assign({ userId: userId }, data), 'AUTH');
    };
    ServerLogger.prototype.security = function (event, ip, data) {
        this.warn("Security event: ".concat(event), __assign({ ip: ip }, data), 'SECURITY');
    };
    ServerLogger.prototype.middleware = function (name, duration, data) {
        this.debug("Middleware ".concat(name), __assign({ duration: duration }, data), 'MIDDLEWARE');
    };
    // Development helpers
    ServerLogger.prototype.dev = function (message, data, source) {
        if (this.isDevelopment) {
            this.debug(message, data, source);
        }
    };
    // Set log level
    ServerLogger.prototype.setLogLevel = function (level) {
        this.logLevel = logLevelMap[level];
    };
    // Get current log level
    ServerLogger.prototype.getLogLevel = function () {
        // Find the string key for the current numeric level
        for (var _i = 0, _a = Object.entries(logLevelMap); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value === this.logLevel) {
                return key;
            }
        }
        return 'info'; // fallback
    };
    return ServerLogger;
}());
// Create singleton instance
var serverLogger = new ServerLogger();
// Optional external log shipper (e.g., Loki/ELK)
var sinkUrl = process.env.LOG_SHIPPER_URL;
if (sinkUrl) {
    serverLogger.info('External log sink enabled', {
        externalUrl: sinkUrl,
        type: process.env.LOG_SHIPPER_TYPE || 'loki'
    });
}
// Export convenience functions
exports.log = {
    debug: function (message, data, source) { return serverLogger.debug(message, data, source); },
    info: function (message, data, source) { return serverLogger.info(message, data, source); },
    warn: function (message, data, source) { return serverLogger.warn(message, data, source); },
    error: function (message, error, source) { return serverLogger.error(message, error, source); },
    api: function (endpoint, method, status, duration, ip) {
        return serverLogger.apiCall(endpoint, method, status, duration, ip);
    },
    db: function (operation, table, duration, data) {
        return serverLogger.database(operation, table, duration, data);
    },
    auth: function (event, userId, data) { return serverLogger.auth(event, userId, data); },
    security: function (event, ip, data) { return serverLogger.security(event, ip, data); },
    middleware: function (name, duration, data) {
        return serverLogger.middleware(name, duration, data);
    },
    dev: function (message, data, source) { return serverLogger.dev(message, data, source); }
};
exports.default = serverLogger;
