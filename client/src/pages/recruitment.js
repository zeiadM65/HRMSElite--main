"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Recruitment;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var button_1 = require("../components/ui/button");
var card_1 = require("../components/ui/card");
var tabs_1 = require("../components/ui/tabs");
var badge_1 = require("../components/ui/badge");
var lucide_react_1 = require("lucide-react");
var shared_layout_1 = require("../components/shared-layout");
var shared_1 = require("../components/shared");
function Recruitment() {
    return ((0, jsx_runtime_1.jsx)(shared_layout_1.SharedLayout, { userRole: "company_manager", userName: "\u0645\u062F\u064A\u0631 \u0627\u0644\u0634\u0631\u0643\u0629", companyName: "\u0634\u0631\u0643\u0629 \u0627\u0644\u0646\u064A\u0644 \u0627\u0644\u0623\u0632\u0631\u0642 \u0644\u0644\u0645\u062C\u0648\u0647\u0631\u0627\u062A", children: (0, jsx_runtime_1.jsx)(RecruitmentContent, {}) }));
}
function RecruitmentContent() {
    var _a = (0, react_1.useState)('jobs'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = (0, react_query_1.useQuery)({
        'queryKey': ['/api/recruitment/jobs']
    }), jobsLoading = _b.isLoading, jobsError = _b.error;
    var _c = (0, react_query_1.useQuery)({
        'queryKey': ['/api/recruitment/applicants']
    }), applicantsLoading = _c.isLoading, applicantsError = _c.error;
    var mockJobs = [
        {
            'id': '1',
            'title': 'محاسب أول',
            'department': 'المحاسبة',
            'location': 'الكويت',
            'type': 'دوام كامل',
            'applicants': 25,
            'status': 'active',
            'postedDate': '2025-01-20',
            'deadline': '2025-02-20',
            'experience': '3-5 سنوات',
            'salary': '800-1200 د.ك',
            'description': 'مطلوب محاسب أول للعمل في قسم المحاسبة'
        },
        {
            'id': '2',
            'title': 'مطور تطبيقات',
            'department': 'التكنولوجيا',
            'location': 'الكويت',
            'type': 'دوام كامل',
            'applicants': 18,
            'status': 'active',
            'postedDate': '2025-01-18',
            'deadline': '2025-02-15',
            'experience': '2-4 سنوات',
            'salary': '1000-1500 د.ك',
            'description': 'مطلوب مطور تطبيقات للعمل على تطوير الأنظمة'
        },
        {
            'id': '3',
            'title': 'مسؤول موارد بشرية',
            'department': 'الموارد البشرية',
            'location': 'الكويت',
            'type': 'دوام جزئي',
            'applicants': 32,
            'status': 'closed',
            'postedDate': '2025-01-10',
            'deadline': '2025-01-25',
            'experience': '5+ سنوات',
            'salary': '1200-1800 د.ك',
            'description': 'مطلوب مسؤول موارد بشرية ذو خبرة عالية'
        }
    ];
    var mockApplicants = [
        {
            'id': '1',
            'name': 'أحمد محمد علي',
            'email': 'ahmed@email.com',
            'phone': '+965 9999 8888',
            'position': 'محاسب أول',
            'experience': '4 سنوات',
            'status': 'pending',
            'appliedDate': '2025-01-22',
            'rating': 4.2,
            'cv': 'cv_ahmed.pdf'
        },
        {
            'id': '2',
            'name': 'فاطمة سالم أحمد',
            'email': 'fatima@email.com',
            'phone': '+965 7777 6666',
            'position': 'مطور تطبيقات',
            'experience': '3 سنوات',
            'status': 'interview',
            'appliedDate': '2025-01-20',
            'rating': 4.8,
            'cv': 'cv_fatima.pdf'
        },
        {
            'id': '3',
            'name': 'محمد عبدالله خالد',
            'email': 'mohammed@email.com',
            'phone': '+965 5555 4444',
            'position': 'مسؤول موارد بشرية',
            'experience': '6 سنوات',
            'status': 'accepted',
            'appliedDate': '2025-01-15',
            'rating': 4.9,
            'cv': 'cv_mohammed.pdf'
        }
    ];
    var getStatusColor = function (status) {
        var _a;
        var colors = {
            'active': 'bg-green-100 text-green-800',
            'closed': 'bg-red-100 text-red-800',
            'draft': 'bg-gray-100 text-gray-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'interview': 'bg-blue-100 text-blue-800',
            'accepted': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800'
        };
        return (_a = colors[status]) !== null && _a !== void 0 ? _a : colors.pending;
    };
    var getStatusName = function (status) {
        var _a;
        var names = {
            'active': 'نشط',
            'closed': 'مغلق',
            'draft': 'مسودة',
            'pending': 'قيد المراجعة',
            'interview': 'مقابلة',
            'accepted': 'مقبول',
            'rejected': 'مرفوض'
        };
        return (_a = names[status]) !== null && _a !== void 0 ? _a : 'غير محدد';
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800", children: (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto px-4 py-8", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-8", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: "\u0627\u0644\u062A\u0648\u0638\u064A\u0641 \u0648\u0627\u0644\u0627\u0633\u062A\u0642\u0637\u0627\u0628" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600 dark:text-gray-300 mt-1", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0634\u0627\u063A\u0631\u0629 \u0648\u0627\u0644\u0645\u062A\u0642\u062F\u0645\u064A\u0646 \u0648\u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u062A\u0648\u0638\u064A\u0641" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4 ml-2" }), "\u0627\u0644\u0628\u062D\u062B"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "bg-orange-600 hover:bg-orange-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 ml-2" }), "\u0625\u0636\u0627\u0641\u0629 \u0648\u0638\u064A\u0641\u0629 \u062C\u062F\u064A\u062F\u0629"] })] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "grid w-full grid-cols-4", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "jobs", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, { className: "h-4 w-4" }), "\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0634\u0627\u063A\u0631\u0629"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "applicants", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4" }), "\u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0648\u0646"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "interviews", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4" }), "\u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0627\u062A"] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, { value: "analytics", className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-4 w-4" }), "\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A"] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, { value: "jobs", className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [(0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, { className: "h-8 w-8 text-orange-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u0646\u0634\u0637\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: "12" })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-8 w-8 text-blue-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u064A\u0646" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: "187" })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-8 w-8 text-purple-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "\u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0627\u062A \u0627\u0644\u0645\u062C\u062F\u0648\u0644\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: "23" })] })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UserCheck, { className: "h-8 w-8 text-green-500" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "\u062A\u0645 \u062A\u0648\u0638\u064A\u0641\u0647\u0645 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: "8" })] })] }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [jobsLoading && (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, { text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0648\u0638\u0627\u0626\u0641..." }), jobsError && (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: jobsError, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0648\u0638\u0627\u0626\u0641", onRetry: function () { return window.location.reload(); } }), !jobsLoading && !jobsError && mockJobs.map(function (job) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between mb-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg line-clamp-2 mb-2", children: job.title }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "line-clamp-2", children: job.description })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: getStatusColor(job.status), children: getStatusName(job.status) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 text-sm text-gray-600", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4" }), job.location] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4" }), job.type] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4" }), job.applicants, " \u0645\u062A\u0642\u062F\u0645"] })] })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0642\u0633\u0645:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: job.department })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u062E\u0628\u0631\u0629:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: job.experience })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0631\u0627\u062A\u0628:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: job.salary })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0622\u062E\u0631 \u0645\u0648\u0639\u062F:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: job.deadline })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0639\u0631\u0636"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", className: "flex-1 bg-orange-600 hover:bg-orange-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-4 w-4 ml-1" }), "\u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0648\u0646"] })] })] }) })] }, job.id)); })] })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "applicants", className: "space-y-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-6", children: [applicantsLoading && (0, jsx_runtime_1.jsx)(shared_1.LoadingSpinner, { text: "\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u064A\u0646..." }), applicantsError && (0, jsx_runtime_1.jsx)(shared_1.ErrorMessage, { error: applicantsError, title: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u064A\u0646", onRetry: function () { return window.location.reload(); } }), !applicantsLoading && !applicantsError && mockApplicants.map(function (applicant) { return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-lg transition-shadow", children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 mb-3", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold", children: applicant.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: applicant.position })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: getStatusColor(applicant.status), children: getStatusName(applicant.status) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: applicant.email })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0647\u0627\u062A\u0641:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: applicant.phone })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u062E\u0628\u0631\u0629:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: applicant.experience })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4 mt-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: "h-4 w-4 text-yellow-500 fill-current" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: applicant.rating })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm text-gray-600", children: ["\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u062F\u064A\u0645: ", applicant.appliedDate] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0639\u0631\u0636 \u0627\u0644\u0633\u064A\u0631\u0629"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", className: "bg-green-600 hover:bg-green-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4 ml-1" }), "\u0642\u0628\u0648\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "destructive", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4 ml-1" }), "\u0631\u0641\u0636"] })] })] }) }) }, applicant.id)); })] }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "interviews", className: "space-y-6", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                                    {
                                        'candidate': 'أحمد محمد علي',
                                        'position': 'محاسب أول',
                                        'date': '2025-01-30',
                                        'time': '10:00 ص',
                                        'interviewer': 'مدير المحاسبة',
                                        'status': 'scheduled'
                                    },
                                    {
                                        'candidate': 'فاطمة سالم أحمد',
                                        'position': 'مطور تطبيقات',
                                        'date': '2025-01-31',
                                        'time': '2:00 م',
                                        'interviewer': 'مدير التكنولوجيا',
                                        'status': 'scheduled'
                                    },
                                    {
                                        'candidate': 'خالد عبدالرحمن',
                                        'position': 'مسؤول مبيعات',
                                        'date': '2025-02-01',
                                        'time': '11:00 ص',
                                        'interviewer': 'مدير المبيعات',
                                        'status': 'completed'
                                    }
                                ].map(function (interview, index) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: interview.candidate }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: getStatusColor(interview.status), children: interview.status === 'scheduled' ? 'مجدولة' : 'مكتملة' })] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: interview.position })] }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: interview.date })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0648\u0642\u062A:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: interview.time })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-600", children: "\u0627\u0644\u0645\u0642\u0627\u0628\u0644:" }), (0, jsx_runtime_1.jsx)("p", { className: "font-medium", children: interview.interviewer })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 ml-1" }), "\u0625\u0639\u0627\u062F\u0629 \u062C\u062F\u0648\u0644\u0629"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644"] })] })] }) })] }, index)); }) }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "analytics", className: "space-y-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [(0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0648\u0638\u064A\u0641 \u0627\u0644\u0634\u0647\u0631\u064A" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-3xl font-bold text-green-600", children: "65%" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u0639\u062F\u0644 \u0646\u062C\u0627\u062D \u0627\u0644\u062A\u0648\u0638\u064A\u0641" })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0648\u0646 \u0627\u0644\u0645\u0642\u0628\u0648\u0644\u0648\u0646" }), (0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: "24 \u0645\u0646 37" })] }) })] }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0623\u0643\u062B\u0631 \u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0637\u0644\u0628\u0627\u064B" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: [
                                                        { 'position': 'مطور تطبيقات', 'applications': 45 },
                                                        { 'position': 'محاسب', 'applications': 38 },
                                                        { 'position': 'مسؤول مبيعات', 'applications': 32 },
                                                        { 'position': 'مصمم جرافيك', 'applications': 28 }
                                                    ].map(function (job, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: job.position }), (0, jsx_runtime_1.jsxs)("span", { className: "font-medium", children: [job.applications, " \u0637\u0644\u0628"] })] }, index)); }) }) })] })] }) })] })] }) }));
}
