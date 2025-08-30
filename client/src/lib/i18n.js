"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var i18next_1 = __importDefault(require("i18next"));
var react_i18next_1 = require("react-i18next");
var i18next_browser_languagedetector_1 = __importDefault(require("i18next-browser-languagedetector"));
var i18next_http_backend_1 = __importDefault(require("i18next-http-backend"));
// Import locale files
var en_json_1 = __importDefault(require("../locales/en.json"));
var ar_json_1 = __importDefault(require("../locales/ar.json"));
var resources = {
    en: {
        translation: en_json_1.default
    },
    ar: {
        translation: ar_json_1.default
    }
};
i18next_1.default
    .use(i18next_http_backend_1.default)
    .use(i18next_browser_languagedetector_1.default)
    .use(react_i18next_1.initReactI18next)
    .init({
    resources: resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    initImmediate: false,
    interpolation: {
        escapeValue: false, // React already escapes values
        format: function (value, format, lng, options) {
            var resolvedFormat = format === 'format' && typeof (options === null || options === void 0 ? void 0 : options.format) === 'string'
                ? options.format
                : format;
            var locale = lng === 'ar' ? 'ar-SA' : 'en-US';
            if (resolvedFormat === 'number') {
                return new Intl.NumberFormat(locale).format(value);
            }
            if (resolvedFormat === 'date') {
                var date = value instanceof Date ? value : new Date(value);
                return new Intl.DateTimeFormat(locale).format(date);
            }
            return value;
        }
    },
    detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
    },
    react: {
        useSuspense: false,
    },
    // RTL support
    dir: function (lng) {
        return lng === 'ar' ? 'rtl' : 'ltr';
    }
});
exports.default = i18next_1.default;
