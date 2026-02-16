import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import { LogInFormSchema, LogInResponseSchema } from "../model/schemas";
import type { LogInFormValues, LogInResponse } from "../model/types";

export const logIn = async (
  payload: LogInFormValues,
): Promise<LogInResponse> => {
  const validPayload = LogInFormSchema.parse(payload);

  const response = await api.post(API_PATHS.LOG_IN, validPayload);

  return LogInResponseSchema.parse(response.data);
};
