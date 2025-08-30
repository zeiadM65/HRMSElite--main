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
exports.hasAllPermissions = exports.hasAnyPermission = exports.hasPermission = exports.getCurrentUser = exports.optionalAuth = exports.requireCompanyAccess = exports.requirePermission = exports.requireRole = exports.isAuthenticated = exports.getRefreshTokenFromRequest = exports.getTokenFromRequest = exports.clearAuthCookies = exports.setAuthCookies = exports.hashToken = exports.verifyRefreshToken = exports.verifyJWTToken = exports.generateRefreshToken = exports.generateJWTToken = void 0;
var storage_1 = require("../models/storage");
var logger_1 = require("../utils/logger");
var env_1 = require("../utils/env");
var jwt = __importStar(require("jsonwebtoken"));
var node_crypto_1 = __importDefault(require("node:crypto"));
// JWT Configuration - Using validated environment variables
var ACCESS_JWT_SECRET = env_1.env.ACCESS_JWT_SECRET;
var REFRESH_JWT_SECRET = env_1.env.REFRESH_JWT_SECRET;
var JWT_EXPIRES_IN = env_1.env.JWT_EXPIRES_IN;
var JWT_REFRESH_EXPIRES_IN = env_1.env.JWT_REFRESH_EXPIRES_IN;
// Cookie configuration
var COOKIE_CONFIG = {
    httpOnly: true,
    secure: true, // Always secure for __Host- prefix
    sameSite: 'strict',
    path: '/',
    domain: undefined // Let browser set domain for __Host- prefix
};
/**
 * Generate JWT token for user
 * @param payload - User data to include in token
 * @returns JWT token string
 */
var generateJWTToken = function (payload) {
    return jwt.sign(payload, ACCESS_JWT_SECRET, {
        'expiresIn': JWT_EXPIRES_IN,
        'issuer': 'hrms-elite',
        'audience': 'hrms-elite-users'
    });
};
exports.generateJWTToken = generateJWTToken;
/**
 * Generate refresh token for user
 * @param payload - User data to include in refresh token
 * @returns Refresh token string
 */
var generateRefreshToken = function (payload) {
    return jwt.sign(payload, REFRESH_JWT_SECRET, {
        'expiresIn': JWT_REFRESH_EXPIRES_IN,
        'issuer': 'hrms-elite',
        'audience': 'hrms-elite-refresh'
    });
};
exports.generateRefreshToken = generateRefreshToken;
/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
var verifyJWTToken = function (token) {
    try {
        var decoded = jwt.verify(token, ACCESS_JWT_SECRET, {
            'issuer': 'hrms-elite',
            'audience': 'hrms-elite-users'
        });
        return decoded;
    }
    catch (error) {
        logger_1.log.error('JWT verification failed:', error, 'AUTH');
        return null;
    }
};
exports.verifyJWTToken = verifyJWTToken;
/**
 * Verify refresh token
 * @param token - Refresh token to verify
 * @returns Decoded token payload or null if invalid
 */
