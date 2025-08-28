"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csp = void 0;
exports.buildCspHeader = buildCspHeader;
var raw = process.env.CSP_CONNECT_ORIGINS || '';
var allow = raw.split(' ').map(function (s) { return s.trim(); }).filter(Boolean);
var bad = allow.find(function (a) { return a === '*' || /^https:$/.test(a) || /^wss:$/.test(a) || /^http:/.test(a); });
if (bad) {
    throw new Error("Insecure connect-src entry: ".concat(bad));
}
function buildCspHeader(nonce) {
    var connect = __spreadArray(["'self'"], allow, true).join(' ');
    return [
        "default-src 'self'",
        "script-src 'nonce-".concat(nonce, "' 'strict-dynamic'"),
        "style-src 'self' 'nonce-".concat(nonce, "'"),
        "img-src 'self' data:",
        "connect-src ".concat(connect),
        "object-src 'none'",
        "frame-ancestors 'none'",
        "base-uri 'self'"
    ].join('; ');
}
var csp = function (_req, res, next) {
    res.setHeader('Content-Security-Policy', buildCspHeader(res.locals.cspNonce));
    next();
};
exports.csp = csp;
