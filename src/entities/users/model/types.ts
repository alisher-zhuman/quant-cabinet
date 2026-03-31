import type { infer as ZodInfer } from "zod";

import type {
  DeleteUserPayloadSchema,
  UserCompanySchema,
  UserRowSchema,
  UsersResponseSchema,
} from "./schemas";

export type DeleteUserPayload = ZodInfer<typeof DeleteUserPayloadSchema>;
export type UserCompany = ZodInfer<typeof UserCompanySchema>;
export type UserRow = ZodInfer<typeof UserRowSchema>;
export type UsersResponse = ZodInfer<typeof UsersResponseSchema>;
