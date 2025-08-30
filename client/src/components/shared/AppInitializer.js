"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializationDebugger = exports.AppInitializer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var useAppInitialization_1 = require("../../hooks/useAppInitialization");
var card_1 = require("../ui/card");
var lucide_react_1 = require("lucide-react");
var AppInitializer = function (_a) {
    var children = _a.children, fallback = _a.fallback;
    var _b = (0, useAppInitialization_1.useAppInitialization)(), isReady = _b.isReady, isInitialized = _b.isInitialized, hydrationComplete = _b.hydrationComplete;
    // Default loading screen
    var defaultFallback = ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-96 shadow-lg", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-8 text-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center space-y-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-12 w-12 animate-spin text-blue-600" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-gray-900", children: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642..." }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-600", children: [!hydrationComplete && 'جاري استعادة البيانات المحفوظة...', hydrationComplete && !isInitialized && 'جاري التحقق من صحة البيانات...', isInitialized && !isReady && 'جاري إكمال التهيئة...'] })] })] }) }) }) }));
    if (!isReady) {
        return fallback || defaultFallback;
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.AppInitializer = AppInitializer;
// Component for debugging initialization state
var InitializationDebugger = function () {
    var _a = (0, useAppInitialization_1.useAppInitialization)(), isReady = _a.isReady, isInitialized = _a.isInitialized, hydrationComplete = _a.hydrationComplete;
    if (process.env.NODE_ENV === 'development') {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs z-50", children: [(0, jsx_runtime_1.jsxs)("div", { children: ["Ready: ", isReady ? '✅' : '❌'] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Initialized: ", isInitialized ? '✅' : '❌'] }), (0, jsx_runtime_1.jsxs)("div", { children: ["Hydrated: ", hydrationComplete ? '✅' : '❌'] })] }));
    }
    return null;
};
exports.InitializationDebugger = InitializationDebugger;
