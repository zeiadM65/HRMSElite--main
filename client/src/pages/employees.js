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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmployeesPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var shared_layout_1 = require("../components/shared-layout");
var button_1 = require("../components/ui/button");
var card_1 = require("../components/ui/card");
var badge_1 = require("../components/ui/badge");
var input_1 = require("../components/ui/input");
var label_1 = require("../components/ui/label");
var react_i18next_1 = require("react-i18next");
var table_1 = require("../components/ui/table");
// Removed unused Tabs imports
var select_1 = require("../components/ui/select");
var dialog_1 = require("../components/ui/dialog");
var avatar_1 = require("../components/ui/avatar");
var checkbox_1 = require("../components/ui/checkbox");
var use_toast_1 = require("../hooks/use-toast");
var react_query_1 = require("@tanstack/react-query");
var queryClient_1 = require("@/lib/queryClient");
var shared_1 = require("../components/shared");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var lucide_react_1 = require("lucide-react");
function EmployeesPage() {
    return ((0, jsx_runtime_1.jsx)(shared_layout_1.SharedLayout, { userRole: "company_manager", userName: "\u0645\u062F\u064A\u0631 \u0627\u0644\u0634\u0631\u0643\u0629", companyName: "\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u064A\u0644 \u0627\u0644\u0623\u0632\u0631\u0642 \u0644\u0644\u0645\u062C\u0648\u0647\u0631\u0627\u062A", children: (0, jsx_runtime_1.jsx)(EmployeesContent, {}) }));
}
function EmployeesContent() {
    var toast = (0, use_toast_1.useToast)().toast;
    var t = (0, react_i18next_1.useTranslation)().t;
    var queryClient = (0, react_query_1.useQueryClient)();
    var _a = (0, react_1.useState)(false), isAddEmployeeOpen = _a[0], setIsAddEmployeeOpen = _a[1];
    var _b = (0, react_1.useState)(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_1.useState)('all'), departmentFilter = _c[0], setDepartmentFilter = _c[1];
    var _d = (0, react_1.useState)('all'), statusFilter = _d[0], setStatusFilter = _d[1];
    var _e = (0, react_1.useState)({ 'min': '', 'max': '' }), salaryRange = _e[0], setSalaryRange = _e[1];
    var _f = (0, react_1.useState)('all'), experienceFilter = _f[0], setExperienceFilter = _f[1];
    var _g = (0, react_1.useState)(null), selectedEmployee = _g[0], setSelectedEmployee = _g[1];
    var _h = (0, react_1.useState)(false), isDetailsOpen = _h[0], setIsDetailsOpen = _h[1];
    var _j = (0, react_1.useState)([]), selectedEmployees = _j[0], setSelectedEmployees = _j[1];
    var _k = (0, react_1.useState)({ 'key': 'name', 'direction': 'asc' }), sortConfig = _k[0], setSortConfig = _k[1];
    var _l = (0, react_1.useState)({
        'currentPage': 1,
        'pageSize': 10,
        'totalItems': 0
    }), pagination = _l[0], setPagination = _l[1];
    var _m = (0, react_1.useState)(false), showAdvancedFilters = _m[0], setShowAdvancedFilters = _m[1];
    var _o = (0, react_1.useState)({
        'name': '',
        'email': '',
        'phone': '',
        'position': '',
        'department': '',
        'salary': '',
        'hireDate': '',
        'nationalId': '',
        'birthDate': '',
        'address': '',
        'emergencyContact': '',
        'experience': '',
        'education': ''
    }), newEmployee = _o[0], setNewEmployee = _o[1];
    // جلب الموظفين
    var _p = (0, react_query_1.useQuery)({
        'queryKey': ['/api/employees']
    }), _q = _p["data"], employees = _q === void 0 ? [] : _q, isLoading = _p.isLoading, error = _p.error;
    // إضافة موظف جديد
    var addEmployeeMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (employeeData) {
            return (0, queryClient_1.apiRequest)('/api/employees', 'POST', employeeData);
        },
        'onSuccess': function () {
            toast({
                'title': t('messages.saveSuccess'),
                'description': t('employees.addEmployee')
            });
            setIsAddEmployeeOpen(false);
            queryClient.invalidateQueries({ 'queryKey': ['/api/employees'] });
            setNewEmployee({
                'name': '', 'email': '', 'phone': '', 'position': '', 'department': '',
                'salary': '', 'hireDate': '', 'nationalId': '', 'birthDate': '', 'address': '',
                'emergencyContact': '', 'experience': '', 'education': ''
            });
        }
    });
    // أرشفة موظف
    var archiveEmployeeMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (employeeId) {
            return (0, queryClient_1.apiRequest)("/api/employees/".concat(employeeId, "/archive"), 'PATCH');
        },
        'onSuccess': function () {
            toast({
                'title': 'تم أرشفة الموظف',
                'description': 'تم نقل الموظف إلى الأرشيف'
            });
            queryClient.invalidateQueries({ 'queryKey': ['/api/employees'] });
        }
    });
    // حذف متعدد
    var bulkDeleteMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (employeeIds) {
            return (0, queryClient_1.apiRequest)('/api/employees/bulk-delete', 'DELETE', { 'ids': employeeIds });
        },
        'onSuccess': function () {
            toast({
                'title': 'تم حذف الموظفين',
                'description': "\u062A\u0645 \u062D\u0630\u0641 ".concat(selectedEmployees.length, " \u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")
            });
            setSelectedEmployees([]);
            queryClient.invalidateQueries({ 'queryKey': ['/api/employees'] });
        }
    });
    var getStatusBadge = function (status) {
        var statusMap = {
            'active': { 'label': 'نشط', 'variant': 'default', 'color': 'text-green-600' },
            'inactive': { 'label': 'غير نشط', 'variant': 'secondary', 'color': 'text-orange-600' },
            'archived': { 'label': 'مؤرشف', 'variant': 'outline', 'color': 'text-gray-600' }
        };
        var statusInfo = statusMap[status] || statusMap.active;
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: statusInfo.variant, children: statusInfo.label });
    };
    var formatCurrency = function (amount) {
        return new Intl.NumberFormat('ar-KW', {
            'style': 'currency',
            'currency': 'KWD',
            'minimumFractionDigits': 0
        }).format(amount);
    };
    var handleAddEmployee = function () {
        if (!(newEmployee === null || newEmployee === void 0 ? void 0 : newEmployee.name) || !(newEmployee === null || newEmployee === void 0 ? void 0 : newEmployee.email) || !(newEmployee === null || newEmployee === void 0 ? void 0 : newEmployee.phone) || !(newEmployee === null || newEmployee === void 0 ? void 0 : newEmployee.position)) {
            toast({
                'title': 'خطأ في البيانات',
                'description': 'يرجى تعبئة جميع الحقول المطلوبة',
                'variant': 'destructive'
            });
            return;
        }
        var employeeData = __assign(__assign({}, newEmployee), { 'salary': parseFloat(newEmployee.salary), 'employeeId': "EMP".concat(String(employees.length + 1).padStart(3, '0')), 'status': 'active', 'experience': parseInt(newEmployee.experience) || 0, 'education': newEmployee.education });
        addEmployeeMutation.mutate(employeeData);
    };
    var handleViewDetails = function (employee) {
        setSelectedEmployee(employee);
        setIsDetailsOpen(true);
    };
    var handleSort = function (key) {
        setSortConfig(function (prev) { return ({
            key: key,
            'direction': prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }); });
    };
    var handleBulkSelect = function (employeeId) {
        setSelectedEmployees(function (prev) {
            return prev.includes(employeeId)
                ? prev.filter(function (id) { return id !== employeeId; })
                : __spreadArray(__spreadArray([], prev, true), [employeeId], false);
        });
    };
    var handleSelectAll = function () {
        if (selectedEmployees.length === filteredEmployees.length) {
            setSelectedEmployees([]);
        }
        else {
            setSelectedEmployees(filteredEmployees.map(function (emp) { return emp.id; }));
        }
    };
    var handleBulkDelete = function () {
        if (selectedEmployees.length === 0) {
            toast({
                'title': 'لا يوجد موظفين محددين',
                'description': 'يرجى تحديد الموظفين المراد حذفهم',
                'variant': 'destructive'
            });
            return;
        }
        bulkDeleteMutation.mutate(selectedEmployees);
    };
    var exportEmployees = function () {
        var csvContent = __spreadArray([
            ['الاسم',
                'البريد الإلكتروني',
                'الهاتف',
                'المنصب',
                'القسم',
                'الراتب',
                'تاريخ التوظيف',
                'الحالة']
        ], filteredEmployees.map(function (emp) { return [
            emp.name,
            emp.email,
            emp.phone,
            emp.position,
            emp.department,
            emp.salary.toString(),
            emp.hireDate,
            emp.status
        ]; }), true).map(function (row) { return row.join(','); }).join('\n');
        if (typeof window !== 'undefined') {
            var blob = new window.Blob([csvContent], { 'type': 'text/csv;charset=utf-8;' });
            var link = window.document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "employees-".concat(new Date().toISOString().split('T')[0], ".csv");
            link.click();
            window.URL.revokeObjectURL(link.href);
        }
    };
    var departments = ['الموارد البشرية',
        'المحاسبة',
        'التسويق',
        'تقنية المعلومات',
        'العمليات',
        'المبيعات'];
    var experienceLevels = ['جميع المستويات',
        'أقل من سنة',
        '1-3 سنوات',
        '3-5 سنوات',
        'أكثر من 5 سنوات'];
    // بيانات تجريبية للموظفين
    var mockEmployees = [
        {
            'id': '1',
            'name': 'أحمد محمد علي',
            'email': 'ahmed@company.com',
            'phone': '+965 9999 1234',
            'position': 'مدير الموارد البشرية',
            'department': 'الموارد البشرية',
            'salary': 1500,
            'hireDate': '2023-01-15',
            'status': 'active',
            'employeeId': 'EMP001',
            'nationalId': '123456789',
            'address': 'الكويت، حولي',
            'emergencyContact': '+965 9999 5678',
            'workSchedule': 'دوام كامل',
            'experience': 5,
            'education': 'بكالوريوس إدارة أعمال',
            'skills': ['إدارة الموارد البشرية', 'التوظيف', 'التدريب']
        },
        {
            'id': '2',
            'name': 'فاطمة أحمد سالم',
            'email': 'fatima@company.com',
            'phone': '+965 9999 2345',
            'position': 'محاسبة أولى',
            'department': 'المحاسبة',
            'salary': 1200,
            'hireDate': '2023-03-10',
            'status': 'active',
            'employeeId': 'EMP002',
            'nationalId': '234567890',
            'address': 'الكويت، الجهراء',
            'emergencyContact': '+965 9999 6789',
            'experience': 3,
            'education': 'بكالوريوس محاسبة',
            'skills': ['المحاسبة المالية', 'الضرائب', 'المراجعة']
        },
        {
            'id': '3',
            'name': 'محمد عبدالله الحربي',
            'email': 'mohammed@company.com',
            'phone': '+965 9999 3456',
            'position': 'مطور برمجيات',
            'department': 'تقنية المعلومات',
            'salary': 1800,
            'hireDate': '2022-09-01',
            'status': 'active',
            'employeeId': 'EMP003',
            'nationalId': '345678901',
            'address': 'الكويت، الفروانية',
            'experience': 4,
            'education': 'بكالوريوس علوم حاسوب',
            'skills': ['React', 'Node.js', 'TypeScript']
        },
        {
            'id': '4',
            'name': 'سارة عبدالرحمن القحطاني',
            'email': 'sara@company.com',
            'phone': '+965 9999 4567',
            'position': 'أخصائية تسويق',
            'department': 'التسويق',
            'salary': 1000,
            'hireDate': '2023-06-20',
            'status': 'active',
            'employeeId': 'EMP004',
            'nationalId': '456789012',
            'address': 'الكويت، الأحمدي',
            'experience': 2,
            'education': 'بكالوريوس تسويق',
            'skills': ['التسويق الرقمي', 'وسائل التواصل الاجتماعي', 'تحليل البيانات']
        },
        {
            'id': '5',
            'name': 'خالد سعد المطيري',
            'email': 'khalid@company.com',
            'phone': '+965 9999 5678',
            'position': 'منسق مبيعات',
            'department': 'المبيعات',
            'salary': 900,
            'hireDate': '2023-08-15',
            'status': 'inactive',
            'employeeId': 'EMP005',
            'nationalId': '567890123',
            'address': 'الكويت، مبارك الكبير',
            'experience': 1,
            'education': 'دبلوم إدارة أعمال',
            'skills': ['المبيعات', 'خدمة العملاء', 'إدارة العلاقات']
        }
    ];
    var allEmployees = __spreadArray(__spreadArray([], employees, true), mockEmployees, true);
    // تصفية وترتيب الموظفين
    var filteredEmployees = allEmployees
        .filter(function (employee) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        var matchesSearch = ((_a = employee === null || employee === void 0 ? void 0 : employee.name) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchQuery.toLowerCase())) ||
            ((_b = employee === null || employee === void 0 ? void 0 : employee.employeeId) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchQuery.toLowerCase())) ||
            ((_c = employee === null || employee === void 0 ? void 0 : employee.email) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(searchQuery.toLowerCase()));
        var matchesDepartment = departmentFilter === 'all' || (employee === null || employee === void 0 ? void 0 : employee.department) === departmentFilter;
        var matchesStatus = statusFilter === 'all' || (employee === null || employee === void 0 ? void 0 : employee.status) === statusFilter;
        var minSalary = salaryRange.min ? parseFloat(salaryRange.min) : undefined;
        var maxSalary = salaryRange.max ? parseFloat(salaryRange.max) : undefined;
        var matchesSalary = (minSalary === undefined || ((_d = employee === null || employee === void 0 ? void 0 : employee.salary) !== null && _d !== void 0 ? _d : 0) >= minSalary) &&
            (maxSalary === undefined || ((_e = employee === null || employee === void 0 ? void 0 : employee.salary) !== null && _e !== void 0 ? _e : 0) <= maxSalary);
        var matchesExperience = experienceFilter === 'all' ||
            (experienceFilter === 'أقل من سنة' && ((_f = employee === null || employee === void 0 ? void 0 : employee.experience) !== null && _f !== void 0 ? _f : 0) < 1) ||
            (experienceFilter === '1-3 سنوات' && ((_g = employee === null || employee === void 0 ? void 0 : employee.experience) !== null && _g !== void 0 ? _g : 0) >= 1 && ((_h = employee === null || employee === void 0 ? void 0 : employee.experience) !== null && _h !== void 0 ? _h : 0) <= 3) ||
            (experienceFilter === '3-5 سنوات' && ((_j = employee === null || employee === void 0 ? void 0 : employee.experience) !== null && _j !== void 0 ? _j : 0) > 3 && ((_k = employee === null || employee === void 0 ? void 0 : employee.experience) !== null && _k !== void 0 ? _k : 0) <= 5) ||
            (experienceFilter === 'أكثر من 5 سنوات' && ((_l = employee === null || employee === void 0 ? void 0 : employee.experience) !== null && _l !== void 0 ? _l : 0) > 5);
        return matchesSearch && matchesDepartment && matchesStatus && matchesSalary && matchesExperience;
    })
        .sort(function (a, b) {
        var aValue = a[sortConfig.key];
        var bValue = b[sortConfig.key];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortConfig.direction === 'asc'
                ? aValue.localeCompare(bValue, 'ar')
                : bValue.localeCompare(aValue, 'ar');
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });
    // حساب الإحصائيات
    var stats = {
        'total': allEmployees.length,
        'active': allEmployees.filter(function (e) { return (e === null || e === void 0 ? void 0 : e.status) === 'active'; }).length,
        'inactive': allEmployees.filter(function (e) { return (e === null || e === void 0 ? void 0 : e.status) === 'inactive'; }).length,
        'archived': allEmployees.filter(function (e) { return (e === null || e === void 0 ? void 0 : e.status) === 'archived'; }).length,
        'avgSalary': allEmployees.reduce(function (sum, emp) { var _a; return sum + ((_a = emp === null || emp === void 0 ? void 0 : emp.salary) !== null && _a !== void 0 ? _a : 0); }, 0) / allEmployees.length,
        'avgExperience': allEmployees.reduce(function (sum, emp) { var _a; return sum + ((_a = emp === null || emp === void 0 ? void 0 : emp.experience) !== null && _a !== void 0 ? _a : 0); }, 0) / allEmployees.length
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2", children: "\u0625\u062F\u0627\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "gap-2", onClick: exportEmployees, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4" }), "\u062A\u0635\u062F\u064A\u0631"] }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: isAddEmployeeOpen, onOpenChange: setIsAddEmployeeOpen, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641"] }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641 \u062C\u062F\u064A\u062F" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: "\u0642\u0645 \u0628\u062A\u0639\u0628\u0626\u0629 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u062C\u062F\u064A\u062F" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "name", children: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "name", value: newEmployee.name, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'name': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "email", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "email", type: "email", value: newEmployee.email, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'email': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "phone", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "phone", value: newEmployee.phone, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'phone': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "nationalId", children: "\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u062F\u0646\u064A *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "nationalId", value: newEmployee.nationalId, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'nationalId': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "position", children: "\u0627\u0644\u0645\u0646\u0635\u0628 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "position", value: newEmployee.position, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'position': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "department", children: "\u0627\u0644\u0642\u0633\u0645 *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: newEmployee.department, onValueChange: function (value) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'department': value })); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0633\u0645" }) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: departments.map(function (dept) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: dept, children: dept }, dept)); }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "salary", children: "\u0627\u0644\u0631\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "salary", type: "number", value: newEmployee.salary, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'salary': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "hireDate", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0648\u0638\u064A\u0641 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "hireDate", type: "date", value: newEmployee.hireDate, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'hireDate': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "birthDate", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "birthDate", type: "date", value: newEmployee.birthDate, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'birthDate': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "experience", children: "\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "experience", type: "number", value: newEmployee.experience, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'experience': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "education", children: "\u0627\u0644\u0645\u0624\u0647\u0644 \u0627\u0644\u0639\u0644\u0645\u064A" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "education", value: newEmployee.education, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'education': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "emergencyContact", children: "\u062C\u0647\u0629 \u0627\u062A\u0635\u0627\u0644 \u0637\u0648\u0627\u0631\u0626" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "emergencyContact", value: newEmployee.emergencyContact, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'emergencyContact': e.target.value })); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "col-span-2 space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "address", children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "address", value: newEmployee.address, onChange: function (e) { return setNewEmployee(__assign(__assign({}, newEmployee), { 'address': e.target.value })); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: function () { return setIsAddEmployeeOpen(false); }, children: "\u0625\u0644\u063A\u0627\u0621" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleAddEmployee, disabled: addEmployeeMutation.isPending, children: addEmployeeMutation.isPending ? 'جاري الإضافة...' : 'إضافة الموظف' })] })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4" }), "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: stats.total }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UserCheck, { className: "h-4 w-4 text-green-600" }), "\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0646\u0634\u0637\u0648\u0646"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: stats.active }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-4 w-4 text-blue-600" }), "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0631\u0627\u062A\u0628"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-blue-600", children: formatCurrency(Math.round(stats.avgSalary)) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4 text-purple-600" }), "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062E\u0628\u0631\u0629"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-purple-600", children: [Math.round(stats.avgExperience), " \u0633\u0646\u0648\u0627\u062A"] }) })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (\u0627\u0633\u0645\u060C \u0631\u0642\u0645 \u0645\u0648\u0638\u0641\u060C \u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A)", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "pl-3 pr-10" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return setShowAdvancedFilters(!showAdvancedFilters); }, className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-4 w-4" }), "\u0641\u0644\u0627\u062A\u0631 \u0645\u062A\u0642\u062F\u0645\u0629"] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: departmentFilter, onValueChange: setDepartmentFilter, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-40", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645" }), departments.map(function (dept) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: dept, children: dept }, dept)); })] })] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-32", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "\u0646\u0634\u0637" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "inactive", children: "\u063A\u064A\u0631 \u0646\u0634\u0637" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "archived", children: "\u0645\u0624\u0631\u0634\u0641" })] })] })] })] }), showAdvancedFilters && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0646\u0637\u0627\u0642 \u0627\u0644\u0631\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0645\u0646", type: "number", value: salaryRange.min, onChange: function (e) { return setSalaryRange(__assign(__assign({}, salaryRange), { 'min': e.target.value })); } }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0625\u0644\u0649", type: "number", value: salaryRange.max, onChange: function (e) { return setSalaryRange(__assign(__assign({}, salaryRange), { 'max': e.target.value })); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0628\u0631\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: experienceFilter, onValueChange: setExperienceFilter, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsx)(select_1.SelectContent, { children: experienceLevels.map(function (level) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: level, children: level }, level)); }) })] })] })] }))] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [selectedEmployees.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-4 mb-4 bg-muted rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-medium", children: [selectedEmployees.length, " \u0645\u0648\u0638\u0641 \u0645\u062D\u062F\u062F"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "destructive", size: "sm", onClick: handleBulkDelete, disabled: bulkDeleteMutation.isPending, className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }), "\u062D\u0630\u0641 \u0645\u062D\u062F\u062F"] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setSelectedEmployees([]); }, children: "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u062D\u062F\u064A\u062F" })] })), isLoading && ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-12", children: (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, { text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646..." }) })), error && ((0, jsx_runtime_1.jsx)("div", { className: "py-8", children: (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: error, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646", onRetry: function () { return window.location.reload(); } }) })), !isLoading && !error && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "w-12", children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { checked: selectedEmployees.length === filteredEmployees.length, onCheckedChange: handleSelectAll }) }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: function () { return handleSort('name'); }, className: "h-auto p-0 font-medium", children: ["\u0627\u0644\u0645\u0648\u0638\u0641", sortConfig.key === 'name' && (sortConfig.direction === 'asc'
                                                                        ? (0, jsx_runtime_1.jsx)(lucide_react_1.SortAsc, { className: "h-4 w-4 mr-1" })
                                                                        : (0, jsx_runtime_1.jsx)(lucide_react_1.SortDesc, { className: "h-4 w-4 mr-1" }))] }) }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: function () { return handleSort('employeeId'); }, className: "h-auto p-0 font-medium", children: ["\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641", sortConfig.key === 'employeeId' && (sortConfig.direction === 'asc'
                                                                        ? (0, jsx_runtime_1.jsx)(lucide_react_1.SortAsc, { className: "h-4 w-4 mr-1" })
                                                                        : (0, jsx_runtime_1.jsx)(lucide_react_1.SortDesc, { className: "h-4 w-4 mr-1" }))] }) }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: function () { return handleSort('position'); }, className: "h-auto p-0 font-medium", children: ["\u0627\u0644\u0645\u0646\u0635\u0628", sortConfig.key === 'position' && (sortConfig.direction === 'asc'
                                                                        ? (0, jsx_runtime_1.jsx)(lucide_react_1.SortAsc, { className: "h-4 w-4 mr-1" })
                                                                        : (0, jsx_runtime_1.jsx)(lucide_react_1.SortDesc, { className: "h-4 w-4 mr-1" }))] }) }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: function () { return handleSort('department'); }, className: "h-auto p-0 font-medium", children: ["\u0627\u0644\u0642\u0633\u0645", sortConfig.key === 'department' && (sortConfig.direction === 'asc'
                                                                        ? (0, jsx_runtime_1.jsx)(lucide_react_1.SortAsc, { className: "h-4 w-4 mr-1" })
                                                                        : (0, jsx_runtime_1.jsx)(lucide_react_1.SortDesc, { className: "h-4 w-4 mr-1" }))] }) }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: function () { return handleSort('salary'); }, className: "h-auto p-0 font-medium", children: ["\u0627\u0644\u0631\u0627\u062A\u0628", sortConfig.key === 'salary' && (sortConfig.direction === 'asc'
                                                                        ? (0, jsx_runtime_1.jsx)(lucide_react_1.SortAsc, { className: "h-4 w-4 mr-1" })
                                                                        : (0, jsx_runtime_1.jsx)(lucide_react_1.SortDesc, { className: "h-4 w-4 mr-1" }))] }) }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: function () { return handleSort('hireDate'); }, className: "h-auto p-0 font-medium", children: ["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0648\u0638\u064A\u0641", sortConfig.key === 'hireDate' && (sortConfig.direction === 'asc'
                                                                        ? (0, jsx_runtime_1.jsx)(lucide_react_1.SortAsc, { className: "h-4 w-4 mr-1" })
                                                                        : (0, jsx_runtime_1.jsx)(lucide_react_1.SortDesc, { className: "h-4 w-4 mr-1" }))] }) }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: filteredEmployees.map(function (employee) {
                                                    var _a;
                                                    return ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { checked: selectedEmployees.includes(employee.id), onCheckedChange: function () { return handleBulkSelect(employee.id); } }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: "h-8 w-8", children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: employee.avatar, alt: employee.name }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { children: employee.name.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: employee.name }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-muted-foreground flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-3 w-3" }), employee.email] })] })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-mono", children: employee.employeeId }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: employee.position }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: employee.department }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-mono", children: formatCurrency(employee.salary) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, date_fns_1.format)(new Date(employee.hireDate), 'dd/MM/yyyy') }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: getStatusBadge(employee.status) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return handleViewDetails(employee); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: function () { return archiveEmployeeMutation.mutate(employee.id); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Archive, { className: "h-4 w-4" }) })] }) })] }, (_a = employee === null || employee === void 0 ? void 0 : employee.id) !== null && _a !== void 0 ? _a : 'unknown'));
                                                }) })] }), filteredEmployees.length > pagination.pageSize && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mt-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-muted-foreground", children: ["\u0639\u0631\u0636 ", filteredEmployees.length, " \u0645\u0646 ", filteredEmployees.length, " \u0645\u0648\u0638\u0641"] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", disabled: pagination.currentPage === 1, onClick: function () { return setPagination(function (prev) { return (__assign(__assign({}, prev), { 'currentPage': prev.currentPage - 1 })); }); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeft, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm", children: ["\u0635\u0641\u062D\u0629 ", pagination.currentPage, " \u0645\u0646 ", Math.ceil(filteredEmployees.length / pagination.pageSize)] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", disabled: pagination.currentPage >= Math.ceil(filteredEmployees.length / pagination.pageSize), onClick: function () { return setPagination(function (prev) { return (__assign(__assign({}, prev), { 'currentPage': prev.currentPage + 1 })); }); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { className: "h-4 w-4" }) })] })] }))] }))] })] }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isDetailsOpen, onOpenChange: setIsDetailsOpen, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641" }) }), selectedEmployee && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: "h-16 w-16", children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: selectedEmployee.avatar, alt: selectedEmployee.name }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { className: "text-lg", children: selectedEmployee.name.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold", children: selectedEmployee.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: selectedEmployee.position }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1", children: getStatusBadge(selectedEmployee.status) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0631\u0642\u0645 \u0627\u0644\u0645\u0648\u0638\u0641" }), (0, jsx_runtime_1.jsx)("p", { className: "font-mono", children: selectedEmployee.employeeId })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u062F\u0646\u064A" }), (0, jsx_runtime_1.jsx)("p", { className: "font-mono", children: selectedEmployee.nationalId })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("p", { children: selectedEmployee.email })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("p", { children: selectedEmployee.phone })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0642\u0633\u0645" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("p", { children: selectedEmployee.department })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0631\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("p", { className: "font-mono", children: formatCurrency(selectedEmployee.salary) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0648\u0638\u064A\u0641" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("p", { children: (0, date_fns_1.format)(new Date(selectedEmployee.hireDate), 'dd MMMM yyyy', {
                                                                'locale': locale_1.ar
                                                            }) })] })] }), selectedEmployee.experience && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u062E\u0628\u0631\u0629" }), (0, jsx_runtime_1.jsxs)("p", { children: [selectedEmployee.experience, " \u0633\u0646\u0648\u0627\u062A"] })] })), selectedEmployee.education && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0645\u0624\u0647\u0644 \u0627\u0644\u0639\u0644\u0645\u064A" }), (0, jsx_runtime_1.jsx)("p", { children: selectedEmployee.education })] })), selectedEmployee.emergencyContact && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u062C\u0647\u0629 \u0627\u062A\u0635\u0627\u0644 \u0637\u0648\u0627\u0631\u0626" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("p", { children: selectedEmployee.emergencyContact })] })] }))] }), selectedEmployee.address && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("p", { children: selectedEmployee.address })] })] })), selectedEmployee.skills && selectedEmployee.skills.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: selectedEmployee.skills.map(function (skill, index) { return ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", children: skill }, index)); }) })] }))] }))] }) })] }));
}
