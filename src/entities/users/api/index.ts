import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";
import type { ListQueryParams } from "@shared/types";

import {
  CreateUserPayloadSchema,
  DeleteUserPayloadSchema,
  UsersResponseSchema,
} from "../model/schemas";
import type {
  CreateUserPayload,
  DeleteUserPayload,
  UsersResponse,
} from "../model/types";

export const createUser = async (payload: CreateUserPayload): Promise<void> => {
  const validPayload = CreateUserPayloadSchema.parse(payload);

  await api.post(API_PATHS.USERS, validPayload);
};

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
}: ListQueryParams = {}): Promise<UsersResponse> => {
  const response = await api.get(API_PATHS.USERS, {
    params: buildListQueryParams({ page, limit, search, isArchived }),
  });

  return UsersResponseSchema.parse(response.data);
};

export const deleteUser = async (payload: DeleteUserPayload): Promise<void> => {
  const validPayload = DeleteUserPayloadSchema.parse(payload);

  await api.delete(API_PATHS.USERS, {
    data: validPayload,
  });
};
