"use strict";
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
exports._isAuthenticated = void 0;
exports.getSession = getSession;
exports.setupAuth = setupAuth;
var client = __importStar(require("openid-client"));
var passport_1 = require("openid-client/passport");
var passport_2 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var memoizee_1 = __importDefault(require("memoizee"));
var connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
var storage_1 = require("../models/storage");
var logger_1 = require("./logger");
var env_1 = require("./env");
if (!process.env.REPLIT_DOMAINS) {
    throw new Error('Environment variable REPLIT_DOMAINS not provided');
}
if (!process.env.SESSION_SECRET) {
    throw new Error('Environment variable SESSION_SECRET not provided');
}
var getOidcConfig = (0, memoizee_1.default)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, client.discovery(new URL((_a = process.env.ISSUER_URL) !== null && _a !== void 0 ? _a : 'https://replit.com/oidc'), process.env.REPL_ID)];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); }, { 'maxAge': 3600 * 1000 });
function getSession() {
    var sessionTtl = 24 * 60 * 60 * 1000; // 24 hours
    var pgStore = (0, connect_pg_simple_1.default)(express_session_1.default);
    var sessionStore = new pgStore({
        'conString': process.env.DATABASE_URL,
        'createTableIfMissing': false,
        'ttl': sessionTtl,
        'tableName': 'sessions'
    });
    return (0, express_session_1.default)({
        'secret': env_1.env.SESSION_SECRET,
        'store': sessionStore,
        'resave': false,
        'saveUninitialized': false,
        'name': process.env.NODE_ENV === 'production' ? '__Host-hrms-elite-session' : 'hrms-elite-session',
        'cookie': {
            'httpOnly': true,
            'secure': true,
            'sameSite': 'strict',
            'maxAge': sessionTtl,
            'path': '/'
        }
    });
}
function updateUserSession(user, tokens) {
    var claims = tokens.claims();
    if (claims) {
        user.claims = claims;
    }
    if (tokens.access_token) {
        user.access_token = tokens.access_token;
    }
    if (tokens.refresh_token) {
        user.refresh_token = tokens.refresh_token;
    }
    var exp = claims === null || claims === void 0 ? void 0 : claims.exp;
    if (typeof exp === 'number') {
        user.expires_at = exp;
    }
}
function upsertUser(claims) {
    return __awaiter(this, void 0, void 0, function () {
        var existingUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, storage_1.storage.getUserByEmail(claims['email'])];
                case 1:
                    existingUser = _a.sent();
                    if (!existingUser) return [3 /*break*/, 3];
                    // Update existing user
                    return [4 /*yield*/, storage_1.storage.updateUser(existingUser.id, {
                            'firstName': claims['first_name'],
                            'lastName': claims['last_name'],
                            'profileImageUrl': claims['profile_image_url']
                        })];
                case 2:
                    // Update existing user
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: 
                // Create new user
                return [4 /*yield*/, storage_1.storage.createUser({
                        'id': claims['sub'],
                        'email': claims['email'],
                        'firstName': claims['first_name'],
                        'lastName': claims['last_name'],
                        'password': '', // OAuth users don't need password
                        'profileImageUrl': claims['profile_image_url'],
                        'role': 'worker',
                        'isActive': true,
                        'emailVerified': true
                    })];
                case 4:
                    // Create new user
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    logger_1.log.error('Error upserting user:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function setupAuth(app) {
    return __awaiter(this, void 0, void 0, function () {
        var config, verify, _i, _a, domain, strategy;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    app.set('trust proxy', 1);
                    app.use(getSession());
                    app.use(passport_2.default.initialize());
                    app.use(passport_2.default.session());
                    return [4 /*yield*/, getOidcConfig()];
                case 1:
                    config = _b.sent();
                    verify = function (tokens, verified) { return __awaiter(_this, void 0, void 0, function () {
                        var user, claims;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    user = {};
                                    updateUserSession(user, tokens);
                                    claims = tokens.claims();
                                    if (!claims) return [3 /*break*/, 2];
                                    return [4 /*yield*/, upsertUser(claims)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    verified(null, user);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    for (_i = 0, _a = process.env
                        .REPLIT_DOMAINS.split(','); _i < _a.length; _i++) {
                        domain = _a[_i];
                        strategy = new passport_1.Strategy({
                            'name': "replitauth:".concat(domain),
                            config: config,
                            'scope': 'openid email profile offline_access',
                            'callbackURL': "https://".concat(domain, "/api/callback")
                        }, verify);
                        passport_2.default.use(strategy);
                    }
                    passport_2.default.serializeUser(function (user, cb) { return cb(null, user); });
                    passport_2.default.deserializeUser(function (user, cb) { return cb(null, user); });
                    app.get('/api/login', function (req, res, next) {
                        var authenticateOptions = {
                            'prompt': 'login consent',
                            'scope': ['openid', 'email', 'profile', 'offline_access']
                        };
                        var authenticate = passport_2.default.authenticate;
                        authenticate("replitauth:".concat(req.hostname), authenticateOptions)(req, res, next);
                    });
                    app.get('/api/callback', function (req, res, next) {
                        var authenticateOptions = {
                            'successReturnToOrRedirect': '/',
                            'failureRedirect': '/api/login'
                        };
                        var authenticate = passport_2.default.authenticate;
                        authenticate("replitauth:".concat(req.hostname), authenticateOptions)(req, res, next);
                    });
                    app.get('/api/logout', function (req, res) {
                        req.logout(function () {
                            res.redirect(client.buildEndSessionUrl(config, {
                                'client_id': process.env.REPL_ID,
                                'post_logout_redirect_uri': "".concat(req.protocol, "://").concat(req.hostname)
                            }).href);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var _isAuthenticated = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, now, refreshToken, config, tokenResponse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                if (!req.isAuthenticated() || !user.expires_at) {
                    return [2 /*return*/, res.status(401).json({ 'message': 'Unauthorized' })];
                }
                now = Math.floor(Date.now() / 1000);
                if (now <= user.expires_at) {
                    return [2 /*return*/, next()];
                }
                refreshToken = user.refresh_token;
                if (!refreshToken) {
                    res.status(401).json({ 'message': 'Unauthorized' });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, getOidcConfig()];
            case 2:
                config = _a.sent();
                return [4 /*yield*/, client.refreshTokenGrant(config, refreshToken)];
            case 3:
                tokenResponse = _a.sent();
                updateUserSession(user, tokenResponse);
                return [2 /*return*/, next()];
            case 4:
                error_2 = _a.sent();
                logger_1.log.error('Token refresh error:', error_2);
                res.status(401).json({ 'message': 'Unauthorized' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports._isAuthenticated = _isAuthenticated;
