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
var express_1 = require("express");
var storage_1 = require("../models/storage");
var logger_1 = require("../utils/logger");
var auth_1 = require("../middleware/auth");
var tokenStore_1 = require("../services/tokenStore");
var password_1 = require("../utils/password");
var email_1 = require("../utils/email");
var schema_1 = require("@shared/schema");
var security_1 = require("../middleware/security");
var metrics_1 = require("../middleware/metrics");
var node_crypto_1 = __importDefault(require("node:crypto"));
var router = (0, express_1.Router)();
// Prevent caching of all auth-related responses
router.use(function (_req, res, next) {
    res.setHeader('Cache-Control', 'no-store');
    next();
});
/**
 * Unified User Endpoint - Primary endpoint for all user operations
 * GET /api/auth/user
 * Returns current user with company context
 */
router.get('/user', auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId_1, user, userCompanies, currentCompany, permissions, _a, response, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                userId = req.user.id;
                companyId_1 = req.query.companyId;
                return [4 /*yield*/, storage_1.storage.getUser(userId)];
            case 1:
                user = _d.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ 'message': 'User not found' })];
                }
                return [4 /*yield*/, storage_1.storage.getUserCompanies(userId)];
            case 2:
                userCompanies = _d.sent();
                currentCompany = null;
                if (companyId_1) {
                    currentCompany = userCompanies.find(function (company) { return company.id === companyId_1; });
                    if (!currentCompany) {
                        return [2 /*return*/, res.status(403).json({ 'message': 'No access to specified company' })];
                    }
                }
                if (!companyId_1) return [3 /*break*/, 4];
                return [4 /*yield*/, storage_1.storage.getUserPermissions(userId, companyId_1)];
            case 3:
                _a = _d.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, storage_1.storage.getUserPermissions(userId)];
            case 5:
                _a = _d.sent();
                _d.label = 6;
            case 6:
                permissions = _a;
                response = {
                    'id': user.id,
                    'email': user.email,
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'role': user.role,
                    'companies': userCompanies,
                    permissions: permissions,
                    'companyId': (_b = currentCompany === null || currentCompany === void 0 ? void 0 : currentCompany.id) !== null && _b !== void 0 ? _b : user.companyId,
                    currentCompany: currentCompany,
                    'createdAt': user.createdAt,
                    'updatedAt': user.updatedAt,
                    'lastLoginAt': user.lastLoginAt,
                    'isActive': user.isActive,
                    'emailVerified': user.emailVerified,
                    'profileImageUrl': user.profileImageUrl,
                    'sub': user.id, // Use user ID as sub
                    'claims': (_c = user.claims) !== null && _c !== void 0 ? _c : null
                };
                res.json(response);
                return [3 /*break*/, 8];
            case 7:
                error_1 = _d.sent();
                logger_1.log.error('Error fetching user:', error_1, 'AUTH');
                res.status(500).json({ 'message': 'Failed to fetch user' });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
/**
 * Current User Endpoint - Redirects to unified endpoint
 * GET /api/auth/current-user
 */
