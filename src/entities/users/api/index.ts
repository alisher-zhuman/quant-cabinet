import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";
import type { ListQueryParams } from "@shared/types";

import {
  DeleteUserPayloadSchema,
  UsersResponseSchema,
} from "../model/schemas";
import type { DeleteUserPayload, UsersResponse } from "../model/types";

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
