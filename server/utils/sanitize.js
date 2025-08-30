"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeHtmlString = sanitizeHtmlString;
exports.deepSanitize = deepSanitize;
var sanitize_html_1 = __importDefault(require("sanitize-html"));
var options = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'br', 'span'],
    allowedAttributes: {
        a: ['href', 'name', 'target']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel']
};
function sanitizeHtmlString(input) {
    return (0, sanitize_html_1.default)(input, options);
}
function deepSanitize(input) {
    if (typeof input === 'string') {
        return sanitizeHtmlString(input);
    }
    if (Array.isArray(input)) {
        return input.map(function (item) { return deepSanitize(item); });
    }
    if (input && typeof input === 'object') {
        return Object.fromEntries(Object.entries(input).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, deepSanitize(value)];
        }));
    }
    return input;
}
