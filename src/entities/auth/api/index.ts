import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import {
  ForgotPasswordPayloadSchema,
  LogInPayloadSchema,
  LogInResponseSchema,
} from "../model/schemas";
import type {
  ForgotPasswordFormValues,
  LogInFormValues,
  LogInResponse,
} from "../model/types";

export const logIn = async (
  payload: LogInFormValues,
): Promise<LogInResponse> => {
  const validPayload = LogInPayloadSchema.parse(payload);

  const response = await api.post(API_PATHS.LOG_IN, validPayload);

  return LogInResponseSchema.parse(response.data);
};

export const forgotPassword = async (
  payload: ForgotPasswordFormValues,
): Promise<void> => {
  const validPayload = ForgotPasswordPayloadSchema.parse(payload);

  await api.post(API_PATHS.FORGOT_PASSWORD, validPayload);
};
