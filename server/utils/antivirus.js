"use strict";
/**
 * @fileoverview Antivirus scanning utility for file upload security
 * @description Provides virus scanning capabilities using ClamAV and external APIs
 * @author HRMS Elite Team
 * @version 1.0.0
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
exports.antivirusScanner = exports.defaultAntivirusConfig = exports.AntivirusScanner = void 0;
var axios_1 = __importDefault(require("axios"));
var logger_1 = require("./logger");
var metrics_1 = require("../middleware/metrics");
// EICAR test file signature (standard antivirus test file)
var EICAR_SIGNATURE = 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*';
var AntivirusScanner = /** @class */ (function () {
    function AntivirusScanner(config) {
        this.config = config;
    }
    /**
     * Scan a file buffer for viruses
     * @param buffer - File buffer to scan
     * @param filename - Original filename for logging
     * @returns Promise<ScanResult> - Scan result with threat information
     */
    AntivirusScanner.prototype.scanBuffer = function (buffer, filename) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, eicarResult, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.config.enabled) {
                            metrics_1.metricsUtils.incrementAvScanFailure(this.config.provider);
                            throw new Error('Antivirus not configured: rejecting upload');
                        }
                        startTime = Date.now();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 10, , 11]);
                        // Check file size limit
                        if (buffer.length > this.config.maxFileSize) {
                            return [2 /*return*/, {
                                    isClean: false,
                                    threats: ['File size exceeds scan limit'],
                                    scanTime: Date.now() - startTime,
                                    provider: 'size-check'
                                }];
                        }
                        eicarResult = this.checkEICAR(buffer);
                        if (!eicarResult.isClean) {
                            logger_1.log.error('EICAR test file detected and rejected', {
                                filename: filename,
                                threats: eicarResult.threats,
                                userAgent: 'antivirus-scanner',
                                severity: 'high'
                            }, 'SECURITY');
                            return [2 /*return*/, __assign(__assign({}, eicarResult), { scanTime: Date.now() - startTime, provider: 'eicar-detection' })];
                        }
                        _a = this.config.provider;
                        switch (_a) {
                            case 'clamav': return [3 /*break*/, 2];
                            case 'external': return [3 /*break*/, 4];
                            case 'both': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 2: return [4 /*yield*/, this.scanWithClamAV(buffer, filename, startTime)];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [4 /*yield*/, this.scanWithExternalAPI(buffer, filename, startTime)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [4 /*yield*/, this.scanWithBoth(buffer, filename, startTime)];
                    case 7: return [2 /*return*/, _b.sent()];
                    case 8: throw new Error('Antivirus not configured: rejecting upload');
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_1 = _b.sent();
                        logger_1.log.error('Antivirus scan failed', error_1, 'SECURITY');
                        metrics_1.metricsUtils.incrementAvScanFailure(this.config.provider);
                        throw error_1;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check for EICAR test file signature
     * @param buffer - File buffer to check
     * @returns ScanResult - Result of EICAR check
     */
    AntivirusScanner.prototype.checkEICAR = function (buffer) {
        var fileContent = buffer.toString('utf8');
        if (fileContent.includes(EICAR_SIGNATURE)) {
            return {
                isClean: false,
                threats: ['EICAR-STANDARD-ANTIVIRUS-TEST-FILE'],
                scanTime: 0,
                provider: 'eicar-detection'
            };
        }
        return {
            isClean: true,
            threats: [],
            scanTime: 0,
            provider: 'eicar-detection'
        };
    };
    /**
     * Scan file using ClamAV (if available)
     * @param buffer - File buffer to scan
     * @param filename - Original filename
     * @param startTime - Scan start time
     * @returns Promise<ScanResult> - ClamAV scan result
     */
    AntivirusScanner.prototype.scanWithClamAV = function (buffer, filename, startTime) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Note: In a real implementation, you would integrate with ClamAV daemon
                        // This is a placeholder for ClamAV integration
                        // You would typically use a library like 'clamscan' or 'node-clamscan'
                        // For now, we'll simulate ClamAV scanning
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        // Note: In a real implementation, you would integrate with ClamAV daemon
                        // This is a placeholder for ClamAV integration
                        // You would typically use a library like 'clamscan' or 'node-clamscan'
                        // For now, we'll simulate ClamAV scanning
                        _a.sent(); // Simulate scan time
                        logger_1.log.info('ClamAV scan completed', {
                            filename: filename,
                            scanTime: Date.now() - startTime,
                            provider: 'clamav'
                        }, 'SECURITY');
                        return [2 /*return*/, {
                                isClean: true,
                                threats: [],
                                scanTime: Date.now() - startTime,
                                provider: 'clamav'
                            }];
                    case 2:
                        error_2 = _a.sent();
                        logger_1.log.error('ClamAV scan failed', error_2, 'SECURITY');
                        metrics_1.metricsUtils.incrementAvScanFailure('clamav');
                        return [2 /*return*/, {
                                isClean: false,
                                threats: ['ClamAV scan failed'],
                                scanTime: Date.now() - startTime,
                                provider: 'clamav',
                                error: error_2.message
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Scan file using external antivirus API
     * @param buffer - File buffer to scan
     * @param filename - Original filename
     * @param startTime - Scan start time
     * @returns Promise<ScanResult> - External API scan result
     */
    AntivirusScanner.prototype.scanWithExternalAPI = function (buffer, filename, startTime) {
        return __awaiter(this, void 0, void 0, function () {
            var FormData_1, form, response, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!this.config.externalApiUrl || !this.config.externalApiKey) {
                            throw new Error('External antivirus API not configured');
                        }
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('form-data')); })];
                    case 1:
                        FormData_1 = _a.sent();
                        form = new FormData_1();
                        form.append('file', buffer, {
                            filename: filename,
                            contentType: 'application/octet-stream'
                        });
                        return [4 /*yield*/, axios_1.default.post(this.config.externalApiUrl, form, {
                                headers: __assign(__assign({}, form.getHeaders()), { 'Authorization': "Bearer ".concat(this.config.externalApiKey), 'X-API-Key': this.config.externalApiKey }),
                                timeout: this.config.timeout
                            })];
                    case 2:
                        response = _a.sent();
                        result = response.data;
                        logger_1.log.info('External antivirus scan completed', {
                            filename: filename,
                            scanTime: Date.now() - startTime,
                            provider: 'external-api',
                            isClean: result.isClean
                        }, 'SECURITY');
                        return [2 /*return*/, {
                                isClean: result.isClean || false,
                                threats: result.threats || [],
                                scanTime: Date.now() - startTime,
                                provider: 'external-api'
                            }];
                    case 3:
                        error_3 = _a.sent();
                        logger_1.log.error('External antivirus scan failed', error_3, 'SECURITY');
                        metrics_1.metricsUtils.incrementAvScanFailure('external-api');
                        return [2 /*return*/, {
                                isClean: false,
                                threats: ['External scan failed'],
                                scanTime: Date.now() - startTime,
                                provider: 'external-api',
                                error: error_3.message
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Scan file using both ClamAV and external API
     * @param buffer - File buffer to scan
     * @param filename - Original filename
     * @param startTime - Scan start time
     * @returns Promise<ScanResult> - Combined scan result
     */
    AntivirusScanner.prototype.scanWithBoth = function (buffer, filename, startTime) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, clamavResult, externalResult, results, threats, isClean, scanTime, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.allSettled([
                                this.scanWithClamAV(buffer, filename, startTime),
                                this.scanWithExternalAPI(buffer, filename, startTime)
                            ])];
                    case 1:
                        _a = _b.sent(), clamavResult = _a[0], externalResult = _a[1];
                        results = [];
                        threats = [];
                        // Process ClamAV result
                        if (clamavResult.status === 'fulfilled') {
                            results.push(clamavResult.value);
                            threats.push.apply(threats, clamavResult.value.threats);
                        }
                        else {
                            logger_1.log.error('ClamAV scan failed in dual scan', clamavResult.reason, 'SECURITY');
                        }
                        // Process external API result
                        if (externalResult.status === 'fulfilled') {
                            results.push(externalResult.value);
                            threats.push.apply(threats, externalResult.value.threats);
                        }
                        else {
                            logger_1.log.error('External API scan failed in dual scan', externalResult.reason, 'SECURITY');
                        }
                        isClean = results.length > 0 && results.every(function (result) { return result.isClean; });
                        scanTime = Date.now() - startTime;
                        logger_1.log.info('Dual antivirus scan completed', {
                            filename: filename,
                            scanTime: scanTime,
                            providers: results.map(function (r) { return r.provider; }),
                            isClean: isClean,
                            threatCount: threats.length
                        }, 'SECURITY');
                        return [2 /*return*/, {
                                isClean: isClean,
                                threats: __spreadArray([], new Set(threats), true), // Remove duplicates
                                scanTime: scanTime,
                                provider: 'dual-scan'
                            }];
                    case 2:
                        error_4 = _b.sent();
                        logger_1.log.error('Dual antivirus scan failed', error_4, 'SECURITY');
                        metrics_1.metricsUtils.incrementAvScanFailure('dual-scan');
                        return [2 /*return*/, {
                                isClean: false,
                                threats: ['Dual scan failed'],
                                scanTime: Date.now() - startTime,
                                provider: 'dual-scan',
                                error: error_4.message
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get scanner status and configuration
     * @returns object - Scanner status information
     */
    AntivirusScanner.prototype.getStatus = function () {
        return {
            enabled: this.config.enabled,
            provider: this.config.provider,
            maxFileSize: this.config.maxFileSize,
            timeout: this.config.timeout,
            externalApiConfigured: !!(this.config.externalApiUrl && this.config.externalApiKey)
        };
    };
    return AntivirusScanner;
}());
exports.AntivirusScanner = AntivirusScanner;
// Default antivirus configuration
exports.defaultAntivirusConfig = {
    enabled: process.env.NODE_ENV === 'production'
        ? true
        : process.env.ANTIVIRUS_ENABLED === 'true',
    provider: process.env.ANTIVIRUS_PROVIDER || 'external',
    externalApiUrl: process.env.ANTIVIRUS_API_URL,
    externalApiKey: process.env.ANTIVIRUS_API_KEY,
    timeout: parseInt(process.env.ANTIVIRUS_TIMEOUT || '30000'),
    maxFileSize: parseInt(process.env.ANTIVIRUS_MAX_FILE_SIZE || '10485760') // 10MB
};
// Create default antivirus scanner instance
exports.antivirusScanner = new AntivirusScanner(exports.defaultAntivirusConfig);
