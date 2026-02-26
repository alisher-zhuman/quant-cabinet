import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getUsers } from "../api";
import { usersKeys } from "../model/keys";
import type { UserRow } from "../model/types";

interface Params {
  page: number;
  limit: number;
  isArchived: boolean;
}

export const useUsersQuery = ({ page, limit, isArchived }: Params) => {
  const { t } = useTranslation();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: usersKeys.list(page, limit, isArchived),
    queryFn: () => getUsers(page + 1, limit, isArchived),
  });

  const users: UserRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasUsers = users.length > 0;

  const emptyText = isArchived
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
