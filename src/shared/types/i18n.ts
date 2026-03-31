import type { infer as ZodInfer } from "zod";

import type { SUPPORTED_LANGUAGES } from "../constants";
import type { ChangeLanguagePayloadSchema } from "../schemas/i18n";

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];
export type ChangeLanguagePayload = ZodInfer<typeof ChangeLanguagePayloadSchema>;
