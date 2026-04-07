import type { infer as ZodInfer } from "zod";

import type { ListQueryParams } from "@shared/types";

import type {
  createUserFormSchema,
  CreateUserPayloadSchema,
  DeleteUserPayloadSchema,
  UpdateUserPayloadSchema,
  UserRowSchema,
  UsersResponseSchema,
} from "./schemas";

export type UserRow = ZodInfer<typeof UserRowSchema>;
export type UserDetails = ZodInfer<typeof UserRowSchema>;
export type UsersResponse = ZodInfer<typeof UsersResponseSchema>;
export type UserFormValues = ZodInfer<ReturnType<typeof createUserFormSchema>>;
export type CreateUserPayload = ZodInfer<typeof CreateUserPayloadSchema>;
export type DeleteUserPayload = ZodInfer<typeof DeleteUserPayloadSchema>;
export type UpdateUserPayload = ZodInfer<typeof UpdateUserPayloadSchema>;

export interface UsersListQueryParams extends ListQueryParams {
  search?: string;
  firstName?: string;
  lastName?: string;
  companyId?: string;
}
