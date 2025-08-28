"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var wouter_1 = require("wouter");
var shared_1 = require("../components/shared");
var routes_1 = require("../lib/routes");
var lazy_pages_1 = require("../pages/lazy-pages");
var DashboardWrapper = function () {
    var role = (0, wouter_1.useParams)().role;
    if (role && ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'].includes(role)) {
        return ((0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "dashboard", requiredRole: role, children: (0, jsx_runtime_1.jsx)(lazy_pages_1.Dashboard, { role: role }) }));
    }
    return ((0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "dashboard", children: (0, jsx_runtime_1.jsx)(lazy_pages_1.Dashboard, {}) }));
};
var dashboardRoles = ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'];
var functionalRoutes = [
    { path: routes_1.routes.functional.employees, pageId: 'employees', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Employees, {}) },
    { path: routes_1.routes.functional.attendance, pageId: 'attendance', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Attendance, {}) },
    { path: routes_1.routes.functional.leave_requests, pageId: 'leave-requests', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.LeaveRequests, {}) },
    { path: routes_1.routes.functional.payroll, pageId: 'payroll', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Payroll, {}) },
    { path: routes_1.routes.functional.documents, pageId: 'documents', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Documents, {}) },
    { path: routes_1.routes.functional.training, pageId: 'training', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Training, {}) },
    { path: routes_1.routes.functional.recruitment, pageId: 'recruitment', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Recruitment, {}) },
    { path: routes_1.routes.functional.performance, pageId: 'performance', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Performance, {}) },
    { path: routes_1.routes.functional.advanced_search, pageId: 'advanced-search', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.AdvancedSearch, {}) },
    { path: routes_1.routes.ai.chatbot, pageId: 'ai_dashboard', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.AIChatbotDemo, {}) },
    { path: routes_1.routes.ai.analytics, pageId: 'ai_analytics', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.AIAnalytics, {}) },
    { path: routes_1.routes.ai.dashboard, pageId: 'ai_dashboard', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.AIChatbotDemo, {}) },
    { path: routes_1.routes.functional.licenses, pageId: 'licenses', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Licenses, {}) },
    { path: routes_1.routes.functional.leaves, pageId: 'leaves', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Leaves, {}) },
    { path: routes_1.routes.functional.signatures, pageId: 'signatures', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.Signatures, {}) },
    { path: routes_1.routes.functional.signature_test, pageId: 'signature-test', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.SignatureTest, {}) },
    { path: routes_1.routes.functional.permission_test, pageId: 'permission-test', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.PermissionTest, {}) },
    { path: routes_1.routes.functional.role_based_dashboard, pageId: 'role-based-dashboard', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.RoleBasedDashboard, {}) },
    { path: routes_1.routes.functional.super_admin_dashboard, pageId: 'super-admin-dashboard', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.SuperAdminDashboard, {}), requiredRole: 'super_admin' },
    { path: routes_1.routes.functional.employee_management, pageId: 'employee-management', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.EmployeeManagement, {}) },
    { path: routes_1.routes.functional.layout_example, pageId: 'layout-example', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.LayoutExample, {}) },
    { path: '/i18n-test', pageId: 'i18n-test', element: (0, jsx_runtime_1.jsx)(lazy_pages_1.I18nTest, {}) },
];
var HrRoutes = function () { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [dashboardRoles.map(function (role) { return ((0, jsx_runtime_1.jsx)(wouter_1.Route, { path: routes_1.routes.dashboard[role], children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "dashboard", requiredRole: role, children: (0, jsx_runtime_1.jsx)(lazy_pages_1.Dashboard, { role: role }) }) }, role)); }), (0, jsx_runtime_1.jsx)(wouter_1.Route, { path: "/dashboard/:role", children: (0, jsx_runtime_1.jsx)(DashboardWrapper, {}) }), (0, jsx_runtime_1.jsx)(wouter_1.Route, { path: "/dashboard", children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: "dashboard", children: (0, jsx_runtime_1.jsx)(lazy_pages_1.Dashboard, {}) }) }), functionalRoutes.map(function (_a) {
            var path = _a.path, pageId = _a.pageId, element = _a.element, requiredRole = _a.requiredRole;
            return ((0, jsx_runtime_1.jsx)(wouter_1.Route, { path: path, children: (0, jsx_runtime_1.jsx)(shared_1.ProtectedRoute, { pageId: pageId, requiredRole: requiredRole, children: element }) }, path));
        })] })); };
exports.default = HrRoutes;
