import type { infer as ZodInfer } from "zod";

import type {
  DeleteUserPayloadSchema,
  UserRowSchema,
  UsersResponseSchema,
} from "./schemas";

export type UserRow = ZodInfer<typeof UserRowSchema>;
export type UsersResponse = ZodInfer<typeof UsersResponseSchema>;
export type DeleteUserPayload = ZodInfer<typeof DeleteUserPayloadSchema>;
