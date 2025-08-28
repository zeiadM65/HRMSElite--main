"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = exports.PERMISSIONS = exports.USER_ROLES = exports.AuthUtils = exports.AUTH_ENDPOINTS = void 0;
exports.isUnauthorizedError = isUnauthorizedError;
exports.hasPermission = hasPermission;
exports.hasAnyPermission = hasAnyPermission;
exports.getRoleDisplayName = getRoleDisplayName;
exports.getPermissionDisplayName = getPermissionDisplayName;
var i18n_1 = __importDefault(require("./i18n"));
function isUnauthorizedError(error) {
    return (/^401: .*Unauthorized/).test(error.message);
}
// Unified Authentication Endpoints
exports.AUTH_ENDPOINTS = {
    // Main unified user endpoint - this is the primary endpoint for all user operations
    'USER': '/api/auth/user',
    // Authentication endpoints
    'LOGIN': '/api/auth/login',
    'LOGOUT': '/api/auth/logout',
    'CURRENT_USER': '/api/auth/user', // Redirects to unified endpoint
    // Session management
    'SESSION': '/api/auth/session',
    'REFRESH': '/api/auth/refresh',
    // Password management
    'CHANGE_PASSWORD': '/api/auth/change-password',
    'RESET_PASSWORD': '/api/auth/reset-password',
    'FORGOT_PASSWORD': '/api/auth/forgot-password',
    // User management
    'REGISTER': '/api/auth/register',
    'UPDATE_PROFILE': '/api/auth/update-profile',
    'VERIFY_EMAIL': '/api/auth/verify-email',
    // Company-specific endpoints
    'USER_COMPANIES': '/api/auth/user/companies',
    'SWITCH_COMPANY': '/api/auth/switch-company',
    // Permissions and roles
    'USER_PERMISSIONS': '/api/auth/user/permissions',
    'USER_ROLES': '/api/auth/user/roles'
};
// -------------------------
// Internal type helpers
// -------------------------
function isPlainRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function asString(value, fallback) {
    if (fallback === void 0) { fallback = ''; }
    return typeof value === 'string' ? value : fallback;
}
function asOptionalString(value) {
    return typeof value === 'string' ? value : undefined;
}
function asBoolean(value, fallback) {
    if (fallback === void 0) { fallback = false; }
    return typeof value === 'boolean' ? value : fallback;
}
function asNumber(value, fallback) {
    if (fallback === void 0) { fallback = 0; }
    return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}
