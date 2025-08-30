"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PayrollPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("../components/ui/button");
var card_1 = require("../components/ui/card");
var badge_1 = require("../components/ui/badge");
var input_1 = require("../components/ui/input");
var label_1 = require("../components/ui/label");
var table_1 = require("../components/ui/table");
var tabs_1 = require("../components/ui/tabs");
var select_1 = require("../components/ui/select");
var use_toast_1 = require("../hooks/use-toast");
var react_query_1 = require("@tanstack/react-query");
var queryClient_1 = require("@/lib/queryClient");
var lucide_react_1 = require("lucide-react");
var shared_layout_1 = require("../components/shared-layout");
var shared_1 = require("../components/shared");
var react_i18next_1 = require("react-i18next");
function PayrollPage() {
    return ((0, jsx_runtime_1.jsx)(shared_layout_1.SharedLayout, { userRole: "employee", userName: "\u0623\u062D\u0645\u062F \u0645\u062D\u0645\u062F \u0639\u0644\u064A", companyName: "\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u064A\u0644 \u0627\u0644\u0623\u0632\u0631\u0642 \u0644\u0644\u0645\u062C\u0648\u0647\u0631\u0627\u062A", children: (0, jsx_runtime_1.jsx)(PayrollContent, {}) }));
}
function PayrollContent() {
    var _a, _b, _c, _d;
    var toast = (0, use_toast_1.useToast)().toast;
    var queryClient = (0, react_query_1.useQueryClient)();
    var t = (0, react_i18next_1.useTranslation)().t;
    var _e = (0, react_1.useState)(new Date().getMonth() + 1), selectedMonth = _e[0], setSelectedMonth = _e[1];
    var _f = (0, react_1.useState)(new Date().getFullYear()), selectedYear = _f[0], setSelectedYear = _f[1];
    var _g = (0, react_1.useState)(false), isProcessingPayroll = _g[0], setIsProcessingPayroll = _g[1];
    // جلب ملخص الرواتب
    var _h = (0, react_query_1.useQuery)({
        'queryKey': ['/api/payroll/summary']
    }), payrollSummary = _h["data"], summaryLoading = _h["isLoading"], summaryError = _h["error"];
    // جلب سجلات الرواتب
    var _j = (0, react_query_1.useQuery)({
        'queryKey': ['/api/payroll/records']
    }), _payrollRecords = _j["data"], isLoading = _j.isLoading, error = _j.error;
    // معالجة الرواتب الشهرية
    var processPayrollMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (data) {
            return (0, queryClient_1.apiRequest)('/api/payroll/process', 'POST', data);
        },
        'onSuccess': function () {
            toast({
                'title': 'تم معالجة الرواتب',
                'description': 'تم حساب وإعداد كشوف الرواتب لجميع الموظفين'
            });
            queryClient.invalidateQueries({ 'queryKey': ['/api/payroll'] });
            setIsProcessingPayroll(false);
        }
    });
    var getStatusBadge = function (status) {
        var statusMap = {
            'processed': { 'label': 'معالج', 'variant': 'secondary', 'color': 'text-blue-600' },
            'pending': {
                'label': 'قيد المعالجة', 'variant': 'outline', 'color': 'text-orange-600'
            },
            'paid': { 'label': 'مدفوع', 'variant': 'default', 'color': 'text-green-600' }
        };
        var statusInfo = statusMap[status] || statusMap.pending;
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: statusInfo.variant, children: statusInfo.label });
    };
    var formatCurrency = function (amount) {
        return new Intl.NumberFormat('ar-KW', {
            'style': 'currency',
            'currency': 'KWD',
            'minimumFractionDigits': 2
        }).format(amount);
    };
    var handleProcessPayroll = function () {
        setIsProcessingPayroll(true);
        processPayrollMutation.mutate({
            'month': selectedMonth,
            'year': selectedYear
        });
    };
    var handleExportPayroll = function (format) {
        toast({
            'title': "\u062A\u0635\u062F\u064A\u0631 ".concat(format.toUpperCase()),
            'description': 'تم تصدير كشوف الرواتب بنجاح'
        });
    };
    // بيانات تجريبية للرواتب
    var mockPayrollRecords = [
        {
            'id': '1',
            'employeeName': 'أحمد محمد علي',
            'employeeId': 'EMP001',
            'baseSalary': 1200,
            'allowances': 300,
            'overtime': 150,
            'deductions': 50,
            'taxes': 120,
            'socialInsurance': 85,
            'netSalary': 1395,
            'status': 'paid',
            'paymentDate': '2025-01-25'
        },
        {
            'id': '2',
            'employeeName': 'فاطمة أحمد سالم',
            'employeeId': 'EMP002',
            'baseSalary': 950,
            'allowances': 200,
            'overtime': 75,
            'deductions': 25,
            'taxes': 90,
            'socialInsurance': 68,
            'netSalary': 1042,
            'status': 'paid',
            'paymentDate': '2025-01-25'
        },
        {
            'id': '3',
            'employeeName': 'محمد عبدالله الحربي',
            'employeeId': 'EMP003',
            'baseSalary': 1500,
            'allowances': 400,
            'overtime': 200,
            'deductions': 75,
            'taxes': 155,
            'socialInsurance': 105,
            'netSalary': 1765,
            'status': 'processed'
        },
        {
            'id': '4',
            'employeeName': 'سارة عبدالرحمن القحطاني',
            'employeeId': 'EMP004',
            'baseSalary': 800,
            'allowances': 150,
            'overtime': 50,
            'deductions': 20,
            'taxes': 70,
            'socialInsurance': 58,
            'netSalary': 852,
            'status': 'pending'
        }
    ];
    var mockSummary = {
        'totalEmployees': 167,
        'totalGrossSalary': 180500,
        'totalDeductions': 25600,
        'totalNetSalary': 154900,
        'averageSalary': 1081,
        'overtimeHours': 2340,
        'totalTaxes': 18200
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold", children: "\u0646\u0638\u0627\u0645 \u0627\u0644\u0631\u0648\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2", children: "\u0625\u062F\u0627\u0631\u0629 \u0648\u062D\u0633\u0627\u0628 \u0631\u0648\u0627\u062A\u0628 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0634\u0647\u0631\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)(select_1.Select, { value: selectedMonth.toString(), onValueChange: function (value) { return setSelectedMonth(parseInt(value)); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-32", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "1", children: "\u064A\u0646\u0627\u064A\u0631" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "2", children: "\u0641\u0628\u0631\u0627\u064A\u0631" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "3", children: "\u0645\u0627\u0631\u0633" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "4", children: "\u0623\u0628\u0631\u064A\u0644" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "5", children: "\u0645\u0627\u064A\u0648" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "6", children: "\u064A\u0648\u0646\u064A\u0648" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "7", children: "\u064A\u0648\u0644\u064A\u0648" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "8", children: "\u0623\u063A\u0633\u0637\u0633" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "9", children: "\u0633\u0628\u062A\u0645\u0628\u0631" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "10", children: "\u0623\u0643\u062A\u0648\u0628\u0631" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "11", children: "\u0646\u0648\u0641\u0645\u0628\u0631" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "12", children: "\u062F\u064A\u0633\u0645\u0628\u0631" })] })] }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: selectedYear.toString(), onValueChange: function (value) { return setSelectedYear(parseInt(value)); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-24", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "2024", children: "2024" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "2025", children: "2025" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "2026", children: "2026" })] })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: handleProcessPayroll, disabled: isProcessingPayroll, className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calculator, { className: "h-4 w-4" }), isProcessingPayroll ? 'جاري المعالجة...' : 'معالجة الرواتب'] })] })] }), (summaryLoading !== null && summaryLoading !== void 0 ? summaryLoading : isLoading) && ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-12", children: (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, { text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0631\u0648\u0627\u062A\u0628..." }) })), (summaryError !== null && summaryError !== void 0 ? summaryError : error) && ((0, jsx_runtime_1.jsx)("div", { className: "py-8", children: (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: summaryError !== null && summaryError !== void 0 ? summaryError : error, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0631\u0648\u0627\u062A\u0628", onRetry: function () { return window.location.reload(); } }) })), !summaryLoading && !isLoading && !summaryError && !error && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4" }), "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold", children: (_a = payrollSummary === null || payrollSummary === void 0 ? void 0 : payrollSummary.totalEmployees) !== null && _a !== void 0 ? _a : mockSummary.totalEmployees }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "h-4 w-4 text-green-600" }), "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xl font-bold text-green-600", children: formatCurrency((_b = payrollSummary === null || payrollSummary === void 0 ? void 0 : payrollSummary.totalGrossSalary) !== null && _b !== void 0 ? _b : mockSummary.totalGrossSalary) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: "\u0642\u0628\u0644 \u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Receipt, { className: "h-4 w-4 text-red-600" }), "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xl font-bold text-red-600", children: formatCurrency((_c = payrollSummary === null || payrollSummary === void 0 ? void 0 : payrollSummary.totalDeductions) !== null && _c !== void 0 ? _c : mockSummary.totalDeductions) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: "\u0636\u0631\u0627\u0626\u0628 \u0648\u062A\u0623\u0645\u064A\u0646\u0627\u062A" })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "text-sm font-medium flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4 text-blue-600" }), "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0648\u0627\u062A\u0628"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xl font-bold text-blue-600", children: formatCurrency((_d = payrollSummary === null || payrollSummary === void 0 ? void 0 : payrollSummary.totalNetSalary) !== null && _d !== void 0 ? _d : mockSummary.totalNetSalary) }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: "\u0628\u0639\u062F \u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A" })] })] })] })), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { defaultValue: "payroll", className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "payroll", children: "\u0643\u0634\u0648\u0641 \u0627\u0644\u0631\u0648\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "processing", children: "\u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "reports", children: "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "settings", children: t('settings') })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "payroll", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { children: ["\u0643\u0634\u0648\u0641 \u0627\u0644\u0631\u0648\u0627\u062A\u0628 - ", selectedMonth, "/", selectedYear] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0631\u0648\u0627\u062A\u0628 \u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0644\u0644\u0634\u0647\u0631 \u0627\u0644\u0645\u062D\u062F\u062F" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return handleExportPayroll('excel'); }, className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" }), "Excel"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () { return handleExportPayroll('pdf'); }, className: "gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4" }), "PDF"] })] })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u0645\u0648\u0638\u0641" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u0631\u0627\u062A\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u0628\u062F\u0644\u0627\u062A" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u0636\u0631\u0627\u0626\u0628" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "text-right", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A" })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableBody, { children: mockPayrollRecords.map(function (record) { return ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: record.employeeName }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: record.employeeId })] }) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-mono", children: formatCurrency(record.baseSalary) }), (0, jsx_runtime_1.jsxs)(table_1.TableCell, { className: "font-mono text-green-600", children: ["+", formatCurrency(record.allowances)] }), (0, jsx_runtime_1.jsxs)(table_1.TableCell, { className: "font-mono text-blue-600", children: ["+", formatCurrency(record.overtime)] }), (0, jsx_runtime_1.jsxs)(table_1.TableCell, { className: "font-mono text-red-600", children: ["-", formatCurrency(record.deductions)] }), (0, jsx_runtime_1.jsxs)(table_1.TableCell, { className: "font-mono text-orange-600", children: ["-", formatCurrency(record.taxes)] }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "font-mono font-bold text-lg", children: formatCurrency(record.netSalary) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: getStatusBadge(record.status) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4" }) })] }) })] }, record.id)); }) })] }) })] }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "processing", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0631\u0648\u0627\u062A\u0628 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "\u062D\u0633\u0627\u0628 \u0627\u0644\u0631\u0648\u0627\u062A\u0628 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u0644\u062D\u0636\u0648\u0631 \u0648\u0627\u0644\u0628\u062F\u0644\u0627\u062A \u0627\u0644\u0645\u0639\u0631\u0641\u0629" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0639\u062F\u062F \u0623\u064A\u0627\u0645 \u0627\u0644\u0639\u0645\u0644" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", defaultValue: "22" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u064A\u0648\u0645\u064A\u0629" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", defaultValue: "8" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u0633\u0627\u0639\u0629 \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { defaultValue: "1.5", children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "1.25", children: "125% \u0645\u0646 \u0627\u0644\u0631\u0627\u062A\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "1.5", children: "150% \u0645\u0646 \u0627\u0644\u0631\u0627\u062A\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "2", children: "200% \u0645\u0646 \u0627\u0644\u0631\u0627\u062A\u0628 \u0627\u0644\u0623\u0633\u0627\u0633\u064A" })] })] })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calculator, { className: "h-4 w-4" }), "\u0628\u062F\u0621 \u0627\u0644\u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A\u0629"] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0636\u0631\u0627\u0626\u0628 \u0648\u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "\u062A\u0643\u0648\u064A\u0646 \u0645\u0639\u062F\u0644\u0627\u062A \u0627\u0644\u0636\u0631\u0627\u0626\u0628 \u0648\u0627\u0644\u062A\u0623\u0645\u064A\u0646\u0627\u062A \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0645\u0639\u062F\u0644 \u0636\u0631\u064A\u0628\u0629 \u0627\u0644\u062F\u062E\u0644 (%)" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", defaultValue: "7.5", step: "0.1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u0627\u0644\u062A\u0623\u0645\u064A\u0646 \u0627\u0644\u0627\u062C\u062A\u0645\u0627\u0639\u064A (%)" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", defaultValue: "5.5", step: "0.1" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u062A\u0623\u0645\u064A\u0646 \u0637\u0628\u064A (%)" }), (0, jsx_runtime_1.jsx)(input_1.Input, { type: "number", defaultValue: "2", step: "0.1" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", className: "w-full", children: "\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A" })] })] })] }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "reports", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PieChart, { className: "h-5 w-5 text-blue-500" }), "\u062A\u0642\u0631\u064A\u0631 \u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0631\u0648\u0627\u062A\u0628"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground mb-4", children: "\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0631\u0648\u0627\u062A\u0628 \u062D\u0633\u0628 \u0627\u0644\u0623\u0642\u0633\u0627\u0645 \u0648\u0627\u0644\u0645\u0646\u0627\u0635\u0628" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }), "\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-5 w-5 text-green-500" }), "\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground mb-4", children: "\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u064A\u0629 \u0648\u062A\u0643\u0644\u0641\u062A\u0647\u0627" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }), "\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"] })] })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Receipt, { className: "h-5 w-5 text-orange-500" }), "\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0636\u0631\u0627\u0626\u0628 \u0648\u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A"] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground mb-4", children: "\u0645\u0644\u062E\u0635 \u0627\u0644\u0636\u0631\u0627\u0626\u0628 \u0648\u0627\u0644\u062A\u0623\u0645\u064A\u0646\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0648\u0645\u0629" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "w-full gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4" }), "\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u0631\u064A\u0631"] })] })] })] }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "settings", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0646\u0638\u0627\u0645 \u0627\u0644\u0631\u0648\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "\u062A\u0643\u0648\u064A\u0646 \u0627\u0644\u0642\u0648\u0627\u0639\u062F \u0648\u0627\u0644\u0645\u0639\u0627\u064A\u064A\u0631 \u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0631\u0648\u0627\u062A\u0628" })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }), (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium mb-2", children: "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0631\u0648\u0627\u062A\u0628" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "\u062A\u0643\u0648\u064A\u0646 \u0645\u0639\u0627\u064A\u064A\u0631 \u0627\u0644\u062D\u0633\u0627\u0628 \u0648\u0627\u0644\u0628\u062F\u0644\u0627\u062A \u0648\u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A" })] }) })] }) })] })] }));
}
