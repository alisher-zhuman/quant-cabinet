import type { infer as ZodInfer } from "zod";

import type { ForgotPasswordPayloadSchema, LogInPayloadSchema } from "./schemas";

export type ForgotPasswordFormValues = ZodInfer<typeof ForgotPasswordPayloadSchema>;
export type LogInFormValues = ZodInfer<typeof LogInPayloadSchema>;
