"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRepository = exports.CompanyRepository = void 0;
var BaseRepository_1 = require("./BaseRepository");
var db_optimized_1 = require("../models/db-optimized");
var optimized_schema_1 = require("@shared/schema/optimized-schema");
var drizzle_orm_1 = require("drizzle-orm");
/**
 * Company Repository - Single Responsibility Principle
 * Handles all company-related database operations
 */
var CompanyRepository = /** @class */ (function (_super) {
    __extends(CompanyRepository, _super);
    function CompanyRepository() {
        return _super.call(this, optimized_schema_1.companies) || this;
    }
    /**
     * Find company with related data (employees, licenses, users)
     */
    CompanyRepository.prototype.findByIdWithRelations = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var company, _a, employeeCount, licenseCount, userCount, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select()
                                .from(optimized_schema_1.companies)
                                .where((0, drizzle_orm_1.eq)(optimized_schema_1.companies.id, id))
                                .limit(1)];
                    case 1:
                        company = _b.sent();
                        if (!company[0])
                            return [2 /*return*/, null];
                        return [4 /*yield*/, Promise.all([
                                this.getEmployeeCount(id),
                                this.getLicenseCount(id),
                                this.getUserCount(id)
                            ])];
                    case 2:
                        _a = _b.sent(), employeeCount = _a[0], licenseCount = _a[1], userCount = _a[2];
                        return [2 /*return*/, __assign(__assign({}, company[0]), { stats: {
                                    employeeCount: employeeCount,
                                    licenseCount: licenseCount,
                                    userCount: userCount
                                } })];
                    case 3:
                        error_1 = _b.sent();
                        this.handleError(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find companies by industry type
     */
    CompanyRepository.prototype.findByIndustryType = function (industryType) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select()
                                .from(optimized_schema_1.companies)
                                .where((0, drizzle_orm_1.eq)(optimized_schema_1.companies.industryType, industryType))
                                .orderBy((0, drizzle_orm_1.asc)(optimized_schema_1.companies.name))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        this.handleError(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find companies by location
     */
    CompanyRepository.prototype.findByLocation = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select()
                                .from(optimized_schema_1.companies)
                                .where((0, drizzle_orm_1.eq)(optimized_schema_1.companies.location, location))
                                .orderBy((0, drizzle_orm_1.asc)(optimized_schema_1.companies.name))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_3 = _a.sent();
                        this.handleError(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search companies with advanced filtering
     */
    CompanyRepository.prototype.searchCompanies = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conditions, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = db_optimized_1.db.select().from(optimized_schema_1.companies);
                        conditions = [];
                        // Search term
                        if (options.searchTerm) {
                            conditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(optimized_schema_1.companies.name, "%".concat(options.searchTerm, "%")), (0, drizzle_orm_1.like)(optimized_schema_1.companies.commercialFileNumber, "%".concat(options.searchTerm, "%")), (0, drizzle_orm_1.like)(optimized_schema_1.companies.location, "%".concat(options.searchTerm, "%"))));
                        }
                        // Industry type filter
                        if (options.industryType) {
                            conditions.push((0, drizzle_orm_1.eq)(optimized_schema_1.companies.industryType, options.industryType));
                        }
                        // Location filter
                        if (options.location) {
                            conditions.push((0, drizzle_orm_1.eq)(optimized_schema_1.companies.location, options.location));
                        }
                        // Active status filter
                        if (options.isActive !== undefined) {
                            conditions.push((0, drizzle_orm_1.eq)(optimized_schema_1.companies.isActive, options.isActive));
                        }
                        // Apply conditions
                        if (conditions.length > 0) {
                            query = query.where(drizzle_orm_1.and.apply(void 0, conditions));
                        }
                        // Apply ordering
                        query = query.orderBy((0, drizzle_orm_1.asc)(optimized_schema_1.companies.name));
                        // Apply pagination
                        if (options.limit) {
                            query = query.limit(options.limit);
                        }
                        if (options.offset) {
                            query = query.offset(options.offset);
                        }
                        return [4 /*yield*/, query];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_4 = _a.sent();
                        this.handleError(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get company statistics
     */
    CompanyRepository.prototype.getCompanyStats = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, employeeCount, licenseCount, userCount, totalSalary, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                this.getEmployeeCount(companyId),
                                this.getLicenseCount(companyId),
                                this.getUserCount(companyId),
                                this.getTotalSalary(companyId)
                            ])];
                    case 1:
                        _a = _b.sent(), employeeCount = _a[0], licenseCount = _a[1], userCount = _a[2], totalSalary = _a[3];
                        return [2 /*return*/, {
                                employeeCount: employeeCount,
                                licenseCount: licenseCount,
                                userCount: userCount,
                                totalSalary: totalSalary,
                                averageSalary: employeeCount > 0 ? totalSalary / employeeCount : 0
                            }];
                    case 2:
                        error_5 = _b.sent();
                        this.handleError(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employee count for company
     */
    CompanyRepository.prototype.getEmployeeCount = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select({ count: (0, drizzle_orm_1.count)() })
                                .from(optimized_schema_1.employees)
                                .where((0, drizzle_orm_1.eq)(optimized_schema_1.employees.companyId, companyId))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.count) || 0];
                    case 2:
                        error_6 = _b.sent();
                        return [2 /*return*/, 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get license count for company
     */
    CompanyRepository.prototype.getLicenseCount = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_7;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select({ count: (0, drizzle_orm_1.count)() })
                                .from(optimized_schema_1.licenses)
                                .where((0, drizzle_orm_1.eq)(optimized_schema_1.licenses.companyId, companyId))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.count) || 0];
                    case 2:
                        error_7 = _b.sent();
                        return [2 /*return*/, 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get user count for company
     */
    CompanyRepository.prototype.getUserCount = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_8;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select({ count: (0, drizzle_orm_1.count)() })
                                .from(optimized_schema_1.companyUsers)
                                .where((0, drizzle_orm_1.eq)(optimized_schema_1.companyUsers.companyId, companyId))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.count) || 0];
                    case 2:
                        error_8 = _b.sent();
                        return [2 /*return*/, 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get total salary for company
     */
    CompanyRepository.prototype.getTotalSalary = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_9;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select({ total: (0, drizzle_orm_1.sum)(optimized_schema_1.employees.salary) })
                                .from(optimized_schema_1.employees)
                                .where((0, drizzle_orm_1.eq)(optimized_schema_1.employees.companyId, companyId))];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) || 0];
                    case 2:
                        error_9 = _b.sent();
                        return [2 /*return*/, 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get companies with expiring licenses
     */
    CompanyRepository.prototype.getCompaniesWithExpiringLicenses = function () {
        return __awaiter(this, arguments, void 0, function (daysThreshold) {
            var thresholdDate, error_10;
            if (daysThreshold === void 0) { daysThreshold = 30; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        thresholdDate = new Date();
                        thresholdDate.setDate(thresholdDate.getDate() + daysThreshold);
                        return [4 /*yield*/, db_optimized_1.db
                                .select({
                                company: optimized_schema_1.companies,
                                expiringLicenses: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["count(", ")"], ["count(", ")"])), optimized_schema_1.licenses.id)
                            })
                                .from(optimized_schema_1.companies)
                                .leftJoin(optimized_schema_1.licenses, (0, drizzle_orm_1.eq)(optimized_schema_1.companies.id, optimized_schema_1.licenses.companyId))
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(optimized_schema_1.licenses.isActive, true), (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", " <= ", ""], ["", " <= ", ""])), optimized_schema_1.licenses.expiryDate, thresholdDate.toISOString().split('T')[0])))
                                .groupBy(optimized_schema_1.companies.id)
                                .orderBy((0, drizzle_orm_1.asc)(optimized_schema_1.companies.name))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_10 = _a.sent();
                        this.handleError(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get companies by employee count range
     */
    CompanyRepository.prototype.getCompaniesByEmployeeRange = function (minEmployees, maxEmployees) {
        return __awaiter(this, void 0, void 0, function () {
            var error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select({
                                company: optimized_schema_1.companies,
                                employeeCount: (0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["count(", ")"], ["count(", ")"])), optimized_schema_1.employees.id)
                            })
                                .from(optimized_schema_1.companies)
                                .leftJoin(optimized_schema_1.employees, (0, drizzle_orm_1.eq)(optimized_schema_1.companies.id, optimized_schema_1.employees.companyId))
                                .groupBy(optimized_schema_1.companies.id)
                                .having((0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["count(", ") BETWEEN ", " AND ", ""], ["count(", ") BETWEEN ", " AND ", ""])), optimized_schema_1.employees.id, minEmployees, maxEmployees))
                                .orderBy((0, drizzle_orm_1.desc)((0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["count(", ")"], ["count(", ")"])), optimized_schema_1.employees.id)))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_11 = _a.sent();
                        this.handleError(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update company statistics
     */
    CompanyRepository.prototype.updateCompanyStats = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, employeeCount, licenseCount, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this.getEmployeeCount(companyId),
                                this.getLicenseCount(companyId)
                            ])];
                    case 1:
                        _a = _b.sent(), employeeCount = _a[0], licenseCount = _a[1];
                        return [4 /*yield*/, db_optimized_1.db
                                .update(optimized_schema_1.companies)
                                .set({
                                totalEmployees: employeeCount,
                                totalLicenses: licenseCount,
                                updatedAt: new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(optimized_schema_1.companies.id, companyId))];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_12 = _b.sent();
                        this.handleError(error_12);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CompanyRepository;
}(BaseRepository_1.BaseRepository));
exports.CompanyRepository = CompanyRepository;
// Export singleton instance
exports.companyRepository = new CompanyRepository();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
