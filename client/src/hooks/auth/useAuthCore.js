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
exports.useAuthCore = void 0;
var react_1 = require("react");
var auth_1 = require("../../services/auth");
var authUtils_1 = require("../../lib/authUtils");
var useUserStore_1 = require("../../stores/useUserStore");
// Type conversion function to convert User to AppUser
var convertUserToAppUser = function (user) {
    var _a, _b, _c;
    return {
        sub: user.sub,
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: (_a = user.profileImageUrl) !== null && _a !== void 0 ? _a : null,
        role: user.role,
        companyId: (_b = user.companyId) !== null && _b !== void 0 ? _b : null,
        permissions: user.permissions,
        companies: user.companies,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive,
        emailVerified: user.emailVerified,
        lastLoginAt: user.lastLoginAt,
        claims: (_c = user.claims) !== null && _c !== void 0 ? _c : null
    };
};
/**
 * Core Authentication Hook - Single Responsibility Principle
 * Handles only authentication state and basic operations
 */
var useAuthCore = function () {
    var _a = (0, useUserStore_1.useUserActions)(), setUser = _a.setUser, updateUser = _a.updateUser, setLoading = _a.setLoading, setError = _a.setError, storeLogout = _a["logout"], clearUser = _a.clearUser, initializeFromSession = _a.initializeFromSession;
    var user = (0, useUserStore_1.useCurrentUser)();
    var currentCompany = (0, useUserStore_1.useCurrentCompany)();
    var permissions = (0, useUserStore_1.useUserPermissions)();
    var isAuthenticated = (0, useUserStore_1.useIsUserAuthenticated)();
    var loading = (0, useUserStore_1.useUserLoading)();
    var error = (0, useUserStore_1.useUserError)();
    /**
     * Core login functionality
     */
    var login = (0, react_1.useCallback)(function (credentials) { return __awaiter(void 0, void 0, void 0, function () {
        var response, unifiedUser, appUser, error_1, errorMessage;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, auth_1.AuthService.login(credentials)];
                case 1:
                    response = _b.sent();
                    if (response.success && response.user) {
                        unifiedUser = authUtils_1.AuthUtils.createUnifiedUser(response.user);
                        appUser = convertUserToAppUser(unifiedUser);
                        setUser(appUser);
                        return [2 /*return*/, { 'success': true, 'user': unifiedUser }];
                    }
                    else {
                        throw new Error((_a = response.message) !== null && _a !== void 0 ? _a : "Login failed");
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _b.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'Login failed';
                    setError(errorMessage);
                    return [2 /*return*/, { 'success': false, 'error': errorMessage }];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [setUser, setLoading, setError]);
    /**
     * Core logout functionality
     */
    var logout = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, auth_1.AuthService.logout()];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    storeLogout();
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [storeLogout, setLoading]);
    /**
     * Core user retrieval
     */
    var getCurrentUser = (0, react_1.useCallback)(function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
        var user_1, appUser, error_2, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    setError(null);
                    return [4 /*yield*/, auth_1.AuthService.getCurrentUser(companyId)];
                case 1:
                    user_1 = _a.sent();
                    appUser = convertUserToAppUser(user_1);
                    setUser(appUser);
                    return [2 /*return*/, { 'success': true, user: user_1 }];
                case 2:
                    error_2 = _a.sent();
                    errorMessage = error_2 instanceof Error ? error_2.message : 'Failed to get user';
                    setError(errorMessage);
                    return [2 /*return*/, { 'success': false, 'error': errorMessage }];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [setUser, setLoading, setError]);
    return {
        // State
        user: user,
        currentCompany: currentCompany,
        permissions: permissions,
        isAuthenticated: isAuthenticated,
        loading: loading,
        error: error,
        // Core Actions
        login: login,
        logout: logout,
        getCurrentUser: getCurrentUser,
        // Store Actions
        setUser: setUser,
        updateUser: updateUser,
        setLoading: setLoading,
        setError: setError,
        clearUser: clearUser,
        initializeFromSession: initializeFromSession
    };
};
exports.useAuthCore = useAuthCore;
