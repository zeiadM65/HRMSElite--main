// server/shared/schema.ts
import { z } from 'zod';

/** ===== Employees ===== */
export const insertEmployeeSchema = z.object({}).passthrough();
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export const insertEmployeeLeaveSchema = z.object({}).passthrough();
export const insertEmployeeDeductionSchema = z.object({}).passthrough();
export const insertEmployeeViolationSchema = z.object({}).passthrough();

/** ===== Licenses ===== */
export const insertLicenseSchema = z.object({}).passthrough();
export type InsertLicense = z.infer<typeof insertLicenseSchema>;

/** ===== Auth ===== */
export const insertLoginSchema = z.object({}).passthrough();

/** ===== Tables (placeholders) ===== */
export const companies    = {} as any;
export const employees    = {} as any;
export const licenses     = {} as any;
export const users        = {} as any;
export const companyUsers = {} as any;
export const departments  = {} as any;
export const roles        = {} as any;
