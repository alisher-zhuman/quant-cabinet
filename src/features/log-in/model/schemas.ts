import { z } from "zod";

export const LogInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email обязателен")
    .pipe(z.email("Введите корректный email")),
  password: z.string().min(1, "Пароль обязателен"),
});
