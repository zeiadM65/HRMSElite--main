"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffDays = exports.plusDays = exports.parseUnix = exports.fmt = void 0;
var date_fns_1 = require("date-fns");
var fmt = function (d, mask) {
    if (mask === void 0) { mask = 'yyyy-MM-dd'; }
    return (0, date_fns_1.format)(typeof d === 'string' ? (0, date_fns_1.parseISO)(d) : d instanceof Date ? d : new Date(d), mask);
};
exports.fmt = fmt;
var parseUnix = function (sec) { return (0, date_fns_1.fromUnixTime)(sec); };
exports.parseUnix = parseUnix;
var plusDays = function (d, n) {
    return (0, date_fns_1.addDays)(typeof d === 'string' ? (0, date_fns_1.parseISO)(d) : d, n);
};
exports.plusDays = plusDays;
var diffDays = function (a, b) { return (0, date_fns_1.differenceInDays)(a, b); };
exports.diffDays = diffDays;
