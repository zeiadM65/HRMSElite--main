"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coopCoep = coopCoep;
function coopCoep(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    }
    next();
}
