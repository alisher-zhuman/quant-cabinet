import type { infer as ZodInfer } from "zod";

import type {
  CompaniesResponseSchema,
  CompanyRowSchema,
  CreateCompanyPayloadSchema,
  DeleteCompanyPayloadSchema,
  UpdateCompanyPayloadSchema,
} from "./schemas";

export type CompanyRow = ZodInfer<typeof CompanyRowSchema>;
export type CompaniesResponse = ZodInfer<typeof CompaniesResponseSchema>;
export type CreateCompanyPayload = ZodInfer<typeof CreateCompanyPayloadSchema>;
export type UpdateCompanyPayload = ZodInfer<typeof UpdateCompanyPayloadSchema>;
export type DeleteCompanyPayload = ZodInfer<typeof DeleteCompanyPayloadSchema>;
