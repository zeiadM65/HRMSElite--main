"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRole = exports.getDashboardRouteWithCompany = exports.buildRoute = exports.getDashboardRoute = exports.routes = void 0;
// تعريف المسارات الموحدة للتطبيق
exports.routes = {
    // المسارات العامة
    'public': {
        'home': '/',
        'login': '/login'
    },
    // مسارات لوحة التحكم حسب الدور
    'dashboard': {
        'super_admin': '/dashboard/super-admin',
        'company_manager': '/dashboard/company-manager',
        'employee': '/dashboard/employee',
        'supervisor': '/dashboard/supervisor',
        'worker': '/dashboard/worker'
    },
    // المسارات الوظيفية
    'functional': {
        'companies': '/companies',
        'company_details': '/company-details',
        'employees': '/employees',
        'reports': '/reports',
        'settings': '/settings',
        'accounting_systems': '/accounting-systems',
        'government_forms': '/government-forms',
        'attendance': '/attendance',
        'leave_requests': '/leave-requests',
        'payroll': '/payroll',
        'documents': '/documents',
        'training': '/training',
        'recruitment': '/recruitment',
        'performance': '/performance',
        'advanced_search': '/advanced-search',
        'ai_dashboard': '/ai-dashboard',
        'licenses': '/licenses',
        'leaves': '/leaves',
        'signatures': '/signatures',
        'signature_test': '/signature-test',
        'permission_test': '/permission-test',
        'role_based_dashboard': '/role-based-dashboard',
        'super_admin_dashboard': '/super-admin-dashboard',
        'employee_management': '/employee-management',
        'layout_example': '/layout-example'
    },
    // المسارات المتقدمة
    'advanced': {
        'ai_analytics': '/ai-analytics',
        'project_management': '/project-management',
        'assets_management': '/assets-management',
        'permissions_management': '/permissions-management',
        'mobile_apps': '/mobile-apps'
    },
    // مسارات AI
    'ai': {
        'chatbot': '/ai-chatbot',
        'analytics': '/ai-analytics',
        'dashboard': '/ai-dashboard'
    }
};
// دالة للحصول على مسار لوحة التحكم حسب الدور
var getDashboardRoute = function (role) {
    var _a;
    var roleMap = {
        'super_admin': exports.routes.dashboard.super_admin,
        'company_manager': exports.routes.dashboard.company_manager,
        'employee': exports.routes.dashboard.employee,
        'supervisor': exports.routes.dashboard.supervisor,
        'worker': exports.routes.dashboard.worker
    };
    return (_a = roleMap[role]) !== null && _a !== void 0 ? _a : exports.routes.dashboard.worker;
};
exports.getDashboardRoute = getDashboardRoute;
// دالة لبناء مسار مع معاملات
var buildRoute = function (baseRoute, params) {
    if (!params) {
        return baseRoute;
    }
    var queryString = Object.entries(params)
        .filter(function (_a) {
        var value = _a[1];
        return value !== '';
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
    })
        .join('&');
    return queryString ? "".concat(baseRoute, "?").concat(queryString) : baseRoute;
};
exports.buildRoute = buildRoute;
// دالة للحصول على مسار لوحة التحكم مع معاملات الشركة
var getDashboardRouteWithCompany = function (role, companyId, companyName) {
    var baseRoute = (0, exports.getDashboardRoute)(role);
    var params = {};
    if (companyId) {
        params.company = companyId;
    }
    if (companyName) {
        params.name = companyName;
    }
    return (0, exports.buildRoute)(baseRoute, params);
};
exports.getDashboardRouteWithCompany = getDashboardRouteWithCompany;
// التحقق من صحة الدور
var isValidRole = function (role) {
    return ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'].includes(role);
};
exports.isValidRole = isValidRole;
