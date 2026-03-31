import type { infer as ZodInfer } from "zod";

import type {
  ChangeUserLanguagePayloadSchema,
  DeleteUserPayloadSchema,
  UserRowSchema,
  UsersResponseSchema,
} from "./schemas";

export type UserRow = ZodInfer<typeof UserRowSchema>;
export type UsersResponse = ZodInfer<typeof UsersResponseSchema>;
export type DeleteUserPayload = ZodInfer<typeof DeleteUserPayloadSchema>;
export type ChangeUserLanguagePayload = ZodInfer<
  typeof ChangeUserLanguagePayloadSchema
>;
