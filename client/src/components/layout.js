"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = Layout;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var sidebar_1 = require("./sidebar");
var header_1 = require("./header");
function Layout(_a) {
    var children = _a.children, user = _a.user, company = _a.company, _b = _a.activeView, activeView = _b === void 0 ? 'dashboard' : _b, onViewChange = _a.onViewChange, onLogout = _a.onLogout, onSettingsClick = _a.onSettingsClick, onSearchClick = _a.onSearchClick, _onNotificationsClick = _a.onNotificationsClick, onThemeToggle = _a.onThemeToggle, _c = _a.isDarkMode, isDarkMode = _c === void 0 ? false : _c, onAIAssistantOpen = _a.onAIAssistantOpen, onBIDashboardOpen = _a.onBIDashboardOpen, onWorkflowBuilderOpen = _a.onWorkflowBuilderOpen, onLearningManagementOpen = _a.onLearningManagementOpen, onFinancialManagementOpen = _a.onFinancialManagementOpen, onMobileAppOpen = _a.onMobileAppOpen, onEmployee360Open = _a.onEmployee360Open;
    var _d = (0, react_1.useState)(false), sidebarCollapsed = _d[0], _setSidebarCollapsed = _d[1];
    // إنشاء بيانات افتراضية إذا لم يتم تمريرها
    var defaultUser = user !== null && user !== void 0 ? user : {
        id: 'default-user',
        email: 'user@example.com',
        firstName: 'مستخدم',
        lastName: 'افتراضي',
        role: 'worker',
        companies: [
            {
                id: 'default-company',
                name: 'نظام إدارة الموارد البشرية',
                commercialFileName: '',
                department: '',
                classification: '',
                status: 'active',
                employeeCount: 0,
                industry: '',
                establishmentDate: new Date().toISOString(),
                userRole: 'worker',
                userPermissions: []
            }
        ],
        permissions: [],
        companyId: 'default-company',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        emailVerified: false,
        sub: 'default-user',
        claims: null
    };
    var defaultCompany = company !== null && company !== void 0 ? company : {
        'id': 'default-company',
        'name': 'نظام إدارة الموارد البشرية',
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
    var handleViewChange = function (view) {
        onViewChange === null || onViewChange === void 0 ? void 0 : onViewChange(view);
    };
    // مبدّل الشريط الجانبي غير مستخدم حاليًا، لذا تمت إزالته لتجنّب أخطاء اللينتر
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-screen bg-background", children: [(0, jsx_runtime_1.jsx)("div", { className: "".concat(sidebarCollapsed ? 'w-16' : 'w-64', " transition-all duration-300 ease-in-out"), children: (0, jsx_runtime_1.jsx)(sidebar_1.Sidebar, { user: defaultUser, company: defaultCompany, activeView: activeView, onViewChange: handleViewChange, onAIAssistantOpen: onAIAssistantOpen !== null && onAIAssistantOpen !== void 0 ? onAIAssistantOpen : (function () { }), onBIDashboardOpen: onBIDashboardOpen !== null && onBIDashboardOpen !== void 0 ? onBIDashboardOpen : (function () { }), onWorkflowBuilderOpen: onWorkflowBuilderOpen !== null && onWorkflowBuilderOpen !== void 0 ? onWorkflowBuilderOpen : (function () { }), onLearningManagementOpen: onLearningManagementOpen !== null && onLearningManagementOpen !== void 0 ? onLearningManagementOpen : (function () { }), onFinancialManagementOpen: onFinancialManagementOpen !== null && onFinancialManagementOpen !== void 0 ? onFinancialManagementOpen : (function () { }), onMobileAppOpen: onMobileAppOpen !== null && onMobileAppOpen !== void 0 ? onMobileAppOpen : (function () { }), onEmployee360Open: onEmployee360Open !== null && onEmployee360Open !== void 0 ? onEmployee360Open : (function () { }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)(header_1.Header, { user: defaultUser, company: defaultCompany, onLogout: onLogout !== null && onLogout !== void 0 ? onLogout : (function () { }), onSettingsClick: onSettingsClick !== null && onSettingsClick !== void 0 ? onSettingsClick : (function () { }), onSearchClick: onSearchClick !== null && onSearchClick !== void 0 ? onSearchClick : (function () { }), onThemeToggle: onThemeToggle !== null && onThemeToggle !== void 0 ? onThemeToggle : (function () { }), isDarkMode: isDarkMode }), (0, jsx_runtime_1.jsx)("main", { role: "main", className: "flex-1 overflow-auto p-6", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-7xl mx-auto", children: children }) })] })] }));
}
