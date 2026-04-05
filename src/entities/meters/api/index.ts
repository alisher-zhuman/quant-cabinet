import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";
import type { ListQueryParams } from "@shared/types";

import {
  DeleteMeterPayloadSchema,
  MeterDetailsSchema,
  MetersResponseSchema,
} from "../model/schemas";
import type {
  DeleteMeterPayload,
  MeterDetails,
  MetersResponse,
} from "../model/types";

export const getMeters = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
}: ListQueryParams = {}): Promise<MetersResponse> => {
  const response = await api.get(API_PATHS.METERS, {
    params: buildListQueryParams({
      page,
      limit,
      search,
      isArchived,
      searchParamName: "serialNumber",
    }),
  });

  return MetersResponseSchema.parse(response.data);
};

export const getMeter = async (id: string): Promise<MeterDetails> => {
  const response = await api.get(API_PATHS.GET_METER(id));

  return MeterDetailsSchema.parse(response.data);
};

export const deleteMeter = async (payload: DeleteMeterPayload): Promise<void> => {
  const validPayload = DeleteMeterPayloadSchema.parse(payload);

  await api.delete(API_PATHS.METERS, {
    data: validPayload,
  });
};