function asStringArray(value) {
    return Array.isArray(value) ? value.filter(function (v) { return typeof v === 'string'; }) : [];
}
function isUserRoleValue(value) {
    return (value === exports.USER_ROLES.SUPER_ADMIN ||
        value === exports.USER_ROLES.COMPANY_MANAGER ||
        value === exports.USER_ROLES.ADMINISTRATIVE_EMPLOYEE ||
        value === exports.USER_ROLES.SUPERVISOR ||
        value === exports.USER_ROLES.WORKER);
}
function asUserRole(value, fallback) {
    if (fallback === void 0) { fallback = exports.USER_ROLES.WORKER; }
    return isUserRoleValue(value) ? value : fallback;
}
function isCompanyStatus(value) {
    return value === 'active' || value === 'inactive' || value === 'pending';
}
function asClaims(value) {
    return isPlainRecord(value) ? value : null;
}
function isoDateOrNow(value) {
    return typeof value === 'string' ? value : new Date().toISOString();
}
function asCompany(value) {
    var _a;
    if (!isPlainRecord(value))
        return null;
    var status = isCompanyStatus(value.status) ? value.status : 'active';
    return {
        id: asString(value.id),
        name: asString(value.name),
        commercialFileName: asString(value.commercialFileName),
        department: asString(value.department),
        classification: asString(value.classification),
        status: status,
        employeeCount: asNumber(value.employeeCount, 0),
        industry: asString(value.industry),
        establishmentDate: isoDateOrNow(value.establishmentDate),
        userRole: asUserRole(value.userRole),
        userPermissions: asStringArray(value.userPermissions),
        logoUrl: (_a = asOptionalString(value.logoUrl)) !== null && _a !== void 0 ? _a : undefined
    };
}
function asCompanies(value) {
    if (!Array.isArray(value))
        return [];
    return value.map(asCompany).filter(function (c) { return c !== null; });
}
// Unified authentication utilities
var AuthUtils = /** @class */ (function () {
    function AuthUtils() {
    }
    /**
     * Get the unified user endpoint with optional company context
     * This is the primary method for all user-related operations
     */
    AuthUtils.getUserEndpoint = function (companyId) {
        return companyId ? "".concat(exports.AUTH_ENDPOINTS.USER, "?companyId=").concat(companyId) : exports.AUTH_ENDPOINTS.USER;
    };
    /**
     * Check if user has specific permission
     */
    AuthUtils.hasPermission = function (userPermissions, permission) {
        if (userPermissions === void 0) { userPermissions = []; }
        return userPermissions.includes(permission);
    };
    /**
     * Check if user has unknown of the specified permissions
     */
    AuthUtils.hasAnyPermission = function (userPermissions, permissions) {
        if (userPermissions === void 0) { userPermissions = []; }
        return permissions.some(function (permission) { return userPermissions.includes(permission); });
    };
    /**
     * Check if user has all specified permissions
     */
    AuthUtils.hasAllPermissions = function (userPermissions, permissions) {
        if (userPermissions === void 0) { userPermissions = []; }
        return permissions.every(function (permission) { return userPermissions.includes(permission); });
    };
    /**
     * Get user's role display name
     */
    AuthUtils.getRoleDisplayName = function (role) {
        return getRoleDisplayName(role);
    };
    /**
     * Get permission display name
     */
    AuthUtils.getPermissionDisplayName = function (permission) {
        return getPermissionDisplayName(permission);
    };
    /**
     * Validate authentication state
     */
    AuthUtils.validateAuthState = function (state) {
        return state.isAuthenticated &&
            state.user !== null &&
            state.user.isActive &&
            state.currentCompany !== null;
    };
    /**
     * Get user's effective permissions for current company
     */
    AuthUtils.getEffectivePermissions = function (user, companyId) {
        var _a;
        if (!companyId) {
            return user.permissions;
        }
        var company = user.companies.find(function (c) { return c.id === companyId; });
        return (_a = company === null || company === void 0 ? void 0 : company.userPermissions) !== null && _a !== void 0 ? _a : user.permissions;
    };
    /**
     * Check if user can access specific company
     */
    AuthUtils.canAccessCompany = function (user, companyId) {
        return user.companies.some(function (company) { return company.id === companyId; });
    };
    /**
     * Get user's role for specific company
     */
    AuthUtils.getUserRoleForCompany = function (user, companyId) {
        var _a;
        var company = user.companies.find(function (c) { return c.id === companyId; });
        return (_a = company === null || company === void 0 ? void 0 : company.userRole) !== null && _a !== void 0 ? _a : null;
    };
    /**
     * Create unified user object from various sources
     */
    AuthUtils.createUnifiedUser = function (userData) {
        var _a, _b, _c, _d;
        var data = userData;
        return {
            id: asString(data.id),
            email: asString(data.email),
            firstName: asString(data.firstName),
            lastName: asString(data.lastName),
            role: asUserRole(data.role),
            companies: asCompanies(data.companies),
            permissions: asStringArray(data.permissions),
            companyId: (_a = asOptionalString(data.companyId)) !== null && _a !== void 0 ? _a : undefined,
            createdAt: isoDateOrNow(data.createdAt),
            updatedAt: isoDateOrNow(data.updatedAt),
            lastLoginAt: (_b = asOptionalString(data.lastLoginAt)) !== null && _b !== void 0 ? _b : undefined,
            isActive: asBoolean(data.isActive, true),
            emailVerified: asBoolean(data.emailVerified, false),
            profileImageUrl: (_c = asOptionalString(data.profileImageUrl)) !== null && _c !== void 0 ? _c : undefined,
            sub: asString((_d = data.sub) !== null && _d !== void 0 ? _d : data.id),
            claims: asClaims(data.claims)
        };
    };
    /**
     * Validate user data structure
     */
    AuthUtils.isValidUser = function (user) {
        if (!isPlainRecord(user))
            return false;
        var hasStrings = typeof user.id === 'string' &&
            typeof user.email === 'string' &&
            typeof user.firstName === 'string' &&
            typeof user.lastName === 'string';
        var roleValid = isUserRoleValue(user.role);
        var companiesValid = Array.isArray(user.companies);
        var permissionsValid = Array.isArray(user.permissions) &&
            user.permissions.every(function (v) { return typeof v === 'string'; });
        return hasStrings && roleValid && companiesValid && permissionsValid;
    };
    /**
     * Get current company from user data
     */
    AuthUtils.getCurrentCompany = function (user, companyId) {
        var _a, _b, _c;
        if (!companyId) {
            return (_b = (_a = user.companies.find(function (c) { return c.id === user.companyId; })) !== null && _a !== void 0 ? _a : user.companies[0]) !== null && _b !== void 0 ? _b : null;
        }
        return (_c = user.companies.find(function (c) { return c.id === companyId; })) !== null && _c !== void 0 ? _c : null;
    };
    /**
     * Check if user is super admin
     */
    AuthUtils.isSuperAdmin = function (user) {
        return user.role === exports.USER_ROLES.SUPER_ADMIN;
    };
    /**
     * Check if user is company manager
     */
    AuthUtils.isCompanyManager = function (user) {
        return user.role === exports.USER_ROLES.COMPANY_MANAGER;
    };
    /**
     * Get user's full name
     */
    AuthUtils.getUserFullName = function (user) {
        return "".concat(user.firstName, " ").concat(user.lastName).trim();
    };
    /**
     * Check if user has company-specific permissions
     */
    AuthUtils.hasCompanyPermission = function (user, companyId, permission) {
        var company = user.companies.find(function (c) { return c.id === companyId; });
        if (!company) {
            return false;
        }
        return company.userPermissions.includes(permission);
    };
    return AuthUtils;
}());
exports.AuthUtils = AuthUtils;
exports.USER_ROLES = {
    'SUPER_ADMIN': 'super_admin',
    'COMPANY_MANAGER': 'company_manager',
    'ADMINISTRATIVE_EMPLOYEE': 'administrative_employee',
    'SUPERVISOR': 'supervisor',
    'WORKER': 'worker'
};
exports.PERMISSIONS = {
    // HR Permissions
    'MANAGE_EMPLOYEES': 'manage_employees',
    'VIEW_EMPLOYEES': 'view_employees',
    'MANAGE_LEAVE_REQUESTS': 'manage_leave_requests',
    'VIEW_LEAVE_REQUESTS': 'view_leave_requests',
    // Accounting Permissions
    'MANAGE_PAYROLL': 'manage_payroll',
    'VIEW_PAYROLL': 'view_payroll',
    'MANAGE_FINANCES': 'manage_finances',
    'VIEW_FINANCES': 'view_finances',
    // Inventory Permissions
    'MANAGE_INVENTORY': 'manage_inventory',
    'VIEW_INVENTORY': 'view_inventory',
    'MANAGE_ASSETS': 'manage_assets',
    'VIEW_ASSETS': 'view_assets',
    // Reports Permissions
    'GENERATE_REPORTS': 'generate_reports',
    'VIEW_REPORTS': 'view_reports',
    'EXPORT_DATA': 'export_data',
    // Purchasing Permissions
    'MANAGE_PURCHASES': 'manage_purchases',
    'VIEW_PURCHASES': 'view_purchases',
    'APPROVE_PURCHASES': 'approve_purchases',
    // System Permissions
    'MANAGE_COMPANY': 'manage_company',
    'MANAGE_PERMISSIONS': 'manage_permissions',
    'SYSTEM_ADMIN': 'system_admin'
};
exports.ROLE_PERMISSIONS = (_a = {},
    _a[exports.USER_ROLES.SUPER_ADMIN] = Object.values(exports.PERMISSIONS),
    _a[exports.USER_ROLES.COMPANY_MANAGER] = [
        exports.PERMISSIONS.MANAGE_EMPLOYEES,
        exports.PERMISSIONS.VIEW_EMPLOYEES,
        exports.PERMISSIONS.MANAGE_LEAVE_REQUESTS,
        exports.PERMISSIONS.VIEW_LEAVE_REQUESTS,
        exports.PERMISSIONS.MANAGE_PAYROLL,
        exports.PERMISSIONS.VIEW_PAYROLL,
        exports.PERMISSIONS.MANAGE_FINANCES,
        exports.PERMISSIONS.VIEW_FINANCES,
        exports.PERMISSIONS.GENERATE_REPORTS,
        exports.PERMISSIONS.VIEW_REPORTS,
        exports.PERMISSIONS.EXPORT_DATA,
        exports.PERMISSIONS.MANAGE_COMPANY,
        exports.PERMISSIONS.MANAGE_PERMISSIONS
    ],
    _a[exports.USER_ROLES.ADMINISTRATIVE_EMPLOYEE] = [
        // Permissions are customizable by company manager
        exports.PERMISSIONS.VIEW_EMPLOYEES,
        exports.PERMISSIONS.VIEW_LEAVE_REQUESTS,
        exports.PERMISSIONS.VIEW_REPORTS
    ],
    _a[exports.USER_ROLES.SUPERVISOR] = [
        exports.PERMISSIONS.VIEW_EMPLOYEES,
        exports.PERMISSIONS.VIEW_LEAVE_REQUESTS,
        exports.PERMISSIONS.VIEW_REPORTS
    ],
    _a[exports.USER_ROLES.WORKER] = [
        exports.PERMISSIONS.VIEW_LEAVE_REQUESTS // Only their own
    ],
    _a);
