"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ErrorBoundary = void 0;
exports.withErrorBoundary = withErrorBoundary;
exports.SimpleErrorFallback = SimpleErrorFallback;
exports.NetworkErrorFallback = NetworkErrorFallback;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var logger_1 = __importDefault(require("../../lib/logger"));
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { 'hasError': false };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return { 'hasError': true, error: error };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        // Log the error using our internal logger
        logger_1.default.error('React Error Boundary Caught Error', {
            'error': {
                'message': error.message,
                'stack': error.stack,
                'name': error.name
            },
            'componentStack': errorInfo.componentStack,
            errorInfo: errorInfo
        }, 'ErrorBoundary');
        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
        // Update state with error info
        this.setState({ errorInfo: errorInfo });
    };
    ErrorBoundary.prototype.render = function () {
        var _a;
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback && this.state.error) {
                var fallbackProps = {
                    'error': this.state.error
                };
                if (this.state.errorInfo) {
                    fallbackProps.errorInfo = this.state.errorInfo;
                }
                return react_1.default.createElement(this.props.fallback, fallbackProps);
            }
            // Default error UI
            return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-background", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center space-y-6 p-8", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-8 h-8 text-red-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-foreground", children: "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground", children: "\u0639\u0630\u0631\u0627\u064B\u060C \u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062D\u0629. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649." })] }), process.env.NODE_ENV === 'development' && this.state.error && ((0, jsx_runtime_1.jsxs)("details", { className: "text-left max-w-md mx-auto", children: [(0, jsx_runtime_1.jsx)("summary", { className: "cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground", children: "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062E\u0637\u0623 (\u0644\u0644\u0623\u063A\u0631\u0627\u0636 \u0627\u0644\u062A\u0637\u0648\u064A\u0631\u064A\u0629)" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 p-4 bg-muted rounded-lg text-xs font-mono text-muted-foreground overflow-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0627\u0644\u062E\u0637\u0623:" }), " ", this.state.error.message] }), this.state.error.stack && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Stack Trace:" }), (0, jsx_runtime_1.jsx)("pre", { className: "whitespace-pre-wrap", children: this.state.error.stack })] })), ((_a = this.state.errorInfo) === null || _a === void 0 ? void 0 : _a.componentStack) && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Component Stack:" }), (0, jsx_runtime_1.jsx)("pre", { className: "whitespace-pre-wrap", children: this.state.errorInfo.componentStack })] }))] }) })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return window.location.reload(); }, className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors", children: "\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return window.history.back(); }, className: "px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors", children: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629" })] }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-muted-foreground", children: "\u0625\u0630\u0627 \u0627\u0633\u062A\u0645\u0631\u062A \u0627\u0644\u0645\u0634\u0643\u0644\u0629\u060C \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u062F\u0639\u0645 \u0627\u0644\u0641\u0646\u064A" })] }) }));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(react_1.default.Component));
exports.ErrorBoundary = ErrorBoundary;
// Higher-order component for wrapping components with error boundary
function withErrorBoundary(WrappedComponent, fallback) {
    return function WithErrorBoundaryComponent(props) {
        return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { fallback: fallback, children: (0, jsx_runtime_1.jsx)(WrappedComponent, __assign({}, props)) }));
    };
}
// Simple error fallback component
function SimpleErrorFallback(_a) {
    var error = _a.error;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold text-red-600", children: "\u062D\u062F\u062B \u062E\u0637\u0623" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mb-4", children: error.message }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return window.location.reload(); }, className: "px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90", children: "\u062A\u062D\u062F\u064A\u062B" })] }));
}
// Network error fallback component
function NetworkErrorFallback() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "p-4 text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-lg font-semibold text-orange-600", children: "\u0645\u0634\u0643\u0644\u0629 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-600 mb-4", children: "\u064A\u0628\u062F\u0648 \u0623\u0646 \u0647\u0646\u0627\u0643 \u0645\u0634\u0643\u0644\u0629 \u0641\u064A \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u062E\u0627\u062F\u0645. \u064A\u0631\u062C\u0649 \u0627\u0644\u062A\u062D\u0642\u0642 \u0645\u0646 \u0627\u062A\u0635\u0627\u0644 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A \u0648\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649." }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return window.location.reload(); }, className: "px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90", children: "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629" })] }));
}
