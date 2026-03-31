import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import { MetersResponseSchema } from "../model/schemas";
import type { MetersResponse } from "../model/types";

interface Params {
  page?: number;
  limit?: number;
  search?: string;
  isArchived?: boolean;
}

export const getMeters = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
}: Params = {}): Promise<MetersResponse> => {
  const normalizedSearch = search.trim();

  const response = await api.get(API_PATHS.METERS, {
    params: {
      page,
      limit,
      isArchived,
      ...(normalizedSearch ? { serialNumber: normalizedSearch } : {}),
    },
  });

  return MetersResponseSchema.parse(response.data);
};
