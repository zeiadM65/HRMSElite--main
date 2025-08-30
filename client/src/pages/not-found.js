"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFound;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("../components/ui/card");
var lucide_react_1 = require("lucide-react");
var react_i18next_1 = require("react-i18next");
function NotFound() {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)("main", { role: "main", className: "min-h-screen w-full flex items-center justify-center bg-gray-50", children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full max-w-md mx-4", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "pt-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex mb-4 gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-8 w-8 text-red-500" }), (0, jsx_runtime_1.jsxs)("h1", { className: "text-2xl font-bold text-gray-900", children: ["404 ", t('errors.notFound')] })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-4 text-sm text-gray-600", children: t('errors.notFoundDescription') })] }) }) }));
}
