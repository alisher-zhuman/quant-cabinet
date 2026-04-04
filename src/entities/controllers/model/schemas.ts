import { z } from "zod";

import { createListResponseSchema } from "@shared/schemas";

const ControllerCompanySchema = z
  .looseObject({
    id: z.string().optional(),
    name: z.string().optional(),
  })
  .nullable()
  .optional();

const ControllerMeterSchema = z.looseObject({
  id: z.string().optional(),
});

export const transferControllerFormSchema = (t: (key: string) => string) =>
  z.object({
    companyId: z.string().trim().min(1, t("validation.requiredCompany")),
  });

export const TransferControllerPayloadSchema = z.object({
  controllerId: z.string(),
  companyId: z.string().trim().min(1),
});

export const ControllerRowSchema = z.looseObject({
  id: z.string(),
  serialNumber: z.string(),
  simIMSI: z.preprocess((value) => (value === null ? "" : value), z.string()),
  phoneNumber: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
  descriptions: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
  correctTime: z.boolean(),
  correctInterval: z.boolean(),
  setInterval: z.preprocess(
    (value) => (value === null ? undefined : value),
    z.number().int().min(1).max(255).optional(),
  ),
  isArchived: z.boolean(),
  createdAt: z.string(),
  company: ControllerCompanySchema,
  meters: z.array(ControllerMeterSchema).optional(),
});

export const ControllersResponseSchema =
  createListResponseSchema(ControllerRowSchema);

export const DeleteControllerPayloadSchema = z.object({
  id: z.string(),
});

export const ControllerTypeSchema = z.enum(["single", "multiple"]);

export const createControllerFormSchema = (t: (key: string) => string) =>
  z.object({
    serialNumber: z
      .string()
      .trim()
      .min(1, t("validation.requiredSerialNumber")),
    companyId: z.string().trim().min(1, t("validation.requiredCompany")),
    type: ControllerTypeSchema,
    simIMSI: z.string().trim().min(1, t("validation.requiredSimIMSI")),
    phoneNumber: z.string().trim().min(1, t("validation.requiredPhoneNumber")),
    descriptions: z
      .string()
      .trim()
      .min(1, t("validation.requiredDescriptions")),
    correctTime: z.boolean(),
    correctInterval: z.boolean(),
    setInterval: z
      .string()
      .trim()
      .min(1, t("validation.requiredSetInterval"))
      .refine((value) => /^\d+$/.test(value), {
        message: t("validation.invalidSetInterval"),
      })
      .refine((value) => Number(value) >= 1, {
        message: t("validation.minSetInterval"),
      })
      .refine((value) => Number(value) <= 255, {
        message: t("validation.maxSetInterval"),
      }),
    isArchived: z.boolean(),
  });

export const updateControllerFormSchema = (t: (key: string) => string) =>
  z.object({
    serialNumber: z.string().trim(),
    companyId: z.string().trim(),
    type: ControllerTypeSchema,
    simIMSI: z.string().trim().min(1, t("validation.requiredSimIMSI")),
    phoneNumber: z.string().trim().min(1, t("validation.requiredPhoneNumber")),
    descriptions: z
      .string()
      .trim()
      .min(1, t("validation.requiredDescriptions")),
    correctTime: z.boolean(),
    correctInterval: z.boolean(),
    setInterval: z
      .string()
      .trim()
      .min(1, t("validation.requiredSetInterval"))
      .refine((value) => /^\d+$/.test(value), {
        message: t("validation.invalidSetInterval"),
      })
      .refine((value) => Number(value) >= 1, {
        message: t("validation.minSetInterval"),
      })
      .refine((value) => Number(value) <= 255, {
        message: t("validation.maxSetInterval"),
      }),
    isArchived: z.boolean(),
  });

export const CreateControllerPayloadSchema = z.object({
  serialNumber: z.string().trim().min(1),
  companyId: z.string().trim().min(1),
  type: ControllerTypeSchema,
  simIMSI: z.string().trim().min(1),
  phoneNumber: z.string().trim().min(1),
  descriptions: z.string().trim().min(1),
});

export const UpdateControllerPayloadSchema = z.object({
  id: z.string(),
  simIMSI: z.string().trim().min(1),
  phoneNumber: z.string().trim().min(1),
  descriptions: z.string().trim().min(1),
  correctTime: z.boolean(),
  correctInterval: z.boolean(),
  setInterval: z.number().int().min(1).max(255),
  isArchived: z.boolean(),
});
