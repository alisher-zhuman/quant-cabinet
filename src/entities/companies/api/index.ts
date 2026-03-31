import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";
import type { ListQueryParams } from "@shared/types";

import {
  CompaniesResponseSchema,
  CompanyDetailsSchema,
  CreateCompanyPayloadSchema,
  DeleteCompanyPayloadSchema,
  RefreshCompanyTokenPayloadSchema,
  UpdateCompanyPayloadSchema,
} from "../model/schemas";
import type {
  CompaniesResponse,
  CompanyDetails,
  CreateCompanyPayload,
  DeleteCompanyPayload,
  RefreshCompanyTokenPayload,
  UpdateCompanyPayload,
} from "../model/types";

export const getCompanies = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
}: ListQueryParams = {}): Promise<CompaniesResponse> => {
  const response = await api.get(API_PATHS.COMPANIES, {
    params: buildListQueryParams({ page, limit, search, isArchived }),
  });

  return CompaniesResponseSchema.parse(response.data);
};

export const getCompany = async (id: string): Promise<CompanyDetails> => {
  const response = await api.get(`${API_PATHS.COMPANIES}/${id}`);

  return CompanyDetailsSchema.parse(response.data);
};

export const createCompany = async (
  payload: CreateCompanyPayload,
): Promise<void> => {
  const validPayload = CreateCompanyPayloadSchema.parse(payload);

  await api.post(API_PATHS.COMPANIES, validPayload);
};

export const updateCompany = async ({
  id,
  ...payload
}: UpdateCompanyPayload): Promise<void> => {
  const { id: validId, ...validPayload } = UpdateCompanyPayloadSchema.parse({
    id,
    ...payload,
  });

  await api.patch(`${API_PATHS.COMPANIES}/${validId}`, validPayload);
};

export const deleteCompany = async (
  payload: DeleteCompanyPayload,
): Promise<void> => {
  const validPayload = DeleteCompanyPayloadSchema.parse(payload);

  await api.delete(API_PATHS.COMPANIES, {
    data: validPayload,
  });
};

export const refreshCompanyToken = async (
  payload: RefreshCompanyTokenPayload,
): Promise<void> => {
  const validPayload = RefreshCompanyTokenPayloadSchema.parse(payload);

  await api.post(API_PATHS.COMPANIES_TOKEN_REFRESH, validPayload);
};
