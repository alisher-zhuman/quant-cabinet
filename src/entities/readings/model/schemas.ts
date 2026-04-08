import { z } from "zod";

export const ReadingRowSchema = z.looseObject({
  id: z.string(),
  value: z.string(),
  readingAt: z.string(),
  serialNumber: z.string(),
  port: z.number().int().min(1).max(8),
  accountNumber: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
  clientName: z.preprocess((value) => (value === null ? "" : value), z.string()),
  address: z.preprocess((value) => (value === null ? "" : value), z.string()),
  locationType: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
});

export const ReadingsResponseSchema = z.looseObject({
  data: z.array(ReadingRowSchema),
  total: z.number(),
  page: z.number().optional(),
  limit: z.number().optional(),
  totalPages: z.number().optional(),
});
