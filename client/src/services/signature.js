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
exports.getSignatureStats = exports.verifySignature = exports.convertSignatureToPDF = exports.uploadSignatureToCloud = exports.getAllSignatures = exports.getSignaturesByEntity = exports.getSignature = exports.deleteSignature = exports.updateSignature = exports.createSignature = void 0;
/* eslint-env browser */
var apiRequest_1 = require("../lib/apiRequest");
// Create a new signature
var createSignature = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, apiRequest_1.apiRequest)('/api/signatures', {
                'method': 'POST',
                'body': JSON.stringify(data)
            })];
    });
}); };
exports.createSignature = createSignature;
// Update an existing signature
var updateSignature = function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/signatures/".concat(id), {
                'method': 'PUT',
                'body': JSON.stringify(data)
            })];
    });
}); };
exports.updateSignature = updateSignature;
// Delete a signature
var deleteSignature = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/signatures/".concat(id), {
                'method': 'DELETE'
            })];
    });
}); };
exports.deleteSignature = deleteSignature;
// Get a signature by ID
var getSignature = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/signatures/".concat(id))];
    });
}); };
exports.getSignature = getSignature;
// Get signatures for a specific entity
var getSignaturesByEntity = function (entityId, entityType) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/signatures/entity/".concat(entityId, "?type=").concat(entityType))];
    });
}); };
exports.getSignaturesByEntity = getSignaturesByEntity;
// Get all signatures
var getAllSignatures = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, apiRequest_1.apiRequest)('/api/signatures')];
    });
}); };
exports.getAllSignatures = getAllSignatures;
// Upload signature to cloud storage (e.g., AWS S3)
var uploadSignatureToCloud = function (imageData, fileName) { return __awaiter(void 0, void 0, void 0, function () {
    var base64Response, blob, formData, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(imageData)];
            case 1:
                base64Response = _a.sent();
                return [4 /*yield*/, base64Response.blob()];
            case 2:
                blob = _a.sent();
                formData = new globalThis.FormData();
                formData.append('file', blob, fileName);
                formData.append('type', 'signature');
                return [4 /*yield*/, (0, apiRequest_1.apiRequest)('/api/upload/signature', {
                        'method': 'POST',
                        'body': formData
                    })];
            case 3:
                response = _a.sent();
                return [2 /*return*/, response.url];
        }
    });
}); };
exports.uploadSignatureToCloud = uploadSignatureToCloud;
// Convert signature to PDF
var convertSignatureToPDF = function (signatureId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, apiRequest_1.apiRequest)("/api/signatures/".concat(signatureId, "/pdf"), {
                    'method': 'GET',
                    'responseType': 'blob'
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
exports.convertSignatureToPDF = convertSignatureToPDF;
// Verify the signature
var verifySignature = function (signatureId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, apiRequest_1.apiRequest)("/api/signatures/".concat(signatureId, "/verify"), {
                'method': 'POST'
            })];
    });
}); };
exports.verifySignature = verifySignature;
// Signature statistics
var getSignatureStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, (0, apiRequest_1.apiRequest)('/api/signatures/stats')];
    });
}); };
exports.getSignatureStats = getSignatureStats;
