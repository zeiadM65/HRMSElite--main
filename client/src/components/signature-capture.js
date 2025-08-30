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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignatureCapture;
var jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-env browser */
/* global HTMLCanvasElement, CanvasLineCap, CanvasLineJoin, FileReader, Image */
var react_1 = require("react");
var card_1 = require("./ui/card");
var button_1 = require("./ui/button");
var label_1 = require("./ui/label");
var alert_1 = require("./ui/alert");
var use_toast_1 = require("../hooks/use-toast");
var logger_1 = __importDefault(require("../lib/logger"));
var lucide_react_1 = require("lucide-react");
function SignatureCapture(_a) {
    var _this = this;
    var _b;
    var entityId = _a.entityId, entityType = _a.entityType, onSave = _a.onSave, onCancel = _a.onCancel, _c = _a.mode, mode = _c === void 0 ? 'create' : _c, existingSignature = _a.existingSignature, _d = _a.title, title = _d === void 0 ? 'التوقيع' : _d, _e = _a.description, description = _e === void 0 ? 'قم بالتوقيع في المساحة أدناه' : _e, _f = _a.required, required = _f === void 0 ? false : _f;
    var canvasRef = (0, react_1.useRef)(null);
    var toast = (0, use_toast_1.useToast)().toast;
    var _g = (0, react_1.useState)(false), isDrawing = _g[0], setIsDrawing = _g[1];
    var _h = (0, react_1.useState)(false), hasSignature = _h[0], setHasSignature = _h[1];
    var _j = (0, react_1.useState)(false), isLoading = _j[0], setIsLoading = _j[1];
    // إعدادات الرسم
    var _k = (0, react_1.useState)({
        'strokeStyle': '#000000',
        'lineWidth': 2,
        'lineCap': 'round',
        'lineJoin': 'round'
    }), drawingSettings = _k[0], setDrawingSettings = _k[1];
    // تهيئة Canvas
    (0, react_1.useEffect)(function () {
        var canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        // تعيين حجم Canvas
        canvas.width = 500;
        canvas.height = 200;
        // تعيين خلفية بيضاء
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // تعيين إعدادات الرسم
        ctx.strokeStyle = drawingSettings.strokeStyle;
        ctx.lineWidth = drawingSettings.lineWidth;
        ctx.lineCap = drawingSettings.lineCap;
        ctx.lineJoin = drawingSettings.lineJoin;
        // تحميل التوقيع الموجود إذا كان في وضع التحرير
        if (mode === 'edit' && (existingSignature === null || existingSignature === void 0 ? void 0 : existingSignature.imageData)) {
            loadExistingSignature(existingSignature.imageData);
        }
    }, [mode, existingSignature, drawingSettings]);
    // تحميل التوقيع الموجود
    var loadExistingSignature = (0, react_1.useCallback)(function (imageData) {
        var canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        var img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            setHasSignature(true);
        };
        img.src = imageData;
    }, []);
    // بدء الرسم
    var startDrawing = (0, react_1.useCallback)(function (e) {
        var canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        setIsDrawing(true);
        setHasSignature(true);
        var rect = canvas.getBoundingClientRect();
        var clientX, clientY;
        if ('touches' in e && e.touches.length > 0 && e.touches[0]) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        else if ('clientX' in e) {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        else {
            return;
        }
        var x = (clientX - rect.left) * (canvas.width / rect.width);
        var y = (clientY - rect.top) * (canvas.height / rect.height);
        ctx.beginPath();
        ctx.moveTo(x, y);
    }, []);
    // الرسم
    var draw = (0, react_1.useCallback)(function (e) {
        if (!isDrawing) {
            return;
        }
        var canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        var rect = canvas.getBoundingClientRect();
        var clientX, clientY;
        if ('touches' in e && e.touches.length > 0 && e.touches[0]) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        else if ('clientX' in e) {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        else {
            return;
        }
        var x = (clientX - rect.left) * (canvas.width / rect.width);
        var y = (clientY - rect.top) * (canvas.height / rect.height);
        ctx.lineTo(x, y);
        ctx.stroke();
    }, [isDrawing]);
    // إيقاف الرسم
    var stopDrawing = (0, react_1.useCallback)(function () {
        setIsDrawing(false);
    }, []);
    // مسح التوقيع
    var clearSignature = (0, react_1.useCallback)(function () {
        var canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        var ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
    }, []);
    // حفظ التوقيع كـ base64
    var saveSignature = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var canvas, imageData, fileName, base64Length, fileSize, signatureData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = canvasRef.current;
                    if (!canvas) {
                        return [2 /*return*/];
                    }
                    if (!hasSignature && required) {
                        toast({
                            'title': 'خطأ',
                            'description': 'يرجى التوقيع قبل الحفظ',
                            'variant': 'destructive'
                        });
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    imageData = canvas.toDataURL('image/png');
                    fileName = "signature_".concat(entityId !== null && entityId !== void 0 ? entityId : "unknown", "_").concat(Date.now(), ".png");
                    base64Length = imageData.length;
                    fileSize = Math.ceil((base64Length * 3) / 4);
                    signatureData = {
                        imageData: imageData,
                        fileName: fileName,
                        'mimeType': 'image/png',
                        fileSize: fileSize,
                        'uploadedAt': new Date().toISOString(),
                        'uploadedBy': 'current-user', // يمكن تحديثه لاحقاً
                        entityId: entityId,
                        entityType: entityType,
                        'status': 'active'
                    };
                    if (!onSave) return [3 /*break*/, 3];
                    return [4 /*yield*/, onSave(signatureData)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    toast({
                        'title': 'تم الحفظ بنجاح',
                        'description': 'تم حفظ التوقيع بنجاح'
                    });
                    if (onCancel) {
                        onCancel();
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    logger_1.default.error('Error saving signature:', error_1);
                    toast({
                        'title': 'خطأ في الحفظ',
                        'description': 'حدث خطأ أثناء حفظ التوقيع',
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [hasSignature, required, entityId, entityType, onSave, onCancel, toast]);
    // تحميل التوقيع من ملف
    var handleFileUpload = (0, react_1.useCallback)(function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        if (!file.type.startsWith('image/')) {
            toast({
                'title': 'خطأ في نوع الملف',
                'description': 'يرجى اختيار ملف صورة صالح',
                'variant': 'destructive'
            });
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var result = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            if (result) {
                loadExistingSignature(result);
            }
        };
        reader.readAsDataURL(file);
    }, [loadExistingSignature, toast]);
    // تحميل التوقيع كملف
    var downloadSignature = (0, react_1.useCallback)(function () {
        var canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        var link = document.createElement('a');
        link.download = "signature_".concat(entityId !== null && entityId !== void 0 ? entityId : "unknown", "_").concat(Date.now(), ".png");
        link.href = canvas.toDataURL('image/png');
        link.click();
    }, [entityId]);
    // تغيير لون القلم
    var changePenColor = (0, react_1.useCallback)(function (color) {
        setDrawingSettings(function (prev) { return (__assign(__assign({}, prev), { 'strokeStyle': color })); });
    }, []);
    // تغيير سمك القلم
    var changePenWidth = (0, react_1.useCallback)(function (width) {
        setDrawingSettings(function (prev) { return (__assign(__assign({}, prev), { 'lineWidth': width })); });
    }, []);
    if (mode === 'view' && existingSignature) {
        return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-5 w-5" }), title] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsx)("div", { className: "border rounded-lg p-4 bg-white", children: (0, jsx_runtime_1.jsx)("img", { src: existingSignature.imageData, alt: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639", className: "w-full h-auto max-h-48 object-contain", loading: "lazy", decoding: "async", width: "640", height: "192" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 text-sm text-gray-600", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\u062A\u0645 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0641\u064A: ", new Date((_b = existingSignature.uploadedAt) !== null && _b !== void 0 ? _b : '').toLocaleDateString('ar-SA')] }), existingSignature.fileName && (0, jsx_runtime_1.jsxs)("p", { children: ["\u0627\u0633\u0645 \u0627\u0644\u0645\u0644\u0641: ", existingSignature.fileName] })] })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-md", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PenTool, { className: "h-5 w-5" }), title] }), description && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600", children: description }))] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 flex-wrap", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium", children: "\u0644\u0648\u0646 \u0627\u0644\u0642\u0644\u0645:" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: ['#000000', '#0000FF', '#FF0000', '#008000'].map(function (color) { return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "w-6 h-6 rounded-full border-2 ".concat(drawingSettings.strokeStyle === color ? 'border-gray-800' : 'border-gray-300'), style: { 'backgroundColor': color }, onClick: function () { return changePenColor(color); } }, color)); }) }), (0, jsx_runtime_1.jsx)(label_1.Label, { className: "text-sm font-medium mr-2", children: "\u0633\u0645\u0643 \u0627\u0644\u0642\u0644\u0645:" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: [1, 2, 4, 6].map(function (width) { return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "px-2 py-1 text-xs rounded ".concat(drawingSettings.lineWidth === width
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-700'), onClick: function () { return changePenWidth(width); }, children: [width, "px"] }, width)); }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "border rounded-lg overflow-hidden", children: (0, jsx_runtime_1.jsx)("canvas", { ref: canvasRef, className: "w-full h-48 cursor-crosshair touch-none", onMouseDown: startDrawing, onMouseMove: draw, onMouseUp: stopDrawing, onMouseLeave: stopDrawing, onTouchStart: startDrawing, onTouchMove: draw, onTouchEnd: stopDrawing, style: {
                                'border': '1px solid #e5e7eb',
                                'backgroundColor': '#ffffff'
                            } }) }), required && !hasSignature && ((0, jsx_runtime_1.jsx)(alert_1.Alert, { variant: "destructive", children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0645\u0637\u0644\u0648\u0628 \u0644\u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0646\u062F" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: clearSignature, disabled: !hasSignature, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcw, { className: "h-4 w-4 mr-1" }), "\u0645\u0633\u062D"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: function () { var _a; return (_a = document.getElementById('file-upload')) === null || _a === void 0 ? void 0 : _a.click(); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Upload, { className: "h-4 w-4 mr-1" }), "\u0631\u0641\u0639 \u0645\u0644\u0641"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: downloadSignature, disabled: !hasSignature, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4 mr-1" }), "\u062A\u062D\u0645\u064A\u0644"] }), onCancel && ((0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: onCancel, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4 mr-1" }), "\u0625\u0644\u063A\u0627\u0621"] })), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", size: "sm", onClick: saveSignature, disabled: isLoading || (required && !hasSignature), className: "mr-auto", children: [isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Save, { className: "h-4 w-4 mr-1" })), "\u062D\u0641\u0638 \u0627\u0644\u062A\u0648\u0642\u064A\u0639"] })] }), (0, jsx_runtime_1.jsx)("input", { id: "file-upload", type: "file", accept: "image/*", onChange: handleFileUpload, className: "hidden" })] })] }));
}
