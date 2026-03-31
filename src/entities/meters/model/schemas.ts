import { z } from "zod";

export const MeterRowSchema = z.looseObject({
  id: z.string(),
  serialNumber: z.string(),
  lastValue: z.string().nullable(),
  valveState: z.string(),
  meterStatus: z.string(),
  createdAt: z.string(),
  readings: z.number(),
});

export const MetersResponseSchema = z.looseObject({
  data: z.array(MeterRowSchema),
  total: z.number(),
});
