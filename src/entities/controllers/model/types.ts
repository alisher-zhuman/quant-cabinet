import type { infer as ZodInfer } from "zod";

import type { ControllerRowSchema } from "./schemas";

export type ControllerRow = ZodInfer<typeof ControllerRowSchema>;
