import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  createUserColumns,
  createUsersSearchString,
  parseUsersSearchState,
  UsersToolbar,
  useUserFilters,
  useUserSearch,
} from "@features/users";

import { useUsersQuery } from "@entities/users";

import {
  useInitialSearchState,
  usePagination,
  useSyncSearchParams,
} from "@shared/hooks";
import { TableSection } from "@shared/ui/table-section";

export const UsersWidget = () => {
  const { t } = useTranslation();

  const initialSearchState = useInitialSearchState(parseUsersSearchState);

  const { isArchived, setIsArchived } = useUserFilters({
    initialIsArchived: initialSearchState.isArchived,
  });

  const { search, debouncedSearch, setSearch } = useUserSearch({
    initialSearch: initialSearchState.search,
  });

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
    resetPage: 0,
  });

  useSyncSearchParams(
    { page, limit, search, isArchived },
    createUsersSearchString,
  );

  const { users, total, hasUsers, emptyText, isLoading, isError, isFetching } =
    useUsersQuery({
      page,
      limit,
      search: debouncedSearch,
      isArchived,
    });

  const columns = useMemo(() => createUserColumns(t), [t]);

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
        {t("users.title")}
      </Typography>

      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={t("users.error")}
        hasItems={hasUsers}
        emptyText={emptyText}
        rows={users}
        columns={columns}
        getRowId={(user) => user.email}
        toolbar={
          <UsersToolbar
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
          labelRowsPerPage: t("users.table.rowsPerPage"),
        }}
      />
    </Box>
  );
};
