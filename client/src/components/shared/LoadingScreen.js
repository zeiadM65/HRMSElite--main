"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingScreen = LoadingScreen;
exports.CompactLoadingScreen = CompactLoadingScreen;
exports.OverlayLoadingScreen = OverlayLoadingScreen;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
function LoadingScreen(_a) {
    var _b = _a.message, message = _b === void 0 ? 'جاري تحميل الصفحة...' : _b, className = _a.className;
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: (0, utils_1.cn)('min-h-screen flex items-center justify-center bg-background', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-8", children: (0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 bg-primary rounded-full animate-pulse" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 w-12 h-12 border-4 border-transparent border-t-primary/30 rounded-full animate-spin mx-auto", style: { 'animationDelay': '-0.5s' } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-medium text-foreground", children: message }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center space-x-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce", style: {
                                        'animationDelay': '0s'
                                    } }), (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce", style: {
                                        'animationDelay': '0.1s'
                                    } }), (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce", style: {
                                        'animationDelay': '0.2s'
                                    } })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-48 mx-auto", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-1", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-primary h-1 rounded-full animate-pulse", style: { 'width': '60%' } }) }) })] }) }));
}
// Variant for smaller loading screens
function CompactLoadingScreen(_a) {
    var _b = _a.message, message = _b === void 0 ? 'جاري التحميل...' : _b, className = _a.className;
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: (0, utils_1.cn)('flex items-center justify-center p-8 bg-background/50 backdrop-blur-sm', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 border-3 border-gray-200 border-t-primary rounded-full animate-spin mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: message })] }) }));
}
// Variant for overlay loading
function OverlayLoadingScreen(_a) {
    var _b = _a.message, message = _b === void 0 ? 'جاري تحميل المحتوى...' : _b, className = _a.className;
    return ((0, jsx_runtime_1.jsx)("div", { role: "status", "aria-live": "polite", className: (0, utils_1.cn)('fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 border-3 border-gray-200 border-t-primary rounded-full animate-spin mx-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: message })] }) }));
}
