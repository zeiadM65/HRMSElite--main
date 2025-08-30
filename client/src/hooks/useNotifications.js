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
exports.useNotifications = useNotifications;
var react_1 = require("react");
var notifications_1 = require("../services/notifications");
var use_toast_1 = require("./use-toast");
function useNotifications(_a) {
    var _this = this;
    var userId = _a.userId, _b = _a.autoRefresh, autoRefresh = _b === void 0 ? true : _b, _c = _a.refreshInterval, refreshInterval = _c === void 0 ? 30000 : _c;
    var _d = (0, react_1.useState)([]), notifications = _d[0], setNotifications = _d[1];
    var _e = (0, react_1.useState)(0), unreadCount = _e[0], setUnreadCount = _e[1];
    var _f = (0, react_1.useState)(false), isLoading = _f[0], setIsLoading = _f[1];
    var _g = (0, react_1.useState)(null), error = _g[0], setError = _g[1];
    var toast = (0, use_toast_1.useToast)().toast;
    // تحميل الإشعارات
    var loadNotifications = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, notificationsData, unreadCountData, err_1, errorMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!userId) {
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    setIsLoading(true);
                    setError(null);
                    return [4 /*yield*/, Promise.all([
                            notifications_1.notificationService.getNotifications({ 'limit': 50 }),
                            notifications_1.notificationService.getUnreadCount()
                        ])];
                case 2:
                    _a = _b.sent(), notificationsData = _a[0], unreadCountData = _a[1];
                    setNotifications(notificationsData);
                    setUnreadCount(unreadCountData);
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _b.sent();
                    errorMessage = err_1 instanceof Error ? err_1.message : 'خطأ في تحميل الإشعارات';
                    setError(errorMessage);
                    toast({
                        'title': 'خطأ',
                        'description': errorMessage,
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [userId, toast]);
    // تحديث حالة الإشعار إلى مقروء
    var markAsRead = (0, react_1.useCallback)(function (notificationId) { return __awaiter(_this, void 0, void 0, function () {
        var err_2, errorMessage;
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
                    toast({
                        'title': 'تم',
                        'description': 'تم تحديث حالة الإشعار'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    errorMessage = err_2 instanceof Error ? err_2.message : 'خطأ في تحديث حالة الإشعار';
                    toast({
                        'title': 'خطأ',
                        'description': errorMessage,
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [toast]);
    // تحديث جميع الإشعارات إلى مقروءة
    var markAllAsRead = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var err_3, errorMessage;
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
                        'title': 'تم',
                        'description': 'تم تحديث جميع الإشعارات'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    errorMessage = err_3 instanceof Error ? err_3.message : 'خطأ في تحديث الإشعارات';
                    toast({
                        'title': 'خطأ',
                        'description': errorMessage,
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [toast]);
    // حذف إشعار
    var deleteNotification = (0, react_1.useCallback)(function (notificationId) { return __awaiter(_this, void 0, void 0, function () {
        var notification, err_4, errorMessage;
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
                        'title': 'تم',
                        'description': 'تم حذف الإشعار'
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    errorMessage = err_4 instanceof Error ? err_4.message : 'خطأ في حذف الإشعار';
                    toast({
                        'title': 'خطأ',
                        'description': errorMessage,
                        'variant': 'destructive'
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [notifications, toast]);
    // إنشاء إشعار جديد
    var createNotification = (0, react_1.useCallback)(function (notification) { return __awaiter(_this, void 0, void 0, function () {
        var newNotification_1, err_5, errorMessage;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, notifications_1.notificationService.createNotification(__assign(__assign({ userId: userId }, notification), { 'data': JSON.stringify((_a = notification.data) !== null && _a !== void 0 ? _a : {}) }))];
                case 1:
                    newNotification_1 = _b.sent();
                    setNotifications(function (prev) { return __spreadArray([newNotification_1], prev, true); });
                    setUnreadCount(function (prev) { return prev + 1; });
                    toast({
                        'title': 'تم',
                        'description': 'تم إنشاء الإشعار بنجاح'
                    });
                    return [2 /*return*/, newNotification_1];
                case 2:
                    err_5 = _b.sent();
                    errorMessage = err_5 instanceof Error ? err_5.message : 'خطأ في إنشاء الإشعار';
                    toast({
                        'title': 'خطأ',
                        'description': errorMessage,
                        'variant': 'destructive'
                    });
                    throw err_5;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [userId, toast]);
    // إنشاء إشعارات تلقائية للنظام
    var createSystemNotification = (0, react_1.useCallback)(function (type_1, title_1, message_1) {
        var args_1 = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args_1[_i - 3] = arguments[_i];
        }
        return __awaiter(_this, __spreadArray([type_1, title_1, message_1], args_1, true), void 0, function (type, title, message, data) {
            var newNotification_2, err_6, errorMessage;
            if (data === void 0) { data = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, notifications_1.notificationService.createSystemNotification(userId, type, title, message, data)];
                    case 1:
                        newNotification_2 = _a.sent();
                        setNotifications(function (prev) { return __spreadArray([newNotification_2], prev, true); });
                        setUnreadCount(function (prev) { return prev + 1; });
                        return [2 /*return*/, newNotification_2];
                    case 2:
                        err_6 = _a.sent();
                        errorMessage = err_6 instanceof Error ? err_6.message : 'خطأ في إنشاء إشعار النظام';
                        toast({
                            'title': 'خطأ',
                            'description': errorMessage,
                            'variant': 'destructive'
                        });
                        throw err_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }, [userId, toast]);
    // تحميل الإشعارات عند بدء التطبيق
    (0, react_1.useEffect)(function () {
        loadNotifications();
    }, [loadNotifications]);
    // التحديث التلقائي للإشعارات
    (0, react_1.useEffect)(function () {
        if (!autoRefresh) {
            return;
        }
        var interval = setInterval(function () {
            loadNotifications();
        }, refreshInterval);
        return function () { return clearInterval(interval); };
    }, [autoRefresh, refreshInterval, loadNotifications]);
    // تصفية الإشعارات
    var unreadNotifications = notifications.filter(function (n) { return !n.isRead; });
    var readNotifications = notifications.filter(function (n) { return n.isRead; });
    return {
        // البيانات
        notifications: notifications,
        unreadNotifications: unreadNotifications,
        readNotifications: readNotifications,
        unreadCount: unreadCount,
        isLoading: isLoading,
        error: error,
        // الإجراءات
        loadNotifications: loadNotifications,
        markAsRead: markAsRead,
        markAllAsRead: markAllAsRead,
        deleteNotification: deleteNotification,
        createNotification: createNotification,
        createSystemNotification: createSystemNotification,
        // الحالة
        'hasNotifications': notifications.length > 0,
        'hasUnreadNotifications': unreadCount > 0
    };
}
