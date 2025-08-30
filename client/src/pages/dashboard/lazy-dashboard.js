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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLoadingStates = exports.preloadDashboardComponents = exports.DashboardWrapper = exports.SuperAdminDashboard = exports.RoleBasedDashboard = exports.AIDashboard = exports.DashboardMain = exports.LazySuperAdminDashboard = exports.LazyRoleBasedDashboard = exports.LazyAIDashboard = exports.LazyDashboardMain = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var SuspenseWrapper_1 = __importDefault(require("@/components/optimized/SuspenseWrapper"));
var react_i18next_1 = require("react-i18next");
// Lazy load dashboard components for better performance
exports.LazyDashboardMain = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('../dashboard')); }); });
exports.LazyAIDashboard = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('../ai-dashboard')); }); });
exports.LazyRoleBasedDashboard = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('../role-based-dashboard')); }); });
exports.LazySuperAdminDashboard = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('../super-admin-dashboard')); }); });
var CenteredMessage = function (_a) {
    var message = _a.message;
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: (0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: message }) }));
};
var DashboardMain = function (props) {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: t('dashboard.loadingStates.main'), children: (0, jsx_runtime_1.jsx)(exports.LazyDashboardMain, __assign({}, props)) }));
};
exports.DashboardMain = DashboardMain;
var AIDashboard = function (props) {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: t('dashboard.loadingStates.ai'), children: (0, jsx_runtime_1.jsx)(exports.LazyAIDashboard, __assign({}, props)) }));
};
exports.AIDashboard = AIDashboard;
var RoleBasedDashboard = function (props) {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: t('dashboard.loadingStates.roleBased'), children: (0, jsx_runtime_1.jsx)(exports.LazyRoleBasedDashboard, __assign({}, props)) }));
};
exports.RoleBasedDashboard = RoleBasedDashboard;
var SuperAdminDashboard = function (props) {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: t('dashboard.loadingStates.superAdmin'), children: (0, jsx_runtime_1.jsx)(exports.LazySuperAdminDashboard, __assign({}, props)) }));
};
exports.SuperAdminDashboard = SuperAdminDashboard;
// Dashboard wrapper with role-based loading
var DashboardWrapper = function (_a) {
    var role = _a.role, props = __rest(_a, ["role"]);
    var getDashboardComponent = function () {
        switch (role) {
            case 'super_admin':
                return (0, jsx_runtime_1.jsx)(exports.SuperAdminDashboard, __assign({}, props));
            case 'ai_dashboard':
                return (0, jsx_runtime_1.jsx)(exports.AIDashboard, __assign({}, props));
            case 'role_based':
                return (0, jsx_runtime_1.jsx)(exports.RoleBasedDashboard, __assign({}, props));
            default:
                return (0, jsx_runtime_1.jsx)(exports.DashboardMain, __assign({}, props));
        }
    };
    return getDashboardComponent();
};
exports.DashboardWrapper = DashboardWrapper;
// Preload dashboard components for better UX
var preloadDashboardComponents = function () {
    // Preload main dashboard
    Promise.resolve().then(function () { return __importStar(require('../dashboard')); });
    // Preload AI dashboard
    Promise.resolve().then(function () { return __importStar(require('../ai-dashboard')); });
    // Preload role-based dashboard
    Promise.resolve().then(function () { return __importStar(require('../role-based-dashboard')); });
    // Preload super admin dashboard
    Promise.resolve().then(function () { return __importStar(require('../super-admin-dashboard')); });
};
exports.preloadDashboardComponents = preloadDashboardComponents;
// Dashboard loading states for different scenarios
exports.DashboardLoadingStates = {
    'main': function () {
        var t = (0, react_i18next_1.useTranslation)().t;
        return (0, jsx_runtime_1.jsx)(CenteredMessage, { message: t('dashboard.loadingStates.main') });
    },
    'ai': function () {
        var t = (0, react_i18next_1.useTranslation)().t;
        return (0, jsx_runtime_1.jsx)(CenteredMessage, { message: t('dashboard.loadingStates.ai') });
    },
    'roleBased': function () {
        var t = (0, react_i18next_1.useTranslation)().t;
        return (0, jsx_runtime_1.jsx)(CenteredMessage, { message: t('dashboard.loadingStates.roleBased') });
    },
    'superAdmin': function () {
        var t = (0, react_i18next_1.useTranslation)().t;
        return (0, jsx_runtime_1.jsx)(CenteredMessage, { message: t('dashboard.loadingStates.superAdmin') });
    }
};
