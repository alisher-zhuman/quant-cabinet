import type { infer as ZodInfer } from "zod";

import type {
  DeleteMeterPayloadSchema,
  MeterDetailsSchema,
  MeterRowSchema,
  MetersResponseSchema,
} from "./schemas";

export type MeterRow = ZodInfer<typeof MeterRowSchema>;
export type MeterDetails = ZodInfer<typeof MeterDetailsSchema>;
export type MetersResponse = ZodInfer<typeof MetersResponseSchema>;
export type DeleteMeterPayload = ZodInfer<typeof DeleteMeterPayloadSchema>;

export interface MetersListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isArchived?: boolean;
  companyId?: string;
  serialNumber?: string;
  locationType?: string;
  meterStatus?: string;
  accountNumber?: string;
  clientName?: string;
  address?: string;
  isValveLockedByManager?: string;
}
