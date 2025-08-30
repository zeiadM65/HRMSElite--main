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
exports.documentService = void 0;
/* eslint-env browser */
/* global FormData, URLSearchParams */
var apiRequest_1 = require("../lib/apiRequest");
exports.documentService = {
    // Get all documents with filters
    getDocuments: function () {
        return __awaiter(this, arguments, void 0, function (filters) {
            var params;
            if (filters === void 0) { filters = {}; }
            return __generator(this, function (_a) {
                params = new URLSearchParams();
                Object.entries(filters).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (value) {
                        params.append(key, value);
                    }
                });
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/v1/documents?".concat(params.toString()))];
            });
        });
    },
    // Get document by ID
    getDocument: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/v1/documents/".concat(id))];
            });
        });
    },
    // Create new document
    createDocument: function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            return __generator(this, function (_a) {
                formData = new FormData();
                formData.append('name', data.name);
                formData.append('category', data.category);
                if (data.description) {
                    formData.append('description', data.description);
                }
                if (data.tags) {
                    formData.append('tags', JSON.stringify(data.tags));
                }
                if (data.entityId) {
                    formData.append('entityId', data.entityId);
                }
                if (data.entityType) {
                    formData.append('entityType', data.entityType);
                }
                formData.append('file', data.file);
                return [2 /*return*/, (0, apiRequest_1.apiRequest)('/api/v1/documents', {
                        'method': 'POST',
                        'body': formData,
                        'headers': {
                        // Don't set Content-Type for FormData
                        }
                    })];
            });
        });
    },
    // Update document
    updateDocument: function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/v1/documents/".concat(id), {
                        'method': 'PUT',
                        'body': JSON.stringify(data),
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    })];
            });
        });
    },
    // Delete document
    deleteDocument: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/v1/documents/".concat(id), {
                        'method': 'DELETE'
                    })];
            });
        });
    },
    // Download document
    downloadDocument: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/v1/documents/".concat(id, "/download"), {
                        'method': 'GET',
                        'responseType': 'blob'
                    })];
            });
        });
    },
    // Get document categories
    getCategories: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)('/api/v1/documents/categories')];
            });
        });
    },
    // Upload file
    uploadFile: function (file, onProgress) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        formData.append('file', file);
                        if (onProgress) {
                            onProgress(0);
                        }
                        return [4 /*yield*/, (0, apiRequest_1.apiRequest)('/api/v1/documents/upload', {
                                'method': 'POST',
                                'body': formData
                            })];
                    case 1:
                        result = _a.sent();
                        if (onProgress) {
                            onProgress(100);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    }
};
