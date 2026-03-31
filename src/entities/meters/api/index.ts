import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import {
  DeleteMeterPayloadSchema,
  MetersResponseSchema,
} from "../model/schemas";
import type { DeleteMeterPayload, MetersResponse } from "../model/types";

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

export const deleteMeter = async (payload: DeleteMeterPayload): Promise<void> => {
  const validPayload = DeleteMeterPayloadSchema.parse(payload);

  await api.delete(API_PATHS.METERS, {
    data: validPayload,
  });
};
