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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignaturesPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../components/ui/card");
var button_1 = require("../components/ui/button");
var input_1 = require("../components/ui/input");
var label_1 = require("../components/ui/label");
var badge_1 = require("../components/ui/badge");
var select_1 = require("../components/ui/select");
var use_toast_1 = require("../hooks/use-toast");
var signature_capture_1 = __importDefault(require("../components/signature-capture"));
var signature_1 = require("../services/signature");
var logger_1 = require("../lib/logger");
var lucide_react_1 = require("lucide-react");
function SignaturesPage() {
    var _this = this;
    var _a = (0, react_1.useState)([]), signatures = _a[0], setSignatures = _a[1];
    var _b = (0, react_1.useState)([]), filteredSignatures = _b[0], setFilteredSignatures = _b[1];
    var _c = (0, react_1.useState)(null), stats = _c[0], setStats = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(false), showSignatureCapture = _e[0], setShowSignatureCapture = _e[1];
    var _f = (0, react_1.useState)(null), selectedSignature = _f[0], setSelectedSignature = _f[1];
    var _g = (0, react_1.useState)(''), searchTerm = _g[0], setSearchTerm = _g[1];
    var _h = (0, react_1.useState)('all'), filterType = _h[0], setFilterType = _h[1];
    var _j = (0, react_1.useState)('all'), filterStatus = _j[0], setFilterStatus = _j[1];
    var toast = (0, use_toast_1.useToast)().toast;
    // تحميل البيانات
    (0, react_1.useEffect)(function () {
        loadSignatures();
        loadStats();
    }, []);
    // تطبيق الفلاتر
    (0, react_1.useEffect)(function () {
        var filtered = signatures;
        // فلتر البحث
        if (searchTerm) {
            filtered = filtered.filter(function (sig) {
                var _a, _b;
                var fileNameMatch = sig.fileName.toLowerCase().includes(searchTerm.toLowerCase());
                var entityIdMatch = (_b = (_a = sig.entityId) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) !== null && _b !== void 0 ? _b : false;
                var uploadedByMatch = sig.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
                return fileNameMatch || entityIdMatch || uploadedByMatch;
            });
        }
        // فلتر النوع
        if (filterType !== 'all') {
            filtered = filtered.filter(function (sig) { return sig.entityType === filterType; });
        }
        // فلتر الحالة
        if (filterStatus !== 'all') {
            filtered = filtered.filter(function (sig) { return sig.status === filterStatus; });
        }
        setFilteredSignatures(filtered);
    }, [signatures, searchTerm, filterType, filterStatus]);
    var loadSignatures = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, (0, signature_1.getAllSignatures)()];
                case 1:
                    data = _a.sent();
                    setSignatures(data);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    logger_1.logger.error('Error loading signatures:', error_1);
                    toast({
                        'title': 'خطأ في تحميل التوقيعات',
                        'description': 'حدث خطأ أثناء تحميل قائمة التوقيعات',
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var loadStats = function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, signature_1.getSignatureStats)()];
                case 1:
                    data = _a.sent();
                    setStats(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    logger_1.logger.error('Error loading stats:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteSignature = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('هل أنت متأكد من حذف هذا التوقيع؟')) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, signature_1.deleteSignature)(id)];
                case 2:
                    _a.sent();
                    setSignatures(function (prev) { return prev.filter(function (sig) { return sig.id !== id; }); });
                    toast({
                        'title': 'تم الحذف بنجاح',
                        'description': 'تم حذف التوقيع بنجاح'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    logger_1.logger.error('Error deleting signature:', error_3);
                    toast({
                        'title': 'خطأ في الحذف',
                        'description': 'حدث خطأ أثناء حذف التوقيع',
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDownloadSignature = function (signature) {
        var link = window.document.createElement('a');
        link.download = signature.fileName;
        link.href = signature.imageData;
        link.click();
    };
    var handleUploadToCloud = function (signature) { return __awaiter(_this, void 0, void 0, function () {
        var url, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, signature_1.uploadSignatureToCloud)(signature.imageData, signature.fileName)];
                case 1:
                    url = _a.sent();
                    toast({
                        'title': 'تم الرفع بنجاح',
                        'description': "\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0625\u0644\u0649 \u0627\u0644\u0633\u062D\u0627\u0628\u0629: ".concat(url)
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    logger_1.logger.error('Error uploading to cloud:', error_4);
                    toast({
                        'title': 'خطأ في الرفع',
                        'description': 'حدث خطأ أثناء رفع التوقيع إلى السحابة',
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleConvertToPDF = function (signature) { return __awaiter(_this, void 0, void 0, function () {
        var blob, url, link, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, signature_1.convertSignatureToPDF)(signature.id)];
                case 1:
                    blob = _a.sent();
                    url = URL.createObjectURL(blob);
                    link = window.document.createElement('a');
                    link.href = url;
                    link.download = "".concat(signature.fileName.replace('.png', ''), ".pdf");
                    link.click();
                    URL.revokeObjectURL(url);
                    toast({
                        'title': 'تم التحويل بنجاح',
                        'description': 'تم تحويل التوقيع إلى PDF'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    logger_1.logger.error('Error converting to PDF:', error_5);
                    toast({
                        'title': 'خطأ في التحويل',
                        'description': 'حدث خطأ أثناء تحويل التوقيع إلى PDF',
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleVerifySignature = function (signature) { return __awaiter(_this, void 0, void 0, function () {
        var result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, signature_1.verifySignature)(signature.id)];
                case 1:
                    result = _a.sent();
                    toast({
                        'title': result.isValid ? 'التوقيع صحيح' : 'التوقيع غير صحيح',
                        'description': "\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0628\u0648\u0627\u0633\u0637\u0629 ".concat(result.verifiedBy),
                        'variant': result.isValid ? 'default' : 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    logger_1.logger.error('Error verifying signature:', error_6);
                    toast({
                        'title': 'خطأ في التحقق',
                        'description': 'حدث خطأ أثناء التحقق من التوقيع',
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getEntityIcon = function (type) {
        switch (type) {
            case 'employee':
                return lucide_react_1.User;
            case 'company':
                return lucide_react_1.Building;
            case 'license':
                return lucide_react_1.FileCheck;
            case 'leave':
                return lucide_react_1.Calendar;
            case 'document':
                return lucide_react_1.FileText;
            default:
                return lucide_react_1.FileText;
        }
    };
    var getEntityColor = function (type) {
        switch (type) {
            case 'employee':
                return 'bg-blue-100 text-blue-800';
            case 'company':
                return 'bg-green-100 text-green-800';
            case 'license':
                return 'bg-purple-100 text-purple-800';
            case 'leave':
                return 'bg-orange-100 text-orange-800';
            case 'document':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("main", { role: "main", className: "container mx-auto p-6", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center h-64", children: (0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "\u0625\u062F\u0627\u0631\u0629 \u0648\u062A\u0646\u0638\u064A\u0645 \u062C\u0645\u064A\u0639 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setShowSignatureCapture(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4 mr-1" }), "\u0625\u0636\u0627\u0641\u0629 \u062A\u0648\u0642\u064A\u0639 \u062C\u062F\u064A\u062F"] })] }), stats && ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: stats.total })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, { className: "h-8 w-8 text-blue-600" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-green-600", children: stats.active })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-8 w-8 text-green-600" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u063A\u064A\u0631 \u0627\u0644\u0646\u0634\u0637\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-red-600", children: stats.inactive })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-8 w-8 text-red-600" })] }) }) }), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: "\u0627\u0644\u0631\u0641\u0648\u0639\u0627\u062A \u0627\u0644\u062D\u062F\u064A\u062B\u0629" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-orange-600", children: stats.recentUploads })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-8 w-8 text-orange-600" })] }) }) })] })), (0, jsx_runtime_1.jsx)(card_1.Card, { children: (0, jsx_runtime_1.jsx)(card_1.CardContent, { className: "p-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "search", children: "\u0627\u0644\u0628\u062D\u062B" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative mt-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "search", placeholder: "\u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "pl-10" })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "type-filter", children: "\u0646\u0648\u0639 \u0627\u0644\u0643\u064A\u0627\u0646" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: filterType, onValueChange: setFilterType, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "mt-1", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "employee", children: "\u0645\u0648\u0638\u0641" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "company", children: "\u0634\u0631\u0643\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "license", children: "\u062A\u0631\u062E\u064A\u0635" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "leave", children: "\u0625\u062C\u0627\u0632\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "document", children: "\u0645\u0633\u062A\u0646\u062F" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "status-filter", children: "\u0627\u0644\u062D\u0627\u0644\u0629" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: filterStatus, onValueChange: setFilterStatus, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "mt-1", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {}) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "all", children: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0627\u0644\u0627\u062A" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "active", children: "\u0646\u0634\u0637" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "inactive", children: "\u063A\u064A\u0631 \u0646\u0634\u0637" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-end", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: function () {
                                        setSearchTerm('');
                                        setFilterType('all');
                                        setFilterStatus('all');
                                    }, className: "w-full", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { className: "h-4 w-4 mr-1" }), "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646"] }) })] }) }) }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileImage, { className: "h-5 w-5" }), "\u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A (", filteredSignatures.length, ")"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: filteredSignatures.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-8", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileImage, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0648\u0642\u064A\u0639\u0627\u062A" })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredSignatures.map(function (signature) {
                                var _a, _b;
                                var Icon = getEntityIcon((_a = signature.entityType) !== null && _a !== void 0 ? _a : "document");
                                return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-md transition-shadow", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between mb-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-2 rounded-lg ".concat(getEntityColor((_b = signature.entityType) !== null && _b !== void 0 ? _b : "document")), children: (0, jsx_runtime_1.jsx)(Icon, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-sm", children: signature.fileName }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-600", children: new Date(signature.uploadedAt).toLocaleDateString('ar-SA') })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: signature.status === 'active' ? 'default' : 'secondary', className: "text-xs", children: signature.status === 'active' ? 'نشط' : 'غير نشط' }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "text-xs", children: signature.entityType })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mb-3", children: (0, jsx_runtime_1.jsx)("img", { src: signature.imageData, alt: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639", className: "w-full h-24 object-contain border rounded bg-white", loading: "lazy", decoding: "async", width: "384", height: "96" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleDownloadSignature(signature); }, size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-3 w-3 mr-1" }), "\u062A\u062D\u0645\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleUploadToCloud(signature); }, size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-3 w-3 mr-1" }), "\u0631\u0641\u0639"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleConvertToPDF(signature); }, size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileDown, { className: "h-3 w-3 mr-1" }), "PDF"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleVerifySignature(signature); }, size: "sm", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Shield, { className: "h-3 w-3 mr-1" }), "\u062A\u062D\u0642\u0642"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return setSelectedSignature(signature); }, size: "sm", variant: "outline", className: "col-span-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-3 w-3 mr-1" }), "\u062A\u0639\u062F\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleDeleteSignature(signature.id); }, size: "sm", variant: "destructive", className: "col-span-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-3 w-3 mr-1" }), "\u062D\u0630\u0641"] })] })] }) }, signature.id));
                            }) })) })] }), showSignatureCapture && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4", children: (0, jsx_runtime_1.jsx)(signature_capture_1.default, { onSave: function (_signatureData) {
                            // هنا يمكن إضافة منطق حفظ التوقيع
                            setShowSignatureCapture(false);
                            loadSignatures(); // إعادة تحميل القائمة
                        }, onCancel: function () { return setShowSignatureCapture(false); }, title: "\u0625\u0636\u0627\u0641\u0629 \u062A\u0648\u0642\u064A\u0639 \u062C\u062F\u064A\u062F", description: "\u0642\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0641\u064A \u0627\u0644\u0645\u0633\u0627\u062D\u0629 \u0623\u062F\u0646\u0627\u0647" }) }) })), selectedSignature && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4", children: (0, jsx_runtime_1.jsx)(signature_capture_1.default, { mode: "edit", existingSignature: selectedSignature, onSave: function (_signatureData) {
                            setSelectedSignature(null);
                            loadSignatures(); // إعادة تحميل القائمة
                        }, onCancel: function () { return setSelectedSignature(null); }, title: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0648\u0642\u064A\u0639", description: "\u0642\u0645 \u0628\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" }) }) }))] }));
}
