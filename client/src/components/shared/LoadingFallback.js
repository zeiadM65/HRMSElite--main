"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingFallback = LoadingFallback;
exports.PageLoadingFallback = PageLoadingFallback;
exports.ComponentLoadingFallback = ComponentLoadingFallback;
exports.OverlayLoadingFallback = OverlayLoadingFallback;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var skeleton_1 = require("@/components/ui/skeleton");
function LoadingFallback(_a) {
    var _b = _a.type, type = _b === void 0 ? 'default' : _b, _c = _a.message, message = _c === void 0 ? 'جاري تحميل المحتوى...' : _c, className = _a.className, _d = _a.rows, rows = _d === void 0 ? 5 : _d, _e = _a.items, items = _e === void 0 ? 3 : _e, _f = _a.showMessage, showMessage = _f === void 0 ? true : _f;
    var renderContent = function () {
        switch (type) {
            case 'card':
                return (0, jsx_runtime_1.jsx)(skeleton_1.CardSkeleton, {});
            case 'table':
                return (0, jsx_runtime_1.jsx)(skeleton_1.TableSkeleton, { rows: rows });
            case 'list':
                return (0, jsx_runtime_1.jsx)(skeleton_1.ListSkeleton, { items: items });
            case 'form':
                return (0, jsx_runtime_1.jsx)(skeleton_1.FormSkeleton, {});
            case 'dashboard':
                return (0, jsx_runtime_1.jsx)(skeleton_1.DashboardSkeleton, {});
            case 'skeleton':
                return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-3/4" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-1/2" }), (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "h-4 w-2/3" })] }));
            default:
                return ((0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 border-3 border-gray-200 border-t-primary rounded-full animate-spin mx-auto" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 w-8 h-8 border-3 border-transparent border-t-primary/30 rounded-full animate-spin mx-auto", style: { 'animationDelay': '-0.5s' } })] }), showMessage && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: message }))] }));
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: (0, utils_1.cn)('flex items-center justify-center p-6', type === 'default' && 'min-h-[200px]', className), children: renderContent() }));
}
// Specialized loading components
function PageLoadingFallback() {
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: "min-h-screen flex items-center justify-center bg-background", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 bg-primary rounded-full animate-pulse" }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative", children: (0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-medium text-foreground", children: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629..." }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center space-x-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce", style: {
                                        'animationDelay': '0s'
                                    } }), (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce", style: {
                                        'animationDelay': '0.1s'
                                    } }), (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce", style: {
                                        'animationDelay': '0.2s'
                                    } })] })] })] }) }));
}
function ComponentLoadingFallback(_a) {
    var _b = _a.message, message = _b === void 0 ? 'جاري تحميل المكون...' : _b, className = _a.className;
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: (0, utils_1.cn)('flex items-center justify-center p-4', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 border-2 border-gray-200 border-t-primary rounded-full animate-spin mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: message })] }) }));
}
function OverlayLoadingFallback(_a) {
    var _b = _a.message, message = _b === void 0 ? 'جاري التحميل...' : _b, className = _a.className;
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: (0, utils_1.cn)('fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 border-3 border-gray-200 border-t-primary rounded-full animate-spin mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: message })] }) }));
}
