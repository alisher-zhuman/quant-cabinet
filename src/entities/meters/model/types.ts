import type { infer as ZodInfer } from "zod";

import type { MeterRowSchema, MetersResponseSchema } from "./schemas";

export type MeterRow = ZodInfer<typeof MeterRowSchema>;
export type MetersResponse = ZodInfer<typeof MetersResponseSchema>;
