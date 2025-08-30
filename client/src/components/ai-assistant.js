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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.default = AIAssistant;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var badge_1 = require("@/components/ui/badge");
var scroll_area_1 = require("@/components/ui/scroll-area");
var lucide_react_1 = require("lucide-react");
var quickActions = [
    {
        'title': 'تقرير الغياب',
        'icon': lucide_react_1.Calendar,
        'description': 'احصل على تقرير مفصل عن الغياب',
        'action': 'أعطني تقرير الغياب لهذا الشهر'
    },
    {
        'title': 'التراخيص المنتهية',
        'icon': lucide_react_1.AlertTriangle,
        'description': 'تحقق من التراخيص التي ستنتهي قريباً',
        'action': 'كم رخصة ستنتهي خلال الشهر القادم؟'
    },
    {
        'title': 'تحليل الأداء',
        'icon': lucide_react_1.Target,
        'description': 'تحليل أداء الموظفين',
        'action': 'أعطني تحليل أداء الموظفين'
    },
    {
        'title': 'التوصيات',
        'icon': lucide_react_1.Lightbulb,
        'description': 'توصيات ذكية للتحسين',
        'action': 'ما هي التوصيات لتحسين الأداء؟'
    },
    {
        'title': 'إحصائيات الحضور',
        'icon': lucide_react_1.Activity,
        'description': 'إحصائيات مفصلة عن الحضور',
        'action': 'أعطني إحصائيات الحضور'
    },
    {
        'title': 'تحليل التراخيص',
        'icon': lucide_react_1.FileText,
        'description': 'تحليل شامل للتراخيص',
        'action': 'حلل حالة جميع التراخيص'
    }
];
var aiResponses = {
    'تقرير الغياب': {
        'text': 'بناءً على تحليل البيانات، إليك تقرير الغياب لهذا الشهر:\n\n• إجمالي أيام العمل: 22 يوم\n• نسبة الحضور: 92%\n• عدد أيام الغياب: 45 يوم\n• متوسط التأخير: 12 دقيقة\n\nالتوصية: قسم IT لديه أفضل نسبة حضور (95%)',
        'type': 'text'
    },
    'التراخيص المنتهية': {
        'text': 'تحليل التراخيص المنتهية:\n\n⚠️ تراخيص ستنتهي خلال 30 يوم:\n• شركة النيل الأزرق - 15 يوم\n• شركة الاتحاد الخليجي - 30 يوم\n\n📊 إجمالي التراخيص النشطة: 156\n📈 نسبة التجديد المتوقعة: 85%',
        'type': 'alert'
    },
    'تحليل الأداء': {
        'text': 'تحليل أداء الموظفين:\n\n🏆 أفضل أداء:\n• أحمد محمد - 95%\n• سارة أحمد - 91%\n\n⚠️ يحتاج متابعة:\n• محمد حسن - 72%\n\n📈 متوسط الأداء العام: 87%',
        'type': 'list'
    },
    'التوصيات': {
        'text': 'التوصيات الذكية للتحسين:\n\n1. 🎯 تدريب إضافي لـ 3 موظفين في قسم المبيعات\n2. 📅 تحسين جدول العمل لتقليل التأخير\n3. 🔄 مراجعة سياسات الغياب\n4. 💡 إدخال نظام حوافز لتحسين الأداء',
        'type': 'list'
    },
    'إحصائيات الحضور': {
        'text': 'إحصائيات الحضور الشاملة:\n\n📊 النسب:\n• الحضور: 92%\n• الغياب: 6%\n• التأخير: 2%\n\n🏢 أفضل الأقسام:\n1. IT - 95%\n2. المالية - 93%\n3. الموارد البشرية - 90%',
        'type': 'text'
    },
    'تحليل التراخيص': {
        'text': 'تحليل شامل للتراخيص\n\n📋 الحالة:\n• نشطة: 65%\n• تنتهي قريباً: 15%\n• منتهية: 10%\n• قيد التجديد: 10%\n\n💰 التكلفة المتوقعة للتجديد: 45,000 ريال',
        'type': 'text'
    }
};
function AIAssistant(_a) {
    var _this = this;
    var className = _a.className;
    var _b = (0, react_1.useState)([
        {
            'id': '1',
            'text': 'مرحباً! أنا المساعد الذكي لـ HRMS Elite. كيف يمكنني مساعدتك اليوم؟',
            'sender': 'ai',
            'timestamp': new Date(),
            'type': 'text'
        }
    ]), messages = _b[0], setMessages = _b[1];
    var _c = (0, react_1.useState)(''), inputValue = _c[0], setInputValue = _c[1];
    var _d = (0, react_1.useState)(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = (0, react_1.useState)(false), isMinimized = _e[0], setIsMinimized = _e[1];
    var messagesEndRef = (0, react_1.useRef)(null);
    var inputRef = (0, react_1.useRef)(null);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ 'behavior': 'smooth' });
    };
    (0, react_1.useEffect)(function () {
        scrollToBottom();
    }, [messages]);
    var addMessage = function (text, sender, type, data) {
        if (type === void 0) { type = 'text'; }
        var newMessage = __assign({ 'id': Date.now().toString(), text: text, sender: sender, 'timestamp': new Date(), type: type }, (data && { data: data }));
        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newMessage], false); });
    };
    var handleSendMessage = function (text) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!text.trim()) {
                return [2 /*return*/];
            }
            // إضافة رسالة المستخدم
            addMessage(text, 'user');
            setInputValue('');
            setIsLoading(true);
            // محاكاة استجابة AI
            setTimeout(function () {
                var response = aiResponses[text] || {
                    'text': 'أفهم سؤالك. دعني أحلل البيانات وأعطيك إجابة مفصلة...',
                    'type': 'text'
                };
                addMessage(response.text, 'ai', response.type);
                setIsLoading(false);
            }, 1500);
            return [2 /*return*/];
        });
    }); };
    var handleQuickAction = function (action) {
        handleSendMessage(action);
    };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };
    if (isMinimized) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "fixed bottom-4 right-4 z-50 ".concat(className), children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-80 shadow-lg", children: (0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "w-5 h-5 text-primary" }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm", children: "\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A" })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setIsMinimized(false); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Maximize2, { className: "w-4 h-4" }) })] }) }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed bottom-4 right-4 z-50 ".concat(className), children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-96 h-[600px] shadow-lg flex flex-col", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3 border-b", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "w-5 h-5 text-primary" }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm", children: "\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A" }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "secondary", className: "text-xs", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-3 h-3 mr-1" }), "AI"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setIsMinimized(true); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Minimize2, { className: "w-4 h-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setMessages(messages[0] ? [messages[0]] : []); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "w-4 h-4" }) })] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "flex-1 p-0 flex flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-4 border-b", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground mb-3", children: "\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0633\u0631\u064A\u0639\u0629:" }), (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-2", children: quickActions.slice(0, 4).map(function (action, index) { return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", className: "text-xs h-auto py-2 flex flex-col items-center gap-1", onClick: function () { return handleQuickAction(action.action); }, disabled: isLoading, children: [(0, jsx_runtime_1.jsx)(action.icon, { className: "w-3 h-3" }), (0, jsx_runtime_1.jsx)("span", { children: action.title })] }, index)); }) })] }), (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "flex-1 p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [messages.map(function (message) { return ((0, jsx_runtime_1.jsx)("div", { className: "flex ".concat(message.sender === 'user' ? 'justify-end' : 'justify-start'), children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-[80%] rounded-lg p-3 ".concat(message.sender === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [message.sender === 'user' ? ((0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "w-4 h-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-4 h-4 text-primary" })), (0, jsx_runtime_1.jsx)("span", { className: "text-xs opacity-70", children: message.timestamp.toLocaleTimeString('ar-SA', {
                                                                'hour': '2-digit',
                                                                'minute': '2-digit'
                                                            }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "whitespace-pre-wrap text-sm", children: message.text })] }) }, message.id)); }), isLoading && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-start", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-muted rounded-lg p-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-4 h-4 text-primary" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce" }), (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce", style: {
                                                                    'animationDelay': '0.1s'
                                                                } }), (0, jsx_runtime_1.jsx)("div", { className: "w-2 h-2 bg-primary rounded-full animate-bounce", style: {
                                                                    'animationDelay': '0.2s'
                                                                } })] })] }) }) })), (0, jsx_runtime_1.jsx)("div", { ref: messagesEndRef })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "p-4 border-t", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { ref: inputRef, value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, onKeyPress: handleKeyPress, placeholder: "\u0627\u0643\u062A\u0628 \u0631\u0633\u0627\u0644\u062A\u0643 \u0647\u0646\u0627...", disabled: isLoading, className: "flex-1" }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", onClick: function () { return handleSendMessage(inputValue); }, disabled: isLoading || !inputValue.trim(), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "w-4 h-4" }) })] }) })] })] }) }));
}
