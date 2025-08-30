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
exports.NotificationCenter = NotificationCenter;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("./ui/button");
var badge_1 = require("./ui/badge");
var scroll_area_1 = require("./ui/scroll-area");
var separator_1 = require("./ui/separator");
var lucide_react_1 = require("lucide-react");
var dropdown_menu_1 = require("./ui/dropdown-menu");
var popover_1 = require("./ui/popover");
var notifications_1 = require("../services/notifications");
var use_toast_1 = require("../hooks/use-toast");
var logger_1 = __importDefault(require("../lib/logger"));
var react_i18next_1 = require("react-i18next");
function NotificationCenter(_a) {
    var _this = this;
    var userId = _a.userId, _className = _a.className;
    var _b = (0, react_1.useState)([]), notifications = _b[0], setNotifications = _b[1];
    var _c = (0, react_1.useState)(0), unreadCount = _c[0], setUnreadCount = _c[1];
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = (0, react_1.useState)(false), isLoading = _e[0], setIsLoading = _e[1];
    var toast = (0, use_toast_1.useToast)().toast;
    var t = (0, react_i18next_1.useTranslation)().t;
    // Load notifications
    var loadNotifications = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, notificationsData, unreadCountData, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    setIsLoading(true);
                    return [4 /*yield*/, Promise.all([
                            notifications_1.notificationService.getNotifications({ 'limit': 50 }),
                            notifications_1.notificationService.getUnreadCount()
                        ])];
                case 1:
                    _a = _b.sent(), notificationsData = _a[0], unreadCountData = _a[1];
                    setNotifications(notificationsData);
                    setUnreadCount(unreadCountData);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _b.sent();
                    logger_1.default.error('Error loading notifications:', error_1);
                    toast({
                        'title': t('dashboard.notifications.error'),
                        'description': t('dashboard.notifications.loadError'),
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Reload notifications when the popover is opened
    (0, react_1.useEffect)(function () {
        if (isOpen) {
            loadNotifications();
        }
    }, [isOpen, userId]);
    // Load notifications on mount
    (0, react_1.useEffect)(function () {
        loadNotifications();
    }, [userId]);
    // Mark single notification as read
    var handleMarkAsRead = function (notificationId) { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, notifications_1.notificationService.markAsRead(notificationId)];
                case 1:
                    _a.sent();
                    setNotifications(function (prev) {
                        return prev.map(function (notification) {
                            return notification.id === notificationId
                                ? __assign(__assign({}, notification), { 'isRead': true }) : notification;
                        });
                    });
                    setUnreadCount(function (prev) { return Math.max(0, prev - 1); });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    logger_1.default.error('Error updating notification:', error_2);
                    toast({
                        'title': t('dashboard.notifications.error'),
                        'description': t('dashboard.notifications.updateError'),
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Mark all notifications as read
    var handleMarkAllAsRead = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, notifications_1.notificationService.markAllAsRead()];
                case 1:
                    _a.sent();
                    setNotifications(function (prev) {
                        return prev.map(function (notification) { return (__assign(__assign({}, notification), { 'isRead': true })); });
                    });
                    setUnreadCount(0);
                    toast({
                        'title': t('dashboard.notifications.success'),
                        'description': t('dashboard.notifications.updateAllSuccess')
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    logger_1.default.error('Error updating all notifications:', error_3);
                    toast({
                        'title': t('dashboard.notifications.error'),
                        'description': t('dashboard.notifications.updateAllError'),
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Delete notification
    var handleDeleteNotification = function (notificationId) { return __awaiter(_this, void 0, void 0, function () {
        var notification, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, notifications_1.notificationService.deleteNotification(notificationId)];
                case 1:
                    _a.sent();
                    notification = notifications.find(function (n) { return n.id === notificationId; });
                    setNotifications(function (prev) { return prev.filter(function (n) { return n.id !== notificationId; }); });
                    if (notification && !notification.isRead) {
                        setUnreadCount(function (prev) { return Math.max(0, prev - 1); });
                    }
                    toast({
                        'title': t('dashboard.notifications.success'),
                        'description': t('dashboard.notifications.deleteSuccess')
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    logger_1.default.error('Error deleting notification:', error_4);
                    toast({
                        'title': t('dashboard.notifications.error'),
                        'description': t('dashboard.notifications.deleteError'),
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // Get icon for notification type
    var getNotificationIcon = function (type) {
        var _a;
        var iconMap = {
            'license_expiry': (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-4 w-4" }),
            'leave_request': (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-4 w-4" }),
            'attendance_alert': (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4" }),
            'document_upload': (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { className: "h-4 w-4" })
        };
        return (_a = iconMap[type]) !== null && _a !== void 0 ? _a : (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "h-4 w-4" });
    };
    // Get color for notification type
    var getNotificationColor = function (type) {
        var _a;
        var colorMap = {
            'license_expiry': 'text-red-600',
            'leave_request': 'text-blue-600',
            'attendance_alert': 'text-yellow-600',
            'document_upload': 'text-green-600'
        };
        return (_a = colorMap[type]) !== null && _a !== void 0 ? _a : 'text-gray-600';
    };
    // Format dates
    var formatDate = function (dateString) {
        var date = new Date(dateString);
        var now = new Date();
        var diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        if (diffInHours < 1) {
            return t('dashboard.notifications.now');
        }
        else if (diffInHours < 24) {
            return t('dashboard.notifications.hoursAgo', { count: diffInHours });
        }
        else {
            var diffInDays = Math.floor(diffInHours / 24);
            return t('dashboard.notifications.daysAgo', { count: diffInDays });
        }
    };
    // Filter unread notifications
    var unreadNotifications = notifications.filter(function (n) { return !n.isRead; });
    var readNotifications = notifications.filter(function (n) { return n.isRead; });
    return ((0, jsx_runtime_1.jsxs)(popover_1.Popover, { open: isOpen, onOpenChange: setIsOpen, children: [(0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", size: "sm", className: "relative text-muted-foreground hover:text-foreground", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "h-4 w-4" }), unreadCount > 0 && ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "destructive", className: "absolute -top-1 -right-1 h-2 w-2 p-0 rounded-full min-w-0" }))] }) }), (0, jsx_runtime_1.jsxs)(popover_1.PopoverContent, { className: "w-80 p-0", align: "end", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-4 border-b", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold", children: t('dashboard.notifications.title') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [unreadCount > 0 && ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: handleMarkAllAsRead, className: "text-xs", children: t('dashboard.notifications.markAllAsRead') })), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", onClick: function () { return setIsOpen(false); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4" }) })] })] }), (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, { className: "h-96", children: isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center p-8", children: (0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-primary" }) })) : notifications.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center p-8 text-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "h-8 w-8 text-muted-foreground mb-2" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground", children: t('dashboard.notifications.none') })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "p-2", children: [unreadNotifications.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-2", children: (0, jsx_runtime_1.jsx)("h4", { className: "text-xs font-medium text-muted-foreground px-2 py-1", children: t('dashboard.notifications.unread', { count: unreadNotifications.length }) }) }), unreadNotifications.map(function (notification) { return ((0, jsx_runtime_1.jsx)(NotificationItem, { notification: notification, onMarkAsRead: handleMarkAsRead, onDelete: handleDeleteNotification, getNotificationIcon: getNotificationIcon, getNotificationColor: getNotificationColor, formatDate: formatDate }, notification.id)); }), readNotifications.length > 0 && (0, jsx_runtime_1.jsx)(separator_1.Separator, { className: "my-2" })] })), readNotifications.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-2", children: (0, jsx_runtime_1.jsx)("h4", { className: "text-xs font-medium text-muted-foreground px-2 py-1", children: t('dashboard.notifications.read') }) }), readNotifications.map(function (notification) { return ((0, jsx_runtime_1.jsx)(NotificationItem, { notification: notification, onMarkAsRead: handleMarkAsRead, onDelete: handleDeleteNotification, getNotificationIcon: getNotificationIcon, getNotificationColor: getNotificationColor, formatDate: formatDate }, notification.id)); })] }))] })) })] })] }));
}
function NotificationItem(_a) {
    var notification = _a.notification, onMarkAsRead = _a.onMarkAsRead, onDelete = _a.onDelete, getNotificationIcon = _a.getNotificationIcon, getNotificationColor = _a.getNotificationColor, formatDate = _a.formatDate;
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)("div", { className: "p-3 rounded-lg transition-colors ".concat(notification.isRead ? 'bg-transparent' : 'bg-muted/50'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "mt-1 ".concat(getNotificationColor(notification.type)), children: getNotificationIcon(notification.type) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1 min-w-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsx)("h4", { className: "text-sm font-medium leading-tight mb-1", children: notification.title }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground leading-relaxed", children: notification.message }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-foreground mt-1", children: formatDate(notification.createdAt.toString()) })] }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "sm", className: "h-6 w-6 p-0", children: (0, jsx_runtime_1.jsx)(lucide_react_1.MoreVertical, { className: "h-3 w-3" }) }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", children: [!notification.isRead && ((0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return onMarkAsRead(notification.id); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { className: "mr-2 h-3 w-3" }), t('dashboard.notifications.markAsRead')] })), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return onDelete(notification.id); }, className: "text-red-600", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: "mr-2 h-3 w-3" }), t('dashboard.notifications.delete')] })] })] })] }) })] }) }));
}
