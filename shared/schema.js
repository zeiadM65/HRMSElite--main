"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.changePasswordSchema = exports.loginSchema = exports.registerUserSchema = exports.upsertUserSchema = exports.insertRefreshTokenSchema = exports.insertNotificationSchema = exports.insertDocumentSchema = exports.insertEmployeeViolationSchema = exports.insertEmployeeDeductionSchema = exports.insertEmployeeLeaveSchema = exports.insertLicenseSchema = exports.insertEmployeeSchema = exports.insertCompanySchema = exports.insertUserSchema = exports.licensesRelations = exports.employeesRelations = exports.companiesRelations = exports.usersRelations = exports.notifications = exports.documents = exports.employeeViolations = exports.employeeDeductions = exports.employeeLeaves = exports.licenses = exports.employees = exports.companyUsers = exports.companies = exports.documentTypeEnum = exports.deductionStatusEnum = exports.deductionTypeEnum = exports.leaveTypeEnum = exports.leaveStatusEnum = exports.licenseTypeEnum = exports.licenseStatusEnum = exports.employeeTypeEnum = exports.employeeStatusEnum = exports.userRoleEnum = exports.refreshTokens = exports.users = exports.sessions = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
var drizzle_zod_1 = require("drizzle-zod");
var zod_1 = require("zod");
// Session storage table for Replit Auth
exports.sessions = (0, sqlite_core_1.sqliteTable)('sessions', {
    'sid': (0, sqlite_core_1.text)('sid').primaryKey(),
    'sess': (0, sqlite_core_1.text)('sess').notNull(),
    'expire': (0, sqlite_core_1.integer)('expire').notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_session_expire').on(table.expire),
    (0, sqlite_core_1.index)('IDX_session_sid_expire').on(table.sid, table.expire)
]; });
// User storage table for HRMS Elite
exports.users = (0, sqlite_core_1.sqliteTable)('users', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'email': (0, sqlite_core_1.text)('email').unique().notNull(),
    'firstName': (0, sqlite_core_1.text)('first_name').notNull(),
    'lastName': (0, sqlite_core_1.text)('last_name').notNull(),
    'password': (0, sqlite_core_1.text)('password').notNull(), // Hashed password
    'profileImageUrl': (0, sqlite_core_1.text)('profile_image_url'),
    'role': (0, sqlite_core_1.text)('role').default('worker').notNull(),
    'companyId': (0, sqlite_core_1.text)('company_id'),
    'permissions': (0, sqlite_core_1.text)('permissions').default('[]').notNull(),
    'isActive': (0, sqlite_core_1.integer)('is_active', { 'mode': 'boolean' }).default(true).notNull(),
    'emailVerified': (0, sqlite_core_1.integer)('email_verified', { 'mode': 'boolean' }).default(false).notNull(),
    'emailVerificationToken': (0, sqlite_core_1.text)('email_verification_token'),
    'emailVerificationExpires': (0, sqlite_core_1.integer)('email_verification_expires'),
    'passwordResetToken': (0, sqlite_core_1.text)('password_reset_token'),
    'passwordResetExpires': (0, sqlite_core_1.integer)('password_reset_expires'),
    'lastPasswordChange': (0, sqlite_core_1.integer)('last_password_change'),
    'lastLoginAt': (0, sqlite_core_1.integer)('last_login_at'),
    'sub': (0, sqlite_core_1.text)('sub'),
    'claims': (0, sqlite_core_1.text)('claims'),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_users_email').on(table.email),
    (0, sqlite_core_1.index)('IDX_users_company_id').on(table.companyId),
    (0, sqlite_core_1.index)('IDX_users_role').on(table.role),
    (0, sqlite_core_1.index)('IDX_users_is_active').on(table.isActive),
    (0, sqlite_core_1.index)('IDX_users_created_at').on(table.createdAt)
]; });
// Refresh tokens table
exports.refreshTokens = (0, sqlite_core_1.sqliteTable)('refresh_tokens', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'userId': (0, sqlite_core_1.text)('user_id').notNull().references(function () { return exports.users.id; }, { 'onDelete': 'cascade' }),
    'tokenHash': (0, sqlite_core_1.text)('token_hash').notNull(),
    'familyId': (0, sqlite_core_1.text)('family_id').notNull(),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'expiresAt': (0, sqlite_core_1.integer)('expires_at', { 'mode': 'timestamp' }).notNull(),
    'revokedAt': (0, sqlite_core_1.integer)('revoked_at', { 'mode': 'timestamp' }),
    'replacedBy': (0, sqlite_core_1.text)('replaced_by'),
    'userAgent': (0, sqlite_core_1.text)('user_agent'),
    'ip': (0, sqlite_core_1.text)('ip')
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_refresh_tokens_user_id').on(table.userId),
    (0, sqlite_core_1.index)('IDX_refresh_tokens_family_id').on(table.familyId),
    (0, sqlite_core_1.index)('IDX_refresh_tokens_token_hash').on(table.tokenHash)
]; });
// Enums - Using text fields instead of pgEnum for SQLite compatibility
exports.userRoleEnum = ['super_admin',
    'company_manager',
    'employee',
    'supervisor',
    'worker'];
