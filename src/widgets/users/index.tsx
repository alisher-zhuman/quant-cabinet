import { useCallback, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  createUserColumns,
  CreateUserDialog,
  useDeleteUser,
} from "@features/users";

import type { UserRow } from "@entities/users";
import { useUsersQuery } from "@entities/users";

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

export const UsersWidget = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { t } = useTranslation();
  
  const deleteUserMutation = useDeleteUser();

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
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useUsersQuery({
    page,
    limit,
    search: debouncedSearch,
    isArchived,
  });

  const handleDeleteUser = useCallback(
    (user: UserRow) => {
      deleteUserMutation.mutate({ userId: user.id });
    },
    [deleteUserMutation],
  );

  const columns = useMemo(
    () => createUserColumns(t, handleDeleteUser),
    [t, handleDeleteUser],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  return (
    <>
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
          getRowId={(user) => user.id}
          toolbar={
            <SearchTabsToolbar
              search={search}
              searchPlaceholder={t("users.search.placeholder")}
              activeLabel={t("users.tabs.active")}
              archivedLabel={t("users.tabs.archived")}
              isSearchLoading={isFetching}
              isArchived={isArchived}
              actions={
                <Button
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                  onClick={handleOpenCreateDialog}
                >
                  {t("users.actions.create")}
                </Button>
              }
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

      {isCreateDialogOpen && (
        <CreateUserDialog
          open={isCreateDialogOpen}
          onClose={handleCloseCreateDialog}
          onSuccess={handleCreateSuccess}
        />
      )}
    </>
  );
};
