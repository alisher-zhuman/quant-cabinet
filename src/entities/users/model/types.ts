import type { infer as ZodInfer } from "zod";

import type { UserRowSchema } from "./schemas";

export type UserRow = ZodInfer<typeof UserRowSchema>;
