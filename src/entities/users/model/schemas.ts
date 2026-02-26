import { z } from "zod";

export const UserRoleSchema = z.enum(["user", "admin"]);

export const UserRowSchema = z.looseObject({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: UserRoleSchema,
  createdAt: z.string(),
});

export const UsersResponseSchema = z.looseObject({
  data: z.array(UserRowSchema),
  total: z.number(),
});
