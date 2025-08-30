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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserActions = exports.useUserError = exports.useUserLoading = exports.useCurrentCompany = exports.useUserPermissions = exports.useCurrentUserPermissions = exports.useCurrentUser = exports.useIsUserAuthenticated = exports.useCurrentUserCompanyId = exports.useCurrentUserRole = exports.useCurrentUserId = exports.useUserStore = void 0;
var zustand_1 = require("zustand");
var logger_1 = require("../lib/logger");
// Validation functions
var isValidUserData = function (user) {
    return user &&
        typeof user === 'object' &&
        typeof user.id === 'string' &&
        user.id.trim() !== '' &&
        typeof user.role === 'string' &&
        user.role.trim() !== '';
};
exports.useUserStore = (0, zustand_1.create)()(function (set, get) { return ({
    // Initial state
    'id': null,
    'role': null,
    'companyId': null,
    'isAuthenticated': false,
    'user': null,
    'permissions': [],
    'loading': false,
    'error': null,
    'currentCompany': null,
    // Actions
    'setUser': function (user) {
        var _a;
        if (isValidUserData(user)) {
            // Parse permissions from string to array
            var permissions = [];
            try {
                if (typeof user.permissions === 'string') {
                    permissions = JSON.parse(user.permissions || '[]');
                }
                else if (Array.isArray(user.permissions)) {
                    permissions = user.permissions;
                }
            }
            catch (_b) {
                permissions = [];
            }
            set({
                'id': user.id,
                'role': user.role,
                'companyId': (_a = user.companyId) !== null && _a !== void 0 ? _a : null,
                'isAuthenticated': true,
                user: user,
                'permissions': permissions,
                'loading': false,
                'error': null
            });
        }
        else {
            logger_1.logger.error('Invalid user data provided to setUser');
            set({ 'error': 'Invalid user data', 'loading': false });
        }
    },
    'updateUser': function (updates) {
        var currentState = get();
        if (currentState.user) {
            var updatedUser = __assign(__assign({}, currentState.user), updates);
            set({ user: updatedUser });
        }
    },
    'logout': function () {
        set({
            'id': null,
            'role': null,
            'companyId': null,
            'isAuthenticated': false,
            'user': null,
            'permissions': [],
            'loading': false,
            'error': null,
            'currentCompany': null
        });
    },
    'clearUser': function () {
        set({
            'id': null,
            'role': null,
            'companyId': null,
            'isAuthenticated': false,
            'user': null,
            'permissions': [],
            'loading': false,
            'error': null,
            'currentCompany': null
        });
    },
    'initializeFromSession': function (userData) {
        // Apply a simple conversion if needed
        set({ user: (userData || null) });
    }
}); });
// Convenience hooks for accessing specific parts of the store
var useCurrentUserId = function () { return (0, exports.useUserStore)(function (state) { return state.id; }); };
exports.useCurrentUserId = useCurrentUserId;
var useCurrentUserRole = function () { return (0, exports.useUserStore)(function (state) { return state.role; }); };
exports.useCurrentUserRole = useCurrentUserRole;
var useCurrentUserCompanyId = function () { return (0, exports.useUserStore)(function (state) { return state.companyId; }); };
exports.useCurrentUserCompanyId = useCurrentUserCompanyId;
var useIsUserAuthenticated = function () { return (0, exports.useUserStore)(function (state) { return state.isAuthenticated; }); };
exports.useIsUserAuthenticated = useIsUserAuthenticated;
var useCurrentUser = function () { return (0, exports.useUserStore)(function (state) { return state.user; }); };
exports.useCurrentUser = useCurrentUser;
var useCurrentUserPermissions = function () { return (0, exports.useUserStore)(function (state) { return state.permissions; }); };
exports.useCurrentUserPermissions = useCurrentUserPermissions;
exports.useUserPermissions = exports.useCurrentUserPermissions;
var useCurrentCompany = function () { return (0, exports.useUserStore)(function (state) { return state.currentCompany; }); };
exports.useCurrentCompany = useCurrentCompany;
var useUserLoading = function () { return (0, exports.useUserStore)(function (state) { return state.loading; }); };
exports.useUserLoading = useUserLoading;
var useUserError = function () { return (0, exports.useUserStore)(function (state) { return state.error; }); };
exports.useUserError = useUserError;
// Action hooks
var useUserActions = function () { return (0, exports.useUserStore)(function (state) { return ({
    setUser: state.setUser,
    updateUser: state.updateUser,
    logout: state.logout,
    clearUser: state.clearUser,
    initializeFromSession: state.initializeFromSession
}); }); };
exports.useUserActions = useUserActions;
