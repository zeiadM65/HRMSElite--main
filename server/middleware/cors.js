"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictCors = void 0;
var ALLOWED = ((_a = process.env.CORS_ORIGINS) !== null && _a !== void 0 ? _a : '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
if (ALLOWED.length === 0) {
    throw new Error('CORS_ORIGINS empty: failing closed');
}
var isAllowed = function (origin) { return !!origin && ALLOWED.includes(origin); };
exports.strictCors = {
    origin: function (origin, cb) {
        var allowed = isAllowed(origin);
        cb(allowed ? null : new Error('CORS blocked'), allowed);
    },
    credentials: process.env.CORS_ALLOW_CREDENTIALS === 'true',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'X-CSRF-Token',
        'X-Requested-With',
        'Authorization'
    ]
};
exports.default = exports.strictCors;
