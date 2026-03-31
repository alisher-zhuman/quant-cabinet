import { API_PATHS } from "../constants";
import { ChangeLanguagePayloadSchema } from "../schemas";
import type { ChangeLanguagePayload } from "../types";
import { api } from "./index";

export const changeLanguage = async (
  payload: ChangeLanguagePayload,
): Promise<void> => {
  const validPayload = ChangeLanguagePayloadSchema.parse(payload);

  await api.post(API_PATHS.USERS_LANG, validPayload);
};
