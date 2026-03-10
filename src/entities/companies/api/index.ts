import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import { CompaniesResponseSchema } from "../model/schemas";
import type { CompaniesResponse } from "../model/types";

interface Params {
  page?: number;
  limit?: number;
  search?: string;
  isArchived?: boolean;
}

export const getCompanies = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
}: Params = {}): Promise<CompaniesResponse> => {
  const normalizedSearch = search.trim();

  const response = await api.get(API_PATHS.COMPANIES, {
    params: {
      page,
      limit,
      isArchived,
      ...(normalizedSearch ? { search: normalizedSearch } : {}),
    },
  });

  return CompaniesResponseSchema.parse(response.data);
};
