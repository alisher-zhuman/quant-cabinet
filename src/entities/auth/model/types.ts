import type { infer as ZodInfer } from "zod";

import type { LogInFormSchema, LogInResponseSchema } from "./schemas";

export type LogInFormValues = ZodInfer<typeof LogInFormSchema>;
export type LogInResponse = ZodInfer<typeof LogInResponseSchema>;
