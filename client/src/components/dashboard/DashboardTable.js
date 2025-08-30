"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var table_1 = require("@/components/ui/table");
var skeleton_1 = require("@/components/ui/skeleton");
var react_i18next_1 = require("react-i18next");
function DashboardTable(_a) {
    var _b, _c, _d;
    var data = _a.data;
    var isLoading = !data;
    var t = (0, react_i18next_1.useTranslation)().t;
    var columns = (_b = data === null || data === void 0 ? void 0 : data.columns) !== null && _b !== void 0 ? _b : [t('dashboard.table.column1'), t('dashboard.table.column2'), t('dashboard.table.column3')];
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: (_c = data === null || data === void 0 ? void 0 : data.title) !== null && _c !== void 0 ? _c : t('dashboard.table.defaultTitle') }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: isLoading ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-6 w-28" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-32 w-full" })] })) : ((0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsx)(table_1.TableRow, { children: columns.map(function (c) { return ((0, jsx_runtime_1.jsx)(table_1.TableHead, { children: c }, c)); }) }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: ((_d = data === null || data === void 0 ? void 0 : data.rows) !== null && _d !== void 0 ? _d : []).map(function (row, idx) { return ((0, jsx_runtime_1.jsx)(table_1.TableRow, { children: columns.map(function (c) { return ((0, jsx_runtime_1.jsx)(table_1.TableCell, { children: formatCellValue(row[c], t) }, "".concat(idx, "-").concat(c))); }) }, idx)); }) })] })) })] }));
}
function formatCellValue(value, t) {
    if (value === null || value === undefined)
        return '-';
    if (typeof value === 'boolean' && t)
        return value ? t('dashboard.table.yes') : t('dashboard.table.no');
    return String(value);
}
