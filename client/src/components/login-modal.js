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
exports.LoginModal = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("./ui/button");
var input_1 = require("./ui/input");
var label_1 = require("./ui/label");
var dialog_1 = require("./ui/dialog");
var useAuth_1 = require("@/hooks/useAuth");
var LoginModal = function (_a) {
    var company = _a.company, isOpen = _a.isOpen, onClose = _a.onClose;
    var _b = (0, useAuth_1.useAuth)(), login = _b.login, loading = _b.loading, error = _b.error;
    var _c = (0, react_1.useState)(''), username = _c[0], setUsername = _c[1];
    var _d = (0, react_1.useState)(''), password = _d[0], setPassword = _d[1];
    var _e = (0, react_1.useState)(null), localError = _e[0], setLocalError = _e[1];
    var handleLogin = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLocalError(null);
                    if (!username || !password) {
                        setLocalError('يرجى إدخال اسم المستخدم وكلمة المرور');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, login({ username: username, password: password, 'companyId': company.id })];
                case 1:
                    result = _b.sent();
                    if (result.success) {
                        onClose();
                    }
                    else {
                        setLocalError((_a = result.error) !== null && _a !== void 0 ? _a : 'فشل تسجيل الدخول');
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [username, password, login, company.id, onClose]);
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, onOpenChange: function (open) { if (!open)
            onClose(); }, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { children: [(0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, { children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, { children: ["\u0627\u0644\u0631\u062C\u0627\u0621 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u0649 \u0634\u0631\u0643\u0629: ", company.name] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "username", children: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "username", value: username, onChange: function (e) { return setUsername(e.target.value); }, placeholder: "example@company.com", disabled: loading })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "password", children: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631" }), (0, jsx_runtime_1.jsx)(input_1.Input, { id: "password", type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, disabled: loading })] }), (localError || error) && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-destructive", children: localError || error }))] }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "secondary", onClick: onClose, disabled: loading, children: "\u0625\u0644\u063A\u0627\u0621" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: handleLogin, disabled: loading, children: loading ? 'جارٍ الدخول...' : 'تسجيل الدخول' })] })] }) }));
};
exports.LoginModal = LoginModal;
