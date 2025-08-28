"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNavigation = void 0;
var wouter_1 = require("wouter");
var navigation_config_1 = require("../lib/navigation-config");
var useRole_1 = require("./useRole");
var useNavigation = function () {
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var role = (0, useRole_1.useRole)().role;
    // التنقل إلى عنصر معين
    var navigateToItem = function (itemId, companyId, companyName) {
        // التحقق من الصلاحية قبل التنقل
        if (!(0, navigation_config_1.hasAccessToItem)(itemId, role)) {
            return;
        }
        var path = (0, navigation_config_1.getItemPath)(itemId, role, companyId, companyName);
        setLocation(path);
    };
    // التنقل إلى لوحة التحكم
    var navigateToDashboard = function (companyId, companyName) {
        navigateToItem('dashboard', companyId, companyName);
    };
    // التنقل إلى إدارة الموظفين
    var navigateToEmployees = function (companyId) {
        navigateToItem('employees', companyId);
    };
    // التنقل إلى التقارير
    var navigateToReports = function (companyId) {
        navigateToItem('reports', companyId);
    };
    // التنقل إلى الإعدادات
    var navigateToSettings = function (companyId) {
        navigateToItem('settings', companyId);
    };
    // التنقل إلى الإجازات
    var navigateToLeaves = function (companyId) {
        navigateToItem('leaves', companyId);
    };
    // التنقل إلى الحضور
    var navigateToAttendance = function (companyId) {
        navigateToItem('attendance', companyId);
    };
    // التنقل إلى المرتبات
    var navigateToPayroll = function (companyId) {
        navigateToItem('payroll', companyId);
    };
    // التنقل إلى المستندات
    var navigateToDocuments = function (companyId) {
        navigateToItem('documents', companyId);
    };
    // التنقل إلى الملف الشخصي
    var navigateToProfile = function (companyId) {
        navigateToItem('profile', companyId);
    };
    // التنقل إلى الشركات (للمسؤول العام)
    var navigateToCompanies = function () {
        navigateToItem('companies');
    };
    // التنقل إلى التراخيص
    var navigateToLicenses = function (companyId) {
        navigateToItem('licenses', companyId);
    };
    // التنقل إلى الصلاحيات
    var navigateToPermissions = function (companyId) {
        navigateToItem('permissions', companyId);
    };
    // التنقل إلى إعدادات الشركة
    var navigateToCompanySettings = function (companyId) {
        navigateToItem('company-settings', companyId);
    };
    // التنقل إلى مسار مخصص
    var navigateToPath = function (path) {
        setLocation(path);
    };
    // العودة للصفحة السابقة
    var goBack = function () {
        window.history.back();
    };
    // العودة للصفحة الرئيسية
    var goHome = function () {
        setLocation('/');
    };
    // الحصول على معلومات العنصر الحالي
    var getCurrentItemInfo = function (itemId) {
        return (0, navigation_config_1.getItemInfo)(itemId, role);
    };
    // التحقق من إمكانية الوصول لعنصر معين
    var canAccessItem = function (itemId) {
        return (0, navigation_config_1.hasAccessToItem)(itemId, role);
    };
    // الحصول على عناصر القائمة المتاحة للدور الحالي
    var getAvailableMenuItems = function () {
        return (0, navigation_config_1.getMenuItems)(role);
    };
    // الحصول على الميزات المتقدمة المتاحة للدور الحالي
    var getAvailableAdvancedFeatures = function () {
        return (0, navigation_config_1.getAdvancedFeatures)(role);
    };
    return {
        // دوال التنقل الأساسية
        navigateToItem: navigateToItem,
        navigateToDashboard: navigateToDashboard,
        navigateToEmployees: navigateToEmployees,
        navigateToReports: navigateToReports,
        navigateToSettings: navigateToSettings,
        navigateToLeaves: navigateToLeaves,
        navigateToAttendance: navigateToAttendance,
        navigateToPayroll: navigateToPayroll,
        navigateToDocuments: navigateToDocuments,
        navigateToProfile: navigateToProfile,
        navigateToCompanies: navigateToCompanies,
        navigateToLicenses: navigateToLicenses,
        navigateToPermissions: navigateToPermissions,
        navigateToCompanySettings: navigateToCompanySettings,
        navigateToPath: navigateToPath,
        goBack: goBack,
        goHome: goHome,
        // دوال مساعدة
        getCurrentItemInfo: getCurrentItemInfo,
        canAccessItem: canAccessItem,
        getAvailableMenuItems: getAvailableMenuItems,
        getAvailableAdvancedFeatures: getAvailableAdvancedFeatures,
        // دوال النظام
        setLocation: setLocation
    };
};
exports.useNavigation = useNavigation;
