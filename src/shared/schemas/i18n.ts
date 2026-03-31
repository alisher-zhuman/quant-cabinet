import { z } from "zod";

import { SUPPORTED_LANGUAGES } from "../constants";

export const ChangeLanguagePayloadSchema = z.object({
  lang: z.enum(SUPPORTED_LANGUAGES),
});
