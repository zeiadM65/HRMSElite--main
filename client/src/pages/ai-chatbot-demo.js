"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIChatbotDemo;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var PageHelmet_1 = require("@/components/shared/PageHelmet");
var LoadingFallback_1 = require("@/components/shared/LoadingFallback");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
// Lazy load AI chatbot
var Chatbot = react_1.default.lazy(function () { return Promise.resolve().then(function () { return __importStar(require('@/components/ai/chatbot')); }); });
var features = [
    {
        'icon': lucide_react_1.Brain,
        'title': 'ذكاء اصطناعي متقدم',
        'description': 'مساعد ذكي يستخدم تقنيات AI متطورة لفهم وتحليل استفساراتك'
    },
    {
        'icon': lucide_react_1.MessageSquare,
        'title': 'محادثة طبيعية',
        'description': 'تفاعل طبيعي باللغة العربية مع واجهة سهلة الاستخدام'
    },
    {
        'icon': lucide_react_1.Users,
        'title': 'تحليل الموظفين',
        'description': 'تحليل شامل لأداء الموظفين ومعدلات الحضور والغياب'
    },
    {
        'icon': lucide_react_1.FileText,
        'title': 'متابعة التراخيص',
        'description': 'متابعة حالة التراخيص والوثائق المهمة'
    },
    {
        'icon': lucide_react_1.Calendar,
        'title': 'تقارير الحضور',
        'description': 'تقارير مفصلة عن الحضور والغياب والتأخير'
    },
    {
        'icon': lucide_react_1.Target,
        'title': 'التوصيات الذكية',
        'description': 'توصيات مخصصة لتحسين الأداء والإنتاجية'
    }
];
var quickExamples = [
    'أعطني تقرير الغياب لهذا الشهر',
    'كم رخصة ستنتهي خلال الشهر القادم؟',
    'أعطني تحليل أداء الموظفين',
    'ما هي التوصيات لتحسين الأداء؟',
    'أعطني إحصائيات الحضور',
    'حلل حالة جميع التراخيص'
];
function AIChatbotDemo() {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PageHelmet_1.PageHelmet, { title: "\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A - HRMS Elite", description: "\u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A \u0644\u0646\u0638\u0627\u0645 \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629", keywords: "\u0645\u0633\u0627\u0639\u062F \u0630\u0643\u064A, AI, \u0645\u062D\u0627\u062F\u062B\u0629, \u062A\u062D\u0644\u064A\u0644, HRMS" }), (0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-3", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "w-8 h-8 text-primary" }), (0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-bold text-foreground", children: "\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A" }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "secondary", className: "text-sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-3 h-3 mr-1" }), "AI"] })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0642\u0648\u0629 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0641\u064A \u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0648\u0627\u0631\u062F \u0627\u0644\u0628\u0634\u0631\u064A\u0629. \u0627\u0633\u0623\u0644 \u0623\u064A \u0633\u0624\u0627\u0644 \u0648\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0625\u062C\u0627\u0628\u0627\u062A \u0630\u0643\u064A\u0629 \u0648\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0645\u0641\u0635\u0644\u0629." })] }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: features.map(function (feature, index) { return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "hover:shadow-lg transition-shadow", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(feature.icon, { className: "w-6 h-6 text-primary" }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg", children: feature.title })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: feature.description }) })] }, index)); }) }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Zap, { className: "w-5 h-5 text-primary" }), "\u0623\u0645\u062B\u0644\u0629 \u0633\u0631\u064A\u0639\u0629 \u0644\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: quickExamples.map(function (example, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer", onClick: function () {
                                            // يمكن إضافة تفاعل هنا لفتح المحادثة مع هذا السؤال
                                        }, children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium", children: example }) }, index)); }) }) })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0643\u064A\u0641\u064A\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645" }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "space-y-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto", children: (0, jsx_runtime_1.jsx)("span", { className: "text-primary font-bold", children: "1" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-semibold", children: "\u0627\u0643\u062A\u0628 \u0633\u0624\u0627\u0644\u0643" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "\u0627\u0643\u062A\u0628 \u0623\u064A \u0633\u0624\u0627\u0644 \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto", children: (0, jsx_runtime_1.jsx)("span", { className: "text-primary font-bold", children: "2" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-semibold", children: "\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0628\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0633\u064A\u062C\u064A\u0628\u0643 \u0641\u0648\u0631\u0627\u064B" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto", children: (0, jsx_runtime_1.jsx)("span", { className: "text-primary font-bold", children: "3" }) }), (0, jsx_runtime_1.jsx)("h3", { className: "font-semibold", children: "\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: "\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0633\u0631\u064A\u0639\u0629 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u062A\u0642\u0627\u0631\u064A\u0631 \u062C\u0627\u0647\u0632\u0629" })] })] }) })] })] }), (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingFallback_1.LoadingFallback, {}), children: (0, jsx_runtime_1.jsx)(Chatbot, {}) })] }));
}
