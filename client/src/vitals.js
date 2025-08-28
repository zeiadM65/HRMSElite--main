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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebVitals = initWebVitals;
var web_vitals_1 = require("web-vitals");
var token = typeof import.meta !== 'undefined' ? (_a = import.meta.env) === null || _a === void 0 ? void 0 : _a.VITE_METRICS_TOKEN : undefined;
function sendToServer(metric) {
    try {
        var body = JSON.stringify({ name: metric.name, value: metric.value });
        fetch('/metrics/vitals', {
            method: 'POST',
            keepalive: true,
            credentials: 'include',
            headers: __assign({ 'Content-Type': 'application/json' }, (token ? { Authorization: "Bearer ".concat(token) } : {})),
            body: body
        }).catch(function () {
            /* Ignore errors */
        });
    }
    catch (_a) {
        /* Ignore errors */
    }
}
function initWebVitals() {
    (0, web_vitals_1.onCLS)(sendToServer);
    (0, web_vitals_1.onINP)(sendToServer);
    (0, web_vitals_1.onLCP)(sendToServer);
}
