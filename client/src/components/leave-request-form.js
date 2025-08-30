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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRequestForm = LeaveRequestForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("./ui/button");
var card_1 = require("./ui/card");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var textarea_1 = require("./ui/textarea");
var select_1 = require("./ui/select");
var badge_1 = require("./ui/badge");
var alert_1 = require("./ui/alert");
var use_toast_1 = require("../hooks/use-toast");
var react_query_1 = require("@tanstack/react-query");
var apiRequest_1 = require("@/lib/apiRequest");
var date_fns_1 = require("date-fns");
var signature_capture_1 = __importDefault(require("./signature-capture"));
var lucide_react_1 = require("lucide-react");
function LeaveRequestForm(_a) {
    var _b, _c;
    var _d = _a.employeeId, employeeId = _d === void 0 ? 'current-user' : _d, _e = _a.employeeName, employeeName = _e === void 0 ? 'أحمد محمد علي' : _e, leaveBalance = _a.leaveBalance, onSuccess = _a.onSuccess, onCancel = _a.onCancel, _f = _a.isOpen, isOpen = _f === void 0 ? true : _f;
    var toast = (0, use_toast_1.useToast)().toast;
    var queryClient = (0, react_query_1.useQueryClient)();
    var _g = (0, react_1.useState)({
        'leaveType': '',
        'startDate': '',
        'endDate': '',
        'reason': '',
        'days': 0,
        employeeId: employeeId
    }), formData = _g[0], setFormData = _g[1];
    var _h = (0, react_1.useState)({}), errors = _h[0], setErrors = _h[1];
    var _j = (0, react_1.useState)(0), calculatedDays = _j[0], setCalculatedDays = _j[1];
    var _k = (0, react_1.useState)(false), showSignatureCapture = _k[0], setShowSignatureCapture = _k[1];
    var _l = (0, react_1.useState)(), employeeSignature = _l[0], setEmployeeSignature = _l[1];
    // حساب عدد أيام الإجازة
    (0, react_1.useEffect)(function () {
        if (formData.startDate && formData.endDate) {
            var startDate = new Date(formData.startDate);
            var endDate = new Date(formData.endDate);
            if (startDate <= endDate) {
                var days_1 = 0;
                var currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    // لا نحسب أيام العطل الأسبوعية
                    if (!(0, date_fns_1.isWeekend)(currentDate)) {
                        days_1++;
                    }
                    currentDate = (0, date_fns_1.addDays)(currentDate, 1);
                }
                setCalculatedDays(days_1);
                setFormData(function (prev) { return (__assign(__assign({}, prev), { days: days_1 })); });
            }
            else {
                setCalculatedDays(0);
                setErrors(function (prev) { return (__assign(__assign({}, prev), { 'endDate': 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية' })); });
            }
        }
    }, [formData.startDate, formData.endDate]);
    // التحقق من صحة البيانات
    var validateForm = function () {
        var _a;
        var newErrors = {};
        if (!formData.leaveType) {
            newErrors.leaveType = 'يرجى اختيار نوع الإجازة';
        }
        if (!formData.startDate) {
            newErrors.startDate = 'يرجى تحديد تاريخ البداية';
        }
        if (!formData.endDate) {
            newErrors.endDate = 'يرجى تحديد تاريخ النهاية';
        }
        if (formData.startDate && formData.endDate) {
            var startDate = new Date(formData.startDate);
            var endDate = new Date(formData.endDate);
            if (startDate > endDate) {
                newErrors.endDate = 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية';
            }
            if (startDate < new Date()) {
                newErrors.startDate = 'لا يمكن طلب إجازة في الماضي';
            }
        }
        if (!formData.reason.trim()) {
            newErrors.reason = 'يرجى كتابة سبب الإجازة';
        }
        if (calculatedDays <= 0) {
            newErrors.days = 'عدد أيام الإجازة يجب أن يكون أكبر من صفر';
        }
        // التحقق من الرصيد المتاح
        if (leaveBalance && formData.leaveType) {
            var balanceKey = formData.leaveType;
            var availableBalance = (_a = leaveBalance[balanceKey]) !== null && _a !== void 0 ? _a : 0;
            if (calculatedDays > availableBalance) {
                newErrors.balance = "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u062D (".concat(availableBalance, " \u064A\u0648\u0645) \u0623\u0642\u0644 \u0645\u0646 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 (").concat(calculatedDays, " \u064A\u0648\u0645)");
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // إرسال طلب الإجازة
    var submitRequestMutation = (0, react_query_1.useMutation)({
        'mutationFn': function (requestData) {
            return (0, apiRequest_1.apiPost)('/api/leaves', requestData);
        },
        'onSuccess': function (data) {
            toast({
                'title': 'تم إرسال الطلب بنجاح',
                'description': "\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0648\u0647\u0648 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629. \u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628: ".concat(data.id)
            });
            // إعادة تعيين النموذج
            setFormData({
                'leaveType': '',
                'startDate': '',
                'endDate': '',
                'reason': '',
                'days': 0,
                employeeId: employeeId
            });
            setErrors({});
            setCalculatedDays(0);
            // تحديث البيانات
            queryClient.invalidateQueries({ 'queryKey': ['/api/leaves'] });
            queryClient.invalidateQueries({ 'queryKey': ['/api/leave-balance'] });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        },
        'onError': function (error) {
            var description = error instanceof Error
                ? error.message
                : 'حدث خطأ أثناء إرسال طلب الإجازة';
            toast({
                'title': 'خطأ في إرسال الطلب',
                description: description,
                'variant': 'destructive'
            });
        }
    });
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        submitRequestMutation.mutate(formData);
    };
    var handleSignatureSave = function (signatureData) {
        setEmployeeSignature(signatureData);
        setShowSignatureCapture(false);
    };
    var getLeaveTypeLabel = function (type) {
        var _a;
        var typeMap = {
            'annual': 'إجازة سنوية',
            'sick': 'إجازة مرضية',
            'emergency': 'إجازة طارئة',
            'maternity': 'إجازة أمومة',
            'paternity': 'إجازة أبوة',
            'study': 'إجازة دراسية',
            'unpaid': 'إجازة بدون راتب'
        };
        return (_a = typeMap[type]) !== null && _a !== void 0 ? _a : type;
    };
    var getBalanceForType = function (type) {
        if (!leaveBalance) {
            return null;
        }
        var balanceKey = type;
        var balance = leaveBalance[balanceKey];
        if (balance === undefined) {
            return null;
        }
        return {
            'total': balance,
            'remaining': type === 'annual' ? leaveBalance.remaining : balance,
            'used': type === 'annual' ? leaveBalance.used : 0
        };
    };
    if (!isOpen) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-2xl mx-auto", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsxs)(card_1.CardTitle, { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, { className: "h-5 w-5" }), "\u0637\u0644\u0628 \u0625\u062C\u0627\u0632\u0629 \u062C\u062F\u064A\u062F"] }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { children: "\u0642\u0645 \u0628\u062A\u0639\u0628\u0626\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629. \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631." })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { children: [(0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 p-3 bg-muted rounded-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "h-4 w-4 text-muted-foreground" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: employeeName })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "leave-type", children: "\u0646\u0648\u0639 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *" }), (0, jsx_runtime_1.jsxs)(select_1.Select, { value: formData.leaveType, onValueChange: function (value) {
                                            setFormData(__assign(__assign({}, formData), { 'leaveType': value }));
                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { 'leaveType': '' })); });
                                        }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: errors.leaveType ? 'border-red-500' : '', children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "\u0627\u062E\u062A\u0631 \u0646\u0648\u0639 \u0627\u0644\u0625\u062C\u0627\u0632\u0629" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "annual", children: "\u0625\u062C\u0627\u0632\u0629 \u0633\u0646\u0648\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "sick", children: "\u0625\u062C\u0627\u0632\u0629 \u0645\u0631\u0636\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "emergency", children: "\u0625\u062C\u0627\u0632\u0629 \u0637\u0627\u0631\u0626\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "maternity", children: "\u0625\u062C\u0627\u0632\u0629 \u0623\u0645\u0648\u0645\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "paternity", children: "\u0625\u062C\u0627\u0632\u0629 \u0623\u0628\u0648\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "study", children: "\u0625\u062C\u0627\u0632\u0629 \u062F\u0631\u0627\u0633\u064A\u0629" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "unpaid", children: "\u0625\u062C\u0627\u0632\u0629 \u0628\u062F\u0648\u0646 \u0631\u0627\u062A\u0628" })] })] }), errors.leaveType && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-3 w-3" }), errors.leaveType] }))] }), formData.leaveType && leaveBalance && ((0, jsx_runtime_1.jsxs)("div", { className: "p-3 bg-blue-50 rounded-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4 text-blue-600" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-medium text-blue-900", children: ["\u0631\u0635\u064A\u062F ", getLeaveTypeLabel(formData.leaveType)] })] }), (function () {
                                        var balance = getBalanceForType(formData.leaveType);
                                        if (!balance) {
                                            return null;
                                        }
                                        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: "\u0627\u0644\u0645\u062A\u0627\u062D:" }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "text-green-600", children: [balance.remaining, " \u064A\u0648\u0645"] })] }), balance.used > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground", children: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645:" }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "text-orange-600", children: [balance.used, " \u064A\u0648\u0645"] })] }))] }));
                                    })()] })), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "start-date", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0628\u062F\u0627\u064A\u0629 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "start-date", type: "date", value: formData.startDate, onChange: function (e) {
                                                    setFormData(__assign(__assign({}, formData), { 'startDate': e.target.value }));
                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { 'startDate': '' })); });
                                                }, className: errors.startDate ? 'border-red-500' : '', min: new Date().toISOString().split('T')[0] }), errors.startDate && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-3 w-3" }), errors.startDate] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "end-date", children: "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0646\u0647\u0627\u064A\u0629 *" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "end-date", type: "date", value: formData.endDate, onChange: function (e) {
                                                    setFormData(__assign(__assign({}, formData), { 'endDate': e.target.value }));
                                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { 'endDate': '' })); });
                                                }, className: errors.endDate ? 'border-red-500' : '', min: (_b = formData.startDate) !== null && _b !== void 0 ? _b : new Date().toISOString().split('T')[0] }), errors.endDate && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-3 w-3" }), errors.endDate] }))] })] }), calculatedDays > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 p-3 bg-green-50 rounded-lg", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Calculator, { className: "h-4 w-4 text-green-600" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-medium text-green-900", children: ["\u0639\u062F\u062F \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629: ", calculatedDays, " \u064A\u0648\u0645"] }), (0, jsx_runtime_1.jsxs)(badge_1.Badge, { variant: "outline", className: "text-green-600", children: [calculatedDays, " \u064A\u0648\u0645"] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "reason", children: "\u0633\u0628\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 *" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { id: "reason", placeholder: "\u0627\u0630\u0643\u0631 \u0633\u0628\u0628 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644...", rows: 4, value: formData.reason, onChange: function (e) {
                                            setFormData(__assign(__assign({}, formData), { 'reason': e.target.value }));
                                            setErrors(function (prev) { return (__assign(__assign({}, prev), { 'reason': '' })); });
                                        }, className: errors.reason ? 'border-red-500' : '' }), errors.reason && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-red-500 flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, { className: "h-3 w-3" }), errors.reason] }))] }), errors.balance && ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "destructive", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { children: errors.balance })] })), calculatedDays > 0 && formData.leaveType && leaveBalance && (function () {
                                var balance = getBalanceForType(formData.leaveType);
                                if (!balance) {
                                    return null;
                                }
                                if (calculatedDays > balance.remaining) {
                                    return ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: "destructive", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, { children: ["\u0639\u062F\u062F \u0623\u064A\u0627\u0645 \u0627\u0644\u0625\u062C\u0627\u0632\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (", calculatedDays, " \u064A\u0648\u0645) \u064A\u062A\u062C\u0627\u0648\u0632 \u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062A\u0627\u062D (", balance.remaining, " \u064A\u0648\u0645)"] })] }));
                                }
                                if (calculatedDays > balance.remaining * 0.8) {
                                    return ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, { children: ["\u062A\u062D\u0630\u064A\u0631: \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u0633\u064A\u0633\u062A\u0646\u0641\u0630 ", (calculatedDays / balance.remaining * 100).toFixed(0), "% \u0645\u0646 \u0631\u0635\u064A\u062F\u0643 \u0627\u0644\u0645\u062A\u0628\u0642\u064A"] })] }));
                                }
                                return null;
                            })(), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { children: "\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: employeeSignature ? ((0, jsx_runtime_1.jsxs)("div", { className: "border rounded-lg p-4 bg-gray-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PenTool, { className: "h-4 w-4 text-blue-600" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-medium", children: "\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062A\u0648\u0642\u064A\u0639" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: function () { return setShowSignatureCapture(true); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { className: "h-4 w-4 mr-1" }), "\u062A\u0639\u062F\u064A\u0644"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", size: "sm", onClick: function () { return setEmployeeSignature(undefined); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "h-4 w-4 mr-1" }), "\u062D\u0630\u0641"] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2", children: (0, jsx_runtime_1.jsx)("img", { src: employeeSignature.imageData, alt: "\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641", className: "w-full h-24 object-contain border rounded" }) })] })) : ((0, jsx_runtime_1.jsxs)(button_1.Button, { type: "button", variant: "outline", onClick: function () { return setShowSignatureCapture(true); }, className: "w-full", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PenTool, { className: "h-4 w-4 mr-1" }), "\u0625\u0636\u0627\u0641\u0629 \u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641"] })) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 pt-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: (_c = submitRequestMutation.isPending) !== null && _c !== void 0 ? _c : calculatedDays <= 0, className: "flex-1", children: submitRequestMutation.isPending ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { className: "h-4 w-4 mr-2 animate-spin" }), "\u062C\u0627\u0631\u064A \u0627\u0644\u0625\u0631\u0633\u0627\u0644..."] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { className: "h-4 w-4 mr-2" }), "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0637\u0644\u0628"] })) }), onCancel && ((0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: onCancel, disabled: submitRequestMutation.isPending, children: "\u0625\u0644\u063A\u0627\u0621" }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-xs text-muted-foreground space-y-1", children: [(0, jsx_runtime_1.jsx)("p", { children: "\u2022 \u0633\u064A\u062A\u0645 \u0645\u0631\u0627\u062C\u0639\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 \u0642\u0628\u0644 \u0627\u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u062E\u0644\u0627\u0644 24-48 \u0633\u0627\u0639\u0629" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 \u064A\u0645\u0643\u0646 \u062A\u062A\u0628\u0639 \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u0645\u0646 \u0635\u0641\u062D\u0629 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A" }), (0, jsx_runtime_1.jsx)("p", { children: "\u2022 \u0627\u0644\u0625\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u0637\u0627\u0631\u0626\u0629 \u062A\u062A\u0637\u0644\u0628 \u0625\u0634\u0639\u0627\u0631 \u0641\u0648\u0631\u064A \u0644\u0644\u0645\u062F\u064A\u0631" })] })] }), showSignatureCapture && ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-lg p-6 max-w-md w-full mx-4", children: (0, jsx_runtime_1.jsx)(signature_capture_1.default, { entityId: employeeId, entityType: "leave", onSave: handleSignatureSave, onCancel: function () { return setShowSignatureCapture(false); }, title: "\u062A\u0648\u0642\u064A\u0639 \u0627\u0644\u0645\u0648\u0638\u0641", description: "\u0642\u0645 \u0628\u0627\u0644\u062A\u0648\u0642\u064A\u0639 \u0639\u0644\u0649 \u0637\u0644\u0628 \u0627\u0644\u0625\u062C\u0627\u0632\u0629" }) }) }))] })] }));
}
