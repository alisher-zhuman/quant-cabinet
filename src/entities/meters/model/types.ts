import type { infer as ZodInfer } from "zod";

import type { MeterRowSchema } from "./schemas";

export type MeterRow = ZodInfer<typeof MeterRowSchema>;
