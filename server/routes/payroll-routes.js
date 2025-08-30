"use strict";
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
exports.registerPayrollRoutes = registerPayrollRoutes;
var logger_1 = __importDefault(require("../utils/logger"));
var auth_1 = require("../middleware/auth");
function registerPayrollRoutes(app) {
    // Payroll routes use proper authentication middleware
    var _this = this;
    // Payroll routes
    app.get('/api/payroll/employee/:employeeId', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, _a, month, year, payrollData;
        return __generator(this, function (_b) {
            try {
                employeeId = req.params.employeeId;
                _a = req.query, month = _a.month, year = _a.year;
                payrollData = {
                    employeeId: employeeId,
                    'month': month !== null && month !== void 0 ? month : new Date().getMonth() + 1,
                    'year': year !== null && year !== void 0 ? year : new Date().getFullYear(),
                    'basicSalary': 2500.00,
                    'allowances': [
                        { 'type': 'housing', 'name': 'بدل سكن', 'amount': 500.00 },
                        { 'type': 'transport', 'name': 'بدل مواصلات', 'amount': 200.00 },
                        { 'type': 'meal', 'name': 'بدل وجبات', 'amount': 150.00 }
                    ],
                    'deductions': [
                        { 'type': 'tax', 'name': 'ضريبة الدخل', 'amount': 125.00 },
                        { 'type': 'insurance', 'name': 'التأمين الاجتماعي', 'amount': 175.00 },
                        { 'type': 'loan', 'name': 'قرض شخصي', 'amount': 100.00 }
                    ],
                    'overtime': {
                        'hours': 10,
                        'rate': 15.00,
                        'amount': 150.00
                    },
                    'bonus': 0.00,
                    'totalAllowances': 850.00,
                    'totalDeductions': 400.00,
                    'grossSalary': 3500.00,
                    'netSalary': 3100.00,
                    'paymentDate': '2025-01-31',
                    'status': 'processed',
                    'paymentMethod': 'bank_transfer',
                    'bankAccount': '****1234',
                    'notes': 'راتب شهر يناير 2025'
                };
                res.json(payrollData);
            }
            catch (error) {
                logger_1.default.error('Error fetching payroll data:', error instanceof Error ? error : new Error(String(error)));
                res.status(500).json({ 'message': 'Failed to fetch payroll data' });
            }
            return [2 /*return*/];
        });
    }); });
    app.get('/api/payroll/company/:companyId', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var companyId, _a, month, year, payrollSummary;
        return __generator(this, function (_b) {
            try {
                companyId = req.params.companyId;
                _a = req.query, month = _a.month, year = _a.year;
                payrollSummary = {
                    companyId: companyId,
                    'month': month !== null && month !== void 0 ? month : new Date().getMonth() + 1,
                    'year': year !== null && year !== void 0 ? year : new Date().getFullYear(),
                    'totalEmployees': 45,
                    'processedEmployees': 43,
                    'pendingEmployees': 2,
                    'totalGrossSalary': 157500.00,
                    'totalAllowances': 38250.00,
                    'totalDeductions': 18000.00,
                    'totalNetSalary': 139750.00,
                    'summary': {
                        'basicSalariesTotal': 119250.00,
                        'allowancesTotal': 38250.00,
                        'overtimeTotal': 6750.00,
                        'bonusesTotal': 12000.00,
                        'deductionsTotal': 18000.00,
                        'taxesTotal': 5625.00,
                        'insuranceTotal': 7875.00,
                        'loansTotal': 4500.00
                    },
                    'payrollStatus': 'in_progress',
                    'processedDate': null,
                    'approvedBy': null,
                    'paymentSchedule': 'monthly',
                    'nextPaymentDate': '2025-01-31'
                };
                res.json(payrollSummary);
            }
            catch (error) {
                logger_1.default.error('Error fetching company payroll:', error instanceof Error ? error : new Error(String(error)));
                res.status(500).json({ 'message': 'Failed to fetch company payroll' });
            }
            return [2 /*return*/];
        });
    }); });
    app.post('/api/payroll/process/:companyId', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var companyId, _a, month, year;
        var _b;
        return __generator(this, function (_c) {
            try {
                companyId = req.params.companyId;
                _a = req.body, month = _a.month, year = _a.year;
                // Mock payroll processing
                res.json({
                    'success': true,
                    'message': 'تم معالجة الرواتب بنجاح',
                    companyId: companyId,
                    month: month,
                    year: year,
                    'processedEmployees': 43,
                    'totalAmount': 139750.00,
                    'processedAt': new Date().toISOString(),
                    'processedBy': (_b = req.user) === null || _b === void 0 ? void 0 : _b.sub
                });
            }
            catch (error) {
                logger_1.default.error('Error processing payroll:', error instanceof Error ? error : new Error(String(error)));
                res.status(500).json({ 'message': 'Failed to process payroll' });
            }
            return [2 /*return*/];
        });
    }); });
    app.get('/api/payroll/reports/:companyId', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _companyId, _a, type, _period, reports;
        var _b;
        return __generator(this, function (_c) {
            try {
                _companyId = req.params.companyId;
                _a = req.query, type = _a.type, _period = _a.period;
                reports = {
                    'monthly': {
                        'title': 'تقرير الرواتب الشهري',
                        'data': [
                            {
                                'month': 'يناير', 'employees': 43, 'totalSalary': 139750.00, 'totalDeductions': 18000.00
                            },
                            {
                                'month': 'ديسمبر', 'employees': 41, 'totalSalary': 132500.00, 'totalDeductions': 17200.00
                            },
                            {
                                'month': 'نوفمبر', 'employees': 40, 'totalSalary': 128000.00, 'totalDeductions': 16800.00
                            }
                        ]
                    },
                    'yearly': {
                        'title': 'تقرير الرواتب السنوي',
                        'data': [
                            {
                                'year': '2025', 'employees': 43, 'totalSalary': 1677000.00, 'totalDeductions': 216000.00
                            },
                            {
                                'year': '2024', 'employees': 38, 'totalSalary': 1520000.00, 'totalDeductions': 195200.00
                            }
                        ]
                    },
                    'departmental': {
                        'title': 'تقرير الرواتب حسب القسم',
                        'data': [
                            { 'department': 'تقنية المعلومات', 'employees': 12, 'totalSalary': 48000.00 },
                            { 'department': 'المبيعات', 'employees': 15, 'totalSalary': 37500.00 },
                            { 'department': 'الإدارة', 'employees': 8, 'totalSalary': 32000.00 },
                            { 'department': 'المحاسبة', 'employees': 8, 'totalSalary': 22250.00 }
                        ]
                    }
                };
                res.json((_b = reports[type]) !== null && _b !== void 0 ? _b : reports.monthly);
            }
            catch (error) {
                logger_1.default.error('Error fetching payroll reports:', error instanceof Error ? error : new Error(String(error)));
                res.status(500).json({ 'message': 'Failed to fetch payroll reports' });
            }
            return [2 /*return*/];
        });
    }); });
    app.get('/api/payroll/taxes/:companyId', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var companyId, taxData;
        return __generator(this, function (_a) {
            try {
                companyId = req.params.companyId;
                taxData = {
                    companyId: companyId,
                    'currentPeriod': {
                        'month': new Date().getMonth() + 1,
                        'year': new Date().getFullYear(),
                        'totalTaxableIncome': 157500.00,
                        'totalTaxDeducted': 5625.00,
                        'socialInsurance': 7875.00,
                        'otherDeductions': 4500.00
                    },
                    'quarterlyTax': {
                        'q1': { 'period': 'Q1 2025', 'taxable': 472500.00, 'tax': 16875.00 },
                        'q2': { 'period': 'Q2 2024', 'taxable': 450000.00, 'tax': 15750.00 },
                        'q3': { 'period': 'Q3 2024', 'taxable': 465000.00, 'tax': 16275.00 },
                        'q4': { 'period': 'Q4 2024', 'taxable': 480000.00, 'tax': 16800.00 }
                    },
                    'yearlyTax': {
                        'year': 2024,
                        'totalTaxableIncome': 1867500.00,
                        'totalTaxDeducted': 65700.00,
                        'effectiveRate': 3.52
                    },
                    'upcomingDeadlines': [
                        {
                            'type': 'quarterly_return', 'deadline': '2025-04-15', 'description': 'الإقرار الضريبي الربعي'
                        },
                        {
                            'type': 'annual_return', 'deadline': '2025-03-31', 'description': 'الإقرار الضريبي السنوي'
                        }
                    ]
                };
                res.json(taxData);
            }
            catch (error) {
                logger_1.default.error('Error fetching tax data:', error instanceof Error ? error : new Error(String(error)));
                res.status(500).json({ 'message': 'Failed to fetch tax data' });
            }
            return [2 /*return*/];
        });
    }); });
    app.get('/api/payroll/slips/:employeeId', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeId, year_1, payslips, filteredSlips;
        return __generator(this, function (_a) {
            try {
                employeeId = req.params.employeeId;
                year_1 = req.query.year;
                payslips = [
                    {
                        'id': 'slip-2025-01',
                        employeeId: employeeId,
                        'month': 1,
                        'year': 2025,
                        'grossSalary': 3500.00,
                        'netSalary': 3100.00,
                        'generatedDate': '2025-01-31',
                        'downloadUrl': "/api/payroll/slips/".concat(employeeId, "/slip-2025-01/download")
                    },
                    {
                        'id': 'slip-2024-12',
                        employeeId: employeeId,
                        'month': 12,
                        'year': 2024,
                        'grossSalary': 3500.00,
                        'netSalary': 3080.00,
                        'generatedDate': '2024-12-31',
                        'downloadUrl': "/api/payroll/slips/".concat(employeeId, "/slip-2024-12/download")
                    }
                ];
                filteredSlips = payslips;
                if (year_1) {
                    filteredSlips = payslips.filter(function (slip) { return slip.year === parseInt(year_1); });
                }
                res.json(filteredSlips);
            }
            catch (error) {
                logger_1.default.error('Error fetching pay slips:', error instanceof Error ? error : new Error(String(error)));
                res.status(500).json({ 'message': 'Failed to fetch pay slips' });
            }
            return [2 /*return*/];
        });
    }); });
    app.get('/api/payroll/slips/:employeeId/:slipId/download', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, employeeId, slipId;
        return __generator(this, function (_b) {
            try {
                _a = req.params, employeeId = _a.employeeId, slipId = _a.slipId;
                // In real app, generate and return PDF
                res.json({
                    'message': 'Pay slip PDF would be generated and downloaded here',
                    employeeId: employeeId,
                    slipId: slipId,
                    'downloadUrl': "/files/payslips/".concat(slipId, ".pdf")
                });
            }
            catch (error) {
                logger_1.default.error('Error downloading pay slip:', error instanceof Error ? error : new Error(String(error)));
                res.status(500).json({ 'message': 'Failed to download pay slip' });
            }
            return [2 /*return*/];
        });
    }); });
}
