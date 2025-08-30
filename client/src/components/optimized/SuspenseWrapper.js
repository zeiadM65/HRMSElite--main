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
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSuspense = exports.DashboardSuspense = exports.EmployeeSuspense = exports.LicenseSuspense = exports.DocumentSuspense = void 0;
exports.lazyLoad = lazyLoad;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var card_1 = require("../ui/card");
var skeleton_1 = require("../ui/skeleton");
// Default loading fallback
var DefaultFallback = function (_a) {
    var message = _a.message;
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full max-w-md", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "flex items-center justify-center p-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "mr-3 text-muted-foreground", children: message !== null && message !== void 0 ? message : 'جاري التحميل...' })] }) }) }));
};
// Card loading fallback
var CardFallback = function () { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-12 w-12 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[250px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[200px]" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[90%]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[80%]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-20" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-20" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-20" })] })] }) }) })); };
// List loading fallback
var ListFallback = function () { return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: Array.from({ 'length': 5 }).map(function (_, index) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-10 w-10 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 flex-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[200px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-3 w-[150px]" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-16" })] }) }) }, index)); }) })); };
// Table loading fallback
var TableFallback = function () { return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-[200px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-[100px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-4 border-b", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" })] }) }), Array.from({ 'length': 5 }).map(function (_, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "p-4 border-b last:border-b-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" })] }) }, index)); })] })] })); };
// Chart loading fallback
var ChartFallback = function () { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-6 w-[150px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-[100px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between h-32", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-16 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-20 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-12 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-24 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-18 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-14 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-22 w-8" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center space-x-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-16" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-16" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-16" })] })] }) }) })); };
// (Removed unused IconFallback component)
// Get appropriate fallback based on type
var getFallbackByType = function (type, message) {
    switch (type) {
        case 'card':
            return (0, jsx_runtime_1.jsx)(CardFallback, {});
        case 'list':
            return (0, jsx_runtime_1.jsx)(ListFallback, {});
        case 'table':
            return (0, jsx_runtime_1.jsx)(TableFallback, {});
        case 'chart':
            return (0, jsx_runtime_1.jsx)(ChartFallback, {});
        default:
            return (0, jsx_runtime_1.jsx)(DefaultFallback, { message: message });
    }
};
// Main Suspense wrapper component
var SuspenseWrapper = function (_a) {
    var children = _a.children, fallback = _a.fallback, _b = _a.type, type = _b === void 0 ? 'default' : _b, message = _a.message;
    var defaultFallback = getFallbackByType(type, message);
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: fallback !== null && fallback !== void 0 ? fallback : defaultFallback, children: children }));
};
// Specialized Suspense wrappers for different content types
var DocumentSuspense = function (_a) {
    var children = _a.children, fallback = _a.fallback;
    return ((0, jsx_runtime_1.jsx)(SuspenseWrapper, { type: "list", fallback: fallback, children: children }));
};
exports.DocumentSuspense = DocumentSuspense;
var LicenseSuspense = function (_a) {
    var children = _a.children, fallback = _a.fallback;
    return ((0, jsx_runtime_1.jsx)(SuspenseWrapper, { type: "card", fallback: fallback, children: children }));
};
exports.LicenseSuspense = LicenseSuspense;
var EmployeeSuspense = function (_a) {
    var children = _a.children, fallback = _a.fallback;
    return ((0, jsx_runtime_1.jsx)(SuspenseWrapper, { type: "table", fallback: fallback, children: children }));
};
exports.EmployeeSuspense = EmployeeSuspense;
var DashboardSuspense = function (_a) {
    var children = _a.children, fallback = _a.fallback;
    return ((0, jsx_runtime_1.jsx)(SuspenseWrapper, { type: "chart", fallback: fallback, children: children }));
};
exports.DashboardSuspense = DashboardSuspense;
// HOC for wrapping components with Suspense
var withSuspense = function (Component, suspenseProps) {
    var _a;
    var WrappedComponent = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper, __assign({}, suspenseProps, { children: (0, jsx_runtime_1.jsx)(Component, __assign({}, props)) }))); };
    WrappedComponent.displayName = "withSuspense(".concat((_a = Component.displayName) !== null && _a !== void 0 ? _a : Component.name, ")");
    return WrappedComponent;
};
exports.withSuspense = withSuspense;
// Lazy loading wrapper for dynamic imports
function lazyLoad(importFunc, fallback) {
    var LazyComponent = react_1.default.lazy(importFunc);
    var Wrapped = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper, { fallback: fallback, children: (0, jsx_runtime_1.jsx)(LazyComponent, __assign({}, props)) })); };
    Wrapped.displayName = 'LazyLoadedComponent';
    return Wrapped;
}
exports.default = SuspenseWrapper;
