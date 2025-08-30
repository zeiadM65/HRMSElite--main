"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheControlGuard = cacheControlGuard;
var STATIC_ASSET = /\.(?:css|js|mjs|html|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|map)$/i;
// Middleware to prevent caching of sensitive responses
function cacheControlGuard(req, res, next) {
    if (!STATIC_ASSET.test(req.path)) {
        res.setHeader('Cache-Control', 'no-store, private');
    }
    next();
}
