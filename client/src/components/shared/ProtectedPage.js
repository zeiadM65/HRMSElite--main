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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedPage = ProtectedPage;
exports.ProtectedCompaniesPage = ProtectedCompaniesPage;
exports.ProtectedEmployeesPage = ProtectedEmployeesPage;
exports.ProtectedReportsPage = ProtectedReportsPage;
exports.ProtectedSettingsPage = ProtectedSettingsPage;
exports.ProtectedAttendancePage = ProtectedAttendancePage;
exports.ProtectedLeaveRequestsPage = ProtectedLeaveRequestsPage;
exports.ProtectedPayrollPage = ProtectedPayrollPage;
exports.ProtectedDocumentsPage = ProtectedDocumentsPage;
exports.ProtectedTrainingPage = ProtectedTrainingPage;
exports.ProtectedRecruitmentPage = ProtectedRecruitmentPage;
exports.ProtectedPerformancePage = ProtectedPerformancePage;
exports.ProtectedAdvancedSearchPage = ProtectedAdvancedSearchPage;
exports.ProtectedAIDashboardPage = ProtectedAIDashboardPage;
exports.ProtectedAccountingSystemsPage = ProtectedAccountingSystemsPage;
exports.ProtectedGovernmentFormsPage = ProtectedGovernmentFormsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var ProtectedRoute_1 = require("./ProtectedRoute");
function ProtectedPage(_a) {
    var children = _a.children, pageId = _a.pageId, fallbackPath = _a.fallbackPath, requiredRole = _a.requiredRole;
    // Create props object conditionally to avoid exactOptionalPropertyTypes issues
    var routeProps = {
        pageId: pageId,
        children: children
    };
    if (fallbackPath !== undefined) {
        routeProps.fallbackPath = fallbackPath;
    }
    if (requiredRole !== undefined) {
        routeProps.requiredRole = requiredRole;
    }
    return ((0, jsx_runtime_1.jsx)(ProtectedRoute_1.ProtectedRoute, __assign({}, routeProps)));
}
// مكونات محمية جاهزة للاستخدام
function ProtectedCompaniesPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "companies", children: children });
}
function ProtectedEmployeesPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "employees", children: children });
}
function ProtectedReportsPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "reports", children: children });
}
function ProtectedSettingsPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "settings", children: children });
}
function ProtectedAttendancePage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "attendance", children: children });
}
function ProtectedLeaveRequestsPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "leave-requests", children: children });
}
function ProtectedPayrollPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "payroll", children: children });
}
function ProtectedDocumentsPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "documents", children: children });
}
function ProtectedTrainingPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "training", children: children });
}
function ProtectedRecruitmentPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "recruitment", children: children });
}
function ProtectedPerformancePage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "performance", children: children });
}
function ProtectedAdvancedSearchPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "advanced-search", children: children });
}
function ProtectedAIDashboardPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "ai-dashboard", children: children });
}
function ProtectedAccountingSystemsPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "accounting-systems", children: children });
}
function ProtectedGovernmentFormsPage(_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)(ProtectedPage, { pageId: "government-forms", children: children });
}
