"use strict";
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
exports.useReducedMotion = exports.useHighContrast = exports.useFocusTrap = exports.AccessibilityProvider = exports.useAccessibility = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
var AccessibilityContext = (0, react_1.createContext)(undefined);
var useAccessibility = function () {
    var context = (0, react_1.useContext)(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
};
exports.useAccessibility = useAccessibility;
var AccessibilityProvider = function (_a) {
    var children = _a.children;
    var t = (0, react_i18next_1.useTranslation)().t;
    var _b = (0, react_1.useState)([]), announcements = _b[0], setAnnouncements = _b[1];
    var mainContentRef = (0, react_1.useRef)(null);
    var liveRegionRef = (0, react_1.useRef)(null);
    var announceToScreenReader = function (message, priority) {
        if (priority === void 0) { priority = 'polite'; }
        var id = "announcement-".concat(Date.now());
        setAnnouncements(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ id: id, message: message, priority: priority }], false); });
        // Remove announcement after it's been read
        setTimeout(function () {
            setAnnouncements(function (prev) { return prev.filter(function (announcement) { return announcement.id !== id; }); });
        }, 1000);
    };
    var setPageTitle = function (title) {
        document.title = title;
    };
    var focusMainContent = function () {
        if (mainContentRef.current) {
            mainContentRef.current.focus();
        }
    };
    // Handle keyboard navigation for skip links
    var handleSkipLinkKeyDown = function (event) {
        var _a;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            var targetId = (_a = event.currentTarget.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.replace('#', '');
            var targetElement = document.getElementById(targetId || '');
            if (targetElement) {
                targetElement.focus();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    var contextValue = {
        announceToScreenReader: announceToScreenReader,
        setPageTitle: setPageTitle,
        focusMainContent: focusMainContent,
    };
    return ((0, jsx_runtime_1.jsxs)(AccessibilityContext.Provider, { value: contextValue, children: [(0, jsx_runtime_1.jsx)("div", { className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50", children: (0, jsx_runtime_1.jsx)("nav", { "aria-label": t('accessibility.skipNavigation'), children: (0, jsx_runtime_1.jsxs)("ul", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "#main-content", className: "bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", onKeyDown: handleSkipLinkKeyDown, "aria-label": t('accessibility.skipToMainContent'), children: t('accessibility.skipToMainContent') }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "#navigation", className: "bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", onKeyDown: handleSkipLinkKeyDown, "aria-label": t('accessibility.skipToNavigation'), children: t('accessibility.skipToNavigation') }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "#footer", className: "bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500", onKeyDown: handleSkipLinkKeyDown, "aria-label": t('accessibility.skipToFooter'), children: t('accessibility.skipToFooter') }) })] }) }) }), (0, jsx_runtime_1.jsx)("div", { ref: liveRegionRef, "aria-live": "polite", "aria-atomic": "true", className: "sr-only", role: "status", children: announcements.map(function (announcement) { return ((0, jsx_runtime_1.jsx)("div", { "aria-live": announcement.priority, children: announcement.message }, announcement.id)); }) }), (0, jsx_runtime_1.jsx)("main", { ref: mainContentRef, id: "main-content", tabIndex: -1, className: "outline-none", role: "main", children: children })] }));
};
exports.AccessibilityProvider = AccessibilityProvider;
// Focus trap hook for modals
var useFocusTrap = function (isActive) {
    var containerRef = (0, react_1.useRef)(null);
    var previousFocusRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!isActive)
            return;
        var container = containerRef.current;
        if (!container)
            return;
        // Store the previously focused element
        previousFocusRef.current = document.activeElement;
        // Find all focusable elements within the container
        var focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length === 0)
            return;
        var firstElement = focusableElements[0];
        var lastElement = focusableElements[focusableElements.length - 1];
        // Focus the first element
        firstElement.focus();
        var handleKeyDown = function (event) {
            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    // Shift + Tab: move to previous element
                    if (document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                }
                else {
                    // Tab: move to next element
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return function () {
            document.removeEventListener('keydown', handleKeyDown);
            // Restore focus when trap is deactivated
            if (previousFocusRef.current) {
                previousFocusRef.current.focus();
            }
        };
    }, [isActive]);
    return containerRef;
};
exports.useFocusTrap = useFocusTrap;
// High contrast mode hook
var useHighContrast = function () {
    var _a = (0, react_1.useState)(false), isHighContrast = _a[0], setIsHighContrast = _a[1];
    (0, react_1.useEffect)(function () {
        var mediaQuery = window.matchMedia('(prefers-contrast: high)');
        setIsHighContrast(mediaQuery.matches);
        var handleChange = function (event) {
            setIsHighContrast(event.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return function () { return mediaQuery.removeEventListener('change', handleChange); };
    }, []);
    return isHighContrast;
};
exports.useHighContrast = useHighContrast;
// Reduced motion hook
var useReducedMotion = function () {
    var _a = (0, react_1.useState)(false), prefersReducedMotion = _a[0], setPrefersReducedMotion = _a[1];
    (0, react_1.useEffect)(function () {
        var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        var handleChange = function (event) {
            setPrefersReducedMotion(event.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return function () { return mediaQuery.removeEventListener('change', handleChange); };
    }, []);
    return prefersReducedMotion;
};
exports.useReducedMotion = useReducedMotion;
