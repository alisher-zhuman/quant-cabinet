import type { infer as ZodInfer } from "zod";

import type {
  UserCompanySchema,
  UserRowSchema,
  UsersResponseSchema,
} from "./schemas";

export type UserCompany = ZodInfer<typeof UserCompanySchema>;
export type UserRow = ZodInfer<typeof UserRowSchema>;
export type UsersResponse = ZodInfer<typeof UsersResponseSchema>;
