"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDirection = useDirection;
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
/**
 * Hook to update the document direction and language based on i18n settings.
 * Sets `<html dir>` and `<html lang>` whenever the active language changes.
 */
function useDirection() {
    var i18n = (0, react_i18next_1.useTranslation)().i18n;
    (0, react_1.useEffect)(function () {
        var dir = i18n.dir(i18n.language);
        var html = document.documentElement;
        html.setAttribute('dir', dir === 'rtl' ? 'rtl' : 'ltr');
        html.setAttribute('lang', i18n.language);
    }, [i18n.language, i18n]);
}
