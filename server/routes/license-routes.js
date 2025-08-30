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
exports.registerLicenseRoutes = registerLicenseRoutes;
var db_1 = require("../models/db");
var schema_1 = require("@shared/schema");
var drizzle_orm_1 = require("drizzle-orm");
var schema_2 = require("@shared/schema");
var logger_1 = require("../utils/logger");
var auth_1 = require("../middleware/auth");
var etag_1 = require("../utils/etag");
function registerLicenseRoutes(app) {
    var _this = this;
    // Get all licenses with company details
    app.get('/api/licenses', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, companyId, status_1, type, search, conditions, results, licensesWithEmployees, error_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.query, companyId = _a.companyId, status_1 = _a.status, type = _a.type, search = _a.search;
                    conditions = [];
                    if (companyId) {
                        conditions.push((0, drizzle_orm_1.eq)(schema_1.licenses.companyId, companyId));
                    }
                    if (status_1) {
                        conditions.push((0, drizzle_orm_1.eq)(schema_1.licenses.status, status_1));
                    }
                    if (type) {
                        conditions.push((0, drizzle_orm_1.eq)(schema_1.licenses.type, type));
                    }
                    if (search) {
                        conditions.push((0, drizzle_orm_1.and)((0, drizzle_orm_1.like)(schema_1.licenses.name, "%".concat(search, "%")), (0, drizzle_orm_1.like)(schema_1.licenses.number, "%".concat(search, "%"))));
                    }
                    return [4 /*yield*/, db_1.db
                            .select({
                            'id': schema_1.licenses.id,
                            'companyId': schema_1.licenses.companyId,
                            'name': schema_1.licenses.name,
                            'type': schema_1.licenses.type,
                            'number': schema_1.licenses.number,
                            'status': schema_1.licenses.status,
                            'issueDate': schema_1.licenses.issueDate,
                            'expiryDate': schema_1.licenses.expiryDate,
                            'issuingAuthority': schema_1.licenses.issuingAuthority,
                            'location': schema_1.licenses.location,
                            'description': schema_1.licenses.description,
                            'isActive': schema_1.licenses.isActive,
                            'createdAt': schema_1.licenses.createdAt,
                            'updatedAt': schema_1.licenses.updatedAt,
                            'company': {
                                'id': schema_1.companies.id,
                                'name': schema_1.companies.name,
                                'commercialFileNumber': schema_1.companies.commercialRegistrationNumber
                            }
                        })
                            .from(schema_1.licenses)
                            .leftJoin(schema_1.companies, (0, drizzle_orm_1.eq)(schema_1.licenses.companyId, schema_1.companies.id))
                            .where(conditions.length > 0 ? drizzle_orm_1.and.apply(void 0, conditions) : undefined)
                            .orderBy((0, drizzle_orm_1.desc)(schema_1.licenses.createdAt))];
                case 1:
                    results = _b.sent();
                    return [4 /*yield*/, Promise.all(results.map(function (license) { return __awaiter(_this, void 0, void 0, function () {
                            var employeeCount;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db_1.db
                                            .select({ 'count': schema_1.employees.id })
                                            .from(schema_1.employees)
                                            .where((0, drizzle_orm_1.eq)(schema_1.employees.licenseId, license.id))
                                            .then(function (rows) { return rows.length; })];
                                    case 1:
                                        employeeCount = _a.sent();
                                        return [2 /*return*/, __assign(__assign({}, license), { employeeCount: employeeCount })];
                                }
                            });
                        }); }))];
                case 2:
                    licensesWithEmployees = _b.sent();
                    res.json(licensesWithEmployees);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    logger_1.log.error('Error fetching licenses:', error_1 instanceof Error ? error_1 : { error: error_1 });
                    res.status(500).json({ 'message': 'Failed to fetch licenses' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Get license by ID
    app.get('/api/licenses/:id', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, license, licenseEmployees, result, etag, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'License ID is required' })];
                    }
                    return [4 /*yield*/, db_1.db
                            .select({
                            'id': schema_1.licenses.id,
                            'companyId': schema_1.licenses.companyId,
                            'name': schema_1.licenses.name,
                            'type': schema_1.licenses.type,
                            'number': schema_1.licenses.number,
                            'status': schema_1.licenses.status,
                            'issueDate': schema_1.licenses.issueDate,
                            'expiryDate': schema_1.licenses.expiryDate,
                            'issuingAuthority': schema_1.licenses.issuingAuthority,
                            'location': schema_1.licenses.location,
                            'description': schema_1.licenses.description,
                            'isActive': schema_1.licenses.isActive,
                            'createdAt': schema_1.licenses.createdAt,
                            'updatedAt': schema_1.licenses.updatedAt,
                            'company': {
                                'id': schema_1.companies.id,
                                'name': schema_1.companies.name,
                                'commercialFileNumber': schema_1.companies.commercialRegistrationNumber
                            }
                        })
                            .from(schema_1.licenses)
                            .leftJoin(schema_1.companies, (0, drizzle_orm_1.eq)(schema_1.licenses.companyId, schema_1.companies.id))
                            .where((0, drizzle_orm_1.eq)(schema_1.licenses.id, id))
                            .limit(1)];
                case 1:
                    license = _a.sent();
                    if (license.length === 0) {
                        return [2 /*return*/, res.status(404).json({ 'message': 'License not found' })];
                    }
                    return [4 /*yield*/, db_1.db
                            .select({
                            'id': schema_1.employees.id,
                            'firstName': schema_1.employees.firstName,
                            'lastName': schema_1.employees.lastName,
                            'position': schema_1.employees.position,
                            'department': schema_1.employees.department
                        })
                            .from(schema_1.employees)
                            .where((0, drizzle_orm_1.eq)(schema_1.employees.licenseId, id))];
                case 2:
                    licenseEmployees = _a.sent();
                    result = __assign(__assign({}, license[0]), { 'employees': licenseEmployees });
                    etag = (0, etag_1.generateETag)(result);
                    (0, etag_1.setETagHeader)(res, etag);
                    res.json(result);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    logger_1.log.error('Error fetching license:', error_2 instanceof Error ? error_2 : { error: error_2 });
                    res.status(500).json({ 'message': 'Failed to fetch license' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Create new license
    app.post('/api/licenses', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var licenseData, result, newLicense, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    licenseData = __assign(__assign({}, req.body), { 'createdAt': new Date(), 'updatedAt': new Date() });
                    result = schema_2.insertLicenseSchema.safeParse(licenseData);
                    if (!result.success) {
                        return [2 /*return*/, res.status(400).json({
                                'message': 'Invalid license data',
                                'errors': result.error.issues
                            })];
                    }
                    return [4 /*yield*/, db_1.db
                            .insert(schema_1.licenses)
                            .values(result.data)
                            .returning()];
                case 1:
                    newLicense = (_a.sent())[0];
                    res.status(201).json(newLicense);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    logger_1.log.error('Error creating license:', error_3 instanceof Error ? error_3 : { error: error_3 });
                    res.status(500).json({ 'message': 'Failed to create license' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Update license
    app.put('/api/licenses/:id', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, ifMatch, existing, currentEtag, updateData, updatedLicense, newEtag, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'License ID is required' })];
                    }
                    ifMatch = req.headers['if-match'];
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.licenses)
                            .where((0, drizzle_orm_1.eq)(schema_1.licenses.id, id))
                            .limit(1)];
                case 1:
                    existing = _a.sent();
                    if (existing.length === 0) {
                        return [2 /*return*/, res.status(404).json({ 'message': 'License not found' })];
                    }
                    currentEtag = (0, etag_1.generateETag)(existing[0]);
                    if (!(0, etag_1.matchesIfMatchHeader)(ifMatch, currentEtag)) {
                        return [2 /*return*/, res.status(412).json({ 'message': 'Precondition Failed: ETag mismatch' })];
                    }
                    updateData = __assign(__assign({}, req.body), { 'updatedAt': new Date() });
                    return [4 /*yield*/, db_1.db
                            .update(schema_1.licenses)
                            .set(updateData)
                            .where((0, drizzle_orm_1.eq)(schema_1.licenses.id, id))
                            .returning()];
                case 2:
                    updatedLicense = (_a.sent())[0];
                    if (!updatedLicense) {
                        return [2 /*return*/, res.status(404).json({ 'message': 'License not found' })];
                    }
                    newEtag = (0, etag_1.generateETag)(updatedLicense);
                    (0, etag_1.setETagHeader)(res, newEtag);
                    res.json(updatedLicense);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    logger_1.log.error('Error updating license:', error_4 instanceof Error ? error_4 : { error: error_4 });
                    res.status(500).json({ 'message': 'Failed to update license' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Delete license
    app.delete('/api/licenses/:id', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, deletedLicense, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'License ID is required' })];
                    }
                    return [4 /*yield*/, db_1.db
                            .delete(schema_1.licenses)
                            .where((0, drizzle_orm_1.eq)(schema_1.licenses.id, id))
                            .returning()];
                case 1:
                    deletedLicense = (_a.sent())[0];
                    if (!deletedLicense) {
                        return [2 /*return*/, res.status(404).json({ 'message': 'License not found' })];
                    }
                    res.json({ 'message': 'License deleted successfully' });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    logger_1.log.error('Error deleting license:', error_5 instanceof Error ? error_5 : { error: error_5 });
                    res.status(500).json({ 'message': 'Failed to delete license' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get licenses by company
    app.get('/api/companies/:companyId/licenses', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var companyId, companyLicenses, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    companyId = req.params.companyId;
                    if (!companyId) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Company ID is required' })];
                    }
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.licenses)
                            .where((0, drizzle_orm_1.eq)(schema_1.licenses.companyId, companyId))
                            .orderBy((0, drizzle_orm_1.desc)(schema_1.licenses.createdAt))];
                case 1:
                    companyLicenses = _a.sent();
                    res.json(companyLicenses);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    logger_1.log.error('Error fetching company licenses:', error_6 instanceof Error ? error_6 : { error: error_6 });
                    res.status(500).json({ 'message': 'Failed to fetch company licenses' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get license statistics
    app.get('/api/licenses/stats', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var allLicenses, stats, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.select().from(schema_1.licenses)];
                case 1:
                    allLicenses = _a.sent();
                    stats = {
                        'total': allLicenses.length,
                        'active': allLicenses.filter(function (l) { return l.status === 'active'; }).length,
                        'expired': allLicenses.filter(function (l) { return l.status === 'expired'; }).length,
                        'pending': allLicenses.filter(function (l) { return l.status === 'pending'; }).length,
                        'expiringSoon': allLicenses.filter(function (l) {
                            if (l.status !== 'active' || !l.expiryDate) {
                                return false;
                            }
                            var expiry = new Date(l.expiryDate);
                            var now = new Date();
                            var diffTime = expiry.getTime() - now.getTime();
                            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            return diffDays <= 30 && diffDays > 0;
                        }).length
                    };
                    res.json(stats);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    logger_1.log.error('Error fetching license stats:', error_7 instanceof Error ? error_7 : { error: error_7 });
                    res.status(500).json({ 'message': 'Failed to fetch license stats' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get license types
    app.get('/api/licenses/types', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var licenseTypes;
        return __generator(this, function (_a) {
            try {
                licenseTypes = [
                    { 'value': 'main', 'label': 'رئيسي', 'icon': 'Award' },
                    { 'value': 'branch', 'label': 'فرع', 'icon': 'Building2' },
                    { 'value': 'commercial', 'label': 'تجاري', 'icon': 'FileContract' },
                    { 'value': 'industrial', 'label': 'صناعي', 'icon': 'Building2' },
                    { 'value': 'professional', 'label': 'مهني', 'icon': 'Shield' },
                    { 'value': 'import_export', 'label': 'استيراد وتصدير', 'icon': 'TrendingUp' },
                    { 'value': 'tailoring', 'label': 'خياطة', 'icon': 'Users' },
                    { 'value': 'fabric', 'label': 'أقمشة', 'icon': 'FileText' },
                    { 'value': 'jewelry', 'label': 'مجوهرات', 'icon': 'Award' },
                    { 'value': 'restaurant', 'label': 'مطعم', 'icon': 'Building2' },
                    { 'value': 'service', 'label': 'خدمات', 'icon': 'Shield' }
                ];
                res.json(licenseTypes);
            }
            catch (error) {
                logger_1.log.error('Error fetching license types:', error instanceof Error ? error : { error: error });
                res.status(500).json({ 'message': 'Failed to fetch license types' });
            }
            return [2 /*return*/];
        });
    }); });
    // Bulk update license status
    app.patch('/api/licenses/bulk-status', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin',
        'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, licenseIds, status_2, updatedLicenses, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, licenseIds = _a.licenseIds, status_2 = _a.status;
                    if (!Array.isArray(licenseIds) || !status_2) {
                        return [2 /*return*/, res.status(400).json({ 'message': 'Invalid request data' })];
                    }
                    return [4 /*yield*/, db_1.db
                            .update(schema_1.licenses)
                            .set({
                            status: status_2,
                            'updatedAt': new Date()
                        })
                            .where((0, drizzle_orm_1.inArray)(schema_1.licenses.id, licenseIds))
                            .returning()];
                case 1:
                    updatedLicenses = _b.sent();
                    res.json({
                        'message': "Updated ".concat(updatedLicenses.length, " licenses"),
                        updatedLicenses: updatedLicenses
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    logger_1.log.error('Error bulk updating licenses:', error_8 instanceof Error ? error_8 : { error: error_8 });
                    res.status(500).json({ 'message': 'Failed to update licenses' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
