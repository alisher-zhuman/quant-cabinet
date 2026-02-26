import { z } from "zod";

export const UserRoleSchema = z.enum(["user", "admin"]);

export const UserRowSchema = z
  .object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: UserRoleSchema,
    createdAt: z.string(),
  })
  .passthrough();

export const UsersResponseSchema = z
  .object({
    data: z.array(UserRowSchema),
    total: z.number(),
  })
  .passthrough();
