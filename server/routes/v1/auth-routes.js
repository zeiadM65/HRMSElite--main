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
exports.privateAuthRouter = exports.publicAuthRouter = void 0;
var express_1 = require("express");
var storage_1 = require("../../models/storage");
var logger_1 = require("../../utils/logger");
var auth_1 = require("../../middleware/auth");
var password_1 = require("../../utils/password");
var email_1 = require("../../utils/email");
var schema_1 = require("@shared/schema");
var api_versioning_1 = require("../../middleware/api-versioning");
var etag_1 = require("../../utils/etag");
var metrics_1 = require("../../middleware/metrics");
var node_crypto_1 = __importDefault(require("node:crypto"));
exports.publicAuthRouter = (0, express_1.Router)();
exports.privateAuthRouter = (0, express_1.Router)();
// Prevent caching of all auth-related responses
exports.publicAuthRouter.use(function (_req, res, next) {
    res.setHeader('Cache-Control', 'no-store');
    next();
});
exports.privateAuthRouter.use(function (_req, res, next) {
    res.setHeader('Cache-Control', 'no-store');
    next();
});
/**
 * Unified User Endpoint - Primary endpoint for all user operations
 * GET /api/v1/auth/user
 * Returns current user with company context
 */
exports.privateAuthRouter.get('/user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, companyId_1, user, errorResponse, userCompanies, currentCompany, errorResponse, permissions, userData, etag, response, error_1, errorResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.user.id;
                companyId_1 = req.query.companyId;
                return [4 /*yield*/, storage_1.storage.getUser(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('NOT_FOUND', 'User not found', { resource: 'user', id: userId }, 404);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.getUserCompanies(userId)];
            case 2:
                userCompanies = _a.sent();
                currentCompany = null;
                if (companyId_1) {
                    currentCompany = userCompanies.find(function (company) { return company.id === companyId_1; });
                    if (!currentCompany) {
                        errorResponse = (0, api_versioning_1.createErrorResponse)('AUTHORIZATION_ERROR', 'No access to specified company', {
                            requiredCompany: companyId_1,
                            userCompanies: userCompanies.map(function (c) { return c.id; })
                        }, 403);
                        return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                    }
                }
                return [4 /*yield*/, storage_1.storage.getUserPermissions(userId, currentCompany === null || currentCompany === void 0 ? void 0 : currentCompany.id)];
            case 3:
                permissions = _a.sent();
                userData = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profileImageUrl: user.profileImageUrl,
                    role: user.role,
                    companyId: (currentCompany === null || currentCompany === void 0 ? void 0 : currentCompany.id) || user.companyId,
                    permissions: permissions,
                    isActive: user.isActive,
                    sub: user.id,
                    claims: null,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    companies: userCompanies,
                    currentCompanyId: currentCompany === null || currentCompany === void 0 ? void 0 : currentCompany.id
                };
                etag = (0, etag_1.generateETag)(userData);
                (0, etag_1.setETagHeader)(res, etag);
                response = (0, api_versioning_1.createSuccessResponse)(userData, 'User data retrieved successfully');
                res.json(response);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                logger_1.log.error('Error fetching user data:', error_1);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Failed to fetch user data', { message: 'An error occurred while retrieving user data' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Login endpoint
 * POST /api/v1/auth/login
 */
exports.publicAuthRouter.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, rememberMe, validationResult, errorResponse, user, errorResponse, errorResponse, isValidPassword, errorResponse, token, refreshToken, userCompanies, permissions, userData, loginResponse, response, error_2, errorResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password, rememberMe = _a.rememberMe;
                validationResult = schema_1.loginSchema.safeParse({ email: email, password: password });
                if (!validationResult.success) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid login data', {
                        details: validationResult.error.issues,
                        message: 'Login data validation failed'
                    }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.getUserByEmail(email)];
            case 1:
                user = _b.sent();
                if (!user) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('AUTHENTICATION_ERROR', 'Invalid credentials', { reason: 'invalid_credentials' }, 401);
                    metrics_1.metricsUtils.incrementLoginFailure('invalid_credentials');
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                // Check if user is active
                if (!user.isActive) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('AUTHENTICATION_ERROR', 'Account is deactivated', { reason: 'account_deactivated' }, 401);
                    metrics_1.metricsUtils.incrementLoginFailure('account_deactivated');
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, (0, password_1.verifyPassword)(password, user.password)];
            case 2:
                isValidPassword = _b.sent();
                if (!isValidPassword) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('AUTHENTICATION_ERROR', 'Invalid credentials', { reason: 'invalid_credentials' }, 401);
                    metrics_1.metricsUtils.incrementLoginFailure('invalid_credentials');
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                token = (0, auth_1.generateJWTToken)(user);
                refreshToken = (0, auth_1.generateRefreshToken)(user);
                // Set cookies
                (0, auth_1.setAuthCookies)(res, token, refreshToken, rememberMe);
                return [4 /*yield*/, storage_1.storage.getUserCompanies(user.id)];
            case 3:
                userCompanies = _b.sent();
                return [4 /*yield*/, storage_1.storage.getUserPermissions(user.id, user.companyId)];
            case 4:
                permissions = _b.sent();
                userData = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profileImageUrl: user.profileImageUrl,
                    role: user.role,
                    companyId: user.companyId,
                    permissions: permissions,
                    isActive: user.isActive,
                    sub: user.id,
                    claims: null,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    companies: userCompanies,
                    currentCompanyId: user.companyId
                };
                loginResponse = {
                    user: userData
                };
                response = (0, api_versioning_1.createSuccessResponse)(loginResponse, 'Login successful');
                metrics_1.metricsUtils.incrementAuthSuccess(req.method, user.role);
                res.json(response);
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                logger_1.log.error('Login error:', error_2);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Login failed', { message: 'An error occurred during login' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * Register endpoint
 * POST /api/v1/auth/register
 */
