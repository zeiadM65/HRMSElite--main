"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardCharts;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var skeleton_1 = require("@/components/ui/skeleton");
var react_i18next_1 = require("react-i18next");
function DashboardCharts(_a) {
    var _b, _c, _d, _e;
    var data = _a.data;
    var isLoading = !data;
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: (_b = data === null || data === void 0 ? void 0 : data.title) !== null && _b !== void 0 ? _b : t('dashboard.charts.defaultTitle') }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: isLoading ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-6 w-40" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-40 w-full" })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "text-muted-foreground text-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-3 font-medium text-foreground", children: t('dashboard.charts.lineData') }), (0, jsx_runtime_1.jsx)("ul", { className: "list-disc mr-5 mb-4", children: (_c = data === null || data === void 0 ? void 0 : data.line) === null || _c === void 0 ? void 0 : _c.map(function (p) { return ((0, jsx_runtime_1.jsxs)("li", { children: [p.label, ": ", p.value] }, "l-".concat(p.label))); }) }), (0, jsx_runtime_1.jsx)("div", { className: "mb-3 font-medium text-foreground", children: t('dashboard.charts.barData') }), (0, jsx_runtime_1.jsx)("ul", { className: "list-disc mr-5 mb-4", children: (_d = data === null || data === void 0 ? void 0 : data.bar) === null || _d === void 0 ? void 0 : _d.map(function (p) { return ((0, jsx_runtime_1.jsxs)("li", { children: [p.label, ": ", p.value] }, "b-".concat(p.label))); }) }), (0, jsx_runtime_1.jsx)("div", { className: "mb-3 font-medium text-foreground", children: t('dashboard.charts.pieData') }), (0, jsx_runtime_1.jsx)("ul", { className: "list-disc mr-5", children: (_e = data === null || data === void 0 ? void 0 : data.pie) === null || _e === void 0 ? void 0 : _e.map(function (p) { return ((0, jsx_runtime_1.jsxs)("li", { children: [p.label, ": ", p.value] }, "p-".concat(p.label))); }) })] })) })] }));
}
