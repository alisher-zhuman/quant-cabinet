import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  CreateMeterPayloadSchema,
  DeleteMeterPayloadSchema,
  MeterDetailsSchema,
  MetersResponseSchema,
  UpdateMeterPayloadSchema,
} from "../model/schemas";
import type {
  BulkImportMetersPayload,
  CreateMeterPayload,
  DeleteMeterPayload,
  MeterDetails,
  MetersListQueryParams,
  MetersResponse,
  UpdateMeterPayload,
} from "../model/types";

export const downloadMetersTemplate = async (): Promise<Blob> => {
  const response = await api.get(API_PATHS.BULK_UPLOAD_TEMPLATE, {
    responseType: "blob",
  });

  return response.data as Blob;
};

export const importMeters = async ({
  file,
  companyId,
}: BulkImportMetersPayload): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("companyId", companyId);

  await api.post(API_PATHS.BULK_UPLOAD_IMPORT, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createMeter = async (payload: CreateMeterPayload): Promise<void> => {
  const validPayload = CreateMeterPayloadSchema.parse(payload);

  await api.post(API_PATHS.METERS, validPayload);
};

export const updateMeter = async (payload: UpdateMeterPayload): Promise<void> => {
  const validPayload = UpdateMeterPayloadSchema.parse(payload);

  await api.post(API_PATHS.METERS_UPDATE, validPayload);
};



export const getMeters = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
  companyId = "",
  controllerId = "",
  locationType = "",
  accountNumber = "",
  clientName = "",
  address = "",
  isValveLockedByManager = "",
}: MetersListQueryParams = {}): Promise<MetersResponse> => {
  const response = await api.get(API_PATHS.METERS, {
    params: buildListQueryParams({
      page,
      limit,
      search,
      isArchived,
      searchParamName: "serialNumber",
      extraParams: {
        companyId,
        controllerId,
        locationType,
        accountNumber,
        clientName,
        address,
        isValveLockedByManager,
      },
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
