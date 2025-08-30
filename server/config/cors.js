"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var raw = process.env.CORS_ORIGINS || '';
var ALLOWED = raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
if (!ALLOWED.length) {
    throw new Error('CORS_ORIGINS must be set');
}
var corsOptions = {
    origin: function (origin, cb) {
        if (!origin)
            return cb(new Error('CORS: Missing Origin'), false);
        if (ALLOWED.includes(origin))
            return cb(null, true);
        return cb(new Error('CORS: Origin not allowed'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'If-None-Match', 'If-Match'],
    exposedHeaders: ['ETag'],
    maxAge: 600,
};
exports.default = (0, cors_1.default)(corsOptions);
