import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getUsers } from "../api";
import { usersKeys } from "../model/keys";
import type { UserRow } from "../model/types";

interface Params {
  page: number;
  limit: number;
  firstName: string;
  lastName: string;
  isArchived: boolean;
  companyId?: string;
  enabled?: boolean;
}

export const useUsersQuery = ({
  page,
  limit,
  firstName,
  lastName,
  isArchived,
  companyId = "",
  enabled = true,
}: Params) => {
  const { t } = useTranslation();

  const normalizedFirstName = firstName.trim();
  const normalizedLastName = lastName.trim();
  const hasSearch = Boolean(normalizedFirstName || normalizedLastName);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: usersKeys.list(
      page,
      limit,
      normalizedFirstName,
      normalizedLastName,
      isArchived,
      companyId,
    ),
    queryFn: () =>
      getUsers({
        page: page + 1,
        limit,
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        isArchived,
        companyId,
      }),
    enabled,
  });

  const users: UserRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasUsers = users.length > 0;

  const emptyText = hasSearch
    ? t("users.empty.search")
    : isArchived
      ? t("users.empty.archived")
      : t("users.empty.active");

  return {
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