var verifyRefreshToken = function (token) {
    try {
        var decoded = jwt.verify(token, REFRESH_JWT_SECRET, {
            'issuer': 'hrms-elite',
            'audience': 'hrms-elite-refresh'
        });
        return decoded;
    }
    catch (error) {
        logger_1.log.error('Refresh token verification failed:', error, 'AUTH');
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
/**
 * Hash token using HMAC
 * @param token - Raw token
 * @returns HMAC hash
 */
var hashToken = function (token) {
    return node_crypto_1.default.createHmac('sha256', REFRESH_JWT_SECRET).update(token).digest('hex');
};
exports.hashToken = hashToken;
/**
 * Set authentication cookies
 * @param res - Express response object
 * @param accessToken - Short-lived access token
 * @param refreshToken - Long-lived refresh token
 */
var setAuthCookies = function (res, accessToken, refreshToken, rememberMe) {
    if (rememberMe === void 0) { rememberMe = false; }
    // Set access token cookie (short-lived)
    res.cookie('__Host-hrms-elite-access', accessToken, __assign(__assign({}, COOKIE_CONFIG), { maxAge: 15 * 60 * 1000 }));
    // Set refresh token cookie with optional extended expiry
    var refreshMaxAge = rememberMe
        ? 30 * 24 * 60 * 60 * 1000 // 30 days for remember me
        : 7 * 24 * 60 * 60 * 1000; // 7 days default
    res.cookie('__Host-hrms-elite-refresh', refreshToken, __assign(__assign({}, COOKIE_CONFIG), { maxAge: refreshMaxAge }));
};
exports.setAuthCookies = setAuthCookies;
/**
 * Clear authentication cookies
 * @param res - Express response object
 */
var clearAuthCookies = function (res) {
    res.clearCookie('__Host-hrms-elite-access', COOKIE_CONFIG);
    res.clearCookie('__Host-hrms-elite-refresh', COOKIE_CONFIG);
};
exports.clearAuthCookies = clearAuthCookies;
/**
 * Get token from authentication cookies
 * @param req - Express request object
 * @returns Token string or null
 */
var getTokenFromRequest = function (req) {
    // First check for access token in cookie
    var accessToken = req.cookies['__Host-hrms-elite-access'];
    if (accessToken) {
        return accessToken;
    }
    // No header fallback: tokens are cookies-only
    var hdr = undefined;
    return null;
};
exports.getTokenFromRequest = getTokenFromRequest;
/**
 * Get refresh token from cookies
 * @param req - Express request object
 * @returns Refresh token string or null
 */
var getRefreshTokenFromRequest = function (req) {
    return req.cookies['__Host-hrms-elite-refresh'] || null;
};
exports.getRefreshTokenFromRequest = getRefreshTokenFromRequest;
/**
 * Unified Authentication Middleware
 * Handles cookie-based authentication with fallback to session-based
 */
var isAuthenticated = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionUser, token, decoded, userId, user, _userCompanies, permissions, parsedPermissions, error_1;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 6, , 7]);
                // Check for session-based authentication first (for backward compatibility)
                if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
                    sessionUser = req.session.user;
                    req.user = {
                        'id': sessionUser.id,
                        'sub': sessionUser.id,
                        'role': sessionUser.role,
                        'email': sessionUser.email,
                        'firstName': (_b = sessionUser.firstName) !== null && _b !== void 0 ? _b : (((_c = sessionUser.name) === null || _c === void 0 ? void 0 : _c.split(' ')[0]) || 'User'),
                        'lastName': (_d = sessionUser.lastName) !== null && _d !== void 0 ? _d : (((_e = sessionUser.name) === null || _e === void 0 ? void 0 : _e.split(' ').slice(1).join(' ')) || ''),
                        'permissions': sessionUser.permissions || [],
                        'isActive': (_f = sessionUser.isActive) !== null && _f !== void 0 ? _f : true,
                        'claims': sessionUser.claims || null,
                        'createdAt': sessionUser.createdAt ? new Date(sessionUser.createdAt) : new Date(),
                        'updatedAt': sessionUser.updatedAt ? new Date(sessionUser.updatedAt) : new Date()
                    };
                    return [2 /*return*/, next()];
                }
                token = (0, exports.getTokenFromRequest)(req);
                if (!token) return [3 /*break*/, 5];
                decoded = (0, exports.verifyJWTToken)(token);
                if (!decoded) return [3 /*break*/, 4];
                userId = String((_g = decoded === null || decoded === void 0 ? void 0 : decoded.id) !== null && _g !== void 0 ? _g : '');
                return [4 /*yield*/, storage_1.storage.getUser(userId)];
            case 1:
                user = _h.sent();
                if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
                    return [2 /*return*/, res.status(401).json({
                            'message': 'User not found or inactive',
                            'error': 'المستخدم غير موجود أو غير نشط',
                            'code': 'USER_NOT_FOUND_OR_INACTIVE',
                            'timestamp': new Date().toISOString()
                        })];
                }
                return [4 /*yield*/, storage_1.storage.getUserCompanies(userId)];
            case 2:
                _userCompanies = _h.sent();
                return [4 /*yield*/, storage_1.storage.getUserPermissions(userId)];
            case 3:
                permissions = _h.sent();
                parsedPermissions = [];
                if (typeof permissions === 'string') {
                    try {
                        parsedPermissions = JSON.parse(permissions);
                    }
                    catch (_j) {
                        parsedPermissions = [];
                    }
                }
                else if (Array.isArray(permissions)) {
                    parsedPermissions = permissions;
                }
                req.user = {
                    'id': user.id,
                    'sub': user.id,
                    'role': user.role,
                    'email': user.email,
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'permissions': parsedPermissions,
                    'isActive': user.isActive,
                    'claims': user.claims ? JSON.parse(user.claims) : null,
                    'createdAt': user.createdAt,
                    'updatedAt': user.updatedAt
                };
                return [2 /*return*/, next()];
            case 4: return [2 /*return*/, res.status(401).json({
                    'message': 'Invalid or expired token',
                    'error': 'رمز المصادقة غير صالح أو منتهي الصلاحية',
                    'code': 'INVALID_TOKEN',
                    'timestamp': new Date().toISOString()
                })];
            case 5: 
            // No authentication found
            return [2 /*return*/, res.status(401).json({
                    'message': 'Authentication required',
                    'error': 'يجب تسجيل الدخول للوصول إلى هذا المورد',
                    'code': 'AUTHENTICATION_REQUIRED',
                    'timestamp': new Date().toISOString()
                })];
            case 6:
                error_1 = _h.sent();
                logger_1.log.error('Authentication error:', error_1, 'AUTH');
                return [2 /*return*/, res.status(500).json({
                        'message': 'Authentication service error',
                        'error': 'خطأ في خدمة المصادقة',
                        'code': 'AUTHENTICATION_SERVICE_ERROR',
                        'timestamp': new Date().toISOString()
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.isAuthenticated = isAuthenticated;
/**
 * Role-based authorization middleware
 */
var requireRole = function (allowedRoles) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                'message': 'Authentication required',
                'error': 'يجب تسجيل الدخول للوصول إلى هذا المورد',
                'code': 'AUTHENTICATION_REQUIRED',
                'timestamp': new Date().toISOString()
            });
        }
        var userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                'message': 'Access denied. Insufficient permissions.',
                'error': 'ليس لديك الصلاحيات المطلوبة للوصول إلى هذا المورد',
                'code': 'INSUFFICIENT_PERMISSIONS',
                'requiredRoles': allowedRoles,
                'userRole': userRole,
                'timestamp': new Date().toISOString()
            });
        }
        next();
    };
};
exports.requireRole = requireRole;
/**
 * Permission-based authorization middleware
 */
