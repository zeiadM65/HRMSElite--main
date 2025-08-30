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
var db_1 = require("../models/db");
var schema_1 = require("../../shared/schema");
var drizzle_orm_1 = require("drizzle-orm");
var logger_1 = require("../utils/logger");
var router = (0, express_1.Router)();
// الحصول على جميع إشعارات المستخدم
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, isRead, type, _b, limit, _c, offset, limitNum, offsetNum, whereConditions, notificationsData, error_1;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 2, , 3]);
                userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ 'error': 'غير مصرح' })];
                }
                _a = req.query, isRead = _a.isRead, type = _a.type, _b = _a.limit, limit = _b === void 0 ? '50' : _b, _c = _a.offset, offset = _c === void 0 ? '0' : _c;
                limitNum = Math.min(200, Math.max(0, Number(limit) || 50));
                offsetNum = Math.max(0, Number(offset) || 0);
                whereConditions = [(0, drizzle_orm_1.eq)(schema_1.notifications.userId, userId)];
                if (isRead !== undefined) {
                    whereConditions.push((0, drizzle_orm_1.eq)(schema_1.notifications.isRead, isRead === 'true'));
                }
                if (type) {
                    whereConditions.push((0, drizzle_orm_1.eq)(schema_1.notifications.type, type));
                }
                return [4 /*yield*/, db_1.db
                        .select()
                        .from(schema_1.notifications)
                        .where(drizzle_orm_1.and.apply(void 0, whereConditions))
                        .orderBy((0, drizzle_orm_1.desc)(schema_1.notifications.createdAt))
                        .limit(limitNum)
                        .offset(offsetNum)];
            case 1:
                notificationsData = _e.sent();
                res.json(notificationsData);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _e.sent();
                logger_1.log.error('خطأ في الحصول على الإشعارات:', error_1 instanceof Error ? error_1 : new Error(String(error_1)));
                res.status(500).json({ 'error': 'خطأ في الخادم' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// الحصول على عدد الإشعارات غير المقروءة
router.get('/unread-count', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, result, error_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ 'error': 'غير مصرح' })];
                }
                return [4 /*yield*/, db_1.db
                        .select({ count: (0, drizzle_orm_1.count)() })
                        .from(schema_1.notifications)
                        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.notifications.userId, userId), (0, drizzle_orm_1.eq)(schema_1.notifications.isRead, false)))];
            case 1:
                result = _d.sent();
                res.json((_c = (_b = result[0]) === null || _b === void 0 ? void 0 : _b.count) !== null && _c !== void 0 ? _c : 0);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _d.sent();
                logger_1.log.error('خطأ في الحصول على عدد الإشعارات غير المقروءة:', error_2 instanceof Error ? error_2 : new Error(String(error_2)));
                res.status(500).json({ 'error': 'خطأ في الخادم' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// تحديث حالة الإشعار إلى مقروء
router.patch('/:id/read', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, notificationId, updatedNotification, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                notificationId = req.params.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ 'error': 'غير مصرح' })];
                }
                if (!notificationId) {
                    return [2 /*return*/, res.status(400).json({ 'error': 'معرف الإشعار مطلوب' })];
                }
                return [4 /*yield*/, db_1.db
                        .update(schema_1.notifications)
                        .set({ isRead: true })
                        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.notifications.id, notificationId), (0, drizzle_orm_1.eq)(schema_1.notifications.userId, userId)))
                        .returning()];
            case 1:
                updatedNotification = (_b.sent())[0];
                if (!updatedNotification) {
                    return [2 /*return*/, res.status(404).json({ 'error': 'الإشعار غير موجود' })];
                }
                res.json(updatedNotification);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                logger_1.log.error('خطأ في تحديث حالة الإشعار:', error_3 instanceof Error ? error_3 : new Error(String(error_3)));
                res.status(500).json({ 'error': 'خطأ في الخادم' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// تحديث جميع إشعارات المستخدم إلى مقروءة
router.patch('/mark-all-read', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ 'error': 'غير مصرح' })];
                }
                return [4 /*yield*/, db_1.db
                        .update(schema_1.notifications)
                        .set({ isRead: true })
                        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.notifications.userId, userId), (0, drizzle_orm_1.eq)(schema_1.notifications.isRead, false)))];
            case 1:
                _b.sent();
                res.json({ 'message': 'تم تحديث جميع الإشعارات' });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                logger_1.log.error('خطأ في تحديث جميع الإشعارات:', error_4 instanceof Error ? error_4 : new Error(String(error_4)));
                res.status(500).json({ 'error': 'خطأ في الخادم' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// حذف إشعار
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, notificationId, deletedNotification, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                notificationId = req.params.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ 'error': 'غير مصرح' })];
                }
                if (!notificationId) {
                    return [2 /*return*/, res.status(400).json({ 'error': 'معرف الإشعار مطلوب' })];
                }
                return [4 /*yield*/, db_1.db
                        .delete(schema_1.notifications)
                        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.notifications.id, notificationId), (0, drizzle_orm_1.eq)(schema_1.notifications.userId, userId)))
                        .returning()];
            case 1:
                deletedNotification = (_b.sent())[0];
                if (!deletedNotification) {
                    return [2 /*return*/, res.status(404).json({ 'error': 'الإشعار غير موجود' })];
                }
                res.json({ 'message': 'تم حذف الإشعار بنجاح' });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                logger_1.log.error('خطأ في حذف الإشعار:', error_5 instanceof Error ? error_5 : new Error(String(error_5)));
                res.status(500).json({ 'error': 'خطأ في الخادم' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, type, title, message, data, companyId, payload, created, error_6;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({ 'error': 'غير مصرح' })];
                }
                _a = req.body, type = _a.type, title = _a.title, message = _a.message, data = _a.data, companyId = _a.companyId;
                if (!type || !title || !message) {
                    return [2 /*return*/, res.status(400).json({ 'error': 'جميع الحقول مطلوبة' })];
                }
                payload = {
                    userId: userId,
                    companyId: companyId !== null && companyId !== void 0 ? companyId : null,
                    type: type,
                    title: title,
                    message: message,
                    data: typeof data === 'string' ? data : JSON.stringify(data !== null && data !== void 0 ? data : {}),
                    isRead: false,
                    createdAt: new Date()
                };
                return [4 /*yield*/, db_1.db.insert(schema_1.notifications).values(payload).returning()];
            case 1:
                created = (_c.sent())[0];
                res.status(201).json(created);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _c.sent();
                logger_1.log.error('خطأ في إنشاء الإشعار:', error_6 instanceof Error ? error_6 : new Error(String(error_6)));
                res.status(500).json({ 'error': 'خطأ في الخادم' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
