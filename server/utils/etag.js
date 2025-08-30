"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateETag = generateETag;
exports.setETagHeader = setETagHeader;
exports.matchesIfMatchHeader = matchesIfMatchHeader;
var node_crypto_1 = require("node:crypto");
function toMillis(value) {
    if (value === null || value === undefined)
        return null;
    if (value instanceof Date)
        return value.getTime();
    if (typeof value === 'number')
        return value < 1e12 ? value * 1000 : value;
    var parsed = Number(value);
    if (!Number.isNaN(parsed))
        return parsed < 1e12 ? parsed * 1000 : parsed;
    var date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.getTime();
}
function generateETag(resource) {
    var _a;
    var idPart = (_a = resource.id) !== null && _a !== void 0 ? _a : '';
    var updatedAtMs = toMillis(resource.updatedAt);
    var base = "".concat(idPart, ":").concat(updatedAtMs !== null && updatedAtMs !== void 0 ? updatedAtMs : '');
    var hash = (0, node_crypto_1.createHash)('sha1').update(base).digest('base64');
    return "\"".concat(hash, "\"");
}
function setETagHeader(res, etag) {
    res.setHeader('ETag', etag);
}
function matchesIfMatchHeader(ifMatchHeader, currentETag) {
    if (!ifMatchHeader)
        return false;
    var values = Array.isArray(ifMatchHeader) ? ifMatchHeader : [ifMatchHeader];
    return values.some(function (v) { return v.trim() === currentETag || v.trim() === '*'; });
}
