"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("./ui/button");
var avatar_1 = require("./ui/avatar");
var badge_1 = require("./ui/badge");
var dropdown_menu_1 = require("./ui/dropdown-menu");
var lucide_react_1 = require("lucide-react");
var notification_center_1 = require("./notification-center");
var LanguageSwitcher_1 = require("./LanguageSwitcher");
var react_i18next_1 = require("react-i18next");
function Header(_a) {
    var _b, _c, _d, _e, _f, _g;
    var user = _a.user, company = _a.company, onLogout = _a.onLogout, onSettingsClick = _a.onSettingsClick, onSearchClick = _a.onSearchClick, onThemeToggle = _a.onThemeToggle, _h = _a.isDarkMode, isDarkMode = _h === void 0 ? false : _h;
    var t = (0, react_i18next_1.useTranslation)().t;
    var getUserInitials = function (user) {
        var _a, _b;
        var firstName = (_a = user === null || user === void 0 ? void 0 : user.firstName) !== null && _a !== void 0 ? _a : '';
        var lastName = (_b = user === null || user === void 0 ? void 0 : user.lastName) !== null && _b !== void 0 ? _b : '';
        return "".concat(firstName.charAt(0)).concat(lastName.charAt(0)).toUpperCase();
    };
    var getUserDisplayName = function (user) {
        var _a, _b;
        var firstName = (_a = user === null || user === void 0 ? void 0 : user.firstName) !== null && _a !== void 0 ? _a : '';
        var lastName = (_b = user === null || user === void 0 ? void 0 : user.lastName) !== null && _b !== void 0 ? _b : '';
        return "".concat(firstName, " ").concat(lastName).trim() || t('common.user');
    };
    var getRoleLabel = function (role) {
        var label = t("roles.labels.".concat(role !== null && role !== void 0 ? role : 'undefined'), { defaultValue: '' });
        return label || t('common.user');
    };
    return ((0, jsx_runtime_1.jsx)("header", { className: "bg-card border-b border-border px-6 py-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-white font-bold text-xs", children: (_c = (_b = company === null || company === void 0 ? void 0 : company.name) === null || _b === void 0 ? void 0 : _b.split(' ').slice(0, 2).map(function (word) { return word.charAt(0); }).join('')) !== null && _c !== void 0 ? _c : 'ش' }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-lg font-semibold text-foreground", children: (_d = company === null || company === void 0 ? void 0 : company.name) !== null && _d !== void 0 ? _d : "نظام إدارة الموارد البشرية" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted-foreground", children: [getRoleLabel(user === null || user === void 0 ? void 0 : user.role), " \u2022 ", (_e = company === null || company === void 0 ? void 0 : company.totalEmployees) !== null && _e !== void 0 ? _e : 0, " \u0645\u0648\u0638\u0641"] })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: onSearchClick, className: "text-muted-foreground hover:text-foreground", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4" }) }), user && ((0, jsx_runtime_1.jsx)(notification_center_1.NotificationCenter, { userId: user.id })), (0, jsx_runtime_1.jsx)(LanguageSwitcher_1.LanguageSwitcher, {}), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: onThemeToggle, className: "text-muted-foreground hover:text-foreground", "aria-label": isDarkMode ? t('settings.lightMode') : t('settings.darkMode'), children: isDarkMode ? (0, jsx_runtime_1.jsx)(lucide_react_1.Sun, { className: "h-4 w-4" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Moon, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", className: "relative h-8 w-8 rounded-full", children: (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: "h-8 w-8", children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: (_f = user === null || user === void 0 ? void 0 : user.profileImageUrl) !== null && _f !== void 0 ? _f : undefined, alt: getUserDisplayName(user) }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { className: "bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs", children: getUserInitials(user) })] }) }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuLabel, { className: "font-normal", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium leading-none", children: getUserDisplayName(user) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs leading-none text-muted-foreground", children: (_g = user === null || user === void 0 ? void 0 : user.email) !== null && _g !== void 0 ? _g : "user@example.com" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "w-fit text-xs", children: getRoleLabel(user === null || user === void 0 ? void 0 : user.role) })] }) }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: onSettingsClick, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { className: "mr-2 h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: t('settings') })] }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "mr-2 h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0634\u062E\u0635\u064A" })] }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: onLogout, className: "text-red-600", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "mr-2 h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C" })] })] })] })] })] }) }));
}
