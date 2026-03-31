import type { infer as ZodInfer } from "zod";

import type {
  CompaniesResponseSchema,
  CompanyRowSchema,
  CompanyUserSchema,
  CreateCompanyPayloadSchema,
  DeleteCompanyPayloadSchema,
} from "./schemas";

export type CompanyUser = ZodInfer<typeof CompanyUserSchema>;
export type CompanyRow = ZodInfer<typeof CompanyRowSchema>;
export type CompaniesResponse = ZodInfer<typeof CompaniesResponseSchema>;
export type CreateCompanyPayload = ZodInfer<typeof CreateCompanyPayloadSchema>;

export interface ToggleCompanyArchivePayload {
  id: string;
  isArchived: boolean;
}

export type DeleteCompanyPayload = ZodInfer<typeof DeleteCompanyPayloadSchema>;
