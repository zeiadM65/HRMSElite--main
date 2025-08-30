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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSkeleton = CardSkeleton;
exports.TableSkeleton = TableSkeleton;
exports.ListSkeleton = ListSkeleton;
exports.FormSkeleton = FormSkeleton;
exports.DashboardSkeleton = DashboardSkeleton;
exports.Skeleton = Skeleton;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
function Skeleton(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)('animate-pulse rounded-md bg-muted', className) }, props)));
}
// Specific skeleton components for different content types
function CardSkeleton() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "rounded-lg border bg-card text-card-foreground shadow-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "p-6 space-y-4", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-3/4" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-1/2" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-2/3" })] }) }));
}
function TableSkeleton(_a) {
    var _b = _a.rows, rows = _b === void 0 ? 5 : _b;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-4", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-24" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-32" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-28" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-20" })] }), Array.from({ 'length': rows }).map(function (_, i) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-4", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-24" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-32" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-28" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-20" })] }, i)); })] }));
}
function ListSkeleton(_a) {
    var _b = _a.items, items = _b === void 0 ? 3 : _b;
    return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: Array.from({ 'length': items }).map(function (_, i) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-12 w-12 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 flex-1", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-3/4" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-1/2" })] })] }, i)); }) }));
}
function FormSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-20" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-10 w-full" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-24" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-10 w-full" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-4 w-28" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-20 w-full" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)(Skeleton, { className: "h-10 w-24" }), (0, jsx_runtime_1.jsx)(Skeleton, { className: "h-10 w-24" })] })] }));
}
function DashboardSkeleton() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: Array.from({ 'length': 4 }).map(function (_, i) { return ((0, jsx_runtime_1.jsx)(CardSkeleton, {}, i)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsx)(CardSkeleton, {}), (0, jsx_runtime_1.jsx)(CardSkeleton, {})] }), (0, jsx_runtime_1.jsx)(CardSkeleton, {})] }));
}
