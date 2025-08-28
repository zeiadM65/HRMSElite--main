"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LeaveRequestsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_i18next_1 = require("react-i18next");
var shared_layout_1 = require("../components/shared-layout");
function LeaveRequestsPage() {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)(shared_layout_1.SharedLayout, { userRole: "employee", userName: t('user.ahmed'), companyName: t('company.blueNileJewelry'), children: (0, jsx_runtime_1.jsx)("div", { className: "p-4", children: (0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: t('leaveRequests.pageTitle') }) }) }));
}
