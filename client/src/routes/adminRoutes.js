"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var wouter_1 = require("wouter");
var shared_1 = require("../components/shared");
var routes_1 = require("../lib/routes");
var lazy_pages_1 = require("../pages/lazy-pages");
var AdminRoutes = function () { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(wouter_1.Route, { path: routes_1.routes.functional.companies, children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "companies", requiredRole: "super_admin", children: (0, jsx_runtime_1.jsx)(lazy_pages_1.Companies, {}) }) }), (0, jsx_runtime_1.jsx)(wouter_1.Route, { path: routes_1.routes.functional.reports, children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "reports", requiredRole: "company_manager", children: (0, jsx_runtime_1.jsx)(lazy_pages_1.Reports, {}) }) }), (0, jsx_runtime_1.jsx)(wouter_1.Route, { path: routes_1.routes.functional.settings, children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "settings", children: (0, jsx_runtime_1.jsx)(lazy_pages_1.Settings, {}) }) }), (0, jsx_runtime_1.jsx)(wouter_1.Route, { path: routes_1.routes.functional.accounting_systems, children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "accounting-systems", children: (0, jsx_runtime_1.jsx)(lazy_pages_1.AccountingSystems, {}) }) }), (0, jsx_runtime_1.jsx)(wouter_1.Route, { path: routes_1.routes.functional.government_forms, children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "government-forms", children: (0, jsx_runtime_1.jsx)(lazy_pages_1.GovernmentForms, {}) }) })] })); };
exports.default = AdminRoutes;
