"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CompanySelection;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var wouter_1 = require("wouter");
var card_1 = require("../components/ui/card");
var button_1 = require("../components/ui/button");
var input_1 = require("../components/ui/input");
var badge_1 = require("../components/ui/badge");
var avatar_1 = require("../components/ui/avatar");
var shared_1 = require("../components/shared");
var lucide_react_1 = require("lucide-react");
// Logo import removed
function CompanySelection() {
    var _a = (0, wouter_1.useLocation)(), setLocation = _a[1];
    var _b = (0, react_1.useState)(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_query_1.useQuery)({
        'queryKey': ['/api/companies']
    }), _d = _c["data"], companies = _d === void 0 ? [] : _d, isLoading = _c.isLoading, error = _c.error;
    // Mock companies for demonstration
    var mockCompanies = [
        {
            'id': '1',
            'name': 'شركة التقنية المتقدمة',
            'description': 'رائدة في حلول تقنية المعلومات والبرمجيات',
            'address': 'الرياض، المملكة العربية السعودية',
            'employeeCount': 450,
            'status': 'active',
            'role': 'admin',
            'logo': '',
            'industry': 'تقنية المعلومات'
        },
        {
            'id': '2',
            'name': 'الشركة التجارية الكبرى',
            'description': 'متخصصة في التجارة والاستيراد والتصدير',
            'address': 'جدة، المملكة العربية السعودية',
            'employeeCount': 230,
            'status': 'active',
            'role': 'manager',
            'logo': '',
            'industry': 'التجارة'
        },
        {
            'id': '3',
            'name': 'المؤسسة الصناعية',
            'description': 'تصنيع وإنتاج المواد الصناعية والكيميائية',
            'address': 'الدمام، المملكة العربية السعودية',
            'employeeCount': 680,
            'status': 'active',
            'role': 'employee',
            'logo': '',
            'industry': 'الصناعة'
        },
        {
            'id': '4',
            'name': 'مؤسسة الخدمات المالية',
            'description': 'خدمات مصرفية ومالية متكاملة',
            'address': 'الرياض، المملكة العربية السعودية',
            'employeeCount': 320,
            'status': 'pending',
            'role': 'viewer',
            'logo': '',
            'industry': 'المالية'
        }
    ];
    var allCompanies = Array.isArray(companies) ? companies : mockCompanies;
    var filteredCompanies = allCompanies.filter(function (company) {
        var _a, _b;
        var nameMatch = (_a = company.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchQuery.toLowerCase());
        var descMatch = (_b = company.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchQuery.toLowerCase());
        return Boolean(nameMatch || descMatch);
    });
    var getRoleIcon = function (role) {
        switch (role) {
            case 'admin': return (0, jsx_runtime_1.jsx)(lucide_react_1.Crown, { className: "h-4 w-4 text-yellow-600" });
            case 'manager': return (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "h-4 w-4 text-blue-600" });
            case 'employee': return (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4 text-green-600" });
            default: return (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-4 w-4 text-gray-600" });
        }
    };
    var getRoleText = function (role) {
        switch (role) {
            case 'admin': return 'مدير عام';
            case 'manager': return 'مدير';
            case 'employee': return 'موظف';
            default: return 'مشاهد';
        }
    };
    var getRoleColor = function (role) {
        switch (role) {
            case 'admin': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'employee': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    var getStatusColor = function (status) {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    var handleCompanySelect = function (companyId, companyName) {
        setLocation("/login?company=".concat(companyId, "&name=").concat(encodeURIComponent(companyName)));
    };
    return ((0, jsx_runtime_1.jsx)("main", { role: "main", className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50", children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-12", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center mb-12", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center mb-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("img", { src: "/logo.svg", alt: "Zeylab Logo", className: "w-20 h-20 object-contain", decoding: "async", fetchPriority: "high", width: "80", height: "80" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent", children: "Zeylab" })] }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xl text-gray-600 mb-2", children: "\u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629 \u0627\u0644\u0645\u062A\u0642\u062F\u0645" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-gray-500", children: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0634\u0631\u0643\u0629 \u0627\u0644\u062A\u064A \u062A\u0631\u064A\u062F \u0625\u062F\u0627\u0631\u062A\u0647\u0627" })] }), (0, jsx_runtime_1.jsx)("div", { className: "max-w-md mx-auto mb-10", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0634\u0631\u0643\u0627\u062A...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "pl-10 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "max-w-6xl mx-auto", children: [isLoading && (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, { text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A..." }), error && (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: error, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0631\u0643\u0627\u062A", onRetry: function () { return window.location.reload(); } }), !isLoading && !error && (filteredCompanies.length === 0 ? ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "text-center py-16", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Building2, { className: "h-20 w-20 mx-auto mb-6 text-gray-300" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-2xl font-semibold text-gray-700 mb-4", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0631\u0643\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-500 mb-6", children: searchQuery ? 'لا توجد شركات تطابق بحثك' : 'لم يتم تسجيل أي شركات بعد' })] }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: filteredCompanies.map(function (company) {
                                var _a, _b, _c, _d, _e;
                                return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "group hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 hover:scale-105", onClick: function () { return handleCompanySelect(company.id, company.name); }, children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { className: "h-16 w-16", children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { className: "bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold", children: company.name.split(' ').slice(0, 2).map(function (n) { return n[0]; }).join('') }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl line-clamp-2 group-hover:text-blue-600 transition-colors", children: company.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500 mt-1", children: company.industry })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "text-xs ".concat(getRoleColor((_a = company.role) !== null && _a !== void 0 ? _a : '')), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [getRoleIcon((_b = company.role) !== null && _b !== void 0 ? _b : ''), getRoleText((_c = company.role) !== null && _c !== void 0 ? _c : '')] }) }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "text-xs ".concat(getStatusColor((_d = company.status) !== null && _d !== void 0 ? _d : '')), children: company.status === 'active' ? 'نشطة' : company.status === 'pending' ? 'قيد المراجعة' : 'معلقة' })] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 line-clamp-2", children: company.description }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-sm text-gray-500", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1", children: company.address })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-sm text-gray-500", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsxs)("span", { children: [(_e = company.employeeCount) !== null && _e !== void 0 ? _e : 0, " \u0645\u0648\u0638\u0641"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between pt-4 border-t", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-gray-400", children: ["\u0622\u062E\u0631 \u0646\u0634\u0627\u0637: \u0645\u0646\u0630 ", Math.floor(Math.random() * 24), " \u0633\u0627\u0639\u0629"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", className: "gap-2 group-hover:bg-blue-600 group-hover:text-white transition-colors", disabled: company.status !== 'active', onClick: function () { return setLocation("/login?company=".concat(company.id, "&name=").concat(encodeURIComponent(company.name))); }, children: ["\u062F\u062E\u0648\u0644", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "h-4 w-4" })] })] })] })] }, company.id));
                            }) })))] }), (0, jsx_runtime_1.jsx)("div", { className: "text-center mt-16 text-gray-500", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm", children: ["Zeylab HRMS \u2022 \u0622\u062E\u0631 \u062A\u0633\u062C\u064A\u0644 \u062F\u062E\u0648\u0644: ", new Date().toLocaleDateString('ar-SA')] }) })] }) }));
}
