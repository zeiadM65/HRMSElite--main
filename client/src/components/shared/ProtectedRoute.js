"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = ProtectedRoute;
exports.PermissionGuard = PermissionGuard;
exports.AnyPermissionGuard = AnyPermissionGuard;
exports.AllPermissionsGuard = AllPermissionsGuard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var wouter_1 = require("wouter");
var useAuth_1 = require("../../hooks/useAuth");
var roles_1 = require("../../lib/roles");
var routes_1 = require("../../lib/routes");
// محول لتوحيد نوع الدور بين `authUtils` و `routes`
var toRoutesUserRole = function (role) {
    return (role === 'administrative_employee' ? 'employee' : role);
};
// محول معاكس لتوحيد نوع الدور القادم من المكونات التي تستخدم أنواع المسارات
var toAuthUserRole = function (role) {
    return (role === 'employee' ? 'administrative_employee' : role);
};
function ProtectedRoute(_a) {
    var children = _a.children, pageId = _a.pageId, fallbackPath = _a.fallbackPath, requiredRole = _a.requiredRole;
    var _b = (0, useAuth_1.useAuth)(), user = _b.user, isAuthenticated = _b.isAuthenticated, loading = _b.loading;
    var _c = (0, wouter_1.useLocation)(), setLocation = _c[1];
    var _d = (0, react_1.useState)(true), isValidating = _d[0], setIsValidating = _d[1];
    (0, react_1.useEffect)(function () {
        // إذا كان التطبيق لا يزال في حالة التحميل، انتظر
        if (loading) {
            return;
        }
        // إذا لم يكن المستخدم مسجل الدخول، توجيه إلى صفحة تسجيل الدخول
        if (!isAuthenticated || !user) {
            setLocation('/login');
            return;
        }
        // التحقق من الدور المطلوب إذا تم تحديده
        if (requiredRole && user.role !== toAuthUserRole(requiredRole)) {
            var defaultFallback = (0, routes_1.getDashboardRoute)(toRoutesUserRole(user.role));
            setLocation(fallbackPath !== null && fallbackPath !== void 0 ? fallbackPath : defaultFallback);
            return;
        }
        // التحقق من صلاحيات الوصول للصفحة
        if (!(0, roles_1.canAccessPage)(toRoutesUserRole(user.role), pageId)) {
            // توجيه إلى لوحة التحكم المناسبة للدور
            var dashboardPath = (0, routes_1.getDashboardRoute)(toRoutesUserRole(user.role));
            setLocation(dashboardPath);
            return;
        }
        // إذا وصلنا هنا، فالمستخدم لديه الصلاحيات المطلوبة
        setIsValidating(false);
    }, [user, isAuthenticated, loading, pageId, requiredRole, fallbackPath, setLocation]);
    // عرض شاشة تحميل أثناء التحقق من الصلاحيات
    if (loading || isValidating) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A..." })] }) }));
    }
    // إذا لم يكن المستخدم مسجل الدخول، لا تعرض المحتوى
    if (!isAuthenticated || !user) {
        return null;
    }
    // التحقق النهائي من الصلاحيات
    if (!(0, roles_1.canAccessPage)(toRoutesUserRole(user.role), pageId)) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-red-600", children: "\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0628\u0627\u0644\u0648\u0635\u0648\u0644" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u0635\u0644\u0627\u062D\u064A\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setLocation((0, routes_1.getDashboardRoute)(toRoutesUserRole(user.role))); }, className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90", children: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645" })] }) }));
    }
    // التحقق من الدور المطلوب
    if (requiredRole && user.role !== toAuthUserRole(requiredRole)) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center min-h-screen", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-red-600", children: "\u062F\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "\u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u062F\u0648\u0631 \u0622\u062E\u0631" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setLocation((0, routes_1.getDashboardRoute)(toRoutesUserRole(user.role))); }, className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90", children: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645" })] }) }));
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
function PermissionGuard(_a) {
    var children = _a.children, permission = _a.permission, fallback = _a.fallback;
    var user = (0, useAuth_1.useAuth)().user;
    if (!user) {
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    // التحقق من الصلاحية
    var hasAccess = (0, roles_1.canAccessPage)(toRoutesUserRole(user.role), permission);
    if (!hasAccess) {
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
function AnyPermissionGuard(_a) {
    var children = _a.children, permissions = _a.permissions, fallback = _a.fallback;
    var user = (0, useAuth_1.useAuth)().user;
    if (!user) {
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    // التحقق من وجود أي من الصلاحيات
    var hasAnyAccess = permissions.some(function (permission) { return (0, roles_1.canAccessPage)(toRoutesUserRole(user.role), permission); });
    if (!hasAnyAccess) {
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
function AllPermissionsGuard(_a) {
    var children = _a.children, permissions = _a.permissions, fallback = _a.fallback;
    var user = (0, useAuth_1.useAuth)().user;
    if (!user) {
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    // التحقق من وجود جميع الصلاحيات
    var hasAllAccess = permissions.every(function (permission) { return (0, roles_1.canAccessPage)(toRoutesUserRole(user.role), permission); });
    if (!hasAllAccess) {
        return fallback !== null && fallback !== void 0 ? fallback : null;
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
