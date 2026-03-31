import { z } from "zod";

import { createListResponseSchema } from "@shared/schemas";

const ControllerCompanySchema = z
  .looseObject({
    name: z.string().optional(),
  })
  .nullable()
  .optional();

const ControllerMeterSchema = z.looseObject({
  id: z.string().optional(),
});

export const ControllerRowSchema = z.looseObject({
  id: z.string(),
  serialNumber: z.string(),
  createdAt: z.string(),
  company: ControllerCompanySchema,
  meters: z.array(ControllerMeterSchema).optional(),
});

export const ControllersResponseSchema = createListResponseSchema(
  ControllerRowSchema,
);

export const DeleteControllerPayloadSchema = z.object({
  id: z.string(),
});
