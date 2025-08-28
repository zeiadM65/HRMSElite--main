"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("react-dom/client");
var App_1 = __importDefault(require("./App"));
require("./index.css");
require("./lib/i18n");
var vitals_1 = require("./vitals");
var maybeDocument = globalThis.document;
var rootElement = typeof (maybeDocument === null || maybeDocument === void 0 ? void 0 : maybeDocument.getElementById) === 'function' ? maybeDocument.getElementById('root') : null;
if (rootElement) {
    var unsafeCreateRoot = client_1.createRoot;
    unsafeCreateRoot(rootElement).render((0, jsx_runtime_1.jsx)(App_1.default, {}));
}
if (typeof window !== 'undefined') {
    (0, vitals_1.initWebVitals)();
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            var swUrl = "/sw.js?build=".concat(__BUILD_HASH__);
            navigator.serviceWorker.register(swUrl).catch(function (err) {
                console.error('Service worker registration failed:', err);
            });
        });
    }
}
