import { z } from "zod";

import type { TFunction } from "i18next";

import { UserRoleSchema } from "@shared/schemas";

export const createLogInFormSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("validation.requiredEmail"))
      .pipe(z.email(t("validation.invalidEmail"))),
    password: z.string().min(1, t("validation.requiredPassword")),
  });

export const LogInPayloadSchema = z.object({
  email: z.string().trim().min(1).pipe(z.email()),
  password: z.string().min(1),
});

export const createForgotPasswordFormSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("validation.requiredEmail"))
      .pipe(z.email(t("validation.invalidEmail"))),
  });

export const ForgotPasswordPayloadSchema = z.object({
  email: z.string().trim().min(1).pipe(z.email()),
});

export const LogInResponseSchema = z.looseObject({
  accessToken: z.string().min(1),
  role: UserRoleSchema,
  company: z
    .looseObject({ id: z.string() })
    .nullable()
    .optional(),
});
