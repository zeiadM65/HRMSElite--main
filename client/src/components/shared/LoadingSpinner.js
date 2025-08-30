"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingSpinner = LoadingSpinner;
exports.FullScreenLoader = FullScreenLoader;
exports.SectionLoader = SectionLoader;
exports.TableLoader = TableLoader;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
function LoadingSpinner(_a) {
    var _b = _a.size, size = _b === void 0 ? 'md' : _b, className = _a.className, _c = _a.text, text = _c === void 0 ? 'جاري التحميل...' : _c;
    var sizeClasses = {
        'sm': 'w-4 h-4',
        'md': 'w-8 h-8',
        'lg': 'w-12 h-12'
    };
    var textSizeClasses = {
        'sm': 'text-xs',
        'md': 'text-sm',
        'lg': 'text-base'
    };
    return ((0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": "polite", className: (0, utils_1.cn)('flex flex-col items-center justify-center gap-3', className), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('animate-spin rounded-full border-2 border-gray-300 border-t-primary', sizeClasses[size]) }), text && ((0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)('text-muted-foreground text-center', textSizeClasses[size]), children: text }))] }));
}
// مكون للتحميل في وسط الشاشة
function FullScreenLoader(_a) {
    var text = _a.text;
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(LoadingSpinner, { size: "lg", text: text }) }));
}
// مكون للتحميل في منطقة محددة
function SectionLoader(_a) {
    var text = _a.text;
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: "flex items-center justify-center py-12", children: (0, jsx_runtime_1.jsx)(LoadingSpinner, { size: "md", text: text }) }));
}
// مكون للتحميل في الجدول
function TableLoader() {
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: "flex items-center justify-center py-8", children: (0, jsx_runtime_1.jsx)(LoadingSpinner, { size: "sm", text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A..." }) }));
}
