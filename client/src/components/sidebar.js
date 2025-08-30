"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("./ui/button");
var usePermissions_1 = require("../hooks/usePermissions");
var useNavigation_1 = require("../hooks/useNavigation");
var navigation_config_1 = require("../lib/navigation-config");
var react_i18next_1 = require("react-i18next");
function Sidebar(_a) {
    var _b, _c, _d;
    var company = _a.company, _user = _a.user, activeView = _a.activeView, _onViewChange = _a.onViewChange, onAIAssistantOpen = _a.onAIAssistantOpen, onBIDashboardOpen = _a.onBIDashboardOpen, onWorkflowBuilderOpen = _a.onWorkflowBuilderOpen, onLearningManagementOpen = _a.onLearningManagementOpen, onFinancialManagementOpen = _a.onFinancialManagementOpen, onMobileAppOpen = _a.onMobileAppOpen, onEmployee360Open = _a.onEmployee360Open;
    var _e = (0, usePermissions_1.usePermissions)(), currentRole = _e.currentRole, roleLabel = _e.roleLabel;
    var navigateToItem = (0, useNavigation_1.useNavigation)().navigateToItem;
    var t = (0, react_i18next_1.useTranslation)().t;
    var getCompanyInitials = function (name) {
        var words = name.split(' ');
        return words.slice(0, 2).map(function (word) { return word.charAt(0); }).join(' ');
    };
    // تحديد معرف الشركة
    var companyId = (_b = company === null || company === void 0 ? void 0 : company.id) !== null && _b !== void 0 ? _b : '1';
    // الحصول على عناصر القائمة حسب الدور
    var menuItems = (0, navigation_config_1.getMenuItems)(currentRole);
    // الحصول على الميزات المتقدمة حسب الدور
    var advancedFeatures = (0, navigation_config_1.getAdvancedFeatures)(currentRole);
    // معالج التنقل المبسط
    var handleNavigation = function (view) {
        var _a;
        navigateToItem(view, companyId, (_a = company === null || company === void 0 ? void 0 : company.name) !== null && _a !== void 0 ? _a : '');
    };
    // معالج الميزات المتقدمة
    var handleAdvancedFeature = function (featureId) {
        switch (featureId) {
            case 'ai-assistant':
                onAIAssistantOpen === null || onAIAssistantOpen === void 0 ? void 0 : onAIAssistantOpen();
                break;
            case 'bi-dashboard':
                onBIDashboardOpen === null || onBIDashboardOpen === void 0 ? void 0 : onBIDashboardOpen();
                break;
            case 'workflow-builder':
                onWorkflowBuilderOpen === null || onWorkflowBuilderOpen === void 0 ? void 0 : onWorkflowBuilderOpen();
                break;
            case 'learning-management':
                onLearningManagementOpen === null || onLearningManagementOpen === void 0 ? void 0 : onLearningManagementOpen();
                break;
            case 'financial-management':
                onFinancialManagementOpen === null || onFinancialManagementOpen === void 0 ? void 0 : onFinancialManagementOpen();
                break;
            case 'mobile-app':
                onMobileAppOpen === null || onMobileAppOpen === void 0 ? void 0 : onMobileAppOpen();
                break;
            case 'employee-360':
                onEmployee360Open === null || onEmployee360Open === void 0 ? void 0 : onEmployee360Open();
                break;
            default:
                break;
        }
    };
    // تصنيف عناصر القائمة
    var mainMenuItems = menuItems.filter(function (item) { return item.section === 'main'; });
    var settingsMenuItems = menuItems.filter(function (item) { return item.section === 'settings'; });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-64 bg-card shadow-lg border-l border-border", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-6 border-b border-border", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-white font-bold text-sm", children: getCompanyInitials((_c = company === null || company === void 0 ? void 0 : company.name) !== null && _c !== void 0 ? _c : '') }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mr-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-foreground text-sm truncate", children: (_d = company === null || company === void 0 ? void 0 : company.name) !== null && _d !== void 0 ? _d : 'غير محدد' }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: roleLabel })] })] }) }), (0, jsx_runtime_1.jsxs)("nav", { className: "mt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "px-3", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "\u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-1", children: mainMenuItems.map(function (item) {
                                    var Icon = item.icon;
                                    var isActive = activeView === item.id;
                                    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: isActive ? 'secondary' : 'ghost', className: "w-full justify-start ".concat(isActive
                                                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'), onClick: function () { return handleNavigation(item.id); }, children: [(0, jsx_runtime_1.jsx)(Icon, { className: "ml-3 h-4 w-4" }), item.label] }) }, item.id));
                                }) })] }), settingsMenuItems.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "px-3 mt-8", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: t('settings') }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-1", children: settingsMenuItems.map(function (item) {
                                    var Icon = item.icon;
                                    var isActive = activeView === item.id;
                                    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: isActive ? 'secondary' : 'ghost', className: "w-full justify-start ".concat(isActive
                                                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'), onClick: function () { return handleNavigation(item.id); }, children: [(0, jsx_runtime_1.jsx)(Icon, { className: "ml-3 h-4 w-4" }), item.label] }) }, item.id));
                                }) })] })), advancedFeatures.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "px-3 mt-8", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "\u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629" }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-1", children: advancedFeatures.map(function (feature) {
                                    var Icon = feature.icon;
                                    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", className: "w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted", onClick: function () { return handleAdvancedFeature(feature.id); }, children: [(0, jsx_runtime_1.jsx)(Icon, { className: "ml-3 h-4 w-4" }), feature.label] }) }, feature.id));
                                }) })] }))] })] }));
}
