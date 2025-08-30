"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AttendancePage;
var jsx_runtime_1 = require("react/jsx-runtime");
var shared_layout_1 = require("../components/shared-layout");
var react_i18next_1 = require("react-i18next");
function AttendancePage() {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)(shared_layout_1.SharedLayout, { userRole: "employee", userName: t('attendance.userName'), companyName: t('attendance.companyName'), children: (0, jsx_runtime_1.jsxs)("div", { className: "p-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold mb-4", children: t('attendance.title') }), (0, jsx_runtime_1.jsx)("p", { children: t('attendance.description') })] }) }));
}
