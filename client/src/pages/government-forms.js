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
exports.default = GovernmentForms;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var wouter_1 = require("wouter");
var button_1 = require("../components/ui/button");
var card_1 = require("../components/ui/card");
var input_1 = require("../components/ui/input");
var label_1 = require("../components/ui/label");
var select_1 = require("../components/ui/select");
var badge_1 = require("../components/ui/badge");
var tabs_1 = require("../components/ui/tabs");
var dialog_1 = require("../components/ui/dialog");
var textarea_1 = require("../components/ui/textarea");
var react_query_1 = require("@tanstack/react-query");
var queryClient_1 = require("@/lib/queryClient");
var use_toast_1 = require("../hooks/use-toast");
var lucide_react_1 = require("lucide-react");
var shared_layout_1 = require("../components/shared-layout");
var shared_1 = require("../components/shared");
function GovernmentForms() {
    return ((0, jsx_runtime_1.jsx)(shared_layout_1.SharedLayout, { userRole: "company_manager", userName: "\u0645\u062F\u064A\u0631 \u0627\u0644\u0634\u0631\u0643\u0629", companyName: "\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u064A\u0644 \u0627\u0644\u0623\u0632\u0631\u0642 \u0644\u0644\u0645\u062C\u0648\u0647\u0631\u0627\u062A", children: (0, jsx_runtime_1.jsx)(GovernmentFormsContent, {}) }));
}
function GovernmentFormsContent() {
    var _this = this;
    var _a, _b, _c;
    var _d = (0, react_1.useState)(''), searchTerm = _d[0], setSearchTerm = _d[1];
    var _e = (0, react_1.useState)('all'), selectedCategory = _e[0], setSelectedCategory = _e[1];
    var _f = (0, react_1.useState)('all'), selectedCompany = _f[0], setSelectedCompany = _f[1];
    var _g = (0, react_1.useState)(false), dialogOpen = _g[0], setDialogOpen = _g[1];
    var _h = (0, react_1.useState)(null), selectedForm = _h[0], setSelectedForm = _h[1];
    var _j = (0, react_1.useState)('forms'), activeTab = _j[0], setActiveTab = _j[1];
    var _k = (0, react_1.useState)(''), companyIdInput = _k[0], setCompanyIdInput = _k[1];
    var _l = (0, react_1.useState)(''), employeeIdInput = _l[0], setEmployeeIdInput = _l[1];
    var _m = (0, react_1.useState)(''), notesInput = _m[0], setNotesInput = _m[1];
    // Fetch government forms
    var _o = (0, react_query_1.useQuery)({
        'queryKey': ['/api/government-forms']
    }), _p = _o["data"], governmentForms = _p === void 0 ? [] : _p, formsLoading = _o["isLoading"], formsError = _o["error"];
    // Fetch requests
    var _q = (0, react_query_1.useQuery)({
        'queryKey': ['/api/requests']
    }), _r = _q["data"], requests = _r === void 0 ? [] : _r, requestsLoading = _q["isLoading"], requestsError = _q["error"];
    // Fetch companies
    var _s = (0, react_query_1.useQuery)({
        'queryKey': ['/api/companies']
    }), _t = _s["data"], companies = _t === void 0 ? [] : _t, companiesLoading = _s["isLoading"], companiesError = _s["error"];
    // Submit form request mutation
    var submitFormMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (formData) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/api/form-requests', {
                            'method': 'POST',
                            'headers': { 'Content-Type': 'application/json' },
                            'credentials': 'include',
                            'body': JSON.stringify(formData)
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to submit form request');
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        'onSuccess': function () {
            (0, use_toast_1.toast)({
                'title': 'تم إرسال الطلب',
                'description': 'تم إرسال طلب النموذج بنجاح وسيتم معالجته قريباً'
            });
            setDialogOpen(false);
            queryClient_1.queryClient.invalidateQueries({ 'queryKey': ['/api/requests'] });
        },
        'onError': function () {
            (0, use_toast_1.toast)({
                'title': 'خطأ',
                'description': 'حدث خطأ أثناء إرسال الطلب',
                'variant': 'destructive'
            });
        }
    });
    // Auto-fill form mutation
    var autoFillMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (formId) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/government-forms/".concat(formId, "/auto-fill"), {
                            'method': 'POST',
                            'headers': { 'Content-Type': 'application/json' },
                            'credentials': 'include'
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Failed to auto-fill form');
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        }); },
        'onSuccess': function (data) {
            (0, use_toast_1.toast)({
                'title': 'تم الملء التلقائي',
                'description': 'تم ملء النموذج تلقائياً بالبيانات المتاحة'
            });
            // Download the filled form
            window.open(data.downloadUrl, '_blank');
        },
        'onError': function () {
            (0, use_toast_1.toast)({
                'title': 'خطأ',
                'description': 'حدث خطأ أثناء الملء التلقائي للنموذج',
                'variant': 'destructive'
            });
        }
    });
    // Filter forms based on search and category
    var filteredForms = governmentForms.filter(function (form) {
        var _a, _b, _c, _d, _e, _f;
        var matchesSearch = ((_b = (_a = form.formNameArabic) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '').includes(searchTerm.toLowerCase()) ||
            ((_d = (_c = form.formNameEnglish) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== null && _d !== void 0 ? _d : '').includes(searchTerm.toLowerCase()) ||
            ((_f = (_e = form.formType) === null || _e === void 0 ? void 0 : _e.toLowerCase()) !== null && _f !== void 0 ? _f : '').includes(searchTerm.toLowerCase());
        var matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    // Filter requests based on company
    var filteredRequests = requests.filter(function (request) {
        var matchesCompany = selectedCompany === 'all' || request.companyId === selectedCompany;
        return matchesCompany;
    });
    var getStatusBadge = function (status) {
        var _a;
        var statusConfig = {
            'submitted': { 'label': 'مقدم', 'variant': 'secondary', 'icon': lucide_react_1.Send },
            'processing': { 'label': 'قيد المعالجة', 'variant': 'default', 'icon': lucide_react_1.Clock },
            'completed': { 'label': 'مكتمل', 'variant': 'outline', 'icon': lucide_react_1.CheckCircle },
            'rejected': { 'label': 'مرفوض', 'variant': 'destructive', 'icon': lucide_react_1.AlertCircle }
        };
        var config = (_a = statusConfig[status]) !== null && _a !== void 0 ? _a : statusConfig.submitted;
        var Icon = config.icon;
        return ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: config.variant, className: "gap-1", children: [(0, jsx_runtime_1.jsx)(Icon, { className: "h-3 w-3" }), config.label] }));
    };
    var getCategoryIcon = function (category) {
        var _a;
        var categoryIcons = {
            'وثائق شخصية': lucide_react_1.FileText,
            'شئون العمل': lucide_react_1.Printer,
            'إجراءات قانونية': lucide_react_1.FileText,
            'تراخيص تجارية': lucide_react_1.FileText
        };
        var Icon = (_a = categoryIcons[category]) !== null && _a !== void 0 ? _a : lucide_react_1.FileText;
        return (0, jsx_runtime_1.jsx)(Icon, { className: "h-4 w-4" });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-6 max-w-7xl", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold mb-2", children: "\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062D\u0643\u0648\u0645\u064A\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "\u0625\u062F\u0627\u0631\u0629 \u0648\u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062D\u0643\u0648\u0645\u064A\u0629 \u0628\u0633\u0647\u0648\u0644\u0629 \u0645\u0639 \u0627\u0644\u0645\u0644\u0621 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A \u0644\u0644\u0628\u064A\u0627\u0646\u0627\u062A" })] }), (0, jsx_runtime_1.jsx)(wouter_1.Link, { href: "/dashboard", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-4 w-4" }), "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645"] }) })] }), (formsLoading || requestsLoading || companiesLoading) && ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-12", children: (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, { text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062D\u0643\u0648\u0645\u064A\u0629..." }) })), Boolean((_a = formsError !== null && formsError !== void 0 ? formsError : requestsError) !== null && _a !== void 0 ? _a : companiesError) && ((0, jsx_runtime_1.jsx)("div", { className: "py-8", children: (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: (_b = formsError !== null && formsError !== void 0 ? formsError : requestsError) !== null && _b !== void 0 ? _b : companiesError, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062D\u0643\u0648\u0645\u064A\u0629", onRetry: function () { return window.location.reload(); } }) })), !formsLoading && !requestsLoading && !companiesLoading && !formsError && !requestsError && !companiesError && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8", children: [(0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0646\u0645\u0627\u0630\u062C" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: Array.isArray(governmentForms) ? governmentForms.length : 0 })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-8 w-8 text-primary opacity-20" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "\u0637\u0644\u0628\u0627\u062A \u0645\u0642\u062F\u0645\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: filteredRequests.filter(function (r) { return r.status === 'submitted'; }).length })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "h-8 w-8 text-blue-600 opacity-20" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "\u0642\u064A\u062F \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: filteredRequests.filter(function (r) { return r.status === 'processing'; }).length })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-8 w-8 text-orange-600 opacity-20" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "\u0645\u0643\u062A\u0645\u0644\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: filteredRequests.filter(function (r) { return r.status === 'completed'; }).length })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-8 w-8 text-green-600 opacity-20" })] }) }) })] })), !formsLoading && !requestsLoading && !companiesLoading && !formsError && !requestsError && !companiesError ? ((0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid grid-cols-3 w-full md:w-[500px]", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "forms", className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), "\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u062A\u0627\u062D\u0629"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "requests", className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "h-4 w-4" }), "\u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0642\u062F\u0645\u0629"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "templates", className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4" }), "\u0627\u0644\u0642\u0648\u0627\u0644\u0628"] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "forms", className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0646\u0645\u0627\u0630\u062C...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "pr-10" })] }) }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-full md:w-[200px]", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0641\u0626\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "\u0648\u062B\u0627\u0626\u0642 \u0634\u062E\u0635\u064A\u0629", children: "\u0648\u062B\u0627\u0626\u0642 \u0634\u062E\u0635\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "\u0634\u0626\u0648\u0646 \u0627\u0644\u0639\u0645\u0644", children: "\u0634\u0626\u0648\u0646 \u0627\u0644\u0639\u0645\u0644" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629", children: "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0642\u0627\u0646\u0648\u0646\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "\u062A\u0631\u0627\u062E\u064A\u0635 \u062A\u062C\u0627\u0631\u064A\u0629", children: "\u062A\u0631\u0627\u062E\u064A\u0635 \u062A\u062C\u0627\u0631\u064A\u0629" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredForms.map(function (form) {
                                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                                    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [getCategoryIcon((_a = form.category) !== null && _a !== void 0 ? _a : ''), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: (_b = form.formType) !== null && _b !== void 0 ? _b : '' })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: form.status === 'متاح' ? 'outline' : 'secondary', children: (_c = form.status) !== null && _c !== void 0 ? _c : '' })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-muted-foreground mb-1", children: "\u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: (_d = form.formNameArabic) !== null && _d !== void 0 ? _d : '' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-muted-foreground mb-1", children: "\u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u0645\u0635\u062F\u0631\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: (_e = form.issuingAuthority) !== null && _e !== void 0 ? _e : '' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mb-1", children: "\u0627\u0644\u0631\u0633\u0648\u0645" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-3 w-3" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: (_f = form.fees) !== null && _f !== void 0 ? _f : '' })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mb-1", children: "\u0645\u062F\u0629 \u0627\u0644\u0625\u0646\u062C\u0627\u0632" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-3 w-3" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: (_g = form.processingTime) !== null && _g !== void 0 ? _g : '' })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-2", children: [(0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", className: "flex-1", onClick: function () { return setSelectedForm(form); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4" }), "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-3xl max-h-[80vh] overflow-y-auto", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "text-xl", children: (_h = form.formNameArabic) !== null && _h !== void 0 ? _h : '' }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 mt-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold mb-2", children: "\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629" }), (0, jsx_runtime_1.jsx)("ul", { className: "list-disc list-inside space-y-1", children: ((_j = form.requiredDocuments) !== null && _j !== void 0 ? _j : []).map(function (doc, index) { return ((0, jsx_runtime_1.jsx)("li", { className: "text-sm text-muted-foreground", children: doc }, index)); }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-muted-foreground", children: "\u0645\u062F\u0629 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm mt-1", children: (_k = form.validityPeriod) !== null && _k !== void 0 ? _k : '' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-muted-foreground", children: "\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm mt-1", children: form.lastUpdated ? new Date(form.lastUpdated).toLocaleDateString('ar-SA') : '' })] })] })] })] })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", className: "flex-1", onClick: function () {
                                                                    setSelectedForm(form);
                                                                    setDialogOpen(true);
                                                                }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), "\u062A\u0642\u062F\u064A\u0645 \u0637\u0644\u0628"] })] })] })] }, (_l = form.id) !== null && _l !== void 0 ? _l : Math.random()));
                                }) })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "requests", className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 mb-6", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0627\u0644\u0634\u0631\u0643\u0629:" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: selectedCompany, onValueChange: setSelectedCompany, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-[300px]", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0634\u0631\u0643\u0627\u062A" }), companies.map(function (company) {
                                                        var _a, _b, _c;
                                                        return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: (_a = company.id) !== null && _a !== void 0 ? _a : '', children: (_b = company.name) !== null && _b !== void 0 ? _b : '' }, (_c = company.id) !== null && _c !== void 0 ? _c : ''));
                                                    })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "border rounded-lg", children: (0, jsx_runtime_1.jsxs)("div", { className: "overflow-x-auto", children: [(0, jsx_runtime_1.jsxs)("table", { className: "w-full", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { className: "border-b bg-muted/50", children: [(0, jsx_runtime_1.jsx)("th", { className: "text-right p-4 font-medium", children: "\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628" }), (0, jsx_runtime_1.jsx)("th", { className: "text-right p-4 font-medium", children: "\u0627\u0644\u0646\u0645\u0648\u0630\u062C" }), (0, jsx_runtime_1.jsx)("th", { className: "text-right p-4 font-medium", children: "\u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsx)("th", { className: "text-right p-4 font-medium", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u062F\u064A\u0645" }), (0, jsx_runtime_1.jsx)("th", { className: "text-right p-4 font-medium", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsx)("th", { className: "text-right p-4 font-medium", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: filteredRequests.map(function (request) {
                                                        var _a, _b, _c, _d, _e, _f;
                                                        return ((0, jsx_runtime_1.jsxs)("tr", { className: "border-b hover:bg-muted/50", children: [(0, jsx_runtime_1.jsx)("td", { className: "p-4", children: (0, jsx_runtime_1.jsx)("span", { className: "font-mono text-sm", children: (_a = request.id) !== null && _a !== void 0 ? _a : '' }) }), (0, jsx_runtime_1.jsx)("td", { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: (_b = request.name) !== null && _b !== void 0 ? _b : '' }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: (_c = request.requestType) !== null && _c !== void 0 ? _c : '' })] }) }), (0, jsx_runtime_1.jsx)("td", { className: "p-4", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: (_d = request.companyName) !== null && _d !== void 0 ? _d : '' }) }), (0, jsx_runtime_1.jsx)("td", { className: "p-4", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: request.submissionDate ? new Date(request.submissionDate).toLocaleDateString('ar-SA') : '' }) }), (0, jsx_runtime_1.jsx)("td", { className: "p-4", children: getStatusBadge((_e = request.status) !== null && _e !== void 0 ? _e : "submitted") }), (0, jsx_runtime_1.jsx)("td", { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Printer, { className: "h-4 w-4" }) })] }) })] }, (_f = request.id) !== null && _f !== void 0 ? _f : Math.random()));
                                                    }) })] }), filteredRequests.length === 0 && ((0, jsx_runtime_1.jsx)("div", { className: "p-8 text-center text-muted-foreground", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0642\u062F\u0645\u0629" }))] }) })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "templates", className: "space-y-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center py-12", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold mb-2", children: "\u0642\u0648\u0627\u0644\u0628 \u0627\u0644\u0646\u0645\u0627\u0630\u062C" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mb-4", children: "\u0642\u0645 \u0628\u062A\u062D\u0645\u064A\u0644 \u0642\u0648\u0627\u0644\u0628 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062D\u0643\u0648\u0645\u064A\u0629 \u0644\u0644\u0627\u0637\u0644\u0627\u0639 \u0639\u0644\u064A\u0647\u0627 \u0642\u0628\u0644 \u0627\u0644\u062A\u0642\u062F\u064A\u0645" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4 ml-2" }), "\u062A\u062D\u0645\u064A\u0644 \u062C\u0645\u064A\u0639 \u0627\u0644\u0642\u0648\u0627\u0644\u0628"] })] }) })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-12", children: (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, {}) })), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u062A\u0642\u062F\u064A\u0645 \u0637\u0644\u0628 \u0646\u0645\u0648\u0630\u062C" }) }), selectedForm && ((0, jsx_runtime_1.jsxs)("form", { onSubmit: function (e) {
                                e.preventDefault();
                                submitFormMutation.mutate({
                                    'formId': selectedForm.id,
                                    'formType': selectedForm.formType,
                                    'companyId': companyIdInput,
                                    'employeeId': employeeIdInput || undefined,
                                    'notes': notesInput || undefined
                                });
                            }, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0627\u0644\u0646\u0645\u0648\u0630\u062C" }), (0, jsx_runtime_1.jsx)(input_1.Input, { value: (_c = selectedForm.formNameArabic) !== null && _c !== void 0 ? _c : '', disabled: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: companyIdInput, onValueChange: setCompanyIdInput, required: true, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: companies.map(function (company) {
                                                        var _a, _b, _c;
                                                        return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: (_a = company.id) !== null && _a !== void 0 ? _a : '', children: (_b = company.name) !== null && _b !== void 0 ? _b : '' }, (_c = company.id) !== null && _c !== void 0 ? _c : ''));
                                                    }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641 \u0625\u0630\u0627 \u0643\u0627\u0646 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u062E\u0627\u0635 \u0628\u0645\u0648\u0638\u0641", value: employeeIdInput, onChange: function (e) { return setEmployeeIdInput(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { placeholder: "\u0623\u064A \u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629...", rows: 3, value: notesInput, onChange: function (e) { return setNotesInput(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4 text-blue-600" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-blue-600 dark:text-blue-400", children: "\u0633\u064A\u062A\u0645 \u0645\u0644\u0621 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0628\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0645\u0646 \u0627\u0644\u0646\u0638\u0627\u0645" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setDialogOpen(false); }, children: "\u0625\u0644\u063A\u0627\u0621" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "secondary", onClick: function () { var _a; return autoFillMutation.mutate((_a = selectedForm.id) !== null && _a !== void 0 ? _a : ''); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-4 w-4 ml-2" }), "\u0645\u0644\u0621 \u062A\u0644\u0642\u0627\u0626\u064A \u0641\u0642\u0637"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "submit", disabled: submitFormMutation.isPending, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "h-4 w-4 ml-2" }), submitFormMutation.isPending ? 'جاري الإرسال...' : 'إرسال الطلب'] })] })] }))] }) })] }));
}
