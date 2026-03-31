import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import {
  CompaniesResponseSchema,
  CreateCompanyPayloadSchema,
  DeleteCompanyPayloadSchema,
} from "../model/schemas";
import type {
  CompaniesResponse,
  CreateCompanyPayload,
  DeleteCompanyPayload,
  ToggleCompanyArchivePayload,
} from "../model/types";

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

export const createCompany = async (
  payload: CreateCompanyPayload,
): Promise<void> => {
  const validPayload = CreateCompanyPayloadSchema.parse(payload);

  await api.post(API_PATHS.COMPANIES, validPayload);
};

export const toggleCompanyArchive = async ({
  id,
  isArchived,
}: ToggleCompanyArchivePayload): Promise<void> => {
  const endpoint = isArchived
    ? `${API_PATHS.COMPANIES_UNARCHIVE}/${id}`
    : `${API_PATHS.COMPANIES_ARCHIVE}/${id}`;

  await api.post(endpoint);
};

export const deleteCompany = async (
  payload: DeleteCompanyPayload,
): Promise<void> => {
  const validPayload = DeleteCompanyPayloadSchema.parse(payload);

  await api.delete(API_PATHS.COMPANIES, {
    data: validPayload,
  });
};
