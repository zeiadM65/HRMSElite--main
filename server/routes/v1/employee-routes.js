"use strict";
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
exports.registerEmployeeRoutes = registerEmployeeRoutes;
var storage_1 = require("../../models/storage");
var logger_1 = require("../../utils/logger");
var schema_1 = require("@shared/schema");
var auth_1 = require("../../middleware/auth");
var api_versioning_1 = require("../../middleware/api-versioning");
var etag_1 = require("../../utils/etag");
function registerEmployeeRoutes(app) {
    var _this = this;
    // Prevent caching on endpoints returning employee PII
    app.use([
        '/api/v1/employees',
        '/api/v1/companies/:companyId/employees'
    ], function (_req, res, next) {
        res.setHeader('Cache-Control', 'no-store');
        next();
    });
    // Unified employee handler for both /api/v1/employees and /api/v1/companies/:companyId/employees
    var unifiedEmployeeHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var companyId_1, _includeArchived, _a, page, pageSize, allMockEmployees, filteredEmployees, total, startIndex, endIndex, paginatedEmployees, response, employees, response, error_1, errorResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    companyId_1 = req.params.companyId;
                    _includeArchived = req.query.archived === 'true';
                    _a = (0, api_versioning_1.extractPaginationParams)(req), page = _a.page, pageSize = _a.pageSize;
                    logger_1.log.debug("Unified employee handler called - companyId: ".concat(companyId_1 !== null && companyId_1 !== void 0 ? companyId_1 : "all"));
                    if (!(process.env.NODE_ENV === 'development')) return [3 /*break*/, 1];
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
                    filteredEmployees = allMockEmployees;
                    if (companyId_1) {
                        filteredEmployees = allMockEmployees.filter(function (emp) { return emp.companyId === companyId_1; });
                    }
                    total = filteredEmployees.length;
                    startIndex = (page - 1) * pageSize;
                    endIndex = startIndex + pageSize;
                    paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
                    response = (0, api_versioning_1.createPaginatedResponse)(req, paginatedEmployees, total, page, pageSize, 'Employees retrieved successfully');
                    res.json(response);
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, storage_1.storage.getEmployees(companyId_1)];
                case 2:
                    employees = _b.sent();
                    response = (0, api_versioning_1.createSuccessResponse)(employees, 'Employees retrieved successfully');
                    res.json(response);
                    _b.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    logger_1.log.error('Error fetching employees:', error_1);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch employees', { message: 'An error occurred while retrieving employees' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Get all employees with pagination
    app.get('/api/v1/employees', auth_1.isAuthenticated, api_versioning_1.paginationMiddleware, unifiedEmployeeHandler);
    // Get employees by company with pagination
    app.get('/api/v1/companies/:companyId/employees', auth_1.isAuthenticated, api_versioning_1.paginationMiddleware, unifiedEmployeeHandler);
    // Create new employee
    app.post('/api/v1/employees', auth_1.isAuthenticated, (0, auth_1.requireRole)(['admin', 'hr_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeData, result, errorResponse, employee, response, error_2, errorResponse;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    employeeData = __assign(__assign({}, req.body), { 'createdBy': (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub, 'createdAt': new Date(), 'status': 'active' });
                    result = schema_1.insertEmployeeSchema.safeParse(employeeData);
                    if (!result.success) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid employee data', {
                            details: result.error.issues,
                            message: 'Employee data validation failed'
                        }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.createEmployee(result.data)];
                case 1:
                    employee = _b.sent();
                    response = (0, api_versioning_1.createSuccessResponse)(employee, 'Employee created successfully');
                    res.status(201).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    logger_1.log.error('Error creating employee:', error_2);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to create employee', { message: 'An error occurred while creating the employee' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get employee by ID
    app.get('/api/v1/employees/:id', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, employee, errorResponse, etag, response, error_3, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.getEmployee(id)];
                case 1:
                    employee = _a.sent();
                    if (!employee) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('NOT_FOUND', 'Employee not found', { resource: 'employee', id: id }, 404);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    etag = (0, etag_1.generateETag)(employee);
                    (0, etag_1.setETagHeader)(res, etag);
                    response = (0, api_versioning_1.createSuccessResponse)(employee, 'Employee retrieved successfully');
                    res.json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    logger_1.log.error('Error fetching employee:', error_3);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch employee', { message: 'An error occurred while retrieving the employee' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Update employee
    app.put('/api/v1/employees/:id', auth_1.isAuthenticated, (0, auth_1.requireRole)(['admin', 'hr_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, ifMatch, current, notFound, currentEtag, precond, updateData, employee, newEtag, response, error_4, errorResponse;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    ifMatch = req.headers['if-match'];
                    return [4 /*yield*/, storage_1.storage.getEmployee(id)];
                case 1:
                    current = _b.sent();
                    if (!current) {
                        notFound = (0, api_versioning_1.createErrorResponse)('NOT_FOUND', 'Employee not found', { resource: 'employee', id: id }, 404);
                        return [2 /*return*/, res.status(notFound.statusCode).json(notFound.body)];
                    }
                    currentEtag = (0, etag_1.generateETag)(current);
                    if (!(0, etag_1.matchesIfMatchHeader)(ifMatch, currentEtag)) {
                        precond = (0, api_versioning_1.createErrorResponse)('PRECONDITION_FAILED', 'ETag mismatch. Resource was modified by another request.', { expected: currentEtag }, 412);
                        return [2 /*return*/, res.status(precond.statusCode).json(precond.body)];
                    }
                    updateData = __assign(__assign({}, req.body), { 'updatedBy': (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub, 'updatedAt': new Date() });
                    return [4 /*yield*/, storage_1.storage.updateEmployee(id, updateData)];
                case 2:
                    employee = _b.sent();
                    newEtag = (0, etag_1.generateETag)(employee);
                    (0, etag_1.setETagHeader)(res, newEtag);
                    response = (0, api_versioning_1.createSuccessResponse)(employee, 'Employee updated successfully');
                    res.json(response);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    logger_1.log.error('Error updating employee:', error_4);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to update employee', { message: 'An error occurred while updating the employee' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Delete employee
    app.delete('/api/v1/employees/:id', auth_1.isAuthenticated, (0, auth_1.requireRole)(['admin', 'hr_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, response, error_5, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.deleteEmployee(id)];
                case 1:
                    _a.sent();
                    response = (0, api_versioning_1.createSuccessResponse)({ id: id }, 'Employee deleted successfully');
                    res.json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    logger_1.log.error('Error deleting employee:', error_5);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to delete employee', { message: 'An error occurred while deleting the employee' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get employee leaves with pagination
    app.get('/api/v1/employees/:id/leaves', auth_1.isAuthenticated, api_versioning_1.paginationMiddleware, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, _a, page, pageSize, errorResponse, mockLeaves, total, startIndex, endIndex, paginatedLeaves, response, errorResponse;
        return __generator(this, function (_b) {
            try {
                id = req.params.id;
                _a = (0, api_versioning_1.extractPaginationParams)(req), page = _a.page, pageSize = _a.pageSize;
                if (!id) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                mockLeaves = [
                    {
                        'id': 'leave-1',
                        'employeeId': id,
                        'employeeName': 'أحمد محمد علي',
                        'type': 'annual',
                        'startDate': '2025-02-10',
                        'endDate': '2025-02-12',
                        'days': 3,
                        'reason': 'إجازة شخصية',
                        'status': 'approved',
                        'appliedDate': '2025-01-28T10:30:00.000Z'
                    }
                ];
                total = mockLeaves.length;
                startIndex = (page - 1) * pageSize;
                endIndex = startIndex + pageSize;
                paginatedLeaves = mockLeaves.slice(startIndex, endIndex);
                response = (0, api_versioning_1.createPaginatedResponse)(req, paginatedLeaves, total, page, pageSize, 'Employee leaves retrieved successfully');
                res.json(response);
            }
            catch (error) {
                logger_1.log.error('Error fetching employee leaves:', error);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch employee leaves', { message: 'An error occurred while retrieving employee leaves' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
            }
            return [2 /*return*/];
        });
    }); });
    // Create employee leave
    app.post('/api/v1/employees/:id/leaves', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, leaveData, result, errorResponse, leave, response, error_6, errorResponse;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    leaveData = __assign(__assign({}, req.body), { 'employeeId': id, 'appliedBy': (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub, 'appliedDate': new Date(), 'status': 'pending' });
                    result = schema_1.insertEmployeeLeaveSchema.safeParse(leaveData);
                    if (!result.success) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid leave data', {
                            details: result.error.issues,
                            message: 'Leave data validation failed'
                        }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.createEmployeeLeave(result.data)];
                case 1:
                    leave = _b.sent();
                    response = (0, api_versioning_1.createSuccessResponse)(leave, 'Leave request created successfully');
                    res.status(201).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _b.sent();
                    logger_1.log.error('Error creating employee leave:', error_6);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to create leave request', { message: 'An error occurred while creating the leave request' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get employee deductions with pagination
    app.get('/api/v1/employees/:id/deductions', auth_1.isAuthenticated, api_versioning_1.paginationMiddleware, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, _a, page, pageSize, errorResponse, mockDeductions, total, startIndex, endIndex, paginatedDeductions, response, errorResponse;
        return __generator(this, function (_b) {
            try {
                id = req.params.id;
                _a = (0, api_versioning_1.extractPaginationParams)(req), page = _a.page, pageSize = _a.pageSize;
                if (!id) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                mockDeductions = [
                    {
                        'id': 'deduction-1',
                        'employeeId': id,
                        'employeeName': 'أحمد محمد علي',
                        'type': 'salary_advance',
                        'amount': 500,
                        'reason': 'سلفة راتب',
                        'date': '2025-01-15',
                        'status': 'active'
                    }
                ];
                total = mockDeductions.length;
                startIndex = (page - 1) * pageSize;
                endIndex = startIndex + pageSize;
                paginatedDeductions = mockDeductions.slice(startIndex, endIndex);
                response = (0, api_versioning_1.createPaginatedResponse)(req, paginatedDeductions, total, page, pageSize, 'Employee deductions retrieved successfully');
                res.json(response);
            }
            catch (error) {
                logger_1.log.error('Error fetching employee deductions:', error);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch employee deductions', { message: 'An error occurred while retrieving employee deductions' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
            }
            return [2 /*return*/];
        });
    }); });
    // Create employee deduction
    app.post('/api/v1/employees/:id/deductions', auth_1.isAuthenticated, (0, auth_1.requireRole)(['admin', 'hr_manager', 'finance_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, deductionData, result, errorResponse, deduction, response, error_7, errorResponse;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    deductionData = __assign(__assign({}, req.body), { 'employeeId': id, 'createdBy': (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub, 'createdAt': new Date(), 'status': 'active' });
                    result = schema_1.insertEmployeeDeductionSchema.safeParse(deductionData);
                    if (!result.success) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid deduction data', {
                            details: result.error.issues,
                            message: 'Deduction data validation failed'
                        }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.createEmployeeDeduction(result.data)];
                case 1:
                    deduction = _b.sent();
                    response = (0, api_versioning_1.createSuccessResponse)(deduction, 'Deduction created successfully');
                    res.status(201).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _b.sent();
                    logger_1.log.error('Error creating employee deduction:', error_7);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to create deduction', { message: 'An error occurred while creating the deduction' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get employee violations with pagination
    app.get('/api/v1/employees/:id/violations', auth_1.isAuthenticated, api_versioning_1.paginationMiddleware, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, _a, page, pageSize, errorResponse, mockViolations, total, startIndex, endIndex, paginatedViolations, response, errorResponse;
        return __generator(this, function (_b) {
            try {
                id = req.params.id;
                _a = (0, api_versioning_1.extractPaginationParams)(req), page = _a.page, pageSize = _a.pageSize;
                if (!id) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                mockViolations = [
                    {
                        'id': 'violation-1',
                        'employeeId': id,
                        'employeeName': 'أحمد محمد علي',
                        'type': 'late_arrival',
                        'description': 'تأخر في الوصول للعمل',
                        'date': '2025-01-20',
                        'severity': 'minor',
                        'status': 'active'
                    }
                ];
                total = mockViolations.length;
                startIndex = (page - 1) * pageSize;
                endIndex = startIndex + pageSize;
                paginatedViolations = mockViolations.slice(startIndex, endIndex);
                response = (0, api_versioning_1.createPaginatedResponse)(req, paginatedViolations, total, page, pageSize, 'Employee violations retrieved successfully');
                res.json(response);
            }
            catch (error) {
                logger_1.log.error('Error fetching employee violations:', error);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch employee violations', { message: 'An error occurred while retrieving employee violations' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
            }
            return [2 /*return*/];
        });
    }); });
    // Create employee violation
    app.post('/api/v1/employees/:id/violations', auth_1.isAuthenticated, (0, auth_1.requireRole)(['admin', 'hr_manager', 'supervisor']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, violationData, result, errorResponse, violation, response, error_8, errorResponse;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Employee ID is required', { field: 'id', message: 'Employee ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    violationData = __assign(__assign({}, req.body), { 'employeeId': id, 'reportedBy': (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub, 'reportedAt': new Date(), 'status': 'active' });
                    result = schema_1.insertEmployeeViolationSchema.safeParse(violationData);
                    if (!result.success) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid violation data', {
                            details: result.error.issues,
                            message: 'Violation data validation failed'
                        }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.createEmployeeViolation(result.data)];
                case 1:
                    violation = _b.sent();
                    response = (0, api_versioning_1.createSuccessResponse)(violation, 'Violation recorded successfully');
                    res.status(201).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    logger_1.log.error('Error creating employee violation:', error_8);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to record violation', { message: 'An error occurred while recording the violation' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
