"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var wouter_1 = require("wouter");
var routes_1 = require("../lib/routes");
var lazy_pages_1 = require("../pages/lazy-pages");
var AuthRoutes = function () { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(wouter_1.Route, { path: routes_1.routes.public.home, children: (0, jsx_runtime_1.jsx)(lazy_pages_1.CompanySelection, {}) }), (0, jsx_runtime_1.jsx)(wouter_1.Route, { path: routes_1.routes.public.login, children: (0, jsx_runtime_1.jsx)(lazy_pages_1.Login, {}) })] })); };
exports.default = AuthRoutes;
