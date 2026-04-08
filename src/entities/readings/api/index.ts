import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";

import { ReadingsResponseSchema } from "../model/schemas";
import type { ReadingsListQueryParams, ReadingsResponse } from "../model/types";

export const getReadings = async ({
  meterId,
  serialNumber,
  port,
  from = "",
  to = "",
  page = 1,
  limit = 10,
}: ReadingsListQueryParams): Promise<ReadingsResponse> => {
  const response = await api.get(API_PATHS.GET_READINGS(meterId), {
    params: {
      serialNumber,
      ...(typeof port === "number" ? { port } : {}),
      ...(from.trim() ? { from: from.trim() } : {}),
      ...(to.trim() ? { to: to.trim() } : {}),
      page,
      limit,
    },
  });

  return ReadingsResponseSchema.parse(response.data);
};
