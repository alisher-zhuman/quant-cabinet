import type { infer as ZodInfer } from "zod";

import type {
  ControllerRowSchema,
  ControllersResponseSchema,
  DeleteControllerPayloadSchema,
} from "./schemas";

export type ControllerRow = ZodInfer<typeof ControllerRowSchema>;
export type ControllersResponse = ZodInfer<typeof ControllersResponseSchema>;

export type DeleteControllerPayload = ZodInfer<
  typeof DeleteControllerPayloadSchema
>;
