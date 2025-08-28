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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../components/ui/card");
var button_1 = require("../components/ui/button");
var input_1 = require("../components/ui/input");
var select_1 = require("../components/ui/select");
var tabs_1 = require("../components/ui/tabs");
var badge_1 = require("../components/ui/badge");
var dialog_1 = require("../components/ui/dialog");
var use_toast_1 = require("../hooks/use-toast");
var react_i18next_1 = require("react-i18next");
var document_form_1 = __importDefault(require("../components/document-form"));
var lucide_react_1 = require("lucide-react");
var mockDocuments = [
    {
        'id': '1',
        'name': 'عقد العمل - أحمد محمد.pdf',
        'type': 'pdf',
        'size': '2.4 MB',
        'status': 'verified',
        'uploadedBy': 'أحمد محمد',
        'uploadedAt': '2024-01-15',
        'category': 'contracts',
        'description': 'عقد العمل الأساسي للموظف',
        'fileName': 'contract-ahmad-mohamed.pdf',
        'fileUrl': '/api/v1/documents/1/download',
        'fileSize': 2516582,
        'mimeType': 'application/pdf',
        'tags': ['عقد', 'أحمد محمد', 'توظيف']
    },
    {
        'id': '2',
        'name': 'صورة الهوية الوطنية.jpg',
        'type': 'image',
        'size': '1.8 MB',
        'status': 'pending',
        'uploadedBy': 'فاطمة أحمد',
        'uploadedAt': '2024-01-14',
        'category': 'personal',
        'description': 'صورة الهوية الوطنية للموظف',
        'fileName': 'national-id-photo.jpg',
        'fileUrl': '/api/v1/documents/2/download',
        'fileSize': 1887437,
        'mimeType': 'image/jpeg',
        'tags': ['هوية', 'صورة', 'شخصية']
    },
    {
        'id': '3',
        'name': 'تقرير الأداء الشهري.pdf',
        'type': 'pdf',
        'size': '3.2 MB',
        'status': 'verified',
        'uploadedBy': 'مدير الموارد البشرية',
        'uploadedAt': '2024-01-13',
        'category': 'reports',
        'description': 'تقرير الأداء الشهري للموظف',
        'fileName': 'monthly-performance-report.pdf',
        'fileUrl': '/api/v1/documents/3/download',
        'fileSize': 3355443,
        'mimeType': 'application/pdf',
        'tags': ['تقرير', 'أداء', 'شهري']
    }
];
function DocumentsPage() {
    var _a = (0, react_1.useState)(''), searchTerm = _a[0], setSearchTerm = _a[1];
    var _b = (0, react_1.useState)('all'), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = (0, react_1.useState)('all'), activeTab = _c[0], setActiveTab = _c[1];
    var _d = (0, react_1.useState)(false), showForm = _d[0], setShowForm = _d[1];
    var _e = (0, react_1.useState)(null), editingDocument = _e[0], setEditingDocument = _e[1];
    var _f = (0, react_1.useState)(null), viewingDocument = _f[0], setViewingDocument = _f[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var t = (0, react_i18next_1.useTranslation)().t;
    var filteredDocuments = mockDocuments.filter(function (doc) {
        var matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
        var matchesCategory = selectedCategory === 'all' || (doc.category && doc.category === selectedCategory);
        return matchesSearch && matchesCategory;
    });
    var getStatusColor = function (status) {
        switch (status) {
            case 'verified':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    var getStatusText = function (status) {
        switch (status) {
            case 'verified':
                return 'تم التحقق';
            case 'pending':
                return 'قيد المراجعة';
            case 'rejected':
                return 'مرفوض';
            default:
                return 'غير محدد';
        }
    };
    var stats = [
        {
            'label': 'إجمالي المستندات', 'value': mockDocuments.length.toString(), 'icon': lucide_react_1.FileText, 'color': 'blue'
        },
        { 'label': 'مستندات جديدة', 'value': '23', 'icon': lucide_react_1.Plus, 'color': 'green' },
        { 'label': 'قيد المراجعة', 'value': '8', 'icon': lucide_react_1.Eye, 'color': 'yellow' },
        { 'label': 'تم التحقق', 'value': '116', 'icon': lucide_react_1.User, 'color': 'purple' },
        { 'label': 'الحجم الإجمالي', 'value': '2.4 GB', 'icon': lucide_react_1.FolderOpen, 'color': 'indigo' }
    ];
    var handleSaveDocument = function (documentData) {
        if (editingDocument) {
            // Update existing document
            var _updatedDocuments = mockDocuments.map(function (doc) {
                return doc.id === editingDocument.id ? __assign(__assign({}, doc), documentData) : doc;
            });
            // In real app, update state here
            toast({
                'title': 'تم التحديث بنجاح',
                'description': 'تم تحديث المستند بنجاح'
            });
        }
        else {
            // In real app, add to state here
            toast({
                'title': 'تم الإنشاء بنجاح',
                'description': 'تم إنشاء المستند الجديد بنجاح'
            });
        }
        setShowForm(false);
        setEditingDocument(null);
    };
    var handleEditDocument = function (document) {
        setEditingDocument(document);
        setShowForm(true);
    };
    var handleViewDocument = function (document) {
        setViewingDocument(document);
    };
    var handleDeleteDocument = function (_documentId) {
        if (window.confirm('هل أنت متأكد من حذف هذا المستند؟')) {
            // In real app, delete from state here
            toast({
                'title': 'تم الحذف بنجاح',
                'description': 'تم حذف المستند بنجاح'
            });
        }
    };
    return ((0, jsx_runtime_1.jsxs)("main", { role: "main", className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: t('documents.title') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-4 w-4 ml-2" }), "\u0641\u0644\u062A\u0631\u0629"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-blue-600 hover:bg-blue-700 cursor-pointer", onClick: function () { return setShowForm(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-4 w-4 ml-2" }), "\u0631\u0641\u0639 \u0645\u0633\u062A\u0646\u062F"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "pr-10" })] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "contracts", children: "\u0639\u0642\u0648\u062F" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "payroll", children: "\u0631\u0648\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "reports", children: "\u062A\u0642\u0627\u0631\u064A\u0631" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "personal", children: "\u0634\u062E\u0635\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "leaves", children: "\u0625\u062C\u0627\u0632\u0627\u062A" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-gray-600", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FolderOpen, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A: ", mockDocuments.length] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid w-full grid-cols-6", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "all", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), "\u0627\u0644\u0643\u0644"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "contracts", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), "\u0639\u0642\u0648\u062F"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "payroll", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), "\u0631\u0648\u0627\u062A\u0628"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "reports", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), "\u062A\u0642\u0627\u0631\u064A\u0631"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "personal", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileImage, { className: "h-4 w-4" }), "\u0634\u062E\u0635\u064A\u0629"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "leaves", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), "\u0625\u062C\u0627\u0632\u0627\u062A"] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: activeTab, className: "mt-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: stats.map(function (stat, index) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: stat.label }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: stat.value })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 rounded-full bg-".concat(stat.color, "-100"), children: (0, jsx_runtime_1.jsx)(stat.icon, { className: "h-6 w-6 text-".concat(stat.color, "-600") }) })] }) }) }, index)); }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredDocuments.map(function (doc) {
                                    var _a, _b, _c, _d, _e;
                                    return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-lg transition-shadow", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-start justify-between mb-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-lg mb-2", children: doc.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mb-2", children: doc.description }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-4 text-sm text-gray-500", children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: getStatusColor((_a = doc.status) !== null && _a !== void 0 ? _a : "pending"), children: getStatusText((_b = doc.status) !== null && _b !== void 0 ? _b : "pending") }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 text-sm text-gray-600", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: (_c = doc.uploadedBy) !== null && _c !== void 0 ? _c : "غير محدد" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString('ar-SA') : 'غير محدد' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FolderOpen, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: (_d = doc.category) !== null && _d !== void 0 ? _d : "غير محدد" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { children: (_e = doc.size) !== null && _e !== void 0 ? _e : "غير محدد" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return handleViewDocument(doc); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0639\u0631\u0636"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4 ml-1" }), "\u062A\u062D\u0645\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return handleEditDocument(doc); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4 ml-1" }), "\u062A\u0639\u062F\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "text-red-600 hover:text-red-700", onClick: function () { var _a; return handleDeleteDocument((_a = doc.id) !== null && _a !== void 0 ? _a : ''); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4 ml-1" }), "\u062D\u0630\u0641"] })] })] }) }, doc.id));
                                }) }), filteredDocuments.length === 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-12", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-600 mb-2", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0633\u062A\u0646\u062F\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u062A\u0637\u0627\u0628\u0642 \u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0628\u062D\u062B" })] }))] })] }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: showForm, onOpenChange: setShowForm, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: editingDocument ? 'تعديل المستند' : 'إضافة مستند جديد' }) }), (0, jsx_runtime_1.jsx)(document_form_1.default, __assign({}, (editingDocument && { document: editingDocument }), { onSave: handleSaveDocument, onCancel: function () {
                                setShowForm(false);
                                setEditingDocument(null);
                            }, mode: editingDocument ? 'edit' : 'create' }))] }) }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: !!viewingDocument, onOpenChange: function () { return setViewingDocument(null); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-4xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0646\u062F" }) }), viewingDocument && ((0, jsx_runtime_1.jsx)(document_form_1.default, { document: viewingDocument, onCancel: function () { return setViewingDocument(null); }, mode: "view" }))] }) })] }));
}
