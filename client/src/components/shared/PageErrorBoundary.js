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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageErrorBoundary = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("../ui/button");
var card_1 = require("../ui/card");
var logger_1 = __importDefault(require("../../lib/logger"));
var PageErrorBoundary = /** @class */ (function (_super) {
    __extends(PageErrorBoundary, _super);
    function PageErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.handleRetry = function () {
            _this.setState({ 'hasError': false, 'error': null });
        };
        _this.state = { 'hasError': false };
        return _this;
    }
    PageErrorBoundary.getDerivedStateFromError = function (error) {
        return { 'hasError': true, error: error };
    };
    PageErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        var _a;
        logger_1.default.error("PageErrorBoundary caught an error in ".concat((_a = this.props.pageName) !== null && _a !== void 0 ? _a : "unknown page"), { error: error, errorInfo: errorInfo }, 'PageErrorBoundary');
        this.setState({ error: error });
    };
    PageErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "container mx-auto px-4 py-8", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "max-w-md mx-auto", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { className: "text-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto mb-4 w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, { className: "h-6 w-6 text-red-600 dark:text-red-400" }) }), (0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-lg text-red-600 dark:text-red-400", children: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground text-center text-sm", children: this.props.pageName
                                        ? "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062A\u062D\u0645\u064A\u0644 \u0635\u0641\u062D\u0629 \"".concat(this.props.pageName, "\"")
                                        : 'حدث خطأ أثناء تحميل هذه الصفحة' }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: this.handleRetry, className: "w-full gap-2", variant: "default", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, { className: "h-4 w-4" }), "\u0625\u0639\u0627\u062F\u0629 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0635\u0641\u062D\u0629"] })] })] }) }));
        }
        return this.props.children;
    };
    return PageErrorBoundary;
}(react_1.Component));
exports.PageErrorBoundary = PageErrorBoundary;
exports.default = PageErrorBoundary;
