import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { createControllerColumns } from "@features/controllers";

import { useControllersQuery } from "@entities/controllers";

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

export const ControllersWidget = () => {
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
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useControllersQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
  });

  const columns = useMemo(() => createControllerColumns(t), [t]);

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
        {t("controllers.title")}
      </Typography>

      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={t("controllers.error")}
        hasItems={hasControllers}
        emptyText={emptyText}
        rows={controllers}
        columns={columns}
        getRowId={(controller) => controller.id}
        toolbar={
          <SearchTabsToolbar
            search={search}
            searchPlaceholder={t("controllers.search.placeholder")}
            activeLabel={t("controllers.tabs.active")}
            archivedLabel={t("controllers.tabs.archived")}
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
          labelRowsPerPage: t("controllers.table.rowsPerPage"),
        }}
      />
    </Box>
  );
};
