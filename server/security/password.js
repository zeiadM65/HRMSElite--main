"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.hash = void 0;
var argon2_1 = __importDefault(require("argon2"));
var hash = function (p) { return argon2_1.default.hash(p, { type: argon2_1.default.argon2id, timeCost: 3, memoryCost: 19456, parallelism: 1 }); };
exports.hash = hash;
var verify = function (h, p) { return argon2_1.default.verify(h, p); };
exports.verify = verify;
