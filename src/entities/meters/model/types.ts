import type { infer as ZodInfer } from "zod";

import type {
  createMeterFormSchema,
  CreateMeterPayloadSchema,
  DeleteMeterPayloadSchema,
  meterBulkUploadFormSchema,
  MeterDetailsSchema,
  MeterLocationTypeSchema,
  MeterPendingCommandSchema,
  MeterRowSchema,
  MetersResponseSchema,
  updateMeterFormSchema,
  UpdateMeterPayloadSchema,
} from "./schemas";

export type MeterRow = ZodInfer<typeof MeterRowSchema>;
export type MeterDetails = ZodInfer<typeof MeterDetailsSchema>;
export type MetersResponse = ZodInfer<typeof MetersResponseSchema>;
export type MeterFormValues = ZodInfer<ReturnType<typeof createMeterFormSchema>>;
export type MeterEditFormValues = ZodInfer<ReturnType<typeof updateMeterFormSchema>>;
export type CreateMeterPayload = ZodInfer<typeof CreateMeterPayloadSchema>;
export type UpdateMeterPayload = ZodInfer<typeof UpdateMeterPayloadSchema>;
export type MeterLocationType = ZodInfer<typeof MeterLocationTypeSchema>;
export type MeterPendingCommand = ZodInfer<typeof MeterPendingCommandSchema>;
export type DeleteMeterPayload = ZodInfer<typeof DeleteMeterPayloadSchema>;
export type MeterBulkUploadFormValues = ZodInfer<
  ReturnType<typeof meterBulkUploadFormSchema>
>;

export interface BulkImportMetersPayload {
  file: File;
  companyId: string;
}

export interface MetersListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isArchived?: boolean;
  companyId?: string;
  controllerId?: string;
  locationType?: string;
  meterStatus?: string;
  accountNumber?: string;
  clientName?: string;
  address?: string;
  isValveLockedByManager?: string;
}
