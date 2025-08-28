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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfManager = void 0;
exports.fetchWithCsrf = fetchWithCsrf;
exports.handleCsrfError = handleCsrfError;
var logger_1 = __importDefault(require("./logger"));
var i18n_1 = __importDefault(require("./i18n"));
var CsrfTokenManager = /** @class */ (function () {
    function CsrfTokenManager() {
        this.token = null;
        this.tokenExpiry = null;
        this.TOKEN_VALIDITY_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    }
    /**
     * Get CSRF token from server
     */
    CsrfTokenManager.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Check if we have a valid cached token
                        if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
                            return [2 /*return*/, this.token];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch('/api/csrf-token', {
                                'method': 'GET',
                                'credentials': 'include', // Include cookies
                                'headers': {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Failed to get CSRF token: ".concat(response.status));
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        this.token = data.csrfToken;
                        this.tokenExpiry = Date.now() + this.TOKEN_VALIDITY_DURATION;
                        return [2 /*return*/, this.token];
                    case 4:
                        error_1 = _a.sent();
                        logger_1.default.error('Error fetching CSRF token:', error_1);
                        throw new Error(i18n_1.default.t('errors.csrfFetch'));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get headers with CSRF token for API requests
     */
    CsrfTokenManager.prototype.getHeaders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, {
                                'Content-Type': 'application/json',
                                'X-CSRF-Token': token
                            }];
                }
            });
        });
    };
    /**
     * Clear cached token (useful for logout)
     */
    CsrfTokenManager.prototype.clearToken = function () {
        this.token = null;
        this.tokenExpiry = null;
    };
    /**
     * Check if token is valid
     */
    CsrfTokenManager.prototype.isTokenValid = function () {
        return !!(this.token && this.tokenExpiry && Date.now() < this.tokenExpiry);
    };
    return CsrfTokenManager;
}());
// Create singleton instance
exports.csrfManager = new CsrfTokenManager();
/**
 * Enhanced fetch function with CSRF token
 */
function fetchWithCsrf(url_1) {
    return __awaiter(this, arguments, void 0, function (url, options) {
        var csrfHeaders, enhancedOptions;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.csrfManager.getHeaders()];
                case 1:
                    csrfHeaders = _a.sent();
                    enhancedOptions = __assign(__assign({}, options), { 'credentials': 'include', 'headers': __assign(__assign({}, csrfHeaders), options === null || options === void 0 ? void 0 : options.headers) });
                    return [2 /*return*/, fetch(url, enhancedOptions)];
            }
        });
    });
}
/**
 * Handle CSRF token errors
 */
function handleCsrfError(error) {
    if ((error === null || error === void 0 ? void 0 : error.code) === 'CSRF_TOKEN_INVALID') {
        // Clear the invalid token
        exports.csrfManager.clearToken();
        // Show user-friendly error message
        logger_1.default.error('CSRF token error:', error);
        // You can integrate this with your toast notification system
        // toast.error(i18n.t('errors.csrfValidation'));
    }
}
exports.default = exports.csrfManager;
