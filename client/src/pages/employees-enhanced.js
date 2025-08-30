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
exports.default = EmployeesEnhancedPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var shared_layout_1 = require("../components/shared-layout");
var employee_form_1 = require("../components/employee-form");
var button_1 = require("../components/ui/button");
var card_1 = require("../components/ui/card");
var badge_1 = require("../components/ui/badge");
var input_1 = require("../components/ui/input");
var table_1 = require("../components/ui/table");
var select_1 = require("../components/ui/select");
var dialog_1 = require("../components/ui/dialog");
var avatar_1 = require("../components/ui/avatar");
var checkbox_1 = require("../components/ui/checkbox");
var use_toast_1 = require("../hooks/use-toast");
var react_query_1 = require("@tanstack/react-query");
var employee_1 = require("../services/employee");
var shared_1 = require("../components/shared");
var date_fns_1 = require("date-fns");
var locale_1 = require("date-fns/locale");
var lucide_react_1 = require("lucide-react");
var label_1 = require("../components/ui/label");
var logger_1 = __importDefault(require("../lib/logger"));
// removed unused PaginationConfig interface
function EmployeesEnhancedPage() {
    return ((0, jsx_runtime_1.jsx)(shared_layout_1.SharedLayout, { children: (0, jsx_runtime_1.jsx)(EmployeesContent, {}) }));
}
function EmployeesContent() {
    var toast = (0, use_toast_1.useToast)().toast;
    var queryClient = (0, react_query_1.useQueryClient)();
    // State management
    var _a = (0, react_1.useState)(''), searchQuery = _a[0], setSearchQuery = _a[1];
    var _b = (0, react_1.useState)('all'), departmentFilter = _b[0], setDepartmentFilter = _b[1];
    var _c = (0, react_1.useState)('all'), statusFilter = _c[0], setStatusFilter = _c[1];
    var _d = (0, react_1.useState)({ 'min': '', 'max': '' }), salaryRange = _d[0], setSalaryRange = _d[1];
    // removed unused experience filter state
    var sortConfig = (0, react_1.useState)({
        'key': 'firstName', 'direction': 'asc'
    })[0];
    var _e = (0, react_1.useState)([]), selectedEmployees = _e[0], setSelectedEmployees = _e[1];
    var _f = (0, react_1.useState)(false), isAddEmployeeOpen = _f[0], setIsAddEmployeeOpen = _f[1];
    var _g = (0, react_1.useState)(null), editingEmployee = _g[0], setEditingEmployee = _g[1];
    var _h = (0, react_1.useState)(null), viewingEmployee = _h[0], setViewingEmployee = _h[1];
    // Fetch employees using React Query
    var _j = (0, react_query_1.useQuery)({
        'queryKey': ['employees'],
        'queryFn': function () { return employee_1.EmployeeService.getAllEmployees(); },
        'staleTime': 5 * 60 * 1000 // 5 minutes
    }), _k = _j["data"], employees = _k === void 0 ? [] : _k, isLoading = _j.isLoading, error = _j.error, refetch = _j.refetch;
    // Delete employee mutation
    var deleteEmployeeMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (id) { return employee_1.EmployeeService.deleteEmployee(id); },
        'onSuccess': function () {
            toast({
                'title': 'تم بنجاح',
                'description': 'تم حذف الموظف بنجاح',
                'variant': 'default'
            });
            queryClient.invalidateQueries({ 'queryKey': ['employees'] });
        },
        'onError': function (error) {
            toast({
                'title': 'خطأ',
                'description': 'حدث خطأ أثناء حذف الموظف',
                'variant': 'destructive'
            });
            logger_1.default.error('Error deleting employee:', error);
        }
    });
    // Bulk delete mutation
    var bulkDeleteMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (ids) { return Promise.all(ids.map(function (id) { return employee_1.EmployeeService.deleteEmployee(id); })); },
        'onSuccess': function () {
            toast({
                'title': 'تم بنجاح',
                'description': "\u062A\u0645 \u062D\u0630\u0641 ".concat(selectedEmployees.length, " \u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D"),
                'variant': 'default'
            });
            setSelectedEmployees([]);
            queryClient.invalidateQueries({ 'queryKey': ['employees'] });
        },
        'onError': function (error) {
            toast({
                'title': 'خطأ',
                'description': 'حدث خطأ أثناء حذف الموظفين',
                'variant': 'destructive'
            });
            logger_1.default.error('Error bulk deleting employees:', error);
        }
    });
    var getStatusBadge = function (status) {
        switch (status) {
            case 'active':
                return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "default", children: "\u0646\u0634\u0637" });
            case 'inactive':
                return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", children: "\u063A\u064A\u0631 \u0646\u0634\u0637" });
            case 'terminated':
                return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "destructive", children: "\u0645\u0646\u062A\u0647\u064A" });
            default:
                return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F" });
        }
    };
    var formatCurrency = function (amount) {
        return new Intl.NumberFormat('ar-KW', {
            'style': 'currency',
            'currency': 'KWD'
        }).format(amount);
    };
    // Safe confirm wrapper for environments without window.confirm (e.g., tests/SSR)
    var safeConfirm = function (message) {
        var g = globalThis;
        return typeof g.confirm === 'function' ? g.confirm(message) : true;
    };
    var handleEditEmployee = function (employee) {
        setEditingEmployee(employee);
    };
    var handleViewDetails = function (employee) {
        setViewingEmployee(employee);
    };
    var handleDeleteEmployee = function (id) {
        if (safeConfirm('هل أنت متأكد من حذف هذا الموظف؟')) {
            deleteEmployeeMutation.mutate(id);
        }
    };
    // removed unused handleSort function
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
            return;
        }
        if (safeConfirm("\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 ".concat(selectedEmployees.length, " \u0645\u0648\u0638\u0641\u061F"))) {
            bulkDeleteMutation.mutate(selectedEmployees);
        }
    };
    var exportEmployees = function () {
        var _a, _b;
        var csvContent = __spreadArray([
            ['الاسم الأول',
                'الاسم الأخير',
                'البريد الإلكتروني',
                'الهاتف',
                'المنصب',
                'القسم',
                'الراتب',
                'تاريخ التوظيف',
                'الحالة']
        ], filteredEmployees.map(function (emp) { return [
            emp.firstName,
            emp.lastName,
            emp.email,
            emp.phone,
            emp.position,
            emp.department,
            emp.salary.toString(),
            emp.hireDate,
            emp.status
        ]; }), true).map(function (row) { return row.join(','); }).join('\n');
        // Use globalThis to avoid referencing DOM globals directly in non-browser environments
        if (!((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) === null || _a === void 0 ? void 0 : _a.createElement) || !(globalThis === null || globalThis === void 0 ? void 0 : globalThis.Blob) || !((_b = globalThis === null || globalThis === void 0 ? void 0 : globalThis.URL) === null || _b === void 0 ? void 0 : _b.createObjectURL)) {
            return;
        }
        var blob = new globalThis.Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var link = globalThis.document.createElement('a');
        link.href = globalThis.URL.createObjectURL(blob);
        link.download = "employees-".concat(new Date().toISOString().split('T')[0], ".csv");
        link.click();
    };
    var departments = ['الموارد البشرية',
        'المحاسبة',
        'التسويق',
        'تقنية المعلومات',
        'العمليات',
        'المبيعات'];
    // removed unused experienceLevels constant
    // Filter and sort employees
    var filteredEmployees = employees
        .filter(function (employee) {
        var fullName = "".concat(employee.firstName, " ").concat(employee.lastName).toLowerCase();
        var matchesSearch = fullName.includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.phone.includes(searchQuery);
        var matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
        var matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
        var minOk = salaryRange.min === '' || employee.salary >= parseFloat(salaryRange.min);
        var maxOk = salaryRange.max === '' || employee.salary <= parseFloat(salaryRange.max);
        var matchesSalary = minOk && maxOk;
        return matchesSearch && matchesDepartment && matchesStatus && matchesSalary;
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
    // Calculate statistics
    var stats = {
        'total': employees.length,
        'active': employees.filter(function (e) { return e.status === 'active'; }).length,
        'inactive': employees.filter(function (e) { return e.status === 'inactive'; }).length,
        'terminated': employees.filter(function (e) { return e.status === 'terminated'; }).length,
        'avgSalary': employees.length > 0
            ? employees.reduce(function (sum, emp) { return sum + emp.salary; }, 0) / employees.length
            : 0
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, {});
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2", children: "\u0625\u062F\u0627\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u062C\u0645\u064A\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0634\u062E\u0635\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "gap-2", onClick: exportEmployees, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4" }), "\u062A\u0635\u062F\u064A\u0631"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "gap-2", onClick: function () { return refetch(); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-4 w-4" }), "\u062A\u062D\u062F\u064A\u062B"] }), (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, { open: isAddEmployeeOpen, onOpenChange: setIsAddEmployeeOpen, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0638\u0641"] }) }), (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: (0, jsx_runtime_1.jsx)(employee_form_1.EmployeeForm, { mode: "create", onSuccess: function () { return setIsAddEmployeeOpen(false); }, onCancel: function () { return setIsAddEmployeeOpen(false); } }) })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: stats.total }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646" }), (0, jsx_runtime_1.jsx)(lucide_react_1.UserCheck, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: stats.active }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0631\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: formatCurrency(stats.avgSalary) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u064A\u0646" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4 text-muted-foreground" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-orange-600", children: stats.inactive + stats.terminated }) })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-5 w-5" }), "\u0641\u0644\u0627\u062A\u0631 \u0627\u0644\u0628\u062D\u062B"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0627\u0644\u0628\u062D\u062B" }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0627\u0644\u0628\u062D\u062B \u0628\u0627\u0644\u0627\u0633\u0645 \u0623\u0648 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0623\u0648 \u0627\u0644\u0647\u0627\u062A\u0641...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); } })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0627\u0644\u0642\u0633\u0645" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: departmentFilter, onValueChange: setDepartmentFilter, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0633\u0645" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645" }), departments.map(function (dept) { return ((0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: dept, children: dept }, dept)); })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: statusFilter, onValueChange: setStatusFilter, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "\u0646\u0634\u0637" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "inactive", children: "\u063A\u064A\u0631 \u0646\u0634\u0637" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "terminated", children: "\u0645\u0646\u062A\u0647\u064A" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0646\u0637\u0627\u0642 \u0627\u0644\u0631\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0645\u0646", type: "number", value: salaryRange.min, onChange: function (e) { return setSalaryRange(function (prev) { return (__assign(__assign({}, prev), { 'min': e.target.value })); }); } }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0625\u0644\u0649", type: "number", value: salaryRange.max, onChange: function (e) { return setSalaryRange(function (prev) { return (__assign(__assign({}, prev), { 'max': e.target.value })); }); } })] })] })] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { children: ["\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 (", filteredEmployees.length, ")"] }), selectedEmployees.length > 0 && ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "destructive", onClick: handleBulkDelete, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4 ml-2" }), "\u062D\u0630\u0641 \u0627\u0644\u0645\u062D\u062F\u062F (", selectedEmployees.length, ")"] }))] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-md border", children: (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "w-12", children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { checked: selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0, onCheckedChange: handleSelectAll }) }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "\u0627\u0644\u0645\u0648\u0638\u0641" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0627\u062A\u0635\u0627\u0644" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "\u0627\u0644\u0645\u0646\u0635\u0628 \u0648\u0627\u0644\u0642\u0633\u0645" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "\u0627\u0644\u0631\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0648\u0638\u064A\u0641" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: filteredEmployees.map(function (employee) { return ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { checked: selectedEmployees.includes(employee.id), onCheckedChange: function () { return handleBulkSelect(employee.id); } }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "" }), (0, jsx_runtime_1.jsxs)(avatar_1.AvatarFallback, { children: [employee.firstName.charAt(0), employee.lastName.charAt(0)] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "font-medium", children: [employee.firstName, " ", employee.lastName] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: employee.id })] })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "h-3 w-3" }), employee.email] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { className: "h-3 w-3" }), employee.phone] })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: employee.position }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: employee.department })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: formatCurrency(employee.salary) }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: (0, date_fns_1.format)(new Date(employee.hireDate), 'dd/MM/yyyy', { 'locale': locale_1.ar }) }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: getStatusBadge(employee.status) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "text-right", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-end gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return handleViewDetails(employee); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return handleEditEmployee(employee); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return handleDeleteEmployee(employee.id); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4" }) })] }) })] }, employee.id)); }) })] }) }) })] }), editingEmployee && ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: !!editingEmployee, onOpenChange: function () { return setEditingEmployee(null); }, children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: (0, jsx_runtime_1.jsx)(employee_form_1.EmployeeForm, { employee: editingEmployee, mode: "update", onSuccess: function () { return setEditingEmployee(null); }, onCancel: function () { return setEditingEmployee(null); } }) }) })), viewingEmployee && ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: !!viewingEmployee, onOpenChange: function () { return setViewingEmployee(null); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-2xl", children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0648\u0638\u0641" }), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: "\u0639\u0631\u0636 \u0643\u0627\u0641\u0629 \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0648\u0638\u0641" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: "h-16 w-16", children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "" }), (0, jsx_runtime_1.jsxs)(avatar_1.AvatarFallback, { className: "text-lg", children: [viewingEmployee.firstName.charAt(0), viewingEmployee.lastName.charAt(0)] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-xl font-semibold", children: [viewingEmployee.firstName, " ", viewingEmployee.lastName] }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: viewingEmployee.position }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: viewingEmployee.department })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: viewingEmployee.email })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: viewingEmployee.phone })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u0631\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: formatCurrency(viewingEmployee.salary) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0648\u0638\u064A\u0641" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: (0, date_fns_1.format)(new Date(viewingEmployee.hireDate), 'dd/MM/yyyy', { 'locale': locale_1.ar }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1", children: getStatusBadge(viewingEmployee.status) })] })] })] })] }) }))] }));
}
