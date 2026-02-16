import { z } from "zod";

export const UserRoleSchema = z.enum(["user", "admin"]);

export const LogInFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email обязателен")
    .pipe(z.email("Введите корректный email")),
  password: z.string().min(1, "Пароль обязателен"),
});

export const LogInResponseSchema = z.object({
  accessToken: z.string().min(1),
  role: UserRoleSchema,
});
