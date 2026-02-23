import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import {
  createForgotPasswordFormSchema,
  createLogInFormSchema,
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
  const validPayload = createLogInFormSchema().parse(payload);

  const response = await api.post(API_PATHS.LOG_IN, validPayload);

  return LogInResponseSchema.parse(response.data);
};

export const forgotPassword = async (
  payload: ForgotPasswordFormValues,
): Promise<void> => {
  const validPayload = createForgotPasswordFormSchema().parse(payload);

  await api.post(API_PATHS.FORGOT_PASSWORD, validPayload);
};
