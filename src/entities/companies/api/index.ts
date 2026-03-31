import type { infer as ZodInfer } from "zod";

import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  CompaniesResponseSchema,
  CreateCompanyPayloadSchema,
  DeleteCompanyPayloadSchema,
  UpdateCompanyPayloadSchema,
} from "../model/schemas";
import type {
  CreateCompanyPayload,
  UpdateCompanyPayload,
} from "../model/types";

type CompaniesResponse = ZodInfer<typeof CompaniesResponseSchema>;
type DeleteCompanyPayload = ZodInfer<typeof DeleteCompanyPayloadSchema>;
type ToggleCompanyArchivePayload = {
  id: string;
  isArchived: boolean;
};

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
  const response = await api.get(API_PATHS.COMPANIES, {
    params: buildListQueryParams({ page, limit, search, isArchived }),
  });

  return CompaniesResponseSchema.parse(response.data);
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
