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
exports.SharedLayout = SharedLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var sidebar_1 = require("./sidebar");
var header_1 = require("./header");
function SharedLayout(_a) {
    var children = _a.children, user = _a.user, companyName = _a.companyName, onLogout = _a.onLogout, onSettingsClick = _a.onSettingsClick, onSearchClick = _a.onSearchClick, onThemeToggle = _a.onThemeToggle, _b = _a.isDarkMode, isDarkMode = _b === void 0 ? false : _b;
    // تمرير المستخدم كما هو أو undefined لتجنب إنشاء كائن غير متوافق مع نوع User
    var userData = user;
    // إنشاء كائن company افتراضي
    var defaultCompany = {
        'id': 'default',
        'name': companyName !== null && companyName !== void 0 ? companyName : 'شركة افتراضية',
        'commercialFileNumber': null,
        'commercialFileName': null,
        'commercialFileStatus': true,
        'establishmentDate': null,
        'commercialRegistrationNumber': null,
        'classification': null,
        'department': null,
        'fileType': null,
        'legalEntity': null,
        'ownershipCategory': null,
        'logoUrl': null,
        'address': null,
        'phone': null,
        'email': null,
        'website': null,
        'totalEmployees': 0,
        'totalLicenses': 0,
        'isActive': true,
        'industryType': null,
        'businessActivity': null,
        'location': null,
        'taxNumber': null,
        'chambers': null,
        'partnerships': '[]',
        'importExportLicense': null,
        'specialPermits': '[]',
        'createdAt': new Date(),
        'updatedAt': new Date()
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-screen bg-background", children: [(0, jsx_runtime_1.jsx)(sidebar_1.Sidebar, { user: userData, company: defaultCompany, activeView: "dashboard", onViewChange: function () { } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)(header_1.Header, __assign({}, (userData && { user: userData }), { company: defaultCompany }, (onLogout && { onLogout: onLogout }), (onSettingsClick && { onSettingsClick: onSettingsClick }), (onSearchClick && { onSearchClick: onSearchClick }), (onThemeToggle && { onThemeToggle: onThemeToggle }), { isDarkMode: isDarkMode })), (0, jsx_runtime_1.jsx)("main", { role: "main", className: "flex-1 overflow-auto p-6", children: children })] })] }));
}
