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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeForm = EmployeeForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var z = __importStar(require("zod"));
var button_1 = require("./ui/button");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var textarea_1 = require("./ui/textarea");
var select_1 = require("./ui/select");
var card_1 = require("./ui/card");
var use_toast_1 = require("../hooks/use-toast");
var employee_1 = require("../services/employee");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var logger_1 = __importDefault(require("../lib/logger"));
// مخطط التحقق من صحة البيانات
var employeeSchema = z.object({
    'firstName': z.string().min(2, 'الاسم الأول مطلوب و يجب أن يكون على الأقل حرفين'),
    'lastName': z.string().min(2, 'الاسم الأخير مطلوب و يجب أن يكون على الأقل حرفين'),
    'email': z.string().email('البريد الإلكتروني غير صحيح'),
    'phone': z.string().min(8, 'رقم الهاتف مطلوب'),
    'position': z.string().min(2, 'المنصب مطلوب'),
    'department': z.string().min(2, 'القسم مطلوب'),
    'hireDate': z.string().min(1, 'تاريخ التوظيف مطلوب'),
    'salary': z.number().min(0, 'الراتب يجب أن يكون رقم موجب'),
    'nationalId': z.string().min(10, 'رقم الهوية الوطنية مطلوب'),
    'birthDate': z.string().min(1, 'تاريخ الميلاد مطلوب'),
    'address': z.string().min(5, 'العنوان مطلوب'),
    'emergencyContact': z.string().min(8, 'رقم الطوارئ مطلوب'),
    'experience': z.number().min(0, 'الخبرة يجب أن تكون رقم موجب'),
    'education': z.string().min(2, 'المؤهل العلمي مطلوب'),
    'companyId': z.string().min(1, 'الشركة مطلوبة')
});
var departments = [
    'الموارد البشرية',
    'المحاسبة',
    'التسويق',
    'تقنية المعلومات',
    'العمليات',
    'المبيعات',
    'خدمة العملاء',
    'الإنتاج',
    'الصيانة',
    'الأمن'
];
var positions = [
    'مدير',
    'نائب مدير',
    'رئيس قسم',
    'أخصائي أول',
    'أخصائي',
    'مساعد',
    'منسق',
    'مشرف',
    'موظف'
];
function EmployeeForm(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    var employee = _a.employee, companyId = _a.companyId, onSuccess = _a.onSuccess, onCancel = _a.onCancel, mode = _a.mode;
    var toast = (0, use_toast_1.useToast)().toast;
    var queryClient = (0, react_query_1.useQueryClient)();
    var _q = (0, react_1.useState)(false), isSubmitting = _q[0], setIsSubmitting = _q[1];
    // Helper function to safely format dates
    var formatDate = function (dateString) {
        var _a;
        if (!dateString)
            return '';
        try {
            var date = new Date(dateString);
            if (isNaN(date.getTime()))
                return '';
            var isoString = date.toISOString();
            return (_a = isoString.split('T')[0]) !== null && _a !== void 0 ? _a : '';
        }
        catch (_b) {
            return '';
        }
    };
    var _r = (0, react_hook_form_1.useForm)({
        'resolver': (0, zod_1.zodResolver)(employeeSchema),
        'defaultValues': {
            'firstName': (_b = employee === null || employee === void 0 ? void 0 : employee.firstName) !== null && _b !== void 0 ? _b : '',
            'lastName': (_c = employee === null || employee === void 0 ? void 0 : employee.lastName) !== null && _c !== void 0 ? _c : '',
            'email': (_d = employee === null || employee === void 0 ? void 0 : employee.email) !== null && _d !== void 0 ? _d : '',
            'phone': (_e = employee === null || employee === void 0 ? void 0 : employee.phone) !== null && _e !== void 0 ? _e : '',
            'position': (_f = employee === null || employee === void 0 ? void 0 : employee.position) !== null && _f !== void 0 ? _f : '',
            'department': (_g = employee === null || employee === void 0 ? void 0 : employee.department) !== null && _g !== void 0 ? _g : '',
            'hireDate': formatDate(employee === null || employee === void 0 ? void 0 : employee.hireDate),
            'salary': (_h = employee === null || employee === void 0 ? void 0 : employee.salary) !== null && _h !== void 0 ? _h : 0,
            'nationalId': (_j = employee === null || employee === void 0 ? void 0 : employee.nationalId) !== null && _j !== void 0 ? _j : '',
            'birthDate': formatDate(employee === null || employee === void 0 ? void 0 : employee.birthDate),
            'address': (_k = employee === null || employee === void 0 ? void 0 : employee.address) !== null && _k !== void 0 ? _k : '',
            'emergencyContact': (_l = employee === null || employee === void 0 ? void 0 : employee.emergencyContact) !== null && _l !== void 0 ? _l : '',
            'experience': (_m = employee === null || employee === void 0 ? void 0 : employee.experience) !== null && _m !== void 0 ? _m : 0,
            'education': (_o = employee === null || employee === void 0 ? void 0 : employee.education) !== null && _o !== void 0 ? _o : '',
            'companyId': (_p = companyId !== null && companyId !== void 0 ? companyId : employee === null || employee === void 0 ? void 0 : employee.companyId) !== null && _p !== void 0 ? _p : ''
        }
    }), register = _r.register, handleSubmit = _r.handleSubmit, errors = _r["formState"].errors, reset = _r.reset, setValue = _r.setValue, watch = _r.watch;
    // طلب إنشاء موظف جديد
    var createEmployeeMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (data) { return employee_1.EmployeeService.createEmployee(data); },
        'onSuccess': function (_newEmployee) {
            toast({
                'title': 'تم بنجاح',
                'description': 'تم إضافة الموظف الجديد بنجاح',
                'variant': 'default'
            });
            queryClient.invalidateQueries({ 'queryKey': ['employees'] });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            reset();
        },
        'onError': function (error) {
            toast({
                'title': 'خطأ',
                'description': 'حدث خطأ أثناء إضافة الموظف',
                'variant': 'destructive'
            });
            logger_1.default.error('Error creating employee:', error);
        }
    });
    // طلب تحديث موظف موجود
    var updateEmployeeMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (data) { return employee_1.EmployeeService.updateEmployee(data); },
        'onSuccess': function (_updatedEmployee) {
            toast({
                'title': 'تم بنجاح',
                'description': 'تم تحديث بيانات الموظف بنجاح',
                'variant': 'default'
            });
            queryClient.invalidateQueries({ 'queryKey': ['employees'] });
            queryClient.invalidateQueries({ 'queryKey': ['employee', employee === null || employee === void 0 ? void 0 : employee.id] });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        },
        'onError': function (error) {
            toast({
                'title': 'خطأ',
                'description': 'حدث خطأ أثناء تحديث بيانات الموظف',
                'variant': 'destructive'
            });
            logger_1.default.error('Error updating employee:', error);
        }
    });
    // طلب أرشفة موظف
    var archiveEmployeeMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (id) { return employee_1.EmployeeService.deleteEmployee(id); },
        'onSuccess': function () {
            toast({
                'title': 'تم بنجاح',
                'description': 'تم أرشفة الموظف بنجاح',
                'variant': 'default'
            });
            queryClient.invalidateQueries({ 'queryKey': ['employees'] });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        },
        'onError': function (error) {
            toast({
                'title': 'خطأ',
                'description': 'حدث خطأ أثناء أرشفة الموظف',
                'variant': 'destructive'
            });
            logger_1.default.error('Error archiving employee:', error);
        }
    });
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    if (!(mode === 'create')) return [3 /*break*/, 3];
                    return [4 /*yield*/, createEmployeeMutation.mutateAsync(__assign(__assign({}, data), { 'companyId': data.companyId }))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!(mode === 'update' && employee)) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateEmployeeMutation.mutateAsync(__assign(__assign({ 'id': employee.id }, data), { 'companyId': data.companyId, '__etag': employee.__etag || undefined }))];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        logger_1.default.error('Form submission error:', error_1);
                    }
                    else {
                        logger_1.default.error('Form submission error:', new Error(String(error_1)));
                    }
                    return [3 /*break*/, 8];
                case 7:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleArchive = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(employee && mode === 'update')) return [3 /*break*/, 2];
                    return [4 /*yield*/, archiveEmployeeMutation.mutateAsync(employee.id)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-4xl mx-auto", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "flex items-center gap-2", children: mode === 'create' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UserPlus, { className: "h-5 w-5" }), "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F"] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-5 w-5" }), "\u062A\u062D\u062F\u064A\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641"] })) }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: mode === 'create'
                            ? 'قم بتعبئة بيانات الموظف الجديد'
                            : 'قم بتحديث بيانات الموظف المحدد' })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "firstName", children: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "firstName" }, register('firstName'), { placeholder: "\u0623\u062D\u0645\u062F", className: errors.firstName ? 'border-red-500' : '' })), errors.firstName && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.firstName.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "lastName", children: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u062E\u064A\u0631 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "lastName" }, register('lastName'), { placeholder: "\u0645\u062D\u0645\u062F", className: errors.lastName ? 'border-red-500' : '' })), errors.lastName && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.lastName.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "email", type: "email" }, register('email'), { placeholder: "ahmed@company.com", className: errors.email ? 'border-red-500' : '' })), errors.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.email.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "phone" }, register('phone'), { placeholder: "+965 9999 1234", className: errors.phone ? 'border-red-500' : '' })), errors.phone && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.phone.message }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "position", children: "\u0627\u0644\u0645\u0646\u0635\u0628 *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: watch('position'), onValueChange: function (value) { return setValue('position', value); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: errors.position ? 'border-red-500' : '', children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0646\u0635\u0628" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: positions.map(function (position) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: position, children: position }, position)); }) })] }), errors.position && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.position.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "department", children: "\u0627\u0644\u0642\u0633\u0645 *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: watch('department'), onValueChange: function (value) { return setValue('department', value); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: errors.department ? 'border-red-500' : '', children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0633\u0645" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: departments.map(function (department) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: department, children: department }, department)); }) })] }), errors.department && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.department.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "hireDate", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0648\u0638\u064A\u0641 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "hireDate", type: "date" }, register('hireDate'), { className: errors.hireDate ? 'border-red-500' : '' })), errors.hireDate && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.hireDate.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "salary", children: "\u0627\u0644\u0631\u0627\u062A\u0628 (\u062F\u064A\u0646\u0627\u0631 \u0643\u0648\u064A\u062A\u064A) *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "salary", type: "number", step: "0.01" }, register('salary', { 'valueAsNumber': true }), { placeholder: "1000", className: errors.salary ? 'border-red-500' : '' })), errors.salary && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.salary.message }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "nationalId", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "nationalId" }, register('nationalId'), { placeholder: "123456789", className: errors.nationalId ? 'border-red-500' : '' })), errors.nationalId && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.nationalId.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "birthDate", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "birthDate", type: "date" }, register('birthDate'), { className: errors.birthDate ? 'border-red-500' : '' })), errors.birthDate && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.birthDate.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "emergencyContact", children: "\u0631\u0642\u0645 \u0627\u0644\u0637\u0648\u0627\u0631\u0626 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "emergencyContact" }, register('emergencyContact'), { placeholder: "+965 9999 5678", className: errors.emergencyContact ? 'border-red-500' : '' })), errors.emergencyContact && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.emergencyContact.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "experience", children: "\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "experience", type: "number" }, register('experience', { 'valueAsNumber': true }), { placeholder: "5", className: errors.experience ? 'border-red-500' : '' })), errors.experience && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.experience.message }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address", children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 *" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, __assign({ id: "address" }, register('address'), { placeholder: "\u0627\u0644\u0643\u0648\u064A\u062A\u060C \u062D\u0648\u0644\u064A\u060C \u0634\u0627\u0631\u0639...", className: errors.address ? 'border-red-500' : '', rows: 3 })), errors.address && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.address.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "education", children: "\u0627\u0644\u0645\u0624\u0647\u0644 \u0627\u0644\u0639\u0644\u0645\u064A *" }), (0, jsx_runtime_1.jsx)(input_1.Input, __assign({ id: "education" }, register('education'), { placeholder: "\u0628\u0643\u0627\u0644\u0648\u0631\u064A\u0648\u0633 \u0625\u062F\u0627\u0631\u0629 \u0623\u0639\u0645\u0627\u0644", className: errors.education ? 'border-red-500' : '' })), errors.education && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500", children: errors.education.message }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-3 pt-6 border-t", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", onClick: onCancel, disabled: isSubmitting, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4 ml-2" }), "\u0625\u0644\u063A\u0627\u0621"] }), mode === 'update' && ((0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "destructive", onClick: handleArchive, disabled: isSubmitting, children: "\u0623\u0631\u0634\u0641\u0629" })), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: isSubmitting, className: "min-w-[120px]", children: isSubmitting ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 ml-2 animate-spin" }), "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4 ml-2" }), mode === 'create' ? 'إضافة' : 'تحديث'] })) })] })] }) })] }));
}
