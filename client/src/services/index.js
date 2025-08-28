"use strict";
// Services index file
// Export all service functions from this central location
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
exports.CompanyService = exports.AuthService = void 0;
__exportStar(require("./api"), exports);
// Explicit re-exports to avoid conflicting `Company` symbols
var auth_1 = require("./auth");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return auth_1.AuthService; } });
__exportStar(require("./employee"), exports);
var company_1 = require("./company");
Object.defineProperty(exports, "CompanyService", { enumerable: true, get: function () { return company_1.CompanyService; } });
__exportStar(require("./payroll"), exports);
__exportStar(require("./attendance"), exports);
__exportStar(require("./documents"), exports);
__exportStar(require("./notifications"), exports);
