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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = exports.sendPasswordResetEmail = exports.sendVerificationEmail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var logger_1 = require("./logger");
/**
 * Email utility functions for HRMS Elite
 * Handles sending verification and password reset emails
 */
// Email configuration
var EMAIL_CONFIG = {
    'host': (_a = process.env.SMTP_HOST) !== null && _a !== void 0 ? _a : 'smtp.gmail.com',
    'port': parseInt((_b = process.env.SMTP_PORT) !== null && _b !== void 0 ? _b : '587'),
    'secure': false, // true for 465, false for other ports
    'auth': {
        'user': (_c = process.env.SMTP_USER) !== null && _c !== void 0 ? _c : '',
        'pass': (_d = process.env.SMTP_PASS) !== null && _d !== void 0 ? _d : ''
    }
};
var FROM_EMAIL = (_e = process.env.SMTP_FROM) !== null && _e !== void 0 ? _e : 'noreply@hrms-elite.com';
var APP_NAME = 'HRMS Elite';
var BASE_URL = (_f = process.env.BASE_URL) !== null && _f !== void 0 ? _f : 'http://localhost:3000';
/**
 * Create email transporter
 * @returns Nodemailer transporter
 */
var createTransporter = function () {
    return nodemailer_1.default.createTransport(EMAIL_CONFIG);
};
/**
 * Send email verification email
 * @param email - User's email address
 * @param token - Verification token
 * @param firstName - User's first name
 * @returns Promise<boolean> - Success status
 */
