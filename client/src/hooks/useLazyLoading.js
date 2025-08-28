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
exports.useRouteBasedPreloading = exports.useRoleBasedPreloading = exports.useLazyLoading = void 0;
var react_1 = require("react");
var logger_1 = require("../lib/logger");
// Ensure IntersectionObserver is available
var _isIntersectionObserverSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;
var useLazyLoading = function (options) {
    if (options === void 0) { options = {}; }
    var _a = options.preloadOnHover, preloadOnHover = _a === void 0 ? true : _a, _b = options.preloadOnMount, _preloadOnMount = _b === void 0 ? false : _b, _c = options.preloadDelay, _preloadDelay = _c === void 0 ? 1000 : _c, _d = options.preloadOnIntersection, preloadOnIntersection = _d === void 0 ? true : _d, _e = options.preloadOnRouteChange, _preloadOnRouteChange = _e === void 0 ? true : _e;
    var _f = (0, react_1.useState)({}), preloadedComponents = _f[0], setPreloadedComponents = _f[1];
    var _g = (0, react_1.useState)(false), isPreloading = _g[0], setIsPreloading = _g[1];
    var _h = (0, react_1.useState)([]), preloadQueue = _h[0], setPreloadQueue = _h[1];
    var preloadTimeoutRef = (0, react_1.useRef)();
    var intersectionObserverRef = (0, react_1.useRef)(null);
    // Enhanced preload component with priority
    var preloadComponent = (0, react_1.useCallback)(function (importFn_1, componentName_1) {
        var args_1 = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args_1[_i - 2] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([importFn_1, componentName_1], args_1, true), void 0, function (importFn, componentName, priority) {
            var component_1;
            if (priority === void 0) { priority = 'medium'; }
            return __generator(this, function (_a) {
                if (preloadedComponents[componentName]) {
                    return [2 /*return*/]; // Already preloaded
                }
                try {
                    setIsPreloading(true);
                    component_1 = { importFn: importFn, name: componentName, priority: priority };
                    setPreloadQueue(function (prev) {
                        var newQueue = __spreadArray([], prev, true);
                        if (priority === 'high') {
                            newQueue.unshift(component_1);
                        }
                        else if (priority === 'low') {
                            newQueue.push(component_1);
                        }
                        else {
                            // Insert medium priority components in the middle
                            var mediumIndex = newQueue.findIndex(function (item) { return item.priority === 'low'; });
                            if (mediumIndex === -1) {
                                newQueue.push(component_1);
                            }
                            else {
                                newQueue.splice(mediumIndex, 0, component_1);
                            }
                        }
                        return newQueue;
                    });
                    // Process queue with delay for better performance
                    if (preloadTimeoutRef.current) {
                        clearTimeout(preloadTimeoutRef.current);
                    }
                    preloadTimeoutRef.current = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, importFn()];
                                case 1:
                                    _a.sent();
                                    setPreloadedComponents(function (prev) {
                                        var _a;
                                        return (__assign(__assign({}, prev), (_a = {}, _a[componentName] = true, _a)));
                                    });
                                    // Remove from queue
                                    setPreloadQueue(function (prev) { return prev.filter(function (item) { return item.name !== componentName; }); });
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    logger_1.log.error('Failed to preload component', error_1, 'useLazyLoading');
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, priority === 'high' ? 0 : 100);
                }
                catch (error) {
                    logger_1.log.error('Failed to preload component', error, 'useLazyLoading');
                }
                finally {
                    setIsPreloading(false);
                }
                return [2 /*return*/];
            });
        });
    }, [preloadedComponents]);
    // Enhanced preload multiple components with priority
    var preloadComponents = (0, react_1.useCallback)(function (components) { return __awaiter(void 0, void 0, void 0, function () {
        var sortedComponents, highPriorityComponents, otherComponents_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsPreloading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    sortedComponents = __spreadArray([], components, true).sort(function (a, b) {
                        var priorityOrder = { high: 0, medium: 1, low: 2 };
                        return priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium'];
                    });
                    highPriorityComponents = sortedComponents.filter(function (c) { return c.priority === 'high'; });
                    return [4 /*yield*/, Promise.all(highPriorityComponents.map(function (_a) {
                            var importFn = _a.importFn, name = _a.name;
                            return preloadComponent(importFn, name, 'high');
                        }))];
                case 2:
                    _a.sent();
                    otherComponents_1 = sortedComponents.filter(function (c) { return c.priority !== 'high'; });
                    if (otherComponents_1.length > 0) {
                        setTimeout(function () {
                            otherComponents_1.forEach(function (_a) {
                                var importFn = _a.importFn, name = _a.name, priority = _a.priority;
                                return preloadComponent(importFn, name, priority);
                            });
                        }, 200);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    logger_1.log.error('Failed to preload components', error_2, 'useLazyLoading');
                    return [3 /*break*/, 5];
                case 4:
                    setIsPreloading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [preloadComponent]);
    // Enhanced hover handler with debouncing
    var createHoverHandler = (0, react_1.useCallback)(function (importFn, componentName, priority) {
        if (priority === void 0) { priority = 'medium'; }
        if (!preloadOnHover) {
            return undefined;
        }
        var timeoutId;
        var isHovering = false;
        return {
            onMouseEnter: function () {
                isHovering = true;
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(function () {
                    if (isHovering) {
                        preloadComponent(importFn, componentName, priority);
                    }
                }, 150); // Reduced delay for better responsiveness
            },
            onMouseLeave: function () {
                isHovering = false;
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        };
    }, [preloadOnHover, preloadComponent]);
    // Intersection Observer for preloading on scroll
    var createIntersectionHandler = (0, react_1.useCallback)(function (importFn, componentName, priority) {
        if (priority === void 0) { priority = 'medium'; }
        if (!preloadOnIntersection || typeof window === 'undefined' || !window.IntersectionObserver) {
            return undefined;
        }
        return function (element) {
            if (!element)
                return;
            if (!intersectionObserverRef.current) {
                intersectionObserverRef.current = new window.IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        var _a;
                        if (entry.isIntersecting) {
                            var componentName_1 = entry.target.getAttribute('data-component');
                            if (componentName_1) {
                                preloadComponent(importFn, componentName_1, priority);
                                (_a = intersectionObserverRef.current) === null || _a === void 0 ? void 0 : _a.unobserve(entry.target);
                            }
                        }
                    });
                }, {
                    rootMargin: '50px', // Start preloading 50px before element is visible
                    threshold: 0.1
                });
            }
            element.setAttribute('data-component', componentName);
            intersectionObserverRef.current.observe(element);
        };
    }, [preloadOnIntersection, preloadComponent]);
    // Enhanced preload functions with priority
    var preloadDashboardComponents = (0, react_1.useCallback)(function () {
        preloadComponents([
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/dashboard')); }); }, name: 'Dashboard', priority: 'high' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/ai-dashboard')); }); }, name: 'AIDashboard', priority: 'medium' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/role-based-dashboard')); }); }, name: 'RoleBasedDashboard', priority: 'medium' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/super-admin-dashboard')); }); }, name: 'SuperAdminDashboard', priority: 'low' }
        ]);
    }, [preloadComponents]);
    var preloadEmployeeComponents = (0, react_1.useCallback)(function () {
        preloadComponents([
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/employees')); }); }, name: 'Employees', priority: 'high' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/employee-management')); }); }, name: 'EmployeeManagement', priority: 'medium' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/attendance')); }); }, name: 'Attendance', priority: 'high' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/leave-requests')); }); }, name: 'LeaveRequests', priority: 'medium' }
        ]);
    }, [preloadComponents]);
    var preloadDocumentComponents = (0, react_1.useCallback)(function () {
        preloadComponents([
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/documents')); }); }, name: 'Documents', priority: 'high' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/licenses')); }); }, name: 'Licenses', priority: 'medium' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/signatures')); }); }, name: 'Signatures', priority: 'low' }
        ]);
    }, [preloadComponents]);
    var preloadReportingComponents = (0, react_1.useCallback)(function () {
        preloadComponents([
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/reports')); }); }, name: 'Reports', priority: 'high' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/performance')); }); }, name: 'Performance', priority: 'medium' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/ai-analytics')); }); }, name: 'AIAnalytics', priority: 'low' }
        ]);
    }, [preloadComponents]);
    // Cleanup on unmount
    (0, react_1.useEffect)(function () {
        return function () {
            if (preloadTimeoutRef.current) {
                clearTimeout(preloadTimeoutRef.current);
            }
            if (intersectionObserverRef.current) {
                intersectionObserverRef.current.disconnect();
            }
        };
    }, []);
    return {
        preloadComponent: preloadComponent,
        preloadComponents: preloadComponents,
        createHoverHandler: createHoverHandler,
        createIntersectionHandler: createIntersectionHandler,
        preloadDashboardComponents: preloadDashboardComponents,
        preloadEmployeeComponents: preloadEmployeeComponents,
        preloadDocumentComponents: preloadDocumentComponents,
        preloadReportingComponents: preloadReportingComponents,
        preloadedComponents: preloadedComponents,
        isPreloading: isPreloading,
        preloadQueue: preloadQueue
    };
};
exports.useLazyLoading = useLazyLoading;
// Hook for preloading based on user role
var useRoleBasedPreloading = function (userRole) {
    var preloadComponents = (0, exports.useLazyLoading)({ 'preloadOnMount': true }).preloadComponents;
    (0, react_1.useEffect)(function () {
        var _a;
        if (!userRole) {
            return;
        }
        var roleBasedComponents = {
            'super_admin': [
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/super-admin-dashboard')); }); }, 'name': 'SuperAdminDashboard' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/companies')); }); }, 'name': 'Companies' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/reports')); }); }, 'name': 'Reports' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/settings')); }); }, 'name': 'Settings' }
            ],
            'company_manager': [
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/dashboard')); }); }, 'name': 'Dashboard' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/employees')); }); }, 'name': 'Employees' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/reports')); }); }, 'name': 'Reports' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/attendance')); }); }, 'name': 'Attendance' }
            ],
            'employee': [
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/dashboard')); }); }, 'name': 'Dashboard' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/documents')); }); }, 'name': 'Documents' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/leave-requests')); }); }, 'name': 'LeaveRequests' }
            ],
            'supervisor': [
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/dashboard')); }); }, 'name': 'Dashboard' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/employees')); }); }, 'name': 'Employees' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/attendance')); }); }, 'name': 'Attendance' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/performance')); }); }, 'name': 'Performance' }
            ],
            'worker': [
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/dashboard')); }); }, 'name': 'Dashboard' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/attendance')); }); }, 'name': 'Attendance' },
                { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/documents')); }); }, 'name': 'Documents' }
            ]
        };
        var componentsToPreload = (_a = roleBasedComponents[userRole]) !== null && _a !== void 0 ? _a : [];
        if (componentsToPreload.length > 0) {
            preloadComponents(componentsToPreload);
        }
    }, [userRole, preloadComponents]);
};
exports.useRoleBasedPreloading = useRoleBasedPreloading;
// Hook for preloading based on current route
var useRouteBasedPreloading = function (currentRoute) {
    var preloadComponent = (0, exports.useLazyLoading)().preloadComponent;
    (0, react_1.useEffect)(function () {
        var routeComponentMap = {
            '/dashboard': { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/dashboard')); }); }, 'name': 'Dashboard' },
            '/employees': { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/employees')); }); }, 'name': 'Employees' },
            '/companies': { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/companies')); }); }, 'name': 'Companies' },
            '/reports': { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/reports')); }); }, 'name': 'Reports' },
            '/attendance': { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/attendance')); }); }, 'name': 'Attendance' },
            '/documents': { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/documents')); }); }, 'name': 'Documents' },
            '/settings': { 'importFn': function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/settings')); }); }, 'name': 'Settings' }
        };
        var componentToPreload = routeComponentMap[currentRoute];
        if (componentToPreload) {
            preloadComponent(componentToPreload.importFn, componentToPreload.name);
        }
    }, [currentRoute, preloadComponent]);
};
exports.useRouteBasedPreloading = useRouteBasedPreloading;
