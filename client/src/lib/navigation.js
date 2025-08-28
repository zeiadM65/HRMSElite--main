"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canAccessRoute = exports.getCurrentRouteInfo = exports.useNavigation = void 0;
var wouter_1 = require("wouter");
var routes_1 = require("./routes");
var roles_1 = require("./roles");
// Hook for navigation
var useNavigation = function () {
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var navigate = function (path) {
        setLocation(path);
    };
    var navigateToDashboard = function (role) {
        var dashboardPath = (0, routes_1.getDashboardRoute)(role);
        setLocation(dashboardPath);
    };
    var navigateToLogin = function () {
        setLocation(routes_1.routes.public.login);
    };
    var navigateToHome = function () {
        setLocation(routes_1.routes.public.home);
    };
    var navigateToCompanies = function () {
        setLocation(routes_1.routes.functional.companies);
    };
    var navigateToReports = function () {
        setLocation(routes_1.routes.functional.reports);
    };
    var goBack = function () {
        // For wouter, we can use browser history
        window.history.back();
    };
    return {
        navigate: navigate,
        navigateToDashboard: navigateToDashboard,
        navigateToLogin: navigateToLogin,
        navigateToHome: navigateToHome,
        navigateToCompanies: navigateToCompanies,
        navigateToReports: navigateToReports,
        goBack: goBack
    };
};
exports.useNavigation = useNavigation;
// Utility function to get current route info
var getCurrentRouteInfo = function () {
    var location = (0, wouter_1.useLocation)()[0];
    // Check if it's a dashboard route
    var dashboardMatch = location.match(/^\/dashboard\/([^/]+)/);
    if (dashboardMatch) {
        return {
            'type': 'dashboard',
            'role': dashboardMatch[1],
            'path': location
        };
    }
    // Check other routes
    var routeEntries = Object.entries(routes_1.routes.functional);
    for (var _i = 0, routeEntries_1 = routeEntries; _i < routeEntries_1.length; _i++) {
        var _a = routeEntries_1[_i], key = _a[0], path = _a[1];
        if (location === path) {
            return {
                'type': 'functional',
                'page': key,
                'path': location
            };
        }
    }
    return {
        'type': 'unknown',
        'path': location
    };
};
exports.getCurrentRouteInfo = getCurrentRouteInfo;
// Utility function to check if user can access a route
var canAccessRoute = function (userRole, routePath) {
    // Dashboard routes
    if (routePath.startsWith('/dashboard/')) {
        var roleFromPath = routePath.split('/')[2];
        return userRole === roleFromPath;
    }
    // Functional routes
    var routeEntries = Object.entries(routes_1.routes.functional);
    for (var _i = 0, routeEntries_2 = routeEntries; _i < routeEntries_2.length; _i++) {
        var _a = routeEntries_2[_i], key = _a[0], path = _a[1];
        if (routePath === path) {
            return (0, roles_1.canAccessPage)(userRole, key);
        }
    }
    return false;
};
exports.canAccessRoute = canAccessRoute;
