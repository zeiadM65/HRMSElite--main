"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var layout_1 = require("../components/layout");
var card_1 = require("../components/ui/card");
var button_1 = require("../components/ui/button");
var badge_1 = require("../components/ui/badge");
var lucide_react_1 = require("lucide-react");
var logger_1 = require("../lib/logger");
function LayoutExample() {
    var _a = (0, react_1.useState)('dashboard'), activeView = _a[0], setActiveView = _a[1];
    var _b = (0, react_1.useState)(false), isDarkMode = _b[0], setIsDarkMode = _b[1];
    // بيانات المستخدم الافتراضية (واجهة الويب)
    var sampleUser = {
        id: 'user-1',
        sub: 'user-1',
        email: 'admin@company.com',
        firstName: 'أحمد',
        lastName: 'محمد',
        role: 'super_admin',
        companies: [
            {
                id: 'company-1',
                name: 'شركة النيل الأزرق للمجوهرات',
                commercialFileName: 'commercial_file.pdf',
                department: 'الجهراء',
                classification: 'تجارة',
                status: 'active',
                employeeCount: 45,
                industry: 'مجوهرات',
                establishmentDate: '2023-01-15',
                userRole: 'super_admin',
                userPermissions: ['view_reports', 'manage_employees'],
                logoUrl: undefined
            }
        ],
        permissions: ['view_reports', 'manage_employees'],
        companyId: 'company-1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: undefined,
        isActive: true,
        emailVerified: false,
        profileImageUrl: undefined,
        claims: null
    };
    // بيانات الشركة الافتراضية
    var sampleCompany = {
        'id': 'company-1',
        'name': 'شركة النيل الأزرق للمجوهرات',
        'commercialFileNumber': 'CF-2023-001',
        'commercialFileName': 'commercial_file.pdf',
        'commercialFileStatus': true,
        'establishmentDate': '2023-01-15',
        'commercialRegistrationNumber': 'CR-2023-001',
        'classification': 'تجارة',
        'department': 'الجهراء',
        'fileType': 'تجاري',
        'legalEntity': 'شركة ذات مسؤولية محدودة',
        'ownershipCategory': 'كويتي',
        'logoUrl': null,
        'address': 'الجهراء، شارع البحر، مجمع 123',
        'phone': '+965-12345678',
        'email': 'info@nileblue.com',
        'website': 'www.nileblue.com',
        'totalEmployees': 45,
        'totalLicenses': 3,
        'isActive': true,
        'industryType': 'مجوهرات',
        'businessActivity': 'تجارة المجوهرات والذهب',
        'location': 'الجهراء',
        'taxNumber': 'TAX-2023-001',
        'chambers': 'غرفة تجارة الكويت',
        'partnerships': '[]',
        'importExportLicense': 'IE-2023-001',
        'specialPermits': '[]',
        'createdAt': new Date('2023-01-15'),
        'updatedAt': new Date()
    };
    // معالجات الأحداث
    var handleLogout = function () {
        logger_1.log.user('تسجيل الخروج', sampleUser.id);
        // هنا يمكن إضافة منطق تسجيل الخروج
    };
    var handleSettingsClick = function () {
        logger_1.log.user('فتح الإعدادات', sampleUser.id);
        setActiveView('settings');
    };
    var handleSearchClick = function () {
        logger_1.log.user('فتح البحث', sampleUser.id);
    };
    var handleNotificationsClick = function () {
        logger_1.log.user('فتح الإشعارات', sampleUser.id);
    };
    var handleThemeToggle = function () {
        setIsDarkMode(!isDarkMode);
        logger_1.log.user('تبديل المظهر', sampleUser.id, { 'theme': !isDarkMode ? 'داكن' : 'فاتح' });
    };
    var handleViewChange = function (view) {
        setActiveView(view);
        logger_1.log.user('تغيير العرض', sampleUser.id, { view: view });
    };
    // معالجات الميزات المتقدمة
    var handleAIAssistantOpen = function () {
        logger_1.log.user('فتح المساعد الذكي', sampleUser.id);
    };
    var handleBIDashboardOpen = function () {
        logger_1.log.user('فتح لوحة التحكم التحليلية', sampleUser.id);
    };
    var handleWorkflowBuilderOpen = function () {
        logger_1.log.user('فتح منشئ سير العمل', sampleUser.id);
    };
    var handleLearningManagementOpen = function () {
        logger_1.log.user('فتح إدارة التعلم', sampleUser.id);
    };
    var handleFinancialManagementOpen = function () {
        logger_1.log.user('فتح الإدارة المالية', sampleUser.id);
    };
    var handleMobileAppOpen = function () {
        logger_1.log.user('فتح التطبيق المحمول', sampleUser.id);
    };
    var handleEmployee360Open = function () {
        logger_1.log.user('فتح عرض الموظف 360', sampleUser.id);
    };
    return ((0, jsx_runtime_1.jsx)(layout_1.Layout, { user: sampleUser, company: sampleCompany, activeView: activeView, onViewChange: handleViewChange, onLogout: handleLogout, onSettingsClick: handleSettingsClick, onSearchClick: handleSearchClick, onNotificationsClick: handleNotificationsClick, onThemeToggle: handleThemeToggle, isDarkMode: isDarkMode, onAIAssistantOpen: handleAIAssistantOpen, onBIDashboardOpen: handleBIDashboardOpen, onWorkflowBuilderOpen: handleWorkflowBuilderOpen, onLearningManagementOpen: handleLearningManagementOpen, onFinancialManagementOpen: handleFinancialManagementOpen, onMobileAppOpen: handleMobileAppOpen, onEmployee360Open: handleEmployee360Open, children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-foreground", children: "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2", children: "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643 \u0641\u064A \u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "secondary", className: "text-sm", children: ["\u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0646\u0634\u0637: ", activeView] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: sampleCompany.totalEmployees }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: "+12% \u0645\u0646 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0627\u0636\u064A" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0646\u0634\u0637\u0629" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Building, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: sampleCompany.totalLicenses }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635 \u0633\u0627\u0631\u064A\u0629" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A" }), (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: "156" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: "+8 \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u062C\u062F\u064A\u062F\u0629" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0645\u0639\u0644\u0642\u0629" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: "3" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: "\u062A\u062D\u062A\u0627\u062C \u0645\u0631\u0627\u062C\u0639\u0629" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629:" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: sampleCompany.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0631\u0642\u0645 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u062A\u062C\u0627\u0631\u064A:" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: sampleCompany.commercialFileNumber })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0646\u0634\u0627\u0637 \u0627\u0644\u062A\u062C\u0627\u0631\u064A:" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: sampleCompany.businessActivity })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0645\u0648\u0642\u0639:" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: sampleCompany.location })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0633\u0631\u064A\u0639\u0629" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "\u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0645\u0647\u0645\u0629" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full justify-start", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "mr-2 h-4 w-4" }), "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full justify-start", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "mr-2 h-4 w-4" }), "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full justify-start", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "mr-2 h-4 w-4" }), "\u0627\u0644\u0631\u0648\u0627\u062A\u0628 \u0648\u0627\u0644\u0645\u0643\u0627\u0641\u0622\u062A"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full justify-start", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "mr-2 h-4 w-4" }), "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631 \u0648\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A"] })] })] })] })] }) }));
}
exports.default = LayoutExample;
