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
exports.PerformanceUtils = exports.usePerformanceMonitor = exports.withPerformanceMonitoring = exports.PerformanceMonitor = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var useAuth_1 = require("../../hooks/useAuth");
/**
 * Performance Monitor Component
 * Monitors and optimizes component performance
 */
exports.PerformanceMonitor = (0, react_1.memo)(function (_a) {
    var componentName = _a.componentName, children = _a.children, _b = _a.enableLogging, enableLogging = _b === void 0 ? false : _b, _c = _a.threshold // 16ms = 60fps
    , threshold = _c === void 0 ? 16 : _c // 16ms = 60fps
    ;
    var user = (0, useAuth_1.useAuth)().user;
    var _d = (0, react_1.useState)({
        renderTime: 0,
        memoryUsage: 0,
        componentMounts: 0,
        reRenders: 0,
        lastRenderTime: 0
    }), metrics = _d[0], setMetrics = _d[1];
    var renderStartTime = (0, react_1.useRef)(0);
    var mountTime = (0, react_1.useRef)(0);
    var renderCount = (0, react_1.useRef)(0);
    var prevPropsRef = (0, react_1.useRef)(null);
    // Performance measurement
    var measurePerformance = (0, react_1.useCallback)(function () {
        var now = window.performance.now();
        var renderTime = now - renderStartTime.current;
        // Memory usage (if available)
        var memoryUsage = window.performance.memory
            ? window.performance.memory.usedJSHeapSize / 1024 / 1024
            : 0;
        setMetrics(function (prev) { return (__assign(__assign({}, prev), { renderTime: renderTime, memoryUsage: memoryUsage, reRenders: prev.reRenders + 1, lastRenderTime: now })); });
        // Log performance issues
        if (enableLogging && renderTime > threshold) {
            console.warn("\uD83D\uDEA8 Performance Issue in ".concat(componentName, ":"), {
                renderTime: "".concat(renderTime.toFixed(2), "ms"),
                threshold: "".concat(threshold, "ms"),
                memoryUsage: "".concat(memoryUsage.toFixed(2), "MB"),
                user: user === null || user === void 0 ? void 0 : user.email
            });
        }
    }, [componentName, enableLogging, threshold, user]);
    // Component mount tracking
    (0, react_1.useEffect)(function () {
        mountTime.current = window.performance.now();
        renderStartTime.current = window.performance.now();
        setMetrics(function (prev) { return (__assign(__assign({}, prev), { componentMounts: prev.componentMounts + 1 })); });
        if (enableLogging) {
            console.info("\uD83D\uDCCA ".concat(componentName, " mounted at:"), new Date().toISOString());
        }
        return function () {
            var mountDuration = window.performance.now() - mountTime.current;
            if (enableLogging) {
                console.info("\uD83D\uDCCA ".concat(componentName, " unmounted after: ").concat(mountDuration.toFixed(2), "ms"));
            }
        };
    }, [componentName, enableLogging]);
    // Render tracking
    (0, react_1.useEffect)(function () {
        renderStartTime.current = window.performance.now();
        renderCount.current += 1;
        // Schedule performance measurement after render
        var timeoutId = setTimeout(measurePerformance, 0);
        return function () { return clearTimeout(timeoutId); };
    }, [measurePerformance]);
    // Props change detection
    (0, react_1.useEffect)(function () {
        if (prevPropsRef.current !== null) {
            // Detect unnecessary re-renders
            if (enableLogging) {
                console.info("\uD83D\uDD04 ".concat(componentName, " re-rendered (").concat(renderCount.current, " times)"));
            }
        }
        prevPropsRef.current = true;
    });
    return ((0, jsx_runtime_1.jsxs)("div", { "data-testid": "performance-monitor-".concat(componentName), children: [children, enableLogging && ((0, jsx_runtime_1.jsxs)("div", { style: {
                    position: 'fixed',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    zIndex: 9999
                }, children: [(0, jsx_runtime_1.jsx)("div", { children: componentName }), (0, jsx_runtime_1.jsxs)("div", { children: ["Render: ", metrics.renderTime.toFixed(2), "ms"] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Memory: ", metrics.memoryUsage.toFixed(2), "MB"] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Re-renders: ", metrics.reRenders] })] }))] }));
});
exports.PerformanceMonitor.displayName = 'PerformanceMonitor';
/**
 * Higher-Order Component for Performance Monitoring
 */
