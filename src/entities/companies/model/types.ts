import type { infer as ZodInfer } from "zod";

import type {
  CompaniesResponseSchema,
  CompanyRowSchema,
  CreateCompanyPayloadSchema,
  DeleteCompanyPayloadSchema,
} from "./schemas";

export type CompanyRow = ZodInfer<typeof CompanyRowSchema>;
export type CompaniesResponse = ZodInfer<typeof CompaniesResponseSchema>;
export type CreateCompanyPayload = ZodInfer<typeof CreateCompanyPayloadSchema>;

export interface ToggleCompanyArchivePayload {
  id: string;
  isArchived: boolean;
}

export type DeleteCompanyPayload = ZodInfer<typeof DeleteCompanyPayloadSchema>;
