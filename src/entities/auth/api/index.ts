import { api } from "@shared/api";

import { LogInFormSchema, LogInResponseSchema } from "../model/schemas";

export const logIn = async (
  payload: LogInRequestPayload,
): Promise<LogInResponsePayload> => {
  const validPayload = LogInFormSchema.parse(payload);

  const response = await api.post<unknown>("/auth/log-in", validPayload);

  return LogInResponseSchema.parse(response.data);
};