router.get('/current-user', auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Redirect to unified endpoint
        res.redirect('/api/auth/user');
        return [2 /*return*/];
    });
}); });
/**
 * Register Endpoint
 * POST /api/auth/register
 */
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, _a, email, password, firstName, lastName, companyId, role, existingUser, passwordValidation, hashedPassword, verificationToken, userData, newUser, tokenPayload, accessToken, refreshToken, decodedRefresh, error_2;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                validationResult = schema_1.registerUserSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res.status(400).json({
                            'message': 'Invalid input data',
                            'errors': validationResult.error.errors
                        })];
                }
                _a = validationResult.data, email = _a.email, password = _a.password, firstName = _a.firstName, lastName = _a.lastName, companyId = _a.companyId, role = _a.role;
                return [4 /*yield*/, storage_1.storage.getUserByEmail(email)];
            case 1:
                existingUser = _d.sent();
                if (existingUser) {
                    return [2 /*return*/, res.status(409).json({ 'message': 'User with this email already exists' })];
                }
                passwordValidation = (0, password_1.validatePasswordStrength)(password);
                if (!passwordValidation.isValid) {
                    return [2 /*return*/, res.status(400).json({ 'message': passwordValidation.message })];
                }
                return [4 /*yield*/, (0, password_1.hashPassword)(password)];
            case 2:
                hashedPassword = _d.sent();
                verificationToken = (0, password_1.generateSecureToken)();
                userData = {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    'password': hashedPassword,
                    'role': role !== null && role !== void 0 ? role : "worker",
                    companyId: companyId,
                    'emailVerificationToken': verificationToken,
                    'emailVerificationExpires': Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
                    'isActive': true,
                    'emailVerified': false
                };
                return [4 /*yield*/, storage_1.storage.createUser(userData)];
            case 3:
                newUser = _d.sent();
                // Send verification email
                return [4 /*yield*/, (0, email_1.sendVerificationEmail)(email, verificationToken, firstName)];
            case 4:
                // Send verification email
                _d.sent();
                tokenPayload = {
                    'id': newUser.id,
                    'email': newUser.email,
                    'firstName': newUser.firstName,
                    'lastName': newUser.lastName,
                    'role': newUser.role,
                    'companyId': newUser.companyId
                };
                accessToken = (0, auth_1.generateJWTToken)(tokenPayload);
                refreshToken = (0, auth_1.generateRefreshToken)(tokenPayload);
                // Set authentication cookies instead of returning tokens in the response body
                (0, auth_1.setAuthCookies)(res, accessToken, refreshToken);
                decodedRefresh = (0, auth_1.verifyRefreshToken)(refreshToken);
                if (!decodedRefresh) return [3 /*break*/, 6];
                return [4 /*yield*/, storage_1.storage.createRefreshToken({
                        userId: newUser.id,
                        tokenHash: (0, auth_1.hashToken)(refreshToken),
                        familyId: node_crypto_1.default.randomUUID(),
                        expiresAt: new Date(((_b = decodedRefresh.exp) !== null && _b !== void 0 ? _b : 0) * 1000),
                        userAgent: (_c = req.get('User-Agent')) !== null && _c !== void 0 ? _c : '',
                        ip: req.ip
                    })];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6:
                res.status(200).json({
                    'success': true,
                    'message': 'تم التسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني',
                    'user': {
                        'id': newUser.id,
                        'email': newUser.email,
                        'firstName': newUser.firstName,
                        'lastName': newUser.lastName,
                        'role': newUser.role,
                        'emailVerified': newUser.emailVerified
                    }
                });
                return [3 /*break*/, 8];
            case 7:
                error_2 = _d.sent();
                logger_1.log.error('Registration error:', error_2, 'AUTH');
                res.status(500).json({ 'message': 'حدث خطأ في التسجيل' });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
/**
 * Login Endpoint
 * POST /api/auth/login
 */
