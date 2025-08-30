// server/shared/schema.ts
import { z } from 'zod';
/** ===== Employees ===== */
export var insertEmployeeSchema = z.object({}).passthrough();
export var insertEmployeeLeaveSchema = z.object({}).passthrough();
export var insertEmployeeDeductionSchema = z.object({}).passthrough();
export var insertEmployeeViolationSchema = z.object({}).passthrough();
/** ===== Licenses ===== */
export var insertLicenseSchema = z.object({}).passthrough();
/** ===== Auth ===== */
export var insertLoginSchema = z.object({}).passthrough();
/** ===== Tables (placeholders) ===== */
export var companies = {};
export var employees = {};
export var licenses = {};
export var users = {};
export var companyUsers = {};
export var departments = {};
export var roles = {};
