import { z } from "zod";

import { UserRoleSchema } from "@shared/schemas";

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

export const UsersResponseSchema = z.looseObject({
  data: z.array(UserRowSchema),
  total: z.number(),
});

export const DeleteUserPayloadSchema = z.object({
  userId: z.string(),
});
