"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.validateEnv = validateEnv;
exports.validateSecrets = validateSecrets;
var zod_1 = require("zod");
var logger_1 = require("./logger");
// استبدال القيم الافتراضية للأسرار في ملفات الإعدادات
var DB_SECRET = process.env.DB_SECRET || 'actual_production_secret';
var forbidDefaults = function (name, val) {
    if (!val || val === DB_SECRET)
        throw new Error("Env ".concat(name, " must be set (not placeholder)."));
};
forbidDefaults('JWT_SECRET', process.env.JWT_SECRET);
forbidDefaults('DB_ENCRYPTION_KEY', process.env.DB_ENCRYPTION_KEY);
forbidDefaults('DB_SECRET', DB_SECRET);
/**
 * Environment variable validation schema
 * Ensures all required secrets are present and meet security requirements
 */
var envSchema = zod_1.z.object({
    // Required secrets with minimum length validation
    ACCESS_JWT_SECRET: zod_1.z.string().min(32, 'ACCESS_JWT_SECRET must be at least 32 characters long'),
    REFRESH_JWT_SECRET: zod_1.z.string().min(32, 'REFRESH_JWT_SECRET must be at least 32 characters long'),
    SESSION_SECRET: zod_1.z.string().min(32, 'SESSION_SECRET must be at least 32 characters long'),
    DB_ENCRYPTION_KEY: zod_1.z.string().min(32, 'DB_ENCRYPTION_KEY must be at least 32 characters long'),
    FILE_SIGNATURE_SECRET: zod_1.z.string().min(32, 'FILE_SIGNATURE_SECRET must be at least 32 characters long'),
    FILE_ENCRYPTION_KEY: zod_1.z.string().min(32, 'FILE_ENCRYPTION_KEY must be at least 32 characters long').optional(),
    METRICS_TOKEN: zod_1.z.string().min(32, 'METRICS_TOKEN must be at least 32 characters long').optional(),
    // Optional environment variables with defaults
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.string().default('3001'),
    // File upload configuration
    UPLOAD_MAX_BYTES: zod_1.z.string().default('5242880'),
    // JWT configuration
    JWT_EXPIRES_IN: zod_1.z.string().default('24h'),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('7d'),
    // Database configuration
    DATABASE_URL: zod_1.z.string().optional(),
    DB_ENCRYPTION_KEY_PREVIOUS: zod_1.z.string().min(32).optional(),
    REDIS_URL: zod_1.z.string().optional(),
    // CORS configuration
    CORS_ORIGINS: zod_1.z.string().optional(),
    API_KEYS: zod_1.z.string().optional(),
    INTERNAL_CIDR_ALLOWLIST: zod_1.z.string().optional(),
    // Rate limiting configuration
    RATE_LIMIT_WINDOW_MS: zod_1.z.string().optional(),
    RATE_LIMIT_MAX_REQUESTS: zod_1.z.string().optional(),
    // CSRF configuration
    CSRF_ENABLED: zod_1.z.string().optional(),
    // Development authentication bypass (only for local development)
    ALLOW_DEV_AUTH: zod_1.z.string().optional(),
});
/**
 * Validate and load environment variables
 * @throws Error if required secrets are missing or invalid
 */
function validateEnv() {
    try {
        var env_1 = envSchema.parse(process.env);
        logger_1.log.info('Environment variables validated successfully', {
            nodeEnv: env_1.NODE_ENV,
            port: env_1.PORT,
            jwtExpiresIn: env_1.JWT_EXPIRES_IN,
            jwtRefreshExpiresIn: env_1.JWT_REFRESH_EXPIRES_IN,
            databaseUrl: env_1.DATABASE_URL ? 'configured' : 'using default',
            corsOrigins: env_1.CORS_ORIGINS ? 'configured' : 'not set',
            apiKeys: env_1.API_KEYS ? 'configured' : 'not set',
            internalCidrs: env_1.INTERNAL_CIDR_ALLOWLIST ? 'configured' : 'not set',
            uploadMaxBytes: env_1.UPLOAD_MAX_BYTES,
        }, 'ENV');
        return env_1;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            var missingVars = error.errors.map(function (err) { return err.path.join('.'); }).join(', ');
            var errorMessage = "Environment validation failed. Missing or invalid variables: ".concat(missingVars);
            logger_1.log.error(errorMessage, error, 'ENV');
            throw new Error(errorMessage);
        }
        logger_1.log.error('Unexpected error during environment validation', error, 'ENV');
        throw error;
    }
}
/**
 * Get validated environment configuration
 * This should be called once at application startup
 */
