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
exports.AccessibleRadioGroup = exports.AccessibleCheckbox = exports.AccessibleSelect = exports.AccessibleTextarea = exports.AccessibleInput = exports.AccessibleFormField = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var utils_1 = require("../../lib/utils");
var AccessibilityProvider_1 = require("../shared/AccessibilityProvider");
var AccessibleFormField = function (_a) {
    var label = _a.label, error = _a.error, _b = _a.required, required = _b === void 0 ? false : _b, helperText = _a.helperText, id = _a.id, className = _a.className, children = _a.children, describedBy = _a.describedBy;
    var generatedId = (0, react_1.useId)();
    var fieldId = id || generatedId;
    var errorId = "".concat(fieldId, "-error");
    var helperId = "".concat(fieldId, "-helper");
    var describedByIds = [describedBy, error && errorId, helperText && helperId]
        .filter(Boolean)
        .join(' ');
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('space-y-2', className), children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: fieldId, className: (0, utils_1.cn)('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', required && 'after:content-["*"] after:ml-0.5 after:text-red-500'), children: label }), react_1.default.cloneElement(children, {
                id: fieldId,
                'aria-describedby': describedByIds || undefined,
                'aria-invalid': !!error,
                'aria-required': required,
            }), helperText && ((0, jsx_runtime_1.jsx)("p", { id: helperId, className: "text-sm text-muted-foreground", children: helperText })), error && ((0, jsx_runtime_1.jsx)("p", { id: errorId, className: "text-sm text-destructive", role: "alert", children: error }))] }));
};
exports.AccessibleFormField = AccessibleFormField;
exports.AccessibleInput = (0, react_1.forwardRef)(function (_a, ref) {
    var label = _a.label, error = _a.error, helperText = _a.helperText, _b = _a.required, required = _b === void 0 ? false : _b, describedBy = _a.describedBy, className = _a.className, _c = _a.type, type = _c === void 0 ? 'text' : _c, props = __rest(_a, ["label", "error", "helperText", "required", "describedBy", "className", "type"]);
    var announceToScreenReader = (0, AccessibilityProvider_1.useAccessibility)().announceToScreenReader;
    var _d = (0, react_1.useState)(!!error), hasError = _d[0], setHasError = _d[1];
    // Announce errors to screen reader
    (0, react_1.useEffect)(function () {
        if (error && !hasError) {
            announceToScreenReader(error, 'assertive');
            setHasError(true);
        }
        else if (!error && hasError) {
            setHasError(false);
        }
    }, [error, hasError, announceToScreenReader]);
    var input = ((0, jsx_runtime_1.jsx)("input", __assign({ type: type, className: (0, utils_1.cn)('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive focus-visible:ring-destructive', className), ref: ref }, props)));
    if (label) {
        return ((0, jsx_runtime_1.jsx)(exports.AccessibleFormField, { label: label, error: error, required: required, helperText: helperText, describedBy: describedBy, children: input }));
    }
    return input;
});
exports.AccessibleInput.displayName = 'AccessibleInput';
exports.AccessibleTextarea = (0, react_1.forwardRef)(function (_a, ref) {
    var label = _a.label, error = _a.error, helperText = _a.helperText, _b = _a.required, required = _b === void 0 ? false : _b, describedBy = _a.describedBy, className = _a.className, props = __rest(_a, ["label", "error", "helperText", "required", "describedBy", "className"]);
    var announceToScreenReader = (0, AccessibilityProvider_1.useAccessibility)().announceToScreenReader;
    var _c = (0, react_1.useState)(!!error), hasError = _c[0], setHasError = _c[1];
    // Announce errors to screen reader
    (0, react_1.useEffect)(function () {
        if (error && !hasError) {
            announceToScreenReader(error, 'assertive');
            setHasError(true);
        }
        else if (!error && hasError) {
            setHasError(false);
        }
    }, [error, hasError, announceToScreenReader]);
    var textarea = ((0, jsx_runtime_1.jsx)("textarea", __assign({ className: (0, utils_1.cn)('flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive focus-visible:ring-destructive', className), ref: ref }, props)));
    if (label) {
        return ((0, jsx_runtime_1.jsx)(exports.AccessibleFormField, { label: label, error: error, required: required, helperText: helperText, describedBy: describedBy, children: textarea }));
    }
    return textarea;
});
exports.AccessibleTextarea.displayName = 'AccessibleTextarea';
exports.AccessibleSelect = (0, react_1.forwardRef)(function (_a, ref) {
    var label = _a.label, error = _a.error, helperText = _a.helperText, _b = _a.required, required = _b === void 0 ? false : _b, describedBy = _a.describedBy, className = _a.className, options = _a.options, placeholder = _a.placeholder, props = __rest(_a, ["label", "error", "helperText", "required", "describedBy", "className", "options", "placeholder"]);
    var announceToScreenReader = (0, AccessibilityProvider_1.useAccessibility)().announceToScreenReader;
    var _c = (0, react_1.useState)(!!error), hasError = _c[0], setHasError = _c[1];
    // Announce errors to screen reader
    (0, react_1.useEffect)(function () {
        if (error && !hasError) {
            announceToScreenReader(error, 'assertive');
            setHasError(true);
        }
        else if (!error && hasError) {
            setHasError(false);
        }
    }, [error, hasError, announceToScreenReader]);
    var select = ((0, jsx_runtime_1.jsxs)("select", __assign({ className: (0, utils_1.cn)('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive focus-visible:ring-destructive', className), ref: ref }, props, { children: [placeholder && ((0, jsx_runtime_1.jsx)("option", { value: "", disabled: true, children: placeholder })), options.map(function (option) { return ((0, jsx_runtime_1.jsx)("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value)); })] })));
    if (label) {
        return ((0, jsx_runtime_1.jsx)(exports.AccessibleFormField, { label: label, error: error, required: required, helperText: helperText, describedBy: describedBy, children: select }));
    }
    return select;
});
exports.AccessibleSelect.displayName = 'AccessibleSelect';
exports.AccessibleCheckbox = (0, react_1.forwardRef)(function (_a, ref) {
    var label = _a.label, error = _a.error, helperText = _a.helperText, _b = _a.required, required = _b === void 0 ? false : _b, describedBy = _a.describedBy, className = _a.className, props = __rest(_a, ["label", "error", "helperText", "required", "describedBy", "className"]);
    var announceToScreenReader = (0, AccessibilityProvider_1.useAccessibility)().announceToScreenReader;
    var _c = (0, react_1.useState)(!!error), hasError = _c[0], setHasError = _c[1];
    // Announce errors to screen reader
    (0, react_1.useEffect)(function () {
        if (error && !hasError) {
            announceToScreenReader(error, 'assertive');
            setHasError(true);
        }
        else if (!error && hasError) {
            setHasError(false);
        }
    }, [error, hasError, announceToScreenReader]);
    var checkbox = ((0, jsx_runtime_1.jsx)("input", __assign({ type: "checkbox", className: (0, utils_1.cn)('h-4 w-4 rounded border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-destructive focus-visible:ring-destructive', className), ref: ref }, props)));
    if (label) {
        return ((0, jsx_runtime_1.jsx)(exports.AccessibleFormField, { label: label, error: error, required: required, helperText: helperText, describedBy: describedBy, children: checkbox }));
    }
    return checkbox;
});
exports.AccessibleCheckbox.displayName = 'AccessibleCheckbox';
var AccessibleRadioGroup = function (_a) {
    var label = _a.label, error = _a.error, helperText = _a.helperText, _b = _a.required, required = _b === void 0 ? false : _b, describedBy = _a.describedBy, options = _a.options, value = _a.value, onChange = _a.onChange, name = _a.name;
    var announceToScreenReader = (0, AccessibilityProvider_1.useAccessibility)().announceToScreenReader;
    var _c = (0, react_1.useState)(!!error), hasError = _c[0], setHasError = _c[1];
    var groupId = "radio-group-".concat(name);
    var errorId = "".concat(groupId, "-error");
    var helperId = "".concat(groupId, "-helper");
    var describedByIds = [describedBy, error && errorId, helperText && helperId]
        .filter(Boolean)
        .join(' ');
    // Announce errors to screen reader
    (0, react_1.useEffect)(function () {
        if (error && !hasError) {
            announceToScreenReader(error, 'assertive');
            setHasError(true);
        }
        else if (!error && hasError) {
            setHasError(false);
        }
    }, [error, hasError, announceToScreenReader]);
    return ((0, jsx_runtime_1.jsxs)("fieldset", { className: "space-y-2", children: [label && ((0, jsx_runtime_1.jsxs)("legend", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: [label, required && (0, jsx_runtime_1.jsx)("span", { className: "text-red-500 ml-1", children: "*" })] })), (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-labelledby": label ? undefined : undefined, "aria-describedby": describedByIds || undefined, "aria-invalid": !!error, "aria-required": required, children: options.map(function (option) { return ((0, jsx_runtime_1.jsxs)("label", { className: "flex items-center space-x-2 cursor-pointer", children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: name, value: option.value, checked: value === option.value, onChange: function (e) { return onChange === null || onChange === void 0 ? void 0 : onChange(e.target.value); }, disabled: option.disabled, className: "h-4 w-4 border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: option.label })] }, option.value)); }) }), helperText && ((0, jsx_runtime_1.jsx)("p", { id: helperId, className: "text-sm text-muted-foreground", children: helperText })), error && ((0, jsx_runtime_1.jsx)("p", { id: errorId, className: "text-sm text-destructive", role: "alert", children: error }))] }));
};
exports.AccessibleRadioGroup = AccessibleRadioGroup;
