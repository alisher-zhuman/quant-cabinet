import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  CreateUserPayloadSchema,
  DeleteUserPayloadSchema,
  UpdateUserPayloadSchema,
  UserRowSchema,
  UsersResponseSchema,
} from "../model/schemas";
import type {
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload,
  UserDetails,
  UsersListQueryParams,
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
  firstName = "",
  lastName = "",
  companyId = "",
  isArchived = false,
}: UsersListQueryParams = {}): Promise<UsersResponse> => {
  const normalizedSearch = search.trim();
  const normalizedFirstName = firstName.trim();
  const normalizedLastName = lastName.trim();

  const response = await api.get(
    companyId ? `${API_PATHS.USERS}/${companyId}` : API_PATHS.USERS,
    {
      params: buildListQueryParams({
        page,
        limit,
        isArchived,
        extraParams: {
          ...(companyId
            ? normalizedSearch
              ? { search: normalizedSearch }
              : {}
            : {
                firstName: normalizedFirstName,
                lastName: normalizedLastName,
              }),
        },
      }),
    },
  );

  return UsersResponseSchema.parse(response.data);
};

export const getUser = async (userId: string): Promise<UserDetails> => {
  const response = await api.get(API_PATHS.USERS_EMAIL, {
    params: {
      userId,
    },
  });

  return UserRowSchema.parse(response.data);
};

export const deleteUser = async (payload: DeleteUserPayload): Promise<void> => {
  const validPayload = DeleteUserPayloadSchema.parse(payload);

  await api.delete(API_PATHS.USERS, {
    data: validPayload,
  });
};

export const updateUser = async (payload: UpdateUserPayload): Promise<void> => {
  const validPayload = UpdateUserPayloadSchema.parse(payload);

  await api.post(API_PATHS.USERS_UPDATE, validPayload);
};
