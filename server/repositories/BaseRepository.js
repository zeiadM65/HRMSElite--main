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
exports.BaseRepository = void 0;
var db_optimized_1 = require("../models/db-optimized");
var drizzle_orm_1 = require("drizzle-orm");
var BaseService_1 = require("./BaseService");
/**
 * Base Repository Class - DRY Principle
 * Provides common database operations for all repositories
 */
var BaseRepository = /** @class */ (function (_super) {
    __extends(BaseRepository, _super);
    function BaseRepository(table) {
        var _this = _super.call(this) || this;
        _this.table = table;
        return _this;
    }
    /**
     * Find all records with optional filtering and pagination
     */
    BaseRepository.prototype.findAll = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conditions, _a, column, direction, orderFn, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        query = db_optimized_1.db.select().from(this.table);
                        // Apply where conditions
                        if (options === null || options === void 0 ? void 0 : options.where) {
                            conditions = Object.entries(options.where).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                return (0, drizzle_orm_1.eq)(_this.table[key], value);
                            });
                            if (conditions.length > 0) {
                                query = query.where(drizzle_orm_1.and.apply(void 0, conditions));
                            }
                        }
                        // Apply ordering
                        if (options === null || options === void 0 ? void 0 : options.orderBy) {
                            _a = options.orderBy, column = _a.column, direction = _a.direction;
                            orderFn = direction === 'desc' ? drizzle_orm_1.desc : drizzle_orm_1.asc;
                            query = query.orderBy(orderFn(this.table[column]));
                        }
                        // Apply pagination
                        if (options === null || options === void 0 ? void 0 : options.limit) {
                            query = query.limit(options.limit);
                        }
                        if (options === null || options === void 0 ? void 0 : options.offset) {
                            query = query.offset(options.offset);
                        }
                        return [4 /*yield*/, query];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_1 = _b.sent();
                        this.handleError(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find record by ID
     */
    BaseRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select()
                                .from(this.table)
                                .where((0, drizzle_orm_1.eq)(this.table.id, id))
                                .limit(1)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0] || null];
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
     * Find record by specific field
     */
    BaseRepository.prototype.findByField = function (field, value) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select()
                                .from(this.table)
                                .where((0, drizzle_orm_1.eq)(this.table[field], value))
                                .limit(1)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0] || null];
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
     * Create new record
     */
    BaseRepository.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db.insert(this.table).values(data)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
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
     * Update record by ID
     */
    BaseRepository.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .update(this.table)
                                .set(__assign(__assign({}, data), { updatedAt: new Date() }))
                                .where((0, drizzle_orm_1.eq)(this.table.id, id))
                                .returning()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0] || null];
                    case 2:
                        error_5 = _a.sent();
                        this.handleError(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete record by ID
     */
    BaseRepository.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .delete(this.table)
                                .where((0, drizzle_orm_1.eq)(this.table.id, id))
                                .returning()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.length > 0];
                    case 2:
                        error_6 = _a.sent();
                        this.handleError(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Count records with optional filtering
     */
    BaseRepository.prototype.count = function (where) {
        return __awaiter(this, void 0, void 0, function () {
            var query, conditions, result, error_7;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        query = db_optimized_1.db.select({ count: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["count(*)"], ["count(*)"]))) }).from(this.table);
                        if (where) {
                            conditions = Object.entries(where).map(function (_a) {
                                var key = _a[0], value = _a[1];
                                return (0, drizzle_orm_1.eq)(_this.table[key], value);
                            });
                            if (conditions.length > 0) {
                                query = query.where(drizzle_orm_1.and.apply(void 0, conditions));
                            }
                        }
                        return [4 /*yield*/, query];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.count) || 0];
                    case 2:
                        error_7 = _b.sent();
                        this.handleError(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search records by text fields
     */
    BaseRepository.prototype.search = function (searchTerm, searchFields) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions, error_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        conditions = searchFields.map(function (field) {
                            return (0, drizzle_orm_1.like)(_this.table[field], "%".concat(searchTerm, "%"));
                        });
                        return [4 /*yield*/, db_optimized_1.db
                                .select()
                                .from(this.table)
                                .where(drizzle_orm_1.or.apply(void 0, conditions))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_8 = _a.sent();
                        this.handleError(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find records by multiple IDs
     */
    BaseRepository.prototype.findByIds = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_optimized_1.db
                                .select()
                                .from(this.table)
                                .where((0, drizzle_orm_1.inArray)(this.table.id, ids))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_9 = _a.sent();
                        this.handleError(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check if record exists
     */
    BaseRepository.prototype.exists = function (where) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions, result, error_10;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        conditions = Object.entries(where).map(function (_a) {
                            var key = _a[0], value = _a[1];
                            return (0, drizzle_orm_1.eq)(_this.table[key], value);
                        });
                        return [4 /*yield*/, db_optimized_1.db
                                .select({ exists: (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["1"], ["1"]))) })
                                .from(this.table)
                                .where(drizzle_orm_1.and.apply(void 0, conditions))
                                .limit(1)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.length > 0];
                    case 2:
                        error_10 = _a.sent();
                        this.handleError(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BaseRepository;
}(BaseService_1.BaseService));
exports.BaseRepository = BaseRepository;
var templateObject_1, templateObject_2;
