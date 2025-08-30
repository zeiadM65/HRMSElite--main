"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canDemote = exports.canPromote = exports.getRoleLevel = exports.getRoleDescription = exports.getRoleLabel = exports.getAccessiblePages = exports.hasAllPermissions = exports.hasAnyPermission = exports.getRolePermissions = exports.canAccessPage = exports.hasPermission = exports.pagePermissions = exports.rolePermissions = void 0;
var i18n_1 = __importDefault(require("./i18n"));
// Permission map for each role
exports.rolePermissions = {
    'super_admin': [
        'dashboard:view',
        'companies:view',
        'companies:create',
        'companies:edit',
        'companies:delete',
        'employees:view',
        'employees:create',
        'employees:edit',
        'employees:delete',
        'reports:view',
        'reports:create',
        'reports:export',
        'settings:view',
        'settings:edit',
        'attendance:view',
        'attendance:edit',
        'leave_requests:view',
        'leave_requests:approve',
        'leave_requests:create',
        'payroll:view',
        'payroll:edit',
        'payroll:process',
        'documents:view',
        'documents:upload',
        'documents:delete',
        'training:view',
        'training:create',
        'training:assign',
        'recruitment:view',
        'recruitment:create',
        'recruitment:approve',
        'performance:view',
        'performance:edit',
        'advanced_search:view',
        'ai_dashboard:view',
        'accounting_systems:view',
        'accounting_systems:edit',
        'government_forms:view',
        'government_forms:submit'
    ],
    'company_manager': [
        'dashboard:view',
        'employees:view',
        'employees:create',
        'employees:edit',
        'employees:delete',
        'reports:view',
        'reports:create',
        'reports:export',
        'settings:view',
        'attendance:view',
        'attendance:edit',
        'leave_requests:view',
        'leave_requests:approve',
        'leave_requests:create',
        'payroll:view',
        'payroll:edit',
        'payroll:process',
        'documents:view',
        'documents:upload',
        'documents:delete',
        'training:view',
        'training:create',
        'training:assign',
        'recruitment:view',
        'recruitment:create',
        'recruitment:approve',
        'performance:view',
        'performance:edit',
        'advanced_search:view',
        'ai_dashboard:view',
        'accounting_systems:view',
        'government_forms:view',
        'government_forms:submit'
    ],
    'employee': [
        'dashboard:view',
        'employees:view',
        'reports:view',
        'attendance:view',
        'leave_requests:view',
        'leave_requests:create',
        'payroll:view',
        'documents:view',
        'documents:upload',
        'training:view',
        'performance:view',
        'advanced_search:view',
        'ai_dashboard:view',
        'government_forms:view',
        'government_forms:submit'
    ],
    'supervisor': [
        'dashboard:view',
        'employees:view',
        'reports:view',
        'attendance:view',
        'attendance:edit',
        'leave_requests:view',
        'leave_requests:approve',
        'leave_requests:create',
        'payroll:view',
        'documents:view',
        'documents:upload',
        'training:view',
        'performance:view',
        'performance:edit',
        'advanced_search:view',
        'ai_dashboard:view',
        'government_forms:view'
    ],
    'worker': [
        'dashboard:view',
        'attendance:view',
        'leave_requests:view',
        'leave_requests:create',
        'payroll:view',
        'documents:view',
        'training:view',
        'performance:view',
        'government_forms:view'
    ]
};
// Map of pages and required permissions
exports.pagePermissions = {
    'dashboard': ['dashboard:view'],
    'companies': ['companies:view'],
    'employees': ['employees:view'],
    'reports': ['reports:view'],
    'settings': ['settings:view'],
    'attendance': ['attendance:view'],
    'leave-requests': ['leave_requests:view'],
    'payroll': ['payroll:view'],
    'documents': ['documents:view'],
    'training': ['training:view'],
    'recruitment': ['recruitment:view'],
    'performance': ['performance:view'],
    'advanced-search': ['advanced_search:view'],
    'ai-dashboard': ['ai_dashboard:view'],
    'ai_analytics': ['ai_dashboard:view'],
    'accounting-systems': ['accounting_systems:view'],
    'government-forms': ['government_forms:view'],
    'licenses': ['documents:view'],
    'leaves': ['leave_requests:view'],
    'signatures': ['documents:view'],
    'signature-test': ['documents:view'],
    'permission-test': ['settings:view'],
    'role-based-dashboard': ['dashboard:view'],
    'super-admin-dashboard': ['dashboard:view'],
    'employee-management': ['employees:view'],
    'layout-example': ['settings:view'],
    'project-management': ['settings:view'],
    'assets-management': ['settings:view'],
    'permissions-management': ['settings:view'],
    'mobile-apps': ['settings:view']
};
// Helper functions for permission checks
var hasPermission = function (userRole, permission) {
    var permissions = exports.rolePermissions[userRole] || [];
    return permissions.includes(permission);
};
exports.hasPermission = hasPermission;
// Verify page permissions
var canAccessPage = function (userRole, pageId) {
    var _a;
    var requiredPermissions = (_a = exports.pagePermissions[pageId]) !== null && _a !== void 0 ? _a : [];
    if (requiredPermissions.length === 0) {
        // If no permissions defined for page, allow all
        return true;
    }
    return requiredPermissions.some(function (permission) { return (0, exports.hasPermission)(userRole, permission); });
};
exports.canAccessPage = canAccessPage;
// Get available permissions for a role
var getRolePermissions = function (userRole) {
    return exports.rolePermissions[userRole] || [];
};
exports.getRolePermissions = getRolePermissions;
// Check for any required permissions
var hasAnyPermission = function (userRole, permissions) {
    return permissions.some(function (permission) { return (0, exports.hasPermission)(userRole, permission); });
};
exports.hasAnyPermission = hasAnyPermission;
// Check for all required permissions
var hasAllPermissions = function (userRole, permissions) {
    return permissions.every(function (permission) { return (0, exports.hasPermission)(userRole, permission); });
};
exports.hasAllPermissions = hasAllPermissions;
// Get accessible pages for a role
var getAccessiblePages = function (userRole) {
    return Object.entries(exports.pagePermissions)
        .filter(function (_a) {
        var _pageId = _a[0], requiredPermissions = _a[1];
        if (requiredPermissions.length === 0) {
            return true;
        }
        return requiredPermissions.some(function (permission) { return (0, exports.hasPermission)(userRole, permission); });
    })
        .map(function (_a) {
        var pageId = _a[0];
        return pageId;
    });
};
exports.getAccessiblePages = getAccessiblePages;
var getRoleLabel = function (role) {
    return i18n_1.default.t("roles.labels.".concat(role), { defaultValue: i18n_1.default.t('roles.labels.undefined') });
};
exports.getRoleLabel = getRoleLabel;
var getRoleDescription = function (role) {
    return i18n_1.default.t("roles.descriptions.".concat(role), { defaultValue: i18n_1.default.t('roles.descriptions.undefined') });
};
exports.getRoleDescription = getRoleDescription;
// Get role level (for sorting)
var getRoleLevel = function (role) {
    var roleLevels = {
        'super_admin': 5,
        'company_manager': 4,
        'employee': 3,
        'supervisor': 2,
        'worker': 1
    };
    return roleLevels[role] || 0;
};
exports.getRoleLevel = getRoleLevel;
// Check if role can be promoted
var canPromote = function (currentRole, targetRole) {
    return (0, exports.getRoleLevel)(targetRole) > (0, exports.getRoleLevel)(currentRole);
};
exports.canPromote = canPromote;
// Check if role can be demoted
var canDemote = function (currentRole, targetRole) {
    return (0, exports.getRoleLevel)(targetRole) < (0, exports.getRoleLevel)(currentRole);
};
exports.canDemote = canDemote;
