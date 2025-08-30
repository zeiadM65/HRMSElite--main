"use strict";
/**
 * @fileoverview Database Backup and Restore System
 * @description Provides encrypted backup and restore functionality for SQLite databases
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
exports.dbBackupManager = exports.DatabaseBackupManager = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var node_crypto_1 = __importDefault(require("node:crypto"));
var tar = __importStar(require("tar"));
var node_cron_1 = __importDefault(require("node-cron"));
var dbSecurity_1 = require("./dbSecurity");
var logger_1 = require("./logger");
require("dotenv/config");
var DatabaseBackupManager = /** @class */ (function () {
    function DatabaseBackupManager(config) {
        this.cronJob = null;
        this.config = __assign({ backupDir: process.env.DB_BACKUP_DIR || path_1.default.join(process.cwd(), 'backups'), encryptionKey: process.env.DB_BACKUP_ENCRYPTION_KEY || node_crypto_1.default.randomBytes(32).toString('hex'), compression: process.env.DB_BACKUP_COMPRESSION !== 'false', retention: {
                daily: parseInt(process.env.DB_BACKUP_RETENTION_DAILY || '7'),
                weekly: parseInt(process.env.DB_BACKUP_RETENTION_WEEKLY || '4'),
                monthly: parseInt(process.env.DB_BACKUP_RETENTION_MONTHLY || '12')
            }, schedule: process.env.DB_BACKUP_SCHEDULE || '0 2 * * *', testRestore: process.env.DB_BACKUP_TEST_RESTORE === 'true' }, config);
        this.ensureBackupDirectory();
    }
    /**
     * Ensure backup directory exists
     */
    DatabaseBackupManager.prototype.ensureBackupDirectory = function () {
        try {
            if (!fs_1.default.existsSync(this.config.backupDir)) {
                fs_1.default.mkdirSync(this.config.backupDir, { recursive: true });
                logger_1.log.info('Created backup directory:', this.config.backupDir);
            }
        }
        catch (error) {
            logger_1.log.error('Failed to create backup directory:', error);
            throw error;
        }
    };
    /**
     * Generate backup ID
     */
    DatabaseBackupManager.prototype.generateBackupId = function () {
        var timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        return "backup-".concat(timestamp, "-").concat(node_crypto_1.default.randomBytes(4).toString('hex'));
    };
    /**
     * Calculate file checksum
     */
    DatabaseBackupManager.prototype.calculateChecksum = function (filePath) {
        var hash = node_crypto_1.default.createHash('sha256');
        var data = fs_1.default.readFileSync(filePath);
        hash.update(data);
        return hash.digest('hex');
    };
    /**
     * Encrypt file
     */
    DatabaseBackupManager.prototype.encryptFile = function (inputPath, outputPath) {
        var key = node_crypto_1.default.scryptSync(this.config.encryptionKey, 'salt', 32);
        var iv = node_crypto_1.default.randomBytes(12);
        var data = fs_1.default.readFileSync(inputPath);
        var cipher = node_crypto_1.default.createCipheriv('aes-256-gcm', key, iv);
        var ciphertext = Buffer.concat([cipher.update(data), cipher.final()]);
        var tag = cipher.getAuthTag();
        fs_1.default.writeFileSync(outputPath, ciphertext);
        return { iv: iv.toString('base64'), tag: tag.toString('base64') };
    };
    /**
     * Decrypt file
     */
    DatabaseBackupManager.prototype.decryptFile = function (inputPath, outputPath, iv, tag) {
        var key = node_crypto_1.default.scryptSync(this.config.encryptionKey, 'salt', 32);
        var ivBuf = Buffer.from(iv, 'base64');
        var tagBuf = Buffer.from(tag, 'base64');
        var encryptedData = fs_1.default.readFileSync(inputPath);
        var decipher = node_crypto_1.default.createDecipheriv('aes-256-gcm', key, ivBuf);
        decipher.setAuthTag(tagBuf);
        var decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        fs_1.default.writeFileSync(outputPath, decrypted);
    };
    /**
     * Create database backup
     */
    DatabaseBackupManager.prototype.createBackup = function (dbPath_1) {
        return __awaiter(this, arguments, void 0, function (dbPath, type) {
            var databasePath, backupId, timestamp, tempBackupPath, walPath, tempWalPath, shmPath, tempShmPath, finalBackupPath, iv, tag, compressedPath, filesToCompress, encryptedPath, checksum, fileStats, metadata, metadataPath, error_1;
            var _a;
            if (type === void 0) { type = 'manual'; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        databasePath = dbPath || process.env.DATABASE_URL || 'dev.db';
                        backupId = this.generateBackupId();
                        timestamp = new Date();
                        logger_1.log.info('Starting database backup:', { backupId: backupId, databasePath: databasePath });
                        // Ensure database exists
                        if (!fs_1.default.existsSync(databasePath)) {
                            throw new Error("Database file not found: ".concat(databasePath));
                        }
                        tempBackupPath = path_1.default.join(this.config.backupDir, "".concat(backupId, ".tmp"));
                        // Copy database file
                        fs_1.default.copyFileSync(databasePath, tempBackupPath);
                        walPath = "".concat(databasePath, "-wal");
                        tempWalPath = "".concat(tempBackupPath, "-wal");
                        if (fs_1.default.existsSync(walPath)) {
                            fs_1.default.copyFileSync(walPath, tempWalPath);
                        }
                        shmPath = "".concat(databasePath, "-shm");
                        tempShmPath = "".concat(tempBackupPath, "-shm");
                        if (fs_1.default.existsSync(shmPath)) {
                            fs_1.default.copyFileSync(shmPath, tempShmPath);
                        }
                        finalBackupPath = tempBackupPath;
                        iv = void 0;
                        tag = void 0;
                        if (!this.config.compression) return [3 /*break*/, 2];
                        compressedPath = path_1.default.join(this.config.backupDir, "".concat(backupId, ".tar.gz"));
                        filesToCompress = [tempBackupPath];
                        if (fs_1.default.existsSync(tempWalPath))
                            filesToCompress.push(tempWalPath);
                        if (fs_1.default.existsSync(tempShmPath))
                            filesToCompress.push(tempShmPath);
                        return [4 /*yield*/, tar.create({
                                gzip: true,
                                file: compressedPath,
                                cwd: this.config.backupDir
                            }, filesToCompress.map(function (f) { return path_1.default.basename(f); }))];
                    case 1:
                        _b.sent();
                        // Clean up temp files
                        filesToCompress.forEach(function (f) {
                            if (fs_1.default.existsSync(f))
                                fs_1.default.unlinkSync(f);
                        });
                        finalBackupPath = compressedPath;
                        _b.label = 2;
                    case 2:
                        // Encrypt if needed
                        if (this.config.encryptionKey) {
                            encryptedPath = "".concat(finalBackupPath, ".enc");
                            (_a = this.encryptFile(finalBackupPath, encryptedPath), iv = _a.iv, tag = _a.tag);
                            // Remove unencrypted file
                            fs_1.default.unlinkSync(finalBackupPath);
                            finalBackupPath = encryptedPath;
                        }
                        checksum = this.calculateChecksum(finalBackupPath);
                        fileStats = fs_1.default.statSync(finalBackupPath);
                        metadata = {
                            id: backupId,
                            timestamp: timestamp,
                            size: fileStats.size,
                            compressed: this.config.compression,
                            encrypted: !!this.config.encryptionKey,
                            checksum: checksum,
                            dbVersion: '1.0.0', // Could be dynamic
                            type: type,
                            originalPath: databasePath
                        };
                        if (iv && tag) {
                            metadata.iv = iv;
                            metadata.tag = tag;
                        }
                        metadataPath = path_1.default.join(this.config.backupDir, "".concat(backupId, ".metadata.json"));
                        fs_1.default.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
                        logger_1.log.info('Database backup completed successfully:', {
                            backupId: backupId,
                            size: Math.round(fileStats.size / 1024 / 1024 * 100) / 100 + ' MB',
                            compressed: this.config.compression,
                            encrypted: !!this.config.encryptionKey
                        });
                        if (!(this.config.testRestore && type === 'scheduled')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.testRestore(backupId)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: 
                    // Clean up old backups
                    return [4 /*yield*/, this.cleanupOldBackups()];
                    case 5:
                        // Clean up old backups
                        _b.sent();
                        return [2 /*return*/, metadata];
                    case 6:
                        error_1 = _b.sent();
                        logger_1.log.error('Database backup failed:', error_1);
                        throw error_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Restore database from backup
     */
    DatabaseBackupManager.prototype.restoreBackup = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var backupPath, metadata, metadataPath, backupFile, targetPath, workingPath, decryptedPath, extractDir_1, files, dbFile, currentChecksum, testPath, currentBackupPath, extractDir, walFile, shmFile, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        backupPath = void 0;
                        metadata = null;
                        if (options.backupId) {
                            metadataPath = path_1.default.join(this.config.backupDir, "".concat(options.backupId, ".metadata.json"));
                            if (!fs_1.default.existsSync(metadataPath)) {
                                throw new Error("Backup metadata not found: ".concat(options.backupId));
                            }
                            metadata = JSON.parse(fs_1.default.readFileSync(metadataPath, 'utf-8'));
                            backupFile = path_1.default.join(this.config.backupDir, options.backupId);
                            if (metadata.compressed)
                                backupFile += '.tar.gz';
                            if (metadata.encrypted)
                                backupFile += '.enc';
                            backupPath = backupFile;
                        }
                        else if (options.backupPath) {
                            backupPath = options.backupPath;
                        }
                        else {
                            throw new Error('Either backupId or backupPath must be provided');
                        }
                        if (!fs_1.default.existsSync(backupPath)) {
                            throw new Error("Backup file not found: ".concat(backupPath));
                        }
                        logger_1.log.info('Starting database restore:', { backupPath: backupPath, metadata: metadata === null || metadata === void 0 ? void 0 : metadata.id });
                        targetPath = options.targetPath || (metadata === null || metadata === void 0 ? void 0 : metadata.originalPath) || process.env.DATABASE_URL || 'dev.db';
                        workingPath = backupPath;
                        // Decrypt if needed
                        if ((metadata === null || metadata === void 0 ? void 0 : metadata.encrypted) || backupPath.endsWith('.enc')) {
                            if (!(metadata === null || metadata === void 0 ? void 0 : metadata.iv) || !(metadata === null || metadata === void 0 ? void 0 : metadata.tag)) {
                                throw new Error('Missing encryption metadata (iv/tag) for decryption');
                            }
                            decryptedPath = "".concat(backupPath, ".decrypted");
                            this.decryptFile(workingPath, decryptedPath, metadata.iv, metadata.tag);
                            workingPath = decryptedPath;
                        }
                        if (!((metadata === null || metadata === void 0 ? void 0 : metadata.compressed) || workingPath.includes('.tar.gz'))) return [3 /*break*/, 2];
                        extractDir_1 = path_1.default.join(this.config.backupDir, 'restore-temp');
                        if (!fs_1.default.existsSync(extractDir_1)) {
                            fs_1.default.mkdirSync(extractDir_1, { recursive: true });
                        }
                        return [4 /*yield*/, tar.extract({
                                file: workingPath,
                                cwd: extractDir_1
                            })];
                    case 1:
                        _a.sent();
                        files = fs_1.default.readdirSync(extractDir_1);
                        dbFile = files.find(function (f) { return f.endsWith('.tmp') && !f.includes('-wal') && !f.includes('-shm'); });
                        if (!dbFile) {
                            throw new Error('Database file not found in backup archive');
                        }
                        workingPath = path_1.default.join(extractDir_1, dbFile);
                        _a.label = 2;
                    case 2:
                        // Verify integrity if requested
                        if (options.verifyIntegrity && metadata) {
                            currentChecksum = this.calculateChecksum(workingPath);
                            if (currentChecksum !== metadata.checksum) {
                                throw new Error('Backup integrity verification failed - checksums do not match');
                            }
                            logger_1.log.info('Backup integrity verified successfully');
                        }
                        // Create test copy if requested
                        if (options.createTestCopy) {
                            testPath = "".concat(targetPath, ".restore-test");
                            fs_1.default.copyFileSync(workingPath, testPath);
                            logger_1.log.info('Test copy created:', testPath);
                            return [2 /*return*/];
                        }
                        // Stop database connections before restore
                        dbSecurity_1.secureDbManager.close();
                        currentBackupPath = "".concat(targetPath, ".pre-restore-").concat(Date.now());
                        if (fs_1.default.existsSync(targetPath)) {
                            fs_1.default.copyFileSync(targetPath, currentBackupPath);
                            logger_1.log.info('Current database backed up to:', currentBackupPath);
                        }
                        // Restore database
                        fs_1.default.copyFileSync(workingPath, targetPath);
                        extractDir = path_1.default.dirname(workingPath);
                        walFile = path_1.default.join(extractDir, path_1.default.basename(workingPath) + '-wal');
                        shmFile = path_1.default.join(extractDir, path_1.default.basename(workingPath) + '-shm');
                        if (fs_1.default.existsSync(walFile)) {
                            fs_1.default.copyFileSync(walFile, "".concat(targetPath, "-wal"));
                        }
                        if (fs_1.default.existsSync(shmFile)) {
                            fs_1.default.copyFileSync(shmFile, "".concat(targetPath, "-shm"));
                        }
                        // Clean up temporary files
                        if (workingPath !== backupPath) {
                            fs_1.default.unlinkSync(workingPath);
                        }
                        if (fs_1.default.existsSync(path_1.default.join(this.config.backupDir, 'restore-temp'))) {
                            fs_1.default.rmSync(path_1.default.join(this.config.backupDir, 'restore-temp'), { recursive: true });
                        }
                        logger_1.log.info('Database restore completed successfully:', { targetPath: targetPath, backupId: metadata === null || metadata === void 0 ? void 0 : metadata.id });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        logger_1.log.error('Database restore failed:', error_2);
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Test restore functionality
     */
    DatabaseBackupManager.prototype.testRestore = function (backupId) {
        return __awaiter(this, void 0, void 0, function () {
            var testDbPath, testDb, testResult, error_3;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        logger_1.log.info('Testing restore for backup:', backupId);
                        testDbPath = path_1.default.join(this.config.backupDir, "test-restore-".concat(backupId, ".db"));
                        return [4 /*yield*/, this.restoreBackup({
                                backupId: backupId,
                                targetPath: testDbPath,
                                verifyIntegrity: true,
                                createTestCopy: false
                            })];
                    case 1:
                        _d.sent();
                        // Test database connection
                        return [4 /*yield*/, dbSecurity_1.secureDbManager.initializeDatabase(testDbPath)];
                    case 2:
                        // Test database connection
                        _d.sent();
                        testDb = dbSecurity_1.secureDbManager.getRawDatabase();
                        testResult = (_c = (_b = (_a = testDb === null || testDb === void 0 ? void 0 : testDb.prepare) === null || _a === void 0 ? void 0 : _a.call(testDb, 'SELECT 1 as test')) === null || _b === void 0 ? void 0 : _b.get) === null || _c === void 0 ? void 0 : _c.call(_b);
                        if ((testResult === null || testResult === void 0 ? void 0 : testResult.test) !== 1) {
                            throw new Error('Test database query failed');
                        }
                        // Clean up test database
                        if (fs_1.default.existsSync(testDbPath)) {
                            fs_1.default.unlinkSync(testDbPath);
                        }
                        logger_1.log.info('Restore test completed successfully for backup:', backupId);
                        return [2 /*return*/, true];
                    case 3:
                        error_3 = _d.sent();
                        logger_1.log.error('Restore test failed for backup:', backupId, error_3);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * List available backups
     */
    DatabaseBackupManager.prototype.listBackups = function () {
        var _this = this;
        try {
            var backups_1 = [];
            var files = fs_1.default.readdirSync(this.config.backupDir);
            files
                .filter(function (file) { return file.endsWith('.metadata.json'); })
                .forEach(function (metadataFile) {
                try {
                    var metadataPath = path_1.default.join(_this.config.backupDir, metadataFile);
                    var metadata = JSON.parse(fs_1.default.readFileSync(metadataPath, 'utf-8'));
                    backups_1.push(metadata);
                }
                catch (error) {
                    logger_1.log.warn('Failed to parse backup metadata:', metadataFile, error);
                }
            });
            return backups_1.sort(function (a, b) { return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(); });
        }
        catch (error) {
            logger_1.log.error('Failed to list backups:', error);
            return [];
        }
    };
    /**
     * Clean up old backups based on retention policy
     */
    DatabaseBackupManager.prototype.cleanupOldBackups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var backups, now_1, toDelete, daily_1, weekly_1, monthly_1, excess, excess, excess, _i, toDelete_1, backupId, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        backups = this.listBackups();
                        now_1 = new Date();
                        toDelete = [];
                        daily_1 = [];
                        weekly_1 = [];
                        monthly_1 = [];
                        backups.forEach(function (backup) {
                            var backupDate = new Date(backup.timestamp);
                            var daysDiff = Math.floor((now_1.getTime() - backupDate.getTime()) / (1000 * 60 * 60 * 24));
                            if (daysDiff <= 7) {
                                daily_1.push(backup);
                            }
                            else if (daysDiff <= 30) {
                                weekly_1.push(backup);
                            }
                            else {
                                monthly_1.push(backup);
                            }
                        });
                        // Apply retention policy
                        if (daily_1.length > this.config.retention.daily) {
                            excess = daily_1.slice(this.config.retention.daily);
                            toDelete.push.apply(toDelete, excess.map(function (b) { return b.id; }));
                        }
                        if (weekly_1.length > this.config.retention.weekly) {
                            excess = weekly_1.slice(this.config.retention.weekly);
                            toDelete.push.apply(toDelete, excess.map(function (b) { return b.id; }));
                        }
                        if (monthly_1.length > this.config.retention.monthly) {
                            excess = monthly_1.slice(this.config.retention.monthly);
                            toDelete.push.apply(toDelete, excess.map(function (b) { return b.id; }));
                        }
                        _i = 0, toDelete_1 = toDelete;
                        _a.label = 1;
                    case 1:
                        if (!(_i < toDelete_1.length)) return [3 /*break*/, 4];
                        backupId = toDelete_1[_i];
                        return [4 /*yield*/, this.deleteBackup(backupId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (toDelete.length > 0) {
                            logger_1.log.info('Cleaned up old backups:', { deleted: toDelete.length });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        logger_1.log.error('Failed to cleanup old backups:', error_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a specific backup
     */
    DatabaseBackupManager.prototype.deleteBackup = function (backupId) {
        return __awaiter(this, void 0, void 0, function () {
            var metadataPath, metadata, backupFile;
            return __generator(this, function (_a) {
                try {
                    metadataPath = path_1.default.join(this.config.backupDir, "".concat(backupId, ".metadata.json"));
                    if (!fs_1.default.existsSync(metadataPath)) {
                        throw new Error("Backup not found: ".concat(backupId));
                    }
                    metadata = JSON.parse(fs_1.default.readFileSync(metadataPath, 'utf-8'));
                    backupFile = path_1.default.join(this.config.backupDir, backupId);
                    if (metadata.compressed)
                        backupFile += '.tar.gz';
                    if (metadata.encrypted)
                        backupFile += '.enc';
                    // Delete files
                    if (fs_1.default.existsSync(backupFile)) {
                        fs_1.default.unlinkSync(backupFile);
                    }
                    fs_1.default.unlinkSync(metadataPath);
                    logger_1.log.info('Backup deleted:', backupId);
                }
                catch (error) {
                    logger_1.log.error('Failed to delete backup:', backupId, error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Start scheduled backups
     */
    DatabaseBackupManager.prototype.startScheduledBackups = function () {
        var _this = this;
        if (this.cronJob) {
            this.cronJob.stop();
        }
        this.cronJob = node_cron_1.default.schedule(this.config.schedule, function () { return __awaiter(_this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        logger_1.log.info('Starting scheduled backup');
                        return [4 /*yield*/, this.createBackup(undefined, 'scheduled')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        logger_1.log.error('Scheduled backup failed:', error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }, {
            scheduled: false
        });
        this.cronJob.start();
        logger_1.log.info('Scheduled backups started with cron:', this.config.schedule);
    };
    /**
     * Stop scheduled backups
     */
    DatabaseBackupManager.prototype.stopScheduledBackups = function () {
        if (this.cronJob) {
            this.cronJob.stop();
            this.cronJob = null;
            logger_1.log.info('Scheduled backups stopped');
        }
    };
    return DatabaseBackupManager;
}());
exports.DatabaseBackupManager = DatabaseBackupManager;
// Create singleton instance
exports.dbBackupManager = new DatabaseBackupManager();
// Command-line interface
if (import.meta.url === "file://".concat(process.argv[1])) {
    var command_1 = process.argv[2];
    var backupId_1 = process.argv[3];
    var runCommand = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, metadata, backups_2, latest, success, success, backups, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 13, , 14]);
                    _a = command_1;
                    switch (_a) {
                        case '--backup': return [3 /*break*/, 1];
                        case '--restore': return [3 /*break*/, 3];
                        case '--test-restore': return [3 /*break*/, 5];
                        case '--list': return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 11];
                case 1:
                    console.log('🔄 Creating database backup...');
                    return [4 /*yield*/, exports.dbBackupManager.createBackup()];
                case 2:
                    metadata = _b.sent();
                    console.log('✅ Backup created successfully:');
                    console.log('ID:', metadata.id);
                    console.log('Size:', Math.round(metadata.size / 1024 / 1024 * 100) / 100, 'MB');
                    console.log('Encrypted:', metadata.encrypted);
                    console.log('Compressed:', metadata.compressed);
                    return [3 /*break*/, 12];
                case 3:
                    if (!backupId_1) {
                        console.log('❌ Backup ID required for restore');
                        console.log('Usage: npm run db:restore <backup-id>');
                        process.exit(1);
                    }
                    console.log('🔄 Restoring database from backup:', backupId_1);
                    return [4 /*yield*/, exports.dbBackupManager.restoreBackup({
                            backupId: backupId_1,
                            verifyIntegrity: true,
                            createTestCopy: false
                        })];
                case 4:
                    _b.sent();
                    console.log('✅ Database restored successfully');
                    return [3 /*break*/, 12];
                case 5:
                    if (!!backupId_1) return [3 /*break*/, 7];
                    backups_2 = exports.dbBackupManager.listBackups();
                    if (backups_2.length === 0) {
                        console.log('❌ No backups found');
                        process.exit(1);
                    }
                    latest = backups_2[0];
                    console.log('🧪 Testing restore for latest backup:', latest.id);
                    return [4 /*yield*/, exports.dbBackupManager.testRestore(latest.id)];
                case 6:
                    success = _b.sent();
                    console.log(success ? '✅ Restore test passed' : '❌ Restore test failed');
                    return [3 /*break*/, 9];
                case 7:
                    console.log('🧪 Testing restore for backup:', backupId_1);
                    return [4 /*yield*/, exports.dbBackupManager.testRestore(backupId_1)];
                case 8:
                    success = _b.sent();
                    console.log(success ? '✅ Restore test passed' : '❌ Restore test failed');
                    _b.label = 9;
                case 9: return [3 /*break*/, 12];
                case 10:
                    console.log('📋 Available backups:');
                    backups = exports.dbBackupManager.listBackups();
                    if (backups.length === 0) {
                        console.log('No backups found');
                    }
                    else {
                        backups.forEach(function (backup) {
                            console.log("".concat(backup.id, " | ").concat(backup.timestamp, " | ").concat(Math.round(backup.size / 1024 / 1024 * 100) / 100, "MB | ").concat(backup.type));
                        });
                    }
                    return [3 /*break*/, 12];
                case 11:
                    console.log('Usage:');
                    console.log('  npm run db:backup           - Create backup');
                    console.log('  npm run db:restore <id>     - Restore backup');
                    console.log('  npm run db:test-restore [id] - Test restore');
                    console.log('  tsx server/utils/dbBackup.ts --list - List backups');
                    return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 14];
                case 13:
                    error_6 = _b.sent();
                    console.error('❌ Command failed:', error_6);
                    process.exit(1);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    }); };
    runCommand();
}
