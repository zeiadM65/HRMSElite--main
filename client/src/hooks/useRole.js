"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRole = void 0;
var useAuth_1 = require("./useAuth");
var routes_1 = require("../lib/routes");
var react_i18next_1 = require("react-i18next");
var useRole = function () {
    var user = (0, useAuth_1.useAuth)().user;
    var t = (0, react_i18next_1.useTranslation)().t;
    // الحصول على الدور من بيانات المستخدم
    var getUserRole = function () {
        if ((user === null || user === void 0 ? void 0 : user.role) && (0, routes_1.isValidRole)(user.role)) {
            return user.role;
        }
        // استخراج الدور من URL parameters
        var urlParams = new window.URLSearchParams(window.location.search);
        var urlRole = urlParams.get('role');
        if (urlRole && (0, routes_1.isValidRole)(urlRole)) {
            return urlRole;
        }
        // استخراج الدور من pathname
        var pathname = window.location.pathname;
        var roleMatch = pathname.match(/\/dashboard\/([^/?]+)/);
        if ((roleMatch === null || roleMatch === void 0 ? void 0 : roleMatch[1]) && (0, routes_1.isValidRole)(roleMatch[1])) {
            return roleMatch[1];
        }
        // الدور الافتراضي
        return 'worker';
    };
    // الحصول على اسم الدور
    var getRoleLabel = function (role) {
        var currentRole = role !== null && role !== void 0 ? role : getUserRole();
        return t("roles.labels.".concat(currentRole));
    };
    // التحقق من الصلاحيات
    var hasPermission = function (requiredRoles) {
        var currentRole = getUserRole();
        return requiredRoles.includes(currentRole);
    };
    // الحصول على الدور الحالي
    var currentRole = getUserRole();
    return {
        'role': currentRole,
        'roleLabel': getRoleLabel(currentRole),
        getUserRole: getUserRole,
        getRoleLabel: getRoleLabel,
        hasPermission: hasPermission,
        'isValidRole': function (role) { return (0, routes_1.isValidRole)(role); }
    };
};
exports.useRole = useRole;