router.post('/login', security_1.enhancedRateLimiters.login, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, _a, email_2, password, companyId, logFailedAttempt, user, isPasswordValid, userCompanies, permissions, _b, tokenPayload, accessToken, refreshToken, decodedRefresh, sessionUser, error_3;
    var _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 11, , 12]);
                validationResult = schema_1.loginSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res.status(400).json({
                            'message': 'Invalid input data',
                            'errors': validationResult.error.errors
                        })];
                }
                _a = validationResult.data, email_2 = _a.email, password = _a.password, companyId = _a.companyId;
                logFailedAttempt = function (reason) {
                    var _a;
                    (_a = req.log) === null || _a === void 0 ? void 0 : _a.warn('Failed login attempt', {
                        reason: reason,
                        email: email_2,
                        ip: req.ip,
                        userAgent: req.get('User-Agent'),
                        timestamp: new Date().toISOString()
                    });
                    metrics_1.metricsUtils.incrementLoginFailure(reason);
                };
                return [4 /*yield*/, storage_1.storage.getUserByEmail(email_2)];
            case 1:
                user = _f.sent();
                if (!user) {
                    logFailedAttempt('user_not_found');
                    return [2 /*return*/, res.status(401).json({ 'message': 'البريد الإلكتروني أو كلمة المرور غير صحيحة' })];
                }
                // Check if user is active
                if (!user.isActive) {
                    logFailedAttempt('inactive_user');
                    return [2 /*return*/, res.status(401).json({ 'message': 'الحساب غير مفعل' })];
                }
                return [4 /*yield*/, (0, password_1.verifyPassword)(password, (_c = user.password) !== null && _c !== void 0 ? _c : '')];
            case 2:
                isPasswordValid = _f.sent();
                if (!isPasswordValid) {
                    logFailedAttempt('invalid_password');
                    return [2 /*return*/, res.status(401).json({ 'message': 'البريد الإلكتروني أو كلمة المرور غير صحيحة' })];
                }
                // Update last login
                return [4 /*yield*/, storage_1.storage.updateUserLastLogin(user.id)];
            case 3:
                // Update last login
                _f.sent();
                metrics_1.metricsUtils.incrementAuthSuccess(req.method, user.role);
                return [4 /*yield*/, storage_1.storage.getUserCompanies(user.id)];
            case 4:
                userCompanies = _f.sent();
                if (!companyId) return [3 /*break*/, 6];
                return [4 /*yield*/, storage_1.storage.getUserPermissions(user.id, companyId)];
            case 5:
                _b = _f.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, storage_1.storage.getUserPermissions(user.id)];
            case 7:
                _b = _f.sent();
                _f.label = 8;
            case 8:
                permissions = _b;
                tokenPayload = {
                    'id': user.id,
                    'email': user.email,
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'role': user.role,
                    'companyId': user.companyId
                };
                accessToken = (0, auth_1.generateJWTToken)(tokenPayload);
                refreshToken = (0, auth_1.generateRefreshToken)(tokenPayload);
                // Set authentication cookies
                (0, auth_1.setAuthCookies)(res, accessToken, refreshToken);
                decodedRefresh = (0, auth_1.verifyRefreshToken)(refreshToken);
                if (!decodedRefresh) return [3 /*break*/, 10];
                return [4 /*yield*/, storage_1.storage.createRefreshToken({
                        userId: user.id,
                        tokenHash: (0, auth_1.hashToken)(refreshToken),
                        familyId: node_crypto_1.default.randomUUID(),
                        expiresAt: new Date(((_d = decodedRefresh.exp) !== null && _d !== void 0 ? _d : 0) * 1000),
                        userAgent: (_e = req.get('User-Agent')) !== null && _e !== void 0 ? _e : '',
                        ip: req.ip
                    })];
            case 9:
                _f.sent();
                _f.label = 10;
            case 10:
                sessionUser = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    companies: userCompanies,
                    permissions: permissions,
                    sub: user.id,
                    isActive: user.isActive,
                    claims: typeof user.claims === 'string' ? JSON.parse(user.claims) : user.claims,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    companyId: user.companyId
                };
                req.session.user = sessionUser;
                res.json({
                    'success': true,
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'firstName': user.firstName,
                        'lastName': user.lastName,
                        'role': user.role,
                        'companies': userCompanies,
                        permissions: permissions,
                        'companyId': user.companyId,
                        'emailVerified': user.emailVerified,
                        'sub': user.id
                    }
                });
                return [3 /*break*/, 12];
            case 11:
                error_3 = _f.sent();
                logger_1.log.error('Login error:', error_3, 'AUTH');
                res.status(500).json({ 'message': 'حدث خطأ في تسجيل الدخول' });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); });
/**
 * Refresh Token Endpoint
 * POST /api/auth/refresh
 */