var requirePermission = function (requiredPermission) {
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                'message': 'Authentication required',
                'error': 'يجب تسجيل الدخول للوصول إلى هذا المورد',
                'code': 'AUTHENTICATION_REQUIRED',
                'timestamp': new Date().toISOString()
            });
        }
        var userPermissions = req.user.permissions || [];
        if (!userPermissions.includes(requiredPermission)) {
            return res.status(403).json({
                'message': 'Access denied. Insufficient permissions.',
                'error': 'ليس لديك الصلاحيات المطلوبة للوصول إلى هذا المورد',
                'code': 'INSUFFICIENT_PERMISSIONS',
                'requiredPermission': requiredPermission,
                'userPermissions': userPermissions,
                'timestamp': new Date().toISOString()
            });
        }
        next();
    };
};
exports.requirePermission = requirePermission;
/**
 * Company access middleware
 */
var requireCompanyAccess = function (companyIdParam) {
    if (companyIdParam === void 0) { companyIdParam = 'companyId'; }
    return function (req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                'message': 'Authentication required',
                'error': 'يجب تسجيل الدخول للوصول إلى هذا المورد',
                'code': 'AUTHENTICATION_REQUIRED',
                'timestamp': new Date().toISOString()
            });
        }
        var companyId = req.params[companyIdParam] || req.query.companyId;
        if (!companyId) {
            return res.status(400).json({
                'message': 'Company ID is required',
                'error': 'معرف الشركة مطلوب',
                'code': 'COMPANY_ID_REQUIRED',
                'timestamp': new Date().toISOString()
            });
        }
        // Super admin can access all companies
        if (req.user.role === 'super_admin') {
            return next();
        }
        // Check if user has access to this company through companyId
        if (req.user.companyId === companyId) {
            return next();
        }
        return res.status(403).json({
            'message': 'Access denied. No access to this company.',
            'error': 'ليس لديك صلاحية الوصول إلى هذه الشركة',
            'code': 'COMPANY_ACCESS_DENIED',
            'companyId': companyId,
            'timestamp': new Date().toISOString()
        });
    };
};
exports.requireCompanyAccess = requireCompanyAccess;
/**
 * Optional authentication middleware
 * Allows requests to proceed even if not authenticated
 */
