"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var recharts_1 = require("recharts");
var use_toast_1 = require("@/hooks/use-toast");
// بيانات وهمية للتحليلات
var licenseExpiryData = [
    { 'month': 'يناير', 'expiring': 12, 'renewed': 8, 'new': 5 },
    { 'month': 'فبراير', 'expiring': 15, 'renewed': 10, 'new': 7 },
    { 'month': 'مارس', 'expiring': 8, 'renewed': 12, 'new': 3 },
    { 'month': 'أبريل', 'expiring': 20, 'renewed': 15, 'new': 10 },
    { 'month': 'مايو', 'expiring': 18, 'renewed': 14, 'new': 8 },
    { 'month': 'يونيو', 'expiring': 25, 'renewed': 20, 'new': 12 }
];
var attendancePatterns = [
    { 'day': 'الأحد', 'present': 95, 'absent': 5, 'late': 8 },
    { 'day': 'الاثنين', 'present': 92, 'absent': 8, 'late': 12 },
    { 'day': 'الثلاثاء', 'present': 88, 'absent': 12, 'late': 15 },
    { 'day': 'الأربعاء', 'present': 90, 'absent': 10, 'late': 10 },
    { 'day': 'الخميس', 'present': 85, 'absent': 15, 'late': 18 },
    { 'day': 'الجمعة', 'present': 0, 'absent': 0, 'late': 0 },
    { 'day': 'السبت', 'present': 0, 'absent': 0, 'late': 0 }
];
var jobChangesData = [
    { 'name': 'أحمد محمد', 'changes': 3, 'department': 'IT', 'months': 6 },
    { 'name': 'فاطمة علي', 'changes': 2, 'department': 'HR', 'months': 4 },
    { 'name': 'محمد حسن', 'changes': 4, 'department': 'Sales', 'months': 8 },
    { 'name': 'سارة أحمد', 'changes': 1, 'department': 'Finance', 'months': 2 },
    { 'name': 'علي محمود', 'changes': 3, 'department': 'Marketing', 'months': 5 }
];
var aiInsights = [
    {
        'type': 'warning',
        'title': 'تراخيص ستنتهي قريباً',
        'message': '5 تراخيص ستنتهي خلال الشهر القادم',
        'icon': lucide_react_1.AlertTriangle,
        'color': 'text-orange-500'
    },
    {
        'type': 'success',
        'title': 'تحسن في الحضور',
        'message': 'نسبة الحضور تحسنت بنسبة 15% هذا الشهر',
        'icon': lucide_react_1.CheckCircle,
        'color': 'text-green-500'
    },
    {
        'type': 'info',
        'title': 'توصية للتدريب',
        'message': '3 موظفين يحتاجون تدريب إضافي في مجالهم',
        'icon': lucide_react_1.Lightbulb,
        'color': 'text-blue-500'
    },
    {
        'type': 'error',
        'title': 'مشاكل في الأداء',
        'message': '2 موظفين يحتاجون متابعة أداء',
        'icon': lucide_react_1.XCircle,
        'color': 'text-red-500'
    }
];
var COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
function AIDashboard() {
    var toast = (0, use_toast_1.useToast)().toast;
    var _a = (0, react_1.useState)('overview'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var handleAIAction = function (action) {
        setLoading(true);
        // محاكاة استجابة AI
        setTimeout(function () {
            toast({
                'title': 'تحليل AI',
                'description': "\u062A\u0645 \u062A\u062D\u0644\u064A\u0644 ".concat(action, " \u0628\u0646\u062C\u0627\u062D")
            });
            setLoading(false);
        }, 2000);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-3xl font-bold text-primary flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "w-8 h-8" }), "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0630\u0643\u064A\u0629"] }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0630\u0643\u064A\u0629 \u0648\u062A\u0646\u0628\u0624\u0627\u062A \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" })] }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "secondary", className: "text-lg px-4 py-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Zap, { className: "w-4 h-4 mr-2" }), "AI Powered"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: aiInsights.map(function (insight, index) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "border-l-4 border-l-primary", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm font-medium", children: insight.title }), (0, jsx_runtime_1.jsx)(insight.icon, { className: "h-4 w-4 ".concat(insight.color) })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground", children: insight.message }) })] }, index)); }) }), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid w-full grid-cols-4", children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "overview", children: "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "licenses", children: "\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "attendance", children: "\u0627\u0644\u062D\u0636\u0648\u0631" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "employees", children: "\u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "overview", className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "w-5 h-5 text-orange-500" }), "\u062A\u0646\u0628\u0624 \u0627\u0646\u062A\u0647\u0627\u0621 \u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 300, children: (0, jsx_runtime_1.jsxs)(recharts_1.AreaChart, { data: licenseExpiryData, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "month" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}), (0, jsx_runtime_1.jsx)(recharts_1.Area, { type: "monotone", dataKey: "expiring", stackId: "1", stroke: "#ff7300", fill: "#ff7300" }), (0, jsx_runtime_1.jsx)(recharts_1.Area, { type: "monotone", dataKey: "renewed", stackId: "1", stroke: "#82ca9d", fill: "#82ca9d" }), (0, jsx_runtime_1.jsx)(recharts_1.Area, { type: "monotone", dataKey: "new", stackId: "1", stroke: "#8884d8", fill: "#8884d8" })] }) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "w-5 h-5 text-blue-500" }), "\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062D\u0636\u0648\u0631 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064A\u0629"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 300, children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { data: attendancePatterns, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "day" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "present", fill: "#82ca9d" }), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "absent", fill: "#ff7300" }), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "late", fill: "#8884d8" })] }) }) })] })] }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "licenses", className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 300, children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, { children: [(0, jsx_runtime_1.jsx)(recharts_1.Pie, { data: [
                                                                { 'name': 'نشطة', 'value': 65 },
                                                                { 'name': 'تنتهي قريباً', 'value': 15 },
                                                                { 'name': 'منتهية', 'value': 10 },
                                                                { 'name': 'قيد التجديد', 'value': 10 }
                                                            ], cx: "50%", cy: "50%", labelLine: false, label: function (_a) {
                                                                var name = _a.name, percent = _a.percent;
                                                                return "".concat(name, " ").concat((percent * 100).toFixed(0), "%");
                                                            }, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: COLORS.map(function (color, index) { return ((0, jsx_runtime_1.jsx)(recharts_1.Cell, { fill: color }, "cell-".concat(index))); }) }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {})] }) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "w-5 h-5 text-red-500" }), "\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0645\u0647\u062F\u062F\u0629 \u0628\u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: [
                                                    { 'name': 'شركة النيل الأزرق', 'days': 15, 'type': 'تجاري' },
                                                    { 'name': 'شركة الاتحاد الخليجي', 'days': 30, 'type': 'صناعي' },
                                                    { 'name': 'شركة قمة النيل', 'days': 45, 'type': 'خدمي' },
                                                    { 'name': 'شركة محمد أحمد', 'days': 60, 'type': 'تجاري' }
                                                ].map(function (license, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-3 bg-muted/50 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: license.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: license.type })] }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: license.days <= 30 ? 'destructive' : 'secondary', children: [license.days, " \u064A\u0648\u0645"] })] }, index)); }) }) })] })] }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "attendance", className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u062D\u0636\u0648\u0631 \u0627\u0644\u0634\u0647\u0631\u064A" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 300, children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, { data: licenseExpiryData, children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "month" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}), (0, jsx_runtime_1.jsx)(recharts_1.Line, { type: "monotone", dataKey: "renewed", stroke: "#82ca9d", strokeWidth: 2 }), (0, jsx_runtime_1.jsx)(recharts_1.Line, { type: "monotone", dataKey: "new", stroke: "#8884d8", strokeWidth: 2 })] }) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u062D\u0636\u0648\u0631" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u0646\u0633\u0628\u0629 \u0627\u0644\u062D\u0636\u0648\u0631 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A\u0629" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", children: "92%" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0623\u062E\u064A\u0631" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: "12 \u062F\u0642\u064A\u0642\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u0623\u064A\u0627\u0645 \u0627\u0644\u063A\u064A\u0627\u0628 \u0627\u0644\u0634\u0647\u0631\u064A\u0629" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: "3.2 \u064A\u0648\u0645" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u0623\u0641\u0636\u0644 \u0642\u0633\u0645 \u0641\u064A \u0627\u0644\u062D\u0636\u0648\u0631" }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "secondary", children: "\u0642\u0633\u0645 IT" })] })] }) })] })] }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "employees", className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "w-5 h-5 text-purple-500" }), "\u0623\u0643\u062B\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u062A\u063A\u064A\u064A\u0631\u0627\u064B \u0644\u0644\u0648\u0638\u0627\u0626\u0641"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, { width: "100%", height: 300, children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, { data: jobChangesData, layout: "horizontal", children: [(0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { type: "number" }), (0, jsx_runtime_1.jsx)(recharts_1.YAxis, { dataKey: "name", type: "category", width: 80 }), (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}), (0, jsx_runtime_1.jsx)(recharts_1.Bar, { dataKey: "changes", fill: "#8884d8" })] }) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u062A\u062D\u0644\u064A\u0644 \u0623\u062F\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: [
                                                    { 'name': 'أحمد محمد', 'performance': 95, 'trend': 'up' },
                                                    { 'name': 'فاطمة علي', 'performance': 88, 'trend': 'stable' },
                                                    { 'name': 'محمد حسن', 'performance': 72, 'trend': 'down' },
                                                    { 'name': 'سارة أحمد', 'performance': 91, 'trend': 'up' }
                                                ].map(function (employee, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-3 bg-muted/50 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: employee.name }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted-foreground", children: ["\u0627\u0644\u0623\u062F\u0627\u0621: ", employee.performance, "%"] })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: employee.trend === 'up' ? 'default' : employee.trend === 'down' ? 'destructive' : 'secondary', children: employee.trend === 'up' ? 'تحسن' : employee.trend === 'down' ? 'تراجع' : 'مستقر' })] }, index)); }) }) })] })] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "w-5 h-5 text-primary" }), "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleAIAction('تقرير الغياب'); }, disabled: loading, variant: "outline", className: "flex flex-col items-center gap-2 h-auto py-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "w-6 h-6" }), (0, jsx_runtime_1.jsx)("span", { children: "\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u063A\u064A\u0627\u0628" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleAIAction('التراخيص المنتهية'); }, disabled: loading, variant: "outline", className: "flex flex-col items-center gap-2 h-auto py-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "w-6 h-6" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0627\u0644\u062A\u0631\u0627\u062E\u064A\u0635 \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleAIAction('تحليل الأداء'); }, disabled: loading, variant: "outline", className: "flex flex-col items-center gap-2 h-auto py-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Target, { className: "w-6 h-6" }), (0, jsx_runtime_1.jsx)("span", { children: "\u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0627\u0621" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleAIAction('التوصيات'); }, disabled: loading, variant: "outline", className: "flex flex-col items-center gap-2 h-auto py-4", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, { className: "w-6 h-6" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0627\u0644\u062A\u0648\u0635\u064A\u0627\u062A" })] })] }) })] })] }));
}