function hasPermission(userPermissions, permission) {
    if (userPermissions === void 0) { userPermissions = []; }
    return userPermissions.includes(permission);
}
function hasAnyPermission(userPermissions, permissions) {
    if (userPermissions === void 0) { userPermissions = []; }
    return permissions.some(function (permission) { return userPermissions.includes(permission); });
}
function getRoleDisplayName(role) {
    var _a;
    var _b;
    var roleKeys = (_a = {},
        _a[exports.USER_ROLES.SUPER_ADMIN] = 'roles.labels.super_admin',
        _a[exports.USER_ROLES.COMPANY_MANAGER] = 'roles.labels.company_manager',
        _a[exports.USER_ROLES.ADMINISTRATIVE_EMPLOYEE] = 'roles.labels.employee',
        _a[exports.USER_ROLES.SUPERVISOR] = 'roles.labels.supervisor',
        _a[exports.USER_ROLES.WORKER] = 'roles.labels.worker',
        _a);
    return i18n_1.default.t((_b = roleKeys[role]) !== null && _b !== void 0 ? _b : 'roles.labels.undefined');
}
function getPermissionDisplayName(permission) {
    var _a;
    var _b;
    var permissionKeys = (_a = {},
        _a[exports.PERMISSIONS.MANAGE_EMPLOYEES] = 'permissions.manage_employees',
        _a[exports.PERMISSIONS.VIEW_EMPLOYEES] = 'permissions.view_employees',
        _a[exports.PERMISSIONS.MANAGE_LEAVE_REQUESTS] = 'permissions.manage_leave_requests',
        _a[exports.PERMISSIONS.VIEW_LEAVE_REQUESTS] = 'permissions.view_leave_requests',
        _a[exports.PERMISSIONS.MANAGE_PAYROLL] = 'permissions.manage_payroll',
        _a[exports.PERMISSIONS.VIEW_PAYROLL] = 'permissions.view_payroll',
        _a[exports.PERMISSIONS.MANAGE_FINANCES] = 'permissions.manage_finances',
        _a[exports.PERMISSIONS.VIEW_FINANCES] = 'permissions.view_finances',
        _a[exports.PERMISSIONS.MANAGE_INVENTORY] = 'permissions.manage_inventory',
        _a[exports.PERMISSIONS.VIEW_INVENTORY] = 'permissions.view_inventory',
        _a[exports.PERMISSIONS.MANAGE_ASSETS] = 'permissions.manage_assets',
        _a[exports.PERMISSIONS.VIEW_ASSETS] = 'permissions.view_assets',
        _a[exports.PERMISSIONS.GENERATE_REPORTS] = 'permissions.generate_reports',
        _a[exports.PERMISSIONS.VIEW_REPORTS] = 'permissions.view_reports',
        _a[exports.PERMISSIONS.EXPORT_DATA] = 'permissions.export_data',
        _a[exports.PERMISSIONS.MANAGE_PURCHASES] = 'permissions.manage_purchases',
        _a[exports.PERMISSIONS.VIEW_PURCHASES] = 'permissions.view_purchases',
        _a[exports.PERMISSIONS.APPROVE_PURCHASES] = 'permissions.approve_purchases',
        _a[exports.PERMISSIONS.MANAGE_COMPANY] = 'permissions.manage_company',
        _a[exports.PERMISSIONS.MANAGE_PERMISSIONS] = 'permissions.manage_permissions',
        _a[exports.PERMISSIONS.SYSTEM_ADMIN] = 'permissions.system_admin',
        _a);
    return i18n_1.default.t((_b = permissionKeys[permission]) !== null && _b !== void 0 ? _b : permission);
}
