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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
var apiRequest_1 = require("../lib/apiRequest");
var apiRequest_2 = require("../lib/apiRequest");
// Base API service with common HTTP methods
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    ApiService.get = function (url, params) {
        return __awaiter(this, void 0, void 0, function () {
            var finalUrl;
            return __generator(this, function (_a) {
                finalUrl = ApiService.createUrlWithParams(url, params);
                return [2 /*return*/, (0, apiRequest_1.apiGet)(finalUrl)];
            });
        });
    };
    ApiService.post = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiPost)(url, data !== null && data !== void 0 ? data : {})];
            });
        });
    };
    ApiService.put = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, __etag, rest, cached, headers;
            return __generator(this, function (_a) {
                payload = (data !== null && data !== void 0 ? data : {});
                __etag = payload.__etag, rest = __rest(payload, ["__etag"]);
                cached = __etag || (0, apiRequest_2.getCachedEtag)(url);
                headers = (0, apiRequest_1.withIfMatch)(cached !== null && cached !== void 0 ? cached : undefined);
                return [2 /*return*/, (0, apiRequest_1.apiPut)(url, rest, headers)];
            });
        });
    };
    ApiService.delete = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiDelete)(url)];
            });
        });
    };
    ApiService.patch = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, __etag, rest, cached, headers;
            return __generator(this, function (_a) {
                payload = (data !== null && data !== void 0 ? data : {});
                __etag = payload.__etag, rest = __rest(payload, ["__etag"]);
                cached = __etag || (0, apiRequest_2.getCachedEtag)(url);
                headers = (0, apiRequest_1.withIfMatch)(cached !== null && cached !== void 0 ? cached : undefined);
                return [2 /*return*/, (0, apiRequest_1.apiPatch)(url, rest, headers)];
            });
        });
    };
    ApiService.createUrlWithParams = function (url, params) {
        if (!params)
            return url;
        var segments = [];
        for (var _i = 0, _a = Object.entries(params); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], raw = _b[1];
            if (raw === undefined || raw === null)
                continue;
            var values = Array.isArray(raw) ? raw : [raw];
            for (var _c = 0, values_1 = values; _c < values_1.length; _c++) {
                var value = values_1[_c];
                if (value === undefined || value === null)
                    continue;
                segments.push("".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(String(value))));
            }
        }
        if (segments.length === 0)
            return url;
        var query = segments.join('&');
        return url.includes('?') ? "".concat(url, "&").concat(query) : "".concat(url, "?").concat(query);
    };
    return ApiService;
}());
exports.ApiService = ApiService;
