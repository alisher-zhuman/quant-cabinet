import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import {
  ControllersResponseSchema,
  DeleteControllerPayloadSchema,
} from "../model/schemas";
import type {
  ControllersResponse,
  DeleteControllerPayload,
} from "../model/types";

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

export const deleteController = async (
  payload: DeleteControllerPayload,
): Promise<void> => {
  const validPayload = DeleteControllerPayloadSchema.parse(payload);

  await api.delete(API_PATHS.CONTROLLERS, {
    data: validPayload,
  });
};
