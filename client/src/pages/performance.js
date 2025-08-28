"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Performance;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var button_1 = require("../components/ui/button");
var card_1 = require("../components/ui/card");
var tabs_1 = require("../components/ui/tabs");
var badge_1 = require("../components/ui/badge");
var progress_1 = require("../components/ui/progress");
var lucide_react_1 = require("lucide-react");
var shared_layout_1 = require("../components/shared-layout");
var shared_1 = require("../components/shared");
function Performance() {
    return ((0, jsx_runtime_1.jsx)(shared_layout_1.SharedLayout, { userRole: "company_manager", userName: "\u0645\u062F\u064A\u0631 \u0627\u0644\u0634\u0631\u0643\u0629", companyName: "\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u064A\u0644 \u0627\u0644\u0623\u0632\u0631\u0642 \u0644\u0644\u0645\u062C\u0648\u0647\u0631\u0627\u062A", children: (0, jsx_runtime_1.jsx)(PerformanceContent, {}) }));
}
function PerformanceContent() {
    var _a = (0, react_1.useState)('overview'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = (0, react_query_1.useQuery)({
        'queryKey': ['/api/performance']
    }), _performanceData = _b["data"], isLoading = _b.isLoading, error = _b.error;
    var mockEmployeesPerformance = [
        {
            'id': '1',
            'name': 'أحمد محمد علي',
            'department': 'المبيعات',
            'position': 'مسؤول مبيعات أول',
            'overallScore': 4.8,
            'goals': { 'completed': 9, 'total': 10 },
            'lastReview': '2025-01-15',
            'categories': {
                'productivity': 4.9,
                'quality': 4.7,
                'teamwork': 4.8,
                'leadership': 4.6
            },
            'trend': 'up'
        },
        {
            'id': '2',
            'name': 'فاطمة سالم أحمد',
            'department': 'المحاسبة',
            'position': 'محاسب أول',
            'overallScore': 4.5,
            'goals': { 'completed': 8, 'total': 10 },
            'lastReview': '2025-01-10',
            'categories': {
                'productivity': 4.6,
                'quality': 4.8,
                'teamwork': 4.3,
                'leadership': 4.2
            },
            'trend': 'up'
        },
        {
            'id': '3',
            'name': 'خالد عبدالرحمن',
            'department': 'التكنولوجيا',
            'position': 'مطور أول',
            'overallScore': 4.2,
            'goals': { 'completed': 7, 'total': 10 },
            'lastReview': '2025-01-05',
            'categories': {
                'productivity': 4.1,
                'quality': 4.5,
                'teamwork': 4.0,
                'leadership': 3.8
            },
            'trend': 'stable'
        }
    ];
    var mockTeamPerformance = [
        {
            'team': 'فريق المبيعات',
            'manager': 'أحمد محمد علي',
            'members': 8,
            'avgScore': 4.3,
            'goalsCompleted': 85,
            'trend': 'up',
            'topPerformers': 3
        },
        {
            'team': 'فريق المحاسبة',
            'manager': 'فاطمة سالم',
            'members': 6,
            'avgScore': 4.1,
            'goalsCompleted': 78,
            'trend': 'stable',
            'topPerformers': 2
        },
        {
            'team': 'فريق التكنولوجيا',
            'manager': 'خالد عبدالرحمن',
            'members': 5,
            'avgScore': 4.0,
            'goalsCompleted': 72,
            'trend': 'down',
            'topPerformers': 1
        }
    ];
    var getScoreColor = function (score) {
        if (score >= 4.5) {
            return 'text-green-600';
        }
        if (score >= 4.0) {
            return 'text-yellow-600';
        }
        return 'text-red-600';
    };
    var getScoreBadgeColor = function (score) {
        if (score >= 4.5) {
            return 'bg-green-100 text-green-800';
        }
        if (score >= 4.0) {
            return 'bg-yellow-100 text-yellow-800';
        }
        return 'bg-red-100 text-red-800';
    };
    var getTrendIcon = function (trend) {
        if (trend === 'up') {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4 text-green-500" });
        }
        if (trend === 'down') {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4 text-red-500 rotate-180" });
        }
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-4 w-4 text-yellow-500" });
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800", children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: "\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0623\u062F\u0627\u0621" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 dark:text-gray-300 mt-1", children: "\u0645\u0631\u0627\u0642\u0628\u0629 \u0648\u062A\u0642\u064A\u064A\u0645 \u0623\u062F\u0627\u0621 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0648\u0627\u0644\u0641\u0631\u0642" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4 ml-2" }), "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062A\u0642\u064A\u064A\u0645\u0627\u062A"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-indigo-600 hover:bg-indigo-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 ml-2" }), "\u062A\u0642\u064A\u064A\u0645 \u062C\u062F\u064A\u062F"] })] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid w-full grid-cols-4", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "overview", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { className: "h-4 w-4" }), "\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "individual", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4" }), "\u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0641\u0631\u062F\u064A"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "teams", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Target, { className: "h-4 w-4" }), "\u0623\u062F\u0627\u0621 \u0627\u0644\u0641\u0631\u0642"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "reviews", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4" }), "\u0645\u0631\u0627\u062C\u0639\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621"] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "overview", className: "space-y-6", children: [isLoading && ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center py-12", children: (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, { text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621..." }) })), error && ((0, jsx_runtime_1.jsx)("div", { className: "py-8", children: (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: error, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621", onRetry: function () { return window.location.reload(); } }) })), !isLoading && !error && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [(0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-8 w-8 text-yellow-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u064A\u064A\u0645" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: "4.3" })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Target, { className: "h-8 w-8 text-blue-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: "78%" })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: "h-8 w-8 text-purple-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "\u0623\u0641\u0636\u0644 \u0627\u0644\u0623\u062F\u0627\u0621\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: "24" })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-8 w-8 text-green-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "\u062A\u062D\u0633\u0646 \u0627\u0644\u0623\u062F\u0627\u0621" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: "+12%" })] })] }) }) })] })), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0623\u062F\u0627\u0621 \u062D\u0633\u0628 \u0627\u0644\u062F\u0631\u062C\u0627\u062A" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 bg-green-500 rounded" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0645\u0645\u062A\u0627\u0632 (4.5-5.0)" })] }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: "45%" })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: 45, className: "h-2" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 bg-blue-500 rounded" }), (0, jsx_runtime_1.jsx)("span", { children: "\u062C\u064A\u062F \u062C\u062F\u0627\u064B (4.0-4.4)" })] }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: "35%" })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: 35, className: "h-2" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 bg-yellow-500 rounded" }), (0, jsx_runtime_1.jsx)("span", { children: "\u062C\u064A\u062F (3.5-3.9)" })] }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: "15%" })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: 15, className: "h-2" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 bg-red-500 rounded" }), (0, jsx_runtime_1.jsx)("span", { children: "\u064A\u062D\u062A\u0627\u062C \u062A\u062D\u0633\u064A\u0646 (< 3.5)" })] }), (0, jsx_runtime_1.jsx)("span", { className: "font-bold", children: "5%" })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: 5, className: "h-2" })] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0623\u062F\u0627\u0621 \u0627\u0644\u0623\u0642\u0633\u0627\u0645" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: [
                                                            { 'department': 'المبيعات', 'score': 4.3, 'employees': 15 },
                                                            { 'department': 'المحاسبة', 'score': 4.1, 'employees': 8 },
                                                            { 'department': 'التكنولوجيا', 'score': 4.0, 'employees': 6 },
                                                            { 'department': 'الموارد البشرية', 'score': 4.2, 'employees': 5 }
                                                        ].map(function (dept, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "font-medium", children: dept.department }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600", children: [dept.employees, " \u0645\u0648\u0638\u0641"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-right", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-bold text-lg ".concat(getScoreColor(dept.score)), children: dept.score }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0646\u0642\u0627\u0637" })] })] }, index)); }) }) })] })] })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "individual", className: "space-y-6", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 gap-6", children: mockEmployeesPerformance.map(function (employee) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-lg transition-shadow", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 mb-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold", children: employee.name }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: getScoreBadgeColor(employee.overallScore), children: [employee.overallScore, " \u0646\u0642\u0637\u0629"] }), getTrendIcon(employee.trend)] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-gray-600", children: [employee.position, " - ", employee.department] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-gray-500", children: ["\u0622\u062E\u0631 \u0645\u0631\u0627\u062C\u0639\u0629: ", employee.lastReview] })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold mb-3", children: "\u062A\u0642\u064A\u064A\u0645 \u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: Object.entries(employee.categories).map(function (_a) {
                                                                    var category = _a[0], score = _a[1];
                                                                    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "capitalize", children: category === 'productivity' ? 'الإنتاجية'
                                                                                            : category === 'quality' ? 'الجودة'
                                                                                                : category === 'teamwork' ? 'العمل الجماعي'
                                                                                                    : category === 'leadership' ? 'القيادة' : category }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: score })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: score * 20, className: "h-2" })] }, category));
                                                                }) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-semibold mb-3", children: "\u0625\u0646\u062C\u0627\u0632 \u0627\u0644\u0623\u0647\u062F\u0627\u0641" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-bold", children: [employee.goals.completed, "/", employee.goals.total] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: (employee.goals.completed / employee.goals.total) * 100, className: "h-2" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600", children: ["\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u0646\u062C\u0627\u0632: ", Math.round((employee.goals.completed / employee.goals.total) * 100), "%"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 text-blue-600 dark:text-blue-400", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: "\u0646\u0642\u0627\u0637 \u0627\u0644\u0642\u0648\u0629" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-blue-600 dark:text-blue-400 mt-1", children: "\u0623\u062F\u0627\u0621 \u0645\u062A\u0645\u064A\u0632 \u0641\u064A \u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0627\u0644\u0625\u0646\u062A\u0627\u062C\u064A\u0629" })] })] })] })] }) }, employee.id)); }) }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "teams", className: "space-y-6", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: mockTeamPerformance.map(function (team, index) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: team.team }), getTrendIcon(team.trend)] }), (0, jsx_runtime_1.jsxs)(card_1.CardDescription, { children: ["\u0627\u0644\u0645\u062F\u064A\u0631: ", team.manager] })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold ".concat(getScoreColor(team.avgScore)), children: team.avgScore }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0623\u062F\u0627\u0621" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-blue-600", children: team.members }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0639\u062F\u062F \u0627\u0644\u0623\u0639\u0636\u0627\u0621" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u0645\u0639\u062F\u0644 \u0625\u0646\u062C\u0627\u0632 \u0627\u0644\u0623\u0647\u062F\u0627\u0641" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium", children: [team.goalsCompleted, "%"] })] }), (0, jsx_runtime_1.jsx)(progress_1.Progress, { value: team.goalsCompleted, className: "h-2" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0645\u062A\u0645\u064A\u0632\u0648\u0646:" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: "h-4 w-4 text-yellow-500" }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium", children: [team.topPerformers, " \u0645\u0648\u0638\u0641"] })] })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "w-full", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0639\u0631\u0636 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0641\u0631\u064A\u0642"] })] }) })] }, index)); }) }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "reviews", className: "space-y-6", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 gap-6", children: [
                                    {
                                        'employee': 'أحمد محمد علي',
                                        'reviewer': 'مدير المبيعات',
                                        'date': '2025-01-15',
                                        'period': 'الربع الأول 2025',
                                        'status': 'completed',
                                        'score': 4.8,
                                        'nextReview': '2025-04-15'
                                    },
                                    {
                                        'employee': 'فاطمة سالم أحمد',
                                        'reviewer': 'مدير المحاسبة',
                                        'date': '2025-01-10',
                                        'period': 'سنوي 2024',
                                        'status': 'pending',
                                        'score': null,
                                        'nextReview': '2025-01-25'
                                    },
                                    {
                                        'employee': 'خالد عبدالرحمن',
                                        'reviewer': 'مدير التكنولوجيا',
                                        'date': '2025-01-05',
                                        'period': 'الربع الرابع 2024',
                                        'status': 'completed',
                                        'score': 4.2,
                                        'nextReview': '2025-04-05'
                                    }
                                ].map(function (review, index) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 mb-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold", children: review.employee }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: review.status === 'completed'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-yellow-100 text-yellow-800', children: review.status === 'completed' ? 'مكتملة' : 'قيد المراجعة' }), review.score && ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: getScoreBadgeColor(review.score), children: [review.score, " \u0646\u0642\u0637\u0629"] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0645\u0631\u0627\u062C\u0639:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: review.reviewer })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0641\u062A\u0631\u0629:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: review.period })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: review.date })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629:" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium mr-2", children: review.nextReview })] })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0639\u0631\u0636 \u0627\u0644\u062A\u0642\u064A\u064A\u0645"] })] }) }) }, index)); }) }) })] })] }) }));
}
