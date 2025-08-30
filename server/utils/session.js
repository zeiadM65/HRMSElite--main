"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionMiddleware = createSessionMiddleware;
var express_session_1 = __importDefault(require("express-session"));
var connect_redis_1 = require("connect-redis");
var ioredis_1 = __importDefault(require("ioredis"));
var env_1 = require("./env");
var logger_1 = require("./logger");
function createSessionMiddleware() {
    var redisClient = new ioredis_1.default(env_1.env.REDIS_URL || 'redis://localhost:6379');
    var store = new connect_redis_1.RedisStore({ client: redisClient });
    redisClient.on('error', function (err) {
        logger_1.log.error('Redis connection error', { error: err }, 'SESSION');
    });
    return (0, express_session_1.default)({
        store: store,
        secret: env_1.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        name: env_1.env.NODE_ENV === 'production' ? '__Host-hrms-elite-session' : 'hrms-elite-session',
        cookie: {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        },
    });
}
