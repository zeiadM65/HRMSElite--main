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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logger_1 = require("../utils/logger");
var router = (0, express_1.Router)();
// Knowledge Base for AI responses
var knowledgeBase = {
    'hrms': {
        'features': [
            'إدارة الموظفين - إضافة، تعديل، حذف بيانات الموظفين',
            'إدارة الشركات - تسجيل وإدارة معلومات الشركات',
            'إدارة التراخيص - متابعة تراخيص العمل والانتهاء',
            'إدارة الحضور والغياب - تسجيل ومتابعة الحضور',
            'إدارة الرواتب - حساب وإدارة رواتب الموظفين',
            'إدارة الإجازات - طلبات ومتابعة الإجازات',
            'إدارة المستندات - رفع وإدارة المستندات المهمة',
            'التقارير - تقارير مفصلة عن جميع العمليات',
            'الذكاء الاصطناعي - مساعد ذكي للاستعلامات والتحليل'
        ],
        'commonQuestions': {
            'كيف أضيف موظف جديد؟': 'يمكنك إضافة موظف جديد من خلال صفحة إدارة الموظفين، ثم النقر على زر \'إضافة موظف جديد\' وملء النموذج بالمعلومات المطلوبة.',
            'كيف أتحقق من التراخيص المنتهية؟': 'يمكنك الوصول إلى صفحة إدارة التراخيص والتحقق من قائمة التراخيص التي ستنتهي قريباً أو انتهت بالفعل.',
            'كيف أستخرج تقرير الحضور؟': 'يمكنك الوصول إلى صفحة التقارير واختيار تقرير الحضور والغياب، ثم تحديد الفترة المطلوبة.',
            'كيف أرفع مستند جديد؟': 'يمكنك رفع مستند جديد من خلال صفحة إدارة المستندات، ثم النقر على زر \'رفع مستند\' واختيار الملف المطلوب.'
        },
        'reports': {
            'تقرير الغياب': 'يظهر تقرير الغياب عدد أيام الغياب لكل موظف خلال فترة محددة مع الأسباب.',
            'تقرير التراخيص': 'يظهر حالة جميع التراخيص مع تواريخ الانتهاء والتنبيهات.',
            'تقرير الرواتب': 'يظهر تفاصيل رواتب الموظفين مع الخصومات والإضافات.',
            'تقرير الأداء': 'يظهر تقييم أداء الموظفين ومؤشرات الأداء المختلفة.'
        }
    }
};
// Analytics data storage (in production, this would be in a database)
var analyticsData = {
    'usageStats': {
        'totalRequests': 0,
        'averageResponseTime': 0,
        'successRate': 100,
        'popularFeatures': [
            { 'name': 'تحليل النصوص', 'count': 0 },
            { 'name': 'توليد التقارير', 'count': 0 },
            { 'name': 'تحليل المشاعر', 'count': 0 },
            { 'name': 'استخراج الكلمات المفتاحية', 'count': 0 },
            { 'name': 'المساعد الذكي', 'count': 0 }
        ]
    },
    'insights': [],
    'trends': {
        'dailyUsage': [],
        'featureUsage': [],
        'performanceMetrics': {
            'responseTime': 0,
            'accuracy': 100,
            'userSatisfaction': 5
        }
    },
    'recommendations': []
};
// Local LLM implementation for text processing
var LocalLLM = /** @class */ (function () {
    function LocalLLM() {
        this._model = null;
        this._isInitialized = false;
        this.initializeModel();
    }
    Object.defineProperty(LocalLLM.prototype, "isInitialized", {
        get: function () {
            return this._isInitialized;
        },
        enumerable: false,
        configurable: true
    });
    LocalLLM.prototype.initializeModel = function () {
        try {
            // In a real implementation, this would load a local model
            // For now, we'll use a mock implementation
            this._isInitialized = true;
            logger_1.log.info('Local LLM initialized successfully');
        }
        catch (error) {
            logger_1.log.error('Failed to initialize Local LLM:', error);
            this._isInitialized = false;
        }
    };
    LocalLLM.prototype.generateSummary = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var words, summaryLength, summary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isInitialized) {
                            throw new Error('Local LLM not initialized');
                        }
                        words = text.split(' ');
                        summaryLength = Math.min(Math.ceil(words.length * 0.3), 100);
                        summary = words.slice(0, summaryLength).join(' ');
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10); })];
                    case 1:
                        _a.sent(); // Simulate async operation
                        return [2 /*return*/, "\u0645\u0644\u062E\u0635 \u0627\u0644\u0646\u0635: ".concat(summary, "...")];
                }
            });
        });
    };
    LocalLLM.prototype.analyzeSentiment = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var positiveWords, negativeWords, positiveCount, negativeCount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isInitialized) {
                            throw new Error('Local LLM not initialized');
                        }
                        positiveWords = ['ممتاز', 'جيد', 'رائع', 'مثالي', 'مفيد'];
                        negativeWords = ['سيء', 'ضعيف', 'مشكلة', 'خطأ', 'فشل'];
                        positiveCount = positiveWords.filter(function (word) { return text.includes(word); }).length;
                        negativeCount = negativeWords.filter(function (word) { return text.includes(word); }).length;
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10); })];
                    case 1:
                        _a.sent(); // Simulate async operation
                        if (positiveCount > negativeCount) {
                            return [2 /*return*/, { 'sentiment': 'positive', 'confidence': 0.8 }];
                        }
                        else if (negativeCount > positiveCount) {
                            return [2 /*return*/, { 'sentiment': 'negative', 'confidence': 0.7 }];
                        }
                        else {
                            return [2 /*return*/, { 'sentiment': 'neutral', 'confidence': 0.6 }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalLLM.prototype.extractKeywords = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var commonKeywords, foundKeywords;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isInitialized) {
                            throw new Error('Local LLM not initialized');
                        }
                        commonKeywords = ['موظف', 'شركة', 'عمل', 'إدارة', 'مشروع', 'تطوير', 'تحليل'];
                        foundKeywords = commonKeywords.filter(function (keyword) { return text.includes(keyword); });
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10); })];
                    case 1:
                        _a.sent(); // Simulate async operation
                        return [2 /*return*/, foundKeywords.length > 0 ? foundKeywords : ['نص', 'تحليل', 'بيانات']];
                }
            });
        });
    };
    LocalLLM.prototype.generateInsights = function (_data) {
        return __awaiter(this, void 0, void 0, function () {
            var insights;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isInitialized) {
                            throw new Error('Local LLM not initialized');
                        }
                        insights = [
                            'تحليل البيانات يظهر نمواً إيجابياً في معظم المؤشرات',
                            'هناك فرص لتحسين الكفاءة في بعض الأقسام',
                            'معدل رضا الموظفين مرتفع مما يدل على بيئة عمل جيدة',
                            'الحاجة لمراجعة سياسات الغياب والتأخير'
                        ];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10); })];
                    case 1:
                        _a.sent(); // Simulate async operation
                        return [2 /*return*/, insights];
                }
            });
        });
    };
    return LocalLLM;
}());
// Initialize Local LLM instance
var localLLM = new LocalLLM();
// Middleware to check if LLM is ready
var checkLLMReady = function (_req, _res, _next) {
    if (!localLLM.isInitialized) {
        _res.status(503).json({
            'error': 'AI service not ready',
            'message': 'خدمة الذكاء الاصطناعي غير جاهزة حالياً. يرجى المحاولة مرة أخرى لاحقاً.'
        });
        return;
    }
    _next();
};
// AI Routes
/**
 * @route POST /api/ai/summary
 * @desc Generate summary of provided text
 * @access Private
 */