exports.employeeStatusEnum = ['active',
    'inactive',
    'on_leave',
    'terminated',
    'archived'];
exports.employeeTypeEnum = ['citizen', 'expatriate'];
exports.licenseStatusEnum = ['active', 'expired', 'pending'];
exports.licenseTypeEnum = ['main',
    'branch',
    'commercial',
    'industrial',
    'professional',
    'import_export',
    'tailoring',
    'fabric',
    'jewelry',
    'restaurant',
    'service'];
exports.leaveStatusEnum = ['pending', 'approved', 'rejected'];
exports.leaveTypeEnum = ['annual', 'sick', 'maternity', 'emergency', 'unpaid'];
exports.deductionTypeEnum = ['late', 'absence', 'loan', 'insurance', 'other'];
exports.deductionStatusEnum = ['active', 'completed', 'cancelled'];
exports.documentTypeEnum = ['passport',
    'residence',
    'license',
    'contract',
    'certificate',
    'civil_id',
    'work_permit',
    'health_certificate',
    'establishment_document',
    'tax_certificate',
    'chamber_membership',
    'import_export_license',
    'fire_permit',
    'municipality_permit',
    'other'];
// Companies table - Enhanced for real business data
exports.companies = (0, sqlite_core_1.sqliteTable)('companies', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'name': (0, sqlite_core_1.text)('name').notNull(),
    'commercialFileNumber': (0, sqlite_core_1.text)('commercial_file_number'),
    'commercialFileName': (0, sqlite_core_1.text)('commercial_file_name'),
    'commercialFileStatus': (0, sqlite_core_1.integer)('commercial_file_status', {
        'mode': 'boolean'
    }).default(true).notNull(),
    'establishmentDate': (0, sqlite_core_1.text)('establishment_date'),
    'commercialRegistrationNumber': (0, sqlite_core_1.text)('commercial_registration_number'),
    'classification': (0, sqlite_core_1.text)('classification'),
    'department': (0, sqlite_core_1.text)('department'),
    'fileType': (0, sqlite_core_1.text)('file_type'),
    'legalEntity': (0, sqlite_core_1.text)('legal_entity'),
    'ownershipCategory': (0, sqlite_core_1.text)('ownership_category'),
    'logoUrl': (0, sqlite_core_1.text)('logo_url'),
    'address': (0, sqlite_core_1.text)('address'),
    'phone': (0, sqlite_core_1.text)('phone'),
    'email': (0, sqlite_core_1.text)('email'),
    'website': (0, sqlite_core_1.text)('website'),
    'totalEmployees': (0, sqlite_core_1.integer)('total_employees').default(0).notNull(),
    'totalLicenses': (0, sqlite_core_1.integer)('total_licenses').default(0).notNull(),
    'isActive': (0, sqlite_core_1.integer)('is_active', { 'mode': 'boolean' }).default(true).notNull(),
    // حقول إضافية مستخرجة من الملفات الحقيقية
    'industryType': (0, sqlite_core_1.text)('industry_type'), // أقمشة، مجوهرات، خياطة، تجارة عامة
    'businessActivity': (0, sqlite_core_1.text)('business_activity'), // نشاط الشركة التفصيلي
    'location': (0, sqlite_core_1.text)('location'), // الموقع: مباركية، الجهراء، الصفاة، فحيحيل، رامين
    'taxNumber': (0, sqlite_core_1.text)('tax_number'), // الرقم الضريبي
    'chambers': (0, sqlite_core_1.text)('chambers'), // غرف التجارة المسجلة بها
    'partnerships': (0, sqlite_core_1.text)('partnerships').default('[]').notNull(), // JSON string
    'importExportLicense': (0, sqlite_core_1.text)('import_export_license'), // رخصة الاستيراد والتصدير
    'specialPermits': (0, sqlite_core_1.text)('special_permits').default('[]').notNull(), // JSON string
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_companies_name').on(table.name),
    (0, sqlite_core_1.index)('IDX_companies_commercial_file_number').on(table.commercialFileNumber),
    (0, sqlite_core_1.index)('IDX_companies_is_active').on(table.isActive),
    (0, sqlite_core_1.index)('IDX_companies_industry_type').on(table.industryType),
    (0, sqlite_core_1.index)('IDX_companies_location').on(table.location),
    (0, sqlite_core_1.index)('IDX_companies_created_at').on(table.createdAt)
]; });
// Company Users table
exports.companyUsers = (0, sqlite_core_1.sqliteTable)('company_users', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'companyId': (0, sqlite_core_1.text)('company_id').notNull().references(function () { return exports.companies.id; }, { 'onDelete': 'cascade' }),
    'userId': (0, sqlite_core_1.text)('user_id').notNull().references(function () { return exports.users.id; }, { 'onDelete': 'cascade' }),
    'role': (0, sqlite_core_1.text)('role').notNull().default('worker'),
    'permissions': (0, sqlite_core_1.text)('permissions').default('[]').notNull(), // JSON string
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_company_users_company_id').on(table.companyId),
    (0, sqlite_core_1.index)('IDX_company_users_user_id').on(table.userId),
    (0, sqlite_core_1.index)('IDX_company_users_role').on(table.role),
    (0, sqlite_core_1.index)('IDX_company_users_company_user').on(table.companyId, table.userId)
]; });
// Employees table
exports.employees = (0, sqlite_core_1.sqliteTable)('employees', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'companyId': (0, sqlite_core_1.text)('company_id').notNull().references(function () { return exports.companies.id; }, { 'onDelete': 'cascade' }),
    'licenseId': (0, sqlite_core_1.text)('license_id').references(function () { return exports.licenses.id; }, { 'onDelete': 'set null' }),
    'firstName': (0, sqlite_core_1.text)('first_name').notNull(),
    'lastName': (0, sqlite_core_1.text)('last_name').notNull(),
    'arabicName': (0, sqlite_core_1.text)('arabic_name'),
    'englishName': (0, sqlite_core_1.text)('english_name'),
    'passportNumber': (0, sqlite_core_1.text)('passport_number'),
    'civilId': (0, sqlite_core_1.text)('civil_id'),
    'nationality': (0, sqlite_core_1.text)('nationality'),
    'dateOfBirth': (0, sqlite_core_1.text)('date_of_birth'),
    'gender': (0, sqlite_core_1.text)('gender'),
    'maritalStatus': (0, sqlite_core_1.text)('marital_status'),
    'employeeType': (0, sqlite_core_1.text)('employee_type').default('citizen').notNull(),
    'status': (0, sqlite_core_1.text)('status').default('active').notNull(),
    'position': (0, sqlite_core_1.text)('position'),
    'department': (0, sqlite_core_1.text)('department'),
    'hireDate': (0, sqlite_core_1.text)('hire_date'),
    'salary': (0, sqlite_core_1.real)('salary'),
    'phone': (0, sqlite_core_1.text)('phone'),
    'email': (0, sqlite_core_1.text)('email'),
    'address': (0, sqlite_core_1.text)('address'),
    'emergencyContact': (0, sqlite_core_1.text)('emergency_contact'),
    'emergencyPhone': (0, sqlite_core_1.text)('emergency_phone'),
    'photoUrl': (0, sqlite_core_1.text)('photo_url'),
    'documents': (0, sqlite_core_1.text)('documents').default('[]').notNull(), // JSON string
    'skills': (0, sqlite_core_1.text)('skills').default('[]').notNull(), // JSON string
    'notes': (0, sqlite_core_1.text)('notes'),
    'fullName': (0, sqlite_core_1.text)('full_name'),
    'jobTitle': (0, sqlite_core_1.text)('job_title'),
    'residenceNumber': (0, sqlite_core_1.text)('residence_number'),
    'residenceExpiry': (0, sqlite_core_1.text)('residence_expiry'),
    'medicalInsurance': (0, sqlite_core_1.text)('medical_insurance'),
    'bankAccount': (0, sqlite_core_1.text)('bank_account'),
    'workPermitStart': (0, sqlite_core_1.text)('work_permit_start'),
    'workPermitEnd': (0, sqlite_core_1.text)('work_permit_end'),
    'isArchived': (0, sqlite_core_1.integer)('is_archived', { 'mode': 'boolean' }).default(false).notNull(),
    'archiveReason': (0, sqlite_core_1.text)('archive_reason'),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_employees_company_id').on(table.companyId),
    (0, sqlite_core_1.index)('IDX_employees_license_id').on(table.licenseId),
    (0, sqlite_core_1.index)('IDX_employees_status').on(table.status),
    (0, sqlite_core_1.index)('IDX_employees_employee_type').on(table.employeeType),
    (0, sqlite_core_1.index)('IDX_employees_department').on(table.department),
    (0, sqlite_core_1.index)('IDX_employees_position').on(table.position),
    (0, sqlite_core_1.index)('IDX_employees_civil_id').on(table.civilId),
    (0, sqlite_core_1.index)('IDX_employees_passport_number').on(table.passportNumber),
    (0, sqlite_core_1.index)('IDX_employees_is_archived').on(table.isArchived),
    (0, sqlite_core_1.index)('IDX_employees_hire_date').on(table.hireDate),
    (0, sqlite_core_1.index)('IDX_employees_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_employees_company_status').on(table.companyId, table.status)
]; });
// Licenses table
exports.licenses = (0, sqlite_core_1.sqliteTable)('licenses', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'companyId': (0, sqlite_core_1.text)('company_id').notNull().references(function () { return exports.companies.id; }, { 'onDelete': 'cascade' }),
    'name': (0, sqlite_core_1.text)('name').notNull(),
    'type': (0, sqlite_core_1.text)('type').notNull(),
    'number': (0, sqlite_core_1.text)('number').notNull(),
    'status': (0, sqlite_core_1.text)('status').default('active').notNull(),
    'issueDate': (0, sqlite_core_1.text)('issue_date'),
    'expiryDate': (0, sqlite_core_1.text)('expiry_date'),
    'issuingAuthority': (0, sqlite_core_1.text)('issuing_authority'),
    'location': (0, sqlite_core_1.text)('location'),
    'description': (0, sqlite_core_1.text)('description'),
    'documents': (0, sqlite_core_1.text)('documents').default('[]').notNull(), // JSON string
    'isActive': (0, sqlite_core_1.integer)('is_active', { 'mode': 'boolean' }).default(true).notNull(),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_licenses_company_id').on(table.companyId),
    (0, sqlite_core_1.index)('IDX_licenses_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_licenses_status').on(table.status),
    (0, sqlite_core_1.index)('IDX_licenses_number').on(table.number),
    (0, sqlite_core_1.index)('IDX_licenses_expiry_date').on(table.expiryDate),
    (0, sqlite_core_1.index)('IDX_licenses_is_active').on(table.isActive),
    (0, sqlite_core_1.index)('IDX_licenses_company_status').on(table.companyId, table.status),
    (0, sqlite_core_1.index)('IDX_licenses_expiry_active').on(table.expiryDate, table.isActive)
]; });
// Employee Leaves table
exports.employeeLeaves = (0, sqlite_core_1.sqliteTable)('employee_leaves', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'employeeId': (0, sqlite_core_1.text)('employee_id').notNull().references(function () { return exports.employees.id; }, {
        'onDelete': 'cascade'
    }),
    'type': (0, sqlite_core_1.text)('type', { 'enum': exports.leaveTypeEnum }).notNull(),
    'status': (0, sqlite_core_1.text)('status', { 'enum': exports.leaveStatusEnum }).default('pending').notNull(),
    'startDate': (0, sqlite_core_1.text)('start_date').notNull(),
    'endDate': (0, sqlite_core_1.text)('end_date').notNull(),
    'days': (0, sqlite_core_1.integer)('days').notNull(),
    'reason': (0, sqlite_core_1.text)('reason'),
    'approvedBy': (0, sqlite_core_1.text)('approved_by').references(function () { return exports.users.id; }, { 'onDelete': 'set null' }),
    'approvedAt': (0, sqlite_core_1.integer)('approved_at', { 'mode': 'timestamp' }),
    'rejectionReason': (0, sqlite_core_1.text)('rejection_reason'),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_19 || (templateObject_19 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_20 || (templateObject_20 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_employee_leaves_employee_id').on(table.employeeId),
    (0, sqlite_core_1.index)('IDX_employee_leaves_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_employee_leaves_status').on(table.status),
    (0, sqlite_core_1.index)('IDX_employee_leaves_start_date').on(table.startDate),
    (0, sqlite_core_1.index)('IDX_employee_leaves_end_date').on(table.endDate),
    (0, sqlite_core_1.index)('IDX_employee_leaves_approved_by').on(table.approvedBy),
    (0, sqlite_core_1.index)('IDX_employee_leaves_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_employee_leaves_employee_status').on(table.employeeId, table.status),
    (0, sqlite_core_1.index)('IDX_employee_leaves_date_range').on(table.startDate, table.endDate)
]; });
// Employee Deductions table
exports.employeeDeductions = (0, sqlite_core_1.sqliteTable)('employee_deductions', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_21 || (templateObject_21 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'employeeId': (0, sqlite_core_1.text)('employee_id').notNull().references(function () { return exports.employees.id; }, {
        'onDelete': 'cascade'
    }),
    'type': (0, sqlite_core_1.text)('type', { 'enum': exports.deductionTypeEnum }).notNull(),
    'amount': (0, sqlite_core_1.real)('amount').notNull(),
    'reason': (0, sqlite_core_1.text)('reason').notNull(),
    'date': (0, sqlite_core_1.text)('date').notNull(),
    'status': (0, sqlite_core_1.text)('status', { 'enum': exports.deductionStatusEnum }).default('active').notNull(),
    'processedBy': (0, sqlite_core_1.text)('processed_by').notNull().references(function () { return exports.users.id; }, { 'onDelete': 'cascade' }),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_22 || (templateObject_22 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_employee_deductions_employee_id').on(table.employeeId),
    (0, sqlite_core_1.index)('IDX_employee_deductions_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_employee_deductions_status').on(table.status),
    (0, sqlite_core_1.index)('IDX_employee_deductions_date').on(table.date),
    (0, sqlite_core_1.index)('IDX_employee_deductions_processed_by').on(table.processedBy),
    (0, sqlite_core_1.index)('IDX_employee_deductions_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_employee_deductions_employee_type').on(table.employeeId, table.type),
    (0, sqlite_core_1.index)('IDX_employee_deductions_amount').on(table.amount)
]; });
// Employee Violations table
exports.employeeViolations = (0, sqlite_core_1.sqliteTable)('employee_violations', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_23 || (templateObject_23 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'employeeId': (0, sqlite_core_1.text)('employee_id').notNull().references(function () { return exports.employees.id; }, {
        'onDelete': 'cascade'
    }),
    'type': (0, sqlite_core_1.text)('type').notNull(),
    'description': (0, sqlite_core_1.text)('description').notNull(),
    'date': (0, sqlite_core_1.text)('date').notNull(),
    'reportedBy': (0, sqlite_core_1.text)('reported_by').notNull().references(function () { return exports.users.id; }, { 'onDelete': 'cascade' }),
    'severity': (0, sqlite_core_1.text)('severity').default('medium').notNull(),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_24 || (templateObject_24 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_employee_violations_employee_id').on(table.employeeId),
    (0, sqlite_core_1.index)('IDX_employee_violations_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_employee_violations_severity').on(table.severity),
    (0, sqlite_core_1.index)('IDX_employee_violations_date').on(table.date),
    (0, sqlite_core_1.index)('IDX_employee_violations_reported_by').on(table.reportedBy),
    (0, sqlite_core_1.index)('IDX_employee_violations_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_employee_violations_employee_type').on(table.employeeId, table.type)
]; });
// Documents table
exports.documents = (0, sqlite_core_1.sqliteTable)('documents', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_25 || (templateObject_25 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'entityId': (0, sqlite_core_1.text)('entity_id').notNull(),
    'entityType': (0, sqlite_core_1.text)('entity_type').notNull(), // 'employee', 'company', 'license'
    'name': (0, sqlite_core_1.text)('name').notNull(),
    'type': (0, sqlite_core_1.text)('type').notNull(),
    'fileName': (0, sqlite_core_1.text)('file_name').notNull(),
    'fileUrl': (0, sqlite_core_1.text)('file_url').notNull(),
    'fileSize': (0, sqlite_core_1.integer)('file_size'),
    'mimeType': (0, sqlite_core_1.text)('mime_type'),
    'description': (0, sqlite_core_1.text)('description'),
    'tags': (0, sqlite_core_1.text)('tags').default('[]').notNull(), // JSON string
    'uploadedBy': (0, sqlite_core_1.text)('uploaded_by').notNull().references(function () { return exports.users.id; }, { 'onDelete': 'cascade' }),
    'isActive': (0, sqlite_core_1.integer)('is_active', { 'mode': 'boolean' }).default(true).notNull(),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_26 || (templateObject_26 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_27 || (templateObject_27 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_documents_entity_id').on(table.entityId),
    (0, sqlite_core_1.index)('IDX_documents_entity_type').on(table.entityType),
    (0, sqlite_core_1.index)('IDX_documents_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_documents_uploaded_by').on(table.uploadedBy),
    (0, sqlite_core_1.index)('IDX_documents_is_active').on(table.isActive),
    (0, sqlite_core_1.index)('IDX_documents_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_documents_entity_entity_type').on(table.entityId, table.entityType),
    (0, sqlite_core_1.index)('IDX_documents_file_size').on(table.fileSize)
]; });
// Notifications table
exports.notifications = (0, sqlite_core_1.sqliteTable)('notifications', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_28 || (templateObject_28 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'userId': (0, sqlite_core_1.text)('user_id').notNull().references(function () { return exports.users.id; }, { 'onDelete': 'cascade' }),
    'companyId': (0, sqlite_core_1.text)('company_id').references(function () { return exports.companies.id; }, { 'onDelete': 'cascade' }),
    'type': (0, sqlite_core_1.text)('type').notNull(),
    'title': (0, sqlite_core_1.text)('title').notNull(),
    'message': (0, sqlite_core_1.text)('message').notNull(),
    'data': (0, sqlite_core_1.text)('data').default('{}').notNull(), // JSON string
    'isRead': (0, sqlite_core_1.integer)('is_read', { 'mode': 'boolean' }).default(false).notNull(),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_29 || (templateObject_29 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_notifications_user_id').on(table.userId),
    (0, sqlite_core_1.index)('IDX_notifications_company_id').on(table.companyId),
    (0, sqlite_core_1.index)('IDX_notifications_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_notifications_is_read').on(table.isRead),
    (0, sqlite_core_1.index)('IDX_notifications_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_notifications_user_read').on(table.userId, table.isRead),
    (0, sqlite_core_1.index)('IDX_notifications_company_type').on(table.companyId, table.type)
]; });
// Relations with proper cascade behavior
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        'companyUsers': many(exports.companyUsers),
        'employeeLeaves': many(exports.employeeLeaves, { 'relationName': 'approvedBy' }),
        'employeeDeductions': many(exports.employeeDeductions, { 'relationName': 'processedBy' }),
        'employeeViolations': many(exports.employeeViolations, { 'relationName': 'reportedBy' }),
        'documents': many(exports.documents, { 'relationName': 'uploadedBy' }),
        'notifications': many(exports.notifications)
    });
});
exports.companiesRelations = (0, drizzle_orm_1.relations)(exports.companies, function (_a) {
    var many = _a.many;
    return ({
        'employees': many(exports.employees),
        'licenses': many(exports.licenses),
        'companyUsers': many(exports.companyUsers),
        'notifications': many(exports.notifications)
    });
});
exports.employeesRelations = (0, drizzle_orm_1.relations)(exports.employees, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        'company': one(exports.companies, {
            'fields': [exports.employees.companyId],
            'references': [exports.companies.id]
        }),
        'license': one(exports.licenses, {
            'fields': [exports.employees.licenseId],
            'references': [exports.licenses.id]
        }),
        'leaves': many(exports.employeeLeaves),
        'deductions': many(exports.employeeDeductions),
        'violations': many(exports.employeeViolations),
        'documents': many(exports.documents, { 'relationName': 'employeeDocuments' })
    });
});
exports.licensesRelations = (0, drizzle_orm_1.relations)(exports.licenses, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        'company': one(exports.companies, {
            'fields': [exports.licenses.companyId],
            'references': [exports.companies.id]
        }),
        'employees': many(exports.employees),
        'documents': many(exports.documents, { 'relationName': 'licenseDocuments' })
    });
});
// Zod schemas
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users);
exports.insertCompanySchema = (0, drizzle_zod_1.createInsertSchema)(exports.companies);
exports.insertEmployeeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.employees);
exports.insertLicenseSchema = (0, drizzle_zod_1.createInsertSchema)(exports.licenses);
exports.insertEmployeeLeaveSchema = (0, drizzle_zod_1.createInsertSchema)(exports.employeeLeaves);
exports.insertEmployeeDeductionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.employeeDeductions);
exports.insertEmployeeViolationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.employeeViolations);
exports.insertDocumentSchema = (0, drizzle_zod_1.createInsertSchema)(exports.documents);
exports.insertNotificationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.notifications);
exports.insertRefreshTokenSchema = (0, drizzle_zod_1.createInsertSchema)(exports.refreshTokens);
exports.upsertUserSchema = zod_1.z.object({
    'id': zod_1.z.string(),
    'email': zod_1.z.string().email().optional(),
    'firstName': zod_1.z.string().optional(),
    'lastName': zod_1.z.string().optional(),
    'password': zod_1.z.string().optional(),
    'profileImageUrl': zod_1.z.string().optional(),
    'role': zod_1.z.string().optional(),
    'companyId': zod_1.z.string().optional(),
    'permissions': zod_1.z.array(zod_1.z.string()).optional(),
    'isActive': zod_1.z.boolean().optional(),
    'emailVerified': zod_1.z.boolean().optional(),
    'emailVerificationToken': zod_1.z.string().optional(),
    'emailVerificationExpires': zod_1.z.number().optional(),
    'passwordResetToken': zod_1.z.string().optional(),
    'passwordResetExpires': zod_1.z.number().optional(),
    'lastPasswordChange': zod_1.z.number().optional(),
    'lastLoginAt': zod_1.z.number().optional()
});
// Registration schema
exports.registerUserSchema = zod_1.z.object({
    'email': zod_1.z.string().email(),
    'password': zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    'firstName': zod_1.z.string().min(2, 'First name must be at least 2 characters'),
    'lastName': zod_1.z.string().min(2, 'Last name must be at least 2 characters'),
    'companyId': zod_1.z.string().optional(),
    'role': zod_1.z.string().optional()
});
// Login schema
exports.loginSchema = zod_1.z.object({
    'email': zod_1.z.string().email(),
    'password': zod_1.z.string(),
    'companyId': zod_1.z.string().optional()
});
// Change password schema
exports.changePasswordSchema = zod_1.z.object({
    'currentPassword': zod_1.z.string(),
    'newPassword': zod_1.z.string().min(8, 'Password must be at least 8 characters')
});
// Forgot password schema
exports.forgotPasswordSchema = zod_1.z.object({
    'email': zod_1.z.string().email()
});
// Reset password schema
exports.resetPasswordSchema = zod_1.z.object({
    'token': zod_1.z.string(),
    'newPassword': zod_1.z.string().min(8, 'Password must be at least 8 characters')
});
// Verify email schema
exports.verifyEmailSchema = zod_1.z.object({
    'token': zod_1.z.string()
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29;
