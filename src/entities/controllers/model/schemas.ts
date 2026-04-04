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

export const ControllerTypeSchema = z.enum(["single", "multiple"]);

export const createControllerFormSchema = (t: (key: string) => string) =>
  z.object({
    serialNumber: z.string().trim().min(1, t("validation.requiredSerialNumber")),
    companyId: z.string().trim().min(1, t("validation.requiredCompany")),
    type: ControllerTypeSchema,
    simIMSI: z.string().trim().min(1, t("validation.requiredSimIMSI")),
    phoneNumber: z.string().trim().min(1, t("validation.requiredPhoneNumber")),
    descriptions: z
      .string()
      .trim()
      .min(1, t("validation.requiredDescriptions")),
  });

export const CreateControllerPayloadSchema = z.object({
  serialNumber: z.string().trim().min(1),
  companyId: z.string().trim().min(1),
  type: ControllerTypeSchema,
  simIMSI: z.string().trim().min(1),
  phoneNumber: z.string().trim().min(1),
  descriptions: z.string().trim().min(1),
});
