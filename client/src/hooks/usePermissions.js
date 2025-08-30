"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePermissions = void 0;
var useAuth_1 = require("./useAuth");
var roles_1 = require("../lib/roles");
var usePermissions = function () {
    var user = (0, useAuth_1.useAuth)().user;
    // الحصول على الدور الحالي
    var currentRole = user === null || user === void 0 ? void 0 : user.role;
    // التحقق من صلاحية معينة
    var checkPermission = function (permission) {
        if (!currentRole) {
            return false;
        }
        return (0, roles_1.hasPermission)(currentRole, permission);
    };
    // التحقق من إمكانية الوصول لصفحة معينة
    var canAccess = function (pageId) {
        if (!currentRole) {
            return false;
        }
        return (0, roles_1.canAccessPage)(currentRole, pageId);
    };
    // الحصول على جميع الصلاحيات المتاحة للدور الحالي
    var getCurrentRolePermissions = function () {
        if (!currentRole) {
            return [];
        }
        return (0, roles_1.getRolePermissions)(currentRole);
    };
    // التحقق من وجود أي من الصلاحيات المطلوبة
    var checkAnyPermission = function (permissions) {
        if (!currentRole) {
            return false;
        }
        return (0, roles_1.hasAnyPermission)(currentRole, permissions);
    };
    // التحقق من وجود جميع الصلاحيات المطلوبة
    var checkAllPermissions = function (permissions) {
        if (!currentRole) {
            return false;
        }
        return (0, roles_1.hasAllPermissions)(currentRole, permissions);
    };
    // الحصول على الصفحات المتاحة للدور الحالي
    var getAccessiblePagesForCurrentRole = function () {
        if (!currentRole) {
            return [];
        }
        return (0, roles_1.getAccessiblePages)(currentRole);
    };
    // الحصول على اسم الدور الحالي
    var getCurrentRoleLabel = function () {
        if (!currentRole) {
            return 'غير محدد';
        }
        return (0, roles_1.getRoleLabel)(currentRole);
    };
    // الحصول على وصف الدور الحالي
    var getCurrentRoleDescription = function () {
        if (!currentRole) {
            return 'دور غير محدد';
        }
        return (0, roles_1.getRoleDescription)(currentRole);
    };
    // الحصول على مستوى الدور الحالي
    var getCurrentRoleLevel = function () {
        if (!currentRole) {
            return 0;
        }
        return (0, roles_1.getRoleLevel)(currentRole);
    };
    // التحقق من إمكانية الترقية لدور معين
    var canPromoteTo = function (targetRole) {
        if (!currentRole) {
            return false;
        }
        return (0, roles_1.canPromote)(currentRole, targetRole);
    };
    // التحقق من إمكانية التنزيل لدور معين
    var canDemoteTo = function (targetRole) {
        if (!currentRole) {
            return false;
        }
        return (0, roles_1.canDemote)(currentRole, targetRole);
    };
    // التحقق من كون المستخدم مسؤول عام
    var isSuperAdmin = function () {
        return currentRole === 'super_admin';
    };
    // التحقق من كون المستخدم مدير شركة
    var isCompanyManager = function () {
        return currentRole === 'company_manager';
    };
    // التحقق من كون المستخدم موظف إداري
    var isEmployee = function () {
        return currentRole === 'employee';
    };
    // التحقق من كون المستخدم مشرف
    var isSupervisor = function () {
        return currentRole === 'supervisor';
    };
    // التحقق من كون المستخدم عامل
    var isWorker = function () {
        return currentRole === 'worker';
    };
    // التحقق من كون المستخدم لديه صلاحيات إدارية
    var hasAdminPermissions = function () {
        return isSuperAdmin() || isCompanyManager();
    };
    // التحقق من كون المستخدم لديه صلاحيات إدارية متوسطة
    var hasManagerPermissions = function () {
        return isSuperAdmin() || isCompanyManager() || isEmployee();
    };
    // التحقق من كون المستخدم لديه صلاحيات مشرف
    var hasSupervisorPermissions = function () {
        return isSuperAdmin() || isCompanyManager() || isEmployee() || isSupervisor();
    };
    return {
        // الدور الحالي
        currentRole: currentRole,
        // دوال التحقق من الصلاحيات
        checkPermission: checkPermission,
        canAccess: canAccess,
        checkAnyPermission: checkAnyPermission,
        checkAllPermissions: checkAllPermissions,
        // دوال الحصول على المعلومات
        getCurrentRolePermissions: getCurrentRolePermissions,
        getAccessiblePagesForCurrentRole: getAccessiblePagesForCurrentRole,
        getCurrentRoleLabel: getCurrentRoleLabel,
        getCurrentRoleDescription: getCurrentRoleDescription,
        getCurrentRoleLevel: getCurrentRoleLevel,
        // دوال التحقق من الأدوار
        isSuperAdmin: isSuperAdmin,
        isCompanyManager: isCompanyManager,
        isEmployee: isEmployee,
        isSupervisor: isSupervisor,
        isWorker: isWorker,
        // دوال التحقق من مجموعات الصلاحيات
        hasAdminPermissions: hasAdminPermissions,
        hasManagerPermissions: hasManagerPermissions,
        hasSupervisorPermissions: hasSupervisorPermissions,
        // دوال الترقية والتنزيل
        canPromoteTo: canPromoteTo,
        canDemoteTo: canDemoteTo,
        // دوال مساعدة
        'hasPermission': checkPermission,
        'canAccessPage': canAccess,
        'roleLabel': getCurrentRoleLabel(),
        'roleDescription': getCurrentRoleDescription(),
        'roleLevel': getCurrentRoleLevel()
    };
};
exports.usePermissions = usePermissions;
