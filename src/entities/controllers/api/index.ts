import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import { ControllersResponseSchema } from "../model/schemas";
import type { ControllersResponse } from "../model/types";

interface Params {
  page?: number;
  limit?: number;
  search?: string;
  isArchived?: boolean;
}

export const getControllers = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
}: Params = {}): Promise<ControllersResponse> => {
  const normalizedSearch = search.trim();

  const response = await api.get(API_PATHS.CONTROLLERS, {
    params: {
      page,
      limit,
      isArchived,
      ...(normalizedSearch ? { search: normalizedSearch } : {}),
    },
  });

  return ControllersResponseSchema.parse(response.data);
};
