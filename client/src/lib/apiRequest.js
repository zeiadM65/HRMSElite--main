"use strict";
// API Request utility with error handling and CSRF protection
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
exports.withIfMatch = exports.apiPatch = exports.apiDelete = exports.apiPut = exports.apiPost = exports.apiGet = exports.apiRequest = exports.clearCachedEtag = exports.getCachedEtag = void 0;
var csrf_1 = require("./csrf");
var logger_1 = __importDefault(require("./logger"));
// Simple ETag cache keyed by request URL
var etagCache = new Map();
var getCachedEtag = function (url) { return etagCache.get(url); };
exports.getCachedEtag = getCachedEtag;
var clearCachedEtag = function (url) { etagCache.delete(url); };
exports.clearCachedEtag = clearCachedEtag;
/**
 * Wrapped fetch function with error handling
 * @param url - The URL to fetch from
 * @param options - Request options including method, body, and headers
 * @returns Promise with the response data
 */
var apiRequest = function (url_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([url_1], args_1, true), void 0, function (url, options) {
        var _a, method, body_1, _b, headers, responseType, isFormDataBody, computedHeaders, requestOptions, response, requestId, etag, errorData, _c, contentType, error_1;
        var _d;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 18, , 19]);
                    _a = options.method, method = _a === void 0 ? 'GET' : _a, body_1 = options.body, _b = options.headers, headers = _b === void 0 ? {} : _b, responseType = options.responseType;
                    isFormDataBody = (function () {
                        var ctor = globalThis.FormData;
                        if (typeof ctor !== 'function' || body_1 === null) {
                            return false;
                        }
                        return Object.prototype.toString.call(body_1) === '[object FormData]';
                    })();
                    computedHeaders = __assign({ 'Content-Type': 'application/json' }, headers);
                    if (isFormDataBody) {
                        // Remove content-type for multipart/form-data
                        if (typeof computedHeaders === 'object' && computedHeaders !== null) {
                            delete (computedHeaders)['Content-Type'];
                            delete (computedHeaders)['content-type'];
                        }
                    }
                    requestOptions = {
                        method: method,
                        headers: computedHeaders,
                        credentials: 'include' // Always include cookies for authentication
                    };
                    if (body_1 !== undefined) {
                        requestOptions.body = body_1;
                    }
                    return [4 /*yield*/, (0, csrf_1.fetchWithCsrf)(url, requestOptions)];
                case 1:
                    response = _e.sent();
                    requestId = (_d = response.headers.get('x-request-id')) !== null && _d !== void 0 ? _d : undefined;
                    logger_1.default.dev("API ".concat(method, " ").concat(url), { status: response.status, requestId: requestId }, 'API');
                    etag = response.headers.get('etag');
                    if (etag) {
                        try {
                            etagCache.set(url, etag);
                        }
                        catch (_f) {
                            // ignore cache set errors
                        }
                    }
                    if (!!response.ok) return [3 /*break*/, 6];
                    if (!(response.status === 403)) return [3 /*break*/, 5];
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, response.json()];
                case 3:
                    errorData = _e.sent();
                    if (errorData.code === 'CSRF_TOKEN_INVALID') {
                        (0, csrf_1.handleCsrfError)(errorData);
                        throw new Error('خطأ في التحقق من الأمان، يرجى إعادة تحميل الصفحة');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    _c = _e.sent();
                    return [3 /*break*/, 5];
                case 5:
                    logger_1.default.error("HTTP error! status: ".concat(response.status, " - ").concat(response.statusText), { requestId: requestId });
                    throw new Error("HTTP error! status: ".concat(response.status, " - ").concat(response.statusText));
                case 6:
                    if (!(responseType === 'blob')) return [3 /*break*/, 8];
                    return [4 /*yield*/, response.blob()];
                case 7: return [2 /*return*/, (_e.sent())];
                case 8:
                    if (!(responseType === 'arrayBuffer')) return [3 /*break*/, 10];
                    return [4 /*yield*/, response.arrayBuffer()];
                case 9: return [2 /*return*/, (_e.sent())];
                case 10:
                    if (!(responseType === 'formData')) return [3 /*break*/, 12];
                    return [4 /*yield*/, response.formData()];
                case 11: return [2 /*return*/, (_e.sent())];
                case 12:
                    if (!(responseType === 'text')) return [3 /*break*/, 14];
                    return [4 /*yield*/, response.text()];
                case 13: return [2 /*return*/, (_e.sent())];
                case 14:
                    contentType = response.headers.get('content-type');
                    if (!(contentType === null || contentType === void 0 ? void 0 : contentType.includes('application/json'))) return [3 /*break*/, 16];
                    return [4 /*yield*/, response.json()];
                case 15: return [2 /*return*/, (_e.sent())];
                case 16: return [4 /*yield*/, response.text()];
                case 17: return [2 /*return*/, (_e.sent())];
                case 18:
                    error_1 = _e.sent();
                    logger_1.default.error("API Request failed for ".concat(url, ":"), { error: error_1, requestId: requestId });
                    throw error_1;
                case 19: return [2 /*return*/];
            }
        });
    });
};
exports.apiRequest = apiRequest;
/**
 * Convenience methods for common HTTP methods
 */
var apiGet = function (url, headers) {
    return (0, exports.apiRequest)(url, {
        method: 'GET',
        headers: headers !== null && headers !== void 0 ? headers : {}
    });
};
exports.apiGet = apiGet;
var apiPost = function (url, data, headers) {
    return (0, exports.apiRequest)(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers !== null && headers !== void 0 ? headers : {}
    });
};
exports.apiPost = apiPost;
var apiPut = function (url, data, headers) {
    return (0, exports.apiRequest)(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: headers !== null && headers !== void 0 ? headers : {}
    });
};
exports.apiPut = apiPut;
var apiDelete = function (url, headers) {
    return (0, exports.apiRequest)(url, {
        method: 'DELETE',
        headers: headers !== null && headers !== void 0 ? headers : {}
    });
};
exports.apiDelete = apiDelete;
var apiPatch = function (url, data, headers) {
    return (0, exports.apiRequest)(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: headers !== null && headers !== void 0 ? headers : {}
    });
};
exports.apiPatch = apiPatch;
// Helpers for optimistic concurrency (ETag)
var withIfMatch = function (etag) {
    return etag ? { 'If-Match': etag } : {};
};
exports.withIfMatch = withIfMatch;
