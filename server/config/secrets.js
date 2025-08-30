"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_SECRET = void 0;
var reqEnv = function (name, min) {
    if (min === void 0) { min = 32; }
    var v = process.env[name];
    if (!v || v.length < min)
        throw new Error("Missing/weak env: ".concat(name));
    return v;
};
exports.SESSION_SECRET = reqEnv('SESSION_SECRET', 32);
