"use strict";
/**
 * @fileoverview Database storage layer for HRMS Elite application
 * @description Provides data access layer for all HRMS entities including companies,
 * employees, users, licenses, leaves, and documents
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
exports.storage = exports.DatabaseStorage = void 0;
var schema_1 = require("@shared/schema");
var db_1 = require("./db");
var metrics_1 = require("../middleware/metrics");
function withDbMetrics(operation, table, query) {
    return __awaiter(this, void 0, void 0, function () {
        var start, result, duration, error_1, duration;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = process.hrtime.bigint();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query()];
                case 2:
                    result = _a.sent();
                    metrics_1.metricsUtils.incrementDbQuery(operation, table, 'success');
                    duration = Number(process.hrtime.bigint() - start) / 1000000000;
                    metrics_1.metricsUtils.recordDbDuration(operation, table, duration);
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    metrics_1.metricsUtils.incrementDbQuery(operation, table, 'error');
                    duration = Number(process.hrtime.bigint() - start) / 1000000000;
                    metrics_1.metricsUtils.recordDbDuration(operation, table, duration);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var drizzle_orm_1 = require("drizzle-orm");
var logger_1 = require("../utils/logger");
var node_crypto_1 = __importDefault(require("node:crypto"));
var env_1 = require("../utils/env");
function hashTokenInternal(token) {
    return node_crypto_1.default.createHmac('sha256', env_1.env.REFRESH_JWT_SECRET).update(token).digest('hex');
}
/**
 * Database storage class for HRMS Elite application
 * @description Provides methods for all database operations including CRUD operations
 * for companies, employees, users, licenses, leaves, and documents
 * @class DatabaseStorage
 */
