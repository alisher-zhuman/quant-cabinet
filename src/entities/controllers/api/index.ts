import type { infer as ZodInfer } from "zod";

import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  ControllersResponseSchema,
  DeleteControllerPayloadSchema,
} from "../model/schemas";

type ControllersResponse = ZodInfer<typeof ControllersResponseSchema>;
type DeleteControllerPayload = ZodInfer<typeof DeleteControllerPayloadSchema>;

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
  const response = await api.get(API_PATHS.CONTROLLERS, {
    params: buildListQueryParams({
      page,
      limit,
      search,
      isArchived,
      searchParamName: "companyName",
    }),
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
