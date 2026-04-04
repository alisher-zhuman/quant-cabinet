import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  ControllersResponseSchema,
  DeleteControllerPayloadSchema,
} from "../model/schemas";
import type {
  ControllersListQueryParams,
  ControllersResponse,
  DeleteControllerPayload,
} from "../model/types";

export const getControllers = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
  companyId = "",
  serialNumber = "",
  phoneNumber = "",
  simIMSI = "",
}: ControllersListQueryParams = {}): Promise<ControllersResponse> => {
  const response = await api.get(API_PATHS.CONTROLLERS, {
    params: buildListQueryParams({
      page,
      limit,
      search,
      isArchived,
      searchParamName: "companyName",
      extraParams: {
        companyId,
        serialNumber,
        phoneNumber,
        simIMSI,
      },
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
