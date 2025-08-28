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
exports.cacheUtils = exports.invalidateCache = exports.prefetchQueries = exports.queryClient = exports.getQueryFn = void 0;
exports.apiRequest = apiRequest;
var react_query_1 = require("@tanstack/react-query");
function throwIfResNotOk(res) {
    return __awaiter(this, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!res.ok) return [3 /*break*/, 2];
                    return [4 /*yield*/, res.text()];
                case 1:
                    text = (_a.sent()) || res.statusText;
                    throw new Error("".concat(res.status, ": ").concat(text));
                case 2: return [2 /*return*/];
            }
        });
    });
}
function apiRequest(method, url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: method,
                        'headers': data ? { 'Content-Type': 'application/json' } : {},
                        'body': data ? JSON.stringify(data) : null,
                        'credentials': 'include'
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, throwIfResNotOk(res)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
var getQueryFn = function (options) {
    var unauthorizedBehavior = options["on401"];
    return function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var res;
        var queryKey = _b.queryKey;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, fetch(queryKey.join('/'), {
                        'credentials': 'include'
                    })];
                case 1:
                    res = _c.sent();
                    if (unauthorizedBehavior === 'returnNull' && res.status === 401) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, throwIfResNotOk(res)];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, res.json()];
                case 3: return [2 /*return*/, _c.sent()];
            }
        });
    }); };
};
exports.getQueryFn = getQueryFn;
// Enhanced Query Client with strong caching and performance optimizations
exports.queryClient = new react_query_1.QueryClient({
    'defaultOptions': {
        'queries': {
            'queryFn': (0, exports.getQueryFn)({ 'on401': 'throw' }),
            // Strong caching strategy; slightly shorter to reduce staleness under concurrency
            'staleTime': 5 * 60 * 1000, // 5 minutes
            'gcTime': 30 * 60 * 1000, // 30 minutes - garbage collection time (increased from 10)
            'refetchInterval': false,
            'refetchOnWindowFocus': false, // ✅ Disabled as requested
            'refetchOnReconnect': true,
            'refetchOnMount': 'always',
            'retry': function (failureCount, error) {
                // Retry on network errors, not on 4xx errors
                if (error instanceof Error && (error.message.includes('4') || error.message.includes('412'))) {
                    return false;
                }
                return failureCount < 3;
            },
            'retryDelay': function (attemptIndex) { return Math.min(1000 * Math.pow(2, attemptIndex), 30000); },
            // Optimistic updates
            'placeholderData': undefined,
            // Enhanced caching behavior
            'structuralSharing': true, // Prevents unnecessary re-renders
            'notifyOnChangeProps': ['data', 'error', 'isLoading'] // Only notify on important changes
        },
        'mutations': {
            'retry': false,
            // Optimistic updates for mutations
            'onMutate': function (_variables) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Cancel any outgoing refetches
                        return [4 /*yield*/, exports.queryClient.cancelQueries()];
                        case 1:
                            // Cancel any outgoing refetches
                            _a.sent();
                            return [2 /*return*/, { 'previousData': undefined }];
                    }
                });
            }); },
            'onError': function (_err, _variables, context) {
                // Rollback on error
                var ctx = context;
                if ((ctx === null || ctx === void 0 ? void 0 : ctx.previousData) !== undefined) {
                    exports.queryClient.setQueryData(['data'], ctx.previousData);
                }
            },
            'onSettled': function () {
                // Always refetch after error or success
                exports.queryClient.invalidateQueries();
            }
        }
    }
});
// Prefetch important data with extended cache times
var prefetchQueries = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // Prefetch user data with longer cache time
            return [4 /*yield*/, exports.queryClient.prefetchQuery({
                    'queryKey': ['user'],
                    'queryFn': function () { return fetch('/api/user', { 'credentials': 'include' }).then(function (res) { return res.json(); }); },
                    'staleTime': 15 * 60 * 1000, // 15 minutes
                    'gcTime': 60 * 60 * 1000 // 1 hour
                })];
            case 1:
                // Prefetch user data with longer cache time
                _a.sent();
                // Prefetch companies data with longer cache time
                return [4 /*yield*/, exports.queryClient.prefetchQuery({
                        'queryKey': ['companies'],
                        'queryFn': function () { return fetch('/api/companies', { 'credentials': 'include' }).then(function (res) { return res.json(); }); },
                        'staleTime': 20 * 60 * 1000, // 20 minutes
                        'gcTime': 60 * 60 * 1000 // 1 hour
                    })];
            case 2:
                // Prefetch companies data with longer cache time
                _a.sent();
                // Prefetch employees data
                return [4 /*yield*/, exports.queryClient.prefetchQuery({
                        'queryKey': ['employees'],
                        'queryFn': function () { return fetch('/api/employees', { 'credentials': 'include' }).then(function (res) { return res.json(); }); },
                        'staleTime': 10 * 60 * 1000, // 10 minutes
                        'gcTime': 30 * 60 * 1000 // 30 minutes
                    })];
            case 3:
                // Prefetch employees data
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.prefetchQueries = prefetchQueries;
// Enhanced cache invalidation utilities
exports.invalidateCache = {
    'user': function () { return exports.queryClient.invalidateQueries({ 'queryKey': ['user'] }); },
    'companies': function () { return exports.queryClient.invalidateQueries({ 'queryKey': ['companies'] }); },
    'employees': function () { return exports.queryClient.invalidateQueries({ 'queryKey': ['employees'] }); },
    'documents': function () { return exports.queryClient.invalidateQueries({ 'queryKey': ['documents'] }); },
    'leaves': function () { return exports.queryClient.invalidateQueries({ 'queryKey': ['leaves'] }); },
    'payroll': function () { return exports.queryClient.invalidateQueries({ 'queryKey': ['payroll'] }); },
    'all': function () { return exports.queryClient.invalidateQueries(); }
};
// Cache management utilities
exports.cacheUtils = {
    // Get cached data without triggering a fetch
    'getCachedData': function (queryKey) {
        return exports.queryClient.getQueryData(queryKey);
    },
    // Set data in cache manually
    'setCachedData': function (queryKey, data) {
        exports.queryClient.setQueryData(queryKey, data);
    },
    // Remove specific data from cache
    'removeFromCache': function (queryKey) {
        exports.queryClient.removeQueries({ queryKey: queryKey });
    },
    // Clear all cache
    'clearAllCache': function () {
        exports.queryClient.clear();
    },
    // Get cache statistics
    'getCacheStats': function () {
        var queries = exports.queryClient.getQueryCache().getAll();
        return {
            'totalQueries': queries.length,
            'activeQueries': queries.filter(function (q) { return q.isActive(); }).length,
            'staleQueries': queries.filter(function (q) { return q.isStale(); }).length
        };
    }
};
