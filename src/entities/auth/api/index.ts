import { api } from "@shared/api";

import { LogInFormSchema, LogInResponseSchema } from "../model/schemas";
import type { LogInFormValues, LogInResponse } from "../model/types";

export const logIn = async (
  payload: LogInFormValues,
): Promise<LogInResponse> => {
  const validPayload = LogInFormSchema.parse(payload);

  const response = await api.post<unknown>("/auth/login", validPayload);

  return LogInResponseSchema.parse(response.data);
};
