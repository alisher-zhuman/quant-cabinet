import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import {
  DeleteUserPayloadSchema,
  UsersResponseSchema,
} from "../model/schemas";
import type { DeleteUserPayload, UsersResponse } from "../model/types";

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
  const normalizedSearch = search.trim();

  const response = await api.get(API_PATHS.USERS, {
    params: {
      page,
      limit,
      isArchived,
      ...(normalizedSearch ? { search: normalizedSearch } : {}),
    },
  });

  return UsersResponseSchema.parse(response.data);
};

export const deleteUser = async (payload: DeleteUserPayload): Promise<void> => {
  const validPayload = DeleteUserPayloadSchema.parse(payload);

  await api.delete(API_PATHS.USERS, {
    data: validPayload,
  });
};