exports.publicAuthRouter.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, confirmPassword, firstName, lastName, companyName, role, validationResult, errorResponse, existingUser, errorResponse, hashedPassword, userData, user, company, token, refreshToken, userDataResponse, registerResponse, response, error_3, errorResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = req.body, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, firstName = _a.firstName, lastName = _a.lastName, companyName = _a.companyName, role = _a.role;
                validationResult = schema_1.registerUserSchema.safeParse({
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    firstName: firstName,
                    lastName: lastName,
                    companyName: companyName,
                    role: role
                });
                if (!validationResult.success) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid registration data', {
                        details: validationResult.error.issues,
                        message: 'Registration data validation failed'
                    }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.getUserByEmail(email)];
            case 1:
                existingUser = _b.sent();
                if (existingUser) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('CONFLICT', 'User already exists', {
                        resource: 'user',
                        field: 'email',
                        value: email
                    }, 409);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, (0, password_1.hashPassword)(password)];
            case 2:
                hashedPassword = _b.sent();
                userData = {
                    email: email,
                    password: hashedPassword,
                    firstName: firstName,
                    lastName: lastName,
                    role: role || 'user',
                    isActive: true,
                    emailVerified: false,
                    verificationToken: (0, password_1.generateSecureToken)(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                return [4 /*yield*/, storage_1.storage.createUser(userData)];
            case 3:
                user = _b.sent();
                company = null;
                if (!companyName) return [3 /*break*/, 6];
                return [4 /*yield*/, storage_1.storage.createCompany({
                        name: companyName,
                        ownerId: user.id,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })];
            case 4:
                company = _b.sent();
                // Associate user with company
                return [4 /*yield*/, storage_1.storage.associateUserWithCompany(user.id, company.id, 'owner')];
            case 5:
                // Associate user with company
                _b.sent();
                _b.label = 6;
            case 6:
                token = (0, auth_1.generateJWTToken)(user);
                refreshToken = (0, auth_1.generateRefreshToken)(user);
                // Set cookies
                (0, auth_1.setAuthCookies)(res, token, refreshToken, false);
                if (!(user.emailVerified === false)) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, email_1.sendVerificationEmail)(user.email, user.verificationToken)];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                userDataResponse = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profileImageUrl: user.profileImageUrl,
                    role: user.role,
                    companyId: (company === null || company === void 0 ? void 0 : company.id) || null,
                    permissions: ['user'],
                    isActive: user.isActive,
                    sub: user.id,
                    claims: null,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    companies: company ? [{
                            id: company.id,
                            name: company.name,
                            logoUrl: company.logoUrl
                        }] : [],
                    currentCompanyId: company === null || company === void 0 ? void 0 : company.id
                };
                registerResponse = {
                    user: userDataResponse
                };
                response = (0, api_versioning_1.createSuccessResponse)(registerResponse, 'Registration successful');
                res.status(200).json(response);
                return [3 /*break*/, 10];
            case 9:
                error_3 = _b.sent();
                logger_1.log.error('Registration error:', error_3);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Registration failed', { message: 'An error occurred during registration' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
