"use strict";
/**
 * Log Shipping Utility for HRMS Elite
 * Sends logs to ELK stack or Loki for centralized logging and monitoring
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogShipper = createLogShipper;
exports.initializeLogShipper = initializeLogShipper;
exports.getLogShipper = getLogShipper;
exports.shipLog = shipLog;
exports.closeLogShipper = closeLogShipper;
var winston_1 = __importDefault(require("winston"));
var winston_loki_1 = __importDefault(require("winston-loki"));
var logger_1 = require("./logger");
var LogShipper = /** @class */ (function () {
    function LogShipper(config) {
        this.logger = null;
        this.isInitialized = false;
        this.config = __assign({ enabled: false, type: 'loki', host: 'localhost', port: 3100, protocol: 'http', labels: {
                application: 'hrms-elite',
                environment: process.env.NODE_ENV || 'development',
                version: process.env.npm_package_version || '1.0.0'
            }, batchSize: 100, batchTimeout: 5000 }, config);
    }
    /**
     * Initialize the log shipper
     */
    LogShipper.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.enabled) {
                            logger_1.log.info('Log shipping is disabled', { config: this.config }, 'LOG_SHIPPER');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(this.config.type === 'loki')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.initializeLoki()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(this.config.type === 'elasticsearch')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.initializeElasticsearch()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.isInitialized = true;
                        logger_1.log.info('Log shipper initialized successfully', {
                            type: this.config.type,
                            host: this.config.host,
                            port: this.config.port
                        }, 'LOG_SHIPPER');
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        logger_1.log.error('Failed to initialize log shipper', { error: error_1 }, 'LOG_SHIPPER');
                        throw error_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Initialize Loki transport
     */
    LogShipper.prototype.initializeLoki = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lokiUrl;
            return __generator(this, function (_a) {
                lokiUrl = "".concat(this.config.protocol, "://").concat(this.config.host, ":").concat(this.config.port);
                this.logger = winston_1.default.createLogger({
                    level: 'info',
                    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
                    defaultMeta: __assign({ application: 'hrms-elite', environment: process.env.NODE_ENV || 'development', version: process.env.npm_package_version || '1.0.0' }, this.config.labels),
                    transports: [
                        new winston_loki_1.default({
                            host: lokiUrl,
                            json: true,
                            labels: this.config.labels,
                            batching: true,
                            interval: this.config.batchTimeout,
                            replaceTimestamp: true,
                            onConnectionError: function (error) {
                                logger_1.log.error('Loki connection error', { error: error }, 'LOG_SHIPPER');
                            }
                        })
                    ]
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Initialize Elasticsearch transport
     */
    LogShipper.prototype.initializeElasticsearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO: Implement Elasticsearch transport
                // This would require additional dependencies like @elastic/elasticsearch
                logger_1.log.warn('Elasticsearch transport not yet implemented', {}, 'LOG_SHIPPER');
                return [2 /*return*/];
            });
        });
    };
    /**
     * Ship a log entry
     */
    LogShipper.prototype.shipLog = function (level, message, meta) {
        return __awaiter(this, void 0, void 0, function () {
            var logEntry;
            return __generator(this, function (_a) {
                if (!this.config.enabled || !this.isInitialized || !this.logger) {
                    return [2 /*return*/];
                }
                try {
                    logEntry = __assign(__assign({ level: level, message: message, timestamp: new Date().toISOString() }, meta), { labels: __assign(__assign({}, this.config.labels), meta === null || meta === void 0 ? void 0 : meta.labels) });
                    this.logger.log(level, message, logEntry);
                }
                catch (error) {
                    logger_1.log.error('Failed to ship log entry', { error: error, level: level, message: message }, 'LOG_SHIPPER');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Ship multiple log entries in batch
     */
    LogShipper.prototype.shipLogs = function (logs) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.enabled || !this.isInitialized || !this.logger) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        promises = logs.map(function (log) { return _this.shipLog(log.level, log.message, log.meta); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        logger_1.log.error('Failed to ship log batch', { error: error_2, count: logs.length }, 'LOG_SHIPPER');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Ship logs from file
     */
    LogShipper.prototype.shipLogFile = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, readline, fileStream, rl, logs, _a, rl_1, rl_1_1, line, parsed, parseError_1, e_1_1, error_3;
            var _b, e_1, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!this.config.enabled || !this.isInitialized) {
                            return [2 /*return*/];
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 22, , 23]);
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('fs')); })];
                    case 2:
                        fs = _e.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('readline')); })];
                    case 3:
                        readline = _e.sent();
                        fileStream = fs.createReadStream(filePath);
                        rl = readline.createInterface({
                            input: fileStream,
                            crlfDelay: Infinity
                        });
                        logs = [];
                        _e.label = 4;
                    case 4:
                        _e.trys.push([4, 13, 14, 19]);
                        _a = true, rl_1 = __asyncValues(rl);
                        _e.label = 5;
                    case 5: return [4 /*yield*/, rl_1.next()];
                    case 6:
                        if (!(rl_1_1 = _e.sent(), _b = rl_1_1.done, !_b)) return [3 /*break*/, 12];
                        _d = rl_1_1.value;
                        _a = false;
                        line = _d;
                        _e.label = 7;
                    case 7:
                        _e.trys.push([7, 10, , 11]);
                        parsed = JSON.parse(line);
                        logs.push({
                            level: parsed.level || 'info',
                            message: parsed.message || line,
                            meta: parsed
                        });
                        if (!(logs.length >= (this.config.batchSize || 100))) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.shipLogs(logs)];
                    case 8:
                        _e.sent();
                        logs.length = 0; // Clear array
                        _e.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        parseError_1 = _e.sent();
                        // If line is not JSON, treat as info level
                        logs.push({
                            level: 'info',
                            message: line,
                            meta: { raw: true }
                        });
                        return [3 /*break*/, 11];
                    case 11:
                        _a = true;
                        return [3 /*break*/, 5];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _e.trys.push([14, , 17, 18]);
                        if (!(!_a && !_b && (_c = rl_1.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, _c.call(rl_1)];
                    case 15:
                        _e.sent();
                        _e.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19:
                        if (!(logs.length > 0)) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.shipLogs(logs)];
                    case 20:
                        _e.sent();
                        _e.label = 21;
                    case 21:
                        logger_1.log.info('Log file shipped successfully', { filePath: filePath }, 'LOG_SHIPPER');
                        return [3 /*break*/, 23];
                    case 22:
                        error_3 = _e.sent();
                        logger_1.log.error('Failed to ship log file', { error: error_3, filePath: filePath }, 'LOG_SHIPPER');
                        throw error_3;
                    case 23: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get shipper status
     */
    LogShipper.prototype.getStatus = function () {
        return {
            enabled: this.config.enabled,
            initialized: this.isInitialized,
            type: this.config.type,
            host: this.config.host,
            port: this.config.port
        };
    };
    /**
     * Close the log shipper
     */
    LogShipper.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.logger) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) {
                                _this.logger.on('finish', function () { return resolve(); });
                                _this.logger.end();
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.isInitialized = false;
                        logger_1.log.info('Log shipper closed', {}, 'LOG_SHIPPER');
                        return [2 /*return*/];
                }
            });
        });
    };
    return LogShipper;
}());
/**
 * Create log shipper instance from environment variables
 */
