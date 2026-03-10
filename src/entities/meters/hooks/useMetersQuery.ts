import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getMeters } from "../api";
import { metersKeys } from "../model/keys";
import type { MeterRow } from "../model/types";

interface Params {
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
}

export const useMetersQuery = ({ page, limit, search, isArchived }: Params) => {
  const { t } = useTranslation();

  const normalizedSearch = search.trim();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: metersKeys.list(page, limit, normalizedSearch, isArchived),
    queryFn: () =>
      getMeters({
        page: page + 1,
        limit,
        search: normalizedSearch,
        isArchived,
      }),
  });

  const meters: MeterRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasMeters = meters.length > 0;

  const emptyText = normalizedSearch
    ? t("meters.empty.search")
    : isArchived
      ? t("meters.empty.archived")
      : t("meters.empty.active");

  return {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
