"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardStats;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var skeleton_1 = require("@/components/ui/skeleton");
var react_i18next_1 = require("react-i18next");
function DashboardStats(_a) {
    var data = _a.data;
    var isLoading = !data;
    var t = (0, react_i18next_1.useTranslation)().t;
    var statItems = [
        { label: t('dashboard.stats.totalCompanies'), value: data === null || data === void 0 ? void 0 : data.totalCompanies },
        { label: t('dashboard.stats.activeCompanies'), value: data === null || data === void 0 ? void 0 : data.activeCompanies },
        { label: t('dashboard.stats.totalEmployees'), value: data === null || data === void 0 ? void 0 : data.totalEmployees },
        { label: t('dashboard.stats.activeEmployees'), value: data === null || data === void 0 ? void 0 : data.activeEmployees },
        { label: t('dashboard.stats.totalLicenses'), value: data === null || data === void 0 ? void 0 : data.totalLicenses },
        { label: t('dashboard.stats.activeLicenses'), value: data === null || data === void 0 ? void 0 : data.activeLicenses },
        { label: t('dashboard.stats.systemUsage'), value: data === null || data === void 0 ? void 0 : data.systemUsage }
    ];
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: statItems.map(function (item) {
            var _a;
            return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "h-full", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-base font-medium text-muted-foreground", children: item.label }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: isLoading ? ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-8 w-24" })) : ((0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-foreground", children: (_a = item.value) !== null && _a !== void 0 ? _a : '-' })) })] }, item.label));
        }) }));
}
