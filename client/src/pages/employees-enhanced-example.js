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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmployeesEnhancedExample;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useReactQuery_1 = require("@/hooks/useReactQuery");
var queryClient_1 = require("@/lib/queryClient");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var use_toast_1 = require("@/hooks/use-toast");
// Example of using enhanced React Query hooks
function EmployeesEnhancedExample() {
    var toast = (0, use_toast_1.useToast)().toast;
    var _a = (0, react_1.useState)([]), selectedEmployees = _a[0], setSelectedEmployees = _a[1];
    // ✅ Enhanced Query with better defaults
    var _b = (0, useReactQuery_1.useEnhancedQuery)(['employees'], function () { return (0, queryClient_1.apiRequest)('GET', '/api/employees').then(function (res) { return res.json(); }); }), _c = _b["data"], employees = _c === void 0 ? [] : _c, isLoading = _b.isLoading, error = _b.error;
    // ✅ Enhanced Mutation with better error handling
    var _addEmployeeMutation = (0, useReactQuery_1.useEnhancedMutation)(function (employeeData) { return (0, queryClient_1.apiRequest)('POST', '/api/employees', employeeData); }, {
        'onSuccess': function () {
            toast({
                'title': 'تم إضافة الموظف',
                'description': 'تم إضافة الموظف الجديد بنجاح'
            });
            // Use centralized cache invalidation
            queryClient_1.invalidateCache.employees();
        }
    });
    // ✅ Optimistic Mutation for better UX
    var archiveEmployeeMutation = (0, useReactQuery_1.useOptimisticMutation)(function (employeeId) {
        return (0, queryClient_1.apiRequest)('PATCH', "/api/employees/".concat(employeeId, "/archive")).then(function (res) { return res.json(); });
    }, ['employees'], function (oldEmployees, employeeId) {
        return (oldEmployees !== null && oldEmployees !== void 0 ? oldEmployees : []).map(function (emp) {
            return emp.id === employeeId ? __assign(__assign({}, emp), { status: 'archived' }) : emp;
        });
    }, {
        'onSuccess': function () {
            toast({
                'title': 'تم أرشفة الموظف',
                'description': 'تم نقل الموظف إلى الأرشيف'
            });
        }
    });
    // ✅ Bulk delete with optimistic updates
    var bulkDeleteMutation = (0, useReactQuery_1.useOptimisticMutation)(function (employeeIds) {
        return (0, queryClient_1.apiRequest)('DELETE', '/api/employees/bulk-delete', { ids: employeeIds }).then(function (res) { return res.json(); });
    }, ['employees'], function (oldEmployees, employeeIds) {
        return (oldEmployees !== null && oldEmployees !== void 0 ? oldEmployees : []).filter(function (emp) { return !employeeIds.includes(emp.id); });
    }, {
        'onSuccess': function () {
            toast({
                'title': 'تم حذف الموظفين',
                'description': "\u062A\u0645 \u062D\u0630\u0641 ".concat(selectedEmployees.length, " \u0645\u0648\u0638\u0641 \u0628\u0646\u062C\u0627\u062D")
            });
            setSelectedEmployees([]);
        }
    });
    // Example of using cache utilities
    var handleRefreshCache = function () {
        // Manually refresh the cache
        queryClient_1.invalidateCache.employees();
        toast({
            'title': 'تم تحديث البيانات',
            'description': 'تم تحديث قائمة الموظفين'
        });
    };
    if (isLoading) {
        return (0, jsx_runtime_1.jsx)("div", { children: "\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644..." });
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)("div", { children: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center mb-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleRefreshCache, children: "\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid gap-4", children: employees.map(function (employee) { return ((0, jsx_runtime_1.jsx)("div", { className: "border p-4 rounded-lg", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold", children: employee.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: employee.position }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: employee.status === 'active' ? 'default' : 'secondary', children: employee.status === 'active' ? 'نشط' : 'مؤرشف' })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return archiveEmployeeMutation.mutate(employee.id); }, disabled: archiveEmployeeMutation.isPending, children: archiveEmployeeMutation.isPending ? 'جاري...' : 'أرشفة' }) })] }) }, employee.id)); }) }), selectedEmployees.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "fixed bottom-4 right-4", children: (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () { return bulkDeleteMutation.mutate(selectedEmployees); }, disabled: bulkDeleteMutation.isPending, variant: "destructive", children: bulkDeleteMutation.isPending ? 'جاري الحذف...' : "\u062D\u0630\u0641 ".concat(selectedEmployees.length, " \u0645\u0648\u0638\u0641") }) }))] }));
}
