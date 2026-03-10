import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getControllers } from "../api";
import { controllersKeys } from "../model/keys";
import type { ControllerRow } from "../model/types";

interface Params {
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
}

export const useControllersQuery = ({
  page,
  limit,
  search,
  isArchived,
}: Params) => {
  const { t } = useTranslation();
  const normalizedSearch = search.trim();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: controllersKeys.list(page, limit, normalizedSearch, isArchived),
    queryFn: () =>
      getControllers({
        page: page + 1,
        limit,
        search: normalizedSearch,
        isArchived,
      }),
  });

  const controllers: ControllerRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasControllers = controllers.length > 0;

  const emptyText = normalizedSearch
    ? t("controllers.empty.search")
    : isArchived
      ? t("controllers.empty.archived")
      : t("controllers.empty.active");

  return {
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
