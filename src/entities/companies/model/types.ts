import type { infer as ZodInfer } from "zod";

import type {
  CompaniesResponseSchema,
  CompanyDetailsSchema,
  CompanyRowSchema,
  CreateCompanyPayloadSchema,
  DeleteCompanyPayloadSchema,
  UpdateCompanyPayloadSchema,
} from "./schemas";

export type CompanyRow = ZodInfer<typeof CompanyRowSchema>;
export type CompanyDetails = ZodInfer<typeof CompanyDetailsSchema>;
export type CompaniesResponse = ZodInfer<typeof CompaniesResponseSchema>;
export type CreateCompanyPayload = ZodInfer<typeof CreateCompanyPayloadSchema>;
export type UpdateCompanyPayload = ZodInfer<typeof UpdateCompanyPayloadSchema>;
export type DeleteCompanyPayload = ZodInfer<typeof DeleteCompanyPayloadSchema>;
