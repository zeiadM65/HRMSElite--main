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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logVite = logVite;
exports.setupVite = setupVite;
exports.serveStatic = serveStatic;
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var vite_1 = require("vite");
var vite_config_1 = __importDefault(require("../../vite.config"));
var nanoid_1 = require("nanoid");
var logger_1 = require("./logger");
var errorMessages_1 = require("./errorMessages");
var viteLogger = (0, vite_1.createLogger)();
function logVite(message, source) {
    if (source === void 0) { source = 'express'; }
    var formattedTime = new Date().toLocaleTimeString('en-US', {
        'hour': 'numeric',
        'minute': '2-digit',
        'second': '2-digit',
        'hour12': true
    });
    logger_1.log.info("".concat(formattedTime, " [").concat(source, "] ").concat(message), undefined, 'VITE');
}
function setupVite(app, server) {
    return __awaiter(this, void 0, void 0, function () {
        var serverOptions, vite;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    serverOptions = {
                        'hmr': { server: server },
                        'allowedHosts': true
                    };
                    return [4 /*yield*/, (0, vite_1.createServer)(__assign(__assign({}, vite_config_1.default), { 'configFile': false, 'customLogger': __assign(__assign({}, viteLogger), { 'error': function (msg, options) {
                                    viteLogger.error(msg, options);
                                    process.exit(1);
                                } }), 'server': serverOptions, 'appType': 'custom' }))];
                case 1:
                    vite = _a.sent();
                    app.use(vite.middlewares);
                    app.use('*', function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                        var url, clientTemplate, template, locale, dir, page, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    url = req.originalUrl;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 5]);
                                    clientTemplate = path_1.default.resolve(import.meta.dirname, '..', '..', 'client', 'index.html');
                                    return [4 /*yield*/, fs_1.default.promises.readFile(clientTemplate, 'utf-8')];
                                case 2:
                                    template = _a.sent();
                                    template = template.replace('src="/src/main.tsx"', "src=\"/src/main.tsx?v=".concat((0, nanoid_1.nanoid)(), "\""));
                                    locale = (0, errorMessages_1.getLocale)(req.headers['accept-language']);
                                    dir = locale === 'ar' ? 'rtl' : 'ltr';
                                    template = template
                                        .replace('%LANG%', locale)
                                        .replace('%DIR%', dir);
                                    return [4 /*yield*/, vite.transformIndexHtml(url, template)];
                                case 3:
                                    page = _a.sent();
                                    res
                                        .status(200)
                                        .set({ 'Content-Type': 'text/html', 'Content-Language': locale })
                                        .end(page);
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_1 = _a.sent();
                                    vite.ssrFixStacktrace(e_1);
                                    next(e_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
function serveStatic(app) {
    var distPath = path_1.default.resolve(import.meta.dirname, '..', '..', 'dist');
    if (!fs_1.default.existsSync(distPath)) {
        throw new Error("Could not find the build directory: ".concat(distPath, ", make sure to build the client first"));
    }
    app.use(express_1.default.static(distPath, { index: false }));
    app.get('*', function (req, res, next) {
        try {
            var locale = (0, errorMessages_1.getLocale)(req.headers['accept-language']);
            var dir = locale === 'ar' ? 'rtl' : 'ltr';
            var indexPath = path_1.default.resolve(distPath, 'index.html');
            var template = fs_1.default.readFileSync(indexPath, 'utf-8');
            template = template.replace('%LANG%', locale).replace('%DIR%', dir);
            // Inject CSP nonce into module scripts and inline styles in production
            var nonce_1 = res.locals.cspNonce || '';
            if (nonce_1) {
                // Add nonce to <script type="module" ...> (with or without quotes)
                template = template.replace(/<script(?![^>]*\bnonce=)([^>]*\btype=("|')module\2[^>]*)>/g, function (_m, attrs) { return "<script nonce=\"".concat(nonce_1, "\"").concat(attrs, ">"); });
                template = template.replace(/<script(?![^>]*\bnonce=)([^>]*\btype=module[^>]*)>/g, function (_m, attrs) { return "<script nonce=\"".concat(nonce_1, "\"").concat(attrs, ">"); });
                // Add nonce to inline <style> tags when missing or replace existing
                template = template
                    .replace(/<style(?![^>]*\bnonce=)([^>]*)>/g, function (_m, attrs) { return "<style nonce=\"".concat(nonce_1, "\"").concat(attrs, ">"); })
                    .replace(/<style[^>]*\bnonce="[^"]*"/g, function (m) { return m.replace(/nonce="[^"]*"/, "nonce=\"".concat(nonce_1, "\"")); });
            }
            res
                .status(200)
                .set({ 'Content-Type': 'text/html', 'Content-Language': locale })
                .send(template);
        }
        catch (e) {
            next(e);
        }
    });
}
