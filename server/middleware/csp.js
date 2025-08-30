"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csp = void 0;
var helmet_1 = require("helmet");
exports.csp = (0, helmet_1.contentSecurityPolicy)({
    useDefaults: true,
    directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'strict-dynamic'", "'nonce-{nonce}'"],
        "style-src": ["'self'"],
        "connect-src": ["'self'", "https://trusted-domain.com"], // اضغط على دومينات موثوقة فقط
        "object-src": ["'none'"],
        "frame-ancestors": ["'none'"]
    }
});