/**
 * Logout endpoint
 * POST /api/v1/auth/logout
 */
exports.privateAuthRouter.post('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, response, error_4, errorResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                refreshToken = (0, auth_1.getRefreshTokenFromRequest)(req);
                if (!refreshToken) return [3 /*break*/, 2];
                // Invalidate refresh token
                return [4 /*yield*/, storage_1.storage.invalidateRefreshToken(refreshToken)];
            case 1:
                // Invalidate refresh token
                _a.sent();
                _a.label = 2;
            case 2:
                // Clear cookies
                (0, auth_1.clearAuthCookies)(res);
                response = (0, api_versioning_1.createSuccessResponse)({ message: 'Logout successful' }, 'Logout successful');
                res.json(response);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                logger_1.log.error('Logout error:', error_4);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Logout failed', { message: 'An error occurred during logout' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * Refresh token endpoint
 * POST /api/v1/auth/refresh
 */
exports.publicAuthRouter.post('/refresh', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, errorResponse, payload, errorResponse, isBlacklisted, errorResponse, user, errorResponse, oldRecord, newToken, newRefreshToken, newPayload, refreshResponse, response, error_5, errorResponse;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                refreshToken = (0, auth_1.getRefreshTokenFromRequest)(req);
                if (!refreshToken) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('AUTHENTICATION_ERROR', 'Refresh token required', { reason: 'missing_refresh_token' }, 401);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                payload = (0, auth_1.verifyRefreshToken)(refreshToken);
                if (!payload) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('AUTHENTICATION_ERROR', 'Invalid refresh token', { reason: 'invalid_refresh_token' }, 401);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.isRefreshTokenBlacklisted(refreshToken)];
            case 1:
                isBlacklisted = _d.sent();
                if (isBlacklisted) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('AUTHENTICATION_ERROR', 'Token has been revoked', { reason: 'token_revoked' }, 401);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.getUser(payload.userId)];
            case 2:
                user = _d.sent();
                if (!user || !user.isActive) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('AUTHENTICATION_ERROR', 'User not found or inactive', { reason: 'user_inactive' }, 401);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.invalidateRefreshToken(refreshToken)];
            case 3:
                oldRecord = _d.sent();
                newToken = (0, auth_1.generateJWTToken)(user);
                newRefreshToken = (0, auth_1.generateRefreshToken)(user);
                newPayload = (0, auth_1.verifyRefreshToken)(newRefreshToken);
                // Store new refresh token
                return [4 /*yield*/, storage_1.storage.createRefreshToken({
                        userId: user.id,
                        tokenHash: (0, auth_1.hashToken)(newRefreshToken),
                        familyId: (_a = oldRecord === null || oldRecord === void 0 ? void 0 : oldRecord.familyId) !== null && _a !== void 0 ? _a : node_crypto_1.default.randomUUID(),
                        expiresAt: new Date(((_b = newPayload === null || newPayload === void 0 ? void 0 : newPayload.exp) !== null && _b !== void 0 ? _b : 0) * 1000),
                        userAgent: (_c = req.get('User-Agent')) !== null && _c !== void 0 ? _c : '',
                        ip: req.ip
                    })];
            case 4:
                // Store new refresh token
                _d.sent();
                // Set new cookies
                (0, auth_1.setAuthCookies)(res, newToken, newRefreshToken, false);
                refreshResponse = {
                    message: 'Token refreshed successfully'
                };
                response = (0, api_versioning_1.createSuccessResponse)(refreshResponse, 'Token refreshed successfully');
                res.json(response);
                return [3 /*break*/, 6];
            case 5:
                error_5 = _d.sent();
                logger_1.log.error('Token refresh error:', error_5);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Token refresh failed', { message: 'An error occurred during token refresh' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
/**
 * Forgot password endpoint
 * POST /api/v1/auth/forgot-password
 */
