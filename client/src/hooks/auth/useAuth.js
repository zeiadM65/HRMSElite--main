"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
var react_1 = require("react");
var useAuthCore_1 = require("./useAuthCore");
var useAuthPermissions_1 = require("./useAuthPermissions");
var useAuthProfile_1 = require("./useAuthProfile");
var useAuthSession_1 = require("./useAuthSession");
/**
 * Unified Authentication Hook - Composition Pattern
 * Combines all authentication hooks into a single interface
 * Follows Open/Closed Principle - easy to extend without modification
 */
var useAuth = function () {
    var core = (0, useAuthCore_1.useAuthCore)();
    var permissions = (0, useAuthPermissions_1.useAuthPermissions)();
    var profile = (0, useAuthProfile_1.useAuthProfile)();
    var session = (0, useAuthSession_1.useAuthSession)();
    // Initialize authentication on mount
    (0, react_1.useEffect)(function () {
        if (!core.isAuthenticated && !core.loading) {
            session.initializeAuth().then(function (result) {
                if (result.success && result.user) {
                    core.setUser(result.user);
                    if (result.company) {
                        core.setCurrentCompany(result.company.id);
                    }
                }
                else {
                    core.clearUser();
                }
            });
        }
    }, [core.isAuthenticated, core.loading, session, core.setUser, core.setCurrentCompany, core.clearUser]);
    return {
        // Core State
        user: core.user,
        currentCompany: core.currentCompany,
        permissions: permissions.permissions,
        isAuthenticated: core.isAuthenticated,
        loading: core.loading,
        error: core.error,
        // Core Actions
        login: core.login,
        logout: core.logout,
        getCurrentUser: core.getCurrentUser,
        // Profile Actions
        updateProfile: profile.updateProfile,
        getUserFullName: profile.getUserFullName,
        switchCompany: profile.switchCompany,
        // Session Actions
        checkAuth: session.checkAuth,
        initializeAuth: session.initializeAuth,
        // Permission Actions
        getPermissions: permissions.getPermissions,
        hasPermission: permissions.hasPermission,
        hasAnyPermission: permissions.hasAnyPermission,
        hasAllPermissions: permissions.hasAllPermissions,
        // Role Checks
        isSuperAdmin: permissions.isSuperAdmin,
        isCompanyManager: permissions.isCompanyManager,
        canAccessCompany: permissions.canAccessCompany,
        getUserRoleForCompany: permissions.getUserRoleForCompany,
        // Store Actions (for advanced usage)
        setUser: core.setUser,
        updateUser: core.updateUser,
        setCurrentCompany: core.setCurrentCompany,
        setPermissions: core.setPermissions,
        setLoading: core.setLoading,
        setError: core.setError,
        clearUser: core.clearUser,
        initializeFromSession: core.initializeFromSession
    };
};
exports.useAuth = useAuth;