router.post('/summary', checkLLMReady, function (_req, _res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, summary, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = _req.body.text;
                if (!text || typeof text !== 'string') {
                    return [2 /*return*/, _res.status(400).json({
                            'error': 'Invalid input',
                            'message': 'يرجى توفير نص صحيح للتحليل'
                        })];
                }
                if (text.length < 10) {
                    return [2 /*return*/, _res.status(400).json({
                            'error': 'Text too short',
                            'message': 'النص قصير جداً. يرجى توفير نص أطول للتحليل'
                        })];
                }
                return [4 /*yield*/, localLLM.generateSummary(text)];
            case 1:
                summary = _a.sent();
                logger_1.log.info('Generated summary for text', {
                    'textLength': text.length, 'summaryLength': summary.length
                });
                _res.json({
                    summary: summary,
                    'originalLength': text.length,
                    'summaryLength': summary.length,
                    'compressionRatio': "".concat((summary.length / text.length * 100).toFixed(1), "%")
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                logger_1.log.error('Error generating summary:', error_1);
                _res.status(500).json({
                    'error': 'Failed to generate summary',
                    'message': 'حدث خطأ أثناء توليد الملخص. يرجى المحاولة مرة أخرى.'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @route POST /api/ai/sentiment
 * @desc Analyze sentiment of provided text
 * @access Private
 */
router.post('/sentiment', checkLLMReady, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, sentiment, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = req.body.text;
                if (!text || typeof text !== 'string') {
                    return [2 /*return*/, res.status(400).json({
                            'error': 'Invalid input',
                            'message': 'يرجى توفير نص صحيح للتحليل'
                        })];
                }
                return [4 /*yield*/, localLLM.analyzeSentiment(text)];
            case 1:
                sentiment = _a.sent();
                logger_1.log.info('Analyzed sentiment', { 'textLength': text.length, sentiment: sentiment });
                res.json({
                    'sentiment': sentiment.sentiment,
                    'confidence': sentiment.confidence,
                    'textLength': text.length
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                logger_1.log.error('Error analyzing sentiment:', error_2);
                res.status(500).json({
                    'error': 'Failed to analyze sentiment',
                    'message': 'حدث خطأ أثناء تحليل المشاعر. يرجى المحاولة مرة أخرى.'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @route POST /api/ai/keywords
 * @desc Extract keywords from provided text
 * @access Private
 */
router.post('/keywords', checkLLMReady, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, keywords, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                text = req.body.text;
                if (!text || typeof text !== 'string') {
                    return [2 /*return*/, res.status(400).json({
                            'error': 'Invalid input',
                            'message': 'يرجى توفير نص صحيح للتحليل'
                        })];
                }
                return [4 /*yield*/, localLLM.extractKeywords(text)];
            case 1:
                keywords = _a.sent();
                logger_1.log.info('Extracted keywords', { 'textLength': text.length, 'keywordCount': keywords.length });
                res.json({
                    keywords: keywords,
                    'count': keywords.length,
                    'textLength': text.length
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                logger_1.log.error('Error extracting keywords:', error_3);
                res.status(500).json({
                    'error': 'Failed to extract keywords',
                    'message': 'حدث خطأ أثناء استخراج الكلمات المفتاحية. يرجى المحاولة مرة أخرى.'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @route POST /api/ai/insights
 * @desc Generate insights from provided data
 * @access Private
 */
router.post('/insights', checkLLMReady, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, insights, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body.data;
                if (!data) {
                    return [2 /*return*/, res.status(400).json({
                            'error': 'Invalid input',
                            'message': 'يرجى توفير بيانات صحيحة للتحليل'
                        })];
                }
                return [4 /*yield*/, localLLM.generateInsights(data)];
            case 1:
                insights = _a.sent();
                logger_1.log.info('Generated insights', { 'dataType': typeof data, 'insightCount': insights.length });
                res.json({
                    insights: insights,
                    'count': insights.length,
                    'generatedAt': new Date().toISOString()
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                logger_1.log.error('Error generating insights:', error_4);
                res.status(500).json({
                    'error': 'Failed to generate insights',
                    'message': 'حدث خطأ أثناء توليد الرؤى. يرجى المحاولة مرة أخرى.'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @route POST /api/ai/analyze
 * @desc Comprehensive text analysis (summary + sentiment + keywords)
 * @access Private
 */
router.post('/analyze', checkLLMReady, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var text, _a, summary, sentiment, keywords, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                text = req.body.text;
                if (!text || typeof text !== 'string') {
                    return [2 /*return*/, res.status(400).json({
                            'error': 'Invalid input',
                            'message': 'يرجى توفير نص صحيح للتحليل'
                        })];
                }
                return [4 /*yield*/, Promise.all([
                        localLLM.generateSummary(text),
                        localLLM.analyzeSentiment(text),
                        localLLM.extractKeywords(text)
                    ])];
            case 1:
                _a = _b.sent(), summary = _a[0], sentiment = _a[1], keywords = _a[2];
                logger_1.log.info('Completed comprehensive analysis', {
                    'textLength': text.length,
                    'summaryLength': summary.length,
                    'sentiment': sentiment.sentiment,
                    'keywordCount': keywords.length
                });
                res.json({
                    summary: summary,
                    'sentiment': sentiment.sentiment,
                    'confidence': sentiment.confidence,
                    keywords: keywords,
                    'analysis': {
                        'originalLength': text.length,
                        'summaryLength': summary.length,
                        'compressionRatio': "".concat((summary.length / text.length * 100).toFixed(1), "%"),
                        'keywordCount': keywords.length
                    },
                    'generatedAt': new Date().toISOString()
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                logger_1.log.error('Error in comprehensive analysis:', error_5);
                res.status(500).json({
                    'error': 'Failed to analyze text',
                    'message': 'حدث خطأ أثناء تحليل النص. يرجى المحاولة مرة أخرى.'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @route GET /api/ai/status
 * @desc Check AI service status
 * @access Private
 */
router.get('/status', function (req, res) {
    res.json({
        'status': localLLM.isInitialized ? 'ready' : 'initializing',
        'service': 'Local LLM',
        'version': '1.0.0',
        'features': ['summary',
            'sentiment',
            'keywords',
            'insights',
            'comprehensive-analysis',
            'chat',
            'analytics'],
        'timestamp': new Date().toISOString()
    });
});
/**
 * @route POST /api/ai-chat
 * @desc AI Chatbot endpoint
 * @access Private
 */
router.post('/chat', checkLLMReady, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var message, chatbotFeature, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                message = req.body.message;
                if (!message || typeof message !== 'string') {
                    return [2 /*return*/, res.status(400).json({
                            'error': 'Invalid input',
                            'message': 'يرجى توفير رسالة صحيحة'
                        })];
                }
                // Update analytics
                analyticsData.usageStats.totalRequests++;
                chatbotFeature = analyticsData.usageStats.popularFeatures.find(function (f) { return f.name === 'المساعد الذكي'; });
                if (chatbotFeature) {
                    chatbotFeature.count++;
                }
                return [4 /*yield*/, processChatMessage(message)];
            case 1:
                response = _a.sent();
                logger_1.log.info('AI Chat response generated', {
                    'messageLength': message.length, 'responseLength': response.length
                });
                res.json({
                    response: response,
                    'timestamp': new Date().toISOString()
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                logger_1.log.error('Error in AI chat:', error_6);
                res.status(500).json({
                    'error': 'Failed to process chat message',
                    'message': 'حدث خطأ أثناء معالجة الرسالة. يرجى المحاولة مرة أخرى.'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @route GET /api/ai/knowledge
 * @desc Get knowledge base data
 * @access Private
 */
router.get('/knowledge', function (req, res) {
    try {
        var knowledgeData = [
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
        logger_1.log.info('Knowledge base data requested');
        res.json(knowledgeData);
    }
    catch (error) {
        logger_1.log.error('Error fetching knowledge base:', error);
        res.status(500).json({
            'error': 'Failed to fetch knowledge base',
            'message': 'حدث خطأ أثناء تحميل قاعدة المعرفة. يرجى المحاولة مرة أخرى.'
        });
    }
});
/**
 * @route GET /api/ai/analytics
 * @desc Get analytics data
 * @access Private
 */
router.get('/analytics', function (req, res) {
    try {
        var _a = req.query, _b = _a.period, period = _b === void 0 ? 'week' : _b, _c = _a.category, category = _c === void 0 ? 'all' : _c;
        var analyticsData_1 = generateAnalyticsData(period, category);
        logger_1.log.info('Analytics data requested', { period: period, category: category });
        res.json(analyticsData_1);
    }
    catch (error) {
        logger_1.log.error('Error generating analytics data:', error);
        res.status(500).json({
            'error': 'Failed to generate analytics data',
            'message': 'حدث خطأ أثناء توليد بيانات التحليلات. يرجى المحاولة مرة أخرى.'
        });
    }
});
// Helper function to process chat messages
function processChatMessage(message) {
    var lowerMessage = message.toLowerCase();
    // Check for common questions
    for (var _i = 0, _a = Object.entries(knowledgeBase.hrms.commonQuestions); _i < _a.length; _i++) {
        var _b = _a[_i], question = _b[0], answer = _b[1];
        if (lowerMessage.includes(question.toLowerCase()) ||
            question.toLowerCase().includes(lowerMessage)) {
            return answer;
        }
    }
    // Check for report requests
    if (lowerMessage.includes('تقرير') || lowerMessage.includes('report')) {
        if (lowerMessage.includes('غياب') || lowerMessage.includes('absence')) {
            return knowledgeBase.hrms.reports['تقرير الغياب'];
        }
        if (lowerMessage.includes('ترخيص') || lowerMessage.includes('license')) {
            return knowledgeBase.hrms.reports['تقرير التراخيص'];
        }
        if (lowerMessage.includes('راتب') || lowerMessage.includes('salary')) {
            return knowledgeBase.hrms.reports['تقرير الرواتب'];
        }
        if (lowerMessage.includes('أداء') || lowerMessage.includes('performance')) {
            return knowledgeBase.hrms.reports['تقرير الأداء'];
        }
    }
    // Check for feature inquiries
    if (lowerMessage.includes('ميزة') || lowerMessage.includes('feature') || lowerMessage.includes('ما يمكن')) {
        return "\u064A\u0645\u0643\u0646\u0646\u064A \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A:\n".concat(knowledgeBase.hrms.features.join('\n'));
    }
    // Check for license expiration queries
    if (lowerMessage.includes('ترخيص') && (lowerMessage.includes('ينتهي') || lowerMessage.includes('expire'))) {
        return 'يمكنني مساعدتك في التحقق من التراخيص المنتهية. يمكنك الوصول إلى صفحة إدارة التراخيص لرؤية جميع التراخيص التي ستنتهي قريباً.';
    }
    // Check for employee management queries
    if (lowerMessage.includes('موظف') || lowerMessage.includes('employee')) {
        if (lowerMessage.includes('إضافة') || lowerMessage.includes('add')) {
            return knowledgeBase.hrms.commonQuestions['كيف أضيف موظف جديد؟'];
        }
    }
    // Default response
    return 'مرحباً! أنا المساعد الذكي لـ HRMS Elite. يمكنني مساعدتك في:\n' +
        '• إدارة الموظفين والشركات\n' +
        '• متابعة التراخيص والانتهاء\n' +
        '• استخراج التقارير المختلفة\n' +
        '• الإجابة على أسئلتك حول النظام\n\n' +
        'كيف يمكنني مساعدتك اليوم؟';
}
// Helper function to generate analytics data
function generateAnalyticsData(period, category) {
    // In a real implementation, this would query a database
    // For now, we'll return mock data with some randomization
    var _a, _b;
    var baseData = {
        'usageStats': {
            'totalRequests': analyticsData.usageStats.totalRequests + Math.floor(Math.random() * 100),
            'averageResponseTime': 2.3 + Math.random() * 0.5,
            'successRate': 94 + Math.random() * 5,
            'popularFeatures': [
                { 'name': 'تحليل النصوص', 'count': 456 + Math.floor(Math.random() * 50) },
                { 'name': 'توليد التقارير', 'count': 342 + Math.floor(Math.random() * 30) },
                { 'name': 'تحليل المشاعر', 'count': 289 + Math.floor(Math.random() * 25) },
                { 'name': 'استخراج الكلمات المفتاحية', 'count': 160 + Math.floor(Math.random() * 20) },
                {
                    'name': 'المساعد الذكي', 'count': (_b = (_a = analyticsData.usageStats.popularFeatures.find(function (f) { return f.name === 'المساعد الذكي'; })) === null || _a === void 0 ? void 0 : _a.count) !== null && _b !== void 0 ? _b : 0
                }
            ]
        },
        'insights': [
            {
                'id': '1',
                'title': 'زيادة في استخدام تحليل النصوص',
                'description': 'ارتفع استخدام ميزة تحليل النصوص بنسبة 23% هذا الأسبوع',
                'type': 'positive',
                'impact': 'high',
                'timestamp': new Date().toISOString()
            },
            {
                'id': '2',
                'title': 'تحسن في وقت الاستجابة',
                'description': 'انخفض متوسط وقت الاستجابة من 3.2 إلى 2.3 ثانية',
                'type': 'positive',
                'impact': 'medium',
                'timestamp': new Date(Date.now() - 86400000).toISOString()
            },
            {
                'id': '3',
                'title': 'انخفاض في دقة تحليل المشاعر',
                'description': 'انخفضت دقة تحليل المشاعر بنسبة 5% - يحتاج إلى مراجعة',
                'type': 'warning',
                'impact': 'medium',
                'timestamp': new Date(Date.now() - 172800000).toISOString()
            }
        ],
        'trends': {
            'dailyUsage': generateDailyUsageData(period),
            'featureUsage': [
                { 'feature': 'تحليل النصوص', 'percentage': 36.6 },
                { 'feature': 'توليد التقارير', 'percentage': 27.4 },
                { 'feature': 'تحليل المشاعر', 'percentage': 23.2 },
                { 'feature': 'استخراج الكلمات المفتاحية', 'percentage': 12.8 }
            ],
            'performanceMetrics': {
                'responseTime': 2.3 + Math.random() * 0.5,
                'accuracy': 94 + Math.random() * 5,
                'userSatisfaction': 4.5 + Math.random() * 0.5
            }
        },
        'recommendations': [
            {
                'id': '1',
                'title': 'تحسين خوارزمية تحليل المشاعر',
                'description': 'استثمار في تحسين دقة تحليل المشاعر لتحسين تجربة المستخدم',
                'priority': 'high',
                'category': 'performance',
                'estimatedImpact': 'زيادة الدقة بنسبة 15%'
            },
            {
                'id': '2',
                'title': 'إضافة ميزة الترجمة التلقائية',
                'description': 'إضافة دعم للترجمة التلقائية لتحسين إمكانية الوصول',
                'priority': 'medium',
                'category': 'features',
                'estimatedImpact': 'زيادة الاستخدام بنسبة 20%'
            },
            {
                'id': '3',
                'title': 'تحسين واجهة المستخدم',
                'description': 'إعادة تصميم واجهة المستخدم لتحسين سهولة الاستخدام',
                'priority': 'low',
                'category': 'ui',
                'estimatedImpact': 'تحسين رضا المستخدمين'
            }
        ]
    };
    // Filter by category if specified
    if (category !== 'all') {
        baseData.recommendations = baseData.recommendations.filter(function (rec) { return rec.category === category; });
    }
    return baseData;
}
// Helper function to generate daily usage data
function generateDailyUsageData(period) {
    var days = period === 'day' ? 1 : period === 'week' ? 7 : 30;
    var data = [];
    for (var i = days - 1; i >= 0; i--) {
        var date = new Date();
        date.setDate(date.getDate() - i);
        var dateString = date.toISOString().split('T')[0];
        if (dateString) {
            data.push({
                'date': dateString,
                'requests': Math.floor(Math.random() * 50) + 30
            });
        }
    }
    return data;
}
exports.default = router;