exports.publicAuthRouter.post('/forgot-password', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, validationResult, errorResponse, user, response_1, resetToken, resetTokenExpiry, response, error_6, errorResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                validationResult = schema_1.forgotPasswordSchema.safeParse({ email: email });
                if (!validationResult.success) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid email', {
                        details: validationResult.error.issues,
                        message: 'Email validation failed'
                    }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.getUserByEmail(email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    response_1 = (0, api_versioning_1.createSuccessResponse)({ message: 'If the email exists, a reset link has been sent' }, 'Password reset email sent');
                    return [2 /*return*/, res.json(response_1)];
                }
                resetToken = (0, password_1.generateSecureToken)();
                resetTokenExpiry = new Date(Date.now() + 3600000);
                // Update user with reset token
                return [4 /*yield*/, storage_1.storage.updateUser(user.id, {
                        resetToken: resetToken,
                        resetTokenExpiry: resetTokenExpiry,
                        updatedAt: new Date()
                    })];
            case 2:
                // Update user with reset token
                _a.sent();
                // Send reset email
                return [4 /*yield*/, (0, email_1.sendPasswordResetEmail)(email, resetToken)];
            case 3:
                // Send reset email
                _a.sent();
                response = (0, api_versioning_1.createSuccessResponse)({ message: 'If the email exists, a reset link has been sent' }, 'Password reset email sent');
                res.json(response);
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                logger_1.log.error('Forgot password error:', error_6);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Password reset failed', { message: 'An error occurred during password reset' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Reset password endpoint
 * POST /api/v1/auth/reset-password
 */
exports.publicAuthRouter.post('/reset-password', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, password, confirmPassword, validationResult, errorResponse, user, errorResponse, errorResponse, hashedPassword, response, error_7, errorResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, token = _a.token, password = _a.password, confirmPassword = _a.confirmPassword;
                validationResult = schema_1.resetPasswordSchema.safeParse({
                    token: token,
                    password: password,
                    confirmPassword: confirmPassword
                });
                if (!validationResult.success) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid reset data', {
                        details: validationResult.error.issues,
                        message: 'Reset data validation failed'
                    }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.getUserByResetToken(token)];
            case 1:
                user = _b.sent();
                if (!user) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid reset token', { message: 'Reset token is invalid or expired' }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                // Check if token is expired
                if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Reset token expired', { message: 'Reset token has expired' }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, (0, password_1.hashPassword)(password)];
            case 2:
                hashedPassword = _b.sent();
                // Update user
                return [4 /*yield*/, storage_1.storage.updateUser(user.id, {
                        password: hashedPassword,
                        resetToken: null,
                        resetTokenExpiry: null,
                        updatedAt: new Date()
                    })];
            case 3:
                // Update user
                _b.sent();
                response = (0, api_versioning_1.createSuccessResponse)({ message: 'Password reset successful' }, 'Password reset successful');
                res.json(response);
                return [3 /*break*/, 5];
            case 4:
                error_7 = _b.sent();
                logger_1.log.error('Reset password error:', error_7);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Password reset failed', { message: 'An error occurred during password reset' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * Verify email endpoint
 * POST /api/v1/auth/verify-email
 */
exports.publicAuthRouter.post('/verify-email', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, validationResult, errorResponse, user, errorResponse, response, error_8, errorResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                token = req.body.token;
                validationResult = schema_1.verifyEmailSchema.safeParse({ token: token });
                if (!validationResult.success) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid verification token', {
                        details: validationResult.error.issues,
                        message: 'Verification token validation failed'
                    }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                return [4 /*yield*/, storage_1.storage.getUserByVerificationToken(token)];
            case 1:
                user = _a.sent();
                if (!user) {
                    errorResponse = (0, api_versioning_1.createErrorResponse)('VALIDATION_ERROR', 'Invalid verification token', { message: 'Verification token is invalid' }, 400);
                    return [2 /*return*/, res.status(errorResponse.statusCode).json(errorResponse.body)];
                }
                // Update user
                return [4 /*yield*/, storage_1.storage.updateUser(user.id, {
                        emailVerified: true,
                        verificationToken: null,
                        updatedAt: new Date()
                    })];
            case 2:
                // Update user
                _a.sent();
                response = (0, api_versioning_1.createSuccessResponse)({ message: 'Email verified successfully' }, 'Email verified successfully');
                res.json(response);
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                logger_1.log.error('Email verification error:', error_8);
                errorResponse = (0, api_versioning_1.createErrorResponse)('INTERNAL_ERROR', 'Email verification failed', { message: 'An error occurred during email verification' }, 500);
                res.status(errorResponse.statusCode).json(errorResponse.body);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
