import { z } from "zod";

import { isManager } from "@shared/helpers";
import { createListResponseSchema } from "@shared/schemas";
import type { UserRole } from "@shared/types";

const ControllerCompanySchema = z
  .looseObject({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    isArchived: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .nullable()
  .optional();

const ControllerMeterSchema = z.looseObject({
  id: z.string(),
  serialNumber: z.string(),
  lastValue: z.string().nullable(),
  valveState: z.string(),
  pendingCommand: z.string(),
  locationType: z.string(),
  meterStatus: z.string(),
  port: z.number(),
  accountNumber: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
  clientName: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
  address: z.preprocess((value) => (value === null ? "" : value), z.string()),
  descriptions: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
  isValveLockedByManager: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isArchived: z.boolean(),
});

export const transferControllerFormSchema = (t: (key: string) => string) =>
  z.object({
    companyId: z.string().trim().min(1, t("validation.requiredCompany")),
  });

export const controllerBulkUploadFormSchema = (t: (key: string) => string) =>
  z.object({
    companyId: z.string().trim().min(1, t("controllers.bulkUpload.import.validation.required")),
    file: z
      .union([z.instanceof(File), z.null()])
      .refine((value) => value instanceof File, {
        message: t("controllers.bulkUpload.import.validation.required"),
      }),
  });

export const TransferControllerPayloadSchema = z.object({
  controllerId: z.string(),
  companyId: z.string().trim().min(1),
});

export const ControllerRowSchema = z.looseObject({
  id: z.string(),
  serialNumber: z.string(),
  batteryStatus: z.preprocess(
    (value) => (value === null ? 0 : value),
    z.number(),
  ),
  signalStatus: z.preprocess(
    (value) => (value === null ? 0 : value),
    z.number(),
  ),
  controllerStatus: z.string(),
  controllerType: z.string(),
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
  updatedAt: z.string().optional(),
  company: ControllerCompanySchema,
  meters: z.array(ControllerMeterSchema).optional(),
});

export const ControllersResponseSchema =
  createListResponseSchema(ControllerRowSchema);

export const DeleteControllerPayloadSchema = z.object({
  id: z.string(),
});

export const ControllerTypeSchema = z.enum(["single", "multiple"]);

export const createControllerFormSchema = (
  t: (key: string) => string,
  currentRole?: UserRole | null,
) =>
  z
    .object({
      serialNumber: z
        .string()
        .trim()
        .min(1, t("validation.requiredSerialNumber")),
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
    })
    .superRefine((values, context) => {
      if (!values.companyId && !isManager(currentRole)) {
        context.addIssue({
          code: "custom",
          message: t("validation.requiredCompany"),
          path: ["companyId"],
        });
      }
    });

export const updateControllerFormSchema = (
  t: (key: string) => string,
  currentRole?: UserRole | null,
) =>
  z
    .object({
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
    })
    .superRefine((values, context) => {
      if (!values.companyId && !isManager(currentRole)) {
        context.addIssue({
          code: "custom",
          message: t("validation.requiredCompany"),
          path: ["companyId"],
        });
      }
    });

export const CreateControllerPayloadSchema = z.object({
  serialNumber: z.string().trim().min(1),
  companyId: z.string().trim().optional(),
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