var DatabaseStorage = /** @class */ (function () {
    function DatabaseStorage() {
    }
    /**
     * Get all active companies
     * @description Retrieves all active companies from the database
     * @async
     * @returns {Promise<Company[]>} Array of active companies
     * @throws {Error} When database operation fails
     * @example
     * const companies = await storage.getAllCompanies();
     */
    DatabaseStorage.prototype.getAllCompanies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.companies).where((0, drizzle_orm_1.eq)(schema_1.companies.isActive, true))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_2 = _a.sent();
                        logger_1.log.error('Error fetching companies:', error_2);
                        throw new Error('Failed to fetch companies');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a single company by ID
     * @description Retrieves a specific company by its unique identifier
     * @async
     * @param {string} id - Company unique identifier
     * @returns {Promise<Company | null>} Company object or null if not found
     * @throws {Error} When database operation fails
     * @example
     * const company = await storage.getCompany("company-1");
     * if (compunknown) {
     * }
     */
    DatabaseStorage.prototype.getCompany = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.companies).where((0, drizzle_orm_1.eq)(schema_1.companies.id, id))];
                    case 1:
                        results = _b.sent();
                        return [2 /*return*/, (_a = results[0]) !== null && _a !== void 0 ? _a : null];
                    case 2:
                        error_3 = _b.sent();
                        logger_1.log.error('Error fetching company:', error_3);
                        throw new Error('Failed to fetch company');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new company
     * @description Creates a new company record in the database
     * @async
     * @param {InsertCompany} data - Company data to insert
     * @returns {Promise<Company>} Created company object
     * @throws {Error} When database operation fails
     * @example
     * const newCompany = await storage.createCompany({
     *   name: "شركة جديدة",
     *   commercialFileName: "الاسم التجاري",
     *   department: "التجارة العامة",
     *   classification: "شركة ذات مسؤولية محدودة"
     * });
     */
    DatabaseStorage.prototype.createCompany = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.insert(schema_1.companies).values(data).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create company');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_4 = _a.sent();
                        logger_1.log.error('Error creating company:', error_4);
                        throw new Error('Failed to create company');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all employees
     * @description Retrieves all employees from the database
     * @async
     * @returns {Promise<Employee[]>} Array of all employees
     * @throws {Error} When database operation fails
     * @example
     * const employees = await storage.getAllEmployees();
     */
    DatabaseStorage.prototype.getAllEmployees = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.employees)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_5 = _a.sent();
                        logger_1.log.error('Error fetching employees:', error_5);
                        throw new Error('Failed to fetch employees');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a single employee by ID
     * @description Retrieves a specific employee by their unique identifier
     * @async
     * @param {string} id - Employee unique identifier
     * @returns {Promise<Employee | null>} Employee object or null if not found
     * @throws {Error} When database operation fails
     * @example
     * const employee = await storage.getEmployee("emp-1");
     * if (employee) {
     * }
     */
    DatabaseStorage.prototype.getEmployee = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_6;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.employees).where((0, drizzle_orm_1.eq)(schema_1.employees.id, id))];
                    case 1:
                        results = _b.sent();
                        return [2 /*return*/, (_a = results[0]) !== null && _a !== void 0 ? _a : null];
                    case 2:
                        error_6 = _b.sent();
                        logger_1.log.error('Error fetching employee:', error_6);
                        throw new Error('Failed to fetch employee');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employees for a specific company
     * @description Retrieves all employees belonging to a specific company
     * @async
     * @param {string} companyId - Company unique identifier
     * @returns {Promise<Employee[]>} Array of employees for the company
     * @throws {Error} When database operation fails
     * @example
     * const companyEmployees = await storage.getCompanyEmployees("company-1");
     */
    DatabaseStorage.prototype.getCompanyEmployees = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.employees).where((0, drizzle_orm_1.eq)(schema_1.employees.companyId, companyId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_7 = _a.sent();
                        logger_1.log.error('Error fetching company employees:', error_7);
                        throw new Error('Failed to fetch company employees');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new employee
     * @description Creates a new employee record in the database
     * @async
     * @param {InsertEmployee} data - Employee data to insert
     * @returns {Promise<Employee>} Created employee object
     * @throws {Error} When database operation fails
     * @example
     * const newEmployee = await storage.createEmployee({
     *   companyId: "company-1",
     *   firstName: "أحمد",
     *   lastName: "محمد",
     *   position: "مهندس برمجيات",
     *   department: "تقنية المعلومات",
     *   salary: 3500
     * });
     */
    DatabaseStorage.prototype.createEmployee = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.insert(schema_1.employees).values(data).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create employee');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_8 = _a.sent();
                        logger_1.log.error('Error creating employee:', error_8);
                        throw new Error('Failed to create employee');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a single user by ID
     * @description Retrieves a specific user by their unique identifier
     * @async
     * @param {string} id - User unique identifier
     * @returns {Promise<User | null>} User object or null if not found
     * @throws {Error} When database operation fails
     * @example
     * const user = await storage.getUser("user-1");
     * if (user) {
     * }
     */
    DatabaseStorage.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_9;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id))];
                    case 1:
                        results = _b.sent();
                        return [2 /*return*/, (_a = results[0]) !== null && _a !== void 0 ? _a : null];
                    case 2:
                        error_9 = _b.sent();
                        logger_1.log.error('Error fetching user:', error_9);
                        throw new Error('Failed to fetch user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get companies associated with a user
     * @description Retrieves all companies that a user has access to
     * @async
     * @param {string} userId - User unique identifier
     * @returns {Promise<Company[]>} Array of companies associated with the user
     * @throws {Error} When database operation fails
     * @example
     * const userCompanies = await storage.getUserCompanies("user-1");
     */
    DatabaseStorage.prototype.getUserCompanies = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .select({
                                'id': schema_1.companies.id,
                                'name': schema_1.companies.name,
                                'commercialFileName': schema_1.companies.commercialFileName,
                                'department': schema_1.companies.department,
                                'classification': schema_1.companies.classification,
                                'isActive': schema_1.companies.isActive,
                                'industryType': schema_1.companies.industryType,
                                'location': schema_1.companies.location,
                                'establishmentDate': schema_1.companies.establishmentDate,
                                'createdAt': schema_1.companies.createdAt,
                                'updatedAt': schema_1.companies.updatedAt
                            })
                                .from(schema_1.companyUsers)
                                .leftJoin(schema_1.companies, (0, drizzle_orm_1.eq)(schema_1.companyUsers.companyId, schema_1.companies.id))
                                .where((0, drizzle_orm_1.eq)(schema_1.companyUsers.userId, userId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.filter(function (company) { return company.id !== null; })];
                    case 2:
                        error_10 = _a.sent();
                        logger_1.log.error('Error fetching user companies:', error_10);
                        throw new Error('Failed to fetch user companies');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get leaves for a specific company
     * @description Retrieves all leave requests for employees of a specific company
     * @async
     * @param {string} companyId - Company unique identifier
     * @param {string} [status] - Optional status filter (pending, approved, rejected)
     * @returns {
    Promise<(EmployeeLeave & {
     employee: Employee
  })[]>
  } Array of leave requests with employee data
     * @throws {Error} When database operation fails
     * @example
     * const companyLeaves = await storage.getCompanyLeaves("company-1", "pending");
     */
    DatabaseStorage.prototype.getCompanyLeaves = function (companyId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions, results, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        conditions = [(0, drizzle_orm_1.eq)(schema_1.employees.companyId, companyId)];
                        if (status) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.employeeLeaves.status, status));
                        }
                        return [4 /*yield*/, db_1.db
                                .select({
                                'id': schema_1.employeeLeaves.id,
                                'employeeId': schema_1.employeeLeaves.employeeId,
                                'type': schema_1.employeeLeaves.type,
                                'status': schema_1.employeeLeaves.status,
                                'startDate': schema_1.employeeLeaves.startDate,
                                'endDate': schema_1.employeeLeaves.endDate,
                                'days': schema_1.employeeLeaves.days,
                                'reason': schema_1.employeeLeaves.reason,
                                'approvedBy': schema_1.employeeLeaves.approvedBy,
                                'approvedAt': schema_1.employeeLeaves.approvedAt,
                                'rejectionReason': schema_1.employeeLeaves.rejectionReason,
                                'createdAt': schema_1.employeeLeaves.createdAt,
                                'updatedAt': schema_1.employeeLeaves.updatedAt,
                                'employee': {
                                    'id': schema_1.employees.id,
                                    'companyId': schema_1.employees.companyId,
                                    'licenseId': schema_1.employees.licenseId,
                                    'firstName': schema_1.employees.firstName,
                                    'lastName': schema_1.employees.lastName,
                                    'arabicName': schema_1.employees.arabicName,
                                    'englishName': schema_1.employees.englishName,
                                    'passportNumber': schema_1.employees.passportNumber,
                                    'civilId': schema_1.employees.civilId,
                                    'nationality': schema_1.employees.nationality,
                                    'dateOfBirth': schema_1.employees.dateOfBirth,
                                    'gender': schema_1.employees.gender,
                                    'maritalStatus': schema_1.employees.maritalStatus,
                                    'employeeType': schema_1.employees.employeeType,
                                    'status': schema_1.employees.status,
                                    'position': schema_1.employees.position,
                                    'department': schema_1.employees.department,
                                    'hireDate': schema_1.employees.hireDate,
                                    'salary': schema_1.employees.salary,
                                    'phone': schema_1.employees.phone,
                                    'email': schema_1.employees.email,
                                    'address': schema_1.employees.address,
                                    'emergencyContact': schema_1.employees.emergencyContact,
                                    'emergencyPhone': schema_1.employees.emergencyPhone,
                                    'photoUrl': schema_1.employees.photoUrl,
                                    'documents': schema_1.employees.documents,
                                    'skills': schema_1.employees.skills,
                                    'notes': schema_1.employees.notes,
                                    'isArchived': schema_1.employees.isArchived,
                                    'archiveReason': schema_1.employees.archiveReason,
                                    'createdAt': schema_1.employees.createdAt,
                                    'updatedAt': schema_1.employees.updatedAt
                                }
                            })
                                .from(schema_1.employeeLeaves)
                                .leftJoin(schema_1.employees, (0, drizzle_orm_1.eq)(schema_1.employeeLeaves.employeeId, schema_1.employees.id))
                                .where(drizzle_orm_1.and.apply(void 0, conditions))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results
                                .filter(function (leave) { return leave.employee !== null; })
                                .map(function (leave) { return (__assign(__assign({}, leave), { 'employee': leave.employee })); })];
                    case 2:
                        error_11 = _a.sent();
                        logger_1.log.error('Error fetching company leaves:', error_11);
                        throw new Error('Failed to fetch company leaves');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update an existing employee
     * @description Updates an employee record in the database
     * @async
     * @param {string} id - Employee unique identifier
     * @param {Partial<InsertEmployee>} data - Employee data to update
     * @returns {Promise<Employee>} Updated employee object
     * @throws {Error} When database operation fails
     * @example
     * const updatedEmployee = await storage.updateEmployee("emp-1", {
     *   salary: 3800,
     *   position: "مهندس برمجيات أول"
     * });
     */
    DatabaseStorage.prototype.updateEmployee = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.update(schema_1.employees)
                                .set(__assign(__assign({}, data), { 'updatedAt': new Date() }))
                                .where((0, drizzle_orm_1.eq)(schema_1.employees.id, id)).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to update employee');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_12 = _a.sent();
                        logger_1.log.error('Error updating employee:', error_12);
                        throw new Error('Failed to update employee');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Archive an employee
     * @description Archives an employee record with reason
     * @async
     * @param {string} id - Employee unique identifier
     * @param {string} reason - Archive reason
     * @returns {Promise<Employee>} Archived employee object
     * @throws {Error} When database operation fails
     * @example
     * const archivedEmployee = await storage.archiveEmployee("emp-1", "استقالة الموظف");
     */
    DatabaseStorage.prototype.archiveEmployee = function (id, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.update(schema_1.employees)
                                .set({
                                'isArchived': true,
                                'archiveReason': reason,
                                'updatedAt': new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.employees.id, id))
                                .returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to archive employee');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_13 = _a.sent();
                        logger_1.log.error('Error archiving employee:', error_13);
                        throw new Error('Failed to archive employee');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employee leaves
     * @description Retrieves all leave requests for a specific employee
     * @async
     * @param {string} employeeId - Employee unique identifier
     * @returns {Promise<EmployeeLeave[]>} Array of leave requests
     * @throws {Error} When database operation fails
     * @example
     * const employeeLeaves = await storage.getEmployeeLeaves("emp-1");
     */
    DatabaseStorage.prototype.getEmployeeLeaves = function (employeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.employeeLeaves).where((0, drizzle_orm_1.eq)(schema_1.employeeLeaves.employeeId, employeeId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_14 = _a.sent();
                        logger_1.log.error('Error fetching employee leaves:', error_14);
                        throw new Error('Failed to fetch employee leaves');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new leave request
     * @description Creates a new leave request for an employee
     * @async
     * @param {InsertEmployeeLeave} data - Leave request data
     * @returns {Promise<EmployeeLeave>} Created leave request object
     * @throws {Error} When database operation fails
     * @example
     * const newLeave = await storage.createLeave({
     *   employeeId: "emp-1",
     *   type: "annual",
     *   startDate: "2025-02-01",
     *   endDate: "2025-02-05",
     *   reason: "إجازة سنوية"
     * });
     */
    DatabaseStorage.prototype.createLeave = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.insert(schema_1.employeeLeaves).values(data).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create leave');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_15 = _a.sent();
                        logger_1.log.error('Error creating leave:', error_15);
                        throw new Error('Failed to create leave');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employee deductions
     * @description Retrieves all deductions for a specific employee
     * @async
     * @param {string} employeeId - Employee unique identifier
     * @returns {Promise<EmployeeDeduction[]>} Array of deduction records
     * @throws {Error} When database operation fails
     * @example
     * const employeeDeductions = await storage.getEmployeeDeductions("emp-1");
     */
    DatabaseStorage.prototype.getEmployeeDeductions = function (employeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.employeeDeductions).where((0, drizzle_orm_1.eq)(schema_1.employeeDeductions.employeeId, employeeId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_16 = _a.sent();
                        logger_1.log.error('Error fetching employee deductions:', error_16);
                        throw new Error('Failed to fetch employee deductions');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new deduction record
     * @description Creates a new deduction record for an employee
     * @async
     * @param {InsertEmployeeDeduction} data - Deduction data
     * @param {string} processedBy - User ID who processed the deduction
     * @returns {Promise<EmployeeDeduction>} Created deduction object
     * @throws {Error} When database operation fails
     * @example
     * const newDeduction = await storage.createDeduction({
     *   employeeId: "emp-1",
     *   amount: 100,
     *   reason: "تأخير في الحضور",
     *   date: "2025-01-15"
     * }, "user-1");
     */
    DatabaseStorage.prototype.createDeduction = function (data, processedBy) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.insert(schema_1.employeeDeductions).values(__assign(__assign({}, data), { processedBy: processedBy, 'createdAt': new Date() })).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create deduction');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_17 = _a.sent();
                        logger_1.log.error('Error creating deduction:', error_17);
                        throw new Error('Failed to create deduction');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employee violations
     * @description Retrieves all violations for a specific employee
     * @async
     * @param {string} employeeId - Employee unique identifier
     * @returns {Promise<EmployeeViolation[]>} Array of violation records
     * @throws {Error} When database operation fails
     * @example
     * const employeeViolations = await storage.getEmployeeViolations("emp-1");
     */
    DatabaseStorage.prototype.getEmployeeViolations = function (employeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.employeeViolations).where((0, drizzle_orm_1.eq)(schema_1.employeeViolations.employeeId, employeeId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_18 = _a.sent();
                        logger_1.log.error('Error fetching employee violations:', error_18);
                        throw new Error('Failed to fetch employee violations');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new violation record
     * @description Creates a new violation record for an employee
     * @async
     * @param {InsertEmployeeViolation} data - Violation data
     * @param {string} reportedBy - User ID who reported the violation
     * @returns {Promise<EmployeeViolation>} Created violation object
     * @throws {Error} When database operation fails
     * @example
     * const newViolation = await storage.createViolation({
     *   employeeId: "emp-1",
     *   type: "tardiness",
     *   description: "تأخير متكرر",
     *   date: "2025-01-15"
     * }, "user-1");
     */
    DatabaseStorage.prototype.createViolation = function (data, reportedBy) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.insert(schema_1.employeeViolations).values(__assign(__assign({}, data), { reportedBy: reportedBy, 'createdAt': new Date() })).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create violation');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_19 = _a.sent();
                        logger_1.log.error('Error creating violation:', error_19);
                        throw new Error('Failed to create violation');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all licenses for a company
     * @description Retrieves all licenses belonging to a specific company
     * @async
     * @param {string} companyId - Company unique identifier
     * @returns {Promise<License[]>} Array of licenses for the company
     * @throws {Error} When database operation fails
     * @example
     * const companyLicenses = await storage.getCompanyLicenses("company-1");
     */
    DatabaseStorage.prototype.getCompanyLicenses = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.licenses).where((0, drizzle_orm_1.eq)(schema_1.licenses.companyId, companyId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_20 = _a.sent();
                        logger_1.log.error('Error fetching company licenses:', error_20);
                        throw new Error('Failed to fetch company licenses');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a single license by ID
     * @description Retrieves a specific license by its unique identifier
     * @async
     * @param {string} id - License unique identifier
     * @returns {Promise<License | null>} License object or null if not found
     * @throws {Error} When database operation fails
     * @example
     * const license = await storage.getLicense("license-1");
     */
    DatabaseStorage.prototype.getLicense = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_21;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.licenses).where((0, drizzle_orm_1.eq)(schema_1.licenses.id, id))];
                    case 1:
                        results = _b.sent();
                        return [2 /*return*/, (_a = results[0]) !== null && _a !== void 0 ? _a : null];
                    case 2:
                        error_21 = _b.sent();
                        logger_1.log.error('Error fetching license:', error_21);
                        throw new Error('Failed to fetch license');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new license
     * @description Creates a new license record in the database
     * @async
     * @param {InsertLicense} data - License data to insert
     * @returns {Promise<License>} Created license object
     * @throws {Error} When database operation fails
     * @example
     * const newLicense = await storage.createLicense({
     *   companyId: "company-1",
     *   name: "رخصة تجارية",
     *   type: "commercial",
     *   number: "LIC-001"
     * });
     */
    DatabaseStorage.prototype.createLicense = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.insert(schema_1.licenses).values(data).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create license');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_22 = _a.sent();
                        logger_1.log.error('Error creating license:', error_22);
                        throw new Error('Failed to create license');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update an existing license
     * @description Updates a license record in the database
     * @async
     * @param {string} id - License unique identifier
     * @param {Partial<InsertLicense>} data - License data to update
     * @returns {Promise<License>} Updated license object
     * @throws {Error} When database operation fails
     * @example
     * const updatedLicense = await storage.updateLicense("license-1", {
     *   status: "expired",
     *   expiryDate: "2025-12-31"
     * });
     */
    DatabaseStorage.prototype.updateLicense = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.update(schema_1.licenses).set(data).where((0, drizzle_orm_1.eq)(schema_1.licenses.id, id)).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to update license');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_23 = _a.sent();
                        logger_1.log.error('Error updating license:', error_23);
                        throw new Error('Failed to update license');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all documents for a company
     * @description Retrieves all documents belonging to a specific company
     * @async
     * @param {string} companyId - Company unique identifier
     * @returns {Promise<Document[]>} Array of documents for the company
     * @throws {Error} When database operation fails
     * @example
     * const companyDocuments = await storage.getCompanyDocuments("company-1");
     */
    DatabaseStorage.prototype.getCompanyDocuments = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.documents)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.filter(function (doc) { return doc.entityId === companyId && doc.entityType === 'company'; })];
                    case 2:
                        error_24 = _a.sent();
                        logger_1.log.error('Error fetching company documents:', error_24);
                        throw new Error('Failed to fetch company documents');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get documents for a specific employee
     * @description Retrieves all documents belonging to a specific employee
     * @async
     * @param {string} employeeId - Employee unique identifier
     * @returns {Promise<Document[]>} Array of documents for the employee
     * @throws {Error} When database operation fails
     * @example
     * const employeeDocuments = await storage.getEmployeeDocuments("emp-1");
     */
    DatabaseStorage.prototype.getEmployeeDocuments = function (employeeId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.documents)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.filter(function (doc) { return doc.entityId === employeeId && doc.entityType === 'employee'; })];
                    case 2:
                        error_25 = _a.sent();
                        logger_1.log.error('Error fetching employee documents:', error_25);
                        throw new Error('Failed to fetch employee documents');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new document
     * @description Creates a new document record in the database
     * @async
     * @param {InsertDocument} data - Document data to insert
     * @returns {Promise<Document>} Created document object
     * @throws {Error} When database operation fails
     * @example
     * const newDocument = await storage.createDocument({
     *   companyId: "company-1",
     *   employeeId: "emp-1",
     *   name: "جواز السفر",
     *   type: "passport",
     *   fileUrl: "https://example.com/passport.pdf"
     * });
     */
    DatabaseStorage.prototype.createDocument = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.insert(schema_1.documents).values(data).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create document');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_26 = _a.sent();
                        logger_1.log.error('Error creating document:', error_26);
                        throw new Error('Failed to create document');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a document by ID
     * @description Retrieves a specific document by its ID
     * @async
     * @param {string} id - Document unique identifier
     * @returns {Promise<Document | null>} Document object or null if not found
     * @throws {Error} When database operation fails
     * @example
     * const document = await storage.getDocument("doc-1");
     */
    DatabaseStorage.prototype.getDocument = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_27;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.documents).where((0, drizzle_orm_1.eq)(schema_1.documents.id, id))];
                    case 1:
                        results = _b.sent();
                        return [2 /*return*/, (_a = results[0]) !== null && _a !== void 0 ? _a : null];
                    case 2:
                        error_27 = _b.sent();
                        logger_1.log.error('Error fetching document:', error_27);
                        throw new Error('Failed to fetch document');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update a document
     * @description Updates an existing document record
     * @async
     * @param {string} id - Document unique identifier
     * @param {Partial<InsertDocument>} data - Document data to update
     * @returns {Promise<Document>} Updated document object
     * @throws {Error} When database operation fails
     * @example
     * const updatedDocument = await storage.updateDocument("doc-1", {
     *   name: "جواز السفر المحدث",
     *   description: "جواز سفر محدث"
     * });
     */
    DatabaseStorage.prototype.updateDocument = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.update(schema_1.documents)
                                .set(__assign(__assign({}, data), { 'updatedAt': new Date() }))
                                .where((0, drizzle_orm_1.eq)(schema_1.documents.id, id))
                                .returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to update document');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_28 = _a.sent();
                        logger_1.log.error('Error updating document:', error_28);
                        throw new Error('Failed to update document');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a document
     * @description Deletes a document record from the database
     * @async
     * @param {string} id - Document unique identifier
     * @returns {Promise<void>}
     * @throws {Error} When database operation fails
     * @example
     * await storage.deleteDocument("doc-1");
     */
    DatabaseStorage.prototype.deleteDocument = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.delete(schema_1.documents).where((0, drizzle_orm_1.eq)(schema_1.documents.id, id))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_29 = _a.sent();
                        logger_1.log.error('Error deleting document:', error_29);
                        throw new Error('Failed to delete document');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all notifications for a user
     * @description Retrieves all notifications for a specific user
     * @async
     * @param {string} userId - User unique identifier
     * @returns {Promise<Notification[]>} Array of notifications for the user
     * @throws {Error} When database operation fails
     * @example
     * const userNotifications = await storage.getUserNotifications("user-1");
     */
    DatabaseStorage.prototype.getUserNotifications = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.notifications).where((0, drizzle_orm_1.eq)(schema_1.notifications.userId, userId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_30 = _a.sent();
                        logger_1.log.error('Error fetching user notifications:', error_30);
                        throw new Error('Failed to fetch user notifications');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new notification
     * @description Creates a new notification record in the database
     * @async
     * @param {InsertNotification} data - Notification data to insert
     * @returns {Promise<Notification>} Created notification object
     * @throws {Error} When database operation fails
     * @example
     * const newNotification = await storage.createNotification({
     *   userId: "user-1",
     *   title: "تحديث جديد",
     *   message: "تم تحديث بيانات الموظف",
     *   type: "info"
     * });
     */
    DatabaseStorage.prototype.createNotification = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_31;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.insert(schema_1.notifications).values(data).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create notification');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_31 = _a.sent();
                        logger_1.log.error('Error creating notification:', error_31);
                        throw new Error('Failed to create notification');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Mark notification as read
     * @description Marks a notification as read
     * @async
     * @param {string} id - Notification unique identifier
     * @returns {Promise<Notification>} Updated notification object
     * @throws {Error} When database operation fails
     * @example
     * const updatedNotification = await storage.markNotificationAsRead("notif-1");
     */
    DatabaseStorage.prototype.markNotificationAsRead = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_32;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.update(schema_1.notifications)
                                .set({
                                'isRead': true
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.notifications.id, id))
                                .returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to mark notification as read');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_32 = _a.sent();
                        logger_1.log.error('Error marking notification as read:', error_32);
                        throw new Error('Failed to mark notification as read');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employee statistics for a company
     * @description Retrieves comprehensive employee statistics for a company
     * @async
     * @param {string} companyId - Company unique identifier
     * @returns {Promise<object>} Employee statistics object
     * @throws {Error} When database operation fails
     * @example
     * const stats = await storage.getEmployeeStats("company-1");
     */
    DatabaseStorage.prototype.getEmployeeStats = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var allEmployees, stats, deptCounts, nationalityCounts, error_33;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getCompanyEmployees(companyId)];
                    case 1:
                        allEmployees = _a.sent();
                        stats = {
                            'totalEmployees': allEmployees.length,
                            'activeEmployees': allEmployees.filter(function (emp) { return emp.status === 'active'; }).length,
                            'inactiveEmployees': allEmployees.filter(function (emp) { return emp.status === 'inactive'; }).length,
                            'onLeaveEmployees': allEmployees.filter(function (emp) { return emp.status === 'on_leave'; }).length,
                            'terminatedEmployees': allEmployees.filter(function (emp) { return emp.status === 'terminated'; }).length,
                            'archivedEmployees': allEmployees.filter(function (emp) { return emp.isArchived; }).length,
                            'citizens': allEmployees.filter(function (emp) { return emp.employeeType === 'citizen'; }).length,
                            'expatriates': allEmployees.filter(function (emp) { return emp.employeeType === 'expatriate'; }).length,
                            'averageSalary': allEmployees.length > 0
                                ? allEmployees.reduce(function (sum, emp) { var _a; return sum + ((_a = emp.salary) !== null && _a !== void 0 ? _a : 0); }, 0) / allEmployees.length
                                : 0,
                            'departments': [],
                            'nationalities': []
                        };
                        deptCounts = allEmployees.reduce(function (acc, emp) {
                            var _a;
                            if (emp.department) {
                                acc[emp.department] = ((_a = acc[emp.department]) !== null && _a !== void 0 ? _a : 0) + 1;
                            }
                            return acc;
                        }, {});
                        stats.departments = Object.entries(deptCounts).map(function (_a) {
                            var name = _a[0], count = _a[1];
                            return ({ name: name, count: count });
                        });
                        nationalityCounts = allEmployees.reduce(function (acc, emp) {
                            var _a;
                            if (emp.nationality) {
                                acc[emp.nationality] = ((_a = acc[emp.nationality]) !== null && _a !== void 0 ? _a : 0) + 1;
                            }
                            return acc;
                        }, {});
                        stats.nationalities = Object.entries(nationalityCounts).map(function (_a) {
                            var nationality = _a[0], count = _a[1];
                            return ({
                                nationality: nationality,
                                count: count
                            });
                        });
                        return [2 /*return*/, stats];
                    case 2:
                        error_33 = _a.sent();
                        logger_1.log.error('Error fetching employee stats:', error_33);
                        throw new Error('Failed to fetch employee stats');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search employees with filters
     * @description Searches employees with various filters and search terms
     * @async
     * @param {object} filters - Search filters
     * @returns {Promise<Employee[]>} Array of filtered employees
     * @throws {Error} When database operation fails
     * @example
     * const filteredEmployees = await storage.searchEmployees({
     *   companyId: "company-1",
     *   status: "active",
     *   search: "أحمد"
     * });
     */
    DatabaseStorage.prototype.searchEmployees = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions, results, searchTerm_1, error_34;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        conditions = [];
                        if (filters.companyId) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.employees.companyId, filters.companyId));
                        }
                        if (filters.status) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.employees.status, filters.status));
                        }
                        if (filters.employeeType) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.employees.employeeType, filters.employeeType));
                        }
                        if (filters.department) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.employees.department, filters.department));
                        }
                        if (filters.position) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.employees.position, filters.position));
                        }
                        if (filters.nationality) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.employees.nationality, filters.nationality));
                        }
                        if (filters.isArchived !== undefined) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.employees.isArchived, filters.isArchived));
                        }
                        results = void 0;
                        if (!(conditions.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.db.select().from(schema_1.employees).where(drizzle_orm_1.and.apply(void 0, conditions))];
                    case 1:
                        results = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, db_1.db.select().from(schema_1.employees)];
                    case 3:
                        results = _a.sent();
                        _a.label = 4;
                    case 4:
                        // Apply search filter if provided
                        if (filters.search) {
                            searchTerm_1 = filters.search.toLowerCase();
                            return [2 /*return*/, results.filter(function (emp) {
                                    var _a, _b, _c, _d, _e, _f;
                                    return ((_a = emp.firstName) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm_1)) ||
                                        ((_b = emp.lastName) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm_1)) ||
                                        ((_c = emp.arabicName) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(searchTerm_1)) ||
                                        ((_d = emp.englishName) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes(searchTerm_1)) ||
                                        ((_e = emp.position) === null || _e === void 0 ? void 0 : _e.toLowerCase().includes(searchTerm_1)) ||
                                        ((_f = emp.department) === null || _f === void 0 ? void 0 : _f.toLowerCase().includes(searchTerm_1));
                                })];
                        }
                        return [2 /*return*/, results];
                    case 5:
                        error_34 = _a.sent();
                        logger_1.log.error('Error searching employees:', error_34);
                        throw new Error('Failed to search employees');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employees with expiring documents
     * @description Retrieves employees with documents expiring soon
     * @async
     * @param {string} companyId - Company unique identifier
     * @param {number} daysThreshold - Number of days to check for expiration
     * @returns {Promise<Employee[]>} Array of employees with expiring documents
     * @throws {Error} When database operation fails
     * @example
     * const expiringEmployees = await storage.getEmployeesWithExpiringDocuments("company-1", 30);
     */
    DatabaseStorage.prototype.getEmployeesWithExpiringDocuments = function (companyId_1) {
        return __awaiter(this, arguments, void 0, function (companyId, daysThreshold) {
            var allEmployees, thresholdDate_1, error_35;
            if (daysThreshold === void 0) { daysThreshold = 30; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getCompanyEmployees(companyId)];
                    case 1:
                        allEmployees = _a.sent();
                        thresholdDate_1 = new Date();
                        thresholdDate_1.setDate(thresholdDate_1.getDate() + daysThreshold);
                        return [2 /*return*/, allEmployees.filter(function (emp) {
                                // Check various expiry dates
                                var residenceExpiry = emp.residenceExpiry ? new Date(emp.residenceExpiry) : null;
                                var workPermitEnd = emp.workPermitEnd ? new Date(emp.workPermitEnd) : null;
                                return (residenceExpiry && residenceExpiry <= thresholdDate_1) ||
                                    (workPermitEnd && workPermitEnd <= thresholdDate_1);
                            })];
                    case 2:
                        error_35 = _a.sent();
                        logger_1.log.error('Error fetching employees with expiring documents:', error_35);
                        throw new Error('Failed to fetch employees with expiring documents');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get company statistics
     * @description Retrieves comprehensive statistics for a company
     * @async
     * @param {string} companyId - Company unique identifier
     * @returns {Promise<object>} Company statistics object
     * @throws {Error} When database operation fails
     * @example
     * const companyStats = await storage.getCompanyStats("company-1");
     */
    DatabaseStorage.prototype.getCompanyStats = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, employees_1, licenses_1, leaves, deductions, violations, urgentAlerts, error_36;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this.getCompanyEmployees(companyId),
                                this.getCompanyLicenses(companyId),
                                this.getCompanyLeaves(companyId),
                                this.getCompanyEmployeeDeductions(companyId),
                                this.getCompanyEmployeeViolations(companyId)
                            ])];
                    case 1:
                        _a = _b.sent(), employees_1 = _a[0], licenses_1 = _a[1], leaves = _a[2], deductions = _a[3], violations = _a[4];
                        return [4 /*yield*/, this.getEmployeesWithExpiringDocuments(companyId, 7)];
                    case 2:
                        urgentAlerts = _b.sent();
                        return [2 /*return*/, {
                                'totalEmployees': employees_1.length,
                                'totalLicenses': licenses_1.length,
                                'activeEmployees': employees_1.filter(function (emp) { return emp.status === 'active'; }).length,
                                'urgentAlerts': urgentAlerts.length,
                                'recentLeaves': leaves.filter(function (leave) {
                                    return new Date(leave.startDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                                }).length,
                                'pendingLeaves': leaves.filter(function (leave) { return leave.status === 'pending'; }).length,
                                'totalDeductions': deductions.length,
                                'totalViolations': violations.length
                            }];
                    case 3:
                        error_36 = _b.sent();
                        logger_1.log.error('Error fetching company stats:', error_36);
                        throw new Error('Failed to fetch company stats');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employee deductions for a company
     * @description Retrieves all deductions for employees of a specific company
     * @async
     * @param {string} companyId - Company unique identifier
     * @returns {Promise<EmployeeDeduction[]>} Array of deduction records
     * @throws {Error} When database operation fails
     * @example
     * const companyDeductions = await storage.getCompanyEmployeeDeductions(companyId);
     */
    DatabaseStorage.prototype.getCompanyEmployeeDeductions = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_37;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.employeeDeductions)
                                .leftJoin(schema_1.employees, (0, drizzle_orm_1.eq)(schema_1.employeeDeductions.employeeId, schema_1.employees.id))
                                .where((0, drizzle_orm_1.eq)(schema_1.employees.companyId, companyId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.map(function (result) { return result.employee_deductions; })];
                    case 2:
                        error_37 = _a.sent();
                        logger_1.log.error('Error fetching company deductions:', error_37);
                        throw new Error('Failed to fetch company deductions');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get employee violations for a company
     * @description Retrieves all violations for employees of a specific company
     * @async
     * @param {string} companyId - Company unique identifier
     * @returns {Promise<EmployeeViolation[]>} Array of violation records
     * @throws {Error} When database operation fails
     * @example
     * const companyViolations = await storage.getCompanyEmployeeViolations(companyId);
     */
    DatabaseStorage.prototype.getCompanyEmployeeViolations = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_38;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.employeeViolations)
                                .leftJoin(schema_1.employees, (0, drizzle_orm_1.eq)(schema_1.employeeViolations.employeeId, schema_1.employees.id))
                                .where((0, drizzle_orm_1.eq)(schema_1.employees.companyId, companyId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.map(function (result) { return result.employee_violations; })];
                    case 2:
                        error_38 = _a.sent();
                        logger_1.log.error('Error fetching company violations:', error_38);
                        throw new Error('Failed to fetch company violations');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all users
     * @description Retrieves all users from the database
     * @async
     * @returns {Promise<User[]>} Array of all users
     * @throws {Error} When database operation fails
     * @example
     * const users = await storage.getAllUsers();
     */
    DatabaseStorage.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_39;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.users)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_39 = _a.sent();
                        logger_1.log.error('Error fetching users:', error_39);
                        throw new Error('Failed to fetch users');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get users by company
     * @description Retrieves all users associated with a specific company
     * @async
     * @param {string} companyId - Company unique identifier
     * @returns {Promise<User[]>} Array of users for the company
     * @throws {Error} When database operation fails
     * @example
     * const companyUsers = await storage.getCompanyUsers("company-1");
     */
    DatabaseStorage.prototype.getCompanyUsers = function (companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_40;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.companyUsers)
                                .leftJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_1.companyUsers.userId, schema_1.users.id))
                                .where((0, drizzle_orm_1.eq)(schema_1.companyUsers.companyId, companyId))];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.map(function (result) { return result.users; }).filter(function (user) { return user !== null; })];
                    case 2:
                        error_40 = _a.sent();
                        logger_1.log.error('Error fetching company users:', error_40);
                        throw new Error('Failed to fetch company users');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new user
     * @description Creates a new user record in the database
     * @async
     * @param {InsertUser} data - User data to insert
     * @returns {Promise<User>} Created user object
     * @throws {Error} When database operation fails
     * @example
     * const newUser = await storage.createUser({
     *   email: "user@example.com",
     *   firstName: "أحمد",
     *   lastName: "محمد",
     *   role: "employee"
     * });
     */
    DatabaseStorage.prototype.createUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, results, error_41;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userData = __assign(__assign({}, data), { 'permissions': Array.isArray(data.permissions) ? JSON.stringify(data.permissions) : data.permissions });
                        return [4 /*yield*/, db_1.db.insert(schema_1.users).values(userData).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create user');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_41 = _a.sent();
                        logger_1.log.error('Error creating user:', error_41);
                        throw new Error('Failed to create user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update an existing user
     * @description Updates a user record in the database
     * @async
     * @param {string} id - User unique identifier
     * @param {Partial<UpsertUser>} data - User data to update
     * @returns {Promise<User>} Updated user object
     * @throws {Error} When database operation fails
     * @example
     * const updatedUser = await storage.updateUser("user-1", {
     *   role: "supervisor",
     *   isActive: true
     * });
     */
    DatabaseStorage.prototype.updateUser = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, results, error_42;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userData = __assign(__assign({}, data), { 'permissions': data.permissions ? (Array.isArray(data.permissions) ? JSON.stringify(data.permissions) : data.permissions) : undefined });
                        return [4 /*yield*/, db_1.db.update(schema_1.users).set(userData).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to update user');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_42 = _a.sent();
                        logger_1.log.error('Error updating user:', error_42);
                        throw new Error('Failed to update user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Search users with filters
     * @description Searches users with various filters and search terms
     * @async
     * @param {object} filters - Search filters
     * @returns {Promise<User[]>} Array of filtered users
     * @throws {Error} When database operation fails
     * @example
     * const filteredUsers = await storage.searchUsers({
     *   role: "employee",
     *   isActive: true,
     *   search: "أحمد"
     * });
     */
    DatabaseStorage.prototype.searchUsers = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions, results, searchTerm_2, error_43;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        conditions = [];
                        if (filters.role) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.users.role, filters.role));
                        }
                        if (filters.companyId) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.users.companyId, filters.companyId));
                        }
                        if (filters.isActive !== undefined) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.users.isActive, filters.isActive));
                        }
                        results = void 0;
                        if (!(conditions.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.db.select().from(schema_1.users).where(drizzle_orm_1.and.apply(void 0, conditions))];
                    case 1:
                        results = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, db_1.db.select().from(schema_1.users)];
                    case 3:
                        results = _a.sent();
                        _a.label = 4;
                    case 4:
                        // Apply search filter if provided
                        if (filters.search) {
                            searchTerm_2 = filters.search.toLowerCase();
                            return [2 /*return*/, results.filter(function (user) {
                                    var _a, _b, _c;
                                    return ((_a = user.firstName) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm_2)) ||
                                        ((_b = user.lastName) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchTerm_2)) ||
                                        ((_c = user.email) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(searchTerm_2));
                                })];
                        }
                        return [2 /*return*/, results];
                    case 5:
                        error_43 = _a.sent();
                        logger_1.log.error('Error searching users:', error_43);
                        throw new Error('Failed to search users');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get user statistics
     * @description Retrieves comprehensive user statistics
     * @async
     * @returns {Promise<object>} User statistics object
     * @throws {Error} When database operation fails
     * @example
     * const userStats = await storage.getUserStats();
     */
    DatabaseStorage.prototype.getUserStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, stats, roleCounts, error_44;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAllUsers()];
                    case 1:
                        allUsers = _a.sent();
                        stats = {
                            'totalUsers': allUsers.length,
                            'activeUsers': allUsers.filter(function (user) { return user.isActive; }).length,
                            'inactiveUsers': allUsers.filter(function (user) { return !user.isActive; }).length,
                            'usersByRole': [],
                            'verifiedUsers': 0, // This would need additional fields in the schema
                            'unverifiedUsers': 0
                        };
                        roleCounts = allUsers.reduce(function (acc, user) {
                            var _a;
                            var role = (_a = user.role) !== null && _a !== void 0 ? _a : "unknown";
                            acc[role] = (acc[role] || 0) + 1;
                            return acc;
                        }, {});
                        stats.usersByRole = Object.entries(roleCounts).map(function (_a) {
                            var role = _a[0], count = _a[1];
                            return ({ role: role, count: count });
                        });
                        return [2 /*return*/, stats];
                    case 2:
                        error_44 = _a.sent();
                        logger_1.log.error('Error fetching user stats:', error_44);
                        throw new Error('Failed to fetch user stats');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update user login information
     * @description Updates user login count and last login time
     * @async
     * @param {string} userId - User unique identifier
     * @returns {Promise<User>} Updated user object
     * @throws {Error} When database operation fails
     * @example
     * const updatedUser = await storage.updateUserLogin("user-1");
     */
    DatabaseStorage.prototype.updateUserLogin = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_45;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, withDbMetrics('update', 'users', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, db_1.db.update(schema_1.users)
                                            .set({
                                            'updatedAt': new Date()
                                        })
                                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
                                            .returning()];
                                });
                            }); })];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to update user login');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_45 = _a.sent();
                        logger_1.log.error('Error updating user login:', error_45);
                        throw new Error('Failed to update user login');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Deactivate a user
     * @description Deactivates a user account
     * @async
     * @param {string} id - User unique identifier
     * @returns {Promise<User>} Deactivated user object
     * @throws {Error} When database operation fails
     * @example
     * const deactivatedUser = await storage.deactivateUser("user-1");
     */
    DatabaseStorage.prototype.deactivateUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_46;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.update(schema_1.users)
                                .set({
                                'isActive': false,
                                'updatedAt': new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
                                .returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to deactivate user');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_46 = _a.sent();
                        logger_1.log.error('Error deactivating user:', error_46);
                        throw new Error('Failed to deactivate user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Activate a user
     * @description Activates a user account
     * @async
     * @param {string} id - User unique identifier
     * @returns {Promise<User>} Activated user object
     * @throws {Error} When database operation fails
     * @example
     * const activatedUser = await storage.activateUser("user-1");
     */
    DatabaseStorage.prototype.activateUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_47;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.update(schema_1.users)
                                .set({
                                'isActive': true,
                                'updatedAt': new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
                                .returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to activate user');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_47 = _a.sent();
                        logger_1.log.error('Error activating user:', error_47);
                        throw new Error('Failed to activate user');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get user by email
     * @description Retrieves a user by their email address
     * @async
     * @param {string} email - User's email address
     * @returns {Promise<User | null>} User object or null if not found
     * @throws {Error} When database operation fails
     * @example
     * const user = await storage.getUserByEmail("user@example.com");
     */
    DatabaseStorage.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_48;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, withDbMetrics('select', 'users', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email))];
                            }); }); })];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results[0] || null];
                    case 2:
                        error_48 = _a.sent();
                        logger_1.log.error('Error fetching user by email:', error_48);
                        throw new Error('Failed to fetch user by email');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update user password
     * @description Updates user's password hash and last password change time
     * @async
     * @param {string} userId - User unique identifier
     * @param {string} hashedPassword - Hashed password
     * @returns {Promise<User>} Updated user object
     * @throws {Error} When database operation fails
     * @example
     * const updatedUser = await storage.updateUserPassword("user-1", hashedPassword);
     */
    DatabaseStorage.prototype.updateUserPassword = function (userId, hashedPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_49;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db.update(schema_1.users)
                                .set({
                                'password': hashedPassword,
                                'lastPasswordChange': Math.floor(Date.now() / 1000),
                                'updatedAt': new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
                                .returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to update user password');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_49 = _a.sent();
                        logger_1.log.error('Error updating user password:', error_49);
                        throw new Error('Failed to update user password');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set email verification token
     * @description Sets email verification token and expiration time
     * @async
     * @param {string} userId - User unique identifier
     * @param {string} token - Verification token
     * @returns {Promise<User>} Updated user object
     * @throws {Error} When database operation fails
     * @example
     * const user = await storage.setEmailVerificationToken("user-1", "token123");
     */
    DatabaseStorage.prototype.setEmailVerificationToken = function (userId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var expiresAt, results, error_50;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        expiresAt = Math.floor(Date.now() / 1000) + (24 * 60 * 60);
                        return [4 /*yield*/, db_1.db.update(schema_1.users)
                                .set({
                                'emailVerificationToken': token,
                                'emailVerificationExpires': expiresAt,
                                'updatedAt': new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
                                .returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to set email verification token');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_50 = _a.sent();
                        logger_1.log.error('Error setting email verification token:', error_50);
                        throw new Error('Failed to set email verification token');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Verify email with token
     * @description Verifies user email using verification token
     * @async
     * @param {string} token - Verification token
     * @returns {Promise<User | null>} User object or null if token invalid
     * @throws {Error} When database operation fails
     * @example
     * const user = await storage.verifyEmailWithToken("token123");
     */
    DatabaseStorage.prototype.verifyEmailWithToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var now, results, user, updatedResults, error_51;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        now = Math.floor(Date.now() / 1000);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.users)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.users.emailVerificationToken, token), (0, drizzle_orm_1.gt)(schema_1.users.emailVerificationExpires, now)))];
                    case 1:
                        results = _a.sent();
                        if (results.length === 0) {
                            return [2 /*return*/, null];
                        }
                        user = results[0];
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, db_1.db.update(schema_1.users)
                                .set({
                                'emailVerified': true,
                                'emailVerificationToken': null,
                                'emailVerificationExpires': null,
                                'updatedAt': new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.id))
                                .returning()];
                    case 2:
                        updatedResults = _a.sent();
                        if (!updatedResults[0]) {
                            throw new Error('Failed to verify email with token');
                        }
                        return [2 /*return*/, updatedResults[0]];
                    case 3:
                        error_51 = _a.sent();
                        logger_1.log.error('Error verifying email with token:', error_51);
                        throw new Error('Failed to verify email with token');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set password reset token
     * @description Sets password reset token and expiration time
     * @async
     * @param {string} userId - User unique identifier
     * @param {string} token - Reset token
     * @returns {Promise<User>} Updated user object
     * @throws {Error} When database operation fails
     * @example
     * const user = await storage.setPasswordResetToken("user-1", "token123");
     */
    DatabaseStorage.prototype.setPasswordResetToken = function (userId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var expiresAt, results, error_52;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        expiresAt = Math.floor(Date.now() / 1000) + (60 * 60);
                        return [4 /*yield*/, db_1.db.update(schema_1.users)
                                .set({
                                'passwordResetToken': token,
                                'passwordResetExpires': expiresAt,
                                'updatedAt': new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
                                .returning()];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to set password reset token');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_52 = _a.sent();
                        logger_1.log.error('Error setting password reset token:', error_52);
                        throw new Error('Failed to set password reset token');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reset password with token
     * @description Resets user password using reset token
     * @async
     * @param {string} token - Reset token
     * @param {string} hashedPassword - New hashed password
     * @returns {Promise<User | null>} User object or null if token invalid
     * @throws {Error} When database operation fails
     * @example
     * const user = await storage.resetPasswordWithToken("token123", hashedPassword);
     */
    DatabaseStorage.prototype.resetPasswordWithToken = function (token, hashedPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var now, results, user, updatedResults, error_53;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        now = Math.floor(Date.now() / 1000);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.users)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.users.passwordResetToken, token), (0, drizzle_orm_1.gt)(schema_1.users.passwordResetExpires, now)))];
                    case 1:
                        results = _a.sent();
                        if (results.length === 0) {
                            return [2 /*return*/, null];
                        }
                        user = results[0];
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, db_1.db.update(schema_1.users)
                                .set({
                                'password': hashedPassword,
                                'passwordResetToken': null,
                                'passwordResetExpires': null,
                                'lastPasswordChange': now,
                                'updatedAt': new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.id))
                                .returning()];
                    case 2:
                        updatedResults = _a.sent();
                        if (!updatedResults[0]) {
                            throw new Error('Failed to reset password with token');
                        }
                        return [2 /*return*/, updatedResults[0]];
                    case 3:
                        error_53 = _a.sent();
                        logger_1.log.error('Error resetting password with token:', error_53);
                        throw new Error('Failed to reset password with token');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create refresh token record
     * @async
     * @param {InsertRefreshToken} data - Refresh token data
     * @returns {Promise<RefreshToken>} Created token record
     */
    DatabaseStorage.prototype.createRefreshToken = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_54;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, withDbMetrics('insert', 'refresh_tokens', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, db_1.db.insert(schema_1.refreshTokens).values(data).returning()];
                            }); }); })];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to create refresh token');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_54 = _a.sent();
                        logger_1.log.error('Error creating refresh token:', error_54);
                        throw new Error('Failed to create refresh token');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Find refresh token by hash
     * @async
     * @param {string} tokenHash - HMAC hash of token
     * @returns {Promise<RefreshToken | null>} Token record or null
     */
    DatabaseStorage.prototype.findRefreshToken = function (tokenHash) {
        return __awaiter(this, void 0, void 0, function () {
            var results, error_55;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, withDbMetrics('select', 'refresh_tokens', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, db_1.db.select().from(schema_1.refreshTokens).where((0, drizzle_orm_1.eq)(schema_1.refreshTokens.tokenHash, tokenHash))];
                            }); }); })];
                    case 1:
                        results = _b.sent();
                        return [2 /*return*/, (_a = results[0]) !== null && _a !== void 0 ? _a : null];
                    case 2:
                        error_55 = _b.sent();
                        logger_1.log.error('Error finding refresh token:', error_55);
                        throw new Error('Failed to find refresh token');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Revoke a refresh token
     * @async
     * @param {string} id - Token ID
     * @param {string} [replacedBy] - Replacement token ID
     */
    DatabaseStorage.prototype.revokeRefreshToken = function (id, replacedBy) {
        return __awaiter(this, void 0, void 0, function () {
            var error_56;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, withDbMetrics('update', 'refresh_tokens', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, db_1.db.update(schema_1.refreshTokens)
                                            .set(__assign({ 'revokedAt': new Date() }, (replacedBy ? { 'replacedBy': replacedBy } : {})))
                                            .where((0, drizzle_orm_1.eq)(schema_1.refreshTokens.id, id))];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_56 = _a.sent();
                        logger_1.log.error('Error revoking refresh token:', error_56);
                        throw new Error('Failed to revoke refresh token');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Revoke all tokens in a family
     * @async
     * @param {string} familyId - Token family ID
     */
    DatabaseStorage.prototype.revokeRefreshTokenFamily = function (familyId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_57;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, withDbMetrics('update', 'refresh_tokens', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, db_1.db.update(schema_1.refreshTokens)
                                            .set({ 'revokedAt': new Date() })
                                            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.refreshTokens.familyId, familyId), (0, drizzle_orm_1.isNull)(schema_1.refreshTokens.revokedAt)))];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_57 = _a.sent();
                        logger_1.log.error('Error revoking refresh token family:', error_57);
                        throw new Error('Failed to revoke refresh token family');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Invalidate a refresh token
     * @async
     * @param {string} token - Raw refresh token
     * @returns {Promise<RefreshToken | null>} Revoked token record
     */
    DatabaseStorage.prototype.invalidateRefreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenHash, stored, error_58;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        tokenHash = hashTokenInternal(token);
                        return [4 /*yield*/, this.findRefreshToken(tokenHash)];
                    case 1:
                        stored = _a.sent();
                        if (!stored) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.revokeRefreshToken(stored.id)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, stored !== null && stored !== void 0 ? stored : null];
                    case 4:
                        error_58 = _a.sent();
                        logger_1.log.error('Error invalidating refresh token:', error_58);
                        throw new Error('Failed to invalidate refresh token');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check if refresh token is revoked
     * @async
     * @param {string} token - Raw refresh token
     * @returns {Promise<boolean>} True if token is revoked
     */
    DatabaseStorage.prototype.isRefreshTokenBlacklisted = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var tokenHash, stored, error_59;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        tokenHash = hashTokenInternal(token);
                        return [4 /*yield*/, this.findRefreshToken(tokenHash)];
                    case 1:
                        stored = _a.sent();
                        return [2 /*return*/, !!(stored === null || stored === void 0 ? void 0 : stored.revokedAt)];
                    case 2:
                        error_59 = _a.sent();
                        logger_1.log.error('Error checking refresh token blacklist:', error_59);
                        throw new Error('Failed to check refresh token');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Update user last login
     * @description Updates user's last login timestamp
     * @async
     * @param {string} userId - User unique identifier
     * @returns {Promise<User>} Updated user object
     * @throws {Error} When database operation fails
     * @example
     * const user = await storage.updateUserLastLogin("user-1");
     */
    DatabaseStorage.prototype.updateUserLastLogin = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var now_1, results, error_60;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        now_1 = Math.floor(Date.now() / 1000);
                        return [4 /*yield*/, withDbMetrics('update', 'users', function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, db_1.db.update(schema_1.users)
                                            .set({
                                            'lastLoginAt': now_1,
                                            'updatedAt': new Date()
                                        })
                                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
                                            .returning()];
                                });
                            }); })];
                    case 1:
                        results = _a.sent();
                        if (!results[0]) {
                            throw new Error('Failed to update user last login');
                        }
                        return [2 /*return*/, results[0]];
                    case 2:
                        error_60 = _a.sent();
                        logger_1.log.error('Error updating user last login:', error_60);
                        throw new Error('Failed to update user last login');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get user permissions
     * @description Retrieves user permissions for a specific company or all permissions
     * @async
     * @param {string} userId - User unique identifier
     * @param {string} [companyId] - Optional company ID to filter permissions
     * @returns {Promise<string[]>} Array of permission strings
     * @throws {Error} When database operation fails
     * @example
     * const permissions = await storage.getUserPermissions("user-1", "company-1");
     */
    DatabaseStorage.prototype.getUserPermissions = function (userId, _companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, rolePermissions, error_61;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getUser(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, []];
                        }
                        rolePermissions = {
                            'super_admin': ['*'],
                            'company_manager': ['read', 'write', 'delete', 'manage_users', 'manage_employees'],
                            'employee': ['read', 'write'],
                            'supervisor': ['read', 'write', 'manage_employees'],
                            'worker': ['read']
                        };
                        return [2 /*return*/, rolePermissions[user.role] || ['read']];
                    case 2:
                        error_61 = _a.sent();
                        logger_1.log.error('Error fetching user permissions:', error_61);
                        throw new Error('Failed to fetch user permissions');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get user roles
     * @description Retrieves user roles for a specific company or all roles
     * @async
     * @param {string} userId - User unique identifier
     * @param {string} [companyId] - Optional company ID to filter roles
     * @returns {Promise<string[]>} Array of role strings
     * @throws {Error} When database operation fails
     * @example
     * const roles = await storage.getUserRoles("user-1", "company-1");
     */
    DatabaseStorage.prototype.getUserRoles = function (userId, _companyId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_62;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getUser(userId)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, []];
                        }
                        // For now, return the user's primary role
                        // In a real implementation, this would query a roles table
                        return [2 /*return*/, [user.role]];
                    case 2:
                        error_62 = _a.sent();
                        logger_1.log.error('Error fetching user roles:', error_62);
                        throw new Error('Failed to fetch user roles');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DatabaseStorage;
}());
exports.DatabaseStorage = DatabaseStorage;
/**
 * Database storage instance
 * @description Singleton instance of DatabaseStorage for use throughout the application
 * @type {DatabaseStorage}
 * @example
 * import { storage } from './models/storage';
 * const companies = await storage.getAllCompanies();
 */
exports.storage = new DatabaseStorage();
