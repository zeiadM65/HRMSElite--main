"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertDatabaseEncryption = assertDatabaseEncryption;
function assertDatabaseEncryption() {
    var _a;
    var enabled = ((_a = process.env.DB_ENCRYPTION_ENABLED) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true';
    var key = process.env.DB_ENCRYPTION_KEY || '';
    if (!enabled) {
        console.error('[DB] Encryption is mandatory: set DB_ENCRYPTION_ENABLED=true');
        process.exit(1);
    }
    if (key.length < 32) {
        console.error('[DB] DB_ENCRYPTION_KEY must be >=32 chars');
        process.exit(1);
    }
}