function createLogShipper() {
    var config = {
        enabled: process.env.LOG_SHIPPING_ENABLED === 'true',
        type: process.env.LOG_SHIPPING_TYPE || 'loki',
        host: process.env.LOG_SHIPPING_HOST || 'localhost',
        port: parseInt(process.env.LOG_SHIPPING_PORT || '3100'),
        protocol: process.env.LOG_SHIPPING_PROTOCOL || 'http',
        auth: process.env.LOG_SHIPPING_USERNAME && process.env.LOG_SHIPPING_PASSWORD ? {
            username: process.env.LOG_SHIPPING_USERNAME,
            password: process.env.LOG_SHIPPING_PASSWORD
        } : undefined,
        labels: {
            application: 'hrms-elite',
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || '1.0.0',
            instance: process.env.HOSTNAME || 'unknown'
        },
        batchSize: parseInt(process.env.LOG_SHIPPING_BATCH_SIZE || '100'),
        batchTimeout: parseInt(process.env.LOG_SHIPPING_BATCH_TIMEOUT || '5000')
    };
    return new LogShipper(config);
}
/**
 * Global log shipper instance
 */
var globalLogShipper = null;
/**
 * Initialize global log shipper
 */
function initializeLogShipper() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!globalLogShipper) return [3 /*break*/, 2];
                    globalLogShipper = createLogShipper();
                    return [4 /*yield*/, globalLogShipper.initialize()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, globalLogShipper];
            }
        });
    });
}
/**
 * Get global log shipper instance
 */
function getLogShipper() {
    return globalLogShipper;
}
/**
 * Ship a log entry using global shipper
 */
function shipLog(level, message, meta) {
    return __awaiter(this, void 0, void 0, function () {
        var shipper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    shipper = getLogShipper();
                    if (!shipper) return [3 /*break*/, 2];
                    return [4 /*yield*/, shipper.shipLog(level, message, meta)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
/**
 * Close global log shipper
 */
function closeLogShipper() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!globalLogShipper) return [3 /*break*/, 2];
                    return [4 /*yield*/, globalLogShipper.close()];
                case 1:
                    _a.sent();
                    globalLogShipper = null;
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.default = LogShipper;
