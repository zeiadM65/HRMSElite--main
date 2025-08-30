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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompanyActions = exports.useEmployeeActions = exports.useAppActions = exports.useAuthActions = exports.useAPIOperations = exports.useAppLanguage = exports.useAppTheme = exports.useLastSyncTime = exports.useIsDataStale = exports.useHydrationComplete = exports.useIsInitialized = exports.useError = exports.useIsLoading = exports.useActiveEmployees = exports.useTotalEmployees = exports.useCompanyName = exports.useUserFullName = exports.useUserRole = exports.useIsAuthenticated = exports.useEmployees = exports.useCompany = exports.useUser = exports.useAppStore = void 0;
var zustand_1 = require("zustand");
var middleware_1 = require("zustand/middleware");
var constants_1 = require("../lib/constants");
var logger_1 = require("../lib/logger");
var logger_2 = __importDefault(require("../lib/logger"));
var i18n_1 = __importDefault(require("../lib/i18n"));
// Type guard for error responses
var isErrorResponse = function (data) {
    return typeof data === 'object' && data !== null && ('message' in data || 'error' in data);
};
// Safe error message extraction
var getErrorMessage = function (data, fallback) {
    var _a, _b;
    if (isErrorResponse(data)) {
        return (_b = (_a = data.message) !== null && _a !== void 0 ? _a : data.error) !== null && _b !== void 0 ? _b : fallback;
    }
    return fallback;
};
// Enhanced fetch function with retry logic
var fetchWithRetry = function (url_1, options_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([url_1, options_1], args_1, true), void 0, function (url, options, maxRetries) {
        var requestOptions, _loop_1, attempt, state_1;
        if (maxRetries === void 0) { maxRetries = 3; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requestOptions = __assign({ 'credentials': 'include' }, options);
                    _loop_1 = function (attempt) {
                        var response, data, delay_1, error_1, delay_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 8, , 12]);
                                    return [4 /*yield*/, fetch(url, requestOptions)];
                                case 1:
                                    response = _b.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.json()];
                                case 2:
                                    data = _b.sent();
                                    return [2 /*return*/, { value: data }];
                                case 3:
                                    if (!(response.status === 401)) return [3 /*break*/, 4];
                                    // Unauthorized - don't retry
                                    logger_1.log.warn('Unauthorized request, not retrying', null, 'API');
                                    return [2 /*return*/, { value: null }];
                                case 4:
                                    if (!(response.status >= 500 && attempt < maxRetries)) return [3 /*break*/, 6];
                                    delay_1 = Math.pow(2, attempt) * 1000;
                                    logger_1.log.warn("Server error (".concat(response.status, "), retrying in ").concat(delay_1, "ms (attempt ").concat(attempt, "/").concat(maxRetries, ")"), null, 'API');
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_1); })];
                                case 5:
                                    _b.sent();
                                    return [2 /*return*/, "continue"];
                                case 6:
                                    // Other errors - don't retry
                                    logger_1.log.error("Request failed with status ".concat(response.status), null, 'API');
                                    return [2 /*return*/, { value: null }];
                                case 7: return [3 /*break*/, 12];
                                case 8:
                                    error_1 = _b.sent();
                                    if (!(attempt < maxRetries)) return [3 /*break*/, 10];
                                    delay_2 = Math.pow(2, attempt) * 1000;
                                    logger_1.log.warn("Network error, retrying in ".concat(delay_2, "ms (attempt ").concat(attempt, "/").concat(maxRetries, ")"), null, 'API');
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay_2); })];
                                case 9:
                                    _b.sent();
                                    return [3 /*break*/, 11];
                                case 10:
                                    logger_1.log.error('Max retries reached:', error_1, 'API');
                                    throw error_1;
                                case 11: return [3 /*break*/, 12];
                                case 12: return [2 /*return*/];
                            }
                        });
                    };
                    attempt = 1;
                    _a.label = 1;
                case 1:
                    if (!(attempt <= maxRetries)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(attempt)];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _a.label = 3;
                case 3:
                    attempt++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, null];
            }
        });
    });
};
// Validation functions
var isValidUser = function (user) {
    return Boolean(user &&
        typeof user === 'object' &&
        user !== null &&
        'id' in user &&
        typeof user.id === 'string' &&
        user.id.trim() !== '');
};
var isValidCompany = function (company) {
    return Boolean(company &&
        typeof company === 'object' &&
        company !== null &&
        'id' in company &&
        'name' in company &&
        typeof company.id === 'string' &&
        typeof company.name === 'string' &&
        company.id.trim() !== '' &&
        company.name.trim() !== '');
};
exports.useAppStore = (0, zustand_1.create)()((0, middleware_1.persist)(function (set, get) { return ({
    // Initial state
    'user': null,
    'company': null,
    'employees': [],
    'isLoading': false,
    'error': null,
    'isInitialized': false,
    'hydrationComplete': false,
    'lastSyncTime': null,
    'theme': 'system',
    'language': 'en',
    // Actions
    'setUser': function (user) { return set({ user: user }); },
    'setCompany': function (company) { return set({ company: company }); },
    'setEmployees': function (employees) { return set({ employees: employees }); },
    'setLoading': function (loading) { return set({ 'isLoading': loading }); },
    'setError': function (error) { return set({ error: error }); },
    'setInitialized': function (initialized) { return set({ 'isInitialized': initialized }); },
    'setHydrationComplete': function (complete) { return set({ 'hydrationComplete': complete }); },
    'setLastSyncTime': function (time) { return set({ 'lastSyncTime': time }); },
    'setTheme': function (theme) { return set({ theme: theme }); },
    'setLanguage': function (language) { return set({ 'language': language }); },
    // Computed values
    get 'isAuthenticated'() {
        var user = get().user;
        return !!user && typeof user === 'object' && user !== null && 'id' in user && typeof user.id === 'string';
    },
    get 'userRole'() {
        var user = get().user;
        return (user === null || user === void 0 ? void 0 : user.role) || null;
    },
    get 'userFullName'() {
        var user = get().user;
        if (!user) {
            return '';
        }
        return "".concat(user.firstName || '', " ").concat(user.lastName || '').trim() || i18n_1.default.t('common.user');
    },
    get 'companyName'() {
        var _a;
        var company = get().company;
        return (_a = company === null || company === void 0 ? void 0 : company.name) !== null && _a !== void 0 ? _a : '';
    },
    get 'totalEmployees'() {
        return get().employees.length;
    },
    get 'activeEmployees'() {
        return get().employees.filter(function (emp) { return emp.status === 'active'; }).length;
    },
    // Auth actions
    'login': function (user) { return set({
        user: user,
        'isLoading': false,
        'error': null,
        'isInitialized': true
    }); },
    'logout': function () { return set({
        'user': null,
        'company': null,
        'employees': [],
        'isLoading': false,
        'error': null,
        'isInitialized': true,
        'lastSyncTime': null
    }); },
    'updateUser': function (updates) { return set(function (state) { return ({
        'user': state.user ? __assign(__assign({}, state.user), updates) : null
    }); }); },
    'updateCompany': function (updates) { return set(function (state) { return ({
        'company': state.company ? __assign(__assign({}, state.company), updates) : null
    }); }); },
    // Employee actions
    'updateEmployee': function (id, data) { return __awaiter(void 0, void 0, void 0, function () {
        var response, updatedEmployee_1, errorData, errorMessage, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    set({ 'isLoading': true, 'error': null });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch(constants_1.EMPLOYEE_ENDPOINTS.UPDATE(id), {
                            'method': 'PATCH',
                            'headers': {
                                'Content-Type': 'application/json'
                            },
                            'credentials': 'include',
                            'body': JSON.stringify(data)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    updatedEmployee_1 = _a.sent();
                    set(function (state) { return ({
                        'employees': state.employees.map(function (emp) {
                            return emp.id === id ? __assign(__assign({}, emp), updatedEmployee_1) : emp;
                        }),
                        'isLoading': false,
                        'error': null
                    }); });
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                case 5:
                    errorData = _a.sent();
                    errorMessage = getErrorMessage(errorData, i18n_1.default.t('errors.employeeUpdateFailed'));
                    set({
                        'error': errorMessage,
                        'isLoading': false
                    });
                    throw new Error(errorMessage);
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    logger_2.default.error('Error updating employee:', error_2);
                    set({
                        'error': i18n_1.default.t('errors.serverConnection'),
                        'isLoading': false
                    });
                    throw error_2;
                case 8: return [2 /*return*/];
            }
        });
    }); },
    'archiveEmployee': function (id, reason) { return __awaiter(void 0, void 0, void 0, function () {
        var response, errorData, errorMessage, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    set({ 'isLoading': true, 'error': null });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(constants_1.EMPLOYEE_ENDPOINTS.ARCHIVE(id), {
                            'method': 'POST',
                            'headers': {
                                'Content-Type': 'application/json'
                            },
                            'credentials': 'include',
                            'body': JSON.stringify({ reason: reason })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    set(function (state) { return ({
                        'employees': state.employees.map(function (emp) {
                            return emp.id === id ? __assign(__assign({}, emp), { 'isArchived': true, 'archiveReason': reason }) : emp;
                        }),
                        'isLoading': false,
                        'error': null
                    }); });
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                case 4:
                    errorData = _a.sent();
                    errorMessage = getErrorMessage(errorData, i18n_1.default.t('errors.employeeArchiveFailed'));
                    set({
                        'error': errorMessage,
                        'isLoading': false
                    });
                    throw new Error(errorMessage);
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    logger_2.default.error('Error archiving employee:', error_3);
                    set({
                        'error': i18n_1.default.t('errors.serverConnection'),
                        'isLoading': false
                    });
                    throw error_3;
                case 7: return [2 /*return*/];
            }
        });
    }); },
    // Company actions
    'getCompanyStats': function (companyId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, stats, errorData, errorMessage, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    set({ 'isLoading': true, 'error': null });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch(constants_1.COMPANY_ENDPOINTS.GET_STATS(companyId), {
                            'method': 'GET',
                            'headers': {
                                'Content-Type': 'application/json'
                            },
                            'credentials': 'include'
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    stats = _a.sent();
                    set({ 'isLoading': false, 'error': null });
                    return [2 /*return*/, stats];
                case 4: return [4 /*yield*/, response.json().catch(function () { return ({}); })];
                case 5:
                    errorData = _a.sent();
                    errorMessage = getErrorMessage(errorData, i18n_1.default.t('errors.companyStatsLoadFailed'));
                    set({
                        'error': errorMessage,
                        'isLoading': false
                    });
                    throw new Error(errorMessage);
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_4 = _a.sent();
                    logger_2.default.error('Error loading company stats:', error_4);
                    set({
                        'error': i18n_1.default.t('errors.serverConnection'),
                        'isLoading': false
                    });
                    throw error_4;
                case 8: return [2 /*return*/];
            }
        });
    }); },
    // Utility actions
    'clearError': function () { return set({ 'error': null }); },
    'reset': function () { return set({
        'user': null,
        'company': null,
        'employees': [],
        'isLoading': false,
        'error': null,
        'isInitialized': false,
        'hydrationComplete': false,
        'lastSyncTime': null
    }); },
    // Enhanced data synchronization
    'syncData': function () { return __awaiter(void 0, void 0, void 0, function () {
        var state, userData, companyData, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = get();
                    if (!state.user) {
                        return [2 /*return*/, false];
                    }
                    set({ 'isLoading': true, 'error': null });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetchWithRetry(constants_1.AUTH_ENDPOINTS.ME, {
                            'method': 'GET',
                            'headers': { 'Content-Type': 'application/json' },
                            'credentials': 'include'
                        })];
                case 2:
                    userData = _a.sent();
                    if (!userData) return [3 /*break*/, 5];
                    set({ 'user': userData });
                    if (!userData['companyId']) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetchWithRetry(constants_1.COMPANY_ENDPOINTS.GET_BY_ID(userData['companyId']), {
                            'method': 'GET',
                            'headers': { 'Content-Type': 'application/json' },
                            'credentials': 'include'
                        })];
                case 3:
                    companyData = _a.sent();
                    if (companyData) {
                        set({ 'company': companyData });
                    }
                    _a.label = 4;
                case 4:
                    set({
                        'isLoading': false,
                        'lastSyncTime': Date.now()
                    });
                    return [2 /*return*/, true];
                case 5:
                    set({ 'isLoading': false });
                    return [2 /*return*/, false];
                case 6:
                    error_5 = _a.sent();
                    logger_2.default.error('Data sync failed:', error_5);
                    set({
                        'error': i18n_1.default.t('errors.dataSyncFailed'),
                        'isLoading': false
                    });
                    return [2 /*return*/, false];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    // Check if data is stale and needs refresh
    'isDataStale': function () {
        var state = get();
        if (!state.user || !state.company) {
            return true;
        }
        // Consider data stale after 5 minutes
        var lastUpdate = state.lastSyncTime;
        if (!lastUpdate) {
            return true;
        }
        var fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
        return lastUpdate < fiveMinutesAgo;
    },
    // Validation function
    'validateStoredData': function () {
        var state = get();
        var userValid = isValidUser(state.user);
        var companyValid = isValidCompany(state.company);
        // Log validation results for debugging
        logger_1.log.debug('Data validation:', {
            userValid: userValid,
            companyValid: companyValid,
            'hasUser': !!state.user,
            'hasCompany': !!state.company
        }, 'STORE');
        if (!userValid || !companyValid) {
            // Clear invalid data
            set({
                'user': userValid ? state.user : null,
                'company': companyValid ? state.company : null,
                'isInitialized': true,
                'hydrationComplete': true
            });
            return false;
        }
        return true;
    },
    // Simplified and improved initialization function
    'initializeApp': function () { return __awaiter(void 0, void 0, void 0, function () {
        var state, isValid, syncSuccess, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    set({ 'isLoading': true, 'error': null });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    // Wait for hydration to complete
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                case 2:
                    // Wait for hydration to complete
                    _a.sent();
                    state = get();
                    isValid = state.validateStoredData();
                    if (!(isValid && state.user && !state.isDataStale())) return [3 /*break*/, 3];
                    // Data is valid and fresh - no need to sync
                    logger_1.log.info('✅ App initialized with valid cached data', null, 'STORE');
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, state.syncData()];
                case 4:
                    syncSuccess = _a.sent();
                    if (!syncSuccess) {
                        logger_1.log.warn('⚠️ Failed to sync data during initialization', null, 'STORE');
                    }
                    _a.label = 5;
                case 5:
                    set({
                        'isInitialized': true,
                        'hydrationComplete': true,
                        'isLoading': false
                    });
                    logger_1.log.info('✅ App initialization completed', null, 'STORE');
                    return [3 /*break*/, 7];
                case 6:
                    error_6 = _a.sent();
                    logger_1.log.error('❌ Error during app initialization:', error_6, 'STORE');
                    set({
                        'error': i18n_1.default.t('errors.appInitFailed'),
                        'isLoading': false,
                        'isInitialized': true,
                        'hydrationComplete': true
                    });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); },
    // Simplified refresh function
    'refreshData': function () { return __awaiter(void 0, void 0, void 0, function () {
        var state, syncSuccess, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    state = get();
                    if (!state.user) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, state.syncData()];
                case 2:
                    syncSuccess = _a.sent();
                    if (syncSuccess) {
                        logger_1.log.info('✅ Data refreshed successfully', null, 'STORE');
                    }
                    else {
                        logger_1.log.warn('⚠️ Failed to refresh data', null, 'STORE');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    logger_1.log.error('❌ Error refreshing data:', error_7, 'STORE');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    // Cleanup functions
    'cleanup': function () {
        var state = get();
        // Clear any ongoing operations
        set({
            'isLoading': false,
            'error': null
        });
        // Clear stale data
        state.clearStaleData();
        logger_1.log.info('🧹 Store cleanup completed', null, 'STORE');
    },
    'clearStaleData': function () {
        var state = get();
        // Clear employees data as it's not persisted and can be stale
        if (state.employees.length > 0) {
            set({ 'employees': [] });
            logger_1.log.info('🗑️ Cleared stale employees data', null, 'STORE');
        }
        // Clear error state
        if (state.error) {
            set({ 'error': null });
        }
    }
}); }, {
    'name': 'hrms-app-store', // unique name for localStorage
    'partialize': function (state) { return ({
        'theme': state.theme,
        'language': state.language
    }); }, // persist only non-sensitive UI preferences
    'onRehydrateStorage': function () { return function (state) {
        // Called when hydration starts
        if (state) {
            state.setHydrationComplete(true);
        }
    }; }
}));
// Selector hooks for better performance
var useUser = function () { return (0, exports.useAppStore)(function (state) { return state.user; }); };
exports.useUser = useUser;
var useCompany = function () { return (0, exports.useAppStore)(function (state) { return state.company; }); };
exports.useCompany = useCompany;
var useEmployees = function () { return (0, exports.useAppStore)(function (state) { return state.employees; }); };
exports.useEmployees = useEmployees;
var useIsAuthenticated = function () { return (0, exports.useAppStore)(function (state) { return state.isAuthenticated; }); };
exports.useIsAuthenticated = useIsAuthenticated;
var useUserRole = function () { return (0, exports.useAppStore)(function (state) { return state.userRole; }); };
exports.useUserRole = useUserRole;
var useUserFullName = function () { return (0, exports.useAppStore)(function (state) { return state.userFullName; }); };
exports.useUserFullName = useUserFullName;
var useCompanyName = function () { return (0, exports.useAppStore)(function (state) { return state.companyName; }); };
exports.useCompanyName = useCompanyName;
var useTotalEmployees = function () { return (0, exports.useAppStore)(function (state) { return state.totalEmployees; }); };
exports.useTotalEmployees = useTotalEmployees;
var useActiveEmployees = function () { return (0, exports.useAppStore)(function (state) { return state.activeEmployees; }); };
exports.useActiveEmployees = useActiveEmployees;
var useIsLoading = function () { return (0, exports.useAppStore)(function (state) { return state.isLoading; }); };
exports.useIsLoading = useIsLoading;
var useError = function () { return (0, exports.useAppStore)(function (state) { return state.error; }); };
exports.useError = useError;
var useIsInitialized = function () { return (0, exports.useAppStore)(function (state) { return state.isInitialized; }); };
exports.useIsInitialized = useIsInitialized;
var useHydrationComplete = function () { return (0, exports.useAppStore)(function (state) { return state.hydrationComplete; }); };
exports.useHydrationComplete = useHydrationComplete;
var useIsDataStale = function () { return (0, exports.useAppStore)(function (state) { return state.isDataStale(); }); };
exports.useIsDataStale = useIsDataStale;
var useLastSyncTime = function () { return (0, exports.useAppStore)(function (state) { return state.lastSyncTime; }); };
exports.useLastSyncTime = useLastSyncTime;
var useAppTheme = function () { return (0, exports.useAppStore)(function (state) { return state.theme; }); };
exports.useAppTheme = useAppTheme;
var useAppLanguage = function () { return (0, exports.useAppStore)(function (state) { return state.language; }); };
exports.useAppLanguage = useAppLanguage;
// New hooks for simplified API operations
var useAPIOperations = function () { return (0, exports.useAppStore)(function (state) { return ({
    'syncData': state.syncData,
    'refreshData': state.refreshData,
    'isDataStale': state.isDataStale
}); }); };
exports.useAPIOperations = useAPIOperations;
// Action hooks
var useAuthActions = function () { return (0, exports.useAppStore)(function (state) { return ({
    'setUser': state.setUser,
    'setCompany': state.setCompany,
    'setEmployees': state.setEmployees,
    'login': state.login,
    'logout': state.logout,
    'updateUser': state.updateUser,
    'updateCompany': state.updateCompany,
    'reset': state.reset,
    'validateStoredData': state.validateStoredData,
    'initializeApp': state.initializeApp,
    'syncData': state.syncData,
    'refreshData': state.refreshData,
    'isDataStale': state.isDataStale
}); }); };
exports.useAuthActions = useAuthActions;
var useAppActions = function () { return (0, exports.useAppStore)(function (state) { return ({
    'setLoading': state.setLoading,
    'setError': state.setError,
    'clearError': state.clearError,
    'setInitialized': state.setInitialized,
    'setHydrationComplete': state.setHydrationComplete,
    'setLastSyncTime': state.setLastSyncTime,
    'cleanup': state.cleanup,
    'clearStaleData': state.clearStaleData
}); }); };
exports.useAppActions = useAppActions;
var useEmployeeActions = function () { return (0, exports.useAppStore)(function (state) { return ({
    'updateEmployee': state.updateEmployee,
    'archiveEmployee': state.archiveEmployee
}); }); };
exports.useEmployeeActions = useEmployeeActions;
var useCompanyActions = function () { return (0, exports.useAppStore)(function (state) { return ({
    'getCompanyStats': state.getCompanyStats
}); }); };
exports.useCompanyActions = useCompanyActions;
