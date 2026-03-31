import type { infer as ZodInfer } from "zod";

import type {
  DeleteMeterPayloadSchema,
  MeterRowSchema,
  MetersResponseSchema,
} from "./schemas";

export type DeleteMeterPayload = ZodInfer<typeof DeleteMeterPayloadSchema>;
export type MeterRow = ZodInfer<typeof MeterRowSchema>;
export type MetersResponse = ZodInfer<typeof MetersResponseSchema>;
