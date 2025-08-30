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
exports.default = QualityDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var progress_1 = require("@/components/ui/progress");
var alert_1 = require("@/components/ui/alert");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/hooks/use-toast");
var logger_1 = __importDefault(require("../../lib/logger"));
function QualityDashboard(_a) {
    var _this = this;
    var className = _a.className;
    var _b = (0, react_1.useState)(null), metrics = _b[0], setMetrics = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), lastUpdated = _d[0], setLastUpdated = _d[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var fetchQualityMetrics = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, rawData, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, fetch('/api/quality-metrics', { 'credentials': 'include' })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    rawData = _a.sent();
                    // Validate and type the response data
                    if (rawData && typeof rawData === 'object' && 'overall' in rawData) {
                        data = rawData;
                        setMetrics(data);
                        setLastUpdated(new Date());
                        toast({
                            'title': 'Quality metrics updated',
                            'description': 'Latest quality data has been loaded successfully.'
                        });
                    }
                    else {
                        throw new Error('Invalid quality metrics data structure');
                    }
                    return [3 /*break*/, 5];
                case 4: throw new Error('Failed to fetch quality metrics');
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    logger_1.default.error('Error fetching quality metrics:', error_1);
                    toast({
                        'title': 'Error',
                        'description': 'Failed to load quality metrics. Please try again.',
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchQualityMetrics();
    }, []);
    var getStatusIcon = function (status) {
        switch (status) {
            case 'pass':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4 text-green-500" });
            case 'fail':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-4 w-4 text-red-500" });
            case 'error':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4 text-yellow-500" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4 text-gray-500" });
        }
    };
    var getStatusColor = function (status) {
        switch (status) {
            case 'pass':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'fail':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'error':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    var getScoreColor = function (score) {
        if (score >= 80) {
            return 'text-green-600';
        }
        if (score >= 60) {
            return 'text-yellow-600';
        }
        if (score >= 40) {
            return 'text-orange-600';
        }
        return 'text-red-600';
    };
    if (!metrics) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4 ".concat(className), children: (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "flex items-center justify-center h-32", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "Loading quality metrics..." })] }) }) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 ".concat(className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold tracking-tight", children: "Quality Monitor" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "Comprehensive code quality and performance metrics" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [lastUpdated && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted-foreground", children: ["Last updated: ", lastUpdated.toLocaleTimeString()] })), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: fetchQualityMetrics, disabled: loading, variant: "outline", size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-4 w-4 mr-2 ".concat(loading ? 'animate-spin' : '') }), "Refresh"] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: ["Overall Quality Score", (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: getStatusColor(metrics.overall.status), children: metrics.overall.status })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: "Quality Score" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-2xl font-bold ".concat(getScoreColor(metrics.overall.score)), children: [metrics.overall.score, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.overall.score, className: "h-2" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: "ESLint:" }), (0, jsx_runtime_1.jsxs)("span", { className: "ml-2 font-medium", children: [metrics.eslint.errors, " errors, ", metrics.eslint.warnings, " warnings"] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: "TypeScript:" }), (0, jsx_runtime_1.jsxs)("span", { className: "ml-2 font-medium", children: [metrics.typescript.errors, " errors, ", metrics.typescript.warnings, " warnings"] })] })] })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg", children: [getStatusIcon(metrics.eslint.status), "ESLint", (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: getStatusColor(metrics.eslint.status), children: metrics.eslint.status })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Errors" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium ".concat(metrics.eslint.errors > 0 ? 'text-red-600' : 'text-green-600'), children: metrics.eslint.errors })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Warnings" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium ".concat(metrics.eslint.warnings > 0 ? 'text-yellow-600' : 'text-green-600'), children: metrics.eslint.warnings })] }), metrics.eslint.errors > 0 && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", children: (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, { children: ["ESLint found ", metrics.eslint.errors, " error(s) that need to be fixed."] }) }))] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg", children: [getStatusIcon(metrics.typescript.status), "TypeScript", (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: getStatusColor(metrics.typescript.status), children: metrics.typescript.status })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Errors" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium ".concat(metrics.typescript.errors > 0 ? 'text-red-600' : 'text-green-600'), children: metrics.typescript.errors })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Warnings" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium ".concat(metrics.typescript.warnings > 0 ? 'text-yellow-600' : 'text-green-600'), children: metrics.typescript.warnings })] }), metrics.typescript.errors > 0 && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", children: (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, { children: ["TypeScript found ", metrics.typescript.errors, " error(s) that need to be fixed."] }) }))] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg", children: [getStatusIcon(metrics.lighthouse.status), "Lighthouse", (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: getStatusColor(metrics.lighthouse.status), children: metrics.lighthouse.status })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Performance" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium ".concat(metrics.lighthouse.performance >= 90 ? 'text-green-600' : metrics.lighthouse.performance >= 70 ? 'text-yellow-600' : 'text-red-600'), children: [metrics.lighthouse.performance, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.lighthouse.performance, className: "h-1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Accessibility" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium ".concat(metrics.lighthouse.accessibility >= 90 ? 'text-green-600' : metrics.lighthouse.accessibility >= 70 ? 'text-yellow-600' : 'text-red-600'), children: [metrics.lighthouse.accessibility, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.lighthouse.accessibility, className: "h-1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Best Practices" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium ".concat(metrics.lighthouse.bestPractices >= 90 ? 'text-green-600' : metrics.lighthouse.bestPractices >= 70 ? 'text-yellow-600' : 'text-red-600'), children: [metrics.lighthouse.bestPractices, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.lighthouse.bestPractices, className: "h-1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "SEO" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium ".concat(metrics.lighthouse.seo >= 90 ? 'text-green-600' : metrics.lighthouse.seo >= 70 ? 'text-yellow-600' : 'text-red-600'), children: [metrics.lighthouse.seo, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.lighthouse.seo, className: "h-1" })] })] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2 text-lg", children: [getStatusIcon(metrics.coverage.status), "Test Coverage", (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: getStatusColor(metrics.coverage.status), children: metrics.coverage.status })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Lines" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium ".concat(metrics.coverage.lines >= 80 ? 'text-green-600' : metrics.coverage.lines >= 60 ? 'text-yellow-600' : 'text-red-600'), children: [metrics.coverage.lines, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.coverage.lines, className: "h-1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Functions" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium ".concat(metrics.coverage.functions >= 80 ? 'text-green-600' : metrics.coverage.functions >= 60 ? 'text-yellow-600' : 'text-red-600'), children: [metrics.coverage.functions, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.coverage.functions, className: "h-1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Branches" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium ".concat(metrics.coverage.branches >= 80 ? 'text-green-600' : metrics.coverage.branches >= 60 ? 'text-yellow-600' : 'text-red-600'), children: [metrics.coverage.branches, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.coverage.branches, className: "h-1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Statements" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium ".concat(metrics.coverage.statements >= 80 ? 'text-green-600' : metrics.coverage.statements >= 60 ? 'text-yellow-600' : 'text-red-600'), children: [metrics.coverage.statements, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: metrics.coverage.statements, className: "h-1" })] })] }) })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "Quality Recommendations" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [metrics.eslint.errors > 0 && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, { children: ["Fix ", metrics.eslint.errors, " ESLint error(s) to improve code quality."] })] })), metrics.typescript.errors > 0 && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, { children: ["Fix ", metrics.typescript.errors, " TypeScript error(s) to ensure type safety."] })] })), metrics.lighthouse.performance < 90 && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: "Optimize performance to reach 90%+ Lighthouse score." })] })), metrics.coverage.lines < 80 && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: "Increase test coverage to reach 80%+ line coverage." })] })), metrics.overall.score >= 80 && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: "Excellent! Your code quality is in great shape. Keep up the good work!" })] }))] }) })] })] }));
}
