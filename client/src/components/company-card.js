"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyCard = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var card_1 = require("./ui/card");
var button_1 = require("./ui/button");
var badge_1 = require("./ui/badge");
var react_2 = require("react");
var login_modal_1 = require("./login-modal");
exports.CompanyCard = react_1.default.memo(function (_a) {
    var _b;
    var company = _a.company;
    var _c = (0, react_2.useState)(false), showLoginModal = _c[0], setShowLoginModal = _c[1];
    var getStatusBadge = function (status) {
        if (status) {
            return (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", children: "\u0633\u0627\u0631\u064A" });
        }
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300", children: "\u0642\u0631\u064A\u0628 \u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621" });
    };
    var getCompanyInitials = function (name) {
        var words = name.split(' ');
        return words.slice(0, 2).map(function (word) { return word.charAt(0); }).join(' ');
    };
    var getGradientColor = function (index) {
        var colors = [
            'from-blue-500 to-blue-600',
            'from-green-500 to-green-600',
            'from-purple-500 to-purple-600',
            'from-orange-500 to-orange-600',
            'from-pink-500 to-pink-600',
            'from-indigo-500 to-indigo-600'
        ];
        return colors[index % colors.length];
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center mb-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 bg-gradient-to-br ".concat(getGradientColor(0), " rounded-lg flex items-center justify-center"), children: (0, jsx_runtime_1.jsx)("span", { className: "text-white font-bold text-xl", children: getCompanyInitials(company.name) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mr-4 flex-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-foreground truncate", children: company.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: (_b = company.classification) !== null && _b !== void 0 ? _b : "غير محدد" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0639\u062F\u062F \u0627\u0644\u0639\u0645\u0627\u0644:" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-foreground", children: company.totalEmployees })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635:" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium text-foreground", children: company.totalLicenses })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0644\u0641:" }), getStatusBadge(company.commercialFileStatus)] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-6 pt-4 border-t border-border", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", onClick: function () { return setShowLoginModal(true); }, children: "\u062F\u062E\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0646\u0638\u0627\u0645" }) })] }) }), (0, jsx_runtime_1.jsx)(login_modal_1.LoginModal, { company: company, isOpen: showLoginModal, onClose: function () { return setShowLoginModal(false); } })] }));
});
