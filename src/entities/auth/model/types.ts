import type { infer as ZodInfer } from "zod";

import type {
  createForgotPasswordFormSchema,
  createLogInFormSchema,
  LogInResponseSchema,
} from "./schemas";

export type LogInFormSchema = ReturnType<typeof createLogInFormSchema>;
export type ForgotPasswordFormSchema = ReturnType<
  typeof createForgotPasswordFormSchema
>;

export type ForgotPasswordFormValues = ZodInfer<ForgotPasswordFormSchema>;
export type LogInFormValues = ZodInfer<LogInFormSchema>;
export type LogInResponse = ZodInfer<typeof LogInResponseSchema>;
