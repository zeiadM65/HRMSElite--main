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
exports.buttonVariants = exports.AccessibleButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var class_variance_authority_1 = require("class-variance-authority");
var utils_1 = require("../../lib/utils");
var AccessibilityProvider_1 = require("../shared/AccessibilityProvider");
var buttonVariants = (0, class_variance_authority_1.cva)('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
exports.buttonVariants = buttonVariants;
var AccessibleButton = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, variant = _a.variant, size = _a.size, _b = _a.asChild, asChild = _b === void 0 ? false : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, loadingText = _a.loadingText, pressed = _a.pressed, expanded = _a.expanded, hasPopup = _a.hasPopup, controls = _a.controls, describedBy = _a.describedBy, liveRegion = _a.liveRegion, announcement = _a.announcement, children = _a.children, onClick = _a.onClick, disabled = _a.disabled, ariaLabel = _a["aria-label"], ariaLabelledBy = _a["aria-labelledby"], props = __rest(_a, ["className", "variant", "size", "asChild", "loading", "loadingText", "pressed", "expanded", "hasPopup", "controls", "describedBy", "liveRegion", "announcement", "children", "onClick", "disabled", 'aria-label', 'aria-labelledby']);
    var announceToScreenReader = (0, AccessibilityProvider_1.useAccessibility)().announceToScreenReader;
    var buttonRef = (0, react_1.useRef)(null);
    var combinedRef = function (node) {
        buttonRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    };
    // Handle click with accessibility announcements
    var handleClick = function (event) {
        if (loading || disabled) {
            event.preventDefault();
            return;
        }
        // Announce to screen reader if specified
        if (announcement) {
            announceToScreenReader(announcement, liveRegion === 'assertive' ? 'assertive' : 'polite');
        }
        // Call original onClick
        if (onClick) {
            onClick(event);
        }
    };
    // Handle keyboard interactions
    var handleKeyDown = function (event) {
        var _a;
        // Handle Enter and Space key activation
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (!loading && !disabled) {
                (_a = buttonRef.current) === null || _a === void 0 ? void 0 : _a.click();
            }
        }
    };
    // Auto-focus management for important buttons
    (0, react_1.useEffect)(function () {
        if (props.autoFocus && buttonRef.current) {
            buttonRef.current.focus();
        }
    }, [props.autoFocus]);
    // Build ARIA attributes
    var ariaAttributes = {};
    if (pressed !== undefined) {
        ariaAttributes['aria-pressed'] = pressed;
    }
    if (expanded !== undefined) {
        ariaAttributes['aria-expanded'] = expanded;
    }
    if (hasPopup) {
        ariaAttributes['aria-haspopup'] = hasPopup;
    }
    if (controls) {
        ariaAttributes['aria-controls'] = controls;
    }
    if (describedBy) {
        ariaAttributes['aria-describedby'] = describedBy;
    }
    if (liveRegion && liveRegion !== 'off') {
        ariaAttributes['aria-live'] = liveRegion;
    }
    // Add loading state attributes
    if (loading) {
        ariaAttributes['aria-busy'] = true;
        ariaAttributes['aria-disabled'] = true;
    }
    return ((0, jsx_runtime_1.jsxs)("button", __assign({ className: (0, utils_1.cn)(buttonVariants({ variant: variant, size: size, className: className })), ref: combinedRef, onClick: handleClick, onKeyDown: handleKeyDown, disabled: disabled || loading, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy }, ariaAttributes, props, { children: [loading && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("svg", { className: "mr-2 h-4 w-4 animate-spin", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), (0, jsx_runtime_1.jsx)("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), loadingText && (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: loadingText })] })), children] })));
});
exports.AccessibleButton = AccessibleButton;
AccessibleButton.displayName = 'AccessibleButton';
