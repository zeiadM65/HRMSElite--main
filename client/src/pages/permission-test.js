"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PermissionTestPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var PermissionTest_1 = require("../components/shared/PermissionTest");
var ProtectedRoute_1 = require("../components/shared/ProtectedRoute");
function PermissionTestPage() {
    return ((0, jsx_runtime_1.jsx)(ProtectedRoute_1.ProtectedRoute, { pageId: "dashboard", children: (0, jsx_runtime_1.jsxs)("main", { role: "main", className: "container mx-auto py-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: "\u0627\u062E\u062A\u0628\u0627\u0631 \u0646\u0638\u0627\u0645 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2", children: "\u0639\u0631\u0636 \u0648\u0627\u062E\u062A\u0628\u0627\u0631 \u0646\u0638\u0627\u0645 \u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0641\u064A \u0627\u0644\u062A\u0637\u0628\u064A\u0642" })] }), (0, jsx_runtime_1.jsx)(PermissionTest_1.PermissionTest, {})] }) }));
}
