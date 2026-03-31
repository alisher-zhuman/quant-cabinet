import { z } from "zod";

import { createListResponseSchema, UserRoleSchema } from "@shared/schemas";

const UserCompanySchema = z
  .looseObject({
    name: z.string(),
  })
  .nullable()
  .optional();

export const UserRowSchema = z.looseObject({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: UserRoleSchema,
  createdAt: z.string(),
  company: UserCompanySchema,
});

export const UsersResponseSchema = createListResponseSchema(UserRowSchema);

export const DeleteUserPayloadSchema = z.object({
  userId: z.string(),
});
