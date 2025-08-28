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
exports.default = CompanyDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var wouter_1 = require("wouter");
var queryClient_1 = require("@/lib/queryClient");
var shared_1 = require("../components/shared");
var card_1 = require("../components/ui/card");
var button_1 = require("../components/ui/button");
var badge_1 = require("../components/ui/badge");
var tabs_1 = require("../components/ui/tabs");
var separator_1 = require("../components/ui/separator");
var dialog_1 = require("../components/ui/dialog");
var form_1 = require("../components/ui/form");
var input_1 = require("../components/ui/input");
var textarea_1 = require("../components/ui/textarea");
var select_1 = require("../components/ui/select");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var zod_2 = require("zod");
var lucide_react_1 = require("lucide-react");
var companyUpdateSchema = zod_2.z.object({
    'name': zod_2.z.string().min(2, 'اسم الشركة يجب أن يكون أكثر من حرفين'),
    'description': zod_2.z.string().min(10, 'الوصف يجب أن يكون أكثر من 10 أحرف'),
    'address': zod_2.z.string().min(5, 'العنوان مطلوب'),
    'phone': zod_2.z.string().min(10, 'رقم الهاتف غير صحيح'),
    'email': zod_2.z.string().email('البريد الإلكتروني غير صحيح'),
    'website': zod_2.z.string().url('رابط الموقع غير صحيح').optional().or(zod_2.z.literal('')),
    'industry': zod_2.z.string().min(1, 'نوع الصناعة مطلوب'),
    'size': zod_2.z.string().min(1, 'حجم الشركة مطلوب'),
    'status': zod_2.z.enum(['active', 'suspended', 'pending'])
});
function CompanyDetails() {
    var _this = this;
    var _a, _b, _c, _d, _e;
    var _f = (0, wouter_1.useLocation)(), location = _f[0], setLocation = _f[1];
    var companyId = typeof window !== 'undefined'
        ? new window.URLSearchParams((_a = location.split('?')[1]) !== null && _a !== void 0 ? _a : '').get('id')
        : null;
    var _g = (0, react_1.useState)('overview'), activeTab = _g[0], setActiveTab = _g[1];
    var _h = (0, react_1.useState)(false), isEditDialogOpen = _h[0], setIsEditDialogOpen = _h[1];
    var form = (0, react_hook_form_1.useForm)({
        'resolver': (0, zod_1.zodResolver)(companyUpdateSchema),
        'defaultValues': {
            'name': '',
            'description': '',
            'address': '',
            'phone': '',
            'email': '',
            'website': '',
            'industry': '',
            'size': '',
            'status': 'pending'
        }
    });
    var _j = (0, react_query_1.useQuery)({
        'queryKey': ['/api/companies', companyId],
        'enabled': !!companyId
    }), company = _j["data"], isLoadingCompany = _j["isLoading"], companyError = _j["error"];
    // جلب موظفي الشركة
    var _k = (0, react_query_1.useQuery)({
        'queryKey': ['/api/employees', companyId],
        'queryFn': function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!companyId) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, (0, queryClient_1.apiRequest)('GET', "/api/employees?company=".concat(companyId))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        'enabled': !!companyId
    }), _l = _k["data"], employees = _l === void 0 ? [] : _l, isLoadingEmployees = _k["isLoading"];
    // جلب مستندات الشركة
    var _m = (0, react_query_1.useQuery)({
        'queryKey': ['/api/v1/documents', companyId],
        'queryFn': function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!companyId) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, (0, queryClient_1.apiRequest)('GET', "/api/v1/documents?company=".concat(companyId))];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        'enabled': !!companyId
    }), _o = _m["data"], documents = _o === void 0 ? [] : _o, isLoadingDocuments = _m["isLoading"];
    // تحديث بيانات الشركة
    var updateCompanyMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queryClient_1.apiRequest)('PUT', "/api/companies/".concat(companyId), data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        'onSuccess': function () {
            setIsEditDialogOpen(false);
            queryClient_1.queryClient.invalidateQueries({ 'queryKey': ['/api/companies', companyId] });
        }
    });
    // تحديث النموذج عند تحميل بيانات الشركة
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (company) {
            form.reset({
                'name': (_a = company.name) !== null && _a !== void 0 ? _a : '',
                'description': (_b = company.description) !== null && _b !== void 0 ? _b : '',
                'address': (_c = company.address) !== null && _c !== void 0 ? _c : '',
                'phone': (_d = company.phone) !== null && _d !== void 0 ? _d : '',
                'email': (_e = company.email) !== null && _e !== void 0 ? _e : '',
                'website': (_f = company.website) !== null && _f !== void 0 ? _f : '',
                'industry': (_g = company.industry) !== null && _g !== void 0 ? _g : '',
                'size': (_h = company.size) !== null && _h !== void 0 ? _h : '',
                'status': (_j = company.status) !== null && _j !== void 0 ? _j : 'pending'
            });
        }
    }, [company, form]);
    var getStatusColor = function (status) {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    var getStatusText = function (status) {
        switch (status) {
            case 'active': return 'نشطة';
            case 'suspended': return 'معلقة';
            case 'pending': return 'قيد المراجعة';
            default: return 'غير محدد';
        }
    };
    var getIndustryText = function (industry) {
        var _a;
        var industryMap = {
            'technology': 'تقنية المعلومات',
            'healthcare': 'الرعاية الصحية',
            'finance': 'المالية والمصرفية',
            'manufacturing': 'التصنيع',
            'retail': 'التجارة والبيع',
            'construction': 'البناء والتشييد',
            'education': 'التعليم',
            'other': 'أخرى'
        };
        return (_a = industryMap[industry]) !== null && _a !== void 0 ? _a : industry;
    };
    var getSizeText = function (size) {
        var _a;
        var sizeMap = {
            'small': 'صغيرة (1-50 موظف)',
            'medium': 'متوسطة (51-200 موظف)',
            'large': 'كبيرة (201-1000 موظف)',
            'enterprise': 'مؤسسة (أكثر من 1000 موظف)'
        };
        return (_a = sizeMap[size]) !== null && _a !== void 0 ? _a : size;
    };
    var onSubmit = function (data) {
        updateCompanyMutation.mutate(data);
    };
    if (isLoadingCompany) {
        return (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, {});
    }
    if (companyError) {
        return (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: companyError, title: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629" });
    }
    if (!company) {
        return (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: new Error('الشركة غير موجودة'), title: "\u0627\u0644\u0634\u0631\u0643\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
    }
    // Typed via generics
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setLocation('/companies'); }, className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { className: "h-4 w-4" }), "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0634\u0631\u0643\u0627\u062A"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-foreground", children: company.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2", children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0634\u0627\u0645\u0644\u0629 \u0644\u0644\u0634\u0631\u0643\u0629" })] })] }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: isEditDialogOpen, onOpenChange: setIsEditDialogOpen, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }), "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0629"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u062A\u0639\u062F\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629" }) }), (0, jsx_runtime_1.jsx)(form_1.Form, __assign({}, form, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "name", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "industry", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0627\u0639\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0627\u0639\u0629" }) }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "technology", children: "\u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "healthcare", children: "\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "finance", children: "\u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0648\u0627\u0644\u0645\u0635\u0631\u0641\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "manufacturing", children: "\u0627\u0644\u062A\u0635\u0646\u064A\u0639" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "retail", children: "\u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0648\u0627\u0644\u0628\u064A\u0639" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "construction", children: "\u0627\u0644\u0628\u0646\u0627\u0621 \u0648\u0627\u0644\u062A\u0634\u064A\u064A\u062F" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "education", children: "\u0627\u0644\u062A\u0639\u0644\u064A\u0645" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "other", children: "\u0623\u062E\u0631\u0649" })] })] }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } })] }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "description", render: function (_a) {
                                                        var field = _a.field;
                                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0648\u0635\u0641 \u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(textarea_1.Textarea, __assign({ placeholder: "\u0648\u0635\u0641 \u0627\u0644\u0634\u0631\u0643\u0629" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                    } }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "address", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0634\u0631\u0643\u0629" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "phone", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "email", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "website", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "size", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u062D\u062C\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u062D\u062C\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }) }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "small", children: "\u0635\u063A\u064A\u0631\u0629 (1-50 \u0645\u0648\u0638\u0641)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "medium", children: "\u0645\u062A\u0648\u0633\u0637\u0629 (51-200 \u0645\u0648\u0638\u0641)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "large", children: "\u0643\u0628\u064A\u0631\u0629 (201-1000 \u0645\u0648\u0638\u0641)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "enterprise", children: "\u0645\u0624\u0633\u0633\u0629 (\u0623\u0643\u062B\u0631 \u0645\u0646 1000 \u0645\u0648\u0638\u0641)" })] })] }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "status", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u062D\u0627\u0644\u0629 \u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u062D\u0627\u0644\u0629 \u0627\u0644\u0634\u0631\u0643\u0629" }) }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "\u0646\u0634\u0637\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "pending", children: "\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "suspended", children: "\u0645\u0639\u0644\u0642\u0629" })] })] }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setIsEditDialogOpen(false); }, children: "\u0625\u0644\u063A\u0627\u0621" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: updateCompanyMutation.isPending, children: updateCompanyMutation.isPending ? 'جاري الحفظ...' : 'حفظ التغييرات' })] })] }) }))] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mb-6", children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "".concat(getStatusColor((_b = company.status) !== null && _b !== void 0 ? _b : 'pending')), children: getStatusText((_c = company.status) !== null && _c !== void 0 ? _c : 'pending') }) }), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid w-full grid-cols-4", children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "overview", children: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "employees", children: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "documents", children: "\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "analytics", children: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A" })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "overview", className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "h-5 w-5" }), "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0634\u0631\u0643\u0629"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646:" }), (0, jsx_runtime_1.jsx)("span", { children: company.address })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0647\u0627\u062A\u0641:" }), (0, jsx_runtime_1.jsx)("span", { children: company.phone })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:" }), (0, jsx_runtime_1.jsx)("span", { children: company.email })] }), company.website && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Globe, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0645\u0648\u0642\u0639:" }), (0, jsx_runtime_1.jsxs)("a", { href: company.website, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:underline flex items-center gap-1", children: [company.website, (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { className: "h-3 w-3" })] })] }))] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0635\u0646\u0627\u0639\u0629:" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: getIndustryText((_d = company.industry) !== null && _d !== void 0 ? _d : '') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u062D\u062C\u0645:" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: getSizeText((_e = company.size) !== null && _e !== void 0 ? _e : '') })] })] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { className: "h-5 w-5" }), "\u0627\u0644\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-blue-600", children: employees.length }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: employees.filter(function (e) { return e.status === 'active'; }).length }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-orange-600", children: documents.length }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-purple-600", children: "0" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635" })] })] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { className: "h-5 w-5" }), "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0633\u0631\u064A\u0639\u0629"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "w-full justify-start gap-2", onClick: function () { return setActiveTab('employees'); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UserPlus, { className: "h-4 w-4" }), "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "w-full justify-start gap-2", onClick: function () { return setActiveTab('documents'); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-4 w-4" }), "\u0631\u0641\u0639 \u0645\u0633\u062A\u0646\u062F \u062C\u062F\u064A\u062F"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "w-full justify-start gap-2", onClick: function () { return setActiveTab('analytics'); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PieChart, { className: "h-4 w-4" }), "\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631"] })] })] })] }), company.description && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0648\u0635\u0641 \u0627\u0644\u0634\u0631\u0643\u0629" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground leading-relaxed", children: company.description }) })] }))] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "employees", className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F"] })] }), isLoadingEmployees ? ((0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, {})) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: employees.map(function (employee) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-md transition-shadow", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 mb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-5 w-5 text-blue-600" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold", children: employee.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: employee.position })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-3 w-3 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { children: employee.email })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { className: "h-3 w-3 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { children: employee.phone })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-3 w-3 text-muted-foreground" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0639\u064A\u064A\u0646: ", employee.hireDate ? new Date(employee.hireDate).toLocaleDateString('ar-SA') : '-'] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-3 flex items-center gap-2", children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: employee.status === 'active' ? 'default' : 'secondary', className: employee.status === 'active' ? 'bg-green-100 text-green-800' : '', children: employee.status === 'active' ? 'نشط' : 'غير نشط' }) })] }) }, employee.id)); }) }))] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "documents", className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "\u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-4 w-4" }), "\u0631\u0641\u0639 \u0645\u0633\u062A\u0646\u062F \u062C\u062F\u064A\u062F"] })] }), isLoadingDocuments ? ((0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, {})) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: documents.map(function (doc) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-md transition-shadow", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 mb-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-5 w-5 text-orange-600" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold", children: doc.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: doc.type })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-3 w-3 text-muted-foreground" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0641\u0639: ", doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString('ar-SA') : '-'] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-3 w-3 text-muted-foreground" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u062A\u0645 \u0627\u0644\u0631\u0641\u0639 \u0628\u0648\u0627\u0633\u0637\u0629: ", doc.uploadedBy] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex items-center gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-3 w-3" }), "\u062A\u062D\u0645\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-3 w-3" }), "\u0639\u0631\u0636"] })] })] }) }, doc.id)); }) }))] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "analytics", className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0648\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [(0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-5 w-5 text-green-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0646\u0645\u0648 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: "+12%" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0627\u0636\u064A" })] }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-5 w-5 text-blue-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628" })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: "$125,000" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631" })] }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-5 w-5 text-orange-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062D\u0636\u0648\u0631" })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: "94%" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631" })] }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: "h-5 w-5 text-purple-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: "\u0631\u0636\u0627 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: "4.2/5" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645" })] }) })] })] })] })] }));
}
