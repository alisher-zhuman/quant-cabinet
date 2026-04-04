import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

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

import { type UserRow, useUsersQuery } from "@entities/users";

import { ROUTES } from "@shared/constants";
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
  const [userToEdit, setUserToEdit] = useState<UserRow | null>(null);

  const navigate = useNavigate();

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

  const { users, total, hasUsers, emptyText, isLoading, isError, isFetching } =
    useUsersQuery({
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

  const handleEditUser = useCallback((user: UserRow) => {
    setUserToEdit(user);
    setIsCreateDialogOpen(true);
  }, []);

  const handleRowClick = useCallback(
    (user: UserRow) => {
      navigate(`/${ROUTES.USERS}/${encodeURIComponent(user.email)}`);
    },
    [navigate],
  );

  const columns = useMemo(
    () => createUserColumns(t, handleEditUser, handleDeleteUser),
    [t, handleEditUser, handleDeleteUser],
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
    setUserToEdit(null);
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
  };

  const handleCreateSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
    setIsArchived(false);
    setPage(0);
  }, [setIsArchived, setPage]);

  const handleEditSuccess = useCallback(() => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}
      >
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
          onRowClick={handleRowClick}
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
          user={userToEdit}
          open={isCreateDialogOpen}
          onClose={handleCloseCreateDialog}
          onSuccess={userToEdit ? handleEditSuccess : handleCreateSuccess}
        />
      )}
    </>
  );
};
