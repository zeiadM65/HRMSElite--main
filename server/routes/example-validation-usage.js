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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerExampleValidationRoutes = registerExampleValidationRoutes;
var zod_1 = require("zod");
var validateInput_1 = require("../middleware/validateInput");
var schema_1 = require("../../shared/schema");
var storage_1 = require("../models/storage");
var logger_1 = require("../utils/logger");
// Custom validation schemas for specific use cases
var employeeSearchSchema = zod_1.z.object({
    'query': zod_1.z.string().min(1, 'يجب إدخال نص للبحث').max(100, 'نص البحث طويل جداً'),
    'department': zod_1.z.string().optional(),
    'status': zod_1.z.enum(['active', 'inactive', 'on_leave', 'terminated', 'archived']).optional(),
    'companyId': zod_1.z.string().optional(),
    'page': zod_1.z.number().min(1, 'رقم الصفحة يجب أن يكون أكبر من 0').optional().default(1),
    'limit': zod_1.z.number().min(1, 'عدد النتائج يجب أن يكون أكبر من 0').max(100, 'عدد النتائج كبير جداً').optional().default(20)
});
var employeeUpdateSchema = zod_1.z.object({
    'fullName': zod_1.z.string().min(2, 'الاسم يجب أن يكون على الأقل حرفين').max(100, 'الاسم طويل جداً'),
    'position': zod_1.z.string().min(2, 'المنصب يجب أن يكون على الأقل حرفين').max(100, 'المنصب طويل جداً'),
    'department': zod_1.z.string().min(2, 'القسم يجب أن يكون على الأقل حرفين').max(100, 'القسم طويل جداً'),
    'salary': zod_1.z.number().min(0, 'الراتب يجب أن يكون موجب'),
    'status': zod_1.z.enum(['active', 'inactive', 'on_leave', 'terminated', 'archived']),
    'hireDate': zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'تاريخ التوظيف يجب أن يكون بصيغة YYYY-MM-DD')
});
var companySearchSchema = zod_1.z.object({
    'name': zod_1.z.string().optional(),
    'industryType': zod_1.z.string().optional(),
    'location': zod_1.z.string().optional(),
    'isActive': zod_1.z.boolean().optional(),
    'page': zod_1.z.number().min(1).optional().default(1),
    'limit': zod_1.z.number().min(1).max(100).optional().default(20)
});
var licenseSearchSchema = zod_1.z.object({
    'type': zod_1.z.enum(['main',
        'branch',
        'commercial',
        'industrial',
        'professional',
        'import_export',
        'tailoring',
        'fabric',
        'jewelry',
        'restaurant',
        'service']).optional(),
    'status': zod_1.z.enum(['active', 'expired', 'pending']).optional(),
    'companyId': zod_1.z.string().optional(),
    'page': zod_1.z.number().min(1).optional().default(1),
    'limit': zod_1.z.number().min(1).max(100).optional().default(20)
});
// Updated document upload schema to match actual table requirements
var documentUploadSchema = zod_1.z.object({
    'entityId': zod_1.z.string().min(1, 'معرف الكيان مطلوب'),
    'entityType': zod_1.z.enum(['employee', 'company', 'license'], {
        'errorMap': function () { return ({ 'message': 'نوع الكيان يجب أن يكون: employee, company, أو license' }); }
    }),
    'name': zod_1.z.string().min(1, 'اسم المستند مطلوب').max(200, 'اسم المستند طويل جداً'),
    'type': zod_1.z.enum(['passport',
        'residence',
        'license',
        'contract',
        'certificate',
        'civil_id',
        'work_permit',
        'health_certificate',
        'establishment_document',
        'tax_certificate',
        'chamber_membership',
        'import_export_license',
        'fire_permit',
        'municipality_permit',
        'other']),
    'fileName': zod_1.z.string().min(1, 'اسم الملف مطلوب'),
    'fileUrl': zod_1.z.string().min(1, 'رابط الملف مطلوب'),
    'uploadedBy': zod_1.z.string().min(1, 'معرف المستخدم مطلوب'),
    'description': zod_1.z.string().max(500, 'وصف المستند طويل جداً').optional(),
    'tags': zod_1.z.string().optional() // JSON string as stored in database
});
// Updated leave request schema to match actual table requirements
var leaveRequestSchema = zod_1.z.object({
    'employeeId': zod_1.z.string().min(1, 'معرف الموظف مطلوب'),
    'type': zod_1.z.enum(['annual', 'sick', 'maternity', 'emergency', 'unpaid']),
    'startDate': zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'تاريخ البداية يجب أن يكون بصيغة YYYY-MM-DD'),
    'endDate': zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'تاريخ النهاية يجب أن يكون بصيغة YYYY-MM-DD'),
    'days': zod_1.z.number().min(1, 'عدد الأيام يجب أن يكون أكبر من 0'),
    'reason': zod_1.z.string().min(10, 'سبب الإجازة يجب أن يكون على الأقل 10 أحرف').max(500, 'سبب الإجازة طويل جداً'),
    'notes': zod_1.z.string().max(1000, 'الملاحظات طويلة جداً').optional()
});
function registerExampleValidationRoutes(app) {
    var _this = this;
    // Example 1: Employee creation with validation
    app.post('/api/employees', validateInput_1.validateInput.sanitize, // Sanitize input first
    validateInput_1.validateInput.body(schema_1.insertEmployeeSchema), // Validate with Zod schema
    function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var employeeData, newEmployee, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    employeeData = req.body;
                    logger_1.log.info('Creating new employee', { 'employeeData': employeeData });
                    return [4 /*yield*/, storage_1.storage.createEmployee(employeeData)];
                case 1:
                    newEmployee = _a.sent();
                    res.status(201).json({
                        'message': 'تم إنشاء الموظف بنجاح',
                        'employee': newEmployee
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    logger_1.log.error('Error creating employee', {
                        'error': error_1 instanceof Error ? error_1.message : 'Unknown error'
                    });
                    res.status(500).json({
                        'message': 'فشل في إنشاء الموظف',
                        'error': error_1 instanceof Error ? error_1.message : 'Unknown error'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 2: Employee search with query validation
    app.get('/api/employees/search', validateInput_1.validateInput.query(employeeSearchSchema), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, query, department, status_1, companyId, page, limit, employees, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query, query = _a.query, department = _a.department, status_1 = _a.status, companyId = _a.companyId, page = _a.page, limit = _a.limit;
                    logger_1.log.info('Searching employees', {
                        query: query,
                        department: department,
                        status: status_1,
                        companyId: companyId,
                        page: page,
                        limit: limit
                    });
                    return [4 /*yield*/, storage_1.storage.searchEmployees({
                            'search': query,
                            'department': department,
                            'status': status_1,
                            'companyId': companyId
                        })];
                case 1:
                    employees = _b.sent();
                    res.json({
                        employees: employees,
                        'pagination': {
                            'page': Number(page) || 1,
                            'limit': Number(limit) || 20,
                            'total': employees.length
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    logger_1.log.error('Error searching employees', {
                        'error': error_2 instanceof Error ? error_2.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في البحث عن الموظفين' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 3: Employee update with custom validation
    app.put('/api/employees/:id', validateInput_1.validateInput.params(zod_1.z.object({ 'id': zod_1.z.string().min(1, 'معرف الموظف مطلوب') })), validateInput_1.validateInput.body(employeeUpdateSchema), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, updateData, updatedEmployee, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    updateData = req.body;
                    // Ensure id is not undefined
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'معرف الموظف مطلوب' })];
                    }
                    logger_1.log.info('Updating employee', { id: id, updateData: updateData });
                    return [4 /*yield*/, storage_1.storage.updateEmployee(id, updateData)];
                case 1:
                    updatedEmployee = _a.sent();
                    res.json({
                        'message': 'تم تحديث بيانات الموظف بنجاح',
                        'employee': updatedEmployee
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    logger_1.log.error('Error updating employee', {
                        'error': error_3 instanceof Error ? error_3.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في تحديث بيانات الموظف' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 4: Company creation with validation
    app.post('/api/companies', validateInput_1.validateInput.sanitize, validateInput_1.validateInput.body(schema_1.insertCompanySchema), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var companyData, newCompany, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    companyData = req.body;
                    logger_1.log.info('Creating new company', { 'companyData': companyData });
                    return [4 /*yield*/, storage_1.storage.createCompany(companyData)];
                case 1:
                    newCompany = _a.sent();
                    res.status(201).json({
                        'message': 'تم إنشاء الشركة بنجاح',
                        'company': newCompany
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    logger_1.log.error('Error creating company', {
                        'error': error_4 instanceof Error ? error_4.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في إنشاء الشركة' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 5: License creation with validation
    app.post('/api/licenses', validateInput_1.validateInput.sanitize, validateInput_1.validateInput.body(schema_1.insertLicenseSchema), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var licenseData, newLicense, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    licenseData = req.body;
                    logger_1.log.info('Creating new license', { 'licenseData': licenseData });
                    return [4 /*yield*/, storage_1.storage.createLicense(licenseData)];
                case 1:
                    newLicense = _a.sent();
                    res.status(201).json({
                        'message': 'تم إنشاء الرخصة بنجاح',
                        'license': newLicense
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    logger_1.log.error('Error creating license', {
                        'error': error_5 instanceof Error ? error_5.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في إنشاء الرخصة' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 6: Document upload with validation
    app.post('/api/v1/documents', validateInput_1.validateInput.sanitize, validateInput_1.validateInput.body(documentUploadSchema), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var documentData, newDocument, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    documentData = req.body;
                    logger_1.log.info('Uploading document', { 'documentData': documentData });
                    return [4 /*yield*/, storage_1.storage.createDocument(documentData)];
                case 1:
                    newDocument = _a.sent();
                    res.status(201).json({
                        'message': 'تم رفع المستند بنجاح',
                        'document': newDocument
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    logger_1.log.error('Error uploading document', {
                        'error': error_6 instanceof Error ? error_6.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في رفع المستند' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 7: Leave request with validation
    app.post('/api/leaves', validateInput_1.validateInput.sanitize, validateInput_1.validateInput.body(leaveRequestSchema), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var leaveData, newLeave, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    leaveData = req.body;
                    logger_1.log.info('Creating leave request', { 'leaveData': leaveData });
                    return [4 /*yield*/, storage_1.storage.createLeave(leaveData)];
                case 1:
                    newLeave = _a.sent();
                    res.status(201).json({
                        'message': 'تم تقديم طلب الإجازة بنجاح',
                        'leave': newLeave
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    logger_1.log.error('Error creating leave request', {
                        'error': error_7 instanceof Error ? error_7.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في تقديم طلب الإجازة' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 8: Multiple validation sources
    app.put('/api/employees/:id/status', validateInput_1.validateInput.multiple({
        'params': zod_1.z.object({ 'id': zod_1.z.string().min(1, 'معرف الموظف مطلوب') }),
        'body': zod_1.z.object({
            'status': zod_1.z.enum(['active', 'inactive', 'on_leave', 'terminated', 'archived']),
            'reason': zod_1.z.string().min(10, 'سبب التغيير يجب أن يكون على الأقل 10 أحرف').max(500, 'سبب التغيير طويل جداً')
        })
    }), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, _a, status_2, reason, updatedEmployee, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    _a = req.body, status_2 = _a.status, reason = _a.reason;
                    // Ensure id is not undefined
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'معرف الموظف مطلوب' })];
                    }
                    logger_1.log.info('Updating employee status', { id: id, status: status_2, reason: reason });
                    return [4 /*yield*/, storage_1.storage.updateEmployee(id, { status: status_2 })];
                case 1:
                    updatedEmployee = _b.sent();
                    res.json({
                        'message': 'تم تحديث حالة الموظف بنجاح',
                        'employee': updatedEmployee
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    logger_1.log.error('Error updating employee status', {
                        'error': error_8 instanceof Error ? error_8.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في تحديث حالة الموظف' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 9: Search with query validation
    app.get('/api/companies/search', validateInput_1.validateInput.query(companySearchSchema), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, name_1, industryType, location_1, isActive, page, limit, companies, error_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query, name_1 = _a.name, industryType = _a.industryType, location_1 = _a.location, isActive = _a.isActive, page = _a.page, limit = _a.limit;
                    logger_1.log.info('Searching companies', { name: name_1, industryType: industryType, location: location_1, isActive: isActive, page: page, limit: limit });
                    return [4 /*yield*/, storage_1.storage.getAllCompanies()];
                case 1:
                    companies = _b.sent();
                    res.json({
                        companies: companies,
                        'pagination': {
                            'page': Number(page) || 1,
                            'limit': Number(limit) || 20,
                            'total': companies.length
                        }
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _b.sent();
                    logger_1.log.error('Error searching companies', {
                        'error': error_9 instanceof Error ? error_9.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في البحث عن الشركات' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Example 10: License search with validation
    app.get('/api/licenses/search', validateInput_1.validateInput.query(licenseSearchSchema), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, type, status_3, companyId, page, limit, licenses, _b, error_10;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    _a = req.query, type = _a.type, status_3 = _a.status, companyId = _a.companyId, page = _a.page, limit = _a.limit;
                    logger_1.log.info('Searching licenses', { type: type, status: status_3, companyId: companyId, page: page, limit: limit });
                    if (!companyId) return [3 /*break*/, 2];
                    return [4 /*yield*/, storage_1.storage.getCompanyLicenses(companyId)];
                case 1:
                    _b = _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _b = [];
                    _c.label = 3;
                case 3:
                    licenses = _b;
                    res.json({
                        licenses: licenses,
                        'pagination': {
                            'page': Number(page) || 1,
                            'limit': Number(limit) || 20,
                            'total': licenses.length
                        }
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_10 = _c.sent();
                    logger_1.log.error('Error searching licenses', {
                        'error': error_10 instanceof Error ? error_10.message : 'Unknown error'
                    });
                    res.status(500).json({ 'message': 'فشل في البحث عن الرخص' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
}
