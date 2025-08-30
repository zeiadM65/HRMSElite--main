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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Analytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/hooks/use-toast");
var logger_1 = __importDefault(require("../../lib/logger"));
function Analytics(_a) {
    var _this = this;
    var className = _a.className;
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)(null), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), refreshing = _d[0], setRefreshing = _d[1];
    var _e = (0, react_1.useState)('week'), selectedPeriod = _e[0], setSelectedPeriod = _e[1];
    var _f = (0, react_1.useState)('all'), selectedCategory = _f[0], setSelectedCategory = _f[1];
    var _g = (0, react_1.useState)(false), realTimeMode = _g[0], setRealTimeMode = _g[1];
    var _h = (0, react_1.useState)(false), showAdvancedMetrics = _h[0], setShowAdvancedMetrics = _h[1];
    // Monitor real-time interactions
    (0, react_1.useEffect)(function () {
        var handleClick = function (e) {
            // Log clicks for analytics
            var target = e.target;
            if (target) {
                logger_1.default.info('User click:', {
                    'element': target.tagName,
                    'className': target.className,
                    'path': window.location.pathname,
                    'timestamp': new Date().toISOString()
                });
            }
        };
        var handleKeyPress = function (e) {
            // Log keyboard usage
            logger_1.default.info('User keypress:', {
                'key': e.key,
                'path': window.location.pathname,
                'timestamp': new Date().toISOString()
            });
        };
        var handlePageView = function () {
            // Log page views
            logger_1.default.info('Page view:', {
                'path': window.location.pathname,
                'timestamp': new Date().toISOString()
            });
        };
        // Add event listeners (browser environment only)
        var doc = typeof window !== 'undefined' ? window.document : undefined;
        if (doc) {
            doc.addEventListener('click', handleClick);
            doc.addEventListener('keypress', handleKeyPress);
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('popstate', handlePageView);
        }
        // Log initial page view
        handlePageView();
        return function () {
            var cleanupDoc = typeof window !== 'undefined' ? window.document : undefined;
            if (cleanupDoc) {
                cleanupDoc.removeEventListener('click', handleClick);
                cleanupDoc.removeEventListener('keypress', handleKeyPress);
            }
            if (typeof window !== 'undefined') {
                window.removeEventListener('popstate', handlePageView);
            }
        };
    }, []);
    var fetchAnalyticsData = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, analyticsData, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, 4, 5]);
                    setLoading(true);
                    return [4 /*yield*/, fetch("/api/ai/analytics?period=".concat(selectedPeriod, "&category=").concat(selectedCategory), {
                            'credentials': 'include'
                        })];
                case 1:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch analytics data');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    analyticsData = _b.sent();
                    setData(analyticsData);
                    return [3 /*break*/, 5];
                case 3:
                    _a = _b.sent();
                    toast({
                        'title': 'خطأ في تحميل البيانات',
                        'description': 'حدث خطأ أثناء تحميل بيانات التحليلات. يرجى المحاولة مرة أخرى.',
                        'variant': 'destructive'
                    });
                    // Fallback mock data
                    setData(generateMockData());
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var generateMockData = function () { return ({
        'usageStats': {
            'totalRequests': 1247,
            'averageResponseTime': 2.3,
            'successRate': 94.2,
            'popularFeatures': [
                { 'name': 'تحليل النصوص', 'count': 456, 'trend': 'up' },
                { 'name': 'توليد التقارير', 'count': 342, 'trend': 'up' },
                { 'name': 'تحليل المشاعر', 'count': 289, 'trend': 'stable' },
                { 'name': 'استخراج الكلمات المفتاحية', 'count': 160, 'trend': 'down' },
                { 'name': 'المساعد الذكي', 'count': 523, 'trend': 'up' }
            ]
        },
        'insights': [
            {
                'id': '1',
                'title': 'زيادة في استخدام تحليل النصوص',
                'description': 'ارتفع استخدام ميزة تحليل النصوص بنسبة 23% هذا الأسبوع، مما يدل على زيادة الاهتمام بالتحليل المتقدم',
                'type': 'positive',
                'impact': 'high',
                'timestamp': new Date().toISOString(),
                'category': 'feature-usage',
                'confidence': 0.95
            },
            {
                'id': '2',
                'title': 'تحسن في وقت الاستجابة',
                'description': 'انخفض متوسط وقت الاستجابة من 3.2 إلى 2.3 ثانية، مما يحسن تجربة المستخدم بشكل كبير',
                'type': 'positive',
                'impact': 'medium',
                'timestamp': new Date(Date.now() - 86400000).toISOString(),
                'category': 'performance',
                'confidence': 0.88
            },
            {
                'id': '3',
                'title': 'انخفاض في دقة تحليل المشاعر',
                'description': 'انخفضت دقة تحليل المشاعر بنسبة 5% - يحتاج إلى مراجعة وتحسين الخوارزمية',
                'type': 'warning',
                'impact': 'medium',
                'timestamp': new Date(Date.now() - 172800000).toISOString(),
                'category': 'accuracy',
                'confidence': 0.82
            },
            {
                'id': '4',
                'title': 'زيادة في استخدام المساعد الذكي',
                'description': 'ارتفع استخدام المساعد الذكي بنسبة 45%، مما يدل على نجاح الميزة',
                'type': 'positive',
                'impact': 'high',
                'timestamp': new Date().toISOString(),
                'category': 'ai-usage',
                'confidence': 0.92
            },
            {
                'id': '5',
                'title': 'تحسن في معدل رضا المستخدمين',
                'description': 'ارتفع معدل رضا المستخدمين من 4.2 إلى 4.6 من 5، مما يدل على تحسن جودة الخدمة',
                'type': 'positive',
                'impact': 'high',
                'timestamp': new Date().toISOString(),
                'category': 'satisfaction',
                'confidence': 0.89
            }
        ],
        'trends': {
            'dailyUsage': [
                { 'date': '2024-01-01', 'requests': 45, 'users': 12 },
                { 'date': '2024-01-02', 'requests': 52, 'users': 15 },
                { 'date': '2024-01-03', 'requests': 48, 'users': 14 },
                { 'date': '2024-01-04', 'requests': 61, 'users': 18 },
                { 'date': '2024-01-05', 'requests': 58, 'users': 17 },
                { 'date': '2024-01-06', 'requests': 67, 'users': 20 },
                { 'date': '2024-01-07', 'requests': 73, 'users': 22 }
            ],
            'featureUsage': [
                { 'feature': 'تحليل النصوص', 'percentage': 36.6, 'growth': 23 },
                { 'feature': 'توليد التقارير', 'percentage': 27.4, 'growth': 15 },
                { 'feature': 'تحليل المشاعر', 'percentage': 23.2, 'growth': 5 },
                { 'feature': 'استخراج الكلمات المفتاحية', 'percentage': 12.8, 'growth': -8 }
            ],
            'performanceMetrics': {
                'responseTime': 2.3,
                'accuracy': 94.2,
                'userSatisfaction': 4.6,
                'systemHealth': 'good'
            }
        },
        'recommendations': [
            {
                'id': '1',
                'title': 'تحسين خوارزمية تحليل المشاعر',
                'description': 'استثمار في تحسين دقة تحليل المشاعر لتحسين تجربة المستخدم وزيادة الثقة في النتائج',
                'priority': 'high',
                'category': 'performance',
                'estimatedImpact': 'زيادة الدقة بنسبة 15%',
                'implementationTime': '2-3 أسابيع',
                'cost': 'متوسط'
            },
            {
                'id': '2',
                'title': 'إضافة ميزة الترجمة التلقائية',
                'description': 'إضافة دعم للترجمة التلقائية لتحسين إمكانية الوصول وتوسيع نطاق الاستخدام',
                'priority': 'medium',
                'category': 'accessibility',
                'estimatedImpact': 'زيادة المستخدمين بنسبة 25%',
                'implementationTime': '4-6 أسابيع',
                'cost': 'عالي'
            },
            {
                'id': '3',
                'title': 'تحسين واجهة المستخدم',
                'description': 'تحسين تصميم واجهة المستخدم بناءً على تحليل سلوك المستخدمين',
                'priority': 'medium',
                'category': 'ui-ux',
                'estimatedImpact': 'زيادة رضا المستخدمين بنسبة 20%',
                'implementationTime': '3-4 أسابيع',
                'cost': 'متوسط'
            },
            {
                'id': '4',
                'title': 'إضافة ميزات تحليل متقدمة',
                'description': 'إضافة ميزات تحليل متقدمة مثل التنبؤ والتحليل التنبؤي',
                'priority': 'low',
                'category': 'advanced-features',
                'estimatedImpact': 'زيادة القيمة المضافة بنسبة 30%',
                'implementationTime': '6-8 أسابيع',
                'cost': 'عالي'
            }
        ],
        'userInteractions': {
            'sessionDuration': 25.5,
            'clicksPerSession': 18.3,
            'featuresUsed': ['تحليل النصوص', 'توليد التقارير', 'المساعد الذكي', 'تحليل المشاعر'],
            'commonPaths': [
                { 'path': '/dashboard', 'count': 156, 'successRate': 95 },
                { 'path': '/analytics', 'count': 89, 'successRate': 88 },
                { 'path': '/reports', 'count': 134, 'successRate': 92 },
                { 'path': '/ai-chatbot', 'count': 234, 'successRate': 96 }
            ],
            'deviceTypes': [
                { 'type': 'Desktop', 'percentage': 65, 'trend': 'up' },
                { 'type': 'Mobile', 'percentage': 30, 'trend': 'up' },
                { 'type': 'Tablet', 'percentage': 5, 'trend': 'stable' }
            ],
            'errorRate': 2.1,
            'bounceRate': 15.3,
            'learningProgress': 78.5,
            'efficiencyScore': 85.2
        },
        'realTimeMetrics': {
            'activeUsers': 23,
            'currentRequests': 8,
            'systemHealth': 'good',
            'lastUpdate': new Date().toISOString(),
            'peakUsage': 45,
            'averageSessionTime': 28.5
        },
        'aiPerformance': {
            'modelAccuracy': 94.2,
            'responseQuality': 4.6,
            'userSatisfaction': 4.5,
            'learningRate': 0.15,
            'improvementAreas': [
                'تحليل المشاعر للغة العربية',
                'دقة التوصيات',
                'سرعة الاستجابة للاستعلامات المعقدة'
            ],
            'successMetrics': {
                'correctResponses': 94.2,
                'helpfulResponses': 89.5,
                'userFeedback': 4.6
            }
        }
    }); };
    var handleRefresh = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setRefreshing(true);
                    return [4 /*yield*/, fetchAnalyticsData()];
                case 1:
                    _a.sent();
                    setRefreshing(false);
                    toast({
                        'title': 'تم تحديث البيانات',
                        'description': 'تم تحديث بيانات التحليلات بنجاح.',
                        'variant': 'default'
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var handleExport = function () {
        if (!data) {
            return;
        }
        var exportData = {
            'timestamp': new Date().toISOString(),
            'period': selectedPeriod,
            'category': selectedCategory,
            data: data
        };
        if (typeof window === 'undefined' || !window.document || !window.Blob || !window.URL) {
            return;
        }
        var blob = new window.Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        var url = window.URL.createObjectURL(blob);
        var a = window.document.createElement('a');
        a.href = url;
        a.download = "analytics-".concat(selectedPeriod, "-").concat(selectedCategory, "-").concat(new Date().toISOString().split('T')[0], ".json");
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast({
            'title': 'تم تصدير البيانات',
            'description': 'تم تصدير بيانات التحليلات بنجاح.',
            'variant': 'default'
        });
    };
    var getInsightIcon = function (type) {
        var _a;
        var icons = {
            positive: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4" }),
            negative: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingDown, { className: "h-4 w-4" }),
            neutral: (0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4" }),
            warning: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" })
        };
        return (_a = icons[type]) !== null && _a !== void 0 ? _a : (0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4" });
    };
    var getInsightColor = function (type) {
        var _a;
        var colors = {
            'positive': 'text-green-600 bg-green-50',
            'negative': 'text-red-600 bg-red-50',
            'neutral': 'text-blue-600 bg-blue-50',
            'warning': 'text-yellow-600 bg-yellow-50'
        };
        return (_a = colors[type]) !== null && _a !== void 0 ? _a : 'text-gray-600 bg-gray-50';
    };
    var getPriorityColor = function (priority) {
        var _a;
        var colors = {
            'high': 'text-red-600 bg-red-50',
            'medium': 'text-yellow-600 bg-yellow-50',
            'low': 'text-green-600 bg-green-50'
        };
        return (_a = colors[priority]) !== null && _a !== void 0 ? _a : 'text-gray-600 bg-gray-50';
    };
    var getSystemHealthIcon = function (health) {
        var _a;
        var icons = {
            excellent: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4" }),
            good: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4" }),
            warning: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" }),
            critical: (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-4 w-4" })
        };
        return (_a = icons[health]) !== null && _a !== void 0 ? _a : (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-4 w-4" });
    };
    var getTrendIcon = function (trend) {
        switch (trend) {
            case 'up':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-3 w-3 mr-1" });
            case 'down':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingDown, { className: "h-3 w-3 mr-1" });
            case 'stable':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-3 w-3 mr-1" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-3 w-3 mr-1" });
        }
    };
    var getTrendColor = function (trend) {
        var _a;
        var colors = {
            'up': 'text-green-600',
            'down': 'text-red-600',
            'stable': 'text-blue-600'
        };
        return (_a = colors[trend]) !== null && _a !== void 0 ? _a : 'text-gray-600';
    };
    (0, react_1.useEffect)(function () {
        fetchAnalyticsData();
    }, [selectedPeriod, selectedCategory]);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center p-8 ".concat(className), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-6 w-6 animate-spin" }), (0, jsx_runtime_1.jsx)("span", { children: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A..." })] }) }));
    }
    if (!data) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center p-8 ".concat(className), children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A." })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 ".concat(className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-900", children: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "\u062A\u062D\u0644\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0646\u0638\u0627\u0645 \u0648\u0627\u0644\u0623\u062F\u0627\u0621" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setShowAdvancedMetrics(!showAdvancedMetrics); }, children: [showAdvancedMetrics ? 'إخفاء' : 'إظهار', " \u0627\u0644\u0645\u0642\u0627\u064A\u064A\u0633 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: handleExport, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4 mr-2" }), "\u062A\u0635\u062F\u064A\u0631"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: handleRefresh, disabled: refreshing, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-4 w-4 mr-2 ".concat(refreshing ? 'animate-spin' : '') }), "\u062A\u062D\u062F\u064A\u062B"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: "\u0627\u0644\u0641\u062A\u0631\u0629:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedPeriod, onChange: function (e) { return setSelectedPeriod(e.target.value); }, className: "border rounded px-3 py-1 text-sm", children: [(0, jsx_runtime_1.jsx)("option", { value: "day", children: "\u0627\u0644\u064A\u0648\u0645" }), (0, jsx_runtime_1.jsx)("option", { value: "week", children: "\u0627\u0644\u0623\u0633\u0628\u0648\u0639" }), (0, jsx_runtime_1.jsx)("option", { value: "month", children: "\u0627\u0644\u0634\u0647\u0631" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: "\u0627\u0644\u0641\u0626\u0629:" }), (0, jsx_runtime_1.jsxs)("select", { value: selectedCategory, onChange: function (e) { return setSelectedCategory(e.target.value); }, className: "border rounded px-3 py-1 text-sm", children: [(0, jsx_runtime_1.jsx)("option", { value: "all", children: "\u0627\u0644\u0643\u0644" }), (0, jsx_runtime_1.jsx)("option", { value: "performance", children: "\u0627\u0644\u0623\u062F\u0627\u0621" }), (0, jsx_runtime_1.jsx)("option", { value: "usage", children: "\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645" }), (0, jsx_runtime_1.jsx)("option", { value: "ai", children: "\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" }), (0, jsx_runtime_1.jsx)("option", { value: "user", children: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: "realtime", checked: realTimeMode, onChange: function (e) { return setRealTimeMode(e.target.checked); }, className: "rounded" }), (0, jsx_runtime_1.jsx)("label", { htmlFor: "realtime", className: "text-sm", children: "\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0641\u0639\u0644\u064A" })] })] }), realTimeMode && data.realTimeMetrics && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0627\u0644\u0645\u0642\u0627\u064A\u064A\u0633 \u0641\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0641\u0639\u0644\u064A" })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-blue-600", children: data.realTimeMetrics.activeUsers }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: data.realTimeMetrics.currentRequests }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-purple-600", children: data.realTimeMetrics.peakUsage }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0623\u0642\u0635\u0649" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-orange-600", children: [data.realTimeMetrics.averageSessionTime, " \u062F"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062C\u0644\u0633\u0629" })] })] }) })] })), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645" })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold text-blue-600", children: data.usageStats.totalRequests.toLocaleString() }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0637\u0644\u0628\u0627\u062A" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-3xl font-bold text-green-600", children: [data.usageStats.averageResponseTime, "s"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u062A\u0648\u0633\u0637 \u0648\u0642\u062A \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-3xl font-bold text-purple-600", children: [data.usageStats.successRate, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u0646\u062C\u0627\u062D" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-medium mb-4", children: "\u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0623\u0643\u062B\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0627\u064B" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: data.usageStats.popularFeatures.map(function (feature, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: feature.name }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: "text-xs ".concat(getTrendColor(feature.trend)), children: [getTrendIcon(feature.trend), feature.trend === 'up' ? 'زيادة' : feature.trend === 'down' ? 'انخفاض' : 'مستقر'] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-gray-600", children: feature.count.toLocaleString() }), (0, jsx_runtime_1.jsx)("div", { className: "w-20 bg-gray-200 rounded-full h-2", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-blue-600 h-2 rounded-full", style: {
                                                                    'width': "".concat((feature.count / Math.max.apply(Math, data.usageStats.popularFeatures.map(function (f) { return f.count; }))) * 100, "%")
                                                                } }) })] })] }, index)); }) })] })] })] }), data.aiPerformance && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0623\u062F\u0627\u0621 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-blue-600", children: [data.aiPerformance.modelAccuracy, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u062F\u0642\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-green-600", children: [data.aiPerformance.responseQuality, "/5"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u062C\u0648\u062F\u0629 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-purple-600", children: [data.aiPerformance.userSatisfaction, "/5"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0631\u0636\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-orange-600", children: data.aiPerformance.learningRate }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0639\u0644\u0645" })] })] }), data.aiPerformance.improvementAreas.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-medium mb-4", children: "\u0645\u062C\u0627\u0644\u0627\u062A \u0627\u0644\u062A\u062D\u0633\u064A\u0646" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: data.aiPerformance.improvementAreas.map(function (area, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Target, { className: "h-4 w-4 text-blue-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: area })] }, index)); }) })] }))] })] })), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0627\u0644\u0631\u0624\u0649 \u0648\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A" })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: data.insights.map(function (insight) { return ((0, jsx_runtime_1.jsx)("div", { className: "p-4 rounded-lg border ".concat(getInsightColor(insight.type)), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start space-x-3", children: [getInsightIcon(insight.type), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium", children: insight.title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "text-xs ".concat(getInsightColor(insight.type)), children: insight.impact === 'high' ? 'عالي' : insight.impact === 'medium' ? 'متوسط' : 'منخفض' }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-gray-500", children: new Date(insight.timestamp).toLocaleDateString('ar-SA') })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-700", children: insight.description }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mt-2", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "text-xs", children: insight.category }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500", children: ["\u0627\u0644\u062B\u0642\u0629: ", Math.round(insight.confidence * 100), "%"] })] })] })] }) }, insight.id)); }) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Target, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A" })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: data.recommendations.map(function (recommendation) { return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 border rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between mb-3", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium", children: recommendation.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mt-1", children: recommendation.description })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "text-xs ".concat(getPriorityColor(recommendation.priority)), children: recommendation.priority === 'high' ? 'عالي' : recommendation.priority === 'medium' ? 'متوسط' : 'منخفض' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: "\u0627\u0644\u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0645\u062A\u0648\u0642\u0639:" }), (0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: recommendation.estimatedImpact })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: "\u0648\u0642\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630:" }), (0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: recommendation.implementationTime })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: "\u0627\u0644\u062A\u0643\u0644\u0641\u0629:" }), (0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: recommendation.cost })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: "\u0627\u0644\u0641\u0626\u0629:" }), (0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: recommendation.category })] })] })] }, recommendation.id)); }) }) })] }), showAdvancedMetrics && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u062A\u0641\u0627\u0639\u0644\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-blue-600", children: [data.userInteractions.sessionDuration, " \u062F"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u062A\u0648\u0633\u0637 \u0645\u062F\u0629 \u0627\u0644\u062C\u0644\u0633\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: data.userInteractions.clicksPerSession }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0646\u0642\u0631\u0627\u062A \u0644\u0643\u0644 \u062C\u0644\u0633\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-purple-600", children: [data.userInteractions.efficiencyScore, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u0643\u0641\u0627\u0621\u0629" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-medium mb-4", children: "\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: data.userInteractions.deviceTypes.map(function (device, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: device.type }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: "text-xs ".concat(getTrendColor(device.trend)), children: [getTrendIcon(device.trend), device.trend === 'up' ? 'زيادة' : device.trend === 'down' ? 'انخفاض' : 'مستقر'] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-gray-600", children: [device.percentage, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "w-20 bg-gray-200 rounded-full h-2", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-blue-600 h-2 rounded-full", style: { 'width': "".concat(device.percentage, "%") } }) })] })] }, index)); }) })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0627\u062A\u062C\u0627\u0647\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621" })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-blue-600", children: [data.trends.performanceMetrics.responseTime, "s"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0648\u0642\u062A \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-green-600", children: [data.trends.performanceMetrics.accuracy, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u062F\u0642\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-purple-600", children: [data.trends.performanceMetrics.userSatisfaction, "/5"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0631\u0636\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-orange-600", children: getSystemHealthIcon(data.trends.performanceMetrics.systemHealth) }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0635\u062D\u0629 \u0627\u0644\u0646\u0638\u0627\u0645" })] })] }) })] })] }))] }));
}
