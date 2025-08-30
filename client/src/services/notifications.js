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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_COLORS = exports.NOTIFICATION_ICONS = exports.NOTIFICATION_TYPES = exports.notificationService = void 0;
var apiRequest_1 = require("../lib/apiRequest");
exports.notificationService = {
    // الحصول على جميع إشعارات المستخدم
    getNotifications: function () {
        return __awaiter(this, arguments, void 0, function (filters) {
            var params;
            if (filters === void 0) { filters = {}; }
            return __generator(this, function (_a) {
                params = new globalThis.URLSearchParams();
                if (filters.isRead !== undefined) {
                    params.append('isRead', filters.isRead.toString());
                }
                if (filters.type) {
                    params.append('type', filters.type);
                }
                if (filters.limit) {
                    params.append('limit', filters.limit.toString());
                }
                if (filters.offset) {
                    params.append('offset', filters.offset.toString());
                }
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("/notifications?".concat(params.toString()))];
            });
        });
    },
    // الحصول على عدد الإشعارات غير المقروءة
    getUnreadCount: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)('/notifications/unread-count')];
            });
        });
    },
    // تحديث حالة الإشعار إلى مقروء
    markAsRead: function (notificationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("/notifications/".concat(notificationId, "/read"), {
                        'method': 'PATCH'
                    })];
            });
        });
    },
    // تحديث جميع الإشعارات إلى مقروءة
    markAllAsRead: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)('/notifications/mark-all-read', {
                        'method': 'PATCH'
                    })];
            });
        });
    },
    // حذف إشعار
    deleteNotification: function (notificationId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)("/notifications/".concat(notificationId), {
                        'method': 'DELETE'
                    })];
            });
        });
    },
    // إنشاء إشعار جديد
    createNotification: function (notification) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, apiRequest_1.apiRequest)('/notifications', {
                        'method': 'POST',
                        'body': JSON.stringify(notification)
                    })];
            });
        });
    },
    // إنشاء إشعارات تلقائية
    createSystemNotification: function (userId_1, type_1, title_1, message_1) {
        return __awaiter(this, arguments, void 0, function (userId, type, title, message, data) {
            if (data === void 0) { data = {}; }
            return __generator(this, function (_a) {
                return [2 /*return*/, this.createNotification({
                        userId: userId,
                        type: type,
                        title: title,
                        message: message,
                        'data': JSON.stringify(data)
                    })];
            });
        });
    }
};
// أنواع الإشعارات المدعومة
exports.NOTIFICATION_TYPES = {
    'LICENSE_EXPIRY': 'license_expiry',
    'LEAVE_REQUEST': 'leave_request',
    'ATTENDANCE_ALERT': 'attendance_alert',
    'DOCUMENT_UPLOAD': 'document_upload'
};
// أيقونات الإشعارات
exports.NOTIFICATION_ICONS = (_a = {},
    _a[exports.NOTIFICATION_TYPES.LICENSE_EXPIRY] = 'alert-triangle',
    _a[exports.NOTIFICATION_TYPES.LEAVE_REQUEST] = 'calendar',
    _a[exports.NOTIFICATION_TYPES.ATTENDANCE_ALERT] = 'clock',
    _a[exports.NOTIFICATION_TYPES.DOCUMENT_UPLOAD] = 'file-text',
    _a);
// ألوان الإشعارات
exports.NOTIFICATION_COLORS = (_b = {},
    _b[exports.NOTIFICATION_TYPES.LICENSE_EXPIRY] = 'destructive',
    _b[exports.NOTIFICATION_TYPES.LEAVE_REQUEST] = 'default',
    _b[exports.NOTIFICATION_TYPES.ATTENDANCE_ALERT] = 'warning',
    _b[exports.NOTIFICATION_TYPES.DOCUMENT_UPLOAD] = 'success',
    _b);
