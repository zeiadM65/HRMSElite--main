"use strict";
/**
 * @fileoverview Data Masking and PII Protection Utility
 * @description Provides data masking capabilities for PII protection in non-production environments
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
exports.dataMaskingManager = exports.DataMaskingManager = void 0;
var node_crypto_1 = __importDefault(require("node:crypto"));
var node_cron_1 = __importDefault(require("node-cron"));
var dbSecurity_1 = require("./dbSecurity");
var logger_1 = require("./logger");
var pii_1 = require("./pii");
require("dotenv/config");
var DataMaskingManager = /** @class */ (function () {
    function DataMaskingManager(config) {
        this.config = __assign({ environment: process.env.NODE_ENV || 'development', preserveFormat: true, auditMasking: true, rules: this.getDefaultMaskingRules(), retentionPolicies: this.getDefaultRetentionPolicies() }, config);
    }
    /**
     * Get default masking rules for PII fields
     */
    DataMaskingManager.prototype.getDefaultMaskingRules = function () {
        var rules = [];
        for (var _i = 0, _a = Object.entries(pii_1.PII_CLASSIFICATION); _i < _a.length; _i++) {
            var _b = _a[_i], table = _b[0], fields = _b[1];
            for (var _c = 0, _d = Object.entries(fields); _c < _d.length; _c++) {
                var column = _d[_c][0];
                var maskingType = column === 'sess' ? 'hash' : 'partial';
                rules.push({ table: table, column: column, maskingType: maskingType, preserveFormat: true });
            }
        }
        return rules;
    };
    /**
     * Get default retention policies
     */
    DataMaskingManager.prototype.getDefaultRetentionPolicies = function () {
        return Object.entries(pii_1.DEFAULT_RETENTION_CONFIG).map(function (_a) {
            var table = _a[0], cfg = _a[1];
            return (__assign({ table: table }, cfg));
        });
    };
    /**
     * Generate fake data based on field type
     */
    DataMaskingManager.prototype.generateFakeData = function (fieldName, originalValue) {
        if (!originalValue)
            return '';
        var fakeNames = ['Ahmed', 'Fatima', 'Mohammed', 'Aisha', 'Omar', 'Layla', 'Ali', 'Nour'];
        var fakeSurnames = ['Al-Ahmad', 'Al-Mohammed', 'Al-Hassan', 'Al-Salem', 'Al-Rashid', 'Al-Mansouri'];
        var fakeAddresses = ['123 Kuwait City', '456 Hawalli', '789 Farwaniya', '101 Ahmadi', '202 Jahra'];
        switch (fieldName.toLowerCase()) {
            case 'firstname':
            case 'first_name':
                return fakeNames[Math.floor(Math.random() * fakeNames.length)];
            case 'lastname':
            case 'last_name':
                return fakeSurnames[Math.floor(Math.random() * fakeSurnames.length)];
            case 'arabicname':
            case 'englishname':
                var firstName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
                var lastName = fakeSurnames[Math.floor(Math.random() * fakeSurnames.length)];
                return "".concat(firstName, " ").concat(lastName);
            case 'address':
                return fakeAddresses[Math.floor(Math.random() * fakeAddresses.length)];
            case 'emergencycontact':
                return fakeNames[Math.floor(Math.random() * fakeNames.length)] + ' ' +
                    fakeSurnames[Math.floor(Math.random() * fakeSurnames.length)];
            case 'fileurl':
                return '/fake/documents/masked-document.pdf';
            default:
                return 'MASKED_DATA';
        }
    };
    /**
     * Mask data based on masking type
     */
    DataMaskingManager.prototype.maskValue = function (value, rule) {
        if (!value)
            return value;
        switch (rule.maskingType) {
            case 'full':
                return '*'.repeat(rule.preserveLength ? value.length : 8);
            case 'partial':
                if (rule.preserveFormat && value.includes('@')) {
                    // Email masking
                    var _a = value.split('@'), local = _a[0], domain = _a[1];
                    var maskedLocal = local.length > 2 ?
                        local.substring(0, 2) + '*'.repeat(local.length - 2) :
                        '*'.repeat(local.length);
                    return "".concat(maskedLocal, "@").concat(domain);
                }
                else if (rule.preserveFormat && /^\+?\d+$/.test(value)) {
                    // Phone number masking
                    var visibleDigits = Math.min(4, Math.floor(value.length / 2));
                    var maskedPart = '*'.repeat(value.length - visibleDigits);
                    return value.substring(0, visibleDigits) + maskedPart;
                }
                else if (rule.preserveFormat && /^\d+$/.test(value)) {
                    // Numeric ID masking (show first and last 2 digits)
                    if (value.length <= 4)
                        return '*'.repeat(value.length);
                    var start = value.substring(0, 2);
                    var end = value.substring(value.length - 2);
                    var middle = '*'.repeat(value.length - 4);
                    return start + middle + end;
                }
                else {
                    // Generic partial masking
                    var visibleChars = Math.min(3, Math.floor(value.length / 3));
                    return value.substring(0, visibleChars) + '*'.repeat(value.length - visibleChars);
                }
            case 'hash':
                return node_crypto_1.default.createHash('sha256').update(value).digest('hex').substring(0, 16);
            case 'fake':
                return this.generateFakeData(rule.column, value);
            case 'null':
                return null;
            default:
                return value;
        }
    };
    /**
     * Apply masking rules to database
     */
    DataMaskingManager.prototype.applyMasking = function () {
        return __awaiter(this, void 0, void 0, function () {
            var report, rulesByTable, _i, _a, _b, tableName, rules, error_1, errorMsg, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        report = {
                            tablesProcessed: 0,
                            recordsProcessed: 0,
                            fieldsProcessed: 0,
                            errors: [],
                            startTime: new Date(),
                            endTime: new Date(),
                            environment: this.config.environment
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 10, , 11]);
                        // Prevent masking in production
                        if (process.env.NODE_ENV === 'production') {
                            throw new Error('Data masking is not allowed in production environment');
                        }
                        // Initialize database connection
                        return [4 /*yield*/, dbSecurity_1.secureDbManager.initializeDatabase()];
                    case 2:
                        // Initialize database connection
                        _c.sent();
                        this.db = dbSecurity_1.secureDbManager.getRawDatabase();
                        logger_1.log.info('Starting data masking process:', {
                            environment: this.config.environment,
                            rulesCount: this.config.rules.length
                        });
                        rulesByTable = this.config.rules.reduce(function (acc, rule) {
                            if (!acc[rule.table])
                                acc[rule.table] = [];
                            acc[rule.table].push(rule);
                            return acc;
                        }, {});
                        _i = 0, _a = Object.entries(rulesByTable);
                        _c.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        _b = _a[_i], tableName = _b[0], rules = _b[1];
                        _c.label = 4;
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.maskTable(tableName, rules, report)];
                    case 5:
                        _c.sent();
                        report.tablesProcessed++;
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _c.sent();
                        errorMsg = "Failed to mask table ".concat(tableName, ": ").concat(error_1.message);
                        report.errors.push(errorMsg);
                        logger_1.log.error(errorMsg, error_1);
                        return [3 /*break*/, 7];
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8: 
                    // Apply retention policies
                    return [4 /*yield*/, this.applyRetentionPolicies(report)];
                    case 9:
                        // Apply retention policies
                        _c.sent();
                        report.endTime = new Date();
                        logger_1.log.info('Data masking completed:', {
                            tablesProcessed: report.tablesProcessed,
                            recordsProcessed: report.recordsProcessed,
                            fieldsProcessed: report.fieldsProcessed,
                            errors: report.errors.length,
                            duration: report.endTime.getTime() - report.startTime.getTime()
                        });
                        return [2 /*return*/, report];
                    case 10:
                        error_2 = _c.sent();
                        report.errors.push("Masking process failed: ".concat(error_2.message));
                        logger_1.log.error('Data masking failed:', error_2);
                        throw error_2;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Mask a specific table
     */
    DataMaskingManager.prototype.maskTable = function (tableName, rules, report) {
        return __awaiter(this, void 0, void 0, function () {
            var tableExists, query, conditionsRule, records, columns, updateQuery, updateStmt_1, transaction;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    tableExists = this.db.prepare("\n        SELECT name FROM sqlite_master WHERE type='table' AND name=?\n      ").get(tableName);
                    if (!tableExists) {
                        logger_1.log.warn("Table ".concat(tableName, " does not exist, skipping"));
                        return [2 /*return*/];
                    }
                    query = "SELECT * FROM ".concat(tableName);
                    conditionsRule = rules.find(function (r) { return r.conditions; });
                    if (conditionsRule) {
                        query += " WHERE ".concat(conditionsRule.conditions);
                    }
                    records = this.db.prepare(query).all();
                    if (records.length === 0) {
                        logger_1.log.info("No records to mask in table ".concat(tableName));
                        return [2 /*return*/];
                    }
                    columns = rules.map(function (r) { return r.column; });
                    updateQuery = "\n        UPDATE ".concat(tableName, " \n        SET ").concat(columns.map(function (col) { return "".concat(col, " = ?"); }).join(', '), " \n        WHERE id = ?\n      ");
                    updateStmt_1 = this.db.prepare(updateQuery);
                    transaction = this.db.transaction(function (records) {
                        for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
                            var record = records_1[_i];
                            var maskedValues = [];
                            for (var _a = 0, rules_1 = rules; _a < rules_1.length; _a++) {
                                var rule = rules_1[_a];
                                var originalValue = record[rule.column];
                                var maskedValue = _this.maskValue(originalValue, rule);
                                maskedValues.push(maskedValue);
                                if (originalValue !== maskedValue) {
                                    report.fieldsProcessed++;
                                }
                            }
                            // Add record ID for WHERE clause
                            maskedValues.push(record.id);
                            updateStmt_1.run.apply(updateStmt_1, maskedValues);
                            report.recordsProcessed++;
                        }
                    });
                    transaction(records);
                    logger_1.log.info("Masked ".concat(records.length, " records in table ").concat(tableName));
                }
                catch (error) {
                    logger_1.log.error("Failed to mask table ".concat(tableName, ":"), error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Apply retention policies
     */
    DataMaskingManager.prototype.applyRetentionPolicies = function (report) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, policy, error_3, errorMsg, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        logger_1.log.info('Applying retention policies:', { policies: this.config.retentionPolicies.length });
                        _i = 0, _a = this.config.retentionPolicies;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        policy = _a[_i];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.applyRetentionPolicy(policy, report)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _b.sent();
                        errorMsg = "Failed to apply retention policy for ".concat(policy.table, ": ").concat(error_3.message);
                        report.errors.push(errorMsg);
                        logger_1.log.error(errorMsg, error_3);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _b.sent();
                        logger_1.log.error('Failed to apply retention policies:', error_4);
                        throw error_4;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Apply a specific retention policy
     */
    DataMaskingManager.prototype.applyRetentionPolicy = function (policy, report) {
        return __awaiter(this, void 0, void 0, function () {
            var tableExists, query, records, deleteQuery, deleteResult, maskRules, updateQuery, updateStmt_2, transaction;
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    tableExists = this.db.prepare("\n        SELECT name FROM sqlite_master WHERE type='table' AND name=?\n      ").get(policy.table);
                    if (!tableExists) {
                        logger_1.log.warn("Table ".concat(policy.table, " does not exist, skipping retention policy"));
                        return [2 /*return*/];
                    }
                    query = "SELECT * FROM ".concat(policy.table, " WHERE ").concat(policy.conditions);
                    records = this.db.prepare(query).all();
                    if (records.length === 0) {
                        logger_1.log.info("No records match retention policy for table ".concat(policy.table));
                        return [2 /*return*/];
                    }
                    switch (policy.action) {
                        case 'delete':
                            deleteQuery = "DELETE FROM ".concat(policy.table, " WHERE ").concat(policy.conditions);
                            deleteResult = this.db.prepare(deleteQuery).run();
                            logger_1.log.info("Deleted ".concat(deleteResult.changes, " records from ").concat(policy.table, " per retention policy"));
                            break;
                        case 'mask':
                            maskRules = policy.piiFields.map(function (field) { return ({
                                table: policy.table,
                                column: field,
                                maskingType: 'hash'
                            }); });
                            updateQuery = "\n            UPDATE ".concat(policy.table, " \n            SET ").concat(policy.piiFields.map(function (field) { return "".concat(field, " = ?"); }).join(', '), " \n            WHERE id = ? AND ").concat(policy.conditions, "\n          ");
                            updateStmt_2 = this.db.prepare(updateQuery);
                            transaction = this.db.transaction(function (records) {
                                var _loop_1 = function (record) {
                                    var maskedValues = policy.piiFields.map(function (field) {
                                        return _this.maskValue(record[field], {
                                            table: policy.table,
                                            column: field,
                                            maskingType: 'hash'
                                        });
                                    });
                                    maskedValues.push(record.id);
                                    updateStmt_2.run.apply(updateStmt_2, maskedValues);
                                };
                                for (var _i = 0, records_2 = records; _i < records_2.length; _i++) {
                                    var record = records_2[_i];
                                    _loop_1(record);
                                }
                            });
                            transaction(records);
                            logger_1.log.info("Masked ".concat(records.length, " records in ").concat(policy.table, " per retention policy"));
                            break;
                        case 'archive':
                            // For now, we'll just log archival (could implement actual archiving later)
                            logger_1.log.info("Would archive ".concat(records.length, " records from ").concat(policy.table, " per retention policy"));
                            break;
                    }
                }
                catch (error) {
                    logger_1.log.error("Failed to apply retention policy for ".concat(policy.table, ":"), error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Run retention policies immediately
     */
    DataMaskingManager.prototype.runRetentionPolicies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbSecurity_1.secureDbManager.initializeDatabase()];
                    case 1:
                        _a.sent();
                        this.db = dbSecurity_1.secureDbManager.getRawDatabase();
                        report = {
                            tablesProcessed: 0,
                            recordsProcessed: 0,
                            fieldsProcessed: 0,
                            errors: [],
                            startTime: new Date(),
                            endTime: new Date(),
                            environment: this.config.environment
                        };
                        return [4 /*yield*/, this.applyRetentionPolicies(report)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Schedule automated retention execution
     */
    DataMaskingManager.prototype.scheduleRetentionJobs = function (schedule) {
        var _this = this;
        if (schedule === void 0) { schedule = '0 3 * * *'; }
        node_cron_1.default.schedule(schedule, function () {
            _this.runRetentionPolicies().catch(function (err) { return logger_1.log.error('Retention job failed:', err); });
        });
    };
    /**
     * Generate masking report
     */
    DataMaskingManager.prototype.generateMaskingReport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var report, reportContent, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.applyMasking()];
                    case 1:
                        report = _a.sent();
                        reportContent = "\n# Data Masking Report\n\n**Environment:** ".concat(report.environment, "\n**Date:** ").concat(report.startTime.toISOString(), "\n**Duration:** ").concat(report.endTime.getTime() - report.startTime.getTime(), "ms\n\n## Summary\n- **Tables Processed:** ").concat(report.tablesProcessed, "\n- **Records Processed:** ").concat(report.recordsProcessed, "\n- **Fields Processed:** ").concat(report.fieldsProcessed, "\n- **Errors:** ").concat(report.errors.length, "\n\n## Masking Rules Applied\n").concat(this.config.rules.map(function (rule) {
                            return "- **".concat(rule.table, ".").concat(rule.column, "**: ").concat(rule.maskingType).concat(rule.conditions ? " (".concat(rule.conditions, ")") : '');
                        }).join('\n'), "\n\n## Retention Policies Applied\n").concat(this.config.retentionPolicies.map(function (policy) {
                            return "- **".concat(policy.table, "**: ").concat(policy.action, " after ").concat(policy.retentionPeriod, " days");
                        }).join('\n'), "\n\n").concat(report.errors.length > 0 ? "## Errors\n".concat(report.errors.map(function (error) { return "- ".concat(error); }).join('\n')) : '', "\n\n---\n*Generated by HRMS Elite Data Masking System*\n");
                        return [2 /*return*/, reportContent];
                    case 2:
                        error_5 = _a.sent();
                        logger_1.log.error('Failed to generate masking report:', error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DataMaskingManager;
}());
exports.DataMaskingManager = DataMaskingManager;
// Create singleton instance
exports.dataMaskingManager = new DataMaskingManager();
// Command-line interface
if (import.meta.url === "file://".concat(process.argv[1])) {
    var command_1 = process.argv[2];
    var runCommand = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, report, reportContent, error_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    _a = command_1;
                    switch (_a) {
                        case '--mask': return [3 /*break*/, 1];
                        case '--report': return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    console.log('🎭 Starting data masking process...');
                    return [4 /*yield*/, exports.dataMaskingManager.applyMasking()];
                case 2:
                    report = _b.sent();
                    console.log('✅ Data masking completed successfully:');
                    console.log('Tables processed:', report.tablesProcessed);
                    console.log('Records processed:', report.recordsProcessed);
                    console.log('Fields processed:', report.fieldsProcessed);
                    if (report.errors.length > 0) {
                        console.log('❌ Errors:', report.errors.length);
                        report.errors.forEach(function (error) { return console.log('  -', error); });
                    }
                    return [3 /*break*/, 6];
                case 3:
                    console.log('📊 Generating masking report...');
                    return [4 /*yield*/, exports.dataMaskingManager.generateMaskingReport()];
                case 4:
                    reportContent = _b.sent();
                    console.log(reportContent);
                    return [3 /*break*/, 6];
                case 5:
                    console.log('Usage:');
                    console.log('  npm run db:mask-data     - Apply data masking');
                    console.log('  tsx server/utils/dataMasking.ts --report - Generate report');
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_6 = _b.sent();
                    console.error('❌ Command failed:', error_6);
                    process.exit(1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    runCommand();
}
