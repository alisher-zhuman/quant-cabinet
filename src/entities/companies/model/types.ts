import type { infer as ZodInfer } from "zod";

import type {
  CompanyRowSchema,
  CreateCompanyPayloadSchema,
} from "./schemas";

export type CompanyRow = ZodInfer<typeof CompanyRowSchema>;
export type CreateCompanyPayload = ZodInfer<typeof CreateCompanyPayloadSchema>;
