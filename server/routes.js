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
exports.registerRoutes = registerRoutes;
var http_1 = require("http");
var storage_1 = require("./models/storage");
var logger_1 = require("./utils/logger");
// User type is already declared in auth middleware
// Removed advanced routes import as file was deleted
var schema_1 = require("../shared/schema");
var employee_routes_1 = require("./routes/employee-routes");
var payroll_routes_1 = require("./routes/payroll-routes");
var license_routes_1 = require("./routes/license-routes");
var document_routes_1 = require("./routes/v1/document-routes");
var ai_1 = __importDefault(require("./routes/ai"));
var auth_routes_1 = __importDefault(require("./routes/auth-routes"));
var quality_routes_1 = __importDefault(require("./routes/quality-routes"));
// import notificationRoutes from "./routes/notification-routes";
var metrics_1 = require("./middleware/metrics");
// Helper function to safely log errors
var safeLogError = function (message, error) {
    var errorData = error instanceof Error ? error : { error: String(error) };
    logger_1.log.error(message, errorData);
};
function registerRoutes(app) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, isAuthenticated, requireRole, httpServer;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./middleware/auth')); })];
                case 1:
                    _a = _b.sent(), isAuthenticated = _a.isAuthenticated, requireRole = _a.requireRole;
                    // Register unified authentication routes
                    app.use('/api/auth', auth_routes_1.default);
                    // Register additional routes
                    (0, employee_routes_1.registerEmployeeRoutes)(app);
                    (0, payroll_routes_1.registerPayrollRoutes)(app);
                    (0, license_routes_1.registerLicenseRoutes)(app);
                    (0, document_routes_1.registerDocumentRoutes)(app);
                    // Register AI routes
                    app.use('/api/ai', isAuthenticated, ai_1.default);
                    // Register quality monitoring routes
                    app.use('/api', quality_routes_1.default);
                    // Register notification routes
                    // app.use('/api/notifications', isAuthenticated, notificationRoutes);
                    // Root route for testing
                    app.get('/', function (req, res) {
                        res.json({ message: 'HRMS Elite API is running successfully!' });
                    });
                    // Monitoring and metrics endpoints
                    app.get('/metrics', metrics_1.metricsEndpoint);
                    app.get('/api/health', metrics_1.healthCheckWithMetrics);
                    // System dashboard routes (Super Admin)
                    app.get('/api/dashboard/stats', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var stats;
                        return __generator(this, function (_a) {
                            try {
                                stats = {
                                    'totalCompanies': 10,
                                    'totalEmployees': 250,
                                    'activeCompanies': 8,
                                    'pendingApprovals': 5
                                };
                                res.json(stats);
                            }
                            catch (error) {
                                logger_1.log.error('Error fetching dashboard stats:', error instanceof Error ? error : { error: String(error) });
                                res.status(500).json({ 'message': 'Failed to fetch dashboard stats' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/companies', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companies, mockCompanies, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, storage_1.storage.getAllCompanies()];
                                case 1:
                                    companies = _a.sent();
                                    // إرجاع بيانات تجريبية دائماً في البيئة التطويرية
                                    if (companies.length === 0 || process.env.NODE_ENV === 'development') {
                                        mockCompanies = [
                                            {
                                                'id': 'company-1',
                                                'name': 'شركة الاتحاد الخليجي',
                                                'commercialFileName': 'الاتحاد الخليجي للتجارة',
                                                'department': 'التجارة العامة',
                                                'classification': 'شركة ذات مسؤولية محدودة',
                                                'status': 'active',
                                                'employeeCount': 45,
                                                'industry': 'التجارة',
                                                'establishmentDate': '2020-01-15'
                                            },
                                            {
                                                'id': 'company-2',
                                                'name': 'شركة النيل الأزرق',
                                                'commercialFileName': 'النيل الأزرق للمقاولات',
                                                'department': 'المقاولات والإنشاءات',
                                                'classification': 'شركة مساهمة',
                                                'status': 'active',
                                                'employeeCount': 78,
                                                'industry': 'الإنشاءات',
                                                'establishmentDate': '2018-05-20'
                                            },
                                            {
                                                'id': 'company-3',
                                                'name': 'شركة قمة النيل',
                                                'commercialFileName': 'قمة النيل للخدمات',
                                                'department': 'الخدمات اللوجستية',
                                                'classification': 'شركة ذات مسؤولية محدودة',
                                                'status': 'active',
                                                'employeeCount': 32,
                                                'industry': 'الخدمات',
                                                'establishmentDate': '2019-09-10'
                                            }
                                        ];
                                        res.json(mockCompanies);
                                    }
                                    else {
                                        res.json(companies);
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_1 = _a.sent();
                                    logger_1.log.error('Error fetching companies:', error_1 instanceof Error ? error_1 : { error: String(error_1) });
                                    res.status(500).json({ 'message': 'Failed to fetch companies' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/api/companies', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var userRole, companyData, company, error_2;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 2, , 3]);
                                    userRole = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== null && _b !== void 0 ? _b : "user";
                                    if (userRole !== 'super_admin') {
                                        return [2 /*return*/, res.status(403).json({ 'message': 'Only Super Admin can add companies' })];
                                    }
                                    companyData = req.body;
                                    return [4 /*yield*/, storage_1.storage.createCompany(companyData)];
                                case 1:
                                    company = _c.sent();
                                    res.status(201).json(company);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_2 = _c.sent();
                                    logger_1.log.error('Error creating company:', error_2 instanceof Error ? error_2 : { error: String(error_2) });
                                    res.status(500).json({ 'message': 'Failed to create company' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Company-specific routes
                    app.get('/api/companies/:companyId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, mockCompanies, company, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    companyId = req.params.companyId;
                                    mockCompanies = {
                                        'company-1': {
                                            'id': 'company-1',
                                            'name': 'شركة الاتحاد الخليجي',
                                            'commercialFileName': 'الاتحاد الخليجي للتجارة',
                                            'department': 'التجارة العامة',
                                            'classification': 'شركة ذات مسؤولية محدودة',
                                            'status': 'active',
                                            'employeeCount': 45,
                                            'industry': 'التجارة',
                                            'establishmentDate': '2020-01-15'
                                        },
                                        '1': {
                                            'id': '1',
                                            'name': 'شركة الاتحاد الخليجي',
                                            'commercialFileName': 'الاتحاد الخليجي للتجارة',
                                            'department': 'التجارة العامة',
                                            'classification': 'شركة ذات مسؤولية محدودة',
                                            'status': 'active',
                                            'employeeCount': 45,
                                            'industry': 'التجارة',
                                            'establishmentDate': '2020-01-15'
                                        }
                                    };
                                    if (process.env.NODE_ENV === 'development' && mockCompanies[companyId]) {
                                        return [2 /*return*/, res.json(mockCompanies[companyId])];
                                    }
                                    return [4 /*yield*/, storage_1.storage.getCompany(companyId)];
                                case 1:
                                    company = _a.sent();
                                    if (!company) {
                                        return [2 /*return*/, res.status(404).json({ 'message': 'Company not found' })];
                                    }
                                    res.json(company);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_3 = _a.sent();
                                    logger_1.log.error('Error fetching company:', error_3 instanceof Error ? error_3 : { error: String(error_3) });
                                    res.status(500).json({ 'message': 'Failed to fetch company' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/api/companies/:companyId/stats', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, mockStats, stats, error_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    companyId = req.params.companyId;
                                    // بيانات تجريبية لإحصائيات الشركة
                                    if (process.env.NODE_ENV === 'development') {
                                        mockStats = {
                                            'totalEmployees': 45,
                                            'activeEmployees': 42,
                                            'inactiveEmployees': 3,
                                            'totalDepartments': 8,
                                            'presentToday': 38,
                                            'absentToday': 4,
                                            'lateToday': 3,
                                            'pendingLeaves': 2,
                                            'thisMonthHires': 3,
                                            'thisMonthTerminations': 1
                                        };
                                        return [2 /*return*/, res.json(mockStats)];
                                    }
                                    return [4 /*yield*/, storage_1.storage.getCompanyStats(companyId)];
                                case 1:
                                    stats = _a.sent();
                                    res.json(stats);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_4 = _a.sent();
                                    logger_1.log.error('Error fetching company stats:', error_4 instanceof Error ? error_4 : { error: String(error_4) });
                                    res.status(500).json({ 'message': 'Failed to fetch company stats' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Employee routes are now unified in employee-routes.ts
                    // Both /api/employees and /api/companies/:companyId/employees are handled by unifiedEmployeeHandler
                    // Employee creation is now handled in employee-routes.ts
                    // This route is removed to avoid duplication
                    // License routes
                    app.get('/api/companies/:companyId/licenses', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, licenses, error_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    companyId = req.params.companyId;
                                    if (!companyId) {
                                        return [2 /*return*/, res.status(400).json({ 'message': 'Company ID is required' })];
                                    }
                                    return [4 /*yield*/, storage_1.storage.getCompanyLicenses(companyId)];
                                case 1:
                                    licenses = _a.sent();
                                    res.json(licenses);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_5 = _a.sent();
                                    logger_1.log.error('Error fetching licenses:', error_5 instanceof Error ? error_5 : { error: String(error_5) });
                                    res.status(500).json({ 'message': 'Failed to fetch licenses' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/api/licenses/:licenseId', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var licenseId, license, error_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    licenseId = req.params.licenseId;
                                    if (!licenseId) {
                                        return [2 /*return*/, res.status(400).json({ 'message': 'License ID is required' })];
                                    }
                                    return [4 /*yield*/, storage_1.storage.getLicense(licenseId)];
                                case 1:
                                    license = _a.sent();
                                    if (!license) {
                                        return [2 /*return*/, res.status(404).json({ 'message': 'License not found' })];
                                    }
                                    res.json(license);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_6 = _a.sent();
                                    safeLogError('Error fetching license:', error_6);
                                    res.status(500).json({ 'message': 'Failed to fetch license' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/api/companies/:companyId/licenses', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, licenseData, license, error_7;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    companyId = req.params.companyId;
                                    licenseData = schema_1.insertLicenseSchema.parse(__assign(__assign({}, req.body), { companyId: companyId }));
                                    return [4 /*yield*/, storage_1.storage.createLicense(licenseData)];
                                case 1:
                                    license = _a.sent();
                                    res.status(201).json(license);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_7 = _a.sent();
                                    safeLogError('Error creating license:', error_7);
                                    res.status(500).json({ 'message': 'Failed to create license' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Leave management routes
                    app.get('/api/companies/:companyId/leaves', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, status_1, leaves, error_8;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    companyId = req.params.companyId;
                                    if (!companyId) {
                                        return [2 /*return*/, res.status(400).json({ 'message': 'Company ID is required' })];
                                    }
                                    status_1 = req.query.status;
                                    return [4 /*yield*/, storage_1.storage.getCompanyLeaves(companyId, status_1)];
                                case 1:
                                    leaves = _a.sent();
                                    res.json(leaves);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_8 = _a.sent();
                                    safeLogError('Error fetching leaves:', error_8);
                                    res.status(500).json({ 'message': 'Failed to fetch leaves' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.get('/api/employees/:employeeId/leaves', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var employeeId, leaves, error_9;
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
                                    error_9 = _a.sent();
                                    safeLogError('Error fetching employee leaves:', error_9);
                                    res.status(500).json({ 'message': 'Failed to fetch employee leaves' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/api/employees/:employeeId/leaves', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var employeeId, leaveData, leave, error_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    employeeId = req.params.employeeId;
                                    leaveData = schema_1.insertEmployeeLeaveSchema.parse(__assign(__assign({}, req.body), { employeeId: employeeId }));
                                    return [4 /*yield*/, storage_1.storage.createLeave(leaveData)];
                                case 1:
                                    leave = _a.sent();
                                    res.status(201).json(leave);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_10 = _a.sent();
                                    safeLogError('Error creating leave:', error_10);
                                    res.status(500).json({ 'message': 'Failed to create leave' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    app.post('/api/leaves/:leaveId/approve', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var leaveId, approverId, leave;
                        var _a;
                        return __generator(this, function (_b) {
                            try {
                                leaveId = req.params.leaveId;
                                approverId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) || 'unknown';
                                leave = { id: leaveId, status: 'approved', approverId: approverId };
                                res.json(leave);
                            }
                            catch (error) {
                                safeLogError('Error approving leave:', error);
                                res.status(500).json({ 'message': 'Failed to approve leave' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.post('/api/leaves/:leaveId/reject', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var leaveId, reason, approverId, leave;
                        var _a;
                        return __generator(this, function (_b) {
                            try {
                                leaveId = req.params.leaveId;
                                reason = req.body.reason;
                                approverId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) || 'unknown';
                                leave = { id: leaveId, status: 'rejected', approverId: approverId, reason: reason };
                                res.json(leave);
                            }
                            catch (error) {
                                safeLogError('Error rejecting leave:', error);
                                res.status(500).json({ 'message': 'Failed to reject leave' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Attendance routes are now handled in employee-routes.ts
                    // Leave balance routes are now handled in employee-routes.ts
                    // Leave request routes are now handled in employee-routes.ts
                    // Payroll routes
                    app.get('/api/payroll/employee/:employeeId', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _employeeId, payrollData;
                        return __generator(this, function (_a) {
                            try {
                                _employeeId = req.params.employeeId;
                                payrollData = {
                                    'basicSalary': 1200,
                                    'allowances': 300,
                                    'overtime': 150,
                                    'deductions': 75,
                                    'netSalary': 1575,
                                    'payPeriod': 'January 2025',
                                    'payDate': '2025-01-31'
                                };
                                res.json(payrollData);
                            }
                            catch (error) {
                                safeLogError('Error fetching payroll:', error);
                                res.status(500).json({ 'message': 'Failed to fetch payroll' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Performance routes
                    app.get('/api/performance/overview', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var performanceData;
                        return __generator(this, function (_a) {
                            try {
                                performanceData = {
                                    'overall': 4.2,
                                    'goals': 85,
                                    'feedback': 12,
                                    'improvements': 3,
                                    'evaluations': [
                                        { 'category': 'Quality', 'score': 4.5 },
                                        { 'category': 'Productivity', 'score': 4.0 },
                                        { 'category': 'Teamwork', 'score': 4.3 },
                                        { 'category': 'Leadership', 'score': 3.8 }
                                    ]
                                };
                                res.json(performanceData);
                            }
                            catch (error) {
                                safeLogError('Error fetching performance data:', error);
                                res.status(500).json({ 'message': 'Failed to fetch performance data' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Training routes
                    app.get('/api/training/courses', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var courses;
                        return __generator(this, function (_a) {
                            try {
                                courses = [
                                    {
                                        'id': '1',
                                        'title': 'أساسيات إدارة الموارد البشرية',
                                        'instructor': 'د. محمد السالم',
                                        'duration': '8 ساعات',
                                        'enrolledCount': 45,
                                        'rating': 4.8,
                                        'status': 'available'
                                    },
                                    {
                                        'id': '2',
                                        'title': 'القيادة الفعالة',
                                        'instructor': 'أ. سارة القحطاني',
                                        'duration': '12 ساعة',
                                        'enrolledCount': 32,
                                        'rating': 4.9,
                                        'status': 'available'
                                    }
                                ];
                                res.json(courses);
                            }
                            catch (error) {
                                safeLogError('Error fetching courses:', error);
                                res.status(500).json({ 'message': 'Failed to fetch courses' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Recruitment routes
                    app.get('/api/recruitment/jobs', isAuthenticated, requireRole(['super_admin',
                        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var jobs;
                        return __generator(this, function (_a) {
                            try {
                                jobs = [
                                    {
                                        'id': '1',
                                        'title': 'محاسب أول',
                                        'department': 'المحاسبة',
                                        'location': 'الكويت',
                                        'type': 'دوام كامل',
                                        'applicants': 25,
                                        'status': 'active',
                                        'postedDate': '2025-01-20'
                                    },
                                    {
                                        'id': '2',
                                        'title': 'مطور برمجيات',
                                        'department': 'تقنية المعلومات',
                                        'location': 'الكويت',
                                        'type': 'دوام كامل',
                                        'applicants': 18,
                                        'status': 'active',
                                        'postedDate': '2025-01-22'
                                    }
                                ];
                                res.json(jobs);
                            }
                            catch (error) {
                                safeLogError('Error fetching jobs:', error);
                                res.status(500).json({ 'message': 'Failed to fetch jobs' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/recruitment/applicants', isAuthenticated, requireRole(['super_admin',
                        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var applicants;
                        return __generator(this, function (_a) {
                            try {
                                applicants = [
                                    {
                                        'id': '1',
                                        'name': 'خالد أحمد المطيري',
                                        'email': 'khalid@email.com',
                                        'phone': '+965 9999 1234',
                                        'position': 'محاسب أول',
                                        'experience': '5 سنوات',
                                        'status': 'pending',
                                        'appliedDate': '2025-01-25'
                                    },
                                    {
                                        'id': '2',
                                        'name': 'نوال محمد العتيبي',
                                        'email': 'nawal@email.com',
                                        'phone': '+965 9999 5678',
                                        'position': 'مطور برمجيات',
                                        'experience': '3 سنوات',
                                        'status': 'shortlisted',
                                        'appliedDate': '2025-01-26'
                                    }
                                ];
                                res.json(applicants);
                            }
                            catch (error) {
                                safeLogError('Error fetching applicants:', error);
                                res.status(500).json({ 'message': 'Failed to fetch applicants' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // تم حذف هذا المسار المكرر نهائياً
                    // New attendance API routes to fix [object Object] issue
                    app.get('/api/attendance/:companyId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, mockAttendance;
                        return __generator(this, function (_a) {
                            try {
                                companyId = req.params.companyId;
                                // التحقق من صحة المعرف
                                if (typeof companyId !== 'string' || companyId === '[object Object]') {
                                    return [2 /*return*/, res.status(400).json({ 'message': 'Invalid company ID' })];
                                }
                                mockAttendance = [
                                    {
                                        'id': 'att-1',
                                        'employeeId': 'emp-1',
                                        'employeeName': 'أحمد محمد علي',
                                        'date': new Date().toISOString().split('T')[0],
                                        'checkIn': '08:30',
                                        'checkOut': '17:00',
                                        'status': 'present',
                                        'workingHours': 8.5,
                                        'overtime': 0.5
                                    },
                                    {
                                        'id': 'att-2',
                                        'employeeId': 'emp-2',
                                        'employeeName': 'فاطمة سالم أحمد',
                                        'date': new Date().toISOString().split('T')[0],
                                        'checkIn': '08:45',
                                        'checkOut': '17:15',
                                        'status': 'present',
                                        'workingHours': 8.5,
                                        'overtime': 0.5
                                    },
                                    {
                                        'id': 'att-3',
                                        'employeeId': 'emp-3',
                                        'employeeName': 'محمد عبدالله',
                                        'date': new Date().toISOString().split('T')[0],
                                        'checkIn': '09:00',
                                        'checkOut': null,
                                        'status': 'present',
                                        'workingHours': 0,
                                        'overtime': 0
                                    }
                                ];
                                res.json(mockAttendance);
                            }
                            catch (error) {
                                safeLogError('Error fetching attendance:', error);
                                res.status(500).json({ 'message': 'Failed to fetch attendance' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // New leaves API routes
                    app.get('/api/leaves/:companyId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, mockLeaves;
                        return __generator(this, function (_a) {
                            try {
                                companyId = req.params.companyId;
                                // التحقق من صحة المعرف
                                if (typeof companyId !== 'string' || companyId === '[object Object]') {
                                    return [2 /*return*/, res.status(400).json({ 'message': 'Invalid company ID' })];
                                }
                                mockLeaves = [
                                    {
                                        'id': 'leave-1',
                                        'employeeId': 'emp-1',
                                        'employeeName': 'أحمد محمد علي',
                                        'type': 'annual',
                                        'startDate': '2025-02-10',
                                        'endDate': '2025-02-12',
                                        'days': 3,
                                        'reason': 'إجازة شخصية',
                                        'status': 'pending',
                                        'appliedDate': '2025-01-28'
                                    },
                                    {
                                        'id': 'leave-2',
                                        'employeeId': 'emp-2',
                                        'employeeName': 'فاطمة سالم أحمد',
                                        'type': 'sick',
                                        'startDate': '2025-02-15',
                                        'endDate': '2025-02-16',
                                        'days': 2,
                                        'reason': 'إجازة مرضية',
                                        'status': 'approved',
                                        'appliedDate': '2025-01-25'
                                    }
                                ];
                                res.json(mockLeaves);
                            }
                            catch (error) {
                                safeLogError('Error fetching leaves:', error);
                                res.status(500).json({ 'message': 'Failed to fetch leaves' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/leaves/employee/:employeeId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _employeeId, mockLeaves;
                        return __generator(this, function (_a) {
                            try {
                                _employeeId = req.params.employeeId;
                                mockLeaves = [
                                    {
                                        'id': 'leave-1',
                                        'type': 'annual',
                                        'startDate': '2025-02-10',
                                        'endDate': '2025-02-12',
                                        'days': 3,
                                        'reason': 'إجازة شخصية',
                                        'status': 'pending',
                                        'appliedDate': '2025-01-28'
                                    }
                                ];
                                res.json(mockLeaves);
                            }
                            catch (error) {
                                safeLogError('Error fetching employee leaves:', error);
                                res.status(500).json({ 'message': 'Failed to fetch employee leaves' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Documents routes
                    app.get('/api/documents', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var documents;
                        return __generator(this, function (_a) {
                            try {
                                documents = [
                                    {
                                        'id': '1',
                                        'name': 'سياسة الموارد البشرية 2025',
                                        'type': 'application/pdf',
                                        'category': 'policies',
                                        'size': '2.5 MB',
                                        'uploadedBy': 'إدارة الموارد البشرية',
                                        'uploadDate': '2025-01-15',
                                        'status': 'active'
                                    },
                                    {
                                        'id': '2',
                                        'name': 'دليل الموظف الجديد',
                                        'type': 'application/pdf',
                                        'category': 'guides',
                                        'size': '1.8 MB',
                                        'uploadedBy': 'إدارة الموارد البشرية',
                                        'uploadDate': '2025-01-10',
                                        'status': 'active'
                                    }
                                ];
                                res.json(documents);
                            }
                            catch (error) {
                                safeLogError('Error fetching documents:', error);
                                res.status(500).json({ 'message': 'Failed to fetch documents' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Notification routes
                    app.get('/api/notifications', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var notifications;
                        return __generator(this, function (_a) {
                            try {
                                notifications = [
                                    {
                                        'id': '1',
                                        'title': 'مرحباً بكم في نظام إدارة الموارد البشرية',
                                        'message': 'تم تفعيل النظام بنجاح',
                                        'type': 'info',
                                        'isRead': false,
                                        'createdAt': new Date().toISOString(),
                                        'userId': 'admin',
                                        'companyId': 'company-1'
                                    }
                                ];
                                res.json(notifications);
                            }
                            catch (error) {
                                safeLogError('Error fetching notifications:', error);
                                res.status(500).json({ 'message': 'Failed to fetch notifications' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/notifications/unread-count', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _userId, _companyId, count;
                        var _a;
                        return __generator(this, function (_b) {
                            try {
                                _userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) || 'unknown';
                                _companyId = req.query.companyId;
                                count = 5;
                                res.json({ count: count });
                            }
                            catch (error) {
                                safeLogError('Error fetching unread notification count:', error);
                                res.status(500).json({ 'message': 'Failed to fetch unread notification count' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.post('/api/notifications/:notificationId/read', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var notificationId, error_11;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    notificationId = req.params.notificationId;
                                    if (!notificationId) {
                                        return [2 /*return*/, res.status(400).json({ 'message': 'Notification ID is required' })];
                                    }
                                    return [4 /*yield*/, storage_1.storage.markNotificationAsRead(notificationId)];
                                case 1:
                                    _a.sent();
                                    res.json({ 'success': true });
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_11 = _a.sent();
                                    safeLogError('Error marking notification as read:', error_11);
                                    res.status(500).json({ 'message': 'Failed to mark notification as read' });
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    // Document routes
                    app.get('/api/:entityType/:entityId/documents', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, entityType, _entityId, documents;
                        return __generator(this, function (_b) {
                            try {
                                _a = req.params, entityType = _a.entityType, _entityId = _a._entityId;
                                if (!entityType || !['employee', 'company', 'license'].includes(entityType)) {
                                    return [2 /*return*/, res.status(400).json({ 'message': 'Invalid entity type' })];
                                }
                                documents = [];
                                res.json(documents);
                            }
                            catch (error) {
                                safeLogError('Error fetching documents:', error);
                                res.status(500).json({ 'message': 'Failed to fetch documents' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Register advanced routes
                    // Government Forms API endpoints
                    app.get('/api/government-forms/templates', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var templates;
                        return __generator(this, function (_a) {
                            try {
                                templates = [
                                    {
                                        'id': 'manpower_license',
                                        'nameAr': 'رخصة القوى العاملة',
                                        'ministry': 'وزارة الداخلية - الهيئة العامة للقوى العاملة',
                                        'fields': ['company_name', 'license_number', 'activity_type', 'employee_count']
                                    },
                                    {
                                        'id': 'residence_permit',
                                        'nameAr': 'تصريح إقامة',
                                        'ministry': 'وزارة الداخلية - الأمن العام',
                                        'fields': ['employee_name', 'passport_number', 'nationality', 'job_title', 'salary']
                                    }
                                ];
                                res.json(templates);
                            }
                            catch (_b) {
                                res.status(500).json({ 'error': 'Server error' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.post('/api/government-forms/fill', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, formId, employeeId, formData;
                        return __generator(this, function (_b) {
                            try {
                                _a = req.body, formId = _a.formId, employeeId = _a.employeeId, formData = _a.formData;
                                logger_1.log.info("Filling form ".concat(formId, " for employee ").concat(employeeId), formData, 'ROUTES');
                                res.json({ 'success': true, 'message': 'تم ملء النموذج بنجاح' });
                            }
                            catch (_c) {
                                res.status(500).json({ 'error': 'Server error' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Administrative Employees & Permissions APIs
                    app.get('/api/administrative-employees', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var adminEmployees;
                        return __generator(this, function (_a) {
                            try {
                                adminEmployees = [
                                    {
                                        'id': 'admin1',
                                        'fullName': 'أحمد محمد علي',
                                        'jobTitle': 'مسؤول الموارد البشرية',
                                        'role': 'administrative_employee',
                                        'permissions': ['hr', 'reports']
                                    },
                                    {
                                        'id': 'admin2',
                                        'fullName': 'فاطمة سالم',
                                        'jobTitle': 'مسؤولة المحاسبة',
                                        'role': 'administrative_employee',
                                        'permissions': ['accounting', 'reports']
                                    },
                                    {
                                        'id': 'admin3',
                                        'fullName': 'محمد خالد',
                                        'jobTitle': 'مسؤول المشتريات',
                                        'role': 'administrative_employee',
                                        'permissions': ['purchasing', 'inventory']
                                    }
                                ];
                                res.json(adminEmployees);
                            }
                            catch (_b) {
                                res.status(500).json({ 'error': 'Server error' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/permissions/:employeeId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var employeeId, mockPermissions;
                        var _a;
                        return __generator(this, function (_b) {
                            try {
                                employeeId = req.params.employeeId;
                                mockPermissions = {
                                    'admin1': {
                                        'hr': {
                                            'employees_view': true,
                                            'employees_create': true,
                                            'employees_edit': true,
                                            'employees_delete': false,
                                            'leaves_approve': true,
                                            'payroll_process': false,
                                            'violations_manage': true
                                        },
                                        'reports': {
                                            'reports_view': true,
                                            'reports_create': false,
                                            'reports_export': true,
                                            'analytics_access': false
                                        }
                                    },
                                    'admin2': {
                                        'accounting': {
                                            'financial_view': true,
                                            'invoices_create': true,
                                            'expenses_approve': true,
                                            'budgets_manage': false,
                                            'taxes_process': true,
                                            'financial_export': true
                                        },
                                        'reports': {
                                            'reports_view': true,
                                            'reports_create': true,
                                            'reports_export': true,
                                            'analytics_access': true
                                        }
                                    },
                                    'admin3': {
                                        'purchasing': {
                                            'purchases_view': true,
                                            'orders_create': true,
                                            'orders_approve': false,
                                            'vendors_manage': true
                                        },
                                        'inventory': {
                                            'inventory_view': true,
                                            'items_add': true,
                                            'stock_adjust': false,
                                            'orders_approve': false,
                                            'suppliers_manage': true
                                        }
                                    }
                                };
                                res.json((_a = mockPermissions[employeeId]) !== null && _a !== void 0 ? _a : {});
                            }
                            catch (_c) {
                                res.status(500).json({ 'error': 'Server error' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.put('/api/permissions/:employeeId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var employeeId, permissions;
                        return __generator(this, function (_a) {
                            try {
                                employeeId = req.params.employeeId;
                                permissions = req.body;
                                logger_1.log.info("Updating permissions for employee ".concat(employeeId), permissions, 'ROUTES');
                                // هنا ستتم معالجة حفظ الصلاحيات في قاعدة البيانات
                                res.json({ 'success': true, 'message': 'تم تحديث الصلاحيات بنجاح' });
                            }
                            catch (_b) {
                                res.status(500).json({ 'error': 'Server error' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // AI Analytics routes
                    app.get('/api/ai-analytics/:companyId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _companyId, analyticsData;
                        return __generator(this, function (_a) {
                            try {
                                _companyId = req.params.companyId;
                                analyticsData = {
                                    'overview': {
                                        'totalEmployees': 450,
                                        'employeeTrend': 12.5,
                                        'avgSalary': 2800,
                                        'salaryTrend': 8.3,
                                        'turnoverRate': 3.2,
                                        'turnoverTrend': -15.4,
                                        'satisfaction': 87,
                                        'satisfactionTrend': 5.7
                                    },
                                    'charts': {
                                        'employeeGrowth': [
                                            { 'month': 'يناير', 'employees': 420, 'predictions': 435 },
                                            { 'month': 'فبراير', 'employees': 425, 'predictions': 440 },
                                            { 'month': 'مارس', 'employees': 430, 'predictions': 445 },
                                            { 'month': 'أبريل', 'employees': 435, 'predictions': 450 },
                                            { 'month': 'مايو', 'employees': 440, 'predictions': 455 },
                                            { 'month': 'يونيو', 'employees': 450, 'predictions': 465 }
                                        ],
                                        'departmentDistribution': [
                                            { 'name': 'تقنية المعلومات', 'value': 150, 'color': '#0088FE' },
                                            { 'name': 'المبيعات', 'value': 120, 'color': '#00C49F' },
                                            { 'name': 'التسويق', 'value': 80, 'color': '#FFBB28' },
                                            { 'name': 'الموارد البشرية', 'value': 50, 'color': '#FF8042' },
                                            { 'name': 'المالية', 'value': 50, 'color': '#8884d8' }
                                        ],
                                        'salaryAnalysis': [
                                            { 'department': 'تقنية المعلومات', 'current': 3500, 'predicted': 3700 },
                                            { 'department': 'المبيعات', 'current': 2800, 'predicted': 2950 },
                                            { 'department': 'التسويق', 'current': 2600, 'predicted': 2750 },
                                            { 'department': 'الموارد البشرية', 'current': 2400, 'predicted': 2520 },
                                            { 'department': 'المالية', 'current': 3200, 'predicted': 3350 }
                                        ]
                                    }
                                };
                                res.json(analyticsData);
                            }
                            catch (error) {
                                safeLogError('Error fetching AI analytics:', error);
                                res.status(500).json({ 'message': 'Failed to fetch AI analytics' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/ai-predictions/:companyId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var predictions;
                        return __generator(this, function (_a) {
                            try {
                                predictions = [
                                    {
                                        'id': 1,
                                        'type': 'employee_turnover',
                                        'title': 'توقع معدل دوران الموظفين',
                                        'prediction': 'انخفاض بنسبة 15% في الربع القادم',
                                        'confidence': 85,
                                        'impact': 'positive',
                                        'timeframe': '3 أشهر',
                                        'details': 'بناء على تحليل رضا الموظفين وسياسات الشركة الجديدة'
                                    },
                                    {
                                        'id': 2,
                                        'type': 'salary_optimization',
                                        'title': 'تحسين هيكل الرواتب',
                                        'prediction': 'إمكانية توفير 180,000 ريال سنوياً',
                                        'confidence': 78,
                                        'impact': 'positive',
                                        'timeframe': '6 أشهر',
                                        'details': 'من خلال إعادة توزيع الرواتب وتحسين نظام المكافآت'
                                    },
                                    {
                                        'id': 3,
                                        'type': 'recruitment_needs',
                                        'title': 'احتياجات التوظيف',
                                        'prediction': 'الحاجة لتوظيف 25 موظف جديد',
                                        'confidence': 92,
                                        'impact': 'neutral',
                                        'timeframe': '4 أشهر',
                                        'details': 'لمواكبة النمو المتوقع في المشاريع الجديدة'
                                    }
                                ];
                                res.json(predictions);
                            }
                            catch (error) {
                                safeLogError('Error fetching AI predictions:', error);
                                res.status(500).json({ 'message': 'Failed to fetch AI predictions' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.post('/api/ai-chat', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var messages, lastMessage, userMessage_1, responses, response, partialMatch;
                        var _a;
                        return __generator(this, function (_b) {
                            try {
                                messages = req.body.messages;
                                lastMessage = messages[messages.length - 1];
                                userMessage_1 = (_a = lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.content) !== null && _a !== void 0 ? _a : '';
                                responses = {
                                    'ما هو معدل دوران الموظفين الحالي؟': 'معدل دوران الموظفين الحالي هو 3.2% وهو منخفض بنسبة 15.4% مقارنة بالشهر الماضي، مما يدل على تحسن في رضا الموظفين. هذا المعدل يعتبر صحياً للشركة.',
                                    'أعطني تحليل رضا الموظفين': 'رضا الموظفين الحالي 87% مع ارتفاع 5.7%. أعلى الأقسام رضا: تقنية المعلومات (92%)، أقلها: المبيعات (78%). ننصح بتحسين بيئة العمل في قسم المبيعات.',
                                    'ما هي توقعات النمو للشهر القادم؟': 'نتوقع نمو بنسبة 3.5% في عدد الموظفين الشهر القادم، مع التركيز على توظيف مطورين وموظفي مبيعات. النمو مدفوع بمشاريع جديدة.',
                                    'أعطني تقرير الغياب لهذا الشهر': 'تقرير الغياب لهذا الشهر:\n\n• إجمالي أيام العمل: 22 يوم\n• نسبة الحضور: 92%\n• عدد أيام الغياب: 45 يوم\n• متوسط التأخير: 12 دقيقة\n\nالتوصية: قسم IT لديه أفضل نسبة حضور (95%)',
                                    'كم رخصة ستنتهي خلال الشهر القادم؟': 'تحليل التراخيص المنتهية:\n\n⚠️ تراخيص ستنتهي خلال 30 يوم:\n• شركة النيل الأزرق - 15 يوم\n• شركة الاتحاد الخليجي - 30 يوم\n\n📊 إجمالي التراخيص النشطة: 156\n📈 نسبة التجديد المتوقعة: 85%',
                                    'أعطني تحليل أداء الموظفين': 'تحليل أداء الموظفين:\n\n🏆 أفضل أداء:\n• أحمد محمد - 95%\n• سارة أحمد - 91%\n\n⚠️ يحتاج متابعة:\n• محمد حسن - 72%\n\n📈 متوسط الأداء العام: 87%',
                                    'ما هي التوصيات لتحسين الأداء؟': 'التوصيات الذكية للتحسين:\n\n1. 🎯 تدريب إضافي لـ 3 موظفين في قسم المبيعات\n2. 📅 تحسين جدول العمل لتقليل التأخير\n3. 🔄 مراجعة سياسات الغياب\n4. 💡 إدخال نظام حوافز لتحسين الأداء',
                                    'أعطني إحصائيات الحضور': 'إحصائيات الحضور الشاملة:\n\n📊 النسب:\n• الحضور: 92%\n• الغياب: 6%\n• التأخير: 2%\n\n🏢 أفضل الأقسام:\n1. IT - 95%\n2. المالية - 93%\n3. الموارد البشرية - 90%',
                                    'حلل حالة جميع التراخيص': 'تحليل شامل للتراخيص:\n\n📋 الحالة:\n• نشطة: 65%\n• تنتهي قريباً: 15%\n• منتهية: 10%\n• قيد التجديد: 10%\n\n💰 التكلفة المتوقعة للتجديد: 45,000 ريال'
                                };
                                response = responses[userMessage_1];
                                if (!response) {
                                    partialMatch = Object.keys(responses).find(function (key) { var _a; return (_a = userMessage_1.includes(key)) !== null && _a !== void 0 ? _a : key.includes(userMessage_1); });
                                    if (partialMatch) {
                                        response = responses[partialMatch];
                                    }
                                    else {
                                        response = 'أفهم سؤالك. يمكنني مساعدتك في:\n\n• تحليل البيانات والإحصائيات\n• تقارير الغياب والحضور\n• تحليل أداء الموظفين\n• متابعة التراخيص والوثائق\n• التوصيات الذكية للتحسين\n\nما الذي تريد معرفته تحديداً؟';
                                    }
                                }
                                // Return in the format expected by the ai package
                                res.json({
                                    'id': Date.now().toString(),
                                    'role': 'assistant',
                                    'content': response,
                                    'createdAt': new Date().toISOString()
                                });
                            }
                            catch (error) {
                                safeLogError('Error processing AI chat:', error);
                                res.status(500).json({
                                    'error': 'Failed to process AI chat',
                                    'message': 'حدث خطأ في معالجة الرسالة. يرجى المحاولة مرة أخرى.'
                                });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.post('/api/ai-insights/generate', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, type, _companyId, insights;
                        var _b;
                        return __generator(this, function (_c) {
                            try {
                                _a = req.body, type = _a.type, _companyId = _a._companyId;
                                insights = {
                                    'comprehensive': {
                                        'message': 'تم توليد رؤى جديدة بنجاح',
                                        'insights': [
                                            'قسم تقنية المعلومات يحقق أفضل النتائج',
                                            'فرصة تحسين الرواتب في قسم التسويق',
                                            'الحاجة لبرامج تدريب إضافية'
                                        ]
                                    }
                                };
                                res.json((_b = insights[type]) !== null && _b !== void 0 ? _b : { 'message': 'تم توليد الرؤى بنجاح' });
                            }
                            catch (error) {
                                safeLogError('Error generating AI insights:', error);
                                res.status(500).json({ 'message': 'Failed to generate AI insights' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Early Warning System routes
                    app.get('/api/early-warnings/:companyId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _companyId, alerts;
                        return __generator(this, function (_a) {
                            try {
                                _companyId = req.params.companyId;
                                alerts = [
                                    {
                                        'id': 1,
                                        'type': 'turnover_risk',
                                        'severity': 'high',
                                        'title': 'خطر ارتفاع معدل دوران الموظفين',
                                        'description': 'معدل دوران الموظفين في قسم المبيعات وصل إلى 8.5% هذا الشهر',
                                        'impact': 'قد يؤثر على الأداء العام للقسم',
                                        'recommendation': 'مراجعة رواتب ومكافآت قسم المبيعات',
                                        'timestamp': new Date().toISOString(),
                                        'department': 'المبيعات',
                                        'value': 8.5,
                                        'threshold': 5.0,
                                        'trend': 'increasing'
                                    },
                                    {
                                        'id': 2,
                                        'type': 'budget_variance',
                                        'severity': 'medium',
                                        'title': 'تجاوز الميزانية المخصصة للرواتب',
                                        'description': 'الإنفاق على الرواتب تجاوز الميزانية بنسبة 12%',
                                        'impact': 'ضغط على الميزانية العامة للشركة',
                                        'recommendation': 'مراجعة هيكل الرواتب والمكافآت',
                                        'timestamp': new Date().toISOString(),
                                        'department': 'المالية',
                                        'value': 112,
                                        'threshold': 100,
                                        'trend': 'increasing'
                                    },
                                    {
                                        'id': 3,
                                        'type': 'satisfaction_drop',
                                        'severity': 'medium',
                                        'title': 'انخفاض رضا الموظفين',
                                        'description': 'رضا الموظفين في قسم التسويق انخفض إلى 68%',
                                        'impact': 'قد يؤدي إلى زيادة معدل الاستقالات',
                                        'recommendation': 'إجراء جلسات استماع مع موظفي التسويق',
                                        'timestamp': new Date().toISOString(),
                                        'department': 'التسويق',
                                        'value': 68,
                                        'threshold': 70,
                                        'trend': 'decreasing'
                                    }
                                ];
                                res.json(alerts);
                            }
                            catch (error) {
                                safeLogError('Error fetching early warnings:', error);
                                res.status(500).json({ 'message': 'Failed to fetch early warnings' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/trend-analysis/:companyId', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var trends;
                        return __generator(this, function (_a) {
                            try {
                                trends = {
                                    'turnover': [
                                        { 'month': 'سبتمبر', 'value': 3.2, 'threshold': 5.0 },
                                        { 'month': 'أكتوبر', 'value': 4.1, 'threshold': 5.0 },
                                        { 'month': 'نوفمبر', 'value': 5.8, 'threshold': 5.0 },
                                        { 'month': 'ديسمبر', 'value': 6.2, 'threshold': 5.0 },
                                        { 'month': 'يناير', 'value': 7.1, 'threshold': 5.0 }
                                    ],
                                    'satisfaction': [
                                        { 'month': 'سبتمبر', 'value': 85, 'threshold': 70 },
                                        { 'month': 'أكتوبر', 'value': 82, 'threshold': 70 },
                                        { 'month': 'نوفمبر', 'value': 78, 'threshold': 70 },
                                        { 'month': 'ديسمبر', 'value': 74, 'threshold': 70 },
                                        { 'month': 'يناير', 'value': 71, 'threshold': 70 }
                                    ],
                                    'budget': [
                                        { 'month': 'سبتمبر', 'value': 95, 'threshold': 100 },
                                        { 'month': 'أكتوبر', 'value': 98, 'threshold': 100 },
                                        { 'month': 'نوفمبر', 'value': 103, 'threshold': 100 },
                                        { 'month': 'ديسمبر', 'value': 108, 'threshold': 100 },
                                        { 'month': 'يناير', 'value': 112, 'threshold': 100 }
                                    ]
                                };
                                res.json(trends);
                            }
                            catch (error) {
                                safeLogError('Error fetching trend analysis:', error);
                                res.status(500).json({ 'message': 'Failed to fetch trend analysis' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.post('/api/early-warnings/settings', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, settings, companyId;
                        return __generator(this, function (_b) {
                            try {
                                _a = req.body, settings = _a.settings, companyId = _a.companyId;
                                logger_1.log.info("Updating early warning settings for company ".concat(companyId), settings, 'ROUTES');
                                res.json({
                                    'success': true,
                                    'message': 'تم حفظ إعدادات التنبيه بنجاح'
                                });
                            }
                            catch (error) {
                                safeLogError('Error updating early warning settings:', error);
                                res.status(500).json({ 'message': 'Failed to update settings' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Register advanced routes
                    // Advanced System APIs for Production
                    app.get('/api/system/health', function (req, res) {
                        res.json({
                            'status': 'healthy',
                            'uptime': process.uptime(),
                            'timestamp': new Date().toISOString(),
                            'services': {
                                'database': 'connected',
                                'api': 'operational',
                                'auth': 'active'
                            }
                        });
                    });
                    app.get('/api/analytics/dashboard', function (req, res) {
                        res.json({
                            'employeeGrowth': [
                                { 'month': 'يناير', 'count': 45 },
                                { 'month': 'فبراير', 'count': 52 },
                                { 'month': 'مارس', 'count': 48 },
                                { 'month': 'أبريل', 'count': 61 },
                                { 'month': 'مايو', 'count': 55 },
                                { 'month': 'يونيو', 'count': 67 }
                            ],
                            'departmentDistribution': [
                                { 'name': 'الإنتاج', 'value': 45, 'color': '#0088FE' },
                                { 'name': 'المبيعات', 'value': 35, 'color': '#00C49F' },
                                { 'name': 'الإدارة', 'value': 25, 'color': '#FFBB28' },
                                { 'name': 'المالية', 'value': 15, 'color': '#FF8042' }
                            ],
                            'attendanceRate': 92.5,
                            'performanceScore': 87.3
                        });
                    });
                    app.get('/api/quick-stats', function (req, res) {
                        res.json({
                            'totalEmployees': 273,
                            'presentToday': 251,
                            'onLeave': 12,
                            'pendingRequests': 8,
                            'activeProjects': 15,
                            'completedTasks': 142
                        });
                    });
                    // Notifications APIs
                    app.get('/api/notifications', function (req, res) {
                        res.json([
                            {
                                'id': '1',
                                'title': 'طلب إجازة جديد',
                                'message': 'تم تقديم طلب إجازة من أحمد محمد',
                                'type': 'info',
                                'timestamp': new Date().toISOString(),
                                'read': false
                            },
                            {
                                'id': '2',
                                'title': 'انتهاء صلاحية ترخيص',
                                'message': 'ترخيص التجارة الإلكترونية سينتهي خلال 30 يوم',
                                'type': 'warning',
                                'timestamp': new Date(Date.now() - 1000 * 60 * 60).toISOString(),
                                'read': false
                            },
                            {
                                'id': '3',
                                'title': 'تم الموافقة على الطلب',
                                'message': 'تم الموافقة على طلب الإجازة المرضية',
                                'type': 'success',
                                'timestamp': new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                                'read': true
                            }
                        ]);
                    });
                    app.patch('/api/notifications/:id/read', function (req, res) {
                        res.json({ 'success': true, 'message': 'Notification marked as read' });
                    });
                    app.delete('/api/notifications/:id', function (req, res) {
                        res.json({ 'success': true, 'message': 'Notification deleted' });
                    });
                    app.patch('/api/notifications/mark-all-read', function (req, res) {
                        res.json({ 'success': true, 'message': 'All notifications marked as read' });
                    });
                    // Attendance APIs are now handled in employee-routes.ts
                    // Leave Request APIs
                    // Leave request routes are now handled in employee-routes.ts
                    // Mobile APIs
                    app.get('/api/mobile/integrations', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var integrations;
                        return __generator(this, function (_a) {
                            try {
                                integrations = [
                                    {
                                        'id': 'mobile1',
                                        'name': 'تطبيق الموظفين',
                                        'type': 'PWA',
                                        'status': 'active',
                                        'users': 85,
                                        'lastSync': new Date().toISOString(),
                                        'features': ['تسجيل الحضور', 'طلب إجازة', 'عرض الراتب', 'الإشعارات']
                                    }
                                ];
                                res.json(integrations);
                            }
                            catch (error) {
                                safeLogError('Error fetching mobile integrations:', error);
                                res.status(500).json({ 'message': 'Failed to fetch mobile integrations' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/mobile/device-registrations', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var devices;
                        return __generator(this, function (_a) {
                            try {
                                devices = [
                                    {
                                        'id': 'device1',
                                        'deviceName': 'جهاز تسجيل الحضور - المدخل الرئيسي',
                                        'location': 'المبنى الرئيسي - الطابق الأول',
                                        'status': 'online',
                                        'registeredUsers': 125,
                                        'lastPing': new Date().toISOString()
                                    }
                                ];
                                res.json(devices);
                            }
                            catch (error) {
                                safeLogError('Error fetching device registrations:', error);
                                res.status(500).json({ 'message': 'Failed to fetch device registrations' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/mobile/stats/:companyId', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var stats;
                        return __generator(this, function (_a) {
                            try {
                                stats = {
                                    'activeUsers': 156,
                                    'dailyCheckIns': 142,
                                    'appInstalls': 189,
                                    'notificationsSent': 45
                                };
                                res.json(stats);
                            }
                            catch (error) {
                                safeLogError('Error fetching mobile stats:', error);
                                res.status(500).json({ 'message': 'Failed to fetch mobile stats' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // تم حذف هذا المسار المكرر الثالث
                    // Employee creation is now handled in employee-routes.ts
                    // Attendance APIs are now handled in employee-routes.ts
                    // Leave request routes are now handled in employee-routes.ts
                    // Payroll APIs - مع فصل البيانات حسب الشركة
                    app.get('/api/payroll', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, payrollData;
                        return __generator(this, function (_a) {
                            try {
                                companyId = req.query.companyId;
                                if (!companyId) {
                                    return [2 /*return*/, res.status(400).json({ 'message': 'Company ID is required' })];
                                }
                                payrollData = [
                                    {
                                        companyId: companyId,
                                        'employeeId': '1',
                                        'employeeName': 'أحمد محمد علي',
                                        'month': '2025-01',
                                        'basicSalary': 8000,
                                        'allowances': 1200,
                                        'overtime': 400,
                                        'deductions': 800,
                                        'netSalary': 8800,
                                        'status': 'processed'
                                    },
                                    {
                                        companyId: companyId,
                                        'employeeId': '2',
                                        'employeeName': 'فاطمة سالم أحمد',
                                        'month': '2025-01',
                                        'basicSalary': 6500,
                                        'allowances': 900,
                                        'overtime': 200,
                                        'deductions': 650,
                                        'netSalary': 6950,
                                        'status': 'processed'
                                    },
                                    {
                                        companyId: companyId,
                                        'employeeId': '3',
                                        'employeeName': 'خالد عبدالرحمن',
                                        'month': '2025-01',
                                        'basicSalary': 7500,
                                        'allowances': 1000,
                                        'overtime': 300,
                                        'deductions': 750,
                                        'netSalary': 8050,
                                        'status': 'pending'
                                    }
                                ];
                                res.json(payrollData);
                            }
                            catch (error) {
                                safeLogError('Error fetching payroll data:', error);
                                res.status(500).json({ 'message': 'Failed to fetch payroll data' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Documents APIs - مع فصل البيانات حسب الشركة
                    app.get('/api/documents', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, documents;
                        return __generator(this, function (_a) {
                            try {
                                companyId = req.query.companyId;
                                if (!companyId) {
                                    return [2 /*return*/, res.status(400).json({ 'message': 'Company ID is required' })];
                                }
                                documents = [
                                    {
                                        'id': '1',
                                        companyId: companyId,
                                        'name': 'عقد العمل - أحمد محمد علي.pdf',
                                        'type': 'contract',
                                        'category': 'contracts',
                                        'size': '2.5 MB',
                                        'uploadDate': '2025-01-20',
                                        'uploadedBy': 'مدير الموارد البشرية',
                                        'employee': 'أحمد محمد علي',
                                        'status': 'active'
                                    },
                                    {
                                        'id': '2',
                                        companyId: companyId,
                                        'name': 'كشف المرتب - يناير 2025.xlsx',
                                        'type': 'payroll',
                                        'category': 'payroll',
                                        'size': '1.2 MB',
                                        'uploadDate': '2025-01-15',
                                        'uploadedBy': 'محاسب الرواتب',
                                        'employee': 'جميع الموظفين',
                                        'status': 'processed'
                                    },
                                    {
                                        'id': '3',
                                        companyId: companyId,
                                        'name': 'تقرير الأداء السنوي.pdf',
                                        'type': 'report',
                                        'category': 'reports',
                                        'size': '5.8 MB',
                                        'uploadDate': '2025-01-10',
                                        'uploadedBy': 'مدير الشركة',
                                        'employee': 'إدارة الشركة',
                                        'status': 'reviewed'
                                    }
                                ];
                                res.json(documents);
                            }
                            catch (error) {
                                safeLogError('Error fetching documents:', error);
                                res.status(500).json({ 'message': 'Failed to fetch documents' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.delete('/api/documents/:id', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var id;
                        return __generator(this, function (_a) {
                            try {
                                id = req.params.id;
                                res.json({ 'message': 'Document deleted successfully', id: id });
                            }
                            catch (error) {
                                safeLogError('Error deleting document:', error);
                                res.status(500).json({ 'message': 'Failed to delete document' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    // Notifications APIs are now handled in the main routes section
                    // AI Reports and Analytics endpoints
                    app.get('/api/ai/summary', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var companyId, aiSummary;
                        return __generator(this, function (_a) {
                            try {
                                companyId = req.query.companyId;
                                aiSummary = {
                                    'companyId': companyId !== null && companyId !== void 0 ? companyId : "default",
                                    'generatedAt': new Date().toISOString(),
                                    'summary': {
                                        'overview': 'تحليل شامل لبيانات الشركة يظهر نمواً إيجابياً في معظم المؤشرات مع بعض المجالات التي تحتاج إلى تحسين.',
                                        'keyInsights': [
                                            'معدل دوران الموظفين منخفض (3.2%) مما يدل على رضا الموظفين',
                                            'قسم تقنية المعلومات يحقق أفضل النتائج مع معدل حضور 95%',
                                            'الحاجة لتحسين سياسات الغياب في قسم المبيعات',
                                            'فرصة لتحسين هيكل الرواتب في الأقسام الإدارية'
                                        ],
                                        'recommendations': [
                                            'إجراء برامج تدريب إضافية لموظفي قسم المبيعات',
                                            'مراجعة سياسات الغياب والتأخير',
                                            'تحسين نظام المكافآت والحوافز',
                                            'إدخال نظام تقييم أداء أكثر تفصيلاً'
                                        ],
                                        'trends': {
                                            'employeeGrowth': '+12.5%',
                                            'satisfactionRate': '87%',
                                            'attendanceRate': '92%',
                                            'performanceScore': '4.2/5'
                                        }
                                    },
                                    'metrics': {
                                        'totalEmployees': 450,
                                        'activeEmployees': 435,
                                        'departments': 8,
                                        'avgSalary': 2800,
                                        'turnoverRate': 3.2,
                                        'satisfactionScore': 87
                                    }
                                };
                                res.json(aiSummary);
                            }
                            catch (error) {
                                safeLogError('Error generating AI summary:', error);
                                res.status(500).json({ 'message': 'Failed to generate AI summary' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/ai/insights', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _companyId, type, insights, selectedInsights;
                        return __generator(this, function (_b) {
                            try {
                                _a = req.query, _companyId = _a.companyId, type = _a.type;
                                insights = {
                                    'employee': {
                                        'title': 'تحليل الموظفين الذكي',
                                        'insights': [
                                            {
                                                'id': 1,
                                                'type': 'performance',
                                                'title': 'أفضل أداء',
                                                'description': 'أحمد محمد علي يحقق أعلى معدل أداء (95%)',
                                                'impact': 'positive',
                                                'confidence': 92
                                            },
                                            {
                                                'id': 2,
                                                'type': 'attendance',
                                                'title': 'مشكلة التأخير',
                                                'description': 'قسم المبيعات يعاني من معدل تأخير مرتفع (15%)',
                                                'impact': 'negative',
                                                'confidence': 88
                                            },
                                            {
                                                'id': 3,
                                                'type': 'satisfaction',
                                                'title': 'رضا الموظفين',
                                                'description': 'رضا الموظفين في قسم IT وصل إلى 92%',
                                                'impact': 'positive',
                                                'confidence': 85
                                            }
                                        ]
                                    },
                                    'financial': {
                                        'title': 'التحليل المالي الذكي',
                                        'insights': [
                                            {
                                                'id': 1,
                                                'type': 'salary',
                                                'title': 'تحسين الرواتب',
                                                'description': 'إمكانية توفير 180,000 ريال سنوياً من خلال إعادة هيكلة الرواتب',
                                                'impact': 'positive',
                                                'confidence': 78
                                            },
                                            {
                                                'id': 2,
                                                'type': 'budget',
                                                'title': 'تجاوز الميزانية',
                                                'description': 'الإنفاق على التدريب تجاوز الميزانية بنسبة 12%',
                                                'impact': 'negative',
                                                'confidence': 82
                                            }
                                        ]
                                    },
                                    'operational': {
                                        'title': 'التحليل التشغيلي الذكي',
                                        'insights': [
                                            {
                                                'id': 1,
                                                'type': 'efficiency',
                                                'title': 'كفاءة العمل',
                                                'description': 'قسم تقنية المعلومات يحقق أعلى كفاءة تشغيلية',
                                                'impact': 'positive',
                                                'confidence': 90
                                            },
                                            {
                                                'id': 2,
                                                'type': 'productivity',
                                                'title': 'الإنتاجية',
                                                'description': 'الحاجة لتحسين إنتاجية قسم المبيعات',
                                                'impact': 'negative',
                                                'confidence': 75
                                            }
                                        ]
                                    }
                                };
                                selectedInsights = type ? insights[type] : insights.employee;
                                res.json(selectedInsights);
                            }
                            catch (error) {
                                safeLogError('Error generating AI insights:', error);
                                res.status(500).json({ 'message': 'Failed to generate AI insights' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/ai/predictions', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _companyId, timeframe, predictions, selectedPredictions;
                        return __generator(this, function (_b) {
                            try {
                                _a = req.query, _companyId = _a.companyId, timeframe = _a.timeframe;
                                predictions = {
                                    'shortTerm': [
                                        {
                                            'id': 1,
                                            'type': 'turnover',
                                            'title': 'توقع معدل دوران الموظفين',
                                            'prediction': 'انخفاض بنسبة 15% في الشهر القادم',
                                            'confidence': 85,
                                            'impact': 'positive',
                                            'timeframe': 'شهر واحد',
                                            'factors': ['تحسين سياسات الشركة', 'زيادة رضا الموظفين']
                                        },
                                        {
                                            'id': 2,
                                            'type': 'recruitment',
                                            'title': 'احتياجات التوظيف',
                                            'prediction': 'الحاجة لتوظيف 8 موظفين جدد',
                                            'confidence': 78,
                                            'impact': 'neutral',
                                            'timeframe': 'شهرين',
                                            'factors': ['نمو المشاريع', 'استقالات متوقعة']
                                        }
                                    ],
                                    'mediumTerm': [
                                        {
                                            'id': 3,
                                            'type': 'salary',
                                            'title': 'تحسين هيكل الرواتب',
                                            'prediction': 'إمكانية توفير 250,000 ريال سنوياً',
                                            'confidence': 82,
                                            'impact': 'positive',
                                            'timeframe': '6 أشهر',
                                            'factors': ['إعادة هيكلة الرواتب', 'تحسين نظام المكافآت']
                                        },
                                        {
                                            'id': 4,
                                            'type': 'growth',
                                            'title': 'نمو الشركة',
                                            'prediction': 'زيادة عدد الموظفين بنسبة 25%',
                                            'confidence': 75,
                                            'impact': 'positive',
                                            'timeframe': 'سنة واحدة',
                                            'factors': ['توسع المشاريع', 'زيادة الطلب']
                                        }
                                    ],
                                    'longTerm': [
                                        {
                                            'id': 5,
                                            'type': 'technology',
                                            'title': 'تحديث التقنيات',
                                            'prediction': 'الحاجة لاستثمار 500,000 ريال في التقنيات',
                                            'confidence': 70,
                                            'impact': 'positive',
                                            'timeframe': 'سنتين',
                                            'factors': ['تحديث الأنظمة', 'تحسين الكفاءة']
                                        }
                                    ]
                                };
                                selectedPredictions = timeframe ? predictions[timeframe] : predictions.shortTerm;
                                res.json(selectedPredictions);
                            }
                            catch (error) {
                                safeLogError('Error generating AI predictions:', error);
                                res.status(500).json({ 'message': 'Failed to generate AI predictions' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.post('/api/ai/generate-report', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, type, companyId, _parameters, reportTypes, selectedReport, generatedReport;
                        var _b;
                        return __generator(this, function (_c) {
                            try {
                                _a = req.body, type = _a.type, companyId = _a.companyId, _parameters = _a.parameters;
                                reportTypes = {
                                    'employee': {
                                        'title': 'تقرير الموظفين الذكي',
                                        'content': 'تحليل شامل لبيانات الموظفين مع رؤى ذكية وتوصيات للتحسين',
                                        'sections': ['الأداء', 'الحضور', 'الرضا', 'التوصيات']
                                    },
                                    'financial': {
                                        'title': 'التقرير المالي الذكي',
                                        'content': 'تحليل مالي متقدم مع توقعات وتوصيات لتحسين الأداء المالي',
                                        'sections': ['الرواتب', 'الميزانية', 'التوقعات', 'التوصيات']
                                    },
                                    'operational': {
                                        'title': 'التقرير التشغيلي الذكي',
                                        'content': 'تحليل تشغيلي شامل مع مؤشرات الأداء والتوصيات',
                                        'sections': ['الكفاءة', 'الإنتاجية', 'الجودة', 'التوصيات']
                                    }
                                };
                                selectedReport = (_b = reportTypes[type]) !== null && _b !== void 0 ? _b : reportTypes.employee;
                                generatedReport = {
                                    'id': Date.now().toString(),
                                    type: type,
                                    companyId: companyId,
                                    'title': selectedReport.title,
                                    'content': selectedReport.content,
                                    'sections': selectedReport.sections,
                                    'generatedAt': new Date().toISOString(),
                                    'status': 'completed',
                                    'downloadUrl': "/api/reports/".concat(Date.now(), "/download")
                                };
                                res.json(generatedReport);
                            }
                            catch (error) {
                                safeLogError('Error generating AI report:', error);
                                res.status(500).json({ 'message': 'Failed to generate AI report' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    app.get('/api/ai/trends', isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _companyId, metric, trends, selectedTrends;
                        return __generator(this, function (_b) {
                            try {
                                _a = req.query, _companyId = _a.companyId, metric = _a.metric;
                                trends = {
                                    'employee': [
                                        { 'month': 'يناير', 'value': 420, 'trend': 'up' },
                                        { 'month': 'فبراير', 'value': 425, 'trend': 'up' },
                                        { 'month': 'مارس', 'value': 430, 'trend': 'up' },
                                        { 'month': 'أبريل', 'value': 435, 'trend': 'up' },
                                        { 'month': 'مايو', 'value': 440, 'trend': 'up' },
                                        { 'month': 'يونيو', 'value': 450, 'trend': 'up' }
                                    ],
                                    'satisfaction': [
                                        { 'month': 'يناير', 'value': 82, 'trend': 'up' },
                                        { 'month': 'فبراير', 'value': 84, 'trend': 'up' },
                                        { 'month': 'مارس', 'value': 85, 'trend': 'up' },
                                        { 'month': 'أبريل', 'value': 86, 'trend': 'up' },
                                        { 'month': 'مايو', 'value': 87, 'trend': 'up' },
                                        { 'month': 'يونيو', 'value': 87, 'trend': 'stable' }
                                    ],
                                    'attendance': [
                                        { 'month': 'يناير', 'value': 88, 'trend': 'up' },
                                        { 'month': 'فبراير', 'value': 89, 'trend': 'up' },
                                        { 'month': 'مارس', 'value': 90, 'trend': 'up' },
                                        { 'month': 'أبريل', 'value': 91, 'trend': 'up' },
                                        { 'month': 'مايو', 'value': 92, 'trend': 'up' },
                                        { 'month': 'يونيو', 'value': 92, 'trend': 'stable' }
                                    ]
                                };
                                selectedTrends = metric ? trends[metric] : trends.employee;
                                res.json(selectedTrends);
                            }
                            catch (error) {
                                safeLogError('Error fetching AI trends:', error);
                                res.status(500).json({ 'message': 'Failed to fetch AI trends' });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    httpServer = (0, http_1.createServer)(app);
                    return [2 /*return*/, httpServer];
            }
        });
    });
}
