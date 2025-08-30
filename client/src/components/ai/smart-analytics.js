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
exports.default = SmartAnalytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/hooks/use-toast");
var logger_1 = __importDefault(require("../../lib/logger"));
function SmartAnalytics(_a) {
    var _this = this;
    var className = _a.className;
    var toast = (0, use_toast_1.useToast)().toast;
    var _b = (0, react_1.useState)([]), interactions = _b[0], setInteractions = _b[1];
    var _c = (0, react_1.useState)([]), suggestions = _c[0], setSuggestions = _c[1];
    var _d = (0, react_1.useState)(null), userBehavior = _d[0], setUserBehavior = _d[1];
    var _e = (0, react_1.useState)(null), systemMetrics = _e[0], setSystemMetrics = _e[1];
    var _f = (0, react_1.useState)(null), aiPerformance = _f[0], setAiPerformance = _f[1];
    var _g = (0, react_1.useState)(true), isMonitoring = _g[0], setIsMonitoring = _g[1];
    var _h = (0, react_1.useState)(false), isAnalyzing = _h[0], setIsAnalyzing = _h[1];
    var _j = (0, react_1.useState)(false), learningMode = _j[0], setLearningMode = _j[1];
    var _k = (0, react_1.useState)(false), showAdvancedMetrics = _k[0], setShowAdvancedMetrics = _k[1];
    // مراقبة التفاعلات في الوقت الفعلي
    (0, react_1.useEffect)(function () {
        var handleClick = function (e) {
            var target = e.target;
            if (target) {
                var interaction_1 = {
                    'type': 'click',
                    'element': target.tagName,
                    'className': target.className,
                    'path': window.location.pathname,
                    'timestamp': new Date().toISOString()
                };
                setInteractions(function (prev) { return __spreadArray(__spreadArray([], prev, true), [interaction_1], false); });
            }
        };
        var handleKeyPress = function (e) {
            var interaction = {
                'type': 'keypress',
                'key': e.key,
                'path': window.location.pathname,
                'timestamp': new Date().toISOString()
            };
            setInteractions(function (prev) { return __spreadArray(__spreadArray([], prev, true), [interaction], false); });
        };
        var handlePageView = function () {
            var interaction = {
                'type': 'pageview',
                'path': window.location.pathname,
                'timestamp': new Date().toISOString()
            };
            setInteractions(function (prev) { return __spreadArray(__spreadArray([], prev, true), [interaction], false); });
        };
        var handleMouseOver = function (e) {
            var target = e.target;
            if (target === null || target === void 0 ? void 0 : target.classList.contains('interactive')) {
                var interaction_2 = {
                    'type': 'hover',
                    'element': target.tagName,
                    'className': target.className,
                    'path': window.location.pathname,
                    'timestamp': new Date().toISOString()
                };
                setInteractions(function (prev) { return __spreadArray(__spreadArray([], prev, true), [interaction_2], false); });
            }
        };
        if (isMonitoring) {
            window.document.addEventListener('click', handleClick);
            window.document.addEventListener('keypress', handleKeyPress);
            window.addEventListener('popstate', handlePageView);
            window.document.addEventListener('mouseover', handleMouseOver);
            handlePageView(); // تسجيل الصفحة الحالية
        }
        return function () {
            window.document.removeEventListener('click', handleClick);
            window.document.removeEventListener('keypress', handleKeyPress);
            window.removeEventListener('popstate', handlePageView);
            window.document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isMonitoring]);
    // تحليل سلوك المستخدم
    var analyzeUserBehavior = (0, react_1.useCallback)(function () {
        if (interactions.length === 0) {
            return;
        }
        var sessionDuration = calculateSessionDuration(interactions);
        var clicksPerSession = calculateClicksPerSession(interactions);
        var errorRate = calculateErrorRate(interactions);
        var bounceRate = calculateBounceRate(interactions);
        var learningProgress = calculateLearningProgress(interactions);
        var efficiencyScore = calculateEfficiencyScore(interactions);
        var commonPaths = analyzeCommonPaths(interactions);
        var deviceTypes = analyzeDeviceTypes(interactions);
        var featuresUsed = analyzeFeaturesUsed(interactions);
        setUserBehavior({
            sessionDuration: sessionDuration,
            clicksPerSession: clicksPerSession,
            featuresUsed: featuresUsed,
            commonPaths: commonPaths,
            deviceTypes: deviceTypes,
            errorRate: errorRate,
            bounceRate: bounceRate,
            learningProgress: learningProgress,
            efficiencyScore: efficiencyScore
        });
    }, [interactions]);
    // تحليل المسارات الشائعة
    var analyzeCommonPaths = function (interactions) {
        var pathCounts = {};
        var pathSuccess = {};
        interactions.forEach(function (interaction) {
            var _a, _b;
            if (interaction.path) {
                pathCounts[interaction.path] = ((_a = pathCounts[interaction.path]) !== null && _a !== void 0 ? _a : 0) + 1;
                // افتراض أن التفاعل ناجح إذا كان نوعه click أو keypress
                if (interaction.type === 'click' || interaction.type === 'keypress') {
                    pathSuccess[interaction.path] = ((_b = pathSuccess[interaction.path]) !== null && _b !== void 0 ? _b : 0) + 1;
                }
            }
        });
        return Object.entries(pathCounts)
            .map(function (_a) {
            var path = _a[0], count = _a[1];
            return ({
                path: path,
                count: count,
                'successRate': pathSuccess[path] ? (pathSuccess[path] / count) * 100 : 0
            });
        })
            .sort(function (a, b) { return b.count - a.count; })
            .slice(0, 10);
    };
    // تحليل أنواع الأجهزة
    var analyzeDeviceTypes = function (_interactions) {
        // محاكاة بيانات الأجهزة
        return [
            { 'type': 'Desktop', 'percentage': 65, 'trend': 'up' },
            { 'type': 'Mobile', 'percentage': 30, 'trend': 'up' },
            { 'type': 'Tablet', 'percentage': 5, 'trend': 'stable' }
        ];
    };
    // تحليل الميزات المستخدمة
    var analyzeFeaturesUsed = function (interactions) {
        var features = new Set();
        interactions.forEach(function (interaction) {
            if (interaction.path.includes('/ai')) {
                features.add('الذكاء الاصطناعي');
            }
            if (interaction.path.includes('/reports')) {
                features.add('التقارير');
            }
            if (interaction.path.includes('/employees')) {
                features.add('الموظفين');
            }
            if (interaction.path.includes('/companies')) {
                features.add('الشركات');
            }
            if (interaction.path.includes('/licenses')) {
                features.add('التراخيص');
            }
            if (interaction.path.includes('/payroll')) {
                features.add('الرواتب');
            }
            if (interaction.path.includes('/attendance')) {
                features.add('الحضور');
            }
            if (interaction.path.includes('/documents')) {
                features.add('المستندات');
            }
        });
        return Array.from(features);
    };
    // حساب مدة الجلسة
    var calculateSessionDuration = function (interactions) {
        if (interactions.length < 2) {
            return 0;
        }
        var sortedInteractions = interactions.sort(function (a, b) {
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        });
        var firstInteraction = sortedInteractions[0];
        var lastInteraction = sortedInteractions[sortedInteractions.length - 1];
        if (!firstInteraction || !lastInteraction) {
            return 0;
        }
        var startTime = new Date(firstInteraction.timestamp).getTime();
        var endTime = new Date(lastInteraction.timestamp).getTime();
        return Math.round((endTime - startTime) / 1000); // Convert to seconds
    };
    // حساب النقرات لكل جلسة
    var calculateClicksPerSession = function (interactions) {
        var clicks = interactions.filter(function (i) { return i.type === 'click'; }).length;
        return clicks;
    };
    // حساب معدل الأخطاء
    var calculateErrorRate = function (_interactions) {
        // محاكاة معدل الأخطاء
        return Math.random() * 5 + 1; // 1-6%
    };
    // حساب معدل الارتداد
    var calculateBounceRate = function (_interactions) {
        // محاكاة معدل الارتداد
        return Math.random() * 20 + 10; // 10-30%
    };
    // حساب تقدم التعلم
    var calculateLearningProgress = function (interactions) {
        // محاكاة تقدم التعلم بناءً على تنوع التفاعلات
        var uniqueFeatures = new Set(interactions.map(function (i) { return i.path; })).size;
        return Math.min(uniqueFeatures * 10, 100);
    };
    // حساب درجة الكفاءة
    var calculateEfficiencyScore = function (interactions) {
        // محاكاة درجة الكفاءة
        var sessionDuration = calculateSessionDuration(interactions);
        var clicksPerSession = calculateClicksPerSession(interactions);
        if (sessionDuration === 0) {
            return 0;
        }
        var efficiency = (clicksPerSession / sessionDuration) * 10;
        return Math.min(efficiency, 100);
    };
    // تحليل مسار المستخدم (تمت إزالته لعدم الاستخدام)
    // التحقق من وجود أنماط متكررة
    var hasRepetitivePattern = function (interactions) {
        var recentInteractions = interactions.slice(-10);
        var uniquePaths = new Set(recentInteractions.map(function (i) { return i.path; }));
        return uniquePaths.size < 3; // إذا كان المستخدم يزور أقل من 3 صفحات مختلفة
    };
    // توليد اقتراحات التعلم
    var generateLearningSuggestion = function (interactions) {
        if (interactions.length < 5) {
            return null;
        }
        // const userPath = analyzeUserPath(interactions);
        var hasRepetitive = hasRepetitivePattern(interactions);
        var featuresUsed = analyzeFeaturesUsed(interactions);
        if (hasRepetitive && featuresUsed.length < 3) {
            return {
                'id': 'learning-1',
                'title': 'اكتشف ميزات جديدة',
                'description': 'يبدو أنك تستخدم نفس الميزات. جرب استكشاف ميزات جديدة لتحسين إنتاجيتك.',
                'type': 'learning',
                'priority': 'medium',
                'category': 'productivity',
                'confidence': 0.8,
                'action': 'عرض دليل الميزات',
                'estimatedImpact': 'زيادة الإنتاجية بنسبة 25%',
                'timestamp': new Date().toISOString()
            };
        }
        if (featuresUsed.length === 0) {
            return {
                'id': 'learning-2',
                'title': 'ابدأ باستخدام النظام',
                'description': 'يبدو أنك جديد في النظام. ابدأ باستكشاف الميزات الأساسية.',
                'type': 'learning',
                'priority': 'high',
                'category': 'onboarding',
                'confidence': 0.9,
                'action': 'عرض الدليل التفاعلي',
                'estimatedImpact': 'تسريع التعلم بنسبة 50%',
                'timestamp': new Date().toISOString()
            };
        }
        return null;
    };
    // تحميل بيانات النظام
    var loadSystemMetrics = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1, normalizedError;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/dashboard/stats', {
                            'credentials': 'include'
                        })];
                case 1:
                    response = _b.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _b.sent();
                    setSystemMetrics({
                        'activeUsers': Math.floor(Math.random() * 50) + 10,
                        'currentRequests': Math.floor(Math.random() * 20) + 5,
                        'systemHealth': 'good',
                        'lastUpdate': new Date().toISOString(),
                        'peakUsage': Math.floor(Math.random() * 100) + 50,
                        'averageSessionTime': Math.floor(Math.random() * 30) + 15,
                        'totalRequests': (_a = data.totalRequests) !== null && _a !== void 0 ? _a : 1247,
                        'successRate': 94.2,
                        'averageResponseTime': 2.3
                    });
                    _b.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    normalizedError = error_1 instanceof Error ? error_1 : new Error(String(error_1));
                    logger_1.default.error('Error loading system metrics:', normalizedError);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // تحميل بيانات أداء AI
    var loadAIPerformance = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, error_2, normalizedError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch('/api/ai/status', {
                            'credentials': 'include'
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        setAiPerformance({
                            'modelAccuracy': 94.2,
                            'responseQuality': 4.6,
                            'userSatisfaction': 4.5,
                            'learningRate': 0.15,
                            'improvementAreas': [
                                'تحليل المشاعر للغة العربية',
                                'دقة التوصيات',
                                'سرعة الاستجابة للاستعلامات المعقدة'
                            ],
                            'successMetrics': {
                                'correctResponses': 94.2,
                                'helpfulResponses': 89.5,
                                'userFeedback': 4.6
                            }
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    normalizedError = error_2 instanceof Error ? error_2 : new Error(String(error_2));
                    logger_1.default.error('Error loading AI performance:', normalizedError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // توليد اقتراحات ذكية
    var generateSmartSuggestions = (0, react_1.useCallback)(function () {
        var newSuggestions = [];
        // اقتراحات بناءً على سلوك المستخدم
        if (userBehavior) {
            if (userBehavior.efficiencyScore < 50) {
                newSuggestions.push({
                    'id': 'efficiency-1',
                    'title': 'تحسين الكفاءة',
                    'description': 'درجة كفاءتك منخفضة. جرب استخدام الاختصارات وطرق العمل السريعة.',
                    'type': 'optimization',
                    'priority': 'high',
                    'category': 'productivity',
                    'confidence': 0.85,
                    'action': 'عرض نصائح الكفاءة',
                    'estimatedImpact': 'زيادة الكفاءة بنسبة 30%',
                    'timestamp': new Date().toISOString()
                });
            }
            if (userBehavior.errorRate > 5) {
                newSuggestions.push({
                    'id': 'error-1',
                    'title': 'تقليل الأخطاء',
                    'description': 'معدل الأخطاء مرتفع. راجع إجراءاتك وتأكد من صحة البيانات المدخلة.',
                    'type': 'alert',
                    'priority': 'medium',
                    'category': 'quality',
                    'confidence': 0.75,
                    'action': 'عرض دليل الأخطاء الشائعة',
                    'estimatedImpact': 'تقليل الأخطاء بنسبة 40%',
                    'timestamp': new Date().toISOString()
                });
            }
            if (userBehavior.sessionDuration < 10) {
                newSuggestions.push({
                    'id': 'session-1',
                    'title': 'تحسين مدة الجلسة',
                    'description': 'مدة جلساتك قصيرة. جرب استكشاف المزيد من الميزات لتحسين تجربتك.',
                    'type': 'feature',
                    'priority': 'medium',
                    'category': 'engagement',
                    'confidence': 0.7,
                    'action': 'عرض الميزات المتقدمة',
                    'estimatedImpact': 'زيادة التفاعل بنسبة 25%',
                    'timestamp': new Date().toISOString()
                });
            }
        }
        // اقتراحات بناءً على أداء النظام
        if (systemMetrics) {
            if (systemMetrics.averageResponseTime > 3) {
                newSuggestions.push({
                    'id': 'performance-1',
                    'title': 'تحسين الأداء',
                    'description': 'وقت الاستجابة بطيء. قد تحتاج إلى تحسين الاتصال أو تحديث المتصفح.',
                    'type': 'optimization',
                    'priority': 'high',
                    'category': 'performance',
                    'confidence': 0.9,
                    'action': 'فحص الاتصال',
                    'estimatedImpact': 'تحسين السرعة بنسبة 50%',
                    'timestamp': new Date().toISOString()
                });
            }
        }
        // اقتراحات بناءً على أداء AI
        if (aiPerformance) {
            if (aiPerformance.userSatisfaction < 4) {
                newSuggestions.push({
                    'id': 'ai-1',
                    'title': 'تحسين تجربة AI',
                    'description': 'رضا المستخدمين منخفض. ساعدنا في تحسين المساعد الذكي.',
                    'type': 'feature',
                    'priority': 'medium',
                    'category': 'ai',
                    'confidence': 0.8,
                    'action': 'تقديم ملاحظات',
                    'estimatedImpact': 'تحسين الرضا بنسبة 20%',
                    'timestamp': new Date().toISOString()
                });
            }
        }
        // اقتراحات التعلم
        var learningSuggestion = generateLearningSuggestion(interactions);
        if (learningSuggestion) {
            newSuggestions.push(learningSuggestion);
        }
        setSuggestions(newSuggestions);
    }, [userBehavior, systemMetrics, aiPerformance, interactions]);
    // معالجة إجراء الاقتراح
    var handleSuggestionAction = function (suggestion) {
        toast({
            'title': 'تم تنفيذ الإجراء',
            'description': "\u062A\u0645 \u062A\u0646\u0641\u064A\u0630: ".concat(suggestion.action),
            'variant': 'default'
        });
        // إزالة الاقتراح من القائمة
        setSuggestions(function (prev) { return prev.filter(function (s) { return s.id !== suggestion.id; }); });
    };
    // تجاهل الاقتراح
    var handleDismissSuggestion = function (suggestionId) {
        setSuggestions(function (prev) { return prev.filter(function (s) { return s.id !== suggestionId; }); });
    };
    // تحليل سلوك المستخدم
    var handleAnalyzeBehavior = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setIsAnalyzing(true);
            try {
                analyzeUserBehavior();
                generateSmartSuggestions();
                toast({
                    'title': 'تم التحليل',
                    'description': 'تم تحليل سلوك المستخدم وتوليد الاقتراحات الذكية.',
                    'variant': 'default'
                });
            }
            catch (_b) {
                toast({
                    'title': 'خطأ في التحليل',
                    'description': 'حدث خطأ أثناء تحليل سلوك المستخدم.',
                    'variant': 'destructive'
                });
            }
            finally {
                setIsAnalyzing(false);
            }
            return [2 /*return*/];
        });
    }); };
    // تحميل البيانات عند بدء التطبيق
    (0, react_1.useEffect)(function () {
        loadSystemMetrics();
        loadAIPerformance();
    }, []);
    // تحليل سلوك المستخدم عند تغيير التفاعلات
    (0, react_1.useEffect)(function () {
        if (interactions.length > 0) {
            analyzeUserBehavior();
        }
    }, [interactions, analyzeUserBehavior]);
    // توليد الاقتراحات عند تغيير البيانات
    (0, react_1.useEffect)(function () {
        if ((userBehavior !== null && userBehavior !== void 0 ? userBehavior : systemMetrics) || aiPerformance) {
            generateSmartSuggestions();
        }
    }, [userBehavior, systemMetrics, aiPerformance, generateSmartSuggestions]);
    var getTrendIcon = function (trend) {
        switch (trend) {
            case 'up':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "h-3 w-3 mr-1" });
            case 'down':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingDown, { className: "h-3 w-3 mr-1" });
            case 'stable':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-3 w-3 mr-1" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-3 w-3 mr-1" });
        }
    };
    var getSuggestionIcon = function (type) {
        switch (type) {
            case 'feature':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-5 w-5 mt-0.5" });
            case 'optimization':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, { className: "h-5 w-5 mt-0.5" });
            case 'learning':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.BookOpen, { className: "h-5 w-5 mt-0.5" });
            case 'alert':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-5 w-5 mt-0.5" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, { className: "h-5 w-5 mt-0.5" });
        }
    };
    var getPriorityColor = function (priority) {
        var _a;
        var colors = {
            'high': 'text-red-600 bg-red-50',
            'medium': 'text-yellow-600 bg-yellow-50',
            'low': 'text-green-600 bg-green-50'
        };
        return (_a = colors[priority]) !== null && _a !== void 0 ? _a : 'text-gray-600 bg-gray-50';
    };
    var getTrendColor = function (trend) {
        var _a;
        var colors = {
            'up': 'text-green-600',
            'down': 'text-red-600',
            'stable': 'text-blue-600'
        };
        return (_a = colors[trend]) !== null && _a !== void 0 ? _a : 'text-gray-600';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6 ".concat(className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold text-gray-900", children: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "\u062A\u062D\u0644\u064A\u0644 \u0630\u0643\u064A \u0644\u0633\u0644\u0648\u0643 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0648\u0623\u062F\u0627\u0621 \u0627\u0644\u0646\u0638\u0627\u0645" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setShowAdvancedMetrics(!showAdvancedMetrics); }, children: [showAdvancedMetrics ? 'إخفاء' : 'إظهار', " \u0627\u0644\u0645\u0642\u0627\u064A\u064A\u0633 \u0627\u0644\u0645\u062A\u0642\u062F\u0645\u0629"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setLearningMode(!learningMode); }, children: [learningMode ? 'إيقاف' : 'تشغيل', " \u0648\u0636\u0639 \u0627\u0644\u062A\u0639\u0644\u0645"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return setIsMonitoring(!isMonitoring); }, children: [isMonitoring ? 'إيقاف' : 'تشغيل', " \u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", size: "sm", onClick: handleAnalyzeBehavior, disabled: isAnalyzing, children: [isAnalyzing ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "h-4 w-4 animate-spin" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "h-4 w-4" })), "\u062A\u062D\u0644\u064A\u0644"] })] })] }), systemMetrics && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0645\u0642\u0627\u064A\u064A\u0633 \u0627\u0644\u0646\u0638\u0627\u0645" })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-blue-600", children: systemMetrics.activeUsers }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u0646\u0634\u0637\u064A\u0646" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: systemMetrics.currentRequests }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-purple-600", children: systemMetrics.peakUsage }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0623\u0642\u0635\u0649" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-orange-600", children: [systemMetrics.averageSessionTime, " \u062F"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062C\u0644\u0633\u0629" })] })] }) })] })), aiPerformance && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Brain, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0623\u062F\u0627\u0621 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A" })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-blue-600", children: [aiPerformance.modelAccuracy, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u062F\u0642\u0629 \u0627\u0644\u0646\u0645\u0648\u0630\u062C" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-green-600", children: [aiPerformance.responseQuality, "/5"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u062C\u0648\u062F\u0629 \u0627\u0644\u0627\u0633\u062A\u062C\u0627\u0628\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-purple-600", children: [aiPerformance.userSatisfaction, "/5"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0631\u0636\u0627 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-orange-600", children: aiPerformance.learningRate }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0639\u0644\u0645" })] })] }), aiPerformance.improvementAreas.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-medium mb-4", children: "\u0645\u062C\u0627\u0644\u0627\u062A \u0627\u0644\u062A\u062D\u0633\u064A\u0646" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: aiPerformance.improvementAreas.map(function (area, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Target, { className: "h-4 w-4 text-blue-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: area })] }, index)); }) })] }))] })] })), userBehavior && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Users, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0633\u0644\u0648\u0643 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-blue-600", children: [userBehavior.sessionDuration, " \u062F"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u062A\u0648\u0633\u0637 \u0645\u062F\u0629 \u0627\u0644\u062C\u0644\u0633\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: userBehavior.clicksPerSession }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0646\u0642\u0631\u0627\u062A \u0644\u0643\u0644 \u062C\u0644\u0633\u0629" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-2xl font-bold text-purple-600", children: [userBehavior.efficiencyScore, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0645\u0639\u062F\u0644 \u0627\u0644\u0643\u0641\u0627\u0621\u0629" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-medium mb-4", children: "\u0627\u0644\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0629" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: userBehavior.featuresUsed.map(function (feature, index) { return ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", children: feature }, index)); }) })] }), showAdvancedMetrics && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-6", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-lg font-medium mb-4", children: "\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3", children: userBehavior.deviceTypes.map(function (device, index) { return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: device.type }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { className: "text-xs ".concat(getTrendColor(device.trend)), children: [getTrendIcon(device.trend), device.trend === 'up' ? 'زيادة' : device.trend === 'down' ? 'انخفاض' : 'مستقر'] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-gray-600", children: [device.percentage, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "w-20 bg-gray-200 rounded-full h-2", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-blue-600 h-2 rounded-full", style: { 'width': "".concat(device.percentage, "%") } }) })] })] }, index)); }) })] }))] })] })), suggestions.length > 0 && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0627\u0644\u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A \u0627\u0644\u0630\u0643\u064A\u0629" }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "text-xs", children: [suggestions.length, " \u0627\u0642\u062A\u0631\u0627\u062D"] })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: suggestions.map(function (suggestion) { return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 border rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between mb-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start space-x-3", children: [getSuggestionIcon(suggestion.type), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { className: "font-medium", children: suggestion.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mt-1", children: suggestion.description })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { className: "text-xs ".concat(getPriorityColor(suggestion.priority)), children: suggestion.priority === 'high' ? 'عالي' : suggestion.priority === 'medium' ? 'متوسط' : 'منخفض' }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return handleDismissSuggestion(suggestion.id); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "text-xs", children: suggestion.category }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-gray-500", children: ["\u0627\u0644\u062B\u0642\u0629: ", Math.round(suggestion.confidence * 100), "%"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-gray-500", children: suggestion.estimatedImpact }), suggestion.action && ((0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", onClick: function () { return handleSuggestionAction(suggestion); }, children: suggestion.action }))] })] })] }, suggestion.id)); }) }) })] })), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MousePointer, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u062A\u0641\u0627\u0639\u0644" }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "text-xs", children: [interactions.length, " \u062A\u0641\u0627\u0639\u0644"] })] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-blue-600", children: interactions.filter(function (i) { return i.type === 'click'; }).length }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0646\u0642\u0631\u0627\u062A" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-green-600", children: interactions.filter(function (i) { return i.type === 'keypress'; }).length }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-purple-600", children: interactions.filter(function (i) { return i.type === 'pageview'; }).length }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0635\u0641\u062D\u0627\u062A" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-2xl font-bold text-orange-600", children: new Set(interactions.map(function (i) { return i.path; })).size }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062A" })] })] }) })] })] }));
}
