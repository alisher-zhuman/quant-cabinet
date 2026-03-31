import type { infer as ZodInfer } from "zod";

import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  DeleteMeterPayloadSchema,
  MetersResponseSchema,
} from "../model/schemas";

type DeleteMeterPayload = ZodInfer<typeof DeleteMeterPayloadSchema>;
type MetersResponse = ZodInfer<typeof MetersResponseSchema>;

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

export const deleteMeter = async (payload: DeleteMeterPayload): Promise<void> => {
  const validPayload = DeleteMeterPayloadSchema.parse(payload);

  await api.delete(API_PATHS.METERS, {
    data: validPayload,
  });
};
