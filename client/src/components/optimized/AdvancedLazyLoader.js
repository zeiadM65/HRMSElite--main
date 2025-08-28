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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPriorityLazyLoader = exports.withAdvancedLazyLoading = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var skeleton_1 = require("../ui/skeleton");
var progress_1 = require("../ui/progress");
// Enhanced loading fallback with progress
var ProgressFallback = function (_a) {
    var message = _a.message, progress = _a.progress, _b = _a.type, type = _b === void 0 ? 'default' : _b;
    var getFallbackByType = function () {
        switch (type) {
            case 'card':
                return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-12 w-12 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 flex-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[250px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[200px]" })] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: progress, className: "w-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[90%]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[80%]" })] })] }) }) }));
            case 'list':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [Array.from({ length: 3 }).map(function (_, index) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-10 w-10 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 flex-1", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-[200px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-3 w-[150px]" })] }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-16" })] }) }) }, index)); }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: progress, className: "w-full" })] }));
            case 'table':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-[200px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-[100px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-4 border-b", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" })] }) }), Array.from({ length: 3 }).map(function (_, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "p-4 border-b last:border-b-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-full" })] }) }, index)); })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: progress, className: "w-full" })] }));
            case 'chart':
                return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-6 w-[150px]" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-[100px]" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between h-32", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-16 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-20 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-12 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-24 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-18 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-14 w-8" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-22 w-8" })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: progress, className: "w-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center space-x-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-16" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-16" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-16" })] })] }) }) }));
            default:
                return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full max-w-md", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "flex flex-col items-center justify-center p-6 space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground text-center", children: message !== null && message !== void 0 ? message : 'جاري التحميل...' }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: progress, className: "w-full" })] }) }) }));
        }
    };
    return getFallbackByType();
};
// Main Advanced Lazy Loader component
var AdvancedLazyLoader = function (_a) {
    var children = _a.children, fallback = _a.fallback, _b = _a.type, type = _b === void 0 ? 'default' : _b, message = _a.message, _c = _a.preloadOnHover, preloadOnHover = _c === void 0 ? true : _c, _d = _a.preloadOnIntersection, preloadOnIntersection = _d === void 0 ? true : _d, _e = _a.priority, priority = _e === void 0 ? 'medium' : _e, _f = _a.showProgress, showProgress = _f === void 0 ? true : _f, _g = _a.minLoadTime, minLoadTime = _g === void 0 ? 500 : _g;
    var _h = (0, react_1.useState)({
        isLoading: true,
        progress: 0,
        startTime: Date.now()
    }), loadingState = _h[0], setLoadingState = _h[1];
    var _j = (0, react_1.useState)(false), isLoaded = _j[0], setIsLoaded = _j[1];
    var progressIntervalRef = (0, react_1.useRef)();
    var elementRef = (0, react_1.useRef)(null);
    // Simulate progress for better UX
    var startProgressSimulation = (0, react_1.useCallback)(function () {
        var startTime = Date.now();
        setLoadingState(function (prev) { return (__assign(__assign({}, prev), { startTime: startTime, isLoading: true, progress: 0 })); });
        progressIntervalRef.current = setInterval(function () {
            var elapsed = Date.now() - startTime;
            var progress = Math.min((elapsed / minLoadTime) * 90, 90); // Max 90% until actually loaded
            setLoadingState(function (prev) { return (__assign(__assign({}, prev), { progress: progress })); });
        }, 50);
    }, [minLoadTime]);
    // Stop progress simulation
    var stopProgressSimulation = (0, react_1.useCallback)(function () {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
        setLoadingState(function (prev) { return (__assign(__assign({}, prev), { progress: 100, isLoading: false })); });
        setIsLoaded(true);
    }, []);
    // Handle hover preloading
    var handleMouseEnter = (0, react_1.useCallback)(function () {
        if (preloadOnHover && !isLoaded) {
            startProgressSimulation();
        }
    }, [preloadOnHover, isLoaded, startProgressSimulation]);
    // Handle intersection observer for preloading
    (0, react_1.useEffect)(function () {
        if (!preloadOnIntersection || !elementRef.current || isLoaded) {
            return;
        }
        var observer = new globalThis.IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    startProgressSimulation();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });
        observer.observe(elementRef.current);
        return function () {
            observer.disconnect();
        };
    }, [preloadOnIntersection, isLoaded, startProgressSimulation]);
    // Auto-start loading for high priority components
    (0, react_1.useEffect)(function () {
        if (priority === 'high' && !isLoaded) {
            startProgressSimulation();
        }
    }, [priority, isLoaded, startProgressSimulation]);
    // Cleanup on unmount
    (0, react_1.useEffect)(function () {
        return function () {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, []);
    // Simulate completion after minimum load time
    (0, react_1.useEffect)(function () {
        if (loadingState.isLoading && loadingState.progress >= 90) {
            var remainingTime = Math.max(0, minLoadTime - (Date.now() - loadingState.startTime));
            setTimeout(function () {
                stopProgressSimulation();
            }, remainingTime);
        }
    }, [loadingState, minLoadTime, stopProgressSimulation]);
    // If component is loaded, show children
    if (isLoaded) {
        return (0, jsx_runtime_1.jsx)("div", { ref: elementRef, children: children });
    }
    // Show custom fallback if provided
    if (fallback) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: elementRef, onMouseEnter: handleMouseEnter, className: "cursor-pointer", children: fallback }));
    }
    // Show progress fallback
    return ((0, jsx_runtime_1.jsx)("div", { ref: elementRef, onMouseEnter: handleMouseEnter, className: "cursor-pointer", children: (0, jsx_runtime_1.jsx)(ProgressFallback, { message: message, progress: showProgress ? loadingState.progress : 0, type: type }) }));
};
// HOC for wrapping components with advanced lazy loading
var withAdvancedLazyLoading = function (Component, options) {
    var _a;
    var WrappedComponent = function (props) { return ((0, jsx_runtime_1.jsx)(AdvancedLazyLoader, __assign({}, options, { children: (0, jsx_runtime_1.jsx)(Component, __assign({}, props)) }))); };
    WrappedComponent.displayName = "withAdvancedLazyLoading(".concat((_a = Component.displayName) !== null && _a !== void 0 ? _a : Component.name, ")");
    return WrappedComponent;
};
exports.withAdvancedLazyLoading = withAdvancedLazyLoading;
// Priority-based lazy loading wrapper
var createPriorityLazyLoader = function (priority) {
    if (priority === void 0) { priority = 'medium'; }
    return function (Component) {
        return (0, exports.withAdvancedLazyLoading)(Component, { priority: priority });
    };
};
exports.createPriorityLazyLoader = createPriorityLazyLoader;
exports.default = AdvancedLazyLoader;
