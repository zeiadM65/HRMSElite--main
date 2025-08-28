"use strict";
/* global NodeJS, performance */
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
exports.BundleUtils = exports.NetworkUtils = exports.MemoryUtils = exports.ComponentUtils = exports.PerformanceMonitor = void 0;
exports.debounce = debounce;
exports.throttle = throttle;
exports.memoize = memoize;
exports.createLazyLoader = createLazyLoader;
exports.usePerformanceMonitoring = usePerformanceMonitoring;
var react_1 = __importDefault(require("react"));
/**
 * Performance Utilities for HRMS Elite
 * Provides tools for monitoring and optimizing application performance
 */
// Performance monitoring utilities
var PerformanceMonitor = /** @class */ (function () {
    function PerformanceMonitor() {
        this.metrics = new Map();
        this.observers = new Set();
    }
    PerformanceMonitor.getInstance = function () {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    };
    /**
     * Measure execution time of a function
     */
    PerformanceMonitor.measureExecutionTime = function (func, name) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var start = Date.now();
            var result = func.apply(void 0, args);
            var end = Date.now();
            var executionTime = end - start;
            PerformanceMonitor.getInstance().recordMetric("".concat(name, "_execution_time"), executionTime);
            if (executionTime > 100) {
                console.warn("\uD83D\uDEA8 Slow execution detected in ".concat(name, ": ").concat(executionTime, "ms"));
            }
            return result;
        };
    };
    /**
     * Record a performance metric
     */
    PerformanceMonitor.prototype.recordMetric = function (name, value) {
        var _a;
        this.metrics.set(name, {
            value: value,
            timestamp: Date.now(),
            count: (((_a = this.metrics.get(name)) === null || _a === void 0 ? void 0 : _a.count) || 0) + 1
        });
        // Notify observers
        this.observers.forEach(function (observer) { return observer(name, value); });
    };
    /**
     * Get a performance metric
     */
    PerformanceMonitor.prototype.getMetric = function (name) {
        return this.metrics.get(name);
    };
    /**
     * Get all metrics
     */
    PerformanceMonitor.prototype.getAllMetrics = function () {
        return new Map(this.metrics);
    };
    /**
     * Subscribe to metric changes
     */
    PerformanceMonitor.prototype.subscribe = function (observer) {
        var _this = this;
        this.observers.add(observer);
        return function () { return _this.observers.delete(observer); };
    };
    /**
     * Clear all metrics
     */
    PerformanceMonitor.prototype.clear = function () {
        this.metrics.clear();
    };
    return PerformanceMonitor;
}());
exports.PerformanceMonitor = PerformanceMonitor;
// Debounce utility
function debounce(func, wait) {
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () { return func.apply(void 0, args); }, wait);
    };
}
// Throttle utility
function throttle(func, limit) {
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
}
// Memoization utility
function memoize(func, resolver) {
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
}
// Lazy loading utility
function createLazyLoader(loader, options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var _a = options.cache, cache = _a === void 0 ? true : _a, _b = options.timeout, timeout = _b === void 0 ? 5000 : _b;
    var cached = null;
    var loading = null;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (cache && cached) {
                        return [2 /*return*/, cached];
                    }
                    if (loading) {
                        return [2 /*return*/, loading];
                    }
                    loading = Promise.race([
                        loader(),
                        new Promise(function (_, reject) {
                            return setTimeout(function () { return reject(new Error('Lazy loading timeout')); }, timeout);
                        })
                    ]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, loading];
                case 2:
                    result = _a.sent();
                    if (cache) {
                        cached = result;
                    }
                    return [2 /*return*/, result];
                case 3:
                    loading = null;
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
}
// Component optimization utilities
exports.ComponentUtils = {
    /**
     * Check if component should re-render
     */
    shouldComponentUpdate: function (prevProps, nextProps, keys) {
        return keys.some(function (key) { return prevProps[key] !== nextProps[key]; });
    },
    /**
     * Create a memoized component wrapper
     */
    memoizeComponent: function (Component, propsAreEqual) {
        return react_1.default.memo(Component, propsAreEqual);
    },
    /**
     * Create a lazy component with error boundary
     */
    createLazyComponent: function (loader, fallback) {
        return react_1.default.lazy(function () {
            return loader().catch(function (error) {
                console.error('Failed to load component:', error);
                var ErrorComponent = fallback || (function () { return react_1.default.createElement('div', null, 'Error loading component'); });
                return { default: ErrorComponent };
            });
        });
    }
};
// Memory management utilities
exports.MemoryUtils = {
    /**
     * Get memory usage (if available)
     */
    getMemoryUsage: function () {
        if (typeof window !== 'undefined' && 'performance' in window) {
            var memory = performance.memory;
            if (memory) {
                return {
                    used: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
                    total: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
                    limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) // MB
                };
            }
        }
        return null;
    },
    /**
     * Check if memory usage is high
     */
    isMemoryUsageHigh: function (threshold) {
        if (threshold === void 0) { threshold = 80; }
        var memory = this.getMemoryUsage();
        if (!memory)
            return false;
        var usagePercentage = (memory.used / memory.limit) * 100;
        return usagePercentage > threshold;
    },
    /**
     * Force garbage collection (if available)
     */
    forceGC: function () {
        if (typeof window !== 'undefined' && 'gc' in window) {
            window.gc();
        }
    }
};
// Network performance utilities
exports.NetworkUtils = {
    /**
     * Measure network request time
     */
    measureRequestTime: function (request, name) {
        return __awaiter(this, void 0, void 0, function () {
            var start, result, duration, error_1, duration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = Date.now();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, request()];
                    case 2:
                        result = _a.sent();
                        duration = Date.now() - start;
                        PerformanceMonitor.getInstance().recordMetric("".concat(name, "_request_time"), duration);
                        if (duration > 1000) {
                            console.warn("\uD83D\uDEA8 Slow network request detected: ".concat(name, " took ").concat(duration, "ms"));
                        }
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        duration = Date.now() - start;
                        PerformanceMonitor.getInstance().recordMetric("".concat(name, "_request_error"), duration);
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Create a request with retry logic
     */
    requestWithRetry: function (request_1) {
        return __awaiter(this, arguments, void 0, function (request, options) {
            var _a, maxRetries, _b, delay, _c, backoff, lastError, _loop_1, attempt, state_1;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = options.maxRetries, maxRetries = _a === void 0 ? 3 : _a, _b = options.delay, delay = _b === void 0 ? 1000 : _b, _c = options.backoff, backoff = _c === void 0 ? true : _c;
                        _loop_1 = function (attempt) {
                            var _e, error_2, waitTime_1;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        _f.trys.push([0, 2, , 4]);
                                        _e = {};
                                        return [4 /*yield*/, request()];
                                    case 1: return [2 /*return*/, (_e.value = _f.sent(), _e)];
                                    case 2:
                                        error_2 = _f.sent();
                                        lastError = error_2;
                                        if (attempt === maxRetries) {
                                            return [2 /*return*/, "break"];
                                        }
                                        waitTime_1 = backoff ? delay * Math.pow(2, attempt) : delay;
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, waitTime_1); })];
                                    case 3:
                                        _f.sent();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        attempt = 0;
                        _d.label = 1;
                    case 1:
                        if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(attempt)];
                    case 2:
                        state_1 = _d.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        if (state_1 === "break")
                            return [3 /*break*/, 4];
                        _d.label = 3;
                    case 3:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 4: throw lastError;
                }
            });
        });
    }
};
// Bundle size optimization
exports.BundleUtils = {
    /**
     * Check if code splitting is working
     */
    checkCodeSplitting: function () {
        if (typeof window !== 'undefined' && 'performance' in window) {
            var resources = performance.getEntriesByType('resource');
            var jsFiles = resources.filter(function (r) { return r.name.endsWith('.js'); });
            console.info("\uD83D\uDCE6 Bundle analysis: ".concat(jsFiles.length, " JavaScript files loaded"));
            jsFiles.forEach(function (file) {
                var size = file.transferSize || 0;
                if (size > 100 * 1024) { // 100KB
                    console.warn("\uD83D\uDEA8 Large bundle detected: ".concat(file.name, " (").concat(Math.round(size / 1024), "KB)"));
                }
            });
        }
    },
    /**
     * Preload critical resources
     */
    preloadResource: function (url, type) {
        if (type === void 0) { type = 'script'; }
        var link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = type;
        document.head.appendChild(link);
    }
};
// Performance monitoring hook
function usePerformanceMonitoring(componentName, options) {
    if (options === void 0) { options = {}; }
    var _a = options.enableLogging, enableLogging = _a === void 0 ? false : _a, _b = options.threshold, threshold = _b === void 0 ? 16 : _b;
    var renderStartTime = react_1.default.useRef(0);
    var renderCount = react_1.default.useRef(0);
    var startRender = react_1.default.useCallback(function () {
        renderStartTime.current = Date.now();
        renderCount.current += 1;
    }, []);
    var endRender = react_1.default.useCallback(function () {
        var renderTime = Date.now() - renderStartTime.current;
        PerformanceMonitor.getInstance().recordMetric("".concat(componentName, "_render_time"), renderTime);
        if (enableLogging && renderTime > threshold) {
            console.warn("\uD83D\uDEA8 Performance Issue in ".concat(componentName, ":"), {
                renderTime: "".concat(renderTime, "ms"),
                threshold: "".concat(threshold, "ms"),
                renderCount: renderCount.current
            });
        }
        return renderTime;
    }, [componentName, enableLogging, threshold]);
    react_1.default.useEffect(function () {
        startRender();
        var timeoutId = setTimeout(endRender, 0);
        return function () { return clearTimeout(timeoutId); };
    });
    return {
        startRender: startRender,
        endRender: endRender,
        renderCount: renderCount.current,
        getMetrics: function () { return PerformanceMonitor.getInstance().getAllMetrics(); }
    };
}
// Export default instance
exports.default = PerformanceMonitor.getInstance();
