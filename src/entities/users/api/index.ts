import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import { UsersResponseSchema } from "../model/schemas";
import type { UsersResponse } from "../model/types";

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
