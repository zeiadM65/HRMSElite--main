"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactQueryDevTools = ReactQueryDevTools;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_query_devtools_1 = require("@tanstack/react-query-devtools");
function ReactQueryDevTools(_a) {
    var _b = _a.initialIsOpen, initialIsOpen = _b === void 0 ? false : _b;
    // Only show devtools in development
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(react_query_devtools_1.ReactQueryDevtools, { initialIsOpen: initialIsOpen, buttonPosition: "bottom-right" }));
}