router.post('/refresh', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, tokenHash, storedToken, refreshTokenId, decoded, user, tokenPayload, newAccessToken, newRefreshToken, newDecoded, newTokenRecord, error_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 11, , 12]);
                refreshToken = (0, auth_1.getRefreshTokenFromRequest)(req);
                if (!refreshToken) {
                    return [2 /*return*/, res.status(401).json({
                            'message': 'Refresh token not found',
                            'error': 'رمز التحديث غير موجود',
                            'code': 'REFRESH_TOKEN_MISSING'
                        })];
                }
                tokenHash = (0, auth_1.hashToken)(refreshToken);
                return [4 /*yield*/, storage_1.storage.findRefreshToken(tokenHash)];
            case 1:
                storedToken = _c.sent();
                if (!storedToken) {
                    (0, auth_1.clearAuthCookies)(res);
                    return [2 /*return*/, res.status(401).json({
                            'message': 'Invalid or expired refresh token',
                            'error': 'رمز التحديث غير صالح أو منتهي الصلاحية',
                            'code': 'INVALID_REFRESH_TOKEN'
                        })];
                }
                refreshTokenId = storedToken.id;
                return [4 /*yield*/, (0, tokenStore_1.isTokenBlacklisted)(refreshTokenId)];
            case 2:
                if (_c.sent()) {
                    (0, auth_1.clearAuthCookies)(res);
                    return [2 /*return*/, res.status(401).json({ error: 'Token revoked' })];
                }
                if (!storedToken.revokedAt) return [3 /*break*/, 4];
                return [4 /*yield*/, storage_1.storage.revokeRefreshTokenFamily(storedToken.familyId)];
            case 3:
                _c.sent();
                logger_1.log.security('Refresh token replay detected', req.ip, {
                    userId: storedToken.userId,
                    tokenId: storedToken.id,
                    familyId: storedToken.familyId
                });
                (0, auth_1.clearAuthCookies)(res);
                return [2 /*return*/, res.status(401).json({
                        'message': 'Refresh token revoked',
                        'code': 'REFRESH_TOKEN_REVOKED'
                    })];
            case 4:
                decoded = (0, auth_1.verifyRefreshToken)(refreshToken);
                if (!(!decoded || storedToken.expiresAt <= new Date())) return [3 /*break*/, 6];
                return [4 /*yield*/, storage_1.storage.revokeRefreshToken(storedToken.id)];
            case 5:
                _c.sent();
                (0, auth_1.clearAuthCookies)(res);
                return [2 /*return*/, res.status(401).json({
                        'message': 'Invalid or expired refresh token',
                        'error': 'رمز التحديث غير صالح أو منتهي الصلاحية',
                        'code': 'INVALID_REFRESH_TOKEN'
                    })];
            case 6: return [4 /*yield*/, storage_1.storage.getUser(storedToken.userId)];
            case 7:
                user = _c.sent();
                if (!(user === null || user === void 0 ? void 0 : user.isActive)) {
                    return [2 /*return*/, res.status(401).json({
                            'message': 'User not found or inactive',
                            'error': 'المستخدم غير موجود أو غير نشط',
                            'code': 'USER_NOT_FOUND_OR_INACTIVE'
                        })];
                }
                tokenPayload = {
                    'id': user.id,
                    'email': user.email,
                    'firstName': user.firstName,
                    'lastName': user.lastName,
                    'role': user.role,
                    'companyId': user.companyId
                };
                newAccessToken = (0, auth_1.generateJWTToken)(tokenPayload);
                newRefreshToken = (0, auth_1.generateRefreshToken)(tokenPayload);
                newDecoded = (0, auth_1.verifyRefreshToken)(newRefreshToken);
                return [4 /*yield*/, storage_1.storage.createRefreshToken({
                        userId: user.id,
                        tokenHash: (0, auth_1.hashToken)(newRefreshToken),
                        familyId: storedToken.familyId,
                        expiresAt: new Date(((_a = newDecoded === null || newDecoded === void 0 ? void 0 : newDecoded.exp) !== null && _a !== void 0 ? _a : 0) * 1000),
                        userAgent: (_b = req.get('User-Agent')) !== null && _b !== void 0 ? _b : '',
                        ip: req.ip
                    })];
            case 8:
                newTokenRecord = _c.sent();
                return [4 /*yield*/, storage_1.storage.revokeRefreshToken(storedToken.id, newTokenRecord.id)];
            case 9:
                _c.sent();
                return [4 /*yield*/, (0, tokenStore_1.blacklistToken)(storedToken.id)];
            case 10:
                _c.sent();
                (0, auth_1.setAuthCookies)(res, newAccessToken, newRefreshToken);
                res.json({
                    'success': true,
                    'message': 'Tokens refreshed successfully'
                });
                return [3 /*break*/, 12];
            case 11:
                error_4 = _c.sent();
                logger_1.log.error('Token refresh error:', error_4, 'AUTH');
                res.status(500).json({
                    'message': 'Token refresh failed',
                    'error': 'فشل في تحديث الرمز'
                });
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); });
/**
 * Logout Endpoint
 * POST /api/auth/logout
 */
