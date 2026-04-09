import { z } from "zod";

import { createListResponseSchema } from "@shared/schemas";

const MeterCompanySchema = z
  .object({
    id: z.string(),
    name: z.string(),
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
  meterStatus: z.string(),
  accountNumber: z.string().nullable(),
  clientName: z.string().nullable(),
  company: MeterCompanySchema,
  createdAt: z.string(),
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
  clientName: z.preprocess((value) => (value === null ? "" : value), z.string()),
  address: z.preprocess((value) => (value === null ? "" : value), z.string()),
  descriptions: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string(),
  ),
  isValveLockedByManager: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isArchived: z.boolean(),
  controller: MeterControllerSchema,
});

export const MetersResponseSchema = createListResponseSchema(MeterRowSchema);

export const DeleteMeterPayloadSchema = z.object({
  id: z.string(),
});
