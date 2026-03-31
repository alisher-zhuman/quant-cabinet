import { z } from "zod";

import type { infer as ZodInfer } from "zod";

import { api } from "@shared/api";
import { API_PATHS, SUPPORTED_LANGUAGES } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";
import type { AppLanguage } from "@shared/types";

import {
  DeleteUserPayloadSchema,
  UsersResponseSchema,
} from "../model/schemas";

type DeleteUserPayload = ZodInfer<typeof DeleteUserPayloadSchema>;
type UsersResponse = ZodInfer<typeof UsersResponseSchema>;
type ChangeUserLanguagePayload = {
  lang: AppLanguage;
};

const ChangeUserLanguagePayloadSchema = z.object({
  lang: z.enum(SUPPORTED_LANGUAGES),
});

interface Params {
  page?: number;
  limit?: number;
  search?: string;
  isArchived?: boolean;
}

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
}: Params = {}): Promise<UsersResponse> => {
  const response = await api.get(API_PATHS.USERS, {
    params: buildListQueryParams({ page, limit, search, isArchived }),
  });

  return UsersResponseSchema.parse(response.data);
};

export const deleteUser = async (payload: DeleteUserPayload): Promise<void> => {
  const validPayload = DeleteUserPayloadSchema.parse(payload);

  await api.delete(API_PATHS.USERS, {
    data: validPayload,
  });
};

export const changeUserLanguage = async (
  payload: ChangeUserLanguagePayload,
): Promise<void> => {
  const validPayload = ChangeUserLanguagePayloadSchema.parse(payload);

  await api.post(API_PATHS.USERS_LANG, validPayload);
};
