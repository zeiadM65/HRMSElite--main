"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWithProviders = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var react_query_1 = require("@tanstack/react-query");
var react_i18next_1 = require("react-i18next");
var react_router_dom_1 = require("react-router-dom");
var i18n_1 = __importDefault(require("@/lib/i18n"));
var theme_provider_1 = require("@/components/theme-provider");
var Providers = function (_a) {
    var children = _a.children;
    var queryClient = new react_query_1.QueryClient({
        defaultOptions: {
            queries: { retry: false, cacheTime: 0 },
            mutations: { retry: false },
        },
    });
    return ((0, jsx_runtime_1.jsx)(react_i18next_1.I18nextProvider, { i18n: i18n_1.default, children: (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: (0, jsx_runtime_1.jsx)(react_router_dom_1.MemoryRouter, { children: (0, jsx_runtime_1.jsx)(theme_provider_1.ThemeProvider, { children: (0, jsx_runtime_1.jsx)("div", { dir: i18n_1.default.dir(), children: children }) }) }) }) }));
};
var renderWithProviders = function (ui, options) { return (0, react_1.render)(ui, __assign({ wrapper: Providers }, options)); };
exports.renderWithProviders = renderWithProviders;
__exportStar(require("@testing-library/react"), exports);
