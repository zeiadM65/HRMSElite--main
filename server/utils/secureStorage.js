"use strict";
/**
 * @fileoverview Secure file storage utility with AWS S3 integration
 * @description Provides secure file storage with signed URLs, metadata stripping, and private access
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
exports.secureFileStorage = exports.defaultStorageConfig = exports.SecureFileStorage = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var sharp_1 = __importDefault(require("sharp"));
var logger_1 = require("./logger");
var node_crypto_1 = __importDefault(require("node:crypto"));
var env_1 = require("./env");
var SecureFileStorage = /** @class */ (function () {
    function SecureFileStorage(config) {
        this.s3Client = null;
        this.config = config;
        if (config.provider === 's3' || config.provider === 'hybrid') {
            this.initializeS3Client();
        }
    }
    /**
     * Initialize AWS S3 client
     */
    SecureFileStorage.prototype.initializeS3Client = function () {
        if (!this.config.s3AccessKeyId || !this.config.s3SecretAccessKey) {
            logger_1.log.error('AWS S3 credentials not provided; S3 operations disabled', {}, 'STORAGE');
            return;
        }
        this.s3Client = new client_s3_1.S3Client({
            region: this.config.s3Region,
            credentials: {
                accessKeyId: this.config.s3AccessKeyId,
                secretAccessKey: this.config.s3SecretAccessKey
            }
        });
        logger_1.log.info('AWS S3 client initialized', {
            region: this.config.s3Region,
            bucket: this.config.s3Bucket
        }, 'STORAGE');
    };
    /**
     * Generate a secure file ID
     * @returns string - Secure file ID
     */
    SecureFileStorage.prototype.generateFileId = function () {
        return node_crypto_1.default.randomBytes(16).toString('hex');
    };
    /**
     * Generate file checksum
     * @param buffer - File buffer
     * @returns string - SHA256 checksum
     */
    SecureFileStorage.prototype.generateChecksum = function (buffer) {
        return node_crypto_1.default.createHash('sha256').update(buffer).digest('hex');
    };
    /**
     * Check if file is an image
     * @param mimeType - File MIME type
     * @returns boolean - True if image
     */
    SecureFileStorage.prototype.isImage = function (mimeType) {
        return mimeType.startsWith('image/');
    };
    /**
     * Strip metadata from image and generate safe derivatives
     * @param buffer - Image buffer
     * @param mimeType - Image MIME type
     * @returns Promise<Buffer> - Processed image buffer
     */
    SecureFileStorage.prototype.processImage = function (buffer, mimeType) {
        return __awaiter(this, void 0, void 0, function () {
            var image, metadata, processedImage, processedBuffer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        image = (0, sharp_1.default)(buffer);
                        return [4 /*yield*/, image.metadata()];
                    case 1:
                        metadata = _a.sent();
                        processedImage = image
                            .removeMetadata()
                            .jpeg({ quality: 85, progressive: true })
                            .png({ progressive: true })
                            .webp({ quality: 85 });
                        return [4 /*yield*/, processedImage.toBuffer()];
                    case 2:
                        processedBuffer = _a.sent();
                        return [2 /*return*/, {
                                buffer: processedBuffer,
                                metadata: {
                                    width: metadata.width || 0,
                                    height: metadata.height || 0,
                                    format: metadata.format || 'unknown'
                                }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        logger_1.log.error('Image processing failed', error_1, 'STORAGE');
                        throw new Error('Failed to process image');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Store file securely
     * @param buffer - File buffer
     * @param originalName - Original filename
     * @param mimeType - File MIME type
     * @param uploadedBy - User ID who uploaded the file
     * @returns Promise<StoredFile> - Stored file information
     */
    SecureFileStorage.prototype.storeFile = function (buffer, originalName, mimeType, uploadedBy) {
        return __awaiter(this, void 0, void 0, function () {
            var fileId, checksum, isImage, processedBuffer, imageMetadata, processed, metadata, key, url, _a, s3Url, localUrl, expiresAt, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        // Validate file size
                        if (buffer.length > this.config.maxFileSize) {
                            throw new Error("File size ".concat(buffer.length, " exceeds limit ").concat(this.config.maxFileSize));
                        }
                        // Validate MIME type
                        if (!this.config.allowedMimeTypes.includes(mimeType)) {
                            throw new Error("MIME type ".concat(mimeType, " not allowed"));
                        }
                        fileId = this.generateFileId();
                        checksum = this.generateChecksum(buffer);
                        isImage = this.isImage(mimeType);
                        processedBuffer = buffer;
                        imageMetadata = void 0;
                        if (!isImage) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.processImage(buffer, mimeType)];
                    case 1:
                        processed = _b.sent();
                        processedBuffer = processed.buffer;
                        imageMetadata = processed.metadata;
                        _b.label = 2;
                    case 2:
                        metadata = {
                            originalName: originalName,
                            mimeType: mimeType,
                            size: processedBuffer.length,
                            uploadedBy: uploadedBy,
                            uploadedAt: new Date(),
                            checksum: checksum,
                            isImage: isImage,
                            imageMetadata: imageMetadata
                        };
                        key = "private/".concat(fileId, "/").concat(originalName);
                        url = void 0;
                        if (!(this.config.provider === 's3')) return [3 /*break*/, 4];
                        if (!this.s3Client) {
                            throw new Error('S3 storage selected but AWS credentials are missing');
                        }
                        return [4 /*yield*/, this.storeInS3(processedBuffer, key, metadata)];
                    case 3:
                        url = _b.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(this.config.provider === 'local')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.storeLocally(processedBuffer, key, metadata)];
                    case 5:
                        url = _b.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        if (!this.s3Client) {
                            throw new Error('Hybrid storage requires valid AWS credentials');
                        }
                        return [4 /*yield*/, Promise.all([
                                this.storeInS3(processedBuffer, key, metadata),
                                this.storeLocally(processedBuffer, key, metadata)
                            ])];
                    case 7:
                        _a = _b.sent(), s3Url = _a[0], localUrl = _a[1];
                        url = s3Url || localUrl;
                        _b.label = 8;
                    case 8:
                        expiresAt = new Date(Date.now() + this.config.urlExpiration * 1000);
                        logger_1.log.info('File stored securely', {
                            fileId: fileId,
                            originalName: originalName,
                            size: processedBuffer.length,
                            provider: this.config.provider,
                            isImage: isImage
                        }, 'STORAGE');
                        return [2 /*return*/, {
                                id: fileId,
                                key: key,
                                url: url,
                                metadata: metadata,
                                expiresAt: expiresAt
                            }];
                    case 9:
                        error_2 = _b.sent();
                        logger_1.log.error('File storage failed', error_2, 'STORAGE');
                        throw error_2;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Store file in AWS S3
     * @param buffer - File buffer
     * @param key - S3 object key
     * @param metadata - File metadata
     * @returns Promise<string> - S3 URL
     */
    SecureFileStorage.prototype.storeInS3 = function (buffer, key, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var command, getCommand;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.s3Client) {
                            throw new Error('S3 client not initialized');
                        }
                        command = new client_s3_1.PutObjectCommand({
                            Bucket: this.config.s3Bucket,
                            Key: key,
                            Body: buffer,
                            ContentType: metadata.mimeType,
                            Metadata: __assign({ 'original-name': metadata.originalName, 'uploaded-by': metadata.uploadedBy, 'uploaded-at': metadata.uploadedAt.toISOString(), 'checksum': metadata.checksum, 'is-image': metadata.isImage.toString() }, (metadata.imageMetadata && {
                                'image-width': metadata.imageMetadata.width.toString(),
                                'image-height': metadata.imageMetadata.height.toString(),
                                'image-format': metadata.imageMetadata.format
                            })),
                            ServerSideEncryption: 'AES256'
                        });
                        return [4 /*yield*/, this.s3Client.send(command)];
                    case 1:
                        _a.sent();
                        getCommand = new client_s3_1.GetObjectCommand({
                            Bucket: this.config.s3Bucket,
                            Key: key
                        });
                        return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, getCommand, {
                                expiresIn: this.config.urlExpiration
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Store file locally
     * @param buffer - File buffer
     * @param key - File key
     * @param metadata - File metadata
     * @returns Promise<string> - Local file URL
     */
    SecureFileStorage.prototype.storeLocally = function (buffer, key, metadata) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, path, filePath, dirPath, keyHex, encryptionKey, iv, cipher, encrypted, authTag, encryptedBuffer, metadataPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('fs/promises')); })];
                    case 1:
                        fs = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('path')); })];
                    case 2:
                        path = _a.sent();
                        filePath = path.join(this.config.localPath, key);
                        dirPath = path.dirname(filePath);
                        // Create directory if it doesn't exist
                        return [4 /*yield*/, fs.mkdir(dirPath, { recursive: true })];
                    case 3:
                        // Create directory if it doesn't exist
                        _a.sent();
                        keyHex = env_1.env.FILE_ENCRYPTION_KEY;
                        if (!keyHex || keyHex.length < 32) {
                            throw new Error('FILE_ENCRYPTION_KEY is required for local storage');
                        }
                        encryptionKey = Buffer.from(keyHex, 'hex');
                        iv = node_crypto_1.default.randomBytes(12);
                        cipher = node_crypto_1.default.createCipheriv('aes-256-gcm', encryptionKey, iv);
                        encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
                        authTag = cipher.getAuthTag();
                        encryptedBuffer = Buffer.concat([iv, authTag, encrypted]);
                        // Write encrypted file with restricted permissions
                        return [4 /*yield*/, fs.writeFile(filePath, encryptedBuffer, { mode: 384 })];
                    case 4:
                        // Write encrypted file with restricted permissions
                        _a.sent();
                        metadataPath = "".concat(filePath, ".meta.json");
                        return [4 /*yield*/, fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), { mode: 384 })];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, "/api/files/".concat(key)];
                }
            });
        });
    };
    /**
     * Generate signed URL for file access
     * @param fileId - File ID
     * @param key - File key
     * @returns Promise<string> - Signed URL
     */
    SecureFileStorage.prototype.generateSignedUrl = function (fileId, key) {
        return __awaiter(this, void 0, void 0, function () {
            var command, expiresAt, signature, command, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(this.config.provider === 's3')) return [3 /*break*/, 2];
                        if (!this.s3Client) {
                            throw new Error('S3 client not initialized');
                        }
                        command = new client_s3_1.GetObjectCommand({
                            Bucket: this.config.s3Bucket,
                            Key: key
                        });
                        return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
                                expiresIn: this.config.urlExpiration
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(this.config.provider === 'local')) return [3 /*break*/, 3];
                        expiresAt = Date.now() + this.config.urlExpiration * 1000;
                        signature = node_crypto_1.default
                            .createHmac('sha256', env_1.env.FILE_SIGNATURE_SECRET)
                            .update("".concat(fileId, ":").concat(expiresAt))
                            .digest('hex');
                        return [2 /*return*/, "/api/files/".concat(fileId, "/download?expires=").concat(expiresAt, "&signature=").concat(signature)];
                    case 3:
                        if (!this.s3Client) {
                            throw new Error('Hybrid storage requires valid AWS credentials');
                        }
                        command = new client_s3_1.GetObjectCommand({
                            Bucket: this.config.s3Bucket,
                            Key: key
                        });
                        return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
                                expiresIn: this.config.urlExpiration
                            })];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        logger_1.log.error('Failed to generate signed URL', error_3, 'STORAGE');
                        throw error_3;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete file from storage
     * @param key - File key
     * @returns Promise<void>
     */
    SecureFileStorage.prototype.deleteFile = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command, fs, path, filePath, metadataPath, fs, path, filePath, metadataPath, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        if (!(this.config.provider === 's3')) return [3 /*break*/, 2];
                        if (!this.s3Client) {
                            throw new Error('S3 client not initialized');
                        }
                        command = new client_s3_1.DeleteObjectCommand({
                            Bucket: this.config.s3Bucket,
                            Key: key
                        });
                        return [4 /*yield*/, this.s3Client.send(command)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 2:
                        if (!(this.config.provider === 'local')) return [3 /*break*/, 6];
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('fs/promises')); })];
                    case 3:
                        fs = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('path')); })];
                    case 4:
                        path = _a.sent();
                        filePath = path.join(this.config.localPath, key);
                        metadataPath = "".concat(filePath, ".meta.json");
                        return [4 /*yield*/, Promise.allSettled([
                                fs.unlink(filePath),
                                fs.unlink(metadataPath)
                            ])];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        if (!this.s3Client) {
                            throw new Error('Hybrid storage requires valid AWS credentials');
                        }
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('fs/promises')); })];
                    case 7:
                        fs = _a.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('path')); })];
                    case 8:
                        path = _a.sent();
                        filePath = path.join(this.config.localPath, key);
                        metadataPath = "".concat(filePath, ".meta.json");
                        return [4 /*yield*/, Promise.allSettled([
                                this.s3Client.send(new client_s3_1.DeleteObjectCommand({ Bucket: this.config.s3Bucket, Key: key })),
                                fs.unlink(filePath),
                                fs.unlink(metadataPath)
                            ])];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        logger_1.log.info('File deleted', { key: key }, 'STORAGE');
                        return [3 /*break*/, 12];
                    case 11:
                        error_4 = _a.sent();
                        logger_1.log.error('Failed to delete file', error_4, 'STORAGE');
                        throw error_4;
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check if file exists
     * @param key - File key
     * @returns Promise<boolean> - True if file exists
     */
    SecureFileStorage.prototype.fileExists = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var command, fs, path, filePath, command, _a, fs, path, filePath, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 14, , 15]);
                        if (!(this.config.provider === 's3')) return [3 /*break*/, 2];
                        if (!this.s3Client) {
                            throw new Error('S3 client not initialized');
                        }
                        command = new client_s3_1.HeadObjectCommand({
                            Bucket: this.config.s3Bucket,
                            Key: key
                        });
                        return [4 /*yield*/, this.s3Client.send(command)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 2:
                        if (!(this.config.provider === 'local')) return [3 /*break*/, 6];
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('fs/promises')); })];
                    case 3:
                        fs = _c.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('path')); })];
                    case 4:
                        path = _c.sent();
                        filePath = path.join(this.config.localPath, key);
                        return [4 /*yield*/, fs.access(filePath)];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 6:
                        if (!this.s3Client) {
                            throw new Error('Hybrid storage requires valid AWS credentials');
                        }
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 9, , 13]);
                        command = new client_s3_1.HeadObjectCommand({
                            Bucket: this.config.s3Bucket,
                            Key: key
                        });
                        return [4 /*yield*/, this.s3Client.send(command)];
                    case 8:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 9:
                        _a = _c.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('fs/promises')); })];
                    case 10:
                        fs = _c.sent();
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('path')); })];
                    case 11:
                        path = _c.sent();
                        filePath = path.join(this.config.localPath, key);
                        return [4 /*yield*/, fs.access(filePath)];
                    case 12:
                        _c.sent();
                        return [2 /*return*/, true];
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        _b = _c.sent();
                        return [2 /*return*/, false];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get storage status
     * @returns object - Storage status information
     */
    SecureFileStorage.prototype.getStatus = function () {
        return {
            provider: this.config.provider,
            s3Configured: !!this.s3Client,
            localPath: this.config.localPath,
            urlExpiration: this.config.urlExpiration,
            maxFileSize: this.config.maxFileSize
        };
    };
    return SecureFileStorage;
}());
exports.SecureFileStorage = SecureFileStorage;
// Default storage configuration
exports.defaultStorageConfig = {
    provider: process.env.FILE_STORAGE_PROVIDER || 'local',
    s3Bucket: process.env.AWS_S3_BUCKET || 'hrms-elite-files',
    s3Region: process.env.AWS_S3_REGION || 'us-east-1',
    s3AccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    s3SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    localPath: process.env.LOCAL_FILE_PATH || './uploads',
    urlExpiration: parseInt(process.env.FILE_URL_EXPIRATION || '600'), // 10 minutes
    maxFileSize: parseInt(process.env.UPLOAD_MAX_BYTES || process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
    allowedMimeTypes: [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
};
// Create default storage instance
exports.secureFileStorage = new SecureFileStorage(exports.defaultStorageConfig);
