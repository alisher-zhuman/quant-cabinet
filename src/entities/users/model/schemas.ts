import { z } from "zod";

import { createListResponseSchema, UserRoleSchema } from "@shared/schemas";

const UserCompanySchema = z
  .looseObject({
    id: z.string(),
    name: z.string(),
    address: z.preprocess((value) => (value === null ? "" : value), z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
    isArchived: z.boolean(),
  })
  .nullable()
  .optional();

export const UserRowSchema = z.looseObject({
  id: z.string(),
  email: z.string(),
  phoneNumber: z.preprocess((value) => (value === null ? "" : value), z.string()),
  firstName: z.string(),
  lastName: z.string(),
  descriptions: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
  role: UserRoleSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  isArchived: z.boolean(),
  company: UserCompanySchema,
});

export const UsersResponseSchema = createListResponseSchema(UserRowSchema);

export const DeleteUserPayloadSchema = z.object({
  userId: z.string(),
});

export const createUserFormSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z
        .string()
        .trim()
        .min(1, t("validation.requiredEmail"))
        .pipe(z.email(t("validation.invalidEmail"))),
      firstName: z.string().trim().min(1, t("validation.requiredFirstName")),
      lastName: z.string().trim().min(1, t("validation.requiredLastName")),
      role: UserRoleSchema,
      phoneNumber: z.string().trim().min(1, t("validation.requiredPhoneNumber")),
      descriptions: z
        .string()
        .trim()
        .min(1, t("validation.requiredDescriptions")),
      company: z.string().trim(),
      isArchived: z.boolean(),
    })
    .superRefine((values, context) => {
      if (values.role !== "admin" && !values.company) {
        context.addIssue({
          code: "custom",
          message: t("validation.requiredCompany"),
          path: ["company"],
        });
      }
    });

export const updateUserFormSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z
        .string()
        .trim()
        .min(1, t("validation.requiredEmail"))
        .pipe(z.email(t("validation.invalidEmail"))),
      firstName: z.string().trim().min(1, t("validation.requiredFirstName")),
      lastName: z.string().trim().min(1, t("validation.requiredLastName")),
      role: UserRoleSchema,
      phoneNumber: z.string().trim().min(1, t("validation.requiredPhoneNumber")),
      descriptions: z
        .string()
        .trim()
        .min(1, t("validation.requiredDescriptions")),
      company: z.string().trim(),
      isArchived: z.boolean(),
    })
    .superRefine((values, context) => {
      if (values.role !== "admin" && !values.company) {
        context.addIssue({
          code: "custom",
          message: t("validation.requiredCompany"),
          path: ["company"],
        });
      }
    });

export const CreateUserPayloadSchema = z
  .object({
    email: z.string().trim().pipe(z.email()),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    role: UserRoleSchema,
    phoneNumber: z.string().trim().min(1),
    descriptions: z.string().trim().min(1),
    company: z.string().trim().optional(),
  })
  .superRefine((values, context) => {
    if (values.role !== "admin" && !values.company) {
      context.addIssue({
        code: "custom",
        message: "Company is required",
        path: ["company"],
      });
    }
  });

export const UpdateUserPayloadSchema = z
  .object({
    userId: z.string(),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    role: UserRoleSchema,
    phoneNumber: z.string().trim().min(1),
    descriptions: z.string().trim().min(1),
    company: z.string().trim(),
    isArchived: z.boolean(),
  })
  .superRefine((values, context) => {
    if (values.role !== "admin" && !values.company) {
      context.addIssue({
        code: "custom",
        message: "Company is required",
        path: ["company"],
      });
    }
  });
