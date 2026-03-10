import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { getCompanies } from "../api";
import { companiesKeys } from "../model/keys";
import type { CompanyRow } from "../model/types";

interface Params {
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
}

export const useCompaniesQuery = ({
  page,
  limit,
  search,
  isArchived,
}: Params) => {
  const { t } = useTranslation();
  
  const normalizedSearch = search.trim();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: companiesKeys.list(page, limit, normalizedSearch, isArchived),
    queryFn: () =>
      getCompanies({
        page: page + 1,
        limit,
        search: normalizedSearch,
        isArchived,
      }),
  });

  const companies: CompanyRow[] = data?.data ?? [];
  const total = data?.total ?? 0;
  const hasCompanies = companies.length > 0;

  const emptyText = normalizedSearch
    ? t("companies.empty.search")
    : isArchived
      ? t("companies.empty.archived")
      : t("companies.empty.active");

  return {
    companies,
    total,
    hasCompanies,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
