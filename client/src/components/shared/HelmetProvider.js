"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelmetProvider = HelmetProvider;
exports.usePageMeta = usePageMeta;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_helmet_async_1 = require("react-helmet-async");
function HelmetProvider(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)(react_helmet_async_1.HelmetProvider, { children: children }));
}
// Custom hook for page-specific meta tags
function usePageMeta() {
    var setPageMeta = function (meta) {
        var _a, _b, _c, _d, _e;
        return {
            'title': meta.title ? "".concat(meta.title, " - HRMS Elite") : 'HRMS Elite - نظام إدارة الموارد البشرية',
            'description': (_a = meta.description) !== null && _a !== void 0 ? _a : "نظام إدارة الموارد البشرية الشامل والمتقدم للشركات والمؤسسات",
            'keywords': (_b = meta.keywords) !== null && _b !== void 0 ? _b : "إدارة الموارد البشرية, HRMS, نظام إدارة, شركات, موظفين",
            'ogImage': (_c = meta.ogImage) !== null && _c !== void 0 ? _c : "/logo.svg",
            'ogType': (_d = meta.ogType) !== null && _d !== void 0 ? _d : "website",
            'canonical': (_e = meta.canonical) !== null && _e !== void 0 ? _e : window.location.href
        };
    };
    return { setPageMeta: setPageMeta };
}
