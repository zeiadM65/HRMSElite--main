"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompanyActions = exports.useEmployeeActions = exports.useAppActions = exports.useAuthActions = exports.useHydrationComplete = exports.useIsInitialized = exports.useError = exports.useIsLoading = exports.useActiveEmployees = exports.useTotalEmployees = exports.useCompanyName = exports.useUserFullName = exports.useUserRole = exports.useIsAuthenticated = exports.useEmployees = exports.useCompany = exports.useUser = exports.useAppStore = exports.useUserStoreComplete = exports.useUserActions = exports.useIsUserAuthenticated = exports.useCurrentUserCompanyId = exports.useCurrentUserRole = exports.useCurrentUserId = exports.useUserStore = void 0;
// Export all stores
__exportStar(require("./useAppStore"), exports);
__exportStar(require("./useUserStore"), exports);
// Re-export commonly used hooks for convenience
var useUserStore_1 = require("./useUserStore");
Object.defineProperty(exports, "useUserStore", { enumerable: true, get: function () { return useUserStore_1.useUserStore; } });
Object.defineProperty(exports, "useCurrentUserId", { enumerable: true, get: function () { return useUserStore_1.useCurrentUserId; } });
Object.defineProperty(exports, "useCurrentUserRole", { enumerable: true, get: function () { return useUserStore_1.useCurrentUserRole; } });
Object.defineProperty(exports, "useCurrentUserCompanyId", { enumerable: true, get: function () { return useUserStore_1.useCurrentUserCompanyId; } });
Object.defineProperty(exports, "useIsUserAuthenticated", { enumerable: true, get: function () { return useUserStore_1.useIsUserAuthenticated; } });
Object.defineProperty(exports, "useUserActions", { enumerable: true, get: function () { return useUserStore_1.useUserActions; } });
Object.defineProperty(exports, "useUserStoreComplete", { enumerable: true, get: function () { return useUserStore_1.useUserStoreComplete; } });
var useAppStore_1 = require("./useAppStore");
Object.defineProperty(exports, "useAppStore", { enumerable: true, get: function () { return useAppStore_1.useAppStore; } });
Object.defineProperty(exports, "useUser", { enumerable: true, get: function () { return useAppStore_1.useUser; } });
Object.defineProperty(exports, "useCompany", { enumerable: true, get: function () { return useAppStore_1.useCompany; } });
Object.defineProperty(exports, "useEmployees", { enumerable: true, get: function () { return useAppStore_1.useEmployees; } });
Object.defineProperty(exports, "useIsAuthenticated", { enumerable: true, get: function () { return useAppStore_1.useIsAuthenticated; } });
Object.defineProperty(exports, "useUserRole", { enumerable: true, get: function () { return useAppStore_1.useUserRole; } });
Object.defineProperty(exports, "useUserFullName", { enumerable: true, get: function () { return useAppStore_1.useUserFullName; } });
Object.defineProperty(exports, "useCompanyName", { enumerable: true, get: function () { return useAppStore_1.useCompanyName; } });
Object.defineProperty(exports, "useTotalEmployees", { enumerable: true, get: function () { return useAppStore_1.useTotalEmployees; } });
Object.defineProperty(exports, "useActiveEmployees", { enumerable: true, get: function () { return useAppStore_1.useActiveEmployees; } });
Object.defineProperty(exports, "useIsLoading", { enumerable: true, get: function () { return useAppStore_1.useIsLoading; } });
Object.defineProperty(exports, "useError", { enumerable: true, get: function () { return useAppStore_1.useError; } });
Object.defineProperty(exports, "useIsInitialized", { enumerable: true, get: function () { return useAppStore_1.useIsInitialized; } });
Object.defineProperty(exports, "useHydrationComplete", { enumerable: true, get: function () { return useAppStore_1.useHydrationComplete; } });
Object.defineProperty(exports, "useAuthActions", { enumerable: true, get: function () { return useAppStore_1.useAuthActions; } });
Object.defineProperty(exports, "useAppActions", { enumerable: true, get: function () { return useAppStore_1.useAppActions; } });
Object.defineProperty(exports, "useEmployeeActions", { enumerable: true, get: function () { return useAppStore_1.useEmployeeActions; } });
Object.defineProperty(exports, "useCompanyActions", { enumerable: true, get: function () { return useAppStore_1.useCompanyActions; } });
