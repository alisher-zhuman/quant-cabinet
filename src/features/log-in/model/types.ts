import type { infer as ZodInfer } from "zod";

import type { LogInSchema } from "./schemas";

export type LogInFormValues = ZodInfer<typeof LogInSchema>;
