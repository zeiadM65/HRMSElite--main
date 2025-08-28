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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var wouter_1 = require("wouter");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
var useAppStore_1 = require("./stores/useAppStore");
var shared_1 = require("./components/shared");
var ReactQueryDevTools_1 = require("./components/shared/ReactQueryDevTools");
var AccessibilityProvider_1 = require("./components/shared/AccessibilityProvider");
var queryClient_1 = require("./lib/queryClient");
var useLazyLoading_1 = require("./hooks/useLazyLoading");
var useDirection_1 = require("./hooks/useDirection");
var toaster_1 = require("./components/ui/toaster");
var lazy_pages_1 = require("./pages/lazy-pages");
var AuthRoutes = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('./routes/authRoutes')); }); });
var HrRoutes = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('./routes/hrRoutes')); }); });
var AdminRoutes = (0, react_1.lazy)(function () { return Promise.resolve().then(function () { return __importStar(require('./routes/adminRoutes')); }); });
var App = function () {
    var _a;
    var user = (0, useAppStore_1.useAppStore)().user;
    var isAuthenticated = !!user;
    (0, useLazyLoading_1.useRoleBasedPreloading)((_a = user === null || user === void 0 ? void 0 : user.role) !== null && _a !== void 0 ? _a : undefined);
    (0, useDirection_1.useDirection)();
    return ((0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient_1.queryClient, children: (0, jsx_runtime_1.jsxs)(AccessibilityProvider_1.AccessibilityProvider, { children: [(0, jsx_runtime_1.jsxs)(wouter_1.Switch, { children: [(0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", children: "Loading\u2026" }), children: (0, jsx_runtime_1.jsx)(AuthRoutes, {}) }), isAuthenticated && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", children: "Loading\u2026" }), children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "dashboard", children: (0, jsx_runtime_1.jsx)(HrRoutes, {}) }) }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", children: "Loading\u2026" }), children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "dashboard", requiredRole: "company_manager", children: (0, jsx_runtime_1.jsx)(AdminRoutes, {}) }) })] })), (0, jsx_runtime_1.jsx)(wouter_1.Route, { children: (0, jsx_runtime_1.jsx)(lazy_pages_1.NotFound, {}) })] }), (0, jsx_runtime_1.jsx)(ReactQueryDevTools_1.ReactQueryDevTools, { initialIsOpen: false }), (0, jsx_runtime_1.jsx)(toaster_1.Toaster, {})] }) }));
};
exports.default = App;
