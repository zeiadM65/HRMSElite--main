"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
var apiRequest_1 = require("../../lib/apiRequest");
/**
 * Base Service Class - DRY Principle
 * Provides common functionality for all services
 */
var BaseService = /** @class */ (function () {
    function BaseService(baseUrl) {
        if (baseUrl === void 0) { baseUrl = '/api'; }
        this.baseUrl = baseUrl;
    }
    /**
     * Generic GET request
     */
    BaseService.prototype.get = function (endpoint, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("".concat(this.baseUrl).concat(endpoint), {
                        method: 'GET',
                        params: params
                    })];
            });
        });
    };
    /**
     * Generic POST request
     */
    BaseService.prototype.post = function (endpoint, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("".concat(this.baseUrl).concat(endpoint), {
                        method: 'POST',
                        data: data
                    })];
            });
        });
    };
    /**
     * Generic PUT request
     */
    BaseService.prototype.put = function (endpoint, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("".concat(this.baseUrl).concat(endpoint), {
                        method: 'PUT',
                        data: data
                    })];
            });
        });
    };
    /**
     * Generic DELETE request
     */
    BaseService.prototype.delete = function (endpoint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("".concat(this.baseUrl).concat(endpoint), {
                        method: 'DELETE'
                    })];
            });
        });
    };
    /**
     * Generic PATCH request
     */
    BaseService.prototype.patch = function (endpoint, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("".concat(this.baseUrl).concat(endpoint), {
                        method: 'PATCH',
                        data: data
                    })];
            });
        });
    };
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
     * Build query string from parameters
     */
    BaseService.prototype.buildQueryString = function (params) {
        if (!params)
            return '';
        var searchParams = new URLSearchParams();
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });
        var queryString = searchParams.toString();
        return queryString ? "?".concat(queryString) : '';
    };
    return BaseService;
}());
exports.BaseService = BaseService;
