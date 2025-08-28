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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorBoundary = exports.EnhancedErrorBoundary = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var lucide_react_1 = require("lucide-react");
var button_1 = require("../ui/button");
var card_1 = require("../ui/card");
var badge_1 = require("../ui/badge");
var separator_1 = require("../ui/separator");
var logger_1 = __importDefault(require("../../lib/logger"));
var react_i18next_1 = require("react-i18next");
// Loading fallback component
var LoadingFallback = function () {
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: (0, jsx_runtime_1.jsx)(card_1.Card, { className: "w-full max-w-md", children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "flex items-center justify-center p-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }), (0, jsx_runtime_1.jsx)("span", { className: "mr-3 text-muted-foreground", children: t('common.loading') })] }) }) }));
};
// Error details component with React.memo for performance
var ErrorDetails = react_1.default.memo(function (_a) {
    var error = _a.error, errorInfo = _a.errorInfo;
    var t = (0, react_i18next_1.useTranslation)().t;
    return ((0, jsx_runtime_1.jsxs)("details", { className: "bg-muted p-4 rounded-lg text-sm space-y-3", children: [(0, jsx_runtime_1.jsxs)("summary", { className: "cursor-pointer font-medium mb-3 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bug, { className: "h-4 w-4" }), t('errors.details')] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-destructive", children: t('errors.errorLabel') }), (0, jsx_runtime_1.jsx)("pre", { className: "mt-2 text-xs bg-background p-3 rounded overflow-auto border", children: error.message })] }), errorInfo && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-destructive", children: t('errors.additionalInfo') }), (0, jsx_runtime_1.jsx)("pre", { className: "mt-2 text-xs bg-background p-3 rounded overflow-auto border", children: errorInfo.componentStack })] })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { className: "text-destructive", children: "Stack Trace:" }), (0, jsx_runtime_1.jsx)("pre", { className: "mt-2 text-xs bg-background p-3 rounded overflow-auto border", children: error.stack })] })] })] }));
});
ErrorDetails.displayName = 'ErrorDetails';
var EnhancedErrorBoundary = /** @class */ (function (_super) {
    __extends(EnhancedErrorBoundary, _super);
    function EnhancedErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.logErrorToService = function (error, errorInfo) {
            // In a real application, you would send this to your error tracking service
            // Example: Sentry, LogRocket, etc.
            try {
                var _errorData = {
                    'message': error.message,
                    'stack': error.stack,
                    'componentStack': errorInfo.componentStack,
                    'timestamp': new Date().toISOString(),
                    'userAgent': navigator.userAgent,
                    'url': window.location.href,
                    'errorId': _this.state.errorId
                };
                // Send to your error tracking service
            }
            catch (logError) {
                logger_1.default.error('Failed to log error to service:', logError);
            }
        };
        _this.handleRetry = function () {
            _this.setState(function (prevState) { return ({
                'hasError': false,
                'retryCount': prevState.retryCount + 1
            }); });
        };
        _this.handleGoHome = function () {
            window.location.href = '/';
        };
        _this.handleReload = function () {
            window.location.reload();
        };
        _this.handleReportError = function () {
            var _a = _this.state, error = _a.error, errorInfo = _a.errorInfo, errorId = _a.errorId;
            if (error) {
                var _errorReport = {
                    errorId: errorId,
                    'message': error.message,
                    'stack': error.stack,
                    'componentStack': errorInfo === null || errorInfo === void 0 ? void 0 : errorInfo.componentStack,
                    'url': window.location.href,
                    'timestamp': new Date().toISOString()
                };
                // In a real application, you would send this to your support system
                // Show success message
                window.alert(_this.props.t('errors.sent'));
            }
        };
        _this.state = {
            'hasError': false,
            'retryCount': 0
        };
        return _this;
    }
    EnhancedErrorBoundary.getDerivedStateFromError = function (error) {
        return {
            'hasError': true,
            error: error,
            'errorId': "error-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9))
        };
    };
    EnhancedErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        // Log error to console
        logger_1.default.error('EnhancedErrorBoundary caught an error', error, 'EnhancedErrorBoundary');
        // Update state with error details
        this.setState({ error: error, errorInfo: errorInfo });
        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
        // Log to external service in production
        if (process.env.NODE_ENV === 'production') {
            this.logErrorToService(error, errorInfo);
        }
    };
    EnhancedErrorBoundary.prototype.componentDidUpdate = function (prevProps) {
        // Reset error state when props change (if enabled)
        if (this.props.resetOnPropsChange && prevProps.children !== this.props.children) {
            this.setState({
                'hasError': false
            });
        }
    };
    EnhancedErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }
            var _a = this.state, error = _a.error, errorInfo = _a.errorInfo, retryCount = _a.retryCount;
            var t = this.props.t;
            return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full max-w-lg", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto mb-4 w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-8 w-8 text-red-600 dark:text-red-400" }) }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-xl text-red-600 dark:text-red-400", children: t('errors.unexpected') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-foreground mt-2", children: t('errors.pageLoad') })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-2", children: [(0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "outline", className: "text-xs", children: t('errors.retryAttempt', { count: retryCount + 1 }) }), error && ((0, jsx_runtime_1.jsx)(badge_1.Badge, { variant: "destructive", className: "text-xs", children: error.name }))] }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground text-center text-sm", children: t('errors.tryAgainOrHome') }), this.props.showDetails && error && ((0, jsx_runtime_1.jsx)(ErrorDetails, { error: error, errorInfo: errorInfo })), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: this.handleRetry, className: "flex-1 gap-2", variant: "default", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-4 w-4" }), t('errors.retry')] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: this.handleGoHome, className: "flex-1 gap-2", variant: "outline", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Home, { className: "h-4 w-4" }), t('errors.home')] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: this.handleReload, className: "flex-1 gap-2", variant: "outline", size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-4 w-4" }), t('errors.reload')] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: this.handleReportError, className: "flex-1 gap-2", variant: "outline", size: "sm", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Info, { className: "h-4 w-4" }), t('errors.report')] })] })] })] }) }));
        }
        // Wrap children with Suspense for better loading experience
        return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)(LoadingFallback, {}), children: this.props.children }));
    };
    return EnhancedErrorBoundary;
}(react_1.Component));
exports.EnhancedErrorBoundary = EnhancedErrorBoundary;
// HOC for wrapping components with error boundary
var TranslatedErrorBoundary = (0, react_i18next_1.withTranslation)()(EnhancedErrorBoundary);
var withErrorBoundary = function (Component, errorBoundaryProps) {
    var _a;
    var WrappedComponent = function (props) { return ((0, jsx_runtime_1.jsx)(TranslatedErrorBoundary, __assign({}, errorBoundaryProps, { children: (0, jsx_runtime_1.jsx)(Component, __assign({}, props)) }))); };
    WrappedComponent.displayName = "withErrorBoundary(".concat((_a = Component.displayName) !== null && _a !== void 0 ? _a : Component.name, ")");
    return WrappedComponent;
};
exports.withErrorBoundary = withErrorBoundary;
exports.default = TranslatedErrorBoundary;