var optionalAuth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sessionUser, token, decoded, userId, user, permissions, parsedPermissions, _a, _b;
    var _c, _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _k.trys.push([0, 8, , 9]);
                if (!((_c = req.session) === null || _c === void 0 ? void 0 : _c.user)) return [3 /*break*/, 1];
                sessionUser = req.session.user;
                req.user = {
                    'id': sessionUser.id,
                    'sub': sessionUser.id,
                    'role': sessionUser.role,
                    'email': sessionUser.email,
                    'firstName': (_d = sessionUser.firstName) !== null && _d !== void 0 ? _d : (((_e = sessionUser.name) === null || _e === void 0 ? void 0 : _e.split(' ')[0]) || 'User'),
                    'lastName': (_f = sessionUser.lastName) !== null && _f !== void 0 ? _f : (((_g = sessionUser.name) === null || _g === void 0 ? void 0 : _g.split(' ').slice(1).join(' ')) || ''),
                    'permissions': sessionUser.permissions || [],
                    'isActive': (_h = sessionUser.isActive) !== null && _h !== void 0 ? _h : true,
                    'claims': sessionUser.claims || null,
                    'createdAt': sessionUser.createdAt ? new Date(sessionUser.createdAt) : new Date(),
                    'updatedAt': sessionUser.updatedAt ? new Date(sessionUser.updatedAt) : new Date()
                };
                return [3 /*break*/, 7];
            case 1:
                token = (0, exports.getTokenFromRequest)(req);
                if (!token) return [3 /*break*/, 7];
                decoded = (0, exports.verifyJWTToken)(token);
                if (!decoded) return [3 /*break*/, 7];
                userId = String((_j = decoded.id) !== null && _j !== void 0 ? _j : '');
                _k.label = 2;
            case 2:
                _k.trys.push([2, 6, , 7]);
                return [4 /*yield*/, storage_1.storage.getUser(userId)];
            case 3:
                user = _k.sent();
                if (!(user === null || user === void 0 ? void 0 : user.isActive)) return [3 /*break*/, 5];
                return [4 /*yield*/, storage_1.storage.getUserPermissions(userId)];
            case 4:
                permissions = _k.sent();
                parsedPermissions = [];
                if (typeof permissions === 'string') {
                    try {
                        parsedPermissions = JSON.parse(permissions);
                    }
                    catch (_l) {
                        parsedPermissions = [];
                    }
                }
                else if (Array.isArray(permissions)) {
                    parsedPermissions = permissions;
                }
                req.user = {
                    'id': user.id,
                    'sub': user.id,
                    'role': user.role,
                    'email': user.email,
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'permissions': parsedPermissions,
                    'isActive': user.isActive,
                    'claims': user.claims ? JSON.parse(user.claims) : null,
                    'createdAt': user.createdAt,
                    'updatedAt': user.updatedAt
                };
                _k.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                _a = _k.sent();
                return [3 /*break*/, 7];
            case 7:
                next();
                return [3 /*break*/, 9];
            case 8:
                _b = _k.sent();
                // Continue without authentication
                next();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.optionalAuth = optionalAuth;
/**
 * Get current user from request
 */
var getCurrentUser = function (req) {
    return req.user;
};
exports.getCurrentUser = getCurrentUser;
/**
 * Check if user has specific permission
 */
var hasPermission = function (req, permission) {
    if (!req.user) {
        return false;
    }
    return (req.user.permissions || []).includes(permission);
};
exports.hasPermission = hasPermission;
/**
 * Check if user has unknown of the specified permissions
 */
var hasAnyPermission = function (req, permissions) {
    if (!req.user) {
        return false;
    }
    var userPermissions = req.user.permissions || [];
    return permissions.some(function (permission) { return userPermissions.includes(permission); });
};
exports.hasAnyPermission = hasAnyPermission;
/**
 * Check if user has all specified permissions
 */
var hasAllPermissions = function (req, permissions) {
    if (!req.user) {
        return false;
    }
    var userPermissions = req.user.permissions || [];
    return permissions.every(function (permission) { return userPermissions.includes(permission); });
};
exports.hasAllPermissions = hasAllPermissions;