var sendVerificationEmail = function (email, token, firstName) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, verificationUrl, mailOptions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                transporter = createTransporter();
                verificationUrl = "".concat(BASE_URL, "/verify-email?token=").concat(token);
                mailOptions = {
                    'from': FROM_EMAIL,
                    'to': email,
                    'subject': "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A - ".concat(APP_NAME),
                    'html': "\n        <div dir=\"rtl\" style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n          <h2 style=\"color: #2c3e50;\">\u0645\u0631\u062D\u0628\u0627\u064B ".concat(firstName, "!</h2>\n          <p>\u0634\u0643\u0631\u0627\u064B \u0644\u0643 \u0639\u0644\u0649 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0641\u064A ").concat(APP_NAME, ".</p>\n          <p>\u064A\u0631\u062C\u0649 \u062A\u0623\u0643\u064A\u062F \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0628\u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0631\u0627\u0628\u0637 \u0623\u062F\u0646\u0627\u0647:</p>\n          <div style=\"text-align: center; margin: 30px 0;\">\n            <a href=\"").concat(verificationUrl, "\" \n               style=\"background-color: #3498db; color: white; padding: 12px 24px; \n                      text-decoration: none; border-radius: 5px; display: inline-block;\">\n              \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\n            </a>\n          </div>\n          <p>\u0623\u0648 \u0627\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A \u0625\u0644\u0649 \u0645\u062A\u0635\u0641\u062D\u0643:</p>\n          <p style=\"word-break: break-all; color: #7f8c8d;\">").concat(verificationUrl, "</p>\n          <p>\u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637 \u0635\u0627\u0644\u062D \u0644\u0645\u062F\u0629 24 \u0633\u0627\u0639\u0629 \u0641\u0642\u0637.</p>\n          <hr style=\"margin: 30px 0; border: none; border-top: 1px solid #ecf0f1;\">\n          <p style=\"color: #7f8c8d; font-size: 12px;\">\n            \u0625\u0630\u0627 \u0644\u0645 \u062A\u0642\u0645 \u0628\u0625\u0646\u0634\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u062D\u0633\u0627\u0628\u060C \u064A\u0645\u0643\u0646\u0643 \u062A\u062C\u0627\u0647\u0644 \u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A.\n          </p>\n        </div>\n      "),
                    'text': "\n        \u0645\u0631\u062D\u0628\u0627\u064B ".concat(firstName, "!\n        \n        \u0634\u0643\u0631\u0627\u064B \u0644\u0643 \u0639\u0644\u0649 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0641\u064A ").concat(APP_NAME, ".\n        \n        \u064A\u0631\u062C\u0649 \u062A\u0623\u0643\u064A\u062F \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0628\u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A:\n        ").concat(verificationUrl, "\n        \n        \u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637 \u0635\u0627\u0644\u062D \u0644\u0645\u062F\u0629 24 \u0633\u0627\u0639\u0629 \u0641\u0642\u0637.\n        \n        \u0625\u0630\u0627 \u0644\u0645 \u062A\u0642\u0645 \u0628\u0625\u0646\u0634\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u062D\u0633\u0627\u0628\u060C \u064A\u0645\u0643\u0646\u0643 \u062A\u062C\u0627\u0647\u0644 \u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A.\n      ")
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 1:
                _a.sent();
                logger_1.log.info("Verification email sent to ".concat(email), undefined, 'EMAIL');
                return [2 /*return*/, true];
            case 2:
                error_1 = _a.sent();
                logger_1.log.error("Error sending verification email to ".concat(email, ":"), error_1, 'EMAIL');
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendVerificationEmail = sendVerificationEmail;
/**
 * Send password reset email
 * @param email - User's email address
 * @param token - Reset token
 * @param firstName - User's first name
 * @returns Promise<boolean> - Success status
 */
var sendPasswordResetEmail = function (email, token, firstName) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, resetUrl, mailOptions, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                transporter = createTransporter();
                resetUrl = "".concat(BASE_URL, "/reset-password?token=").concat(token);
                mailOptions = {
                    'from': FROM_EMAIL,
                    'to': email,
                    'subject': "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 - ".concat(APP_NAME),
                    'html': "\n        <div dir=\"rtl\" style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n          <h2 style=\"color: #2c3e50;\">\u0645\u0631\u062D\u0628\u0627\u064B ".concat(firstName, "!</h2>\n          <p>\u0644\u0642\u062F \u062A\u0644\u0642\u064A\u0646\u0627 \u0637\u0644\u0628\u0627\u064B \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643.</p>\n          <p>\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0631\u0627\u0628\u0637 \u0623\u062F\u0646\u0627\u0647 \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631:</p>\n          <div style=\"text-align: center; margin: 30px 0;\">\n            <a href=\"").concat(resetUrl, "\" \n               style=\"background-color: #e74c3c; color: white; padding: 12px 24px; \n                      text-decoration: none; border-radius: 5px; display: inline-block;\">\n              \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\n            </a>\n          </div>\n          <p>\u0623\u0648 \u0627\u0646\u0633\u062E \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A \u0625\u0644\u0649 \u0645\u062A\u0635\u0641\u062D\u0643:</p>\n          <p style=\"word-break: break-all; color: #7f8c8d;\">").concat(resetUrl, "</p>\n          <p>\u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637 \u0635\u0627\u0644\u062D \u0644\u0645\u062F\u0629 \u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u0642\u0637.</p>\n          <p>\u0625\u0630\u0627 \u0644\u0645 \u062A\u0637\u0644\u0628 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u060C \u064A\u0645\u0643\u0646\u0643 \u062A\u062C\u0627\u0647\u0644 \u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A.</p>\n          <hr style=\"margin: 30px 0; border: none; border-top: 1px solid #ecf0f1;\">\n          <p style=\"color: #7f8c8d; font-size: 12px;\">\n            \u0644\u0623\u0633\u0628\u0627\u0628 \u0623\u0645\u0646\u064A\u0629\u060C \u0644\u0646 \u064A\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0627\u0628\u0637 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0639\u064A\u064A\u0646 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.\n          </p>\n        </div>\n      "),
                    'text': "\n        \u0645\u0631\u062D\u0628\u0627\u064B ".concat(firstName, "!\n        \n        \u0644\u0642\u062F \u062A\u0644\u0642\u064A\u0646\u0627 \u0637\u0644\u0628\u0627\u064B \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643.\n        \n        \u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0627\u0644\u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0627\u0644\u064A \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631:\n        ").concat(resetUrl, "\n        \n        \u0647\u0630\u0627 \u0627\u0644\u0631\u0627\u0628\u0637 \u0635\u0627\u0644\u062D \u0644\u0645\u062F\u0629 \u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u0642\u0637.\n        \n        \u0625\u0630\u0627 \u0644\u0645 \u062A\u0637\u0644\u0628 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u060C \u064A\u0645\u0643\u0646\u0643 \u062A\u062C\u0627\u0647\u0644 \u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A.\n      ")
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 1:
                _a.sent();
                logger_1.log.info("Password reset email sent to ".concat(email), undefined, 'EMAIL');
                return [2 /*return*/, true];
            case 2:
                error_2 = _a.sent();
                logger_1.log.error("Error sending password reset email to ".concat(email, ":"), error_2, 'EMAIL');
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendPasswordResetEmail = sendPasswordResetEmail;
/**
 * Send welcome email
 * @param email - User's email address
 * @param firstName - User's first name
 * @returns Promise<boolean> - Success status
 */
var sendWelcomeEmail = function (email, firstName) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter, mailOptions, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                transporter = createTransporter();
                mailOptions = {
                    'from': FROM_EMAIL,
                    'to': email,
                    'subject': "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643 \u0641\u064A ".concat(APP_NAME, "!"),
                    'html': "\n        <div dir=\"rtl\" style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;\">\n          <h2 style=\"color: #2c3e50;\">\u0645\u0631\u062D\u0628\u0627\u064B ".concat(firstName, "!</h2>\n          <p>\u0623\u0647\u0644\u0627\u064B \u0648\u0633\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A ").concat(APP_NAME, "!</p>\n          <p>\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628\u0643 \u0628\u0646\u062C\u0627\u062D \u0648\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0622\u0646 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062C\u0645\u064A\u0639 \u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645.</p>\n          <div style=\"text-align: center; margin: 30px 0;\">\n            <a href=\"").concat(BASE_URL, "/login\" \n               style=\"background-color: #27ae60; color: white; padding: 12px 24px; \n                      text-decoration: none; border-radius: 5px; display: inline-block;\">\n              \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644\n            </a>\n          </div>\n          <p>\u0625\u0630\u0627 \u0643\u0627\u0646 \u0644\u062F\u064A\u0643 \u0623\u064A \u0623\u0633\u0626\u0644\u0629\u060C \u0644\u0627 \u062A\u062A\u0631\u062F\u062F \u0641\u064A \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u062F\u0639\u0645.</p>\n          <hr style=\"margin: 30px 0; border: none; border-top: 1px solid #ecf0f1;\">\n          <p style=\"color: #7f8c8d; font-size: 12px;\">\n            \u0634\u0643\u0631\u0627\u064B \u0644\u0643 \u0639\u0644\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 ").concat(APP_NAME, "!\n          </p>\n        </div>\n      "),
                    'text': "\n        \u0645\u0631\u062D\u0628\u0627\u064B ".concat(firstName, "!\n        \n        \u0623\u0647\u0644\u0627\u064B \u0648\u0633\u0647\u0644\u0627\u064B \u0628\u0643 \u0641\u064A ").concat(APP_NAME, "!\n        \n        \u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628\u0643 \u0628\u0646\u062C\u0627\u062D \u0648\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0622\u0646 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062C\u0645\u064A\u0639 \u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645.\n        \n        \u064A\u0645\u0643\u0646\u0643 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0645\u0646 \u062E\u0644\u0627\u0644: ").concat(BASE_URL, "/login\n        \n        \u0625\u0630\u0627 \u0643\u0627\u0646 \u0644\u062F\u064A\u0643 \u0623\u064A \u0623\u0633\u0626\u0644\u0629\u060C \u0644\u0627 \u062A\u062A\u0631\u062F\u062F \u0641\u064A \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064A\u0642 \u0627\u0644\u062F\u0639\u0645.\n        \n        \u0634\u0643\u0631\u0627\u064B \u0644\u0643 \u0639\u0644\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 ").concat(APP_NAME, "!\n      ")
                };
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 1:
                _a.sent();
                logger_1.log.info("Welcome email sent to ".concat(email), undefined, 'EMAIL');
                return [2 /*return*/, true];
            case 2:
                error_3 = _a.sent();
                logger_1.log.error("Error sending welcome email to ".concat(email, ":"), error_3, 'EMAIL');
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendWelcomeEmail = sendWelcomeEmail;
