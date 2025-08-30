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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withLazyLoadTracking = exports.trackLazyLoadComplete = exports.trackLazyLoadStart = exports.LazyLoadingMonitor = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-env browser */
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
var LazyLoadingMonitor = function (_a) {
    var _b = _a.showMetrics, showMetrics = _b === void 0 ? false : _b, _c = _a.maxMetrics, maxMetrics = _c === void 0 ? 10 : _c;
    var _d = (0, react_1.useState)([]), metrics = _d[0], setMetrics = _d[1];
    var isVisible = (0, react_1.useState)(showMetrics)[0];
    (0, react_1.useEffect)(function () {
        // Listen for custom lazy loading events
        var handleLazyLoadStart = function (event) {
            var componentName = event.detail.componentName;
            setMetrics(function (prev) { return __spreadArray([
                {
                    componentName: componentName,
                    'loadTime': 0,
                    'status': 'loading',
                    'timestamp': Date.now()
                }
            ], prev.slice(0, maxMetrics - 1), true); });
        };
        var handleLazyLoadComplete = function (event) {
            var _a = event.detail, componentName = _a.componentName, loadTime = _a.loadTime, status = _a.status;
            setMetrics(function (prev) {
                return prev.map(function (metric) {
                    return metric.componentName === componentName
                        ? __assign(__assign({}, metric), { loadTime: loadTime, status: status, 'timestamp': Date.now() }) : metric;
                });
            });
        };
        // Add event listeners
        window.addEventListener('lazy-load-start', handleLazyLoadStart);
        window.addEventListener('lazy-load-complete', handleLazyLoadComplete);
        return function () {
            window.removeEventListener('lazy-load-start', handleLazyLoadStart);
            window.removeEventListener('lazy-load-complete', handleLazyLoadComplete);
        };
    }, [maxMetrics]);
    var getAverageLoadTime = function () {
        var loadedMetrics = metrics.filter(function (m) { return m.status === 'loaded' && m.loadTime > 0; });
        if (loadedMetrics.length === 0) {
            return 0;
        }
        var totalTime = loadedMetrics.reduce(function (sum, m) { return sum + m.loadTime; }, 0);
        return Math.round(totalTime / loadedMetrics.length);
    };
    var getLoadingCount = function () { return metrics.filter(function (m) { return m.status === 'loading'; }).length; };
    var getLoadedCount = function () { return metrics.filter(function (m) { return m.status === 'loaded'; }).length; };
    var getErrorCount = function () { return metrics.filter(function (m) { return m.status === 'error'; }).length; };
    var getStatusIcon = function (status) {
        switch (status) {
            case 'loading':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4 text-blue-500 animate-spin" });
            case 'loaded':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4 text-green-500" });
            case 'error':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-4 w-4 text-red-500" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4 text-gray-500" });
        }
    };
    var getStatusBadge = function (status) {
        switch (status) {
            case 'loading':
                return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "bg-blue-100 text-blue-800", children: "Loading" });
            case 'loaded':
                return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "bg-green-100 text-green-800", children: "Loaded" });
            case 'error':
                return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "bg-red-100 text-red-800", children: "Error" });
            default:
                return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: "Unknown" });
        }
    };
    if (!isVisible) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-5 w-5" }), "Lazy Loading Monitor"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-3 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-blue-600", children: getLoadingCount() }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "Loading" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: getLoadedCount() }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "Loaded" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-red-600", children: getErrorCount() }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "Errors" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "Average Load Time" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-mono", children: [getAverageLoadTime(), "ms"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: Math.min((getAverageLoadTime() / 1000) * 100, 100), className: "h-2" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium", children: "Recent Components" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 max-h-40 overflow-y-auto", children: [metrics.map(function (metric, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-2 bg-muted rounded-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [getStatusIcon(metric.status), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-mono", children: metric.componentName })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [metric.loadTime > 0 && ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-foreground", children: [metric.loadTime, "ms"] })), getStatusBadge(metric.status)] })] }, "".concat(metric.componentName, "-").concat(index))); }), metrics.length === 0 && ((0, jsx_runtime_1.jsx)("div", { className: "text-center text-sm text-muted-foreground py-4", children: "No components loaded yet" }))] })] })] })] }));
};
exports.LazyLoadingMonitor = LazyLoadingMonitor;
// Utility functions for tracking lazy loading
var trackLazyLoadStart = function (componentName) {
    window.dispatchEvent(new window.CustomEvent('lazy-load-start', {
        'detail': { componentName: componentName }
    }));
};
exports.trackLazyLoadStart = trackLazyLoadStart;
var trackLazyLoadComplete = function (componentName, loadTime, status) {
    if (status === void 0) { status = 'loaded'; }
    window.dispatchEvent(new window.CustomEvent('lazy-load-complete', {
        'detail': { componentName: componentName, loadTime: loadTime, status: status }
    }));
};
exports.trackLazyLoadComplete = trackLazyLoadComplete;
// HOC for automatically tracking lazy loading
var withLazyLoadTracking = function (Component, componentName) {
    var _a;
    var WrappedComponent = function (props) {
        (0, react_1.useEffect)(function () {
            var startTime = window.performance.now();
            (0, exports.trackLazyLoadStart)(componentName);
            return function () {
                var loadTime = window.performance.now() - startTime;
                (0, exports.trackLazyLoadComplete)(componentName, Math.round(loadTime));
            };
        }, []);
        return (0, jsx_runtime_1.jsx)(Component, __assign({}, props));
    };
    WrappedComponent.displayName = "withLazyLoadTracking(".concat((_a = Component.displayName) !== null && _a !== void 0 ? _a : Component.name, ")");
    return WrappedComponent;
};
exports.withLazyLoadTracking = withLazyLoadTracking;
exports.default = exports.LazyLoadingMonitor;
