import type { infer as ZodInfer } from "zod";

import type {
  ControllerCompanySchema,
  ControllerMeterSchema,
  ControllerRowSchema,
  ControllersResponseSchema,
  DeleteControllerPayloadSchema,
} from "./schemas";

export type ControllerCompany = ZodInfer<typeof ControllerCompanySchema>;
export type ControllerMeter = ZodInfer<typeof ControllerMeterSchema>;
export type ControllerRow = ZodInfer<typeof ControllerRowSchema>;
export type ControllersResponse = ZodInfer<typeof ControllersResponseSchema>;

export type DeleteControllerPayload = ZodInfer<
  typeof DeleteControllerPayloadSchema
>;
