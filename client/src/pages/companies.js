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
exports.default = Companies;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var wouter_1 = require("wouter");
var queryClient_1 = require("@/lib/queryClient");
var shared_1 = require("../components/shared");
var card_1 = require("../components/ui/card");
var button_1 = require("../components/ui/button");
var input_1 = require("../components/ui/input");
var badge_1 = require("../components/ui/badge");
var dialog_1 = require("../components/ui/dialog");
var form_1 = require("../components/ui/form");
var textarea_1 = require("../components/ui/textarea");
var select_1 = require("../components/ui/select");
var separator_1 = require("../components/ui/separator");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var zod_2 = require("zod");
var lucide_react_1 = require("lucide-react");
var companySchema = zod_2.z.object({
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
function Companies() {
    var _this = this;
    var _a = (0, react_1.useState)(''), searchQuery = _a[0], setSearchQuery = _a[1];
    var _b = (0, react_1.useState)('all'), statusFilter = _b[0], setStatusFilter = _b[1];
    var _c = (0, react_1.useState)(false), isAddDialogOpen = _c[0], setIsAddDialogOpen = _c[1];
    var _d = (0, react_1.useState)(null), editingCompany = _d[0], setEditingCompany = _d[1];
    var _e = (0, wouter_1.useLocation)(), setLocation = _e[1];
    var form = (0, react_hook_form_1.useForm)({
        'resolver': (0, zod_1.zodResolver)(companySchema),
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
    var _f = (0, react_query_1.useQuery)({
        'queryKey': ['/api/companies']
    }), _g = _f["data"], companies = _g === void 0 ? [] : _g, isLoading = _f.isLoading, error = _f.error;
    var addCompanyMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, queryClient_1.apiRequest)('POST', '/api/companies', data)];
                    case 1: 
                    // Use the apiRequest from queryClient with correct parameter order
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); },
        'onSuccess': function () {
            setIsAddDialogOpen(false);
            form.reset();
            queryClient_1.queryClient.invalidateQueries({ 'queryKey': ['/api/companies'] });
        }
    });
    var filteredCompanies = companies.filter(function (company) {
        var _a, _b;
        var matchesSearch = ((_a = company.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchQuery.toLowerCase())) ||
            ((_b = company.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchQuery.toLowerCase()));
        var matchesStatus = statusFilter === 'all' || company.status === statusFilter;
        return Boolean(matchesSearch) && matchesStatus;
    });
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
    var onSubmit = function (data) {
        if (editingCompany) {
            // Update company logic
        }
        else {
            addCompanyMutation.mutate(data);
        }
    };
    var statsData = {
        'total': companies.length,
        'active': companies.filter(function (c) { return c.status === 'active'; }).length,
        'pending': companies.filter(function (c) { return c.status === 'pending'; }).length,
        'suspended': companies.filter(function (c) { return c.status === 'suspended'; }).length
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-foreground", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2", children: "\u0625\u062F\u0627\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645" })] }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), "\u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u0643\u0629 \u062C\u062F\u064A\u062F\u0629"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: editingCompany ? 'تعديل الشركة' : 'إضافة شركة جديدة' }) }), (0, jsx_runtime_1.jsx)(form_1.Form, __assign({}, form, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "name", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "\u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "industry", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0627\u0639\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0635\u0646\u0627\u0639\u0629" }) }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "technology", children: "\u062A\u0642\u0646\u064A\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "healthcare", children: "\u0627\u0644\u0631\u0639\u0627\u064A\u0629 \u0627\u0644\u0635\u062D\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "finance", children: "\u0627\u0644\u0645\u0627\u0644\u064A\u0629 \u0648\u0627\u0644\u0645\u0635\u0631\u0641\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "manufacturing", children: "\u0627\u0644\u062A\u0635\u0646\u064A\u0639" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "retail", children: "\u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0648\u0627\u0644\u0628\u064A\u0639" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "construction", children: "\u0627\u0644\u0628\u0646\u0627\u0621 \u0648\u0627\u0644\u062A\u0634\u064A\u064A\u062F" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "education", children: "\u0627\u0644\u062A\u0639\u0644\u064A\u0645" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "other", children: "\u0623\u062E\u0631\u0649" })] })] }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } })] }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "description", render: function (_a) {
                                                        var field = _a.field;
                                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0648\u0635\u0641 \u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(textarea_1.Textarea, __assign({ placeholder: "\u0648\u0635\u0641 \u0645\u062E\u062A\u0635\u0631 \u0639\u0646 \u0646\u0634\u0627\u0637 \u0627\u0644\u0634\u0631\u0643\u0629" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                    } }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "phone", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "+966 50 123 4567" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "email", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "info@company.com" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } })] }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "address", render: function (_a) {
                                                        var field = _a.field;
                                                        return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0643\u0627\u0645\u0644 \u0644\u0644\u0634\u0631\u0643\u0629" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                    } }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "website", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)" }), (0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ placeholder: "https://company.com" }, field)) }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } }), (0, jsx_runtime_1.jsx)(form_1.FormField, { control: form.control, name: "size", render: function (_a) {
                                                                var field = _a.field;
                                                                return ((0, jsx_runtime_1.jsxs)(form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: "\u062D\u062C\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { onValueChange: field.onChange, defaultValue: field.value, children: [(0, jsx_runtime_1.jsx)(form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u062D\u062C\u0645 \u0627\u0644\u0634\u0631\u0643\u0629" }) }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "startup", children: "\u0646\u0627\u0634\u0626\u0629 (1-10 \u0645\u0648\u0638\u0641\u064A\u0646)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "small", children: "\u0635\u063A\u064A\u0631\u0629 (11-50 \u0645\u0648\u0638\u0641)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "medium", children: "\u0645\u062A\u0648\u0633\u0637\u0629 (51-200 \u0645\u0648\u0638\u0641)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "large", children: "\u0643\u0628\u064A\u0631\u0629 (201-1000 \u0645\u0648\u0638\u0641)" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "enterprise", children: "\u0645\u0624\u0633\u0633\u064A\u0629 (+1000 \u0645\u0648\u0638\u0641)" })] })] }), (0, jsx_runtime_1.jsx)(form_1.FormMessage, {})] }));
                                                            } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-3 pt-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setIsAddDialogOpen(false); }, children: "\u0625\u0644\u063A\u0627\u0621" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: addCompanyMutation.isPending, children: addCompanyMutation.isPending ? 'جاري الحفظ...' : 'حفظ الشركة' })] })] }) }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [(0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-blue-600", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0634\u0631\u0643\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-blue-700", children: statsData.total })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "h-8 w-8 text-blue-500" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-gradient-to-br from-green-50 to-green-100 border-green-200", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-green-600", children: "\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-green-700", children: statsData.active })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-8 w-8 text-green-500" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-yellow-600", children: "\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-yellow-700", children: statsData.pending })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-8 w-8 text-yellow-500" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { className: "bg-gradient-to-br from-red-50 to-red-100 border-red-200", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-red-600", children: "\u0645\u0639\u0644\u0642\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-red-700", children: statsData.suspended })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-8 w-8 text-red-500" })] }) }) })] }), (0, jsx_runtime_1.jsx)(card_1.Card, { className: "mb-6", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0634\u0631\u0643\u0627\u062A...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "pl-10" })] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: statusFilter, onValueChange: function (value) { return setStatusFilter(value); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-full md:w-48", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0641\u0644\u062A\u0631\u0629 \u062D\u0633\u0628 \u0627\u0644\u062D\u0627\u0644\u0629" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "\u0646\u0634\u0637\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "pending", children: "\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "suspended", children: "\u0645\u0639\u0644\u0642\u0629" })] })] })] }) }) }), isLoading && ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-12", children: (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, { text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A..." }) })), error && ((0, jsx_runtime_1.jsx)("div", { className: "py-8", children: (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: error, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A", onRetry: function () { return window.location.reload(); } }) })), !isLoading && !error && ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredCompanies.map(function (company) {
                    var _a, _b, _c;
                    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "h-6 w-6 text-white" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: company.name }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "text-xs ".concat(getStatusColor(company.status)), children: getStatusText(company.status) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () {
                                                        setLocation("/company-details?id=".concat(company.id));
                                                    }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () {
                                                        setEditingCompany(company);
                                                        setIsAddDialogOpen(true);
                                                    }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) })] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [company.description && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground line-clamp-2", children: company.description })), company.address && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1", children: company.address })] })), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4 text-blue-500" }), (0, jsx_runtime_1.jsxs)("span", { children: [(_a = company.totalEmployees) !== null && _a !== void 0 ? _a : 0, " \u0645\u0648\u0638\u0641"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 text-green-500" }), (0, jsx_runtime_1.jsxs)("span", { children: [(_b = company.activeLicenses) !== null && _b !== void 0 ? _b : 0, " \u0631\u062E\u0635\u0629"] })] })] }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "default", size: "sm", className: "flex-1", onClick: function () {
                                                    setLocation("/company-details?id=".concat(company.id));
                                                }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { className: "h-4 w-4 ml-2" }), "\u0639\u0631\u0636 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644"] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: function () {
                                                    // TODO: Implement company settings
                                                }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-3 w-3" }), "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0633\u062C\u064A\u0644: ", new Date((_c = company.createdAt) !== null && _c !== void 0 ? _c : Date.now()).toLocaleDateString('ar-SA')] })] })] }, company.id));
                }) })), !isLoading && !error && filteredCompanies.length === 0 && ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "text-center py-12", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "h-16 w-16 mx-auto mb-4 text-muted-foreground/30" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-2", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground mb-4", children: (searchQuery !== null && searchQuery !== void 0 ? searchQuery : statusFilter !== 'all')
                                ? 'لا توجد شركات تطابق معايير البحث'
                                : 'لم يتم تسجيل أي شركات بعد' }), !searchQuery && statusFilter === 'all' && ((0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setIsAddDialogOpen(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 ml-2" }), "\u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u0643\u0629 \u062C\u062F\u064A\u062F\u0629"] }))] }) }))] }));
}
