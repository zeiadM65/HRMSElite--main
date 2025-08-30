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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var wouter_1 = require("wouter");
var button_1 = require("../components/ui/button");
var input_1 = require("../components/ui/input");
var label_1 = require("../components/ui/label");
var card_1 = require("../components/ui/card");
var alert_1 = require("../components/ui/alert");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("../hooks/use-toast");
var routes_1 = require("../lib/routes");
var useAuth_1 = require("../hooks/auth/useAuth");
var react_i18next_1 = require("react-i18next");
function Login() {
    var _this = this;
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var t = (0, react_i18next_1.useTranslation)().t;
    var login = (0, useAuth_1.useAuth)().login;
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)({
        'username': '',
        'password': ''
    }), formData = _d[0], setFormData = _d[1];
    // استخراج معلومات الشركة من URL
    var urlParams = new window.URLSearchParams(window.location.search);
    var companyId = urlParams.get('company');
    var companyName = urlParams.get('name');
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var result, userRole, dashboard, _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    setIsLoading(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, 6, 7]);
                    if (!(formData.username && formData.password)) return [3 /*break*/, 3];
                    return [4 /*yield*/, login({
                            username: formData.username,
                            password: formData.password,
                            companyId: companyId !== null && companyId !== void 0 ? companyId : undefined
                        })];
                case 2:
                    result = _c.sent();
                    if (result.success && result.user) {
                        userRole = result.user.role;
                        dashboard = (0, routes_1.getDashboardRouteWithCompany)(userRole, companyId !== null && companyId !== void 0 ? companyId : undefined, companyName !== null && companyName !== void 0 ? companyName : undefined);
                        toast({
                            'title': t('auth.loginSuccess'),
                            'description': t('auth.welcomeMessage', {
                                company: userRole === 'super_admin'
                                    ? t('auth.admin')
                                    : companyName !== null && companyName !== void 0 ? companyName : t('common.companies')
                            })
                        });
                        setLocation(dashboard);
                    }
                    else {
                        setError((_b = result.error) !== null && _b !== void 0 ? _b : t('auth.loginError'));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setError(t('validation.required'));
                    _c.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    _a = _c.sent();
                    setError(t('auth.loginError'));
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)("main", { role: "main", className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto mb-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-10 w-10 text-primary" }) }), (0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-semibold", children: t('auth.login') }), (0, jsx_runtime_1.jsxs)(card_1.CardDescription, { children: [t('auth.loginDescription'), companyName && ((0, jsx_runtime_1.jsx)("div", { className: "mt-2 text-sm font-medium text-primary", children: companyName }))] })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [error && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "destructive", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: error })] })), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "username", children: t('auth.username') }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "username", type: "text", placeholder: t('auth.username'), value: formData.username, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { 'username': e.target.value })); }, className: "pr-10", required: true, disabled: isLoading })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: t('auth.password') }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Lock, { className: "absolute right-3 top-3 h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "password", type: "password", placeholder: t('auth.password'), value: formData.password, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { 'password': e.target.value })); }, className: "pr-10", required: true, disabled: isLoading })] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "ml-2 h-4 w-4 animate-spin" }), t('common.loading')] })) : (t('auth.login')) })] }) })] }) }));
}
