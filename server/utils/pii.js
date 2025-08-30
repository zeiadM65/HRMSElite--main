"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_RETENTION_CONFIG = exports.PII_CLASSIFICATION = void 0;
exports.maskPII = maskPII;
exports.PII_CLASSIFICATION = {
    users: { email: 'email' },
    employees: {
        email: 'email',
        phone: 'phone',
        passportNumber: 'id',
        civilId: 'id',
        residenceNumber: 'id',
    },
    companies: {
        email: 'email',
        phone: 'phone',
        commercialFileNumber: 'id',
        commercialRegistrationNumber: 'id',
        taxNumber: 'id',
    },
    sessions: { sess: 'id' },
    notifications: { message: 'id', data: 'id' },
    employeeLeaves: { reason: 'id' },
};
// Build default retention configuration for each table
exports.DEFAULT_RETENTION_CONFIG = {
    sessions: {
        retentionPeriod: 30,
        action: 'delete',
        piiFields: ['sess'],
        conditions: "expire < (unixepoch() - 2592000)",
    },
    employees: {
        retentionPeriod: 2555,
        action: 'mask',
        piiFields: ['firstName', 'lastName', 'passportNumber', 'civilId', 'phone', 'email', 'address'],
        conditions: "status = 'terminated' AND updated_at < (unixepoch() - 220752000)",
    },
    notifications: {
        retentionPeriod: 90,
        action: 'delete',
        piiFields: ['message', 'data'],
        conditions: "created_at < (unixepoch() - 7776000)",
    },
    employeeLeaves: {
        retentionPeriod: 1825,
        action: 'archive',
        piiFields: ['reason'],
        conditions: "created_at < (unixepoch() - 157680000)",
    },
    users: {
        retentionPeriod: 1825,
        action: 'delete',
        piiFields: ['email'],
        conditions: "is_active = 0 AND updated_at < (unixepoch() - 157680000)",
    },
    companies: {
        retentionPeriod: 3650,
        action: 'mask',
        piiFields: ['email', 'phone', 'commercialFileNumber', 'commercialRegistrationNumber', 'taxNumber'],
        conditions: "is_active = 0 AND updated_at < (unixepoch() - 315360000)",
    },
};
// Helper sets for masking
var emailFields = new Set();
var phoneFields = new Set();
var idFields = new Set();
for (var _i = 0, _a = Object.values(exports.PII_CLASSIFICATION); _i < _a.length; _i++) {
    var fields = _a[_i];
    for (var _b = 0, _c = Object.entries(fields); _b < _c.length; _b++) {
        var _d = _c[_b], field = _d[0], type = _d[1];
        if (type === 'email')
            emailFields.add(field);
        else if (type === 'phone')
            phoneFields.add(field);
        else if (type === 'id')
            idFields.add(field);
    }
}
function maskEmail(value) {
    var _a = value.split('@'), local = _a[0], domain = _a[1];
    var maskedLocal = local.length > 2 ? "".concat(local.slice(0, 2), "***") : '***';
    return domain ? "".concat(maskedLocal, "@").concat(domain) : maskedLocal;
}
function maskPhone(value) {
    return value.replace(/\d(?=\d{2})/g, '*');
}
function maskId(value) {
    return value.replace(/.(?=.{4})/g, '*');
}
function maskPII(input) {
    if (typeof input === 'string') {
        return input;
    }
    if (Array.isArray(input)) {
        return input.map(function (item) { return maskPII(item); });
    }
    if (input && typeof input === 'object') {
        var result = {};
        for (var _i = 0, _a = Object.entries(input); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (typeof value === 'string') {
                if (emailFields.has(key))
                    result[key] = maskEmail(value);
                else if (phoneFields.has(key))
                    result[key] = maskPhone(value);
                else if (idFields.has(key))
                    result[key] = maskId(value);
                else
                    result[key] = value;
            }
            else {
                result[key] = maskPII(value);
            }
        }
        return result;
    }
    return input;
}
