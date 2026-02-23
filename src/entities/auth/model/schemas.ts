import { z } from "zod";

import i18next from "i18next";

export const UserRoleSchema = z.enum(["user", "admin"]);

export const createLogInFormSchema = () =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, i18next.t("validation.requiredEmail"))
      .pipe(z.email(i18next.t("validation.invalidEmail"))),
    password: z.string().min(1, i18next.t("validation.requiredPassword")),
  });

export type LogInFormSchema = ReturnType<typeof createLogInFormSchema>;

export const LogInResponseSchema = z.object({
  accessToken: z.string().min(1),
  role: UserRoleSchema,
});
