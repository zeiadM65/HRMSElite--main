"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = ErrorMessage;
exports.FullScreenError = FullScreenError;
exports.SectionError = SectionError;
exports.TableError = TableError;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var alert_1 = require("@/components/ui/alert");
var utils_1 = require("@/lib/utils");
function ErrorMessage(_a) {
    var error = _a.error, onRetry = _a.onRetry, className = _a.className, _b = _a.title, title = _b === void 0 ? 'حدث خطأ' : _b, _c = _a.showRetry, showRetry = _c === void 0 ? true : _c;
    if (!error) {
        return null;
    }
    var errorMessage = typeof error === 'string' ? error : error.message;
    return ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "destructive", className: (0, utils_1.cn)('border-red-200 bg-red-50 dark:bg-red-950/20', className), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, { className: "text-red-800 dark:text-red-200", children: title }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { className: "text-red-700 dark:text-red-300 mt-2", children: errorMessage }), showRetry && onRetry && ((0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: onRetry, className: "border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-4 w-4 ml-2" }), "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629"] }) }))] }));
}
// مكون للخطأ في وسط الشاشة
function FullScreenError(_a) {
    var error = _a.error, onRetry = _a.onRetry;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-md w-full", children: (0, jsx_runtime_1.jsx)(ErrorMessage, { error: error, onRetry: onRetry, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" }) }) }));
}
// مكون للخطأ في منطقة محددة
function SectionError(_a) {
    var error = _a.error, onRetry = _a.onRetry;
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-12", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-md w-full", children: (0, jsx_runtime_1.jsx)(ErrorMessage, { error: error, onRetry: onRetry, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" }) }) }));
}
// مكون للخطأ في الجدول
function TableError(_a) {
    var error = _a.error, onRetry = _a.onRetry;
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-8", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-sm w-full", children: (0, jsx_runtime_1.jsx)(ErrorMessage, { error: error, onRetry: onRetry, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062C\u062F\u0648\u0644" }) }) }));
}
