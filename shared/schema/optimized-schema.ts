// server/shared/optimized-schema.ts
export type Company = { id: string } & Record<string, unknown>;
export type NewCompany = Omit<Company, 'id'>;

export const companies    = {} as any;
export const employees    = {} as any;
export const licenses     = {} as any;
export const users        = {} as any;
export const companyUsers = {} as any;
