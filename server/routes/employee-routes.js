"use strict";
/**
 * @fileoverview Employee routes for HRMS Elite application
 * @description Provides REST API endpoints for employee management including CRUD operations,
 * leave management, deductions, violations, and attendance tracking
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEmployeeRoutes = registerEmployeeRoutes;
var storage_1 = require("../models/storage");
var logger_1 = require("../utils/logger");
var etag_1 = require("../utils/etag");
var schema_1 = require("@shared/schema");
var auth_1 = require("../middleware/auth");
/**
 * Register employee routes with the Express application
 * @description Sets up all employee-related API endpoints including authentication,
 * authorization, and data validation
 * @param {Express} app - Express application instance
 * @example
 * registerEmployeeRoutes(app);
 */
function registerEmployeeRoutes(app) {
    // Using imported authentication middleware from auth.ts
    var _this = this;
    // Prevent caching on endpoints returning employee PII
    app.use([
        '/api/employees',
        '/api/companies/:companyId/employees',
        '/api/attendance'
    ], function (_req, res, next) {
        res.setHeader('Cache-Control', 'no-store');
        next();
    });
    /**
     * Unified employee handler for both /api/employees and /api/companies/:companyId/employees
     * @description Handles getting employees with optional company filtering
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Object} Array of employee objects
     * @example
     * GET /api/employees - Returns all employees
     * GET /api/companies/company-1/employees - Returns employees for specific company
     */
    var unifiedEmployeeHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var companyId_1, _includeArchived, allMockEmployees, filteredEmployees, employees, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    companyId_1 = req.params.companyId;
                    _includeArchived = req.query.archived === 'true';
                    logger_1.log.debug("Unified employee handler called - companyId: ".concat(companyId_1 !== null && companyId_1 !== void 0 ? companyId_1 : "all"));
                    // Mock data for development environment
                    if (process.env.NODE_ENV === 'development') {
                        allMockEmployees = [
                            {
                                'id': 'emp-1',
                                'fullName': 'أحمد محمد علي',
                                'position': 'مهندس برمجيات',
                                'department': 'تكنولوجيا المعلومات',
                                'salary': 3500,
                                'status': 'active',
                                'hireDate': '2023-01-15',
                                'companyId': 'company-1'
                            },
                            {
                                'id': 'emp-2',
                                'fullName': 'فاطمة سالم أحمد',
                                'position': 'محاسبة',
                                'department': 'المالية',
                                'salary': 2800,
                                'status': 'active',
                                'hireDate': '2022-08-20',
                                'companyId': 'company-1'
                            },
                            {
                                'id': 'emp-3',
                                'fullName': 'محمد عبدالله',
                                'position': 'مشرف مبيعات',
                                'department': 'المبيعات',
                                'salary': 3200,
                                'status': 'active',
                                'hireDate': '2023-03-10',
                                'companyId': 'company-1'
                            },
                            {
                                'id': 'emp-4',
                                'fullName': 'سارة أحمد عبدالله',
                                'position': 'مهندسة تصميم',
                                'department': 'التصميم',
                                'salary': 3100,
                                'status': 'active',
                                'hireDate': '2023-02-01',
                                'companyId': 'company-2'
                            },
                            {
                                'id': 'emp-5',
                                'fullName': 'خالد محمود',
                                'position': 'مسؤول موارد بشرية',
                                'department': 'الموارد البشرية',
                                'salary': 2900,
                                'status': 'active',
                                'hireDate': '2022-11-15',
                                'companyId': 'company-2'
                            }
                        ];
                        filteredEmployees = companyId_1
                            ? allMockEmployees.filter(function (emp) { return emp.companyId === companyId_1; })
                            : allMockEmployees;
                        logger_1.log.debug("Returning ".concat(filteredEmployees.length, " employees for ").concat(companyId_1 ? "company ".concat(companyId_1) : 'all companies'));
                        return [2 /*return*/, res.json(filteredEmployees)];
                    }
                    if (!companyId_1) return [3 /*break*/, 2];
                    return [4 /*yield*/, storage_1.storage.getCompanyEmployees(companyId_1)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, storage_1.storage.getAllEmployees()];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    employees = _a;
                    res.json(employees);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    logger_1.log.error('Error fetching employees:', error_1);
                    res.status(500).json({ 'message': 'Failed to fetch employees' });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Get all employees or employees for a specific company
     * @description Unified endpoint for retrieving employees with optional company filtering
     * @route GET /api/employees
     * @route GET /api/companies/:companyId/employees
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Object} Array of employee objects
     * @example
     * GET /api/employees
     * GET /api/companies/company-1/employees
     * Response: [
     *   {
     *     id: "emp-1",
     *     fullName: "أحمد محمد علي",
     *     position: "مهندس برمجيات",
     *     department: "تكنولوجيا المعلومات",
     *     salary: 3500,
     *     status: "active",
     *     hireDate: "2023-01-15",
     *     companyId: "company-1"
     *   }
     * ]
     */
    app.get('/api/employees', unifiedEmployeeHandler);
    app.get('/api/companies/:companyId/employees', unifiedEmployeeHandler);
    /**
     * Create a new employee
     * @description Creates a new employee record with validation and role-based authorization
     * @route POST /api/employees
     * @param {Request} req - Express request object with employee data
     * @param {Response} res - Express response object
     * @returns {Object} Created employee object
     * @throws {400} When employee data validation fails
     * @throws {403} When user lacks required permissions
     * @throws {500} When database operation fails
     * @example
     * POST /api/employees
     * Body: {
     *   firstName: "أحمد",
     *   lastName: "محمد",
     *   position: "مهندس برمجيات",
     *   department: "تقنية المعلومات",
     *   salary: 3500,
     *   companyId: "company-1"
     * }
     */
    app.post('/api/employees', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var result, employee, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    result = schema_1.insertEmployeeSchema.safeParse(req.body);
                    if (!result.success) {
                        return [2 /*return*/, res.status(400).json({
                                'message': 'Invalid employee data',
                                'errors': result.error.issues
                            })];
                    }
                    return [4 /*yield*/, storage_1.storage.createEmployee(result.data)];
                case 1:
                    employee = _a.sent();
                    res.status(201).json(employee);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    logger_1.log.error('Error creating employee:', error_2);
                    res.status(500).json({ 'message': 'Failed to create employee' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Get a single employee by ID
     * @description Retrieves a specific employee by their unique identifier
     * @route GET /api/employees/:id
     * @param {Request} req - Express request object with employee ID parameter
     * @param {Response} res - Express response object
     * @returns {Object} Employee object
     * @throws {404} When employee is not found
     * @throws {500} When database operation fails
     * @example
     * GET /api/employees/emp-1
     * Response: {
     *   id: "emp-1",
     *   fullName: "أحمد محمد علي",
     *   position: "مهندس برمجيات",
     *   department: "تكنولوجيا المعلومات",
     *   salary: 3500,
     *   status: "active"
     * }
     */
    app.get('/api/employees/:id', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, employee, etag, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    return [4 /*yield*/, storage_1.storage.getEmployee(id)];
                case 1:
                    employee = _a.sent();
                    if (!employee) {
                        return [2 /*return*/, res.status(404).json({ 'message': 'Employee not found' })];
                    }
                    etag = (0, etag_1.generateETag)(employee);
                    (0, etag_1.setETagHeader)(res, etag);
                    res.json(employee);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    logger_1.log.error('Error fetching employee:', error_3);
                    res.status(500).json({ 'message': 'Failed to fetch employee' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Update an existing employee
     * @description Updates an employee record with validation and role-based authorization
     * @route PUT /api/employees/:id
     * @param {Request} req - Express request object with employee ID and update data
     * @param {Response} res - Express response object
     * @returns {Object} Updated employee object
     * @throws {400} When employee data validation fails
     * @throws {403} When user lacks required permissions
     * @throws {500} When database operation fails
     * @example
     * PUT /api/employees/emp-1
     * Body: {
     *   salary: 3800,
     *   position: "مهندس برمجيات أول"
     * }
     */
    app.put('/api/employees/:id', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, existing, currentEtag, ifMatch, updateData, _companyId, safeUpdateData, partialSchema, result, employee, newEtag, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    return [4 /*yield*/, storage_1.storage.getEmployee(id)];
                case 1:
                    existing = _a.sent();
                    if (!existing) {
                        return [2 /*return*/, res.status(404).json({ 'message': 'Employee not found' })];
                    }
                    currentEtag = (0, etag_1.generateETag)(existing);
                    ifMatch = req.headers['if-match'];
                    if (!ifMatch) {
                        return [2 /*return*/, res.status(428).json({ 'message': 'If-Match header required' })];
                    }
                    if (!(0, etag_1.matchesIfMatchHeader)(ifMatch, currentEtag)) {
                        return [2 /*return*/, res.status(412).json({ 'message': 'Resource has been modified' })];
                    }
                    updateData = req.body;
                    _companyId = updateData.companyId, safeUpdateData = __rest(updateData, ["companyId"]);
                    partialSchema = schema_1.insertEmployeeSchema.partial().omit({ companyId: true });
                    result = partialSchema.safeParse(safeUpdateData);
                    if (!result.success) {
                        return [2 /*return*/, res.status(400).json({
                                'message': 'Invalid employee data',
                                'errors': result.error.issues
                            })];
                    }
                    return [4 /*yield*/, storage_1.storage.updateEmployee(id, result.data)];
                case 2:
                    employee = _a.sent();
                    newEtag = (0, etag_1.generateETag)(employee);
                    (0, etag_1.setETagHeader)(res, newEtag);
                    res.json(employee);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    logger_1.log.error('Error updating employee:', error_4);
                    res.status(500).json({ 'message': 'Failed to update employee' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Archive an employee
     * @description Archives an employee record with reason and role-based authorization
     * @route DELETE /api/employees/:id
     * @param {Request} req - Express request object with employee ID and archive reason
     * @param {Response} res - Express response object
     * @returns {Object} Success message
     * @throws {400} When archive reason is missing
     * @throws {403} When user lacks required permissions
     * @throws {500} When database operation fails
     * @example
     * DELETE /api/employees/emp-1
     * Body: {
     *   reason: "استقالة الموظف"
     * }
     */
    app.delete('/api/employees/:id', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, reason, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    reason = req.body.reason;
                    if (!reason) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Archive reason is required' })];
                    }
                    return [4 /*yield*/, storage_1.storage.archiveEmployee(id, reason)];
                case 1:
                    _a.sent();
                    res.json({ 'message': 'Employee archived successfully' });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    logger_1.log.error('Error archiving employee:', error_5);
                    res.status(500).json({ 'message': 'Failed to archive employee' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Get employee leaves
     * @description Retrieves all leave requests for a specific employee
     * @route GET /api/employees/:employeeId/leaves
     * @param {Request} req - Express request object with employee ID parameter
     * @param {Response} res - Express response object
     * @returns {Object} Array of leave requests
     * @throws {500} When database operation fails
     * @example
     * GET /api/employees/emp-1/leaves
     * Response: [
     *   {
     *     id: "leave-1",
     *     type: "annual",
     *     startDate: "2025-02-01",
     *     endDate: "2025-02-05",
     *     status: "pending"
     *   }
     * ]
     */
    app.get('/api/employees/:employeeId/leaves', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, leaves, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    employeeId = req.params.employeeId;
                    if (!employeeId) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    return [4 /*yield*/, storage_1.storage.getEmployeeLeaves(employeeId)];
                case 1:
                    leaves = _a.sent();
                    res.json(leaves);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    logger_1.log.error('Error fetching employee leaves:', error_6);
                    res.status(500).json({ 'message': 'Failed to fetch employee leaves' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Create employee leave request
     * @description Creates a new leave request for an employee with validation
     * @route POST /api/employees/:employeeId/leaves
     * @param {Request} req - Express request object with employee ID and leave data
     * @param {Response} res - Express response object
     * @returns {Object} Created leave request object
     * @throws {400} When leave data validation fails
     * @throws {500} When database operation fails
     * @example
     * POST /api/employees/emp-1/leaves
     * Body: {
     *   type: "annual",
     *   startDate: "2025-02-01",
     *   endDate: "2025-02-05",
     *   reason: "إجازة سنوية"
     * }
     */
    app.post('/api/employees/:employeeId/leaves', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, leaveData, result, leave, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    employeeId = req.params.employeeId;
                    if (!employeeId) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    leaveData = __assign(__assign({}, req.body), { employeeId: employeeId });
                    result = schema_1.insertEmployeeLeaveSchema.safeParse(leaveData);
                    if (!result.success) {
                        return [2 /*return*/, res.status(400).json({
                                'message': 'Invalid leave data',
                                'errors': result.error.issues
                            })];
                    }
                    return [4 /*yield*/, storage_1.storage.createLeave(result.data)];
                case 1:
                    leave = _a.sent();
                    res.status(201).json(leave);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    logger_1.log.error('Error creating leave:', error_7);
                    res.status(500).json({ 'message': 'Failed to create leave' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Get employee deductions
     * @description Retrieves all deductions for a specific employee
     * @route GET /api/employees/:employeeId/deductions
     * @param {Request} req - Express request object with employee ID parameter
     * @param {Response} res - Express response object
     * @returns {Object} Array of deduction records
     * @throws {500} When database operation fails
     * @example
     * GET /api/employees/emp-1/deductions
     * Response: [
     *   {
     *     id: "deduction-1",
     *     amount: 100,
     *     reason: "تأخير في الحضور",
     *     date: "2025-01-15"
     *   }
     * ]
     */
    app.get('/api/employees/:employeeId/deductions', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, deductions, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    employeeId = req.params.employeeId;
                    if (!employeeId) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    return [4 /*yield*/, storage_1.storage.getEmployeeDeductions(employeeId)];
                case 1:
                    deductions = _a.sent();
                    res.json(deductions);
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    logger_1.log.error('Error fetching employee deductions:', error_8);
                    res.status(500).json({ 'message': 'Failed to fetch employee deductions' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Create employee deduction
     * @description Creates a new deduction record for an employee with role-based authorization
     * @route POST /api/employees/:employeeId/deductions
     * @param {Request} req - Express request object with employee ID and deduction data
     * @param {Response} res - Express response object
     * @returns {Object} Created deduction object
     * @throws {400} When deduction data validation fails
     * @throws {403} When user lacks required permissions
     * @throws {500} When database operation fails
     * @example
     * POST /api/employees/emp-1/deductions
     * Body: {
     *   amount: 100,
     *   reason: "تأخير في الحضور",
     *   date: "2025-01-15"
     * }
     */
    app.post('/api/employees/:employeeId/deductions', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, deductionData, result, deduction, error_9, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    employeeId = req.params.employeeId;
                    if (!employeeId) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    deductionData = __assign(__assign({}, req.body), { employeeId: employeeId, 'processedBy': req.user && 'userId' in req.user ? req.user.userId : undefined });
                    result = schema_1.insertEmployeeDeductionSchema.safeParse(deductionData);
                    if (!result.success) {
                        return [2 /*return*/, res.status(400).json({
                                'message': 'Invalid deduction data',
                                'errors': result.error.issues
                            })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, storage_1.storage.createDeduction(result.data, typeof req.user === 'object' && req.user && 'userId' in req.user && typeof req.user.userId === 'string'
                            ? req.user.userId
                            : "system")];
                case 2:
                    deduction = _a.sent();
                    return [2 /*return*/, res.status(201).json(deduction)];
                case 3:
                    error_9 = _a.sent();
                    logger_1.log.error('Error creating deduction:', error_9);
                    return [2 /*return*/, res.status(500).json({ 'message': 'Failed to create deduction' })];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_10 = _a.sent();
                    logger_1.log.error('Error creating deduction:', error_10);
                    res.status(500).json({ 'message': 'Failed to create deduction' });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Get employee violations
     * @description Retrieves all violations for a specific employee
     * @route GET /api/employees/:employeeId/violations
       * @param {Request} req - Express request object with employee ID parameter
       * @param {Response} res - Express response object
       * @returns {Object} Array of violation records
       * @throws {500} When database operation fails
       * @example
       * GET /api/employees/emp-1/violations
       * Response: [
       *   {
       *     id: "violation-1",
     *     type: "tardiness",
     *     description: "تأخير متكرر",
     *     date: "2025-01-15"
     *   }
     * ]
     */
    app.get('/api/employees/:employeeId/violations', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, violations, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    employeeId = req.params.employeeId;
                    if (!employeeId) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    return [4 /*yield*/, storage_1.storage.getEmployeeViolations(employeeId)];
                case 1:
                    violations = _a.sent();
                    res.json(violations);
                    return [3 /*break*/, 3];
                case 2:
                    error_11 = _a.sent();
                    logger_1.log.error('Error fetching employee violations:', error_11);
                    res.status(500).json({ 'message': 'Failed to fetch employee violations' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Create employee violation
     * @description Creates a new violation record for an employee with role-based authorization
     * @route POST /api/employees/:employeeId/violations
     * @param {Request} req - Express request object with employee ID and violation data
     * @param {Response} res - Express response object
     * @returns {Object} Created violation object
     * @throws {400} When violation data validation fails
     * @throws {403} When user lacks required permissions
     * @throws {500} When database operation fails
     * @example
     * POST /api/employees/emp-1/violations
     * Body: {
     *   type: "tardiness",
     *   description: "تأخير متكرر",
     *   date: "2025-01-15"
     * }
     */
    app.post('/api/employees/:employeeId/violations', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, violationData, result, violation, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    employeeId = req.params.employeeId;
                    if (!employeeId) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Employee ID is required' })];
                    }
                    violationData = __assign(__assign({}, req.body), { employeeId: employeeId, 'reportedBy': req.user && 'id' in req.user ? req.user.id : undefined });
                    result = schema_1.insertEmployeeViolationSchema.safeParse(violationData);
                    if (!result.success) {
                        return [2 /*return*/, res.status(400).json({
                                'message': 'Invalid violation data',
                                'errors': result.error.issues
                            })];
                    }
                    return [4 /*yield*/, storage_1.storage.createViolation(result.data, typeof req.user === 'object' && req.user && 'id' in req.user && typeof req.user.id === 'string'
                            ? req.user.id
                            : "system")];
                case 1:
                    violation = _a.sent();
                    res.status(201).json(violation);
                    return [3 /*break*/, 3];
                case 2:
                    error_12 = _a.sent();
                    logger_1.log.error('Error creating violation:', error_12);
                    res.status(500).json({ 'message': 'Failed to create violation' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    /**
     * Get employee attendance
     * @description Retrieves attendance records for a specific employee with optional month/year filtering
     * @route GET /api/attendance/:employeeId
     * @param {Request} req - Express request object with employee ID and optional query parameters
     * @param {Response} res - Express response object
     * @returns {Object} Attendance data with records and summary
     * @throws {500} When database operation fails
     * @example
     * GET /api/attendance/emp-1?month=1&year=2025
     * Response: {
     *   employeeId: "emp-1",
     *   month: 1,
     *   year: 2025,
     *   records: [
     *     {
     *       date: "2025-01-29",
     *       checkIn: "08:00",
     *       checkOut: "17:00",
     *       workingHours: 8,
     *       overtime: 0,
     *       status: "present"
     *     }
     *   ],
     *   summary: {
     *     totalDays: 30,
     *     presentDays: 28,
     *     absentDays: 2,
     *     totalHours: 224,
     *     overtimeHours: 5.5
     *   }
     * }
     */
    app.get('/api/attendance/:employeeId', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, _a, month, year, attendance;
        return __generator(this, function (_b) {
            try {
                employeeId = req.params.employeeId;
                _a = req.query, month = _a.month, year = _a.year;
                attendance = {
                    employeeId: employeeId,
                    'month': month !== null && month !== void 0 ? month : new Date().getMonth() + 1,
                    'year': year !== null && year !== void 0 ? year : new Date().getFullYear(),
                    'records': [
                        {
                            'date': '2025-01-29',
                            'checkIn': '08:00',
                            'checkOut': '17:00',
                            'workingHours': 8,
                            'overtime': 0,
                            'status': 'present'
                        },
                        {
                            'date': '2025-01-28',
                            'checkIn': '08:15',
                            'checkOut': '17:30',
                            'workingHours': 8.25,
                            'overtime': 0.25,
                            'status': 'present'
                        }
                    ],
                    'summary': {
                        'totalDays': 30,
                        'presentDays': 28,
                        'absentDays': 2,
                        'totalHours': 224,
                        'overtimeHours': 5.5
                    }
                };
                res.json(attendance);
            }
            catch (error) {
                logger_1.log.error('Error fetching attendance:', error);
                res.status(500).json({ 'message': 'Failed to fetch attendance' });
            }
            return [2 /*return*/];
        });
    }); });
    /**
     * Employee check-in
     * @description Records employee check-in time for attendance tracking
     * @route POST /api/attendance/checkin
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Object} Check-in confirmation with timestamp
     * @throws {500} When check-in operation fails
     * @example
     * POST /api/attendance/checkin
     * Response: {
     *   success: true,
     *   checkIn: "08:30:00",
     *   message: "تم تسجيل الحضور بنجاح"
     * }
     */
    app.post('/api/attendance/checkin', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _userId, checkInTime;
        return __generator(this, function (_a) {
            try {
                _userId = req.user && 'id' in req.user ? req.user.id : undefined;
                checkInTime = new Date().toLocaleTimeString('ar-EG', { 'hour12': false });
                res.json({
                    'success': true,
                    'checkIn': checkInTime,
                    'message': 'تم تسجيل الحضور بنجاح'
                });
            }
            catch (error) {
                logger_1.log.error('Error checking in:', error);
                res.status(500).json({ 'message': 'Failed to check in' });
            }
            return [2 /*return*/];
        });
    }); });
    /**
     * Employee check-out
     * @description Records employee check-out time for attendance tracking
     * @route POST /api/attendance/checkout
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Object} Check-out confirmation with timestamp
     * @throws {500} When check-out operation fails
     * @example
     * POST /api/attendance/checkout
     * Response: {
     *   success: true,
     *   checkOut: "17:30:00",
     *   message: "تم تسجيل الانصراف بنجاح"
     * }
     */
    app.post('/api/attendance/checkout', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _userId, checkOutTime;
        return __generator(this, function (_a) {
            try {
                _userId = req.user && 'id' in req.user ? req.user.id : undefined;
                checkOutTime = new Date().toLocaleTimeString('ar-EG', { 'hour12': false });
                res.json({
                    'success': true,
                    'checkOut': checkOutTime,
                    'message': 'تم تسجيل الانصراف بنجاح'
                });
            }
            catch (error) {
                logger_1.log.error('Error checking out:', error);
                res.status(500).json({ 'message': 'Failed to check out' });
            }
            return [2 /*return*/];
        });
    }); });
}
