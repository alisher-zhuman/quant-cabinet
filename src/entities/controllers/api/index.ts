import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  ControllerRowSchema,
  ControllersResponseSchema,
  CreateControllerPayloadSchema,
  DeleteControllerPayloadSchema,
  TransferControllerPayloadSchema,
  UpdateControllerPayloadSchema,
} from "../model/schemas";
import type {
  ControllerRow,
  ControllersListQueryParams,
  ControllersResponse,
  CreateControllerPayload,
  DeleteControllerPayload,
  TransferControllerPayload,
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

export const getControllersByCompany = async (
  companyId: string,
  {
    page = 1,
    limit = 10,
    search = "",
    isArchived = false,
    serialNumber = "",
    phoneNumber = "",
    simIMSI = "",
  }: Omit<ControllersListQueryParams, "companyId"> = {},
): Promise<ControllersResponse> => {
  const response = await api.get(API_PATHS.CONTROLLERS_BY_COMPANY(companyId), {
    params: buildListQueryParams({
      page,
      limit,
      search,
      isArchived,
      extraParams: {
        serialNumber,
        phoneNumber,
        simIMSI,
      },
    }),
  });

  return ControllersResponseSchema.parse(response.data);
};

export const getController = async (id: string): Promise<ControllerRow> => {
  const response = await api.get(API_PATHS.GET_CONTROLLER(id));

  return ControllerRowSchema.parse(response.data);
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

export const transferController = async (
  payload: TransferControllerPayload,
): Promise<void> => {
  const validPayload = TransferControllerPayloadSchema.parse(payload);

  await api.patch(API_PATHS.CONTROLLERS, validPayload);
};
