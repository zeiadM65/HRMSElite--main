"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var PageHelmet_1 = require("@/components/shared/PageHelmet");
var LoadingFallback_1 = require("@/components/shared/LoadingFallback");
var logger_1 = require("../lib/logger");
var react_query_1 = require("@tanstack/react-query");
var react_i18next_1 = require("react-i18next");
var useDirection_1 = require("@/hooks/useDirection");
// Lazy load dashboard components
var DashboardStats = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('../components/dashboard/DashboardStats')); }); });
var DashboardCharts = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('../components/dashboard/DashboardCharts')); }); });
var DashboardTable = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('../components/dashboard/DashboardTable')); }); });
// Lazy load AI chatbot
var Chatbot = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('@/components/ai/chatbot')); }); });
function Dashboard(_a) {
    var _this = this;
    var _b, _c, _d;
    var _e = _a.role, role = _e === void 0 ? 'admin' : _e;
    var log = (0, logger_1.useLogger)('Dashboard');
    var t = (0, react_i18next_1.useTranslation)().t;
    (0, useDirection_1.useDirection)();
    // Log component mount
    react_1.default.useEffect(function () {
        log.info('Dashboard component mounted', { role: role });
        return function () { return log.info('Dashboard component unmounted'); };
    }, [role]);
    // Fetch dashboard data with React Query
    var _f = (0, react_query_1.useQuery)({
        queryKey: ['dashboard', role],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var response, rawData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.apiRequest('GET', "/api/dashboard/".concat(role));
                        return [4 /*yield*/, fetch("/api/dashboard/".concat(role), { 'credentials': 'include' })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error(t('dashboard.errorMessage'));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        rawData = _a.sent();
                        data = rawData;
                        log.apiResponse('GET', "/api/dashboard/".concat(role), response.status, { success: true, data: data });
                        return [2 /*return*/, data];
                }
            });
        }); },
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000 // 10 minutes
    }), dashboardData = _f.data, isLoading = _f.isLoading, error = _f.error;
    // Log errors
    react_1.default.useEffect(function () {
        if (error) {
            log.error('Dashboard data fetch failed', { 'error': error.message }, error);
        }
    }, [error]);
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(LoadingFallback_1.LoadingFallback, { type: "dashboard", message: t('dashboard.loadingMessage') });
    }
    if (error) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-red-600", children: t('dashboard.errorMessage') }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: t('messages.errorLoadingData') }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return window.location.reload(); }, className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90", children: t('dashboard.retryButton') })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PageHelmet_1.PageHelmet, { title: t('dashboard.pageTitle'), description: t('dashboard.pageDescription'), keywords: t('dashboard.pageKeywords') }), (0, jsx_runtime_1.jsxs)("main", { role: "main", children: [(0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-foreground", children: t('dashboard.heading') }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: t('dashboard.welcome') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-muted-foreground", children: [t('dashboard.role'), ": ", role] })] }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingFallback_1.LoadingFallback, { type: "card", message: t('dashboard.loadingStats') }), children: (0, jsx_runtime_1.jsx)(DashboardStats, { data: (_b = dashboardData === null || dashboardData === void 0 ? void 0 : dashboardData.stats) !== null && _b !== void 0 ? _b : null }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingFallback_1.LoadingFallback, { type: "card", message: t('dashboard.loadingCharts') }), children: (0, jsx_runtime_1.jsx)(DashboardCharts, { data: (_c = dashboardData === null || dashboardData === void 0 ? void 0 : dashboardData.charts) !== null && _c !== void 0 ? _c : null }) }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingFallback_1.LoadingFallback, { type: "table", message: t('dashboard.loadingTable') }), children: (0, jsx_runtime_1.jsx)(DashboardTable, { data: (_d = dashboardData === null || dashboardData === void 0 ? void 0 : dashboardData.table) !== null && _d !== void 0 ? _d : null }) })] })] }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: (0, jsx_runtime_1.jsx)(Chatbot, {}) })] })] }));
}