var withPerformanceMonitoring = function (WrappedComponent, options) {
    if (options === void 0) { options = {}; }
    var _a = options.componentName, componentName = _a === void 0 ? WrappedComponent.displayName || WrappedComponent.name || 'Unknown' : _a, _b = options.enableLogging, enableLogging = _b === void 0 ? false : _b, _c = options.threshold, threshold = _c === void 0 ? 16 : _c;
    var EnhancedComponent = react_1.default.forwardRef(function (props, ref) { return ((0, jsx_runtime_1.jsx)(exports.PerformanceMonitor, { componentName: componentName, enableLogging: enableLogging, threshold: threshold, children: (0, jsx_runtime_1.jsx)(WrappedComponent, __assign({}, props, { ref: ref })) })); });
    EnhancedComponent.displayName = "withPerformanceMonitoring(".concat(componentName, ")");
    return EnhancedComponent;
};
exports.withPerformanceMonitoring = withPerformanceMonitoring;
/**
 * Hook for performance monitoring
 */
var usePerformanceMonitor = function (componentName, options) {
    if (options === void 0) { options = {}; }
    var _a = options.enableLogging, enableLogging = _a === void 0 ? false : _a, _b = options.threshold, threshold = _b === void 0 ? 16 : _b;
    var renderStartTime = (0, react_1.useRef)(0);
    var renderCount = (0, react_1.useRef)(0);
    var startRender = (0, react_1.useCallback)(function () {
        renderStartTime.current = window.performance.now();
        renderCount.current += 1;
    }, []);
    var endRender = (0, react_1.useCallback)(function () {
        var renderTime = window.performance.now() - renderStartTime.current;
        if (enableLogging && renderTime > threshold) {
            console.warn("\uD83D\uDEA8 Performance Issue in ".concat(componentName, ":"), {
                renderTime: "".concat(renderTime.toFixed(2), "ms"),
                threshold: "".concat(threshold, "ms"),
                renderCount: renderCount.current
            });
        }
        return renderTime;
    }, [componentName, enableLogging, threshold]);
    return { startRender: startRender, endRender: endRender, renderCount: renderCount.current };
};
exports.usePerformanceMonitor = usePerformanceMonitor;
/**
 * Performance optimization utilities
 */
exports.PerformanceUtils = {
    /**
     * Debounce function calls
     */
    debounce: function (func, wait) {
        var timeout;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timeout);
            timeout = setTimeout(function () { return func.apply(void 0, args); }, wait);
        };
    },
    /**
     * Throttle function calls
     */
    throttle: function (func, limit) {
        var inThrottle;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!inThrottle) {
                func.apply(void 0, args);
                inThrottle = true;
                setTimeout(function () { return inThrottle = false; }, limit);
            }
        };
    },
    /**
     * Memoize expensive calculations
     */
    memoize: function (func, resolver) {
        var cache = new Map();
        return (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var key = resolver ? resolver.apply(void 0, args) : JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            var result = func.apply(void 0, args);
            cache.set(key, result);
            return result;
        });
    },
    /**
     * Check if component should re-render
     */
    shouldComponentUpdate: function (prevProps, nextProps, keys) {
        return keys.some(function (key) { return prevProps[key] !== nextProps[key]; });
    },
    /**
     * Measure function execution time
     */
    measureExecutionTime: function (func, name) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var start = window.performance.now();
            var result = func.apply(void 0, args);
            var end = window.performance.now();
            console.info("".concat(name, " execution time: ").concat((end - start).toFixed(2), "ms"));
            return result;
        };
    }
};
exports.default = exports.PerformanceMonitor;
