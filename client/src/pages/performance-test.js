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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
var separator_1 = require("@/components/ui/separator");
var lucide_react_1 = require("lucide-react");
var PerformanceMonitor_1 = __importDefault(require("@/components/optimized/PerformanceMonitor"));
var AdvancedLazyLoader_1 = __importDefault(require("@/components/optimized/AdvancedLazyLoader"));
var useLazyLoading_1 = require("@/hooks/useLazyLoading");
var PerformanceTestPage = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    var _a = (0, react_1.useState)([
        {
            name: 'Bundle Size Test',
            description: t('performanceTest.tests.bundleSize'),
            icon: (0, jsx_runtime_1.jsx)(lucide_react_1.HardDrive, { className: "h-4 w-4" }),
            status: 'idle',
            result: undefined,
            threshold: 1000,
            unit: 'KB'
        },
        {
            name: 'Load Time Test',
            description: t('performanceTest.tests.loadTime'),
            icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4" }),
            status: 'idle',
            result: undefined,
            threshold: 3000,
            unit: 'ms'
        },
        {
            name: 'Memory Usage Test',
            description: t('performanceTest.tests.memoryUsage'),
            icon: (0, jsx_runtime_1.jsx)(lucide_react_1.MemoryStick, { className: "h-4 w-4" }),
            status: 'idle',
            result: undefined,
            threshold: 100,
            unit: 'MB'
        },
        {
            name: 'Network Requests Test',
            description: t('performanceTest.tests.networkRequests'),
            icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Network, { className: "h-4 w-4" }),
            status: 'idle',
            result: undefined,
            threshold: 50,
            unit: 'requests'
        },
        {
            name: 'Render Performance Test',
            description: t('performanceTest.tests.render'),
            icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { className: "h-4 w-4" }),
            status: 'idle',
            result: undefined,
            threshold: 16,
            unit: 'ms'
        },
        {
            name: 'FPS Test',
            description: t('performanceTest.tests.fps'),
            icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-4 w-4" }),
            status: 'idle',
            result: undefined,
            threshold: 30,
            unit: 'FPS'
        }
    ]), tests = _a[0], setTests = _a[1];
    var _b = (0, react_1.useState)(false), isRunningAll = _b[0], setIsRunningAll = _b[1];
    var _c = (0, react_1.useState)(0), overallScore = _c[0], setOverallScore = _c[1];
    var preloadComponents = (0, useLazyLoading_1.useLazyLoading)().preloadComponents;
    // Simulate performance test
    var runTest = function (testIndex) { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            test = tests[testIndex];
            // Simulate different test scenarios
            switch (test === null || test === void 0 ? void 0 : test.name) {
                case 'Bundle Size Test':
                    return [2 /*return*/, Math.random() * 800 + 200]; // 200-1000 KB
                case 'Load Time Test':
                    return [2 /*return*/, Math.random() * 2000 + 500]; // 500-2500 ms
                case 'Memory Usage Test':
                    return [2 /*return*/, Math.random() * 80 + 20]; // 20-100 MB
                case 'Network Requests Test':
                    return [2 /*return*/, Math.random() * 30 + 10]; // 10-40 requests
                case 'Render Performance Test':
                    return [2 /*return*/, Math.random() * 10 + 8]; // 8-18 ms
                case 'FPS Test':
                    return [2 /*return*/, Math.random() * 30 + 30]; // 30-60 FPS
                default:
                    return [2 /*return*/, 0];
            }
            return [2 /*return*/];
        });
    }); };
    // Run single test
    var runSingleTest = function (testIndex) { return __awaiter(void 0, void 0, void 0, function () {
        var result_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setTests(function (prev) { return prev.map(function (test, index) {
                        return index === testIndex ? __assign(__assign({}, test), { status: 'running' }) : test;
                    }); });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, runTest(testIndex)];
                case 2:
                    result_1 = _b.sent();
                    setTests(function (prev) { return prev.map(function (test, index) {
                        return index === testIndex
                            ? __assign(__assign({}, test), { status: 'completed', result: result_1 }) : test;
                    }); });
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    setTests(function (prev) { return prev.map(function (test, index) {
                        return index === testIndex ? __assign(__assign({}, test), { status: 'failed' }) : test;
                    }); });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Run all tests
    var runAllTests = function () { return __awaiter(void 0, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsRunningAll(true);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < tests.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, runSingleTest(i)];
                case 2:
                    _a.sent();
                    // Add delay between tests
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    // Add delay between tests
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    setIsRunningAll(false);
                    calculateOverallScore();
                    return [2 /*return*/];
            }
        });
    }); };
    // Reset all tests
    var resetTests = function () {
        setTests(function (prev) { return prev.map(function (test) { return (__assign(__assign({}, test), { status: 'idle', result: undefined })); }); });
        setOverallScore(0);
    };
    // Calculate overall performance score
    var calculateOverallScore = function () {
        var completedTests = tests.filter(function (test) { return test.status === 'completed' && test.result !== undefined; });
        if (completedTests.length === 0)
            return;
        var totalScore = 0;
        completedTests.forEach(function (test) {
            var percentage = (test.result / test.threshold) * 100;
            var score = Math.max(0, 100 - percentage);
            totalScore += score;
        });
        var averageScore = totalScore / completedTests.length;
        setOverallScore(Math.round(averageScore));
    };
    // Get test status color
    var getTestStatusColor = function (status) {
        switch (status) {
            case 'running':
                return 'secondary';
            case 'completed':
                return 'default';
            case 'failed':
                return 'destructive';
            default:
                return 'outline';
        }
    };
    // Get test status icon
    var getTestStatusIcon = function (status) {
        switch (status) {
            case 'running':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Play, { className: "h-4 w-4 animate-pulse" });
            case 'completed':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4 text-green-500" });
            case 'failed':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { className: "h-4 w-4 text-red-500" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4" });
        }
    };
    // Get performance grade
    var getPerformanceGrade = function (score) {
        if (score >= 90)
            return { grade: 'A+', color: 'text-green-500' };
        if (score >= 80)
            return { grade: 'A', color: 'text-green-600' };
        if (score >= 70)
            return { grade: 'B+', color: 'text-blue-500' };
        if (score >= 60)
            return { grade: 'B', color: 'text-blue-600' };
        if (score >= 50)
            return { grade: 'C+', color: 'text-yellow-500' };
        if (score >= 40)
            return { grade: 'C', color: 'text-yellow-600' };
        return { grade: 'D', color: 'text-red-500' };
    };
    // Preload components for better performance
    (0, react_1.useEffect)(function () {
        preloadComponents([
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/components/optimized/PerformanceMonitor')); }); }, name: 'PerformanceMonitor', priority: 'high' },
            { importFn: function () { return Promise.resolve().then(function () { return __importStar(require('@/components/optimized/AdvancedLazyLoader')); }); }, name: 'AdvancedLazyLoader', priority: 'medium' }
        ]);
    }, [preloadComponents]);
    var _d = getPerformanceGrade(overallScore), grade = _d.grade, color = _d.color;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: t('performanceTest.title') }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: t('performanceTest.subtitle') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: runAllTests, disabled: isRunningAll, className: "flex items-center gap-2", children: [isRunningAll ? (0, jsx_runtime_1.jsx)(lucide_react_1.Pause, { className: "h-4 w-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Play, { className: "h-4 w-4" }), isRunningAll ? t('performanceTest.running') : t('performanceTest.runAll')] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: resetTests, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcw, { className: "h-4 w-4" }), t('performanceTest.reset')] })] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { defaultValue: "tests", className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "tests", children: t('performanceTest.tabs.tests') }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "monitor", children: t('performanceTest.tabs.monitor') }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "optimizations", children: t('performanceTest.tabs.optimizations') })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "tests", className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Zap, { className: "h-5 w-5" }), t('performanceTest.overallScore')] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-6xl font-bold ".concat(color), children: grade }), (0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-semibold", children: [overallScore, "/100"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-muted-foreground", children: t('performanceTest.scoreLabel') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 bg-green-500 rounded-full" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: t('performanceTest.score.excellent') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 bg-blue-500 rounded-full" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: t('performanceTest.score.good') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 bg-yellow-500 rounded-full" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: t('performanceTest.score.average') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-3 h-3 bg-red-500 rounded-full" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: t('performanceTest.score.poor') })] })] })] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: tests.map(function (test, index) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "relative", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [test.icon, (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: test.name })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: getTestStatusColor(test.status), children: getTestStatusIcon(test.status) })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground mb-4", children: test.description }), test.result !== undefined && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: t('performanceTest.result') }), (0, jsx_runtime_1.jsxs)("span", { className: "font-semibold", children: [test.result.toFixed(1), " ", test.unit] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: t('performanceTest.max') }), (0, jsx_runtime_1.jsxs)("span", { className: "text-muted-foreground", children: [test.threshold, " ", test.unit] })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2", children: (0, jsx_runtime_1.jsx)("div", { className: "h-2 rounded-full ".concat(test.result <= test.threshold ? 'bg-green-500' : 'bg-red-500'), style: { width: "".concat(Math.min((test.result / test.threshold) * 100, 100), "%") } }) })] })), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return runSingleTest(index); }, disabled: test.status === 'running' || isRunningAll, variant: "outline", size: "sm", className: "w-full mt-4", children: test.status === 'running' ? t('performanceTest.runningShort') : t('performanceTest.run') })] })] }, test.name)); }) })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "monitor", className: "space-y-6", children: (0, jsx_runtime_1.jsx)(AdvancedLazyLoader_1.default, { type: "card", message: t('performanceTest.monitorLoading'), priority: "high", children: (0, jsx_runtime_1.jsx)(PerformanceMonitor_1.default, { componentName: "PerformanceTestPage", enableLogging: true, threshold: 16, children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-5 w-5" }), t('performanceTest.monitorTitle')] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: t('performanceTest.monitorDescription') }) })] }) }) }) }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "optimizations", className: "space-y-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-5 w-5" }), t('performanceTest.lazyLoadingOptimization')] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: t('performanceTest.featuresTitle') }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.bulletPreloading')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.bulletIntersection')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.bulletHover')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.bulletProgress')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.bulletQueue')] })] })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: t('performanceTest.benefitsTitle') }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.benefitLoadTime')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.benefitMemory')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.benefitUX')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.benefitSEO')] })] })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-5 w-5" }), t('performanceTest.codeSplitting')] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: t('performanceTest.splitStrategies') }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.vendorChunks')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.featureChunks')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.routeSplitting')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.componentSplitting')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.dynamicImports')] })] })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: t('performanceTest.improvementsTitle') }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.reduceInitialBundle')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.improveCaching')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.improveNetwork')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.improveLoading')] })] })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.HardDrive, { className: "h-5 w-5" }), t('performanceTest.bundleSize')] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: t('performanceTest.compressionTechniques') }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.treeShaking')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.deadCode')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.minification')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.compressionOpt')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.assetOpt')] })] })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: t('performanceTest.expectedResults') }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [(0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.resultSizeReduction')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.resultLoadTime')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.resultDataUsage')] }), (0, jsx_runtime_1.jsxs)("li", { children: ["\u2022 ", t('performanceTest.resultCoreWebVitals')] })] })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-5 w-5" }), t('performanceTest.performanceMonitoring')] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: t('performanceTest.metricsTitle') }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Bundle size monitoring" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Load time tracking" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Memory usage analysis" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Network requests count" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 FPS monitoring" })] })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold", children: t('performanceTest.featuresTitleShort') }), (0, jsx_runtime_1.jsxs)("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [(0, jsx_runtime_1.jsx)("li", { children: "\u2022 Real-time monitoring" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Performance alerts" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Historical data" }), (0, jsx_runtime_1.jsx)("li", { children: "\u2022 Optimization suggestions" })] })] })] })] })] }) })] })] }));
};
exports.default = PerformanceTestPage;
