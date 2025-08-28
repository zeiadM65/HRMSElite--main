"use strict";
/**
 * @fileoverview Database Security Configuration and Management
 * @description Provides SQLite database support with optional encryption
 * @author HRMS Elite Team
 * @version 1.0.0
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureDbManager = exports.defaultSecurityConfig = exports.SecureDatabaseManager = void 0;
var better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
var better_sqlite3_2 = __importDefault(require("better-sqlite3"));
var schema = __importStar(require("@shared/schema"));
var logger_1 = require("./logger");
var env_1 = require("./env");
var SecureDatabaseManager = /** @class */ (function () {
    function SecureDatabaseManager(config) {
        this.database = null;
        this.drizzleDb = null;
        this.config = __assign({ encryption: {
                enabled: process.env.DB_ENCRYPTION_ENABLED === 'true',
                algorithm: 'AES-256',
                keyDerivation: 'PBKDF2',
                iterations: 100000
            }, backup: {
                enabled: process.env.DB_BACKUP_ENABLED !== 'false',
                schedule: process.env.DB_BACKUP_SCHEDULE || '0 2 * * *', // Daily at 2 AM
                retention: {
                    daily: parseInt(process.env.DB_BACKUP_RETENTION_DAILY || '7'),
                    weekly: parseInt(process.env.DB_BACKUP_RETENTION_WEEKLY || '4'),
                    monthly: parseInt(process.env.DB_BACKUP_RETENTION_MONTHLY || '12')
                },
                encryption: true,
                compression: true
            }, audit: {
                enabled: process.env.DB_AUDIT_ENABLED === 'true',
                logQueries: process.env.DB_AUDIT_LOG_QUERIES === 'true',
                logConnections: process.env.DB_AUDIT_LOG_CONNECTIONS === 'true'
            }, performance: {
                walMode: true,
                synchronous: 'NORMAL',
                cacheSize: parseInt(process.env.DB_CACHE_SIZE || '2000'),
                mmapSize: parseInt(process.env.DB_MMAP_SIZE || '268435456') // 256MB
            } }, config);
        this.encryptionKey = env_1.env.DB_ENCRYPTION_KEY;
        this.previousEncryptionKey = env_1.env.DB_ENCRYPTION_KEY_PREVIOUS;
    }
    /**
     * Initialize secure database connection
     */
    SecureDatabaseManager.prototype.initializeDatabase = function (dbPath) {
        return __awaiter(this, void 0, void 0, function () {
            var databasePath, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        databasePath = dbPath || env_1.env.DATABASE_URL || 'dev.db';
                        if (this.config.encryption.enabled) {
                            if (!this.encryptionKey || this.encryptionKey.length < 32) {
                                throw new Error('DB_ENCRYPTION_KEY is required and must be at least 32 characters');
                            }
                            // Use SQLite for encrypted database
                            this.database = new better_sqlite3_2.default(databasePath);
                            // Set encryption key and verify
                            this.database.pragma("key = '".concat(this.encryptionKey, "'"));
                            try {
                                this.database.prepare('SELECT 1').get();
                            }
                            catch (err) {
                                if (this.previousEncryptionKey) {
                                    this.database.pragma("key = '".concat(this.previousEncryptionKey, "'"));
                                    this.database.prepare('SELECT 1').get();
                                    this.database.pragma("rekey = '".concat(this.encryptionKey, "'"));
                                    this.database.pragma("key = '".concat(this.encryptionKey, "'"));
                                    logger_1.log.info('Database encryption key rotated');
                                }
                                else {
                                    throw err;
                                }
                            }
                            // Configure encryption
                            logger_1.log.info('Database initialized with encryption enabled');
                        }
                        else {
                            // Use regular SQLite
                            this.database = new better_sqlite3_2.default(databasePath);
                            logger_1.log.info('Database initialized without encryption');
                        }
                        // Apply performance optimizations
                        this.applyPerformanceSettings();
                        // Setup audit logging if enabled
                        if (this.config.audit.enabled) {
                            this.setupAuditLogging();
                        }
                        // Initialize Drizzle ORM
                        this.drizzleDb = (0, better_sqlite3_1.drizzle)(this.database, { schema: schema });
                        // Test database connection
                        return [4 /*yield*/, this.testConnection()];
                    case 1:
                        // Test database connection
                        _a.sent();
                        return [2 /*return*/, this.drizzleDb];
                    case 2:
                        error_1 = _a.sent();
                        logger_1.log.error('Failed to initialize secure database:', error_1);
                        throw new Error("Database initialization failed: ".concat(error_1.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Apply performance settings to database
     */
    SecureDatabaseManager.prototype.applyPerformanceSettings = function () {
        if (!this.database)
            return;
        try {
            // Enable WAL mode for better concurrency
            if (this.config.performance.walMode) {
                this.database.pragma('journal_mode = WAL');
            }
            // Set synchronous mode
            this.database.pragma("synchronous = ".concat(this.config.performance.synchronous));
            // Set cache size
            this.database.pragma("cache_size = ".concat(this.config.performance.cacheSize));
            // Set memory-mapped I/O size
            this.database.pragma("mmap_size = ".concat(this.config.performance.mmapSize));
            // Enable foreign keys
            this.database.pragma('foreign_keys = ON');
            logger_1.log.info('Database performance settings applied');
        }
        catch (error) {
            logger_1.log.error('Failed to apply performance settings:', error);
        }
    };
    /**
     * Setup audit logging
     */
    SecureDatabaseManager.prototype.setupAuditLogging = function () {
        if (!this.database || !this.config.audit.enabled)
            return;
        try {
            // Create audit log table if it doesn't exist
            this.database.exec("\n        CREATE TABLE IF NOT EXISTS audit_log (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          timestamp INTEGER NOT NULL DEFAULT (unixepoch()),\n          event_type TEXT NOT NULL,\n          table_name TEXT,\n          operation TEXT,\n          user_id TEXT,\n          ip_address TEXT,\n          user_agent TEXT,\n          query_hash TEXT,\n          affected_rows INTEGER,\n          execution_time REAL,\n          details TEXT\n        )\n      ");
            // Create index for performance
            this.database.exec("\n        CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON audit_log(timestamp);\n        CREATE INDEX IF NOT EXISTS idx_audit_log_event_type ON audit_log(event_type);\n        CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);\n      ");
            logger_1.log.info('Audit logging initialized');
        }
        catch (error) {
            logger_1.log.error('Failed to setup audit logging:', error);
        }
    };
    /**
     * Test database connection
     */
    SecureDatabaseManager.prototype.testConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, encryptionTest;
            return __generator(this, function (_a) {
                if (!this.database)
                    throw new Error('Database not initialized');
                try {
                    result = this.database.prepare('SELECT 1 as test').get();
                    if ((result === null || result === void 0 ? void 0 : result.test) !== 1) {
                        throw new Error('Database connection test failed');
                    }
                    // Test encryption if enabled
                    if (this.config.encryption.enabled) {
                        encryptionTest = this.database.pragma('cipher_version');
                        if (!encryptionTest) {
                            throw new Error('Database encryption verification failed');
                        }
                        logger_1.log.info('Database encryption verified');
                    }
                    logger_1.log.info('Database connection test successful');
                }
                catch (error) {
                    logger_1.log.error('Database connection test failed:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Get database status and security information
     */
    SecureDatabaseManager.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var stats, pageCount, pageSize, fileSize, walSize, walInfo, recommendations, securityLevel;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                try {
                    stats = ((_a = this.database) === null || _a === void 0 ? void 0 : _a.prepare('PRAGMA database_list').all()) || [];
                    pageCount = (_b = this.database) === null || _b === void 0 ? void 0 : _b.prepare('PRAGMA page_count').get();
                    pageSize = (_c = this.database) === null || _c === void 0 ? void 0 : _c.prepare('PRAGMA page_size').get();
                    fileSize = ((pageCount === null || pageCount === void 0 ? void 0 : pageCount.page_count) || 0) * ((pageSize === null || pageSize === void 0 ? void 0 : pageSize.page_size) || 0);
                    walSize = void 0;
                    try {
                        walInfo = (_d = this.database) === null || _d === void 0 ? void 0 : _d.prepare('PRAGMA wal_checkpoint(PASSIVE)').get();
                        walSize = walInfo ? walInfo.pages_in_wal * ((pageSize === null || pageSize === void 0 ? void 0 : pageSize.page_size) || 0) : 0;
                    }
                    catch (_f) {
                        // WAL mode not enabled or other error
                    }
                    recommendations = [];
                    securityLevel = 'LOW';
                    // Security assessment
                    if (this.config.encryption.enabled) {
                        securityLevel = 'HIGH';
                    }
                    else {
                        recommendations.push('Enable database encryption for production use');
                        securityLevel = 'MEDIUM';
                    }
                    if (!this.config.backup.enabled) {
                        recommendations.push('Enable automated backups');
                        if (securityLevel === 'HIGH')
                            securityLevel = 'MEDIUM';
                    }
                    if (!this.config.audit.enabled) {
                        recommendations.push('Enable audit logging for compliance');
                    }
                    if (!this.config.performance.walMode) {
                        recommendations.push('Enable WAL mode for better performance');
                    }
                    return [2 /*return*/, {
                            encrypted: this.config.encryption.enabled,
                            backupEnabled: this.config.backup.enabled,
                            fileSize: fileSize,
                            walSize: walSize,
                            connections: 1, // SQLite is single-connection
                            securityLevel: securityLevel,
                            recommendations: recommendations
                        }];
                }
                catch (error) {
                    logger_1.log.error('Failed to get database status:', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Close database connection
     */
    SecureDatabaseManager.prototype.close = function () {
        try {
            if (this.database) {
                this.database.close();
                this.database = null;
                this.drizzleDb = null;
                logger_1.log.info('Database connection closed');
            }
        }
        catch (error) {
            logger_1.log.error('Error closing database:', error);
        }
    };
    /**
     * Get database instance (Drizzle ORM)
     */
    SecureDatabaseManager.prototype.getDatabase = function () {
        return this.drizzleDb;
    };
    /**
     * Get raw SQLite database instance
     */
    SecureDatabaseManager.prototype.getRawDatabase = function () {
        return this.database;
    };
    /**
     * Get configuration
     */
    SecureDatabaseManager.prototype.getConfig = function () {
        return __assign({}, this.config);
    };
    return SecureDatabaseManager;
}());
exports.SecureDatabaseManager = SecureDatabaseManager;
// Default configuration
exports.defaultSecurityConfig = {
    encryption: {
        enabled: process.env.NODE_ENV === 'production',
        algorithm: 'AES-256',
        keyDerivation: 'PBKDF2',
        iterations: 100000
    },
    backup: {
        enabled: true,
        schedule: '0 2 * * *',
        retention: {
            daily: 7,
            weekly: 4,
            monthly: 12
        },
        encryption: true,
        compression: true
    },
    audit: {
        enabled: process.env.NODE_ENV === 'production',
        logQueries: false, // Can be performance intensive
        logConnections: true
    },
    performance: {
        walMode: true,
        synchronous: 'NORMAL',
        cacheSize: 2000,
        mmapSize: 268435456
    }
};
// Create singleton instance
exports.secureDbManager = new SecureDatabaseManager(exports.defaultSecurityConfig);
// Command-line interface
if (import.meta.url === "file://".concat(process.argv[1])) {
    var command_1 = process.argv[2];
    var runCommand = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, status_1, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = command_1;
                    switch (_a) {
                        case '--status': return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, exports.secureDbManager.initializeDatabase()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, exports.secureDbManager.getStatus()];
                case 3:
                    status_1 = _b.sent();
                    console.log('🔒 Database Security Status:');
                    console.log('Encrypted:', status_1.encrypted ? '✅' : '❌');
                    console.log('Backup Enabled:', status_1.backupEnabled ? '✅' : '❌');
                    console.log('File Size:', Math.round(status_1.fileSize / 1024 / 1024 * 100) / 100, 'MB');
                    if (status_1.walSize) {
                        console.log('WAL Size:', Math.round(status_1.walSize / 1024 / 1024 * 100) / 100, 'MB');
                    }
                    console.log('Security Level:', status_1.securityLevel);
                    if (status_1.recommendations.length > 0) {
                        console.log('\n📋 Recommendations:');
                        status_1.recommendations.forEach(function (rec, index) {
                            console.log("".concat(index + 1, ". ").concat(rec));
                        });
                    }
                    exports.secureDbManager.close();
                    return [3 /*break*/, 5];
                case 4:
                    console.log('Usage: tsx server/utils/dbSecurity.ts --status');
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _b.sent();
                    console.error('❌ Command failed:', error_2);
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    runCommand();
}
