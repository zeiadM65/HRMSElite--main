"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPLOYEE_ENDPOINTS = exports.COMPANY_ENDPOINTS = exports.AUTH_ENDPOINTS = void 0;
// API Endpoints Constants
exports.AUTH_ENDPOINTS = {
    'USER': '/api/auth/user',
    'LOGIN': '/api/auth/login',
    'LOGOUT': '/api/auth/logout',
    'ME': '/api/auth/me'
};
exports.COMPANY_ENDPOINTS = {
    'GET_BY_ID': function (id) { return "/api/companies/".concat(id); },
    'GET_STATS': function (id) { return "/api/companies/".concat(id, "/stats"); },
    'GET_EMPLOYEES': function (id) { return "/api/companies/".concat(id, "/employees"); }
};
exports.EMPLOYEE_ENDPOINTS = {
    'UPDATE': function (id) { return "/api/employees/".concat(id); },
    'ARCHIVE': function (id) { return "/api/employees/".concat(id, "/archive"); }
};