router.post('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, stored, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                refreshToken = (0, auth_1.getRefreshTokenFromRequest)(req);
                if (!refreshToken) return [3 /*break*/, 4];
                return [4 /*yield*/, storage_1.storage.findRefreshToken((0, auth_1.hashToken)(refreshToken))];
            case 1:
                stored = _b.sent();
                if (!stored) return [3 /*break*/, 4];
                return [4 /*yield*/, storage_1.storage.revokeRefreshToken(stored.id)];
            case 2:
                _b.sent();
                return [4 /*yield*/, (0, tokenStore_1.blacklistToken)(stored.id)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [3 /*break*/, 7];
            case 5:
                error_5 = _b.sent();
                logger_1.log.error('Logout error:', error_5, 'AUTH');
                return [3 /*break*/, 7];
            case 6:
                (0, auth_1.clearAuthCookies)(res);
                (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(function () {
                    res.json({ 'success': true, 'message': 'تم تسجيل الخروج بنجاح' });
                });
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); });
/**
 * Logout All Endpoint
 * POST /api/auth/logout-all
 */
router.post('/logout-all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, stored, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                refreshToken = (0, auth_1.getRefreshTokenFromRequest)(req);
                if (!refreshToken) return [3 /*break*/, 4];
                return [4 /*yield*/, storage_1.storage.findRefreshToken((0, auth_1.hashToken)(refreshToken))];
            case 1:
                stored = _b.sent();
                if (!stored) return [3 /*break*/, 4];
                return [4 /*yield*/, storage_1.storage.revokeRefreshTokenFamily(stored.familyId)];
            case 2:
                _b.sent();
                return [4 /*yield*/, (0, tokenStore_1.blacklistToken)(stored.id)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [3 /*break*/, 7];
            case 5:
                error_6 = _b.sent();
                logger_1.log.error('Logout all error:', error_6, 'AUTH');
                return [3 /*break*/, 7];
            case 6:
                (0, auth_1.clearAuthCookies)(res);
                (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(function () {
                    res.json({ 'success': true, 'message': 'تم تسجيل الخروج من جميع الجلسات' });
                });
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}); });
/**
 * Switch Company Endpoint
 * POST /api/auth/switch-company
 */
