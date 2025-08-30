"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
var express_rate_limit_1 = require("express-rate-limit");
var rate_limit_redis_1 = require("rate-limit-redis");
var redis_1 = require("redis");
var client = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
await client.connect();
exports.limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    store: new rate_limit_redis_1.RedisStore({ sendCommand: function () {
            var a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
            }
            return client.sendCommand(a);
        } }),
    skipFailedRequests: false
});
