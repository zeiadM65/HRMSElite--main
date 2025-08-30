"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Chatbot;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var badge_1 = require("@/components/ui/badge");
var scroll_area_1 = require("@/components/ui/scroll-area");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/hooks/use-toast");
var logger_1 = __importDefault(require("../../lib/logger"));
function useLocalChat(options) {
    var _this = this;
    var api = options.api, onError = options.onError;
    var _a = (0, react_1.useState)([]), messages = _a[0], setMessages = _a[1];
    var _b = (0, react_1.useState)(''), input = _b[0], setInput = _b[1];
    var _c = (0, react_1.useState)(false), isLoading = _c[0], setIsLoading = _c[1];
    var handleInputChange = function (e) {
        setInput(e.target.value);
    };
    var submit = function () { return __awaiter(_this, void 0, void 0, function () {
        var trimmed, nextMessages, res, data, assistantMessage_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trimmed = input.trim();
                    if (!trimmed || isLoading)
                        return [2 /*return*/];
                    nextMessages = __spreadArray(__spreadArray([], messages, true), [{ 'role': 'user', 'content': trimmed }], false);
                    setMessages(nextMessages);
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch(api, {
                            'method': 'POST',
                            'headers': { 'Content-Type': 'application/json' },
                            'credentials': 'include',
                            'body': JSON.stringify({ 'messages': nextMessages })
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error("Request failed: ".concat(res.status));
                    }
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    assistantMessage_1 = {
                        'id': data.id,
                        'role': 'assistant',
                        'content': data.content,
                        'createdAt': data.createdAt
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [assistantMessage_1], false); });
                    setInput('');
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    onError === null || onError === void 0 ? void 0 : onError(err_1);
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (_e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (_e)
                        _e.preventDefault();
                    return [4 /*yield*/, submit()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return { messages: messages, input: input, handleInputChange: handleInputChange, handleSubmit: handleSubmit, isLoading: isLoading, setMessages: setMessages, setInput: setInput };
}
var quickActions = [
    {
        'title': 'تقرير الغياب',
        'icon': lucide_react_1.Calendar,
        'description': 'احصل على تقرير مفصل عن الغياب',
        'action': 'أعطني تقرير الغياب لهذا الشهر',
        'category': 'reports',
        'usageCount': 156
    },
    {
        'title': 'التراخيص المنتهية',
        'icon': lucide_react_1.AlertTriangle,
        'description': 'تحقق من التراخيص التي ستنتهي قريباً',
        'action': 'كم رخصة ستنتهي خلال الشهر القادم؟',
        'category': 'licenses',
        'usageCount': 89
    },
    {
        'title': 'تحليل الأداء',
        'icon': lucide_react_1.Target,
        'description': 'تحليل أداء الموظفين',
        'action': 'أعطني تحليل أداء الموظفين',
        'category': 'analytics',
        'usageCount': 234
    },
    {
        'title': 'التوصيات الذكية',
        'icon': lucide_react_1.Lightbulb,
        'description': 'توصيات ذكية للتحسين',
        'action': 'ما هي التوصيات لتحسين الأداء؟',
        'category': 'recommendations',
        'usageCount': 67
    },
    {
        'title': 'إحصائيات الحضور',
        'icon': lucide_react_1.Activity,
        'description': 'إحصائيات مفصلة عن الحضور',
        'action': 'أعطني إحصائيات الحضور',
        'category': 'attendance',
        'usageCount': 198
    },
    {
        'title': 'تحليل التراخيص',
        'icon': lucide_react_1.FileText,
        'description': 'تحليل شامل للتراخيص',
        'action': 'حلل حالة جميع التراخيص',
        'category': 'licenses',
        'usageCount': 145
    },
    {
        'title': 'دليل النظام',
        'icon': lucide_react_1.BookOpen,
        'description': 'دليل شامل لاستخدام النظام',
        'action': 'أعطني دليل شامل لاستخدام النظام',
        'category': 'help',
        'usageCount': 78
    },
    {
        'title': 'تحليل البيانات',
        'icon': lucide_react_1.BarChart3,
        'description': 'تحليل شامل لبيانات النظام',
        'action': 'أعطني تحليل شامل لبيانات النظام',
        'category': 'analytics',
        'usageCount': 123
    },
    {
        'title': 'إدارة الشركات',
        'icon': lucide_react_1.Building,
        'description': 'معلومات عن إدارة الشركات',
        'action': 'كيف يمكنني إدارة الشركات؟',
        'category': 'companies',
        'usageCount': 92
    },
    {
        'title': 'إدارة الرواتب',
        'icon': lucide_react_1.CreditCard,
        'description': 'معلومات عن إدارة الرواتب',
        'action': 'كيف يمكنني إدارة الرواتب؟',
        'category': 'payroll',
        'usageCount': 167
    },
    {
        'title': 'الأمان والحماية',
        'icon': lucide_react_1.Shield,
        'description': 'معلومات عن أمان النظام',
        'action': 'ما هي ميزات الأمان في النظام؟',
        'category': 'security',
        'usageCount': 45
    },
    {
        'title': 'التقارير المتقدمة',
        'icon': lucide_react_1.PieChart,
        'description': 'تقارير متقدمة وتحليلات',
        'action': 'أعطني تقارير متقدمة',
        'category': 'reports',
        'usageCount': 134
    }
];
function Chatbot(_a) {
    var _this = this;
    var className = _a.className;
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)(false), isMinimized = _b[0], setIsMinimized = _b[1];
    var _c = (0, react_1.useState)(false), _isLoadingKnowledge = _c[0], setIsLoadingKnowledge = _c[1];
    var _d = (0, react_1.useState)([]), knowledgeBase = _d[0], setKnowledgeBase = _d[1];
    var _f = (0, react_1.useState)(''), searchQuery = _f[0], setSearchQuery = _f[1];
    var _g = (0, react_1.useState)(quickActions), filteredActions = _g[0], setFilteredActions = _g[1];
    var _h = (0, react_1.useState)(null), systemData = _h[0], setSystemData = _h[1];
    var _j = (0, react_1.useState)(false), showKnowledgeSearch = _j[0], setShowKnowledgeSearch = _j[1];
    var _k = (0, react_1.useState)([]), knowledgeSearchResults = _k[0], setKnowledgeSearchResults = _k[1];
    var messagesEndRef = (0, react_1.useRef)(null);
    var _l = useLocalChat({
        'api': '/api/ai-chat',
        'onError': function (error) {
            logger_1.default.error('Chat error:', error);
            toast({
                'title': 'خطأ في الاتصال',
                'description': 'حدث خطأ أثناء الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى.',
                'variant': 'destructive'
            });
        }
    }), messages = _l.messages, input = _l.input, handleInputChange = _l.handleInputChange, handleSubmit = _l.handleSubmit, isLoading = _l.isLoading, setMessages = _l.setMessages, setInput = _l.setInput;
    // تحميل قاعدة المعرفة من الملفات والـ API
    var loadKnowledgeBase = function () { return __awaiter(_this, void 0, void 0, function () {
        var apiResponse, apiData_1, markdownFiles, _loop_1, _i, markdownFiles_1, file, systemKnowledge_1, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 8, 9, 10]);
                    setIsLoadingKnowledge(true);
                    return [4 /*yield*/, fetch('/api/ai/knowledge', {
                            'credentials': 'include'
                        })];
                case 1:
                    apiResponse = _c.sent();
                    if (!apiResponse.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, apiResponse.json()];
                case 2:
                    apiData_1 = _c.sent();
                    setKnowledgeBase(function (prev) { return __spreadArray(__spreadArray([], prev, true), apiData_1, true); });
                    _c.label = 3;
                case 3:
                    markdownFiles = [
                        '/docs/README.md',
                        '/docs/API-DOCUMENTATION.md',
                        '/docs/AUTHENTICATION-IMPLEMENTATION.md',
                        '/docs/SECURITY-IMPLEMENTATION.md',
                        '/docs/COMPREHENSIVE-TESTING-IMPLEMENTATION.md',
                        '/docs/AI-ENDPOINTS-IMPLEMENTATION-SUMMARY.md',
                        '/docs/COMPREHENSIVE-DOCUMENTATION-REPORT.md'
                    ];
                    _loop_1 = function (file) {
                        var response, content_1, title_1, _d;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _f.trys.push([0, 4, , 5]);
                                    return [4 /*yield*/, fetch(file)];
                                case 1:
                                    response = _f.sent();
                                    if (!response.ok) return [3 /*break*/, 3];
                                    return [4 /*yield*/, response.text()];
                                case 2:
                                    content_1 = _f.sent();
                                    title_1 = (_b = (_a = file.split('/').pop()) === null || _a === void 0 ? void 0 : _a.replace('.md', '')) !== null && _b !== void 0 ? _b : 'Document';
                                    setKnowledgeBase(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{
                                            title: title_1,
                                            'content': "".concat(content_1.substring(0, 800), "..."), // زيادة المحتوى للعرض
                                            'category': 'documentation',
                                            'tags': extractTags(content_1),
                                            'priority': 1,
                                            'lastUpdated': new Date().toISOString(),
                                            'usageCount': Math.floor(Math.random() * 100),
                                            'source': 'documentation'
                                        }], false); });
                                    _f.label = 3;
                                case 3: return [3 /*break*/, 5];
                                case 4:
                                    _d = _f.sent();
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, markdownFiles_1 = markdownFiles;
                    _c.label = 4;
                case 4:
                    if (!(_i < markdownFiles_1.length)) return [3 /*break*/, 7];
                    file = markdownFiles_1[_i];
                    return [5 /*yield**/, _loop_1(file)];
                case 5:
                    _c.sent();
                    _c.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7:
                    systemKnowledge_1 = [
                        {
                            'title': 'إدارة الموظفين',
                            'content': 'يمكنك إضافة موظفين جدد، تعديل بياناتهم، حذفهم، ومتابعة أدائهم. النظام يدعم إدارة كاملة لبيانات الموظفين بما في ذلك المعلومات الشخصية، الوظيفية، والمالية.',
                            'category': 'employees',
                            'tags': ['موظف', 'إضافة', 'تعديل', 'حذف', 'أداء'],
                            'priority': 5,
                            'lastUpdated': new Date().toISOString(),
                            'usageCount': 456,
                            'source': 'system'
                        },
                        {
                            'title': 'إدارة الشركات',
                            'content': 'النظام يدعم إدارة متعددة الشركات. يمكنك إضافة شركات جديدة، تعديل معلوماتها، وإدارة العلاقة بين الشركات والموظفين.',
                            'category': 'companies',
                            'tags': ['شركة', 'إدارة', 'معلومات', 'علاقة'],
                            'priority': 4,
                            'lastUpdated': new Date().toISOString(),
                            'usageCount': 234,
                            'source': 'system'
                        },
                        {
                            'title': 'إدارة التراخيص',
                            'content': 'متابعة تراخيص العمل والانتهاء. النظام ينبهك للتراخيص التي ستنتهي قريباً ويساعدك في تجديدها في الوقت المناسب.',
                            'category': 'licenses',
                            'tags': ['ترخيص', 'انتهاء', 'تجديد', 'تنبيه'],
                            'priority': 4,
                            'lastUpdated': new Date().toISOString(),
                            'usageCount': 189,
                            'source': 'system'
                        },
                        {
                            'title': 'إدارة الحضور والغياب',
                            'content': 'تسجيل ومتابعة الحضور والغياب للموظفين. النظام يحسب ساعات العمل، التأخير، والإجازات.',
                            'category': 'attendance',
                            'tags': ['حضور', 'غياب', 'ساعات', 'تأخير', 'إجازة'],
                            'priority': 3,
                            'lastUpdated': new Date().toISOString(),
                            'usageCount': 567,
                            'source': 'system'
                        },
                        {
                            'title': 'إدارة الرواتب',
                            'content': 'حساب وإدارة رواتب الموظفين. النظام يدعم الخصومات، الإضافات، والمكافآت مع إمكانية توليد تقارير الرواتب.',
                            'category': 'payroll',
                            'tags': ['راتب', 'حساب', 'خصم', 'إضافة', 'مكافأة'],
                            'priority': 3,
                            'lastUpdated': new Date().toISOString(),
                            'usageCount': 345,
                            'source': 'system'
                        },
                        {
                            'title': 'إدارة المستندات',
                            'content': 'رفع وإدارة المستندات المهمة مثل العقود، الشهادات، والوثائق الرسمية. النظام يدعم تصنيف المستندات والبحث فيها.',
                            'category': 'documents',
                            'tags': ['مستند', 'رفع', 'تصنيف', 'بحث', 'عقد'],
                            'priority': 2,
                            'lastUpdated': new Date().toISOString(),
                            'usageCount': 278,
                            'source': 'system'
                        },
                        {
                            'title': 'التقارير والتحليلات',
                            'content': 'توليد تقارير مفصلة عن جميع العمليات. النظام يوفر تحليلات ذكية ومؤشرات الأداء لمساعدتك في اتخاذ القرارات.',
                            'category': 'reports',
                            'tags': ['تقرير', 'تحليل', 'مؤشر', 'أداء', 'قرار'],
                            'priority': 2,
                            'lastUpdated': new Date().toISOString(),
                            'usageCount': 412,
                            'source': 'system'
                        },
                        {
                            'title': 'الذكاء الاصطناعي',
                            'content': 'مساعد ذكي للاستعلامات والتحليل. النظام يستخدم الذكاء الاصطناعي لتقديم توصيات ذكية وتحليلات متقدمة.',
                            'category': 'ai',
                            'tags': ['ذكاء', 'اصطناعي', 'مساعد', 'توصية', 'تحليل'],
                            'priority': 1,
                            'lastUpdated': new Date().toISOString(),
                            'usageCount': 123,
                            'source': 'system'
                        }
                    ];
                    setKnowledgeBase(function (prev) { return __spreadArray(__spreadArray([], prev, true), systemKnowledge_1, true); });
                    return [3 /*break*/, 10];
                case 8:
                    error_1 = _c.sent();
                    logger_1.default.error('Error loading knowledge base:', error_1);
                    toast({
                        'title': 'تحذير',
                        'description': 'فشل في تحميل بعض مصادر المعرفة، لكن المساعد سيعمل بشكل طبيعي.',
                        'variant': 'default'
                    });
                    return [3 /*break*/, 10];
                case 9:
                    setIsLoadingKnowledge(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    // تحميل بيانات النظام
    var loadSystemData = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/dashboard/stats', {
                            'credentials': 'include'
                        })];
                case 1:
                    response = _c.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _c.sent();
                    setSystemData({
                        'employees': (_a = data.totalEmployees) !== null && _a !== void 0 ? _a : 0,
                        'companies': (_b = data.totalCompanies) !== null && _b !== void 0 ? _b : 0,
                        'licenses': Math.floor(Math.random() * 100) + 50,
                        'attendance': Math.floor(Math.random() * 95) + 85,
                        'payroll': Math.floor(Math.random() * 1000) + 500,
                        'documents': Math.floor(Math.random() * 500) + 200,
                        'reports': Math.floor(Math.random() * 50) + 20,
                        'activeUsers': Math.floor(Math.random() * 50) + 10,
                        'systemHealth': 'good'
                    });
                    _c.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _c.sent();
                    logger_1.default.error('Error loading system data:', error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // استخراج الكلمات المفتاحية من النص
    var extractTags = function (text) {
        var commonTags = [
            'موظف', 'شركة', 'ترخيص', 'راتب', 'حضور', 'إجازة', 'تقرير',
            'employee', 'company', 'license', 'salary', 'attendance', 'leave', 'report',
            'إدارة', 'نظام', 'بيانات', 'تحليل', 'أداء', 'معلومات', 'وثيقة',
            'management', 'system', 'data', 'analysis', 'performance', 'information', 'document'
        ];
        return commonTags.filter(function (tag) {
            return text.toLowerCase().includes(tag.toLowerCase());
        });
    };
    // البحث في قاعدة المعرفة
    var searchKnowledgeBase = function (query) {
        if (!query.trim()) {
            return [];
        }
        return knowledgeBase
            .filter(function (item) {
            return item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.content.toLowerCase().includes(query.toLowerCase()) ||
                item.tags.some(function (tag) { return tag.toLowerCase().includes(query.toLowerCase()); });
        })
            .sort(function (a, b) { return (b.priority - a.priority) || (b.usageCount - a.usageCount); });
    };
    // تصفية الإجراءات السريعة حسب البحث
    (0, react_1.useEffect)(function () {
        if (searchQuery.trim()) {
            var filtered = quickActions.filter(function (action) {
                return action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    action.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    action.category.toLowerCase().includes(searchQuery.toLowerCase());
            });
            setFilteredActions(filtered);
        }
        else {
            setFilteredActions(quickActions);
        }
    }, [searchQuery]);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ 'behavior': 'smooth' });
    };
    var handleQuickAction = function (action) {
        setInput(action);
        setSearchQuery('');
    };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    var clearChat = function () {
        setMessages([]);
        toast({
            'title': 'تم مسح المحادثة',
            'description': 'تم مسح جميع الرسائل بنجاح.',
            'variant': 'default'
        });
    };
    var handleKnowledgeSearch = function () {
        if (searchQuery.trim()) {
            var results = searchKnowledgeBase(searchQuery);
            setKnowledgeSearchResults(results);
            setShowKnowledgeSearch(true);
        }
    };
    // تحميل البيانات عند بدء التطبيق
    (0, react_1.useEffect)(function () {
        loadKnowledgeBase();
        loadSystemData();
    }, []);
    // التمرير التلقائي للأسفل
    (0, react_1.useEffect)(function () {
        scrollToBottom();
    }, [messages]);
    // Removed unused getCategoryIcon
    var getCategoryColor = function (category) {
        var _a;
        var colors = {
            'employees': 'bg-blue-100 text-blue-800',
            'companies': 'bg-green-100 text-green-800',
            'licenses': 'bg-yellow-100 text-yellow-800',
            'attendance': 'bg-purple-100 text-purple-800',
            'payroll': 'bg-indigo-100 text-indigo-800',
            'documents': 'bg-pink-100 text-pink-800',
            'reports': 'bg-orange-100 text-orange-800',
            'ai': 'bg-red-100 text-red-800',
            'analytics': 'bg-teal-100 text-teal-800',
            'help': 'bg-gray-100 text-gray-800',
            'security': 'bg-emerald-100 text-emerald-800',
            'system': 'bg-slate-100 text-slate-800',
            'documentation': 'bg-cyan-100 text-cyan-800'
        };
        return (_a = colors[category]) !== null && _a !== void 0 ? _a : 'bg-gray-100 text-gray-800';
    };
    if (isMinimized) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "fixed bottom-4 right-4 z-50 ".concat(className), children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-80 shadow-lg", children: (0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "h-5 w-5 text-blue-600" }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm", children: "\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-1", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setIsMinimized(false); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Maximize2, { className: "h-4 w-4" }) }) })] }) }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed bottom-4 right-4 z-50 ".concat(className), children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-96 h-[600px] shadow-lg", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "h-5 w-5 text-blue-600" }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-sm", children: "\u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A" }), systemData && ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "text-xs", children: [systemData.activeUsers, " \u0646\u0634\u0637"] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: clearChat, title: "\u0645\u0633\u062D \u0627\u0644\u0645\u062D\u0627\u062F\u062B\u0629", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setIsMinimized(true); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Minimize2, { className: "h-4 w-4" }) })] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-3 border-b", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "\u0627\u0628\u062D\u062B \u0641\u064A \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0645\u0639\u0631\u0641\u0629...", value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "flex-1" }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", onClick: handleKnowledgeSearch, disabled: !searchQuery.trim(), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "h-4 w-4" }) })] }) }), showKnowledgeSearch && knowledgeSearchResults.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "p-3 border-b bg-gray-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium", children: "\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0641\u0629" }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setShowKnowledgeSearch(false); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] }), (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "h-32", children: knowledgeSearchResults.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "mb-2 p-2 bg-white rounded border", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-1", children: [(0, jsx_runtime_1.jsx)("h5", { className: "text-sm font-medium", children: item.title }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "text-xs ".concat(getCategoryColor(item.category)), children: item.category })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-gray-600 mb-2", children: [item.content.substring(0, 100), "..."] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex space-x-1", children: item.tags.slice(0, 3).map(function (tag, tagIndex) { return ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "text-xs", children: tag }, tagIndex)); }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500", children: [item.usageCount, " \u0627\u0633\u062A\u062E\u062F\u0627\u0645"] })] })] }, index)); }) })] })), (0, jsx_runtime_1.jsxs)("div", { className: "p-3 border-b", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between mb-2", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium", children: "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629" }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "text-xs", children: [filteredActions.length, " \u0625\u062C\u0631\u0627\u0621"] })] }), (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "h-32", children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-2", children: filteredActions.map(function (action, index) { return ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", className: "h-auto p-2 flex flex-col items-start space-y-1", onClick: function () { return handleQuickAction(action.action); }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1 w-full", children: [(0, jsx_runtime_1.jsx)(action.icon, { className: "h-3 w-3" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium", children: action.title })] }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500 text-right w-full", children: [action.usageCount, " \u0627\u0633\u062A\u062E\u062F\u0627\u0645"] })] }, index)); }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 p-3", children: [(0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "h-48 mb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [messages.map(function (message, index) { return ((0, jsx_runtime_1.jsx)("div", { className: "flex ".concat(message.role === 'user' ? 'justify-end' : 'justify-start'), children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-[80%] rounded-lg p-3 ".concat(message.role === 'user'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-900'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 mb-1", children: [message.role === 'user' ? ((0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-3 w-3" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "h-3 w-3" })), (0, jsx_runtime_1.jsx)("span", { className: "text-xs opacity-75", children: message.role === 'user' ? 'أنت' : 'المساعد الذكي' })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: message.content })] }) }, index)); }), isLoading && ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-start", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-gray-100 rounded-lg p-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "\u062C\u0627\u0631\u064A \u0627\u0644\u0643\u062A\u0627\u0628\u0629..." })] }) }) })), (0, jsx_runtime_1.jsx)("div", { ref: function (el) { messagesEndRef.current = el; } })] }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "flex space-x-2", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { value: input, onChange: handleInputChange, onKeyPress: handleKeyPress, placeholder: "\u0627\u0643\u062A\u0628 \u0631\u0633\u0627\u0644\u062A\u0643 \u0647\u0646\u0627...", className: "flex-1", disabled: isLoading }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", size: "sm", disabled: isLoading || !input.trim(), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "h-4 w-4" }) })] })] })] })] }) }));
}
