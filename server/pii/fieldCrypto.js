"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enc = enc;
exports.dec = dec;
var crypto_1 = __importDefault(require("crypto"));
var KEY_ENV = process.env.FILE_ENCRYPTION_KEY;
if (!KEY_ENV || KEY_ENV.length < 32) {
    throw new Error('[PII] FILE_ENCRYPTION_KEY must be >=32 chars');
}
var KEY = Buffer.from(KEY_ENV).subarray(0, 32);
function enc(plain) {
    var iv = crypto_1.default.randomBytes(12);
    var cipher = crypto_1.default.createCipheriv('aes-256-gcm', KEY, iv);
    var ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
    var tag = cipher.getAuthTag();
    return Buffer.concat([iv, tag, ct]).toString('base64');
}
function dec(b64) {
    var raw = Buffer.from(b64, 'base64');
    var iv = raw.subarray(0, 12);
    var tag = raw.subarray(12, 28);
    var ct = raw.subarray(28);
    var decipher = crypto_1.default.createDecipheriv('aes-256-gcm', KEY, iv);
    decipher.setAuthTag(tag);
    var pt = Buffer.concat([decipher.update(ct), decipher.final()]);
    return pt.toString('utf8');
}
