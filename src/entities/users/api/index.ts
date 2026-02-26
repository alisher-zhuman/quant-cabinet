import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import { UsersResponseSchema } from "../model/schemas";
import type { UsersResponse } from "../model/types";

export const getUsers = async (
  page = 1,
  limit = 10,
  isArchived = false,
): Promise<UsersResponse> => {
  const response = await api.get(API_PATHS.USERS, {
    params: { page, limit, isArchived },
  });

  return UsersResponseSchema.parse(response.data);
};
