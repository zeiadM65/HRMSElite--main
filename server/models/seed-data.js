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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
var db_1 = require("./db");
var logger_1 = __importDefault(require("../utils/logger"));
var schema_1 = require("@shared/schema");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var company, sampleUsers, companyUserRelations, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    logger_1.default.info('🌱 Seeding database with sample data...', undefined, 'SEED_DATA');
                    return [4 /*yield*/, db_1.db.insert(schema_1.companies).values({
                            'id': 'company-1',
                            'name': 'شركة النيل الأزرق للمجوهرات',
                            'commercialFileNumber': '2023-001-NBJ',
                            'commercialFileName': 'شركة النيل الأزرق للمجوهرات وتجارة الذهب',
                            'establishmentDate': '2019-05-15',
                            'commercialRegistrationNumber': 'REG-2019-NBJ-001',
                            'classification': 'retail_jewelry',
                            'department': 'Jewelry & Gold Trading',
                            'fileType': 'limited_liability',
                            'legalEntity': 'شركة ذات مسؤولية محدودة',
                            'ownershipCategory': 'private',
                            'address': 'الكويت، المباركية، سوق الذهب',
                            'phone': '+965 2245 6789',
                            'email': 'info@nileblue-jewelry.com.kw',
                            'website': 'https://nileblue-jewelry.com.kw',
                            'totalEmployees': 45,
                            'totalLicenses': 6,
                            'industryType': 'المجوهرات',
                            'businessActivity': 'تجارة المجوهرات والذهب',
                            'location': 'المباركية',
                            'taxNumber': 'TAX-NBJ-001',
                            'chambers': 'غرفة تجارة وصناعة الكويت'
                        }).returning()];
                case 1:
                    company = (_a.sent())[0];
                    if (!company) {
                        logger_1.default.warn('No company created during seeding', undefined, 'SEED_DATA');
                        return [2 /*return*/];
                    }
                    logger_1.default.info('✅ Created sample company:', { 'name': company.name }, 'SEED_DATA');
                    return [4 /*yield*/, db_1.db.insert(schema_1.users).values([
                            {
                                'id': 'user-1',
                                'email': 'admin@nileblue-jewelry.com.kw',
                                'firstName': 'أحمد',
                                'lastName': 'المدير',
                                'password': '$2b$10$hashedpassword123', // Hashed password placeholder
                                'role': 'company_manager',
                                'companyId': 'company-1',
                                'permissions': '[]'
                            },
                            {
                                'id': 'user-2',
                                'email': 'hr@nileblue-jewelry.com.kw',
                                'firstName': 'فاطمة',
                                'lastName': 'الموارد البشرية',
                                'password': '$2b$10$hashedpassword123', // Hashed password placeholder
                                'role': 'administrative_employee',
                                'companyId': 'company-1',
                                'permissions': '[]'
                            },
                            {
                                'id': 'user-3',
                                'email': 'supervisor@nileblue-jewelry.com.kw',
                                'firstName': 'خالد',
                                'lastName': 'المشرف',
                                'password': '$2b$10$hashedpassword123', // Hashed password placeholder
                                'role': 'supervisor',
                                'companyId': 'company-1',
                                'permissions': '[]'
                            }
                        ]).returning()];
                case 2:
                    sampleUsers = _a.sent();
                    logger_1.default.info('✅ Created sample users:', { 'count': sampleUsers.length }, 'SEED_DATA');
                    return [4 /*yield*/, db_1.db.insert(schema_1.companyUsers).values([
                            {
                                'userId': 'user-1',
                                'companyId': 'company-1',
                                'role': 'company_manager',
                                'permissions': JSON.stringify(['all'])
                            },
                            {
                                'userId': 'user-2',
                                'companyId': 'company-1',
                                'role': 'administrative_employee',
                                'permissions': JSON.stringify(['employees_view', 'employees_create', 'leaves_approve'])
                            },
                            {
                                'userId': 'user-3',
                                'companyId': 'company-1',
                                'role': 'supervisor',
                                'permissions': JSON.stringify(['employees_view', 'attendance_manage'])
                            }
                        ]).returning()];
                case 3:
                    companyUserRelations = _a.sent();
                    logger_1.default.info('✅ Created company user relations:', {
                        'count': companyUserRelations.length
                    }, 'SEED_DATA');
                    logger_1.default.info('🎉 Database seeding completed successfully!', undefined, 'SEED_DATA');
                    return [2 /*return*/, {
                            'companies': [company],
                            'users': sampleUsers,
                            'relations': companyUserRelations
                        }];
                case 4:
                    error_1 = _a.sent();
                    logger_1.default.error('❌ Error seeding database:', error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
