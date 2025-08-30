"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var badge_1 = require("../ui/badge");
var avatar_1 = require("../ui/avatar");
var lucide_react_1 = require("lucide-react");
// Status icon component with memo
var StatusIcon = (0, react_1.memo)(function (_a) {
    var status = _a.status;
    var getStatusIcon = function (status) {
        switch (status) {
            case 'active':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4 text-green-600" });
            case 'expired':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-4 w-4 text-red-600" });
            case 'pending':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4 text-yellow-600" });
            case 'suspended':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4 text-orange-600" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4 text-gray-600" });
        }
    };
    return getStatusIcon(status);
});
StatusIcon.displayName = 'StatusIcon';
// Status badge component with memo
var StatusBadge = (0, react_1.memo)(function (_a) {
    var status = _a.status;
    var getStatusVariant = function (status) {
        switch (status) {
            case 'active':
                return 'default';
            case 'expired':
                return 'destructive';
            case 'pending':
                return 'secondary';
            case 'suspended':
                return 'outline';
            default:
                return 'secondary';
        }
    };
    var getStatusText = function (status) {
        switch (status) {
            case 'active':
                return 'نشط';
            case 'expired':
                return 'منتهي الصلاحية';
            case 'pending':
                return 'قيد الانتظار';
            case 'suspended':
                return 'معلق';
            default:
                return 'غير محدد';
        }
    };
    return ((0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: getStatusVariant(status), className: "text-xs", children: [(0, jsx_runtime_1.jsx)(StatusIcon, { status: status }), (0, jsx_runtime_1.jsx)("span", { className: "mr-1", children: getStatusText(status) })] }));
});
StatusBadge.displayName = 'StatusBadge';
// License info component with memo
var LicenseInfo = (0, react_1.memo)(function (_a) {
    var _b;
    var license = _a.license;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Building, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: ((_b = license.company) === null || _b === void 0 ? void 0 : _b.name) || 'غير محدد' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-foreground", children: license.location || 'غير محدد' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted-foreground", children: ["\u064A\u0646\u062A\u0647\u064A \u0641\u064A: ", new Date(license.expiryDate).toLocaleDateString('ar-SA')] })] })] }));
});
LicenseInfo.displayName = 'LicenseInfo';
// Action buttons component with memo
var ActionButtons = (0, react_1.memo)(function (_a) {
    var license = _a.license, onView = _a.onView, onEdit = _a.onEdit, onAddDocument = _a.onAddDocument, onDelete = _a.onDelete;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 pt-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return onView(license); }, className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { className: "h-4 w-4 ml-1" }), "\u0639\u0631\u0636"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return onEdit(license); }, className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4 ml-1" }), "\u062A\u0639\u062F\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", onClick: function () { return onAddDocument(license); }, className: "flex-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4 ml-1" }), "\u0645\u0633\u062A\u0646\u062F\u0627\u062A"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", variant: "outline", className: "text-red-600 hover:text-red-700 flex-1", onClick: function () { return onDelete(license.id); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "h-4 w-4 ml-1" }), "\u062D\u0630\u0641"] })] }));
});
ActionButtons.displayName = 'ActionButtons';
// Main optimized license card component
var OptimizedLicenseCard = (0, react_1.memo)(function (_a) {
    var license = _a.license, onView = _a.onView, onEdit = _a.onEdit, onAddDocument = _a.onAddDocument, onDelete = _a.onDelete, _b = _a.isSelected, isSelected = _b === void 0 ? false : _b, onSelect = _a.onSelect;
    var _c = (0, react_1.useState)(false), isHovered = _c[0], setIsHovered = _c[1];
    // Memoized callbacks to prevent unnecessary re-renders
    var handleView = (0, react_1.useCallback)(function () {
        onView(license);
    }, [license, onView]);
    var handleEdit = (0, react_1.useCallback)(function () {
        onEdit(license);
    }, [license, onEdit]);
    var handleAddDocument = (0, react_1.useCallback)(function () {
        onAddDocument(license);
    }, [license, onAddDocument]);
    var handleDelete = (0, react_1.useCallback)(function () {
        onDelete(license.id);
    }, [license.id, onDelete]);
    var handleSelect = (0, react_1.useCallback)(function () {
        if (onSelect) {
            onSelect(license.id, !isSelected);
        }
    }, [license.id, isSelected, onSelect]);
    var isExpiringSoon = function () {
        var expiryDate = new Date(license.expiryDate);
        var now = new Date();
        var daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    };
    var isExpired = function () {
        var expiryDate = new Date(license.expiryDate);
        var now = new Date();
        return expiryDate < now;
    };
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "transition-all duration-200 hover:shadow-lg ".concat(isSelected ? 'ring-2 ring-primary' : '', " ").concat(isHovered ? 'scale-[1.02]' : ''), onMouseEnter: function () { return setIsHovered(true); }, onMouseLeave: function () { return setIsHovered(false); }, children: [(0, jsx_runtime_1.jsx)(card_1.CardHeader, { className: "pb-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { className: "h-10 w-10", children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { className: "bg-primary/10 text-primary", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Award, { className: "h-5 w-5" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg font-semibold line-clamp-1", children: license.name }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: license.number })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-2", children: [(0, jsx_runtime_1.jsx)(StatusBadge, { status: license.status }), onSelect && ((0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: isSelected, onChange: handleSelect, className: "h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" }))] })] }) }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)(LicenseInfo, { license: license }), license.description && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground line-clamp-2", children: license.description })), isExpiringSoon() && !isExpired() && ((0, jsx_runtime_1.jsx)("div", { className: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4 text-yellow-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-yellow-800 dark:text-yellow-200", children: "\u064A\u0646\u062A\u0647\u064A \u0647\u0630\u0627 \u0627\u0644\u062A\u0631\u062E\u064A\u0635 \u0642\u0631\u064A\u0628\u0627\u064B" })] }) })), isExpired() && ((0, jsx_runtime_1.jsx)("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-4 w-4 text-red-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-red-800 dark:text-red-200", children: "\u0647\u0630\u0627 \u0627\u0644\u062A\u0631\u062E\u064A\u0635 \u0645\u0646\u062A\u0647\u064A \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629" })] }) })), (0, jsx_runtime_1.jsx)(ActionButtons, { license: license, onView: handleView, onEdit: handleEdit, onAddDocument: handleAddDocument, onDelete: handleDelete })] })] }));
});
OptimizedLicenseCard.displayName = 'OptimizedLicenseCard';
exports.default = OptimizedLicenseCard;
