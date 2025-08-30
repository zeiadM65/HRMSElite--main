"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var badge_1 = require("../ui/badge");
var avatar_1 = require("../ui/avatar");
var lucide_react_1 = require("lucide-react");
var react_i18next_1 = require("react-i18next");
// File type icon component with memo
var FileTypeIcon = (0, react_1.memo)(function (_a) {
    var type = _a.type, fileName = _a.fileName;
    var getFileIcon = function (type, fileName) {
        var _a;
        var extension = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        // Check by MIME type first
        if (type.startsWith('image/')) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.FileImage, { className: "h-4 w-4 text-blue-600" });
        }
        if (type.startsWith('video/')) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.FileVideo, { className: "h-4 w-4 text-purple-600" });
        }
        if (type.startsWith('audio/')) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.FileAudio, { className: "h-4 w-4 text-green-600" });
        }
        if (type.includes('pdf')) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 text-red-600" });
        }
        if (type.includes('zip') || type.includes('rar') || type.includes('7z')) {
            return (0, jsx_runtime_1.jsx)(lucide_react_1.Archive, { className: "h-4 w-4 text-orange-600" });
        }
        // Check by file extension
        switch (extension) {
            case 'pdf':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 text-red-600" });
            case 'doc':
            case 'docx':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 text-blue-600" });
            case 'xls':
            case 'xlsx':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 text-green-600" });
            case 'ppt':
            case 'pptx':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 text-orange-600" });
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.FileImage, { className: "h-4 w-4 text-blue-600" });
            case 'mp4':
            case 'avi':
            case 'mov':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.FileVideo, { className: "h-4 w-4 text-purple-600" });
            case 'mp3':
            case 'wav':
            case 'flac':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.FileAudio, { className: "h-4 w-4 text-green-600" });
            case 'zip':
            case 'rar':
            case '7z':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Archive, { className: "h-4 w-4 text-orange-600" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.File, { className: "h-4 w-4 text-gray-600" });
        }
    };
    return getFileIcon(type, fileName);
});
FileTypeIcon.displayName = 'FileTypeIcon';
// Document type badge component with memo
var DocumentTypeBadge = (0, react_1.memo)(function (_a) {
    var type = _a.type;
    var getTypeVariant = function (type) {
        switch (type) {
            case 'contract':
                return 'default';
            case 'license':
                return 'secondary';
            case 'id':
                return 'outline';
            case 'certificate':
                return 'destructive';
            default:
                return 'secondary';
        }
    };
    var t = (0, react_i18next_1.useTranslation)().t;
    var getTypeText = function (type) {
        switch (type) {
            case 'contract':
                return t('documents.card.contract');
            case 'license':
                return t('documents.card.license');
            case 'id':
                return t('documents.card.id');
            case 'certificate':
                return t('documents.card.certificate');
            default:
                return t('documents.card.document');
        }
    };
    return ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: getTypeVariant(type), className: "text-xs", children: getTypeText(type) }));
});
DocumentTypeBadge.displayName = 'DocumentTypeBadge';
// Document info component with memo
var DocumentInfo = (0, react_1.memo)(function (_a) {
    var _b, _c;
    var document = _a.document;
    var _d = (0, react_i18next_1.useTranslation)(), t = _d.t, i18n = _d.i18n;
    var uploadedAtString = (_c = (_b = document.uploadDate) !== null && _b !== void 0 ? _b : document.uploadedAt) !== null && _c !== void 0 ? _c : document.modifiedDate;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: document.entityType === 'employee'
                            ? t('documents.card.employee')
                            : document.entityType === 'company'
                                ? t('documents.card.company')
                                : document.entityType === 'license'
                                    ? t('documents.card.license')
                                    : t('documents.card.unknown') })] }), uploadedAtString && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted-foreground", children: [t('documents.card.uploadedAt'), " ", new Date(uploadedAtString).toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US')] })] })), document.fileSize && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.File, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: formatFileSize(document.fileSize, t) })] }))] }));
});
DocumentInfo.displayName = 'DocumentInfo';
// Action buttons component with memo
var ActionButtons = (0, react_1.memo)(function (_a) {
    var document = _a.document, onView = _a.onView, onEdit = _a.onEdit, onDownload = _a.onDownload, onDelete = _a.onDelete;
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return onView(document); }, className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), t('documents.card.view')] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return onDownload(document); }, className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "h-4 w-4 ml-1" }), t('documents.card.download')] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return onEdit(document); }, className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4 ml-1" }), t('documents.card.edit')] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "text-red-600 hover:text-red-700 flex-1", onClick: function () { var _a; return onDelete((_a = document.id) !== null && _a !== void 0 ? _a : ''); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4 ml-1" }), t('documents.card.delete')] })] }));
});
ActionButtons.displayName = 'ActionButtons';
// Helper function to format file size
var formatFileSize = function (bytes, t) {
    if (bytes === 0) {
        return "0 ".concat(t('documents.card.size.bytes'));
    }
    var k = 1024;
    var sizes = [
        t('documents.card.size.bytes'),
        t('documents.card.size.kb'),
        t('documents.card.size.mb'),
        t('documents.card.size.gb')
    ];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return "".concat(parseFloat((bytes / Math.pow(k, i)).toFixed(2)), " ").concat(sizes[i]);
};
// Main optimized document card component
var OptimizedDocumentCard = (0, react_1.memo)(function (_a) {
    var document = _a.document, onView = _a.onView, onEdit = _a.onEdit, onDownload = _a.onDownload, onDelete = _a.onDelete, _b = _a.isSelected, isSelected = _b === void 0 ? false : _b, onSelect = _a.onSelect;
    var _c = (0, react_1.useState)(false), isHovered = _c[0], setIsHovered = _c[1];
    var t = (0, react_i18next_1.useTranslation)().t;
    // Memoized callbacks to prevent unnecessary re-renders
    var handleView = (0, react_1.useCallback)(function () {
        onView(document);
    }, [document, onView]);
    var handleEdit = (0, react_1.useCallback)(function () {
        onEdit(document);
    }, [document, onEdit]);
    var handleDownload = (0, react_1.useCallback)(function () {
        onDownload(document);
    }, [document, onDownload]);
    var handleDelete = (0, react_1.useCallback)(function () {
        var _a;
        onDelete((_a = document.id) !== null && _a !== void 0 ? _a : '');
    }, [document.id, onDelete]);
    var handleSelect = (0, react_1.useCallback)(function () {
        var _a;
        if (onSelect) {
            onSelect((_a = document.id) !== null && _a !== void 0 ? _a : '', !isSelected);
        }
    }, [document.id, isSelected, onSelect]);
    var getFileName = function () {
        var _a;
        if (document.fileName) {
            return document.fileName;
        }
        if (document.fileUrl) {
            return (_a = document.fileUrl.split('/').pop()) !== null && _a !== void 0 ? _a : t('documents.card.document');
        }
        return t('documents.card.document');
    };
    var getFileType = function () {
        var _a;
        if (document.mimeType) {
            return document.mimeType;
        }
        var fileName = getFileName();
        var extension = (_a = fileName.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        if (extension) {
            switch (extension) {
                case 'pdf':
                    return 'application/pdf';
                case 'doc':
                case 'docx':
                    return 'application/msword';
                case 'xls':
                case 'xlsx':
                    return 'application/vnd.ms-excel';
                case 'jpg':
                case 'jpeg':
                    return 'image/jpeg';
                case 'png':
                    return 'image/png';
                default:
                    return 'application/octet-stream';
            }
        }
        return 'application/octet-stream';
    };
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "transition-all duration-200 hover:shadow-lg ".concat(isSelected ? 'ring-2 ring-primary' : '', " ").concat(isHovered ? 'scale-[1.02]' : ''), onMouseEnter: function () { return setIsHovered(true); }, onMouseLeave: function () { return setIsHovered(false); }, children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { className: "h-10 w-10", children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { className: "bg-primary/10 text-primary", children: (0, jsx_runtime_1.jsx)(FileTypeIcon, { type: getFileType(), fileName: getFileName() }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-semibold line-clamp-1", children: document.name || getFileName() }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: document.category || getFileName() })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-2", children: [(0, jsx_runtime_1.jsx)(DocumentTypeBadge, { type: document.type }), onSelect && ((0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: isSelected, onChange: handleSelect, className: "h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" }))] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(DocumentInfo, { document: document }), document.description && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground line-clamp-2", children: document.description })), document.tags && document.tags.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: document.tags.map(function (tag, index) { return ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "text-xs", children: tag }, index)); }) })), (0, jsx_runtime_1.jsx)(ActionButtons, { document: document, onView: handleView, onEdit: handleEdit, onDownload: handleDownload, onDelete: handleDelete })] })] }));
});
OptimizedDocumentCard.displayName = 'OptimizedDocumentCard';
exports.default = OptimizedDocumentCard;
