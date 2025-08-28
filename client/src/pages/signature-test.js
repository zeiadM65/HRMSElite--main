"use strict";
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
exports.default = SignatureTestPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../components/ui/card");
var button_1 = require("../components/ui/button");
var badge_1 = require("../components/ui/badge");
var signature_capture_1 = __importDefault(require("../components/signature-capture"));
var lucide_react_1 = require("lucide-react");
function SignatureTestPage() {
    var _a = (0, react_1.useState)([]), signatures = _a[0], setSignatures = _a[1];
    var _b = (0, react_1.useState)(false), showSignatureCapture = _b[0], setShowSignatureCapture = _b[1];
    var _c = (0, react_1.useState)(null), currentEntity = _c[0], setCurrentEntity = _c[1];
    var handleSignatureSave = function (signatureData) {
        setSignatures(function (prev) { return __spreadArray(__spreadArray([], prev, true), [signatureData], false); });
        setShowSignatureCapture(false);
        setCurrentEntity(null);
    };
    var handleStartSignature = function (entity) {
        setCurrentEntity(entity);
        setShowSignatureCapture(true);
    };
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
    var downloadSignature = function (signature) {
        var _a;
        if (typeof window === 'undefined' || !window.document) {
            return;
        }
        var link = window.document.createElement('a');
        link.download = (_a = signature.fileName) !== null && _a !== void 0 ? _a : "signature_".concat(Date.now(), ".png");
        link.href = signature.imageData;
        window.document.body.appendChild(link);
        link.click();
        window.document.body.removeChild(link);
    };
    var entities = [
        {
            'id': 'emp-001', 'type': 'employee', 'title': 'أحمد محمد علي', 'description': 'موظف - قسم الموارد البشرية'
        },
        {
            'id': 'comp-001', 'type': 'company', 'title': 'شركة النيل الأزرق', 'description': 'شركة تجارية'
        },
        {
            'id': 'lic-001', 'type': 'license', 'title': 'ترخيص تجاري', 'description': 'ترخيص النشاط التجاري'
        },
        {
            'id': 'leave-001', 'type': 'leave', 'title': 'طلب إجازة سنوية', 'description': 'إجازة لمدة 5 أيام'
        },
        {
            'id': 'doc-001', 'type': 'document', 'title': 'عقد العمل', 'description': 'عقد عمل جديد'
        }
    ];
    return ((0, jsx_runtime_1.jsxs)("main", { role: "main", className: "container mx-auto p-6 space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "\u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u0643\u0648\u0646 \u0627\u0644\u062A\u0642\u0627\u0637 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" }), (0, jsx_runtime_1.jsx)("p", { className: "text-gray-600", children: "\u0627\u062E\u062A\u0628\u0627\u0631 \u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u062A\u0642\u0627\u0637 \u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0644\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0648\u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A" })] }), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-5 w-5" }), "\u0627\u0644\u0643\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u062A\u0648\u0642\u064A\u0639"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: entities.map(function (entity) {
                                var Icon = getEntityIcon(entity.type);
                                return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-md transition-shadow", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between mb-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-2 rounded-lg ".concat(getEntityColor(entity.type)), children: (0, jsx_runtime_1.jsx)(Icon, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-sm", children: entity.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-600", children: entity.description })] })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "text-xs", children: entity.type })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return handleStartSignature(entity); }, size: "sm", className: "w-full", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 mr-1" }), "\u0625\u0636\u0627\u0641\u0629 \u062A\u0648\u0642\u064A\u0639"] })] }) }, entity.id));
                            }) }) })] }), signatures.length > 0 && ((0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-5 w-5" }), "\u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629 (", signatures.length, ")"] }) }), (0, jsx_runtime_1.jsx)(card_1.CardContent, { children: (0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: signatures.map(function (signature, index) {
                                var _a, _b;
                                var Icon = getEntityIcon((_a = signature.entityType) !== null && _a !== void 0 ? _a : "document");
                                return ((0, jsx_runtime_1.jsx)(card_1.Card, { className: "hover:shadow-md transition-shadow", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "p-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between mb-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-2 rounded-lg ".concat(getEntityColor((_b = signature.entityType) !== null && _b !== void 0 ? _b : "document")), children: (0, jsx_runtime_1.jsx)(Icon, { className: "h-4 w-4" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-sm", children: signature.fileName }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-gray-600", children: signature.uploadedAt ? new Date(signature.uploadedAt).toLocaleDateString('ar-SA') : 'غير محدد' })] })] }), (0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "text-xs", children: signature.entityType })] }), (0, jsx_runtime_1.jsx)("div", { className: "mb-3", children: (0, jsx_runtime_1.jsx)("img", { src: signature.imageData, alt: "\u0627\u0644\u062A\u0648\u0642\u064A\u0639", className: "w-full h-20 object-contain border rounded bg-white", loading: "lazy", decoding: "async", width: "320", height: "80" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: function () { return downloadSignature(signature); }, size: "sm", variant: "outline", className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-3 w-3 mr-1" }), "\u062A\u062D\u0645\u064A\u0644"] }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: function () {
                                                            var _a, _b, _c;
                                                            setCurrentEntity({
                                                                'id': (_a = signature.entityId) !== null && _a !== void 0 ? _a : '',
                                                                'type': (_b = signature.entityType) !== null && _b !== void 0 ? _b : "document",
                                                                'title': (_c = signature.fileName) !== null && _c !== void 0 ? _c : "التوقيع"
                                                            });
                                                            setShowSignatureCapture(true);
                                                        }, size: "sm", variant: "outline", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-3 w-3" }) })] })] }) }, index));
                            }) }) })] })), showSignatureCapture && currentEntity && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4", children: (0, jsx_runtime_1.jsx)(signature_capture_1.default, { entityId: currentEntity.id, entityType: currentEntity.type, onSave: handleSignatureSave, onCancel: function () {
                            setShowSignatureCapture(false);
                            setCurrentEntity(null);
                        }, title: "\u062A\u0648\u0642\u064A\u0639 ".concat(currentEntity.title), description: "\u0642\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0639\u0644\u0649 ".concat(currentEntity.title) }) }) })), (0, jsx_runtime_1.jsxs)(card_1.Card, { children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u062A\u0642\u0646\u064A\u0629" }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-2 text-sm text-gray-600", children: [(0, jsx_runtime_1.jsx)("p", { children: "\u2022 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0643\u0640 base64 \u0641\u064A \u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 \u064A\u0645\u0643\u0646 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0648\u0642\u064A\u0639\u0627\u062A \u0643\u0645\u0644\u0641\u0627\u062A PNG" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 \u064A\u062F\u0639\u0645 \u0627\u0644\u0631\u0633\u0645 \u0628\u0627\u0644\u0645\u0627\u0648\u0633 \u0648\u0627\u0644\u0644\u0645\u0633" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 \u064A\u0645\u0643\u0646 \u062A\u063A\u064A\u064A\u0631 \u0644\u0648\u0646 \u0648\u0633\u0645\u0643 \u0627\u0644\u0642\u0644\u0645" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 \u064A\u062F\u0639\u0645 \u0631\u0641\u0639 \u0645\u0644\u0641\u0627\u062A \u0627\u0644\u0635\u0648\u0631 \u0643\u062A\u0648\u0642\u064A\u0639\u0627\u062A" })] })] })] }));
}
