"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useI18n = void 0;
var react_i18next_1 = require("react-i18next");
var react_1 = require("react");
var useI18n = function () {
    var _a = (0, react_i18next_1.useTranslation)(), t = _a.t, i18n = _a.i18n;
    // Initialize RTL support on mount
    (0, react_1.useEffect)(function () {
        var currentLang = i18n.language;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLang;
    }, [i18n.language]);
    // Language switching function
    var switchLanguage = (0, react_1.useCallback)(function (language) {
        i18n.changeLanguage(language);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        localStorage.setItem('i18nextLng', language);
    }, [i18n]);
    // Toggle between Arabic and English
    var toggleLanguage = (0, react_1.useCallback)(function () {
        var newLang = i18n.language === 'ar' ? 'en' : 'ar';
        switchLanguage(newLang);
    }, [i18n.language, switchLanguage]);
    // Format date based on current language
    var formatDate = (0, react_1.useCallback)(function (date, options) {
        var dateObj = typeof date === 'string' ? new Date(date) : date;
        var locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
        return new Intl.DateTimeFormat(locale, __assign({ year: 'numeric', month: 'long', day: 'numeric' }, options)).format(dateObj);
    }, [i18n.language]);
    // Format number based on current language
    var formatNumber = (0, react_1.useCallback)(function (number, options) {
        var locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
        return new Intl.NumberFormat(locale, __assign({ minimumFractionDigits: 0, maximumFractionDigits: 2 }, options)).format(number);
    }, [i18n.language]);
    // Format currency based on current language
    var formatCurrency = (0, react_1.useCallback)(function (amount, currency) {
        if (currency === void 0) { currency = 'SAR'; }
        var locale = i18n.language === 'ar' ? 'ar-SA' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    }, [i18n.language]);
    // Check if current language is RTL
    var isRTL = i18n.language === 'ar';
    return {
        t: t,
        i18n: i18n,
        currentLanguage: i18n.language,
        switchLanguage: switchLanguage,
        toggleLanguage: toggleLanguage,
        formatDate: formatDate,
        formatNumber: formatNumber,
        formatCurrency: formatCurrency,
        isRTL: isRTL
    };
};
exports.useI18n = useI18n;
