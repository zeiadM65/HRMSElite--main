"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlite = exports.db = void 0;
var dbSecurity_1 = require("../utils/dbSecurity");
var env_1 = require("../utils/env");
await dbSecurity_1.secureDbManager.initializeDatabase(env_1.env.DATABASE_URL);
exports.db = dbSecurity_1.secureDbManager.getDatabase();
exports.sqlite = dbSecurity_1.secureDbManager.getRawDatabase();
