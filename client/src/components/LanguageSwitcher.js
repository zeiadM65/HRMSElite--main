"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageSwitcher = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
var button_1 = require("./ui/button");
var lucide_react_1 = require("lucide-react");
var useAppStore_1 = require("../stores/useAppStore");
var LanguageSwitcher = function () {
    var _a = (0, react_i18next_1.useTranslation)(), i18n = _a.i18n, t = _a.t;
    var setLanguage = (0, useAppStore_1.useAppStore)(function (state) { return state.setLanguage; });
    (0, react_1.useEffect)(function () {
        setLanguage(i18n.language);
    }, [i18n.language, setLanguage]);
    var toggleLanguage = function () {
        var newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
        document.documentElement.dir = i18n.dir(newLang);
        document.documentElement.lang = newLang;
        localStorage.setItem('i18nextLng', newLang);
        setLanguage(newLang);
    };
    var currentLanguage = t("languages.".concat(i18n.language === 'ar' ? 'arabic' : 'english'));
    var nextLanguageKey = i18n.language === 'ar' ? 'english' : 'arabic';
    var nextLanguage = t("languages.".concat(nextLanguageKey));
    var nextLanguageShort = t("languages.short.".concat(nextLanguageKey));
    return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: toggleLanguage, className: "flex items-center gap-2", title: "".concat(t('settings.language'), ": ").concat(currentLanguage), "aria-label": "".concat(t('settings.language'), ": ").concat(nextLanguage), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Globe, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "hidden sm:inline", children: nextLanguage }), (0, jsx_runtime_1.jsx)("span", { className: "sm:hidden", children: nextLanguageShort })] }));
};
exports.LanguageSwitcher = LanguageSwitcher;
