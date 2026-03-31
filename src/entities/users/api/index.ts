import type { infer as ZodInfer } from "zod";

import { api } from "@shared/api";
import { API_PATHS } from "@shared/constants";
import { buildListQueryParams } from "@shared/helpers";

import {
  DeleteUserPayloadSchema,
  UsersResponseSchema,
} from "../model/schemas";

type DeleteUserPayload = ZodInfer<typeof DeleteUserPayloadSchema>;
type UsersResponse = ZodInfer<typeof UsersResponseSchema>;

interface Params {
  page?: number;
  limit?: number;
  search?: string;
  isArchived?: boolean;
}

export const getUsers = async ({
  page = 1,
  limit = 10,
  search = "",
  isArchived = false,
}: Params = {}): Promise<UsersResponse> => {
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
