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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recruitment = exports.Training = exports.Documents = exports.Payroll = exports.LeaveRequests = exports.Attendance = exports.Settings = exports.Reports = exports.EmployeesEnhanced = exports.Employees = exports.CompanyDetails = exports.Companies = exports.Dashboard = exports.NotFound = exports.Login = exports.CompanySelection = exports.LazyI18nTest = exports.LazyPerformanceTest = exports.LazyLayoutExample = exports.LazyEmployeeManagement = exports.LazySuperAdminDashboard = exports.LazyRoleBasedDashboard = exports.LazyPermissionTest = exports.LazySignatureTest = exports.LazySignatures = exports.LazyLeaves = exports.LazyLicenses = exports.LazyGovernmentForms = exports.LazyAccountingSystems = exports.LazyAIAnalytics = exports.LazyAIChatbotDemo = exports.LazyAIDashboard = exports.LazyAdvancedSearch = exports.LazyPerformance = exports.LazyRecruitment = exports.LazyTraining = exports.LazyDocuments = exports.LazyPayroll = exports.LazyLeaveRequests = exports.LazyAttendance = exports.LazySettings = exports.LazyReports = exports.LazyEmployeesEnhanced = exports.LazyEmployees = exports.LazyCompanyDetails = exports.LazyCompanies = exports.LazyDashboard = exports.LazyNotFound = exports.LazyLogin = exports.LazyCompanySelection = void 0;
exports.I18nTest = exports.PerformanceTest = exports.LayoutExample = exports.EmployeeManagement = exports.SuperAdminDashboard = exports.RoleBasedDashboard = exports.PermissionTest = exports.SignatureTest = exports.Signatures = exports.Leaves = exports.Licenses = exports.GovernmentForms = exports.AccountingSystems = exports.AIAnalytics = exports.AIChatbotDemo = exports.AIDashboard = exports.AdvancedSearch = exports.Performance = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var SuspenseWrapper_1 = __importDefault(require("../components/optimized/SuspenseWrapper"));
// Lazy load all pages for better performance
exports.LazyCompanySelection = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./company-selection')); }); });
exports.LazyLogin = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./login')); }); });
exports.LazyNotFound = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./not-found')); }); });
exports.LazyDashboard = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./dashboard')); }); });
exports.LazyCompanies = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./companies')); }); });
exports.LazyCompanyDetails = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./company-details')); }); });
exports.LazyEmployees = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./employees')); }); });
exports.LazyEmployeesEnhanced = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./employees-enhanced')); }); });
exports.LazyReports = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./reports')); }); });
exports.LazySettings = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./settings')); }); });
exports.LazyAttendance = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./attendance')); }); });
exports.LazyLeaveRequests = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./leave-requests')); }); });
exports.LazyPayroll = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./payroll')); }); });
exports.LazyDocuments = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./documents')); }); });
exports.LazyTraining = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./training')); }); });
exports.LazyRecruitment = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./recruitment')); }); });
exports.LazyPerformance = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./performance')); }); });
exports.LazyAdvancedSearch = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./advanced-search')); }); });
exports.LazyAIDashboard = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./ai-dashboard')); }); });
exports.LazyAIChatbotDemo = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./ai-chatbot-demo')); }); });
exports.LazyAIAnalytics = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./ai-analytics')); }); });
exports.LazyAccountingSystems = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./accounting-systems')); }); });
exports.LazyGovernmentForms = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./government-forms')); }); });
exports.LazyLicenses = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./licenses')); }); });
exports.LazyLeaves = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./leaves')); }); });
exports.LazySignatures = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./signatures')); }); });
exports.LazySignatureTest = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./signature-test')); }); });
exports.LazyPermissionTest = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./permission-test')); }); });
exports.LazyRoleBasedDashboard = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./role-based-dashboard')); }); });
exports.LazySuperAdminDashboard = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./super-admin-dashboard')); }); });
exports.LazyEmployeeManagement = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./employee-management')); }); });
exports.LazyLayoutExample = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./layout-example')); }); });
exports.LazyPerformanceTest = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('./performance-test')); }); });
exports.LazyI18nTest = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('../tests/i18n-test')); }); });
// Wrapped components with appropriate Suspense fallbacks
var CompanySelection = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0634\u0631\u0643\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyCompanySelection, __assign({}, props)) })); };
exports.CompanySelection = CompanySelection;
var Login = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644...", children: (0, jsx_runtime_1.jsx)(exports.LazyLogin, __assign({}, props)) })); };
exports.Login = Login;
var NotFound = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "default", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyNotFound, __assign({}, props)) })); };
exports.NotFound = NotFound;
var Dashboard = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645...", children: (0, jsx_runtime_1.jsx)(exports.LazyDashboard, __assign({}, props)) })); };
exports.Dashboard = Dashboard;
var Companies = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "table", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062A...", children: (0, jsx_runtime_1.jsx)(exports.LazyCompanies, __assign({}, props)) })); };
exports.Companies = Companies;
var CompanyDetails = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyCompanyDetails, __assign({}, props)) })); };
exports.CompanyDetails = CompanyDetails;
var Employees = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "table", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646...", children: (0, jsx_runtime_1.jsx)(exports.LazyEmployees, __assign({}, props)) })); };
exports.Employees = Employees;
var EmployeesEnhanced = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "table", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0645\u062D\u0633\u0646\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyEmployeesEnhanced, __assign({}, props)) })); };
exports.EmployeesEnhanced = EmployeesEnhanced;
var Reports = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631...", children: (0, jsx_runtime_1.jsx)(exports.LazyReports, __assign({}, props)) })); };
exports.Reports = Reports;
var Settings = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A...", children: (0, jsx_runtime_1.jsx)(exports.LazySettings, __assign({}, props)) })); };
exports.Settings = Settings;
var Attendance = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "table", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u0644\u062D\u0636\u0648\u0631...", children: (0, jsx_runtime_1.jsx)(exports.LazyAttendance, __assign({}, props)) })); };
exports.Attendance = Attendance;
var LeaveRequests = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "list", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u062C\u0627\u0632\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyLeaveRequests, __assign({}, props)) })); };
exports.LeaveRequests = LeaveRequests;
var Payroll = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "table", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0643\u0634\u0641 \u0627\u0644\u0631\u0648\u0627\u062A\u0628...", children: (0, jsx_runtime_1.jsx)(exports.LazyPayroll, __assign({}, props)) })); };
exports.Payroll = Payroll;
var Documents = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "list", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A...", children: (0, jsx_runtime_1.jsx)(exports.LazyDocuments, __assign({}, props)) })); };
exports.Documents = Documents;
var Training = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "list", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628...", children: (0, jsx_runtime_1.jsx)(exports.LazyTraining, __assign({}, props)) })); };
exports.Training = Training;
var Recruitment = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "list", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u0648\u0638\u064A\u0641...", children: (0, jsx_runtime_1.jsx)(exports.LazyRecruitment, __assign({}, props)) })); };
exports.Recruitment = Recruitment;
var Performance = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0623\u062F\u0627\u0621...", children: (0, jsx_runtime_1.jsx)(exports.LazyPerformance, __assign({}, props)) })); };
exports.Performance = Performance;
var AdvancedSearch = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u0645\u062A\u0642\u062F\u0645...", children: (0, jsx_runtime_1.jsx)(exports.LazyAdvancedSearch, __assign({}, props)) })); };
exports.AdvancedSearch = AdvancedSearch;
var AIDashboard = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0630\u0643\u064A\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyAIDashboard, __assign({}, props)) })); };
exports.AIDashboard = AIDashboard;
var AIChatbotDemo = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629 \u0627\u0644\u0630\u0643\u064A\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyAIChatbotDemo, __assign({}, props)) })); };
exports.AIChatbotDemo = AIChatbotDemo;
var AIAnalytics = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyAIAnalytics, __assign({}, props)) })); };
exports.AIAnalytics = AIAnalytics;
var AccountingSystems = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "table", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0645\u062D\u0627\u0633\u0628\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyAccountingSystems, __assign({}, props)) })); };
exports.AccountingSystems = AccountingSystems;
var GovernmentForms = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "list", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062D\u0643\u0648\u0645\u064A\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyGovernmentForms, __assign({}, props)) })); };
exports.GovernmentForms = GovernmentForms;
var Licenses = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635...", children: (0, jsx_runtime_1.jsx)(exports.LazyLicenses, __assign({}, props)) })); };
exports.Licenses = Licenses;
var Leaves = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "list", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A...", children: (0, jsx_runtime_1.jsx)(exports.LazyLeaves, __assign({}, props)) })); };
exports.Leaves = Leaves;
var Signatures = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A...", children: (0, jsx_runtime_1.jsx)(exports.LazySignatures, __assign({}, props)) })); };
exports.Signatures = Signatures;
var SignatureTest = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0648\u0642\u064A\u0639...", children: (0, jsx_runtime_1.jsx)(exports.LazySignatureTest, __assign({}, props)) })); };
exports.SignatureTest = SignatureTest;
var PermissionTest = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A...", children: (0, jsx_runtime_1.jsx)(exports.LazyPermissionTest, __assign({}, props)) })); };
exports.PermissionTest = PermissionTest;
var RoleBasedDashboard = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u062D\u0633\u0628 \u0627\u0644\u062F\u0648\u0631...", children: (0, jsx_runtime_1.jsx)(exports.LazyRoleBasedDashboard, __assign({}, props)) })); };
exports.RoleBasedDashboard = RoleBasedDashboard;
var SuperAdminDashboard = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0644\u0648\u062D\u0629 \u062A\u062D\u0643\u0645 \u0627\u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0639\u0627\u0645...", children: (0, jsx_runtime_1.jsx)(exports.LazySuperAdminDashboard, __assign({}, props)) })); };
exports.SuperAdminDashboard = SuperAdminDashboard;
var EmployeeManagement = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "table", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646...", children: (0, jsx_runtime_1.jsx)(exports.LazyEmployeeManagement, __assign({}, props)) })); };
exports.EmployeeManagement = EmployeeManagement;
var LayoutExample = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0645\u062B\u0627\u0644 \u0627\u0644\u062A\u062E\u0637\u064A\u0637...", children: (0, jsx_runtime_1.jsx)(exports.LazyLayoutExample, __assign({}, props)) })); };
exports.LayoutExample = LayoutExample;
var PerformanceTest = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "chart", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0623\u062F\u0627\u0621...", children: (0, jsx_runtime_1.jsx)(exports.LazyPerformanceTest, __assign({}, props)) })); };
exports.PerformanceTest = PerformanceTest;
var I18nTest = function (props) { return ((0, jsx_runtime_1.jsx)(SuspenseWrapper_1.default, { type: "card", message: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062A\u0631\u062C\u0645\u0629...", children: (0, jsx_runtime_1.jsx)(exports.LazyI18nTest, __assign({}, props)) })); };
exports.I18nTest = I18nTest;
