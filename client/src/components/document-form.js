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
exports.default = DocumentForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var card_1 = require("./ui/card");
var button_1 = require("./ui/button");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var textarea_1 = require("./ui/textarea");
var select_1 = require("./ui/select");
var badge_1 = require("./ui/badge");
var use_toast_1 = require("../hooks/use-toast");
var lucide_react_1 = require("lucide-react");
var signature_capture_1 = __importDefault(require("./signature-capture"));
var logger_1 = __importDefault(require("../lib/logger"));
var documentCategories = [
    { 'value': 'licenses', 'label': 'التراخيص التجارية', 'icon': lucide_react_1.FileText },
    { 'value': 'employees', 'label': 'قوائم الموظفين', 'icon': lucide_react_1.FileText },
    { 'value': 'import_docs', 'label': 'وثائق الاستيراد', 'icon': lucide_react_1.FileText },
    { 'value': 'authorizations', 'label': 'الاعتمادات الرسمية', 'icon': lucide_react_1.FileText },
    { 'value': 'establishment', 'label': 'عقود التأسيس', 'icon': lucide_react_1.FileText },
    { 'value': 'delegation', 'label': 'كتب التفويض', 'icon': lucide_react_1.FileText },
    { 'value': 'applications', 'label': 'طلبات رسمية', 'icon': lucide_react_1.FileText },
    { 'value': 'identity_docs', 'label': 'وثائق الهوية', 'icon': lucide_react_1.FileText },
    { 'value': 'reports', 'label': 'التقارير', 'icon': lucide_react_1.FileText },
    { 'value': 'contracts', 'label': 'العقود', 'icon': lucide_react_1.FileText },
    { 'value': 'guides', 'label': 'الأدلة', 'icon': lucide_react_1.FileText },
    { 'value': 'other', 'label': 'أخرى', 'icon': lucide_react_1.FileText }
];
var getFileIcon = function (mimeType) {
    if (!mimeType) {
        return lucide_react_1.FileText;
    }
    if (mimeType.includes('pdf')) {
        return lucide_react_1.FileText;
    }
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
        return lucide_react_1.FileSpreadsheet;
    }
    if (mimeType.includes('image')) {
        return lucide_react_1.FileImage;
    }
    if (mimeType.includes('zip') || mimeType.includes('rar')) {
        return lucide_react_1.FileArchive;
    }
    return lucide_react_1.FileText;
};
var formatFileSize = function (bytes) {
    if (!bytes) {
        return 'غير محدد';
    }
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return "".concat(Math.round(bytes / Math.pow(1024, i) * 100) / 100, " ").concat(sizes[i]);
};
function DocumentForm(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f;
    var document = _a.document, entityId = _a.entityId, entityType = _a.entityType, onSave = _a.onSave, onCancel = _a.onCancel, _g = _a.mode, mode = _g === void 0 ? 'create' : _g;
    var _h = (0, react_1.useState)(__assign({ 'name': '', 'type': '', 'fileName': '', 'fileUrl': '', 'description': '', 'category': '', 'tags': [], 'status': 'active' }, document)), formData = _h[0], setFormData = _h[1];
    var _j = (0, react_1.useState)(null), selectedFile = _j[0], setSelectedFile = _j[1];
    var _k = (0, react_1.useState)(false), isLoading = _k[0], setIsLoading = _k[1];
    var _l = (0, react_1.useState)({}), errors = _l[0], setErrors = _l[1];
    var _m = (0, react_1.useState)(false), showSignatureCapture = _m[0], setShowSignatureCapture = _m[1];
    var _o = (0, react_1.useState)(document === null || document === void 0 ? void 0 : document.signature), signature = _o[0], setSignature = _o[1];
    var toast = (0, use_toast_1.useToast)().toast;
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (document) {
            setFormData({
                'name': (_a = document.name) !== null && _a !== void 0 ? _a : '',
                'type': (_b = document.type) !== null && _b !== void 0 ? _b : '',
                'fileName': (_c = document.fileName) !== null && _c !== void 0 ? _c : '',
                'fileUrl': (_d = document.fileUrl) !== null && _d !== void 0 ? _d : '',
                'description': (_e = document.description) !== null && _e !== void 0 ? _e : '',
                'category': (_f = document.category) !== null && _f !== void 0 ? _f : '',
                'tags': (_g = document.tags) !== null && _g !== void 0 ? _g : [],
                'status': (_h = document.status) !== null && _h !== void 0 ? _h : "active",
                'entityId': (_k = (_j = document.entityId) !== null && _j !== void 0 ? _j : entityId) !== null && _k !== void 0 ? _k : '',
                'entityType': (_m = (_l = document.entityType) !== null && _l !== void 0 ? _l : entityType) !== null && _m !== void 0 ? _m : 'employee'
            });
        }
    }, [document, entityId, entityType]);
    var validateForm = function () {
        var newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'اسم المستند مطلوب';
        }
        if (!formData.category) {
            newErrors.category = 'فئة المستند مطلوبة';
        }
        if (mode === 'create' && !selectedFile) {
            newErrors.file = 'الملف مطلوب';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleFileChange = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setSelectedFile(file);
            setFormData(function (prev) { return (__assign(__assign({}, prev), { 'fileName': file.name, 'mimeType': file.type, 'fileSize': file.size, 'type': file.type })); });
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var documentData;
        var _a, _b;
        return __generator(this, function (_c) {
            e.preventDefault();
            if (!validateForm()) {
                toast({
                    'title': 'خطأ في البيانات',
                    'description': 'يرجى تصحيح الأخطاء في النموذج',
                    'variant': 'destructive'
                });
                return [2 /*return*/];
            }
            setIsLoading(true);
            try {
                documentData = __assign(__assign({}, formData), { 'entityId': (_a = entityId !== null && entityId !== void 0 ? entityId : formData.entityId) !== null && _a !== void 0 ? _a : '', 'entityType': (_b = entityType !== null && entityType !== void 0 ? entityType : formData.entityType) !== null && _b !== void 0 ? _b : 'employee', 'uploadDate': new Date().toISOString(), 'modifiedDate': new Date().toISOString() });
                if (onSave) {
                    onSave(documentData);
                }
                toast({
                    'title': 'تم الحفظ بنجاح',
                    'description': mode === 'create' ? 'تم إنشاء المستند بنجاح' : 'تم تحديث المستند بنجاح'
                });
                if (onCancel) {
                    onCancel();
                }
            }
            catch (error) {
                logger_1.default.error('Error saving document:', error);
                toast({
                    'title': 'خطأ في الحفظ',
                    'description': 'حدث خطأ أثناء حفظ المستند',
                    'variant': 'destructive'
                });
            }
            finally {
                setIsLoading(false);
            }
            return [2 /*return*/];
        });
    }); };
    var handleDownload = function () {
        if (formData.fileUrl) {
            window.open(formData.fileUrl, '_blank');
        }
    };
    var handleDelete = function () {
        if (window.confirm('هل أنت متأكد من حذف هذا المستند؟')) {
            // في التطبيق الحقيقي، هنا يتم حذف المستند من الخادم
            toast({
                'title': 'تم الحذف',
                'description': 'تم حذف المستند بنجاح'
            });
            if (onCancel) {
                onCancel();
            }
        }
    };
    var handleSignatureSave = function (signatureData) {
        setSignature(signatureData);
        setShowSignatureCapture(false);
        setFormData(function (prev) { return (__assign(__assign({}, prev), { 'signature': signatureData })); });
    };
    if (mode === 'view') {
        return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-2xl mx-auto", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-5 w-5" }), "\u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u062A\u0646\u062F"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 p-4 bg-gray-50 rounded-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-2 bg-blue-100 rounded", children: react_1.default.createElement(getFileIcon(formData.mimeType), {
                                        'className': 'h-8 w-8 text-blue-600'
                                    }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-lg", children: formData.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: formData.fileName }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-500", children: formatFileSize(formData.fileSize) })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleDownload, variant: "outline", size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4 ml-1" }), "\u062A\u062D\u0645\u064A\u0644"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0627\u0644\u0641\u0626\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm", children: (_b = documentCategories.find(function (cat) { return cat.value === formData.category; })) === null || _b === void 0 ? void 0 : _b.label })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "mt-1", variant: formData.status === 'active' ? 'default' : 'secondary', children: formData.status === 'active' ? 'نشط' : 'غير نشط' })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0631\u0641\u0639" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-sm flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-3 w-3" }), formData.uploadDate ? new Date(formData.uploadDate).toLocaleDateString('ar-SA') : 'غير محدد'] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u062A\u0645 \u0627\u0644\u0631\u0641\u0639 \u0628\u0648\u0627\u0633\u0637\u0629" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-sm flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-3 w-3" }), (_c = formData.uploadedBy) !== null && _c !== void 0 ? _c : "غير محدد"] })] })] }), formData.description && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0627\u0644\u0648\u0635\u0641" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-gray-600", children: formData.description })] })), formData.tags && formData.tags.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex flex-wrap gap-1", children: formData.tags.map(function (tag, index) { return ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "text-xs", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Tag, { className: "h-3 w-3 ml-1" }), tag] }, index)); }) })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: onCancel, variant: "outline", children: "\u0625\u063A\u0644\u0627\u0642" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setFormData(__assign({}, formData)); }, variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4 ml-1" }), "\u062A\u0639\u062F\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleDelete, variant: "destructive", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4 ml-1" }), "\u062D\u0630\u0641"] })] })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-2xl mx-auto", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-5 w-5" }), mode === 'create' ? 'إضافة مستند جديد' : 'تعديل المستند'] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", value: formData.name, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'name': e.target.value })); }); }, placeholder: "\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u0646\u062F", className: errors.name ? 'border-red-500' : '' }), errors.name && (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500 mt-1", children: errors.name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "category", children: "\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.category, onValueChange: function (value) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'category': value })); }); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: errors.category ? 'border-red-500' : '', children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0646\u062F" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: documentCategories.map(function (category) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: category.value, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [react_1.default.createElement(category.icon, { 'className': 'h-4 w-4' }), category.label] }) }, category.value)); }) })] }), errors.category && (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500 mt-1", children: errors.category })] }), mode === 'create' && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "file", children: "\u0627\u0644\u0645\u0644\u0641 *" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1", children: (0, jsx_runtime_1.jsx)(input_1.Input, { id: "file", type: "file", onChange: handleFileChange, accept: ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar", className: errors.file ? 'border-red-500' : '' }) }), errors.file && (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-500 mt-1", children: errors.file }), selectedFile && ((0, jsx_runtime_1.jsx)("div", { className: "mt-2 p-2 bg-blue-50 rounded border", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-blue-700", children: ["\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631: ", selectedFile.name, " (", formatFileSize(selectedFile.size), ")"] }) }))] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "description", children: "\u0627\u0644\u0648\u0635\u0641" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "description", value: formData.description, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'description': e.target.value })); }); }, placeholder: "\u0623\u062F\u062E\u0644 \u0648\u0635\u0641 \u0627\u0644\u0645\u0633\u062A\u0646\u062F (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)", rows: 3 })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "tags", children: "\u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "tags", value: (_e = (_d = formData.tags) === null || _d === void 0 ? void 0 : _d.join(', ')) !== null && _e !== void 0 ? _e : '', onChange: function (e) {
                                                var tags = e.target.value.split(',').map(function (tag) { return tag.trim(); }).filter(function (tag) { return tag; });
                                                setFormData(function (prev) { return (__assign(__assign({}, prev), { tags: tags })); });
                                            }, placeholder: "\u0623\u062F\u062E\u0644 \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062A \u0645\u0641\u0635\u0648\u0644\u0629 \u0628\u0641\u0648\u0627\u0635\u0644" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "status", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: (_f = formData.status) !== null && _f !== void 0 ? _f : 'active', onValueChange: function (value) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'status': value })); }); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "\u0646\u0634\u0637" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "inactive", children: "\u063A\u064A\u0631 \u0646\u0634\u0637" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 space-y-2", children: signature ? ((0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-4 bg-gray-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileImage, { className: "h-4 w-4 text-blue-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: "\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: function () { return setShowSignatureCapture(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4 mr-1" }), "\u062A\u0639\u062F\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: function () {
                                                                            setSignature(undefined);
                                                                            setFormData(function (prev) {
                                                                                var updated = __assign({}, prev);
                                                                                delete updated.signature;
                                                                                return updated;
                                                                            });
                                                                        }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4 mr-1" }), "\u062D\u0630\u0641"] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2", children: (0, jsx_runtime_1.jsx)("img", { src: signature.imageData, alt: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639", className: "w-full h-24 object-contain border rounded", loading: "lazy", decoding: "async", width: "384", height: "96" }) })] })) : ((0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setShowSignatureCapture(true); }, className: "w-full", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PenTool, { className: "h-4 w-4 mr-1" }), "\u0625\u0636\u0627\u0641\u0629 \u062A\u0648\u0642\u064A\u0639"] })) })] })] }), showSignatureCapture && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4", children: (0, jsx_runtime_1.jsx)(signature_capture_1.default, { entityId: entityId !== null && entityId !== void 0 ? entityId : '', entityType: "document", onSave: handleSignatureSave, onCancel: function () { return setShowSignatureCapture(false); }, title: "\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F", description: "\u0642\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u0646\u062F" }) }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: onCancel, variant: "outline", children: "\u0625\u0644\u063A\u0627\u0621" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: isLoading, children: isLoading ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2" }), "\u062C\u0627\u0631\u064A \u0627\u0644\u062D\u0641\u0638..."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4 ml-1" }), mode === 'create' ? 'إنشاء' : 'حفظ التغييرات'] })) })] })] }) })] }));
}
