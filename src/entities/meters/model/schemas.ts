import { z } from "zod";

import { createListResponseSchema } from "@shared/schemas";

export const MeterRowSchema = z.looseObject({
  id: z.string(),
  serialNumber: z.string(),
  lastValue: z.string().nullable(),
  valveState: z.string(),
  meterStatus: z.string(),
  accountNumber: z.string().nullable(),
  clientName: z.string().nullable(),
  company: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
  createdAt: z.string(),
  readings: z.number(),
});

export const MetersResponseSchema = createListResponseSchema(MeterRowSchema);

export const DeleteMeterPayloadSchema = z.object({
  id: z.string(),
});
