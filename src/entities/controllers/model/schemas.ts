import { z } from "zod";

export const ControllerCompanySchema = z
  .looseObject({
    name: z.string().optional(),
  })
  .nullable()
  .optional();

export const ControllerMeterSchema = z.looseObject({
  id: z.string().optional(),
});

export const ControllerRowSchema = z.looseObject({
  id: z.string(),
  serialNumber: z.string(),
  createdAt: z.string(),
  company: ControllerCompanySchema,
  meters: z.array(ControllerMeterSchema).optional(),
});

export const ControllersResponseSchema = z.looseObject({
  data: z.array(ControllerRowSchema),
  total: z.number(),
});

export const DeleteControllerPayloadSchema = z.object({
  id: z.string(),
});
