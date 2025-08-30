"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiVersioningRedirect = apiVersioningRedirect;
/**
 * Redirect legacy /api/* requests to versioned /api/v1/* paths and
 * attach deprecation headers referencing the new endpoint.
 */
function apiVersioningRedirect(req, res, next) {
    var originalUrl = req.url;
    if (originalUrl.startsWith('/api/') && !originalUrl.startsWith('/api/v1/')) {
        res.setHeader('Deprecation', 'true');
        res.setHeader('Link', "</api/v1".concat(originalUrl.slice(4), ">; rel=\"successor-version\""));
        req.url = "/api/v1".concat(originalUrl.slice(4));
    }
    next();
}
