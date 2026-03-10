import { z } from "zod";

export const MeterRowSchema = z.looseObject({
  id: z.string(),
  lastValue: z.string().nullable().optional(),
  valveState: z.string().optional(),
  createdAt: z.string(),
  readings: z.number(),
});

export const MetersResponseSchema = z.looseObject({
  data: z.array(MeterRowSchema),
  total: z.number(),
});
