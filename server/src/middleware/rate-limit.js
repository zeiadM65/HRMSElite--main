"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.general = void 0;
var express_rate_limit_1 = __importStar(require("express-rate-limit"));
var rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
var ioredis_1 = __importDefault(require("ioredis"));
// Configure Redis-backed rate limiter with in-memory fallback
var store;
try {
    var redisClient_1 = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379', {
        connectTimeout: 1000,
    });
    await redisClient_1.ping();
    store = new rate_limit_redis_1.default({
        sendCommand: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return redisClient_1.call.apply(redisClient_1, args);
        },
    });
}
catch (_a) {
    store = new express_rate_limit_1.MemoryStore();
}
exports.general = (0, express_rate_limit_1.default)({ store: store, windowMs: 15 * 60 * 1000, limit: 60 });
exports.login = (0, express_rate_limit_1.default)({ store: store, windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });
