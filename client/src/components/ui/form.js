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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormField = exports.FormMessage = exports.FormDescription = exports.FormControl = exports.FormLabel = exports.FormItem = exports.Form = exports.useFormField = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var react_slot_1 = require("@radix-ui/react-slot");
var react_hook_form_1 = require("react-hook-form");
var utils_1 = require("@/lib/utils");
var label_1 = require("@/components/ui/label");
var Form = react_hook_form_1.FormProvider;
exports.Form = Form;
var FormFieldContext = React.createContext({});
var FormField = function (_a) {
    var props = __rest(_a, []);
    return ((0, jsx_runtime_1.jsx)(FormFieldContext.Provider, { value: { 'name': props.name }, children: (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, __assign({}, props)) }));
};
exports.FormField = FormField;
var useFormField = function () {
    var fieldContext = React.useContext(FormFieldContext);
    var itemContext = React.useContext(FormItemContext);
    var _a = (0, react_hook_form_1.useFormContext)(), getFieldState = _a.getFieldState, formState = _a.formState;
    var fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>');
    }
    var id = itemContext.id;
    return __assign({ id: id, 'name': fieldContext.name, 'formItemId': "".concat(id, "-form-item"), 'formDescriptionId': "".concat(id, "-form-item-description"), 'formMessageId': "".concat(id, "-form-item-message") }, fieldState);
};
exports.useFormField = useFormField;
var FormItemContext = React.createContext({});
var FormItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var id = React.useId();
    return ((0, jsx_runtime_1.jsx)(FormItemContext.Provider, { value: { id: id }, children: (0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, utils_1.cn)('space-y-2', className) }, props)) }));
});
exports.FormItem = FormItem;
FormItem.displayName = 'FormItem';
var FormLabel = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var _b = useFormField(), error = _b.error, formItemId = _b.formItemId;
    return ((0, jsx_runtime_1.jsx)(label_1.Label, __assign({ ref: ref, className: (0, utils_1.cn)(error && 'text-destructive', className), htmlFor: formItemId }, props)));
});
exports.FormLabel = FormLabel;
FormLabel.displayName = 'FormLabel';
var FormControl = React.forwardRef(function (_a, ref) {
    var props = __rest(_a, []);
    var _b = useFormField(), error = _b.error, formItemId = _b.formItemId, formDescriptionId = _b.formDescriptionId, formMessageId = _b.formMessageId;
    return ((0, jsx_runtime_1.jsx)(react_slot_1.Slot, __assign({ ref: ref, id: formItemId, "aria-describedby": !error
            ? "".concat(formDescriptionId)
            : "".concat(formDescriptionId, " ").concat(formMessageId), "aria-invalid": !!error }, props)));
});
exports.FormControl = FormControl;
FormControl.displayName = 'FormControl';
var FormDescription = React.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var formDescriptionId = useFormField().formDescriptionId;
    return ((0, jsx_runtime_1.jsx)("p", __assign({ ref: ref, id: formDescriptionId, className: (0, utils_1.cn)('text-sm text-muted-foreground', className) }, props)));
});
exports.FormDescription = FormDescription;
FormDescription.displayName = 'FormDescription';
var FormMessage = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    var _b = useFormField(), error = _b.error, formMessageId = _b.formMessageId;
    var body = error ? String(error === null || error === void 0 ? void 0 : error.message) : children;
    if (!body) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("p", __assign({ ref: ref, id: formMessageId, className: (0, utils_1.cn)('text-sm font-medium text-destructive', className) }, props, { children: body })));
});
exports.FormMessage = FormMessage;
FormMessage.displayName = 'FormMessage';
