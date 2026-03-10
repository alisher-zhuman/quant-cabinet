import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  CompaniesToolbar,
  createCompaniesSearchString,
  createCompanyColumns,
  parseCompaniesSearchState,
  useCompanyFilters,
  useCompanySearch,
} from "@features/companies";

import { useCompaniesQuery } from "@entities/companies";

import {
  useInitialSearchState,
  usePagination,
  useSyncSearchParams,
} from "@shared/hooks";
import { TableSection } from "@shared/ui/table-section";

export const CompaniesWidget = () => {
  const { t } = useTranslation();

  const initialSearchState = useInitialSearchState(parseCompaniesSearchState);

  const { isArchived, setIsArchived } = useCompanyFilters({
    initialIsArchived: initialSearchState.isArchived,
  });

  const { search, debouncedSearch, setSearch } = useCompanySearch({
    initialSearch: initialSearchState.search,
  });

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
    resetPage: 0,
  });

  useSyncSearchParams(
    { page, limit, search, isArchived },
    createCompaniesSearchString,
  );

  const {
    companies,
    total,
    hasCompanies,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useCompaniesQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
  });

  const columns = useMemo(() => createCompanyColumns(t), [t]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
      <Typography component="h1" variant="h4">
        {t("companies.title")}
      </Typography>

      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={t("companies.error")}
        hasItems={hasCompanies}
        emptyText={emptyText}
        rows={companies}
        columns={columns}
        getRowId={(company) => company.id}
        toolbar={
          <CompaniesToolbar
            search={search}
            isSearchLoading={isFetching}
            isArchived={isArchived}
            onSearchChange={handleSearchChange}
            onArchivedChange={handleArchivedChange}
          />
        }
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
          onLimitChange: setLimit,
          labelRowsPerPage: t("companies.table.rowsPerPage"),
        }}
      />
    </Box>
  );
};
