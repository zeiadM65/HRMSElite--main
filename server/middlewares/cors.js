"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var index_1 = require("../index");
var corsOptions = {
    origin: ['https://trusted-domain.com'], // تقييد الوصول للدومينات الموثوقة فقط
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
index_1.app.use((0, cors_1.default)(corsOptions));
