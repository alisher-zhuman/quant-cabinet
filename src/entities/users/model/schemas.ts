import { z } from "zod";

import { createListResponseSchema, UserRoleSchema } from "@shared/schemas";

const CreateUserRoleSchema = UserRoleSchema.exclude(["admin"]);

const UserCompanySchema = z
  .looseObject({
    name: z.string(),
  })
  .nullable()
  .optional();

export const UserRowSchema = z.looseObject({
  id: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
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

export const createUserFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("validation.requiredEmail"))
      .email(t("validation.invalidEmail")),
    firstName: z.string().trim().min(1, t("validation.requiredFirstName")),
    lastName: z.string().trim().min(1, t("validation.requiredLastName")),
    role: CreateUserRoleSchema,
    phoneNumber: z.string().trim().min(1, t("validation.requiredPhoneNumber")),
    descriptions: z
      .string()
      .trim()
      .min(1, t("validation.requiredDescriptions")),
    company: z.string().trim().min(1, t("validation.requiredCompany")),
  });

export const CreateUserPayloadSchema = z.object({
  email: z.string().trim().email(),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  role: CreateUserRoleSchema,
  phoneNumber: z.string().trim().min(1),
  descriptions: z.string().trim().min(1),
  company: z.string().trim().min(1),
});
