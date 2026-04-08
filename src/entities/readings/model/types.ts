import type { infer as ZodInfer } from "zod";

import type { ReadingRowSchema, ReadingsResponseSchema } from "./schemas";

export type ReadingRow = ZodInfer<typeof ReadingRowSchema>;
export type ReadingsResponse = ZodInfer<typeof ReadingsResponseSchema>;

export interface ReadingsListQueryParams {
  meterId: string;
  serialNumber: string;
  port?: number;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}
