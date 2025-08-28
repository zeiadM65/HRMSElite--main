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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheUtils = void 0;
exports.useEnhancedQuery = useEnhancedQuery;
exports.useEnhancedMutation = useEnhancedMutation;
exports.useOptimisticMutation = useOptimisticMutation;
exports.useInfiniteQuery = useInfiniteQuery;
var react_query_1 = require("@tanstack/react-query");
var queryClient_1 = require("@/lib/queryClient");
Object.defineProperty(exports, "cacheUtils", { enumerable: true, get: function () { return queryClient_1.cacheUtils; } });
// Enhanced useQuery hook with better defaults
function useEnhancedQuery(queryKey, queryFn, options) {
    return (0, react_query_1.useQuery)(__assign({ queryKey: queryKey, queryFn: queryFn, 
        // Enhanced defaults
        'staleTime': 10 * 60 * 1000, 'gcTime': 30 * 60 * 1000, 'refetchOnWindowFocus': false, 'refetchOnMount': true, 'retry': function (failureCount, error) {
            if (error instanceof Error && error.message.includes('4')) {
                return false;
            }
            return failureCount < 3;
        } }, options));
}
// Enhanced useMutation hook with better error handling
function useEnhancedMutation(mutationFn, options) {
    var _this = this;
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)(__assign({ mutationFn: mutationFn, 'retry': false, 'onMutate': function (_variables) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Cancel any outgoing refetches
                    return [4 /*yield*/, queryClient.cancelQueries()];
                    case 1:
                        // Cancel any outgoing refetches
                        _a.sent();
                        return [2 /*return*/, { 'previousData': undefined }];
                }
            });
        }); }, 'onError': function (err, variables, context) {
            // Rollback on error
            if (context === null || context === void 0 ? void 0 : context.previousData) {
                queryClient.setQueryData(['data'], context.previousData);
            }
        }, 'onSettled': function () {
            // Always refetch after error or success
            queryClient.invalidateQueries();
        } }, options));
}
// Hook for optimistic updates
function useOptimisticMutation(mutationFn, updateQueryKey, updateFn, options) {
    var _this = this;
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)(__assign({ mutationFn: mutationFn, 'onMutate': function (variables) { return __awaiter(_this, void 0, void 0, function () {
            var previousData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Cancel any outgoing refetches
                    return [4 /*yield*/, queryClient.cancelQueries()];
                    case 1:
                        // Cancel any outgoing refetches
                        _a.sent();
                        previousData = queryClient.getQueryData(updateQueryKey);
                        // Optimistically update to the new value
                        queryClient.setQueryData(updateQueryKey, function (old) {
                            return updateFn(old, variables);
                        });
                        // Return a context object with the snapshotted value
                        return [2 /*return*/, { previousData: previousData }];
                }
            });
        }); }, 'onError': function (err, variables, context) {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context === null || context === void 0 ? void 0 : context.previousData) {
                queryClient.setQueryData(updateQueryKey, context.previousData);
            }
        }, 'onSettled': function () {
            // Always refetch after error or success
            queryClient.invalidateQueries({ 'queryKey': updateQueryKey });
        } }, options));
}
// Hook for infinite queries with better caching
function useInfiniteQuery(queryKey, queryFn, options) {
    var _a;
    return (0, react_query_1.useInfiniteQuery)(__assign({ queryKey: queryKey, queryFn: queryFn, initialPageParam: 0, getNextPageParam: (_a = options === null || options === void 0 ? void 0 : options.getNextPageParam) !== null && _a !== void 0 ? _a : (function () { return undefined; }), 'staleTime': 10 * 60 * 1000, 'gcTime': 30 * 60 * 1000, 'refetchOnWindowFocus': false, 'refetchOnMount': true }, options));
}
