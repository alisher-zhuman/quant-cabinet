import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  ControllersResponseSchema,
  CreateControllerPayloadSchema,
  DeleteControllerPayloadSchema,
  UpdateControllerPayloadSchema,
} from "../model/schemas";
import type {
  ControllersListQueryParams,
  ControllersResponse,
  CreateControllerPayload,
  DeleteControllerPayload,
  UpdateControllerPayload,
} from "../model/types";

export const createController = async (
  payload: CreateControllerPayload,
): Promise<void> => {
  const validPayload = CreateControllerPayloadSchema.parse(payload);

  await api.post(API_PATHS.CONTROLLERS, validPayload);
};

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

export const updateController = async (
  payload: UpdateControllerPayload,
): Promise<void> => {
  const validPayload = UpdateControllerPayloadSchema.parse(payload);

  await api.post(API_PATHS.CONTROLLERS_UPDATE, validPayload);
};
