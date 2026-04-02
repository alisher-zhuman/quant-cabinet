import type { infer as ZodInfer } from "zod";

import type {
  createUserFormSchema,
  CreateUserPayloadSchema,
  DeleteUserPayloadSchema,
  UserRowSchema,
  UsersResponseSchema,
} from "./schemas";

export type UserRow = ZodInfer<typeof UserRowSchema>;
export type UsersResponse = ZodInfer<typeof UsersResponseSchema>;
export type CreateUserFormValues = ZodInfer<ReturnType<typeof createUserFormSchema>>;
export type CreateUserPayload = ZodInfer<typeof CreateUserPayloadSchema>;
export type DeleteUserPayload = ZodInfer<typeof DeleteUserPayloadSchema>;
