import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getUsers } from "../api";
import { usersKeys } from "../model/keys";
import type { UserRow } from "../model/types";

interface Params {
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
}

export const useUsersQuery = ({ page, limit, search, isArchived }: Params) => {
  const { t } = useTranslation();

  const normalizedSearch = search.trim();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: usersKeys.list(page, limit, normalizedSearch, isArchived),
    queryFn: () =>
      getUsers({
        page: page + 1,
        limit,
        search: normalizedSearch,
        isArchived,
      }),
  });

  const users: UserRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasUsers = users.length > 0;

  const emptyText = normalizedSearch
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
