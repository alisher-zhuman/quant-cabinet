import { z } from "zod";

import { AUTH_ROLES } from "@shared/constants";
import { createListResponseSchema } from "@shared/schemas";
import type { AuthState } from "@shared/types";

const MeterCompanySchema = z
  .looseObject({
    id: z.string(),
    name: z.string(),
    address: z.string().optional(),
    createdAt: z.string().optional(),
    isArchived: z.boolean().optional(),
  })
  .nullable();

const MeterControllerSchema = z
  .looseObject({
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
    createdAt: z.string(),
    updatedAt: z.string(),
    isArchived: z.boolean(),
  })
  .nullable();

export const MeterRowSchema = z.looseObject({
  id: z.string(),
  serialNumber: z.string(),
  lastValue: z.string().nullable(),
  valveState: z.string(),
  pendingCommand: z.string(),
  locationType: z.string(),
  meterStatus: z.string(),
  port: z.number(),
  accountNumber: z.string().nullable(),
  clientName: z.string().nullable(),
  address: z.string().nullable(),
  descriptions: z.string().nullable(),
  isValveLockedByManager: z.boolean(),
  company: MeterCompanySchema,
  controller: MeterControllerSchema,
  isArchived: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  readings: z.number(),
});

export const MeterDetailsSchema = z.looseObject({
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
  company: MeterCompanySchema,
  controller: MeterControllerSchema,
});

export const MetersResponseSchema = createListResponseSchema(MeterRowSchema);

export const MeterLocationTypeSchema = z.enum(["indoor", "well", "cabinet"]);

export const createMeterFormSchema = (
  t: (key: string) => string,
  currentRole?: AuthState["role"],
) =>
  z.object({
    serialNumber: z
      .string()
      .trim()
      .min(1, t("validation.requiredSerialNumber")),
    controllerId: z.string().trim().min(1, t("validation.requiredController")),
    companyId:
      currentRole === AUTH_ROLES.MANAGER
        ? z.string().optional()
        : z.string().trim().min(1, t("validation.requiredCompany")),
    locationType: MeterLocationTypeSchema,
    port: z
      .string()
      .trim()
      .min(1, t("validation.requiredPort"))
      .refine((value) => /^\d+$/.test(value), {
        message: t("validation.invalidPort"),
      })
      .refine((value) => Number(value) >= 1, {
        message: t("validation.minPort"),
      })
      .refine((value) => Number(value) <= 8, {
        message: t("validation.maxPort"),
      }),
    accountNumber: z
      .string()
      .trim()
      .min(1, t("validation.requiredAccountNumber")),
    clientName: z.string().trim().min(1, t("validation.requiredClientName")),
    address: z.string().trim().min(1, t("validation.requiredAddress")),
    descriptions: z.string().trim(),
  });

export const MeterPendingCommandSchema = z.enum(["none", "open", "close"]);

export const updateMeterFormSchema = (
  t: (key: string) => string,
  currentRole?: AuthState["role"],
) =>
  z.object({
    serialNumber: z
      .string()
      .trim()
      .min(1, t("validation.requiredSerialNumber")),
    controllerId: z.string().trim().min(1, t("validation.requiredController")),
    companyId:
      currentRole === AUTH_ROLES.MANAGER
        ? z.string().optional()
        : z.string().trim().min(1, t("validation.requiredCompany")),
    locationType: MeterLocationTypeSchema,
    port: z
      .string()
      .trim()
      .min(1, t("validation.requiredPort"))
      .refine((value) => /^\d+$/.test(value), {
        message: t("validation.invalidPort"),
      })
      .refine((value) => Number(value) >= 1, {
        message: t("validation.minPort"),
      })
      .refine((value) => Number(value) <= 8, {
        message: t("validation.maxPort"),
      }),
    accountNumber: z
      .string()
      .trim()
      .min(1, t("validation.requiredAccountNumber")),
    clientName: z.string().trim().min(1, t("validation.requiredClientName")),
    address: z.string().trim().min(1, t("validation.requiredAddress")),
    descriptions: z.string().trim(),
    pendingCommand: MeterPendingCommandSchema,
    isValveLockedByManager: z.boolean(),
    isArchived: z.boolean(),
  });

export const CreateMeterPayloadSchema = z.object({
  serialNumber: z.string().trim().min(1),
  controllerId: z.string().trim().min(1),
  companyId: z.string().trim().optional(),
  locationType: MeterLocationTypeSchema,
  port: z.number().int().min(1).max(8),
  accountNumber: z.string().trim().min(1),
  clientName: z.string().trim().min(1),
  address: z.string().trim().min(1),
  descriptions: z.string().trim(),
});

export const UpdateMeterPayloadSchema = z.object({
  meterId: z.string().trim().min(1),
  serialNumber: z.string().trim().min(1),
  controllerId: z.string().trim().min(1),
  companyId: z.string().trim().optional(),
  locationType: MeterLocationTypeSchema,
  port: z.number().int().min(1).max(8),
  accountNumber: z.string().trim().min(1),
  clientName: z.string().trim().min(1),
  address: z.string().trim().min(1),
  descriptions: z.string().trim(),
  pendingCommand: MeterPendingCommandSchema,
  isValveLockedByManager: z.boolean(),
  isArchived: z.boolean(),
});

export const DeleteMeterPayloadSchema = z.object({
  id: z.string(),
});
