import type { infer as ZodInfer } from "zod";

import type {
  ForgotPasswordFormSchema,
  LogInFormSchema,
  LogInResponseSchema,
} from "./schemas";

export type ForgotPasswordFormValues = ZodInfer<ForgotPasswordFormSchema>;
export type LogInFormValues = ZodInfer<LogInFormSchema>;
export type LogInResponse = ZodInfer<typeof LogInResponseSchema>;