router.post('/switch-company', auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var companyId_2, userId, userCompanies, targetCompany, permissions, currentSession, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                companyId_2 = req.body.companyId;
                userId = req.user.id;
                return [4 /*yield*/, storage_1.storage.getUserCompanies(userId)];
            case 1:
                userCompanies = _a.sent();
                targetCompany = userCompanies.find(function (company) { return company.id === companyId_2; });
                if (!targetCompany) {
                    return [2 /*return*/, res.status(403).json({ 'message': 'No access to specified company' })];
                }
                return [4 /*yield*/, storage_1.storage.getUserPermissions(userId, companyId_2)];
            case 2:
                permissions = _a.sent();
                currentSession = req.session;
                if (currentSession.user) {
                    currentSession.user = __assign(__assign({}, currentSession.user), { 'currentCompanyId': companyId_2, permissions: permissions });
                }
                res.json({
                    'success': true,
                    'user': __assign(__assign({}, currentSession.user), { 'currentCompany': targetCompany, permissions: permissions })
                });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                logger_1.log.error('Error switching company:', error_7, 'AUTH');
                res.status(500).json({ 'message': 'Failed to switch company' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * User Companies Endpoint
 * GET /api/auth/user/companies
 */
router.get('/user/companies', auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companies, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                return [4 /*yield*/, storage_1.storage.getUserCompanies(userId)];
            case 1:
                companies = _a.sent();
                res.json(companies);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                logger_1.log.error('Error fetching user companies:', error_8, 'AUTH');
                res.status(500).json({ 'message': 'Failed to fetch user companies' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * User Permissions Endpoint
 * GET /api/auth/user/permissions
 */
router.get('/user/permissions', auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId, permissions, _a, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                userId = req.user.id;
                companyId = req.query.companyId;
                if (!companyId) return [3 /*break*/, 2];
                return [4 /*yield*/, storage_1.storage.getUserPermissions(userId, companyId)];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, storage_1.storage.getUserPermissions(userId)];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                permissions = _a;
                res.json(permissions);
                return [3 /*break*/, 6];
            case 5:
                error_9 = _b.sent();
                logger_1.log.error('Error fetching user permissions:', error_9, 'AUTH');
                res.status(500).json({ 'message': 'Failed to fetch user permissions' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * User Roles Endpoint
 * GET /api/auth/user/roles
 */
router.get('/user/roles', auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId, roles, _a, error_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                userId = req.user.id;
                companyId = req.query.companyId;
                if (!companyId) return [3 /*break*/, 2];
                return [4 /*yield*/, storage_1.storage.getUserRoles(userId, companyId)];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, storage_1.storage.getUserRoles(userId)];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                roles = _a;
                res.json(roles);
                return [3 /*break*/, 6];
            case 5:
                error_10 = _b.sent();
                logger_1.log.error('Error fetching user roles:', error_10, 'AUTH');
                res.status(500).json({ 'message': 'Failed to fetch user roles' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * Change Password Endpoint
 * POST /api/auth/change-password
 */
router.post('/change-password', auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, _a, currentPassword, newPassword, userId, user, isCurrentPasswordValid, passwordValidation, isDifferent, hashedNewPassword, error_11;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                validationResult = schema_1.changePasswordSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res.status(400).json({
                            'message': 'Invalid input data',
                            'errors': validationResult.error.errors
                        })];
                }
                _a = validationResult.data, currentPassword = _a.currentPassword, newPassword = _a.newPassword;
                userId = req.user.id;
                return [4 /*yield*/, storage_1.storage.getUser(userId)];
            case 1:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ 'message': 'User not found' })];
                }
                return [4 /*yield*/, (0, password_1.verifyPassword)(currentPassword, user.password || '')];
            case 2:
                isCurrentPasswordValid = _c.sent();
                if (!isCurrentPasswordValid) {
                    return [2 /*return*/, res.status(401).json({ 'message': 'كلمة المرور الحالية غير صحيحة' })];
                }
                passwordValidation = (0, password_1.validatePasswordStrength)(newPassword);
                if (!passwordValidation.isValid) {
                    return [2 /*return*/, res.status(400).json({ 'message': passwordValidation.message })];
                }
                return [4 /*yield*/, (0, password_1.isPasswordDifferent)(newPassword, (_b = user.password) !== null && _b !== void 0 ? _b : '')];
            case 3:
                isDifferent = _c.sent();
                if (!isDifferent) {
                    return [2 /*return*/, res.status(400).json({ 'message': 'كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية' })];
                }
                return [4 /*yield*/, (0, password_1.hashPassword)(newPassword)];
            case 4:
                hashedNewPassword = _c.sent();
                // Update password
                return [4 /*yield*/, storage_1.storage.updateUserPassword(userId, hashedNewPassword)];
            case 5:
                // Update password
                _c.sent();
                logger_1.log.info("Password changed successfully for user ".concat(userId), undefined, 'AUTH');
                res.json({ 'success': true, 'message': 'تم تغيير كلمة المرور بنجاح' });
                return [3 /*break*/, 7];
            case 6:
                error_11 = _c.sent();
                logger_1.log.error('Error changing password:', error_11, 'AUTH');
                res.status(500).json({ 'message': 'Failed to change password' });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
/**
 * Update Profile Endpoint
 * PUT /api/auth/update-profile
 */
router.put('/update-profile', auth_1.isAuthenticated, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, firstName, lastName, profileImageUrl, updateData, updatedUser, error_12;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = req.user.id;
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, profileImageUrl = _a.profileImageUrl;
                // Validate input
                if (firstName && firstName.length < 2) {
                    return [2 /*return*/, res.status(400).json({ 'message': 'First name must be at least 2 characters' })];
                }
                if (lastName && lastName.length < 2) {
                    return [2 /*return*/, res.status(400).json({ 'message': 'Last name must be at least 2 characters' })];
                }
                updateData = { 'updatedAt': new Date() };
                if (firstName) {
                    updateData.firstName = firstName;
                }
                if (lastName) {
                    updateData.lastName = lastName;
                }
                if (profileImageUrl) {
                    updateData.profileImageUrl = profileImageUrl;
                }
                return [4 /*yield*/, storage_1.storage.updateUser(userId, updateData)];
            case 1:
                updatedUser = _b.sent();
                logger_1.log.info("Profile updated for user ".concat(userId), updateData, 'AUTH');
                res.json({
                    'success': true,
                    'message': 'تم تحديث الملف الشخصي بنجاح',
                    'user': {
                        'id': updatedUser.id,
                        'email': updatedUser.email,
                        'firstName': updatedUser.firstName,
                        'lastName': updatedUser.lastName,
                        'profileImageUrl': updatedUser.profileImageUrl
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_12 = _b.sent();
                logger_1.log.error('Error updating profile:', error_12, 'AUTH');
                res.status(500).json({ 'message': 'Failed to update profile' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Forgot Password Endpoint
 * POST /api/auth/forgot-password
 */
router.post('/forgot-password', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, email, user, resetToken, error_13;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                validationResult = schema_1.forgotPasswordSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res.status(400).json({
                            'message': 'Invalid input data',
                            'errors': validationResult.error.errors
                        })];
                }
                email = validationResult.data.email;
                return [4 /*yield*/, storage_1.storage.getUserByEmail(email)];
            case 1:
                user = _b.sent();
                if (!user) {
                    // Don't reveal if user exists or not for security
                    return [2 /*return*/, res.json({ 'success': true, 'message': 'تم إرسال رابط إعادة تعيين كلمة المرور' })];
                }
                // Check if user is active
                if (!user.isActive) {
                    return [2 /*return*/, res.json({ 'success': true, 'message': 'تم إرسال رابط إعادة تعيين كلمة المرور' })];
                }
                resetToken = (0, password_1.generateSecureToken)();
                // Set reset token in database
                return [4 /*yield*/, storage_1.storage.setPasswordResetToken(user.id, resetToken)];
            case 2:
                // Set reset token in database
                _b.sent();
                // Send reset email
                return [4 /*yield*/, (0, email_1.sendPasswordResetEmail)(email, resetToken, (_a = user.firstName) !== null && _a !== void 0 ? _a : "User")];
            case 3:
                // Send reset email
                _b.sent();
                logger_1.log.info("Password reset requested for email ".concat(email), undefined, 'AUTH');
                res.json({ 'success': true, 'message': 'تم إرسال رابط إعادة تعيين كلمة المرور' });
                return [3 /*break*/, 5];
            case 4:
                error_13 = _b.sent();
                logger_1.log.error('Error processing forgot password:', error_13, 'AUTH');
                res.status(500).json({ 'message': 'Failed to process forgot password request' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Reset Password Endpoint
 * POST /api/auth/reset-password
 */
router.post('/reset-password', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, _a, token, newPassword, passwordValidation, hashedPassword, user, error_14;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                validationResult = schema_1.resetPasswordSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res.status(400).json({
                            'message': 'Invalid input data',
                            'errors': validationResult.error.errors
                        })];
                }
                _a = validationResult.data, token = _a.token, newPassword = _a.newPassword;
                passwordValidation = (0, password_1.validatePasswordStrength)(newPassword);
                if (!passwordValidation.isValid) {
                    return [2 /*return*/, res.status(400).json({ 'message': passwordValidation.message })];
                }
                return [4 /*yield*/, (0, password_1.hashPassword)(newPassword)];
            case 1:
                hashedPassword = _b.sent();
                return [4 /*yield*/, storage_1.storage.resetPasswordWithToken(token, hashedPassword)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ 'message': 'Token غير صالح أو منتهي الصلاحية' })];
                }
                logger_1.log.info("Password reset successful for user ".concat(user.id), undefined, 'AUTH');
                res.json({ 'success': true, 'message': 'تم إعادة تعيين كلمة المرور بنجاح' });
                return [3 /*break*/, 4];
            case 3:
                error_14 = _b.sent();
                logger_1.log.error('Error resetting password:', error_14, 'AUTH');
                res.status(500).json({ 'message': 'Failed to reset password' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * Verify Email Endpoint
 * POST /api/auth/verify-email
 */
router.post('/verify-email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validationResult, token, user, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                validationResult = schema_1.verifyEmailSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return [2 /*return*/, res.status(400).json({
                            'message': 'Invalid input data',
                            'errors': validationResult.error.errors
                        })];
                }
                token = validationResult.data.token;
                return [4 /*yield*/, storage_1.storage.verifyEmailWithToken(token)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ 'message': 'Token غير صالح أو منتهي الصلاحية' })];
                }
                logger_1.log.info("Email verified for user ".concat(user.id), undefined, 'AUTH');
                res.json({ 'success': true, 'message': 'تم التحقق من البريد الإلكتروني بنجاح' });
                return [3 /*break*/, 3];
            case 2:
                error_15 = _a.sent();
                logger_1.log.error('Error verifying email:', error_15, 'AUTH');
                res.status(500).json({ 'message': 'Failed to verify email' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Resend Verification Email Endpoint
 * POST /api/auth/resend-verification
 */
router.post('/resend-verification', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, verificationToken, error_16;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                email = req.body.email;
                if (!email) {
                    return [2 /*return*/, res.status(400).json({ 'message': 'Email is required' })];
                }
                return [4 /*yield*/, storage_1.storage.getUserByEmail(email)];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ 'message': 'User not found' })];
                }
                // Check if email is already verified
                if (user.emailVerified) {
                    return [2 /*return*/, res.status(400).json({ 'message': 'Email is already verified' })];
                }
                verificationToken = (0, password_1.generateSecureToken)();
                // Set verification token
                return [4 /*yield*/, storage_1.storage.setEmailVerificationToken(user.id, verificationToken)];
            case 2:
                // Set verification token
                _b.sent();
                // Send verification email
                return [4 /*yield*/, (0, email_1.sendVerificationEmail)(email, verificationToken, (_a = user.firstName) !== null && _a !== void 0 ? _a : "User")];
            case 3:
                // Send verification email
                _b.sent();
                logger_1.log.info("Verification email resent to ".concat(email), undefined, 'AUTH');
                res.json({ 'success': true, 'message': 'تم إعادة إرسال رابط التحقق' });
                return [3 /*break*/, 5];
            case 4:
                error_16 = _b.sent();
                logger_1.log.error('Error resending verification email:', error_16, 'AUTH');
                res.status(500).json({ 'message': 'Failed to resend verification email' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Session Endpoint
 * GET /api/auth/session
 */
router.get('/session', auth_1.optionalAuth, function (req, res) {
    if (req.user) {
        res.json({
            'isAuthenticated': true,
            'user': req.user
        });
    }
    else {
        res.json({
            'isAuthenticated': false,
            'user': null
        });
    }
});
exports.default = router;
