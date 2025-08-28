"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertLicenseSchema = exports.insertEmployeeSchema = exports.insertUserSchema = exports.insertCompanySchema = exports.schema = exports.sessions = exports.employeeDeductions = exports.employeeLeaves = exports.licensesRelations = exports.employeesRelations = exports.companyUsersRelations = exports.usersRelations = exports.companiesRelations = exports.licenses = exports.employees = exports.companyUsers = exports.users = exports.companies = exports.documentTypeEnum = exports.deductionStatusEnum = exports.deductionTypeEnum = exports.leaveTypeEnum = exports.leaveStatusEnum = exports.licenseTypeEnum = exports.licenseStatusEnum = exports.employeeTypeEnum = exports.employeeStatusEnum = exports.userRoleEnum = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
var drizzle_zod_1 = require("drizzle-zod");
// ============================================================================
// ENUMS - Centralized for consistency
// ============================================================================
exports.userRoleEnum = ['super_admin', 'company_manager', 'employee', 'supervisor', 'worker'];
exports.employeeStatusEnum = ['active', 'inactive', 'on_leave', 'terminated', 'archived'];
exports.employeeTypeEnum = ['citizen', 'expatriate'];
exports.licenseStatusEnum = ['active', 'expired', 'pending'];
exports.licenseTypeEnum = [
    'main', 'branch', 'commercial', 'industrial', 'professional',
    'import_export', 'tailoring', 'fabric', 'jewelry', 'restaurant', 'service'
];
exports.leaveStatusEnum = ['pending', 'approved', 'rejected'];
exports.leaveTypeEnum = ['annual', 'sick', 'maternity', 'emergency', 'unpaid'];
exports.deductionTypeEnum = ['late', 'absence', 'loan', 'insurance', 'other'];
exports.deductionStatusEnum = ['active', 'completed', 'cancelled'];
exports.documentTypeEnum = [
    'passport', 'residence', 'license', 'contract', 'certificate',
    'civil_id', 'work_permit', 'health_certificate', 'establishment_document',
    'tax_certificate', 'chamber_membership', 'import_export_license',
    'fire_permit', 'municipality_permit', 'other'
];
// ============================================================================
// CORE TABLES - Optimized with better indexing and relationships
// ============================================================================
// Companies table - Optimized with composite indexes
exports.companies = (0, sqlite_core_1.sqliteTable)('companies', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'name': (0, sqlite_core_1.text)('name').notNull(),
    'commercialFileNumber': (0, sqlite_core_1.text)('commercial_file_number'),
    'commercialFileName': (0, sqlite_core_1.text)('commercial_file_name'),
    'commercialFileStatus': (0, sqlite_core_1.integer)('commercial_file_status', { 'mode': 'boolean' }).default(true).notNull(),
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
    'industryType': (0, sqlite_core_1.text)('industry_type'),
    'businessActivity': (0, sqlite_core_1.text)('business_activity'),
    'location': (0, sqlite_core_1.text)('location'),
    'taxNumber': (0, sqlite_core_1.text)('tax_number'),
    'chambers': (0, sqlite_core_1.text)('chambers'),
    'partnerships': (0, sqlite_core_1.text)('partnerships').default('[]').notNull(),
    'importExportLicense': (0, sqlite_core_1.text)('import_export_license'),
    'specialPermits': (0, sqlite_core_1.text)('special_permits').default('[]').notNull(),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    // Primary indexes for common queries
    (0, sqlite_core_1.index)('IDX_companies_name').on(table.name),
    (0, sqlite_core_1.index)('IDX_companies_commercial_file_number').on(table.commercialFileNumber),
    (0, sqlite_core_1.index)('IDX_companies_is_active').on(table.isActive),
    // Composite indexes for complex queries
    (0, sqlite_core_1.index)('IDX_companies_location_industry').on(table.location, table.industryType),
    (0, sqlite_core_1.index)('IDX_companies_status_created').on(table.isActive, table.createdAt),
    (0, sqlite_core_1.index)('IDX_companies_search').on(table.name, table.commercialFileNumber, table.location),
    // Performance indexes
    (0, sqlite_core_1.index)('IDX_companies_industry_type').on(table.industryType),
    (0, sqlite_core_1.index)('IDX_companies_location').on(table.location),
    (0, sqlite_core_1.index)('IDX_companies_created_at').on(table.createdAt)
]; });
// Users table - Optimized with better indexing
exports.users = (0, sqlite_core_1.sqliteTable)('users', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'email': (0, sqlite_core_1.text)('email').unique().notNull(),
    'firstName': (0, sqlite_core_1.text)('first_name').notNull(),
    'lastName': (0, sqlite_core_1.text)('last_name').notNull(),
    'password': (0, sqlite_core_1.text)('password').notNull(),
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
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    // Primary indexes
    (0, sqlite_core_1.index)('IDX_users_email').on(table.email),
    (0, sqlite_core_1.index)('IDX_users_company_id').on(table.companyId),
    (0, sqlite_core_1.index)('IDX_users_role').on(table.role),
    (0, sqlite_core_1.index)('IDX_users_is_active').on(table.isActive),
    // Composite indexes for common queries
    (0, sqlite_core_1.index)('IDX_users_company_role').on(table.companyId, table.role),
    (0, sqlite_core_1.index)('IDX_users_status_created').on(table.isActive, table.createdAt),
    (0, sqlite_core_1.index)('IDX_users_search').on(table.email, table.firstName, table.lastName),
    // Performance indexes
    (0, sqlite_core_1.index)('IDX_users_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_users_last_login').on(table.lastLoginAt)
]; });
// Company Users table - Many-to-many relationship with composite primary key
exports.companyUsers = (0, sqlite_core_1.sqliteTable)('company_users', {
    'companyId': (0, sqlite_core_1.text)('company_id').notNull().references(function () { return exports.companies.id; }, { 'onDelete': 'cascade' }),
    'userId': (0, sqlite_core_1.text)('user_id').notNull().references(function () { return exports.users.id; }, { 'onDelete': 'cascade' }),
    'role': (0, sqlite_core_1.text)('role').notNull().default('worker'),
    'permissions': (0, sqlite_core_1.text)('permissions').default('[]').notNull(),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return ({
    pk: (0, sqlite_core_1.primaryKey)({ columns: [table.companyId, table.userId] }),
    companyIdIdx: (0, sqlite_core_1.index)('IDX_company_users_company_id').on(table.companyId),
    userIdIdx: (0, sqlite_core_1.index)('IDX_company_users_user_id').on(table.userId),
    roleIdx: (0, sqlite_core_1.index)('IDX_company_users_role').on(table.role),
    compositeIdx: (0, sqlite_core_1.index)('IDX_company_users_company_user').on(table.companyId, table.userId)
}); });
// ============================================================================
// EMPLOYEE MANAGEMENT TABLES - Optimized relationships
// ============================================================================
// Employees table - Enhanced with better indexing
exports.employees = (0, sqlite_core_1.sqliteTable)('employees', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
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
    'documents': (0, sqlite_core_1.text)('documents').default('[]').notNull(),
    'skills': (0, sqlite_core_1.text)('skills').default('[]').notNull(),
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
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    // Primary indexes
    (0, sqlite_core_1.index)('IDX_employees_company_id').on(table.companyId),
    (0, sqlite_core_1.index)('IDX_employees_license_id').on(table.licenseId),
    (0, sqlite_core_1.index)('IDX_employees_status').on(table.status),
    (0, sqlite_core_1.index)('IDX_employees_employee_type').on(table.employeeType),
    // Composite indexes for common queries
    (0, sqlite_core_1.index)('IDX_employees_company_status').on(table.companyId, table.status),
    (0, sqlite_core_1.index)('IDX_employees_department_position').on(table.department, table.position),
    (0, sqlite_core_1.index)('IDX_employees_search').on(table.firstName, table.lastName, table.civilId, table.passportNumber),
    (0, sqlite_core_1.index)('IDX_employees_hire_date').on(table.hireDate),
    // Performance indexes
    (0, sqlite_core_1.index)('IDX_employees_is_archived').on(table.isArchived),
    (0, sqlite_core_1.index)('IDX_employees_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_employees_nationality').on(table.nationality),
    (0, sqlite_core_1.index)('IDX_employees_residence_expiry').on(table.residenceExpiry)
]; });
// ============================================================================
// LICENSE MANAGEMENT TABLES
// ============================================================================
// Licenses table - Optimized with better indexing
exports.licenses = (0, sqlite_core_1.sqliteTable)('licenses', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
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
    'documents': (0, sqlite_core_1.text)('documents').default('[]').notNull(),
    'isActive': (0, sqlite_core_1.integer)('is_active', { 'mode': 'boolean' }).default(true).notNull(),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    // Primary indexes
    (0, sqlite_core_1.index)('IDX_licenses_company_id').on(table.companyId),
    (0, sqlite_core_1.index)('IDX_licenses_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_licenses_status').on(table.status),
    (0, sqlite_core_1.index)('IDX_licenses_number').on(table.number),
    // Composite indexes for common queries
    (0, sqlite_core_1.index)('IDX_licenses_company_status').on(table.companyId, table.status),
    (0, sqlite_core_1.index)('IDX_licenses_expiry_active').on(table.expiryDate, table.isActive),
    (0, sqlite_core_1.index)('IDX_licenses_type_status').on(table.type, table.status),
    // Performance indexes
    (0, sqlite_core_1.index)('IDX_licenses_expiry_date').on(table.expiryDate),
    (0, sqlite_core_1.index)('IDX_licenses_is_active').on(table.isActive),
    (0, sqlite_core_1.index)('IDX_licenses_created_at').on(table.createdAt)
]; });
// ============================================================================
// RELATIONSHIPS - Explicitly defined for better performance
// ============================================================================
exports.companiesRelations = (0, drizzle_orm_1.relations)(exports.companies, function (_a) {
    var many = _a.many;
    return ({
        users: many(exports.companyUsers),
        employees: many(exports.employees),
        licenses: many(exports.licenses)
    });
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, function (_a) {
    var many = _a.many;
    return ({
        companyUsers: many(exports.companyUsers)
    });
});
exports.companyUsersRelations = (0, drizzle_orm_1.relations)(exports.companyUsers, function (_a) {
    var one = _a.one;
    return ({
        company: one(exports.companies, {
            fields: [exports.companyUsers.companyId],
            references: [exports.companies.id]
        }),
        user: one(exports.users, {
            fields: [exports.companyUsers.userId],
            references: [exports.users.id]
        })
    });
});
exports.employeesRelations = (0, drizzle_orm_1.relations)(exports.employees, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        company: one(exports.companies, {
            fields: [exports.employees.companyId],
            references: [exports.companies.id]
        }),
        license: one(exports.licenses, {
            fields: [exports.employees.licenseId],
            references: [exports.licenses.id]
        }),
        leaves: many(exports.employeeLeaves),
        deductions: many(exports.employeeDeductions)
    });
});
exports.licensesRelations = (0, drizzle_orm_1.relations)(exports.licenses, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        company: one(exports.companies, {
            fields: [exports.licenses.companyId],
            references: [exports.companies.id]
        }),
        employees: many(exports.employees)
    });
});
// ============================================================================
// ADDITIONAL TABLES - Optimized versions
// ============================================================================
// Employee Leaves table - Optimized
exports.employeeLeaves = (0, sqlite_core_1.sqliteTable)('employee_leaves', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'employeeId': (0, sqlite_core_1.text)('employee_id').notNull().references(function () { return exports.employees.id; }, { 'onDelete': 'cascade' }),
    'type': (0, sqlite_core_1.text)('type', { 'enum': exports.leaveTypeEnum }).notNull(),
    'status': (0, sqlite_core_1.text)('status', { 'enum': exports.leaveStatusEnum }).default('pending').notNull(),
    'startDate': (0, sqlite_core_1.text)('start_date').notNull(),
    'endDate': (0, sqlite_core_1.text)('end_date').notNull(),
    'days': (0, sqlite_core_1.integer)('days').notNull(),
    'reason': (0, sqlite_core_1.text)('reason'),
    'approvedBy': (0, sqlite_core_1.text)('approved_by').references(function () { return exports.users.id; }, { 'onDelete': 'set null' }),
    'approvedAt': (0, sqlite_core_1.integer)('approved_at', { 'mode': 'timestamp' }),
    'rejectionReason': (0, sqlite_core_1.text)('rejection_reason'),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull(),
    'updatedAt': (0, sqlite_core_1.integer)('updated_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    // Primary indexes
    (0, sqlite_core_1.index)('IDX_employee_leaves_employee_id').on(table.employeeId),
    (0, sqlite_core_1.index)('IDX_employee_leaves_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_employee_leaves_status').on(table.status),
    // Composite indexes for common queries
    (0, sqlite_core_1.index)('IDX_employee_leaves_employee_status').on(table.employeeId, table.status),
    (0, sqlite_core_1.index)('IDX_employee_leaves_date_range').on(table.startDate, table.endDate),
    (0, sqlite_core_1.index)('IDX_employee_leaves_type_status').on(table.type, table.status),
    // Performance indexes
    (0, sqlite_core_1.index)('IDX_employee_leaves_start_date').on(table.startDate),
    (0, sqlite_core_1.index)('IDX_employee_leaves_end_date').on(table.endDate),
    (0, sqlite_core_1.index)('IDX_employee_leaves_approved_by').on(table.approvedBy),
    (0, sqlite_core_1.index)('IDX_employee_leaves_created_at').on(table.createdAt)
]; });
// Employee Deductions table - Optimized
exports.employeeDeductions = (0, sqlite_core_1.sqliteTable)('employee_deductions', {
    'id': (0, sqlite_core_1.text)('id').primaryKey().default((0, drizzle_orm_1.sql)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["(hex(randomblob(16)))"], ["(hex(randomblob(16)))"])))),
    'employeeId': (0, sqlite_core_1.text)('employee_id').notNull().references(function () { return exports.employees.id; }, { 'onDelete': 'cascade' }),
    'type': (0, sqlite_core_1.text)('type', { 'enum': exports.deductionTypeEnum }).notNull(),
    'amount': (0, sqlite_core_1.real)('amount').notNull(),
    'reason': (0, sqlite_core_1.text)('reason').notNull(),
    'date': (0, sqlite_core_1.text)('date').notNull(),
    'status': (0, sqlite_core_1.text)('status', { 'enum': exports.deductionStatusEnum }).default('active').notNull(),
    'processedBy': (0, sqlite_core_1.text)('processed_by').notNull().references(function () { return exports.users.id; }, { 'onDelete': 'cascade' }),
    'createdAt': (0, sqlite_core_1.integer)('created_at', { 'mode': 'timestamp' }).default((0, drizzle_orm_1.sql)(templateObject_19 || (templateObject_19 = __makeTemplateObject(["(unixepoch())"], ["(unixepoch())"])))).notNull()
}, function (table) { return [
    // Primary indexes
    (0, sqlite_core_1.index)('IDX_employee_deductions_employee_id').on(table.employeeId),
    (0, sqlite_core_1.index)('IDX_employee_deductions_type').on(table.type),
    (0, sqlite_core_1.index)('IDX_employee_deductions_status').on(table.status),
    // Composite indexes for common queries
    (0, sqlite_core_1.index)('IDX_employee_deductions_employee_type').on(table.employeeId, table.type),
    (0, sqlite_core_1.index)('IDX_employee_deductions_type_status').on(table.type, table.status),
    (0, sqlite_core_1.index)('IDX_employee_deductions_date_amount').on(table.date, table.amount),
    // Performance indexes
    (0, sqlite_core_1.index)('IDX_employee_deductions_date').on(table.date),
    (0, sqlite_core_1.index)('IDX_employee_deductions_processed_by').on(table.processedBy),
    (0, sqlite_core_1.index)('IDX_employee_deductions_created_at').on(table.createdAt),
    (0, sqlite_core_1.index)('IDX_employee_deductions_amount').on(table.amount)
]; });
// ============================================================================
// SESSION STORAGE
// ============================================================================
exports.sessions = (0, sqlite_core_1.sqliteTable)('sessions', {
    'sid': (0, sqlite_core_1.text)('sid').primaryKey(),
    'sess': (0, sqlite_core_1.text)('sess').notNull(),
    'expire': (0, sqlite_core_1.integer)('expire').notNull()
}, function (table) { return [
    (0, sqlite_core_1.index)('IDX_session_expire').on(table.expire),
    (0, sqlite_core_1.index)('IDX_session_sid_expire').on(table.sid, table.expire)
]; });
// ============================================================================
// SCHEMA EXPORTS
// ============================================================================
exports.schema = {
    companies: exports.companies,
    users: exports.users,
    companyUsers: exports.companyUsers,
    employees: exports.employees,
    licenses: exports.licenses,
    employeeLeaves: exports.employeeLeaves,
    employeeDeductions: exports.employeeDeductions,
    sessions: exports.sessions
};
// Zod schemas for validation
exports.insertCompanySchema = (0, drizzle_zod_1.createInsertSchema)(exports.companies);
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users);
exports.insertEmployeeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.employees);
exports.insertLicenseSchema = (0, drizzle_zod_1.createInsertSchema)(exports.licenses);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19;
