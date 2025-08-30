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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDocumentRoutes = registerDocumentRoutes;
var multer_1 = __importDefault(require("multer"));
var storage_1 = require("../../models/storage");
var schema_1 = require("@shared/schema");
var logger_1 = require("../../utils/logger");
var auth_1 = require("../../middleware/auth");
var secureStorage_1 = require("../../utils/secureStorage");
var etag_1 = require("../../utils/etag");
var file_type_1 = require("file-type");
var antivirus_1 = require("../../utils/antivirus");
var api_versioning_1 = require("../../middleware/api-versioning");
// File upload configuration with security measures
var DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
function getMaxFileSize() {
    var fromEnv = Number(process.env.UPLOAD_MAX_BYTES);
    return Number.isFinite(fromEnv) && fromEnv > 0 ? fromEnv : DEFAULT_MAX_FILE_SIZE;
}
var EXTENSION_TO_MIME = {
    pdf: 'application/pdf',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};
var ALLOWED_EXTENSIONS = Object.keys(EXTENSION_TO_MIME);
var ALLOWED_MIME_TYPES = new Set(Object.values(EXTENSION_TO_MIME));
// Configure multer with memory storage for security
var upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: getMaxFileSize(),
        files: 1, // Only allow one file at a time
        fieldSize: 1024 * 1024 // 1MB for text fields
    },
    fileFilter: function (req, file, cb) {
        var _a;
        // Check file extension
        var fileExtension = (_a = file.originalname.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (!fileExtension || !ALLOWED_EXTENSIONS.includes(fileExtension)) {
            return cb(new Error("File type not allowed. Allowed types: ".concat(ALLOWED_EXTENSIONS.join(', '))));
        }
        // Check MIME type
        if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
            return cb(new Error("MIME type not allowed. Allowed types: ".concat(Array.from(ALLOWED_MIME_TYPES).join(', '))));
        }
        cb(null, true);
    }
});
// File validation middleware
var validateFile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errorResponse, file, maxFileSize, errorResponse, detectedType, fileExtension, errorResponse, sanitizedFilename, error_1, errorResponse;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                if (!req.file) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'No file uploaded', { field: 'file', message: 'Please select a file to upload' }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                file = req.file;
                maxFileSize = getMaxFileSize();
                if (file.size > maxFileSize) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'File too large', {
                        field: 'file',
                        message: "File size must be less than ".concat(maxFileSize / (1024 * 1024), "MB"),
                        maxSize: maxFileSize,
                        actualSize: file.size
                    }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, (0, file_type_1.fileTypeFromBuffer)(file.buffer)];
            case 1:
                detectedType = _c.sent();
                fileExtension = (_a = file.originalname.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                if (!detectedType ||
                    !fileExtension ||
                    !ALLOWED_MIME_TYPES.has(detectedType.mime) ||
                    EXTENSION_TO_MIME[fileExtension] !== detectedType.mime) {
                    logger_1.log.warn('Invalid MIME type detected', {
                        fileName: file.originalname,
                        declaredMime: file.mimetype,
                        detectedMime: detectedType === null || detectedType === void 0 ? void 0 : detectedType.mime,
                        size: file.size,
                        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
                    }, 'SECURITY');
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid file format', {
                        field: 'file',
                        message: 'File content does not match the declared format'
                    }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                // Use detected MIME type for further processing
                file.mimetype = detectedType.mime;
                sanitizedFilename = sanitizeFilename(file.originalname);
                req.file.originalname = sanitizedFilename;
                next();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                logger_1.log.error('File validation error:', error_1, 'SECURITY');
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'File validation failed', { message: 'Unable to validate uploaded file' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Sanitize filename for security
function sanitizeFilename(filename) {
    // Remove path traversal attempts
    var sanitized = filename.replace(/\.\./g, '');
    // Remove or replace dangerous characters
    sanitized = sanitized.replace(/[<>:"/\\|?*]/g, '_');
    // Limit length
    if (sanitized.length > 255) {
        var extension = sanitized.split('.').pop();
        var name_1 = sanitized.substring(0, 255 - ((extension === null || extension === void 0 ? void 0 : extension.length) || 0) - 1);
        sanitized = "".concat(name_1, ".").concat(extension);
    }
    return sanitized;
}
// Generate secure file ID
function _generateFileId() {
    var timestamp = Date.now().toString(36);
    var random = Math.random().toString(36).substring(2, 15);
    return "file_".concat(timestamp, "_").concat(random);
}
// Verify signed URL signature
function registerDocumentRoutes(app) {
    var _this = this;
    // Get all documents with pagination
    app.get('/api/v1/documents', auth_1.isAuthenticated, api_versioning_1.paginationMiddleware, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, companyId_1, employeeId_1, licenseId_1, category_1, _b, page, pageSize, allDocuments, filteredDocuments, total, startIndex, endIndex, paginatedDocuments, response, errorResponse;
        return __generator(this, function (_c) {
            try {
                _a = req.query, companyId_1 = _a.companyId, employeeId_1 = _a.employeeId, licenseId_1 = _a.licenseId, category_1 = _a.category;
                _b = (0, api_versioning_1.extractPaginationParams)(req), page = _b.page, pageSize = _b.pageSize;
                allDocuments = [
                    {
                        'id': '1',
                        'name': 'ترخيص النيل الازرق الرئيسي مباركية.pdf',
                        'fileName': 'nile-blue-main-license-mubarkiya.pdf',
                        'type': 'application/pdf',
                        'category': 'licenses',
                        'size': '2.1 MB',
                        'sizeBytes': 2201440,
                        'uploadedBy': 'إدارة التراخيص',
                        'uploadedByUser': {
                            'id': 'admin-1',
                            'name': 'مدير التراخيص',
                            'email': 'licenses@company.com'
                        },
                        'uploadDate': '2024-12-15T10:30:00Z',
                        'modifiedDate': '2025-01-10T14:22:00Z',
                        'status': 'active',
                        'description': 'ترخيص تجاري رئيسي لشركة النيل الأزرق في المباركية',
                        'tags': ['ترخيص', 'النيل الأزرق', 'مباركية', 'رئيسي'],
                        'downloadCount': 23,
                        'isPublic': false,
                        'companyId': 'company-1',
                        'employeeId': null,
                        'licenseId': 'license-1',
                        'url': '/demo-data/ترخيص النيل الازرق الرئيسي مباركية.pdf',
                        'thumbnailUrl': '/api/v1/documents/1/thumbnail'
                    },
                    // ... more documents would be here in real implementation
                ];
                filteredDocuments = allDocuments;
                if (companyId_1) {
                    filteredDocuments = filteredDocuments.filter(function (doc) { return doc.companyId === companyId_1; });
                }
                if (employeeId_1) {
                    filteredDocuments = filteredDocuments.filter(function (doc) { return doc.employeeId === employeeId_1; });
                }
                if (licenseId_1) {
                    filteredDocuments = filteredDocuments.filter(function (doc) { return doc.licenseId === licenseId_1; });
                }
                if (category_1) {
                    filteredDocuments = filteredDocuments.filter(function (doc) { return doc.category === category_1; });
                }
                total = filteredDocuments.length;
                startIndex = (page - 1) * pageSize;
                endIndex = startIndex + pageSize;
                paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);
                response = (0, api_versioning_1.createPaginatedResponse)(req, paginatedDocuments, total, page, pageSize, 'Documents retrieved successfully');
                res.json(response);
            }
            catch (error) {
                logger_1.log.error('Error fetching documents:', error);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch documents', { message: 'An error occurred while retrieving documents' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
            }
            return [2 /*return*/];
        });
    }); });
    // Create new document
    app.post('/api/v1/documents', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var documentData, result, errorResponse, document_1, response, error_2, errorResponse;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    documentData = __assign(__assign({}, req.body), { 'uploadedBy': (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub, 'uploadDate': new Date(), 'status': 'active', 'downloadCount': 0 });
                    result = schema_1.insertDocumentSchema.safeParse(documentData);
                    if (!result.success) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid document data', {
                            details: result.error.issues,
                            message: 'Document data validation failed'
                        }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.createDocument(result.data)];
                case 1:
                    document_1 = _b.sent();
                    response = (0, api_versioning_1.createSuccessResponse)(document_1, 'Document created successfully');
                    res.status(201).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    logger_1.log.error('Error creating document:', error_2);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to create document', { message: 'An error occurred while creating the document' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get document by ID
    app.get('/api/v1/documents/:id', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, document_2, errorResponse, etag, response, error_3, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Document ID is required', { field: 'id', message: 'Document ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.getDocument(id)];
                case 1:
                    document_2 = _a.sent();
                    if (!document_2) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('NOT_FOUND', 'Document not found', { resource: 'document', id: id }, 404);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    etag = (0, etag_1.generateETag)(document_2);
                    (0, etag_1.setETagHeader)(res, etag);
                    response = (0, api_versioning_1.createSuccessResponse)(document_2, 'Document retrieved successfully');
                    res.json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    logger_1.log.error('Error fetching document:', error_3);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch document', { message: 'An error occurred while retrieving the document' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Update document
    app.put('/api/v1/documents/:id', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, ifMatch, current, errorResponse, currentEtag, precond, updateData, document_3, newEtag, response, error_4, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Document ID is required', { field: 'id', message: 'Document ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    ifMatch = req.headers['if-match'];
                    return [4 /*yield*/, storage_1.storage.getDocument(id)];
                case 1:
                    current = _a.sent();
                    if (!current) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('NOT_FOUND', 'Document not found', { resource: 'document', id: id }, 404);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    currentEtag = (0, etag_1.generateETag)(current);
                    if (!(0, etag_1.matchesIfMatchHeader)(ifMatch, currentEtag)) {
                        precond = (0, api_versioning_1.createErrorResponse)('PRECONDITION_FAILED', 'ETag mismatch. Resource was modified by another request.', { expected: currentEtag }, 412);
                        return [2 /*return*/, res.status(precond.statusCode).json(precond.body)];
                    }
                    updateData = __assign(__assign({}, req.body), { 'modifiedDate': new Date() });
                    return [4 /*yield*/, storage_1.storage.updateDocument(id, updateData)];
                case 2:
                    document_3 = _a.sent();
                    newEtag = (0, etag_1.generateETag)(document_3);
                    (0, etag_1.setETagHeader)(res, newEtag);
                    response = (0, api_versioning_1.createSuccessResponse)(document_3, 'Document updated successfully');
                    res.json(response);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    logger_1.log.error('Error updating document:', error_4);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to update document', { message: 'An error occurred while updating the document' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Delete document
    app.delete('/api/v1/documents/:id', auth_1.isAuthenticated, (0, auth_1.requireRole)(['super_admin', 'company_manager']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, response, error_5, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Document ID is required', { field: 'id', message: 'Document ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.deleteDocument(id)];
                case 1:
                    _a.sent();
                    response = (0, api_versioning_1.createSuccessResponse)({ id: id }, 'Document deleted successfully');
                    res.json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    logger_1.log.error('Error deleting document:', error_5);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to delete document', { message: 'An error occurred while deleting the document' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Download document
    app.get('/api/v1/documents/:id/download', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, errorResponse, document_4, errorResponse, signedUrl, downloadData, response, error_6, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = req.params.id;
                    if (!id) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Document ID is required', { field: 'id', message: 'Document ID parameter is missing' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, storage_1.storage.getDocument(id)];
                case 1:
                    document_4 = _a.sent();
                    if (!document_4) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('NOT_FOUND', 'Document not found', { resource: 'document', id: id }, 404);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, secureStorage_1.secureFileStorage.generateSignedUrl(id, document_4.fileName)];
                case 2:
                    signedUrl = _a.sent();
                    downloadData = {
                        message: 'Document ready for download',
                        documentId: id,
                        fileName: document_4.name,
                        downloadUrl: signedUrl,
                        expiresAt: new Date(Date.now() + secureStorage_1.secureFileStorage.getStatus().urlExpiration * 1000)
                    };
                    response = (0, api_versioning_1.createSuccessResponse)(downloadData, 'Download link generated successfully');
                    res.json(response);
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    logger_1.log.error('Error downloading document:', error_6);
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to download document', { message: 'An error occurred while generating download link' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Secure file upload endpoint
    app.post('/api/v1/documents/upload', auth_1.isAuthenticated, upload.single('file'), validateFile, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var errorResponse, file, scanResult, _a, errorResponse, storedFile, documentData, document_5, uploadResponse, response, error_7, errorResponse;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, , 8]);
                    if (!req.file) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'No file uploaded', { field: 'file', message: 'Please select a file to upload' }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    file = req.file;
                    scanResult = void 0;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, antivirus_1.antivirusScanner.scanBuffer(file.buffer, file.originalname)];
                case 2:
                    scanResult = _e.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _e.sent();
                    return [2 /*return*/, res.status(503).json({ error: 'Upload rejected: antivirus unavailable' })];
                case 4:
                    if (!scanResult.isClean) {
                        logger_1.log.warn('Antivirus scan rejected file', {
                            fileName: file.originalname,
                            threats: scanResult.threats,
                            provider: scanResult.provider
                        }, 'SECURITY');
                        errorResponse = (0, api_versioning_1.createErrorResponse)('SECURITY_ERROR', 'File failed security scan', { threats: scanResult.threats }, 400);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                    return [4 /*yield*/, secureStorage_1.secureFileStorage.storeFile(file.buffer, file.originalname, file.mimetype, ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) || 'unknown')];
                case 5:
                    storedFile = _e.sent();
                    documentData = {
                        name: file.originalname,
                        entityId: req.body.companyId || 'default',
                        entityType: 'company',
                        type: file.mimetype,
                        fileName: storedFile.id,
                        fileUrl: storedFile.url,
                        uploadedBy: ((_c = req.user) === null || _c === void 0 ? void 0 : _c.sub) || 'unknown',
                        fileSize: storedFile.metadata.size,
                        mimeType: storedFile.metadata.mimeType,
                        description: req.body.description || null,
                        checksum: storedFile.metadata.checksum,
                        isImage: storedFile.metadata.isImage,
                        imageMetadata: storedFile.metadata.imageMetadata
                    };
                    return [4 /*yield*/, storage_1.storage.createDocument(documentData)];
                case 6:
                    document_5 = _e.sent();
                    // Log successful upload for audit
                    logger_1.log.info('File uploaded and stored securely', {
                        fileId: storedFile.id,
                        fileName: file.originalname,
                        fileSize: file.size,
                        mimeType: file.mimetype,
                        uploadedBy: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id,
                        storage: {
                            provider: secureStorage_1.secureFileStorage.getStatus().provider,
                            urlExpiration: secureStorage_1.secureFileStorage.getStatus().urlExpiration
                        },
                        timestamp: new Date().toISOString()
                    }, 'UPLOAD');
                    uploadResponse = {
                        message: 'File uploaded successfully',
                        document: {
                            id: document_5.id,
                            name: document_5.name,
                            fileName: document_5.fileName,
                            type: document_5.type,
                            size: document_5.fileSize,
                            url: document_5.fileUrl,
                            expiresAt: storedFile.expiresAt
                        },
                        security: {
                            validated: true,
                            fileSignature: 'verified',
                            mimeType: 'verified',
                            sizeLimit: 'within_bounds',
                            storage: {
                                provider: secureStorage_1.secureFileStorage.getStatus().provider,
                                encrypted: true,
                                urlExpiration: secureStorage_1.secureFileStorage.getStatus().urlExpiration
                            }
                        }
                    };
                    response = (0, api_versioning_1.createSuccessResponse)(uploadResponse, 'File uploaded successfully');
                    res.status(201).json(response);
                    return [3 /*break*/, 8];
                case 7:
                    error_7 = _e.sent();
                    logger_1.log.error('Error uploading file:', error_7, 'UPLOAD');
                    errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Upload failed', { message: 'Failed to process uploaded file' }, 500);
                    res.status(errorResponse.statusCode).json(errorResponse.body);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    // Document categories
    app.get('/api/v1/documents/categories', auth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var categories, response, errorResponse;
        return __generator(this, function (_a) {
            try {
                categories = [
                    { 'id': 'licenses', 'name': 'التراخيص التجارية', 'icon': 'Award', 'count': 18 },
                    { 'id': 'employees', 'name': 'قوائم الموظفين', 'icon': 'Users', 'count': 12 },
                    { 'id': 'import_docs', 'name': 'وثائق الاستيراد', 'icon': 'FileText', 'count': 8 },
                    { 'id': 'authorizations', 'name': 'الاعتمادات الرسمية', 'icon': 'FileContract', 'count': 15 },
                    { 'id': 'establishment', 'name': 'عقود التأسيس', 'icon': 'Building2', 'count': 9 },
                    { 'id': 'delegation', 'name': 'كتب التفويض', 'icon': 'FileDown', 'count': 6 },
                    { 'id': 'applications', 'name': 'طلبات رسمية', 'icon': 'FormInput', 'count': 11 },
                    { 'id': 'identity_docs', 'name': 'وثائق الهوية', 'icon': 'Medal', 'count': 7 },
                    { 'id': 'reports', 'name': 'التقارير', 'icon': 'BarChart', 'count': 4 },
                    { 'id': 'other', 'name': 'أخرى', 'icon': 'Folder', 'count': 3 }
                ];
                response = (0, api_versioning_1.createSuccessResponse)(categories, 'Document categories retrieved successfully');
                res.json(response);
            }
            catch (error) {
                logger_1.log.error('Error fetching document categories:', error);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch document categories', { message: 'An error occurred while retrieving document categories' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
            }
            return [2 /*return*/];
        });
    }); });
    // Security status endpoint
    app.get('/api/v1/security/status', auth_1.isAuthenticated, (0, auth_1.requireRole)(['admin', 'super_admin']), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var antivirusStatus, storageStatus, securityData, response, errorResponse;
        return __generator(this, function (_a) {
            try {
                antivirusStatus = antivirus_1.antivirusScanner.getStatus();
                storageStatus = secureStorage_1.secureFileStorage.getStatus();
                securityData = {
                    antivirus: antivirusStatus,
                    storage: storageStatus,
                    uploadLimits: {
                        maxFileSize: getMaxFileSize(),
                        allowedMimeTypes: ALLOWED_MIME_TYPES,
                        allowedExtensions: ALLOWED_EXTENSIONS
                    },
                    securityFeatures: {
                        fileSignatureValidation: true,
                        antivirusScanning: antivirusStatus.enabled,
                        secureStorage: true,
                        signedUrls: true,
                        metadataStripping: true,
                        eicarDetection: true
                    }
                };
                response = (0, api_versioning_1.createSuccessResponse)(securityData, 'Security status retrieved successfully');
                res.json(response);
            }
            catch (error) {
                logger_1.log.error('Error getting security status:', error, 'SECURITY');
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to get security status', { message: 'Unable to retrieve security configuration' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
            }
            return [2 /*return*/];
        });
    }); });
    // Error handling for multer
    app.use(function (error, req, res, next) {
        if (error instanceof multer_1.default.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                var errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'File too large', {
                    field: 'file',
                    message: "File size must be less than ".concat(getMaxFileSize() / (1024 * 1024), "MB"),
                    maxSize: getMaxFileSize()
                }, 400);
                return res.status(errorResponse.statusCode).json(errorResponse.body);
            }
            if (error.code === 'LIMIT_FILE_COUNT') {
                var errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Too many files', {
                    field: 'file',
                    message: 'Only one file can be uploaded at a time'
                }, 400);
                return res.status(errorResponse.statusCode).json(errorResponse.body);
            }
            if (error.code === 'LIMIT_FIELD_COUNT') {
                var errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Too many fields', { message: 'Too many form fields' }, 400);
                return res.status(errorResponse.statusCode).json(errorResponse.body);
            }
        }
        if (error.message) {
            var errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Upload error', { message: error.message }, 400);
            return res.status(errorResponse.statusCode).json(errorResponse.body);
        }
        next(error);
    });
}