exports.env = validateEnv();
/**
 * Security check for secrets
 * Ensures secrets are not using default/weak values
 */
function validateSecrets() {
    var _a;
    var weakSecrets = [
        'hrms-elite-secret-key-change-in-production',
        'development-secret-key',
        'change-in-production',
        'default-secret',
        '__REPLACE_WITH_STRONG_SECRET__',
        'changeme',
        'your-secret',
        'secret-key',
        'password',
        'admin',
        '123456',
        'test',
        'dev',
    ];
    var secrets = [
        { name: 'ACCESS_JWT_SECRET', value: exports.env.ACCESS_JWT_SECRET },
        { name: 'REFRESH_JWT_SECRET', value: exports.env.REFRESH_JWT_SECRET },
        { name: 'SESSION_SECRET', value: exports.env.SESSION_SECRET },
        { name: 'DB_ENCRYPTION_KEY', value: exports.env.DB_ENCRYPTION_KEY },
        { name: 'FILE_SIGNATURE_SECRET', value: exports.env.FILE_SIGNATURE_SECRET },
    ];
    secrets.forEach(function (_a) {
        var name = _a.name, value = _a.value;
        if (!value || value.length < 32) {
            throw new Error("".concat(name, " is missing or too weak. It must be at least 32 characters long."));
        }
        if (weakSecrets.some(function (weak) { return value.includes(weak) || value === weak; })) {
            throw new Error("".concat(name, " contains weak or default values. Please use a strong, unique secret."));
        }
        var entropy = calculateEntropy(value);
        if (entropy < 3.5) {
            logger_1.log.warn("".concat(name, " has low entropy. Consider using a more random secret."), {
                entropy: entropy,
                minRecommended: 3.5
            }, 'ENV');
        }
    });
    var optionalSecrets = [
        { name: 'FILE_ENCRYPTION_KEY', value: exports.env.FILE_ENCRYPTION_KEY }
    ];
    optionalSecrets.forEach(function (_a) {
        var name = _a.name, value = _a.value;
        if (value) {
            if (value.length < 32) {
                throw new Error("".concat(name, " is missing or too weak. It must be at least 32 characters long."));
            }
            if (weakSecrets.some(function (weak) { return value.includes(weak) || value === weak; })) {
                throw new Error("".concat(name, " contains weak or default values. Please use a strong, unique secret."));
            }
            var entropy = calculateEntropy(value);
            if (entropy < 3.5) {
                logger_1.log.warn("".concat(name, " has low entropy. Consider using a more random secret."), {
                    entropy: entropy,
                    minRecommended: 3.5
                }, 'ENV');
            }
        }
    });
    logger_1.log.info('Secret validation completed successfully', {
        accessJwtSecretLength: exports.env.ACCESS_JWT_SECRET.length,
        refreshJwtSecretLength: exports.env.REFRESH_JWT_SECRET.length,
        sessionSecretLength: exports.env.SESSION_SECRET.length,
        dbEncryptionKeyLength: exports.env.DB_ENCRYPTION_KEY.length,
        fileSignatureSecretLength: exports.env.FILE_SIGNATURE_SECRET.length,
        fileEncryptionKeyLength: ((_a = exports.env.FILE_ENCRYPTION_KEY) === null || _a === void 0 ? void 0 : _a.length) || 0
    }, 'ENV');
}
/**
 * Calculate entropy of a string (measure of randomness)
 * @param str - String to calculate entropy for
 * @returns Entropy value (higher = more random)
 */
function calculateEntropy(str) {
    var charCount = {};
    for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
        var char = str_1[_i];
        charCount[char] = (charCount[char] || 0) + 1;
    }
    var length = str.length;
    var entropy = 0;
    for (var _a = 0, _b = Object.values(charCount); _a < _b.length; _a++) {
        var count = _b[_a];
        var probability = count / length;
        entropy -= probability * Math.log2(probability);
    }
    return entropy;
}
/**
 * Validate environment on module load
 */
validateSecrets();
