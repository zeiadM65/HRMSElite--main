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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LicensesPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../components/ui/card");
var button_1 = require("../components/ui/button");
var input_1 = require("../components/ui/input");
var label_1 = require("../components/ui/label");
var textarea_1 = require("../components/ui/textarea");
var select_1 = require("../components/ui/select");
var badge_1 = require("../components/ui/badge");
var dialog_1 = require("../components/ui/dialog");
var alert_1 = require("../components/ui/alert");
var use_toast_1 = require("../hooks/use-toast");
var document_form_1 = __importDefault(require("../components/document-form"));
var lucide_react_1 = require("lucide-react");
// Shared helpers and types
var getStatusColor = function (status) {
    switch (status) {
        case 'active':
            return 'bg-green-100 text-green-800';
        case 'expired':
            return 'bg-red-100 text-red-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
var getStatusText = function (status) {
    switch (status) {
        case 'active':
            return 'نشط';
        case 'expired':
            return 'منتهي الصلاحية';
        case 'pending':
            return 'قيد المراجعة';
        default:
            return 'غير محدد';
    }
};
var getStatusIcon = function (status) {
    switch (status) {
        case 'active':
            return lucide_react_1.CheckCircle;
        case 'expired':
            return lucide_react_1.AlertTriangle;
        case 'pending':
            return lucide_react_1.Clock;
        default:
            return lucide_react_1.AlertCircle;
    }
};
var licenseTypes = [
    { 'value': 'main', 'label': 'رئيسي', 'icon': lucide_react_1.Award },
    { 'value': 'branch', 'label': 'فرع', 'icon': lucide_react_1.Building2 },
    { 'value': 'commercial', 'label': 'تجاري', 'icon': lucide_react_1.FileSignature },
    { 'value': 'industrial', 'label': 'صناعي', 'icon': lucide_react_1.Building2 },
    { 'value': 'professional', 'label': 'مهني', 'icon': lucide_react_1.Shield },
    { 'value': 'import_export', 'label': 'استيراد وتصدير', 'icon': lucide_react_1.TrendingUp },
    { 'value': 'tailoring', 'label': 'خياطة', 'icon': lucide_react_1.Users },
    { 'value': 'fabric', 'label': 'أقمشة', 'icon': lucide_react_1.FileText },
    { 'value': 'jewelry', 'label': 'مجوهرات', 'icon': lucide_react_1.Award },
    { 'value': 'restaurant', 'label': 'مطعم', 'icon': lucide_react_1.Building2 },
    { 'value': 'service', 'label': 'خدمات', 'icon': lucide_react_1.Shield }
];
var mockCompanies = [
    {
        'id': 'company-1',
        'name': 'شركة النيل الأزرق للمجوهرات',
        'commercialFileNumber': '123456',
        'totalLicenses': 6,
        'activeLicenses': 5
    },
    {
        'id': 'company-2',
        'name': 'شركة قمة النيل الخالد',
        'commercialFileNumber': '234567',
        'totalLicenses': 4,
        'activeLicenses': 3
    },
    {
        'id': 'company-3',
        'name': 'شركة الاتحاد الخليجي للأقمشة',
        'commercialFileNumber': '345678',
        'totalLicenses': 3,
        'activeLicenses': 2
    }
];
var mockLicenses = [
    {
        'id': 'license-1',
        'companyId': 'company-1',
        'name': 'ترخيص النيل الأزرق الرئيسي - المباركية',
        'type': 'main',
        'number': 'LIC-2024-001',
        'status': 'active',
        'issueDate': '2024-01-15',
        'expiryDate': '2025-01-15',
        'issuingAuthority': 'وزارة التجارة والصناعة',
        'location': 'المباركية',
        'description': 'ترخيص تجاري رئيسي لشركة النيل الأزرق للمجوهرات في المباركية',
        'isActive': true,
        'createdAt': '2024-01-15T10:30:00Z',
        'updatedAt': '2024-12-20T14:22:00Z',
        'company': {
            'name': 'شركة النيل الأزرق للمجوهرات',
            'commercialFileNumber': '123456'
        },
        'employees': [
            { 'id': 'emp-1', 'name': 'أحمد محمد علي', 'position': 'مدير' },
            { 'id': 'emp-2', 'name': 'فاطمة أحمد', 'position': 'محاسب' }
        ]
    },
    {
        'id': 'license-2',
        'companyId': 'company-1',
        'name': 'ترخيص فرع الجهراء',
        'type': 'branch',
        'number': 'LIC-2024-002',
        'status': 'active',
        'issueDate': '2024-02-20',
        'expiryDate': '2025-02-20',
        'issuingAuthority': 'وزارة التجارة والصناعة',
        'location': 'الجهراء',
        'description': 'ترخيص فرع لشركة النيل الأزرق في الجهراء',
        'isActive': true,
        'createdAt': '2024-02-20T13:20:00Z',
        'updatedAt': '2024-12-20T13:20:00Z',
        'company': {
            'name': 'شركة النيل الأزرق للمجوهرات',
            'commercialFileNumber': '123456'
        },
        'employees': [
            { 'id': 'emp-3', 'name': 'محمد علي حسن', 'position': 'مدير الفرع' }
        ]
    },
    {
        'id': 'license-3',
        'companyId': 'company-2',
        'name': 'ترخيص قمة النيل التجاري',
        'type': 'commercial',
        'number': 'LIC-2024-003',
        'status': 'active',
        'issueDate': '2024-03-10',
        'expiryDate': '2025-03-10',
        'issuingAuthority': 'وزارة التجارة والصناعة',
        'location': 'الصفاة',
        'description': 'ترخيص تجاري لشركة قمة النيل الخالد',
        'isActive': true,
        'createdAt': '2024-03-10T11:45:00Z',
        'updatedAt': '2024-12-20T16:22:00Z',
        'company': {
            'name': 'شركة قمة النيل الخالد',
            'commercialFileNumber': '234567'
        },
        'employees': [
            { 'id': 'emp-4', 'name': 'خالد محمد', 'position': 'مدير عام' },
            { 'id': 'emp-5', 'name': 'سارة أحمد', 'position': 'محاسب' }
        ]
    },
    {
        'id': 'license-4',
        'companyId': 'company-3',
        'name': 'ترخيص الاتحاد الخليجي للأقمشة',
        'type': 'fabric',
        'number': 'LIC-2023-004',
        'status': 'expired',
        'issueDate': '2023-12-20',
        'expiryDate': '2024-12-20',
        'issuingAuthority': 'وزارة التجارة والصناعة',
        'location': 'فحيحيل',
        'description': 'ترخيص تجاري لشركة الاتحاد الخليجي للأقمشة',
        'isActive': false,
        'createdAt': '2023-12-20T11:30:00Z',
        'updatedAt': '2024-12-20T14:15:00Z',
        'company': {
            'name': 'شركة الاتحاد الخليجي للأقمشة',
            'commercialFileNumber': '345678'
        },
        'employees': []
    }
];
function LicensesPage() {
    var _a = (0, react_1.useState)(mockLicenses), licenses = _a[0], setLicenses = _a[1];
    var _b = (0, react_1.useState)(mockCompanies), companies = _b[0], _setCompanies = _b[1];
    var _c = (0, react_1.useState)(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = (0, react_1.useState)('all'), selectedCompany = _d[0], setSelectedCompany = _d[1];
    var _e = (0, react_1.useState)('all'), selectedStatus = _e[0], setSelectedStatus = _e[1];
    var _f = (0, react_1.useState)('all'), selectedType = _f[0], setSelectedType = _f[1];
    var _g = (0, react_1.useState)(false), showForm = _g[0], setShowForm = _g[1];
    var _h = (0, react_1.useState)(null), editingLicense = _h[0], setEditingLicense = _h[1];
    var _j = (0, react_1.useState)(null), viewingLicense = _j[0], setViewingLicense = _j[1];
    var _k = (0, react_1.useState)(false), showDocumentForm = _k[0], setShowDocumentForm = _k[1];
    var _l = (0, react_1.useState)(null), selectedLicenseForDocuments = _l[0], setSelectedLicenseForDocuments = _l[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var filteredLicenses = licenses.filter(function (license) {
        var matchesSearch = license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            license.number.toLowerCase().includes(searchTerm.toLowerCase());
        var matchesCompany = selectedCompany === 'all' || license.companyId === selectedCompany;
        var matchesStatus = selectedStatus === 'all' || license.status === selectedStatus;
        var matchesType = selectedType === 'all' || license.type === selectedType;
        return matchesSearch && matchesCompany && matchesStatus && matchesType;
    });
    // moved helpers to module scope above
    var isExpiringSoon = function (expiryDate) {
        var expiry = new Date(expiryDate);
        var now = new Date();
        var diffTime = expiry.getTime() - now.getTime();
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30 && diffDays > 0;
    };
    var isExpired = function (expiryDate) {
        return new Date(expiryDate) < new Date();
    };
    var stats = [
        {
            'label': 'إجمالي التراخيص',
            'value': licenses.length.toString(),
            'icon': lucide_react_1.Award,
            'color': 'blue',
            'change': '+12%',
            'changeType': 'increase'
        },
        {
            'label': 'التراخيص النشطة',
            'value': licenses.filter(function (l) { return l.status === 'active'; }).length.toString(),
            'icon': lucide_react_1.CheckCircle,
            'color': 'green',
            'change': '+5%',
            'changeType': 'increase'
        },
        {
            'label': 'منتهية الصلاحية',
            'value': licenses.filter(function (l) { return l.status === 'expired'; }).length.toString(),
            'icon': lucide_react_1.AlertTriangle,
            'color': 'red',
            'change': '-2%',
            'changeType': 'decrease'
        },
        {
            'label': 'قيد المراجعة',
            'value': licenses.filter(function (l) { return l.status === 'pending'; }).length.toString(),
            'icon': lucide_react_1.Clock,
            'color': 'yellow',
            'change': '+3%',
            'changeType': 'increase'
        }
    ];
    var handleSaveLicense = function (licenseData) {
        if (editingLicense) {
            // Update existing license
            setLicenses(function (prev) { return prev.map(function (l) {
                return l.id === editingLicense.id ? __assign(__assign(__assign({}, l), licenseData), { isActive: licenseData.status === 'active', updatedAt: new Date().toISOString() }) : l;
            }); });
            toast({
                'title': 'تم التحديث بنجاح',
                'description': 'تم تحديث الترخيص بنجاح'
            });
        }
        else {
            // Create new license
            var newLicense_1 = __assign(__assign({ id: "license-".concat(Date.now()), companyId: licenseData.companyId, name: licenseData.name, type: licenseData.type, number: licenseData.number, status: licenseData.status, issueDate: licenseData.issueDate, expiryDate: licenseData.expiryDate, issuingAuthority: licenseData.issuingAuthority, location: licenseData.location }, (licenseData.description && { description: licenseData.description })), { documents: [], isActive: licenseData.status === 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
            setLicenses(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newLicense_1], false); });
            toast({
                'title': 'تم الإنشاء بنجاح',
                'description': 'تم إنشاء الترخيص الجديد بنجاح'
            });
        }
        setShowForm(false);
        setEditingLicense(null);
    };
    var handleDeleteLicense = function (licenseId) {
        if (window.confirm('هل أنت متأكد من حذف هذا الترخيص؟')) {
            setLicenses(function (prev) { return prev.filter(function (l) { return l.id !== licenseId; }); });
            toast({
                'title': 'تم الحذف بنجاح',
                'description': 'تم حذف الترخيص بنجاح'
            });
        }
    };
    var handleEditLicense = function (license) {
        setEditingLicense(license);
        setShowForm(true);
    };
    var handleViewLicense = function (license) {
        setViewingLicense(license);
    };
    var handleAddDocument = function (license) {
        setSelectedLicenseForDocuments(license);
        setShowDocumentForm(true);
    };
    return ((0, jsx_runtime_1.jsxs)("main", { role: "main", className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-4 w-4 ml-2" }), "\u0641\u0644\u062A\u0631\u0629"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-blue-600 hover:bg-blue-700", onClick: function () { return setShowForm(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 ml-2" }), "\u0625\u0636\u0627\u0641\u0629 \u062A\u0631\u062E\u064A\u0635"] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map(function (stat, index) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: stat.label }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: stat.value }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs ".concat(stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'), children: [stat.change, " \u0645\u0646 \u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u0627\u0636\u064A"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-3 rounded-full bg-".concat(stat.color, "-100"), children: (0, jsx_runtime_1.jsx)(stat.icon, { className: "h-6 w-6 text-".concat(stat.color, "-600") }) })] }) }) }, index)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "pr-10" })] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: selectedCompany, onValueChange: setSelectedCompany, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0634\u0631\u0643\u0627\u062A" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0634\u0631\u0643\u0627\u062A" }), companies.map(function (company) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: company.id, children: company.name }, company.id)); })] })] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: selectedStatus, onValueChange: setSelectedStatus, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "\u0646\u0634\u0637" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "expired", children: "\u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "pending", children: "\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" })] })] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: selectedType, onValueChange: setSelectedType, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639" }), licenseTypes.map(function (type) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: type.value, children: type.label }, type.value)); })] })] })] }), licenses.filter(function (l) { return isExpiringSoon(l.expiryDate); }).length > 0 && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, { children: ["\u0647\u0646\u0627\u0643 ", licenses.filter(function (l) { return isExpiringSoon(l.expiryDate); }).length, " \u062A\u0631\u062E\u064A\u0635 \u0633\u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 30 \u064A\u0648\u0645"] })] })), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredLicenses.map(function (license) {
                    var _a, _b, _c, _d, _e;
                    var StatusIcon = getStatusIcon(license.status);
                    var LicenseTypeIcon = (_b = (_a = licenseTypes.find(function (t) { return t.value === license.type; })) === null || _a === void 0 ? void 0 : _a.icon) !== null && _b !== void 0 ? _b : lucide_react_1.Award;
                    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow ".concat(isExpired(license.expiryDate) ? 'border-red-200 bg-red-50'
                            : isExpiringSoon(license.expiryDate) ? 'border-yellow-200 bg-yellow-50' : ''), children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-2 bg-blue-100 rounded", children: (0, jsx_runtime_1.jsx)(LicenseTypeIcon, { className: "h-5 w-5 text-blue-600" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: license.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: license.number })] })] }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: getStatusColor(license.status), children: [(0, jsx_runtime_1.jsx)(StatusIcon, { className: "h-3 w-3 ml-1" }), getStatusText(license.status)] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsx)("span", { children: (_c = license.company) === null || _c === void 0 ? void 0 : _c.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsx)("span", { children: license.location })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsxs)("span", { children: ["\u064A\u0646\u062A\u0647\u064A \u0641\u064A: ", new Date(license.expiryDate).toLocaleDateString('ar-SA')] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4 text-gray-500" }), (0, jsx_runtime_1.jsxs)("span", { children: [(_e = (_d = license.employees) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0, " \u0645\u0648\u0638\u0641"] })] })] }), license.description && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 line-clamp-2", children: license.description })), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return handleViewLicense(license); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0639\u0631\u0636"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return handleEditLicense(license); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4 ml-1" }), "\u062A\u0639\u062F\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return handleAddDocument(license); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 ml-1" }), "\u0645\u0633\u062A\u0646\u062F\u0627\u062A"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "text-red-600 hover:text-red-700", onClick: function () { return handleDeleteLicense(license.id); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4 ml-1" }), "\u062D\u0630\u0641"] })] })] })] }, license.id));
                }) }), filteredLicenses.length === 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-12", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: "h-16 w-16 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-semibold text-gray-600 mb-2", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0631\u0627\u062E\u064A\u0635" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500", children: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u062A\u0631\u0627\u062E\u064A\u0635 \u062A\u0637\u0627\u0628\u0642 \u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u0628\u062D\u062B" })] })), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: showForm, onOpenChange: setShowForm, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: editingLicense ? 'تعديل الترخيص' : 'إضافة ترخيص جديد' }) }), (0, jsx_runtime_1.jsx)(LicenseForm, { license: editingLicense, companies: companies, onSave: handleSaveLicense, onCancel: function () {
                                setShowForm(false);
                                setEditingLicense(null);
                            } })] }) }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: !!viewingLicense, onOpenChange: function () { return setViewingLicense(null); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-4xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0631\u062E\u064A\u0635" }) }), viewingLicense && ((0, jsx_runtime_1.jsx)(LicenseView, { license: viewingLicense }))] }) }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: showDocumentForm, onOpenChange: setShowDocumentForm, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u0646\u062F \u0644\u0644\u062A\u0631\u062E\u064A\u0635" }) }), selectedLicenseForDocuments && ((0, jsx_runtime_1.jsx)(document_form_1.default, { entityId: selectedLicenseForDocuments.id, entityType: "license", onSave: function (_document) {
                                // Handle document save
                                setShowDocumentForm(false);
                                setSelectedLicenseForDocuments(null);
                            }, onCancel: function () {
                                setShowDocumentForm(false);
                                setSelectedLicenseForDocuments(null);
                            } }))] }) })] }));
}
function LicenseForm(_a) {
    var _b;
    var license = _a.license, companies = _a.companies, onSave = _a.onSave, onCancel = _a.onCancel;
    var _c = (0, react_1.useState)(__assign({ name: '', type: '', number: '', companyId: '', issueDate: '', expiryDate: '', issuingAuthority: '', location: '', description: '', status: 'active' }, (license ? {
        name: license.name,
        type: license.type,
        number: license.number,
        companyId: license.companyId,
        issueDate: license.issueDate,
        expiryDate: license.expiryDate,
        issuingAuthority: license.issuingAuthority,
        location: license.location,
        description: (_b = license.description) !== null && _b !== void 0 ? _b : '',
        status: license.status
    } : {}))), formData = _c[0], setFormData = _c[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        onSave(formData);
    };
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "\u0627\u0633\u0645 \u0627\u0644\u062A\u0631\u062E\u064A\u0635 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", value: formData.name, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'name': e.target.value })); }); }, placeholder: "\u0623\u062F\u062E\u0644 \u0627\u0633\u0645 \u0627\u0644\u062A\u0631\u062E\u064A\u0635", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "number", children: "\u0631\u0642\u0645 \u0627\u0644\u062A\u0631\u062E\u064A\u0635 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "number", value: formData.number, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'number': e.target.value })); }); }, placeholder: "\u0623\u062F\u062E\u0644 \u0631\u0642\u0645 \u0627\u0644\u062A\u0631\u062E\u064A\u0635", required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "companyId", children: "\u0627\u0644\u0634\u0631\u0643\u0629 *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.companyId, onValueChange: function (value) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'companyId': value })); }); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0631\u0643\u0629" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: companies.map(function (company) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: company.id, children: company.name }, company.id)); }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "type", children: "\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u062E\u064A\u0635 *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.type, onValueChange: function (value) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'type': value })); }); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u062E\u064A\u0635" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: licenseTypes.map(function (type) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: type.value, children: type.label }, type.value)); }) })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "issueDate", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "issueDate", type: "date", value: formData.issueDate, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'issueDate': e.target.value })); }); }, required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "expiryDate", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "expiryDate", type: "date", value: formData.expiryDate, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'expiryDate': e.target.value })); }); }, required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "issuingAuthority", children: "\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "issuingAuthority", value: formData.issuingAuthority, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'issuingAuthority': e.target.value })); }); }, placeholder: "\u0623\u062F\u062E\u0644 \u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631", required: true })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "location", children: "\u0627\u0644\u0645\u0648\u0642\u0639 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "location", value: formData.location, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'location': e.target.value })); }); }, placeholder: "\u0623\u062F\u062E\u0644 \u0627\u0644\u0645\u0648\u0642\u0639", required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "description", children: "\u0627\u0644\u0648\u0635\u0641" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "description", value: formData.description, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'description': e.target.value })); }); }, placeholder: "\u0623\u062F\u062E\u0644 \u0648\u0635\u0641 \u0627\u0644\u062A\u0631\u062E\u064A\u0635 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)", rows: 3 })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "status", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.status, onValueChange: function (value) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { 'status': value })); }); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "\u0646\u0634\u0637" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "expired", children: "\u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "pending", children: "\u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", onClick: onCancel, variant: "outline", children: "\u0625\u0644\u063A\u0627\u0621" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: license ? 'حفظ التغييرات' : 'إنشاء الترخيص' })] })] }));
}
function LicenseView(_a) {
    var _b, _c, _d, _e, _f, _g;
    var license = _a.license;
    var LicenseTypeIcon = (_c = (_b = licenseTypes.find(function (t) { return t.value === license.type; })) === null || _b === void 0 ? void 0 : _b.icon) !== null && _c !== void 0 ? _c : lucide_react_1.Award;
    var StatusIcon = getStatusIcon(license.status);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-blue-100 rounded-lg", children: (0, jsx_runtime_1.jsx)(LicenseTypeIcon, { className: "h-8 w-8 text-blue-600" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold", children: license.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: license.number })] })] }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: getStatusColor(license.status), children: [(0, jsx_runtime_1.jsx)(StatusIcon, { className: "h-4 w-4 ml-1" }), getStatusText(license.status)] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0627\u0644\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1", children: (_d = license.company) === null || _d === void 0 ? void 0 : _d.name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0646\u0648\u0639 \u0627\u0644\u062A\u0631\u062E\u064A\u0635" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1", children: (_e = licenseTypes.find(function (t) { return t.value === license.type; })) === null || _e === void 0 ? void 0 : _e.label })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u062C\u0647\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1", children: license.issuingAuthority })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0627\u0644\u0645\u0648\u0642\u0639" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1", children: license.location })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0635\u062F\u0627\u0631" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1", children: new Date(license.issueDate).toLocaleDateString('ar-SA') })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1", children: new Date(license.expiryDate).toLocaleDateString('ar-SA') })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0639\u062F\u062F \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1", children: [(_g = (_f = license.employees) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : 0, " \u0645\u0648\u0638\u0641"] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1", children: new Date(license.createdAt).toLocaleDateString('ar-SA') })] })] })] }), license.description && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0627\u0644\u0648\u0635\u0641" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-gray-600", children: license.description })] })), license.employees && license.employees.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium text-gray-700", children: "\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0648\u0646" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 space-y-2", children: license.employees.map(function (employee) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-2 bg-gray-50 rounded", children: [(0, jsx_runtime_1.jsx)("span", { children: employee.name }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: employee.position })] }, employee.id)); }) })] }))] }));
}
