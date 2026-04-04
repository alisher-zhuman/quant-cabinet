import type { infer as ZodInfer } from "zod";

import type { ListQueryParams } from "@shared/types";

import type {
  ControllerRowSchema,
  ControllersResponseSchema,
  createControllerFormSchema,
  CreateControllerPayloadSchema,
  DeleteControllerPayloadSchema,
  UpdateControllerPayloadSchema,
} from "./schemas";

export type ControllerRow = ZodInfer<typeof ControllerRowSchema>;
export type ControllersResponse = ZodInfer<typeof ControllersResponseSchema>;
export type ControllerFormValues = ZodInfer<
  ReturnType<typeof createControllerFormSchema>
>;
export type CreateControllerPayload = ZodInfer<
  typeof CreateControllerPayloadSchema
>;
export type UpdateControllerPayload = ZodInfer<
  typeof UpdateControllerPayloadSchema
>;
export type DeleteControllerPayload = ZodInfer<
  typeof DeleteControllerPayloadSchema
>;

export interface ControllersListQueryParams extends ListQueryParams {
  companyId?: string;
  serialNumber?: string;
  phoneNumber?: string;
  simIMSI?: string;
}
