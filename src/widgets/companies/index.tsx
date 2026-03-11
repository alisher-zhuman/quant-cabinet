import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  createCompanyColumns,
  useToggleCompanyArchive,
} from "@features/companies";

import { useCompaniesQuery } from "@entities/companies";

import { createListSearchString, parseListSearchState } from "@shared/helpers";
import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

export const CompaniesWidget = () => {
  const { t } = useTranslation();

  const initialSearchState = useInitialSearchState(parseListSearchState);

  const { isArchived, setIsArchived } = useArchivedFilter({
    initialIsArchived: initialSearchState.isArchived,
  });

  const { search, debouncedSearch, setSearch } = useSearchState({
    initialSearch: initialSearchState.search,
  });

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
    resetPage: 0,
  });

  useSyncSearchParams(
    { page, limit, search, isArchived },
    createListSearchString,
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

  const toggleCompanyArchiveMutation = useToggleCompanyArchive();

  const columns = useMemo(
    () =>
      createCompanyColumns(t, (company) => {
        toggleCompanyArchiveMutation.mutate({
          id: company.id,
          isArchived: company.isArchived,
        });
      }),
    [t, toggleCompanyArchiveMutation],
  );

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
          <SearchTabsToolbar
            search={search}
            searchPlaceholder={t("companies.search.placeholder")}
            activeLabel={t("companies.tabs.active")}
            archivedLabel={t("companies.tabs.archived")}
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
