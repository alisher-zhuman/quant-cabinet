import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import {
  createUserColumns,
  createUsersSearchString,
  parseUsersSearchState,
} from "@features/users";

import { type UserRow, useUsersQuery } from "@entities/users";

import { getUserDetailsRoute } from "@shared/constants";
import { isAdmin } from "@shared/helpers";
import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";
import { useAuthStore } from "@shared/stores";

import { useUserDialogs } from "./useUserDialogs";

export const useUsersWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = useAuthStore((state) => state.role);
  
  const { t } = useTranslation();

  const initialSearchState = useInitialSearchState(parseUsersSearchState);

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
    createUsersSearchString,
  );

  const { users, total, hasUsers, emptyText, isLoading, isError, isFetching } =
    useUsersQuery({
      page,
      limit,
      search: debouncedSearch,
      isArchived,
    });
  const dialogs = useUserDialogs(setIsArchived);

  const handleRowClick = useCallback(
    (user: UserRow) => {
      navigate(getUserDetailsRoute(user.id), {
        state: {
          backTo: `${location.pathname}${location.search}`,
        },
      });
    },
    [location.pathname, location.search, navigate],
  );

  const columns = useMemo(
    () =>
      createUserColumns(t, dialogs.handleEditUser, dialogs.handleDeleteUser, {
        currentRole: role,
        showCompanyColumn: isAdmin(role),
      }),
    [dialogs.handleDeleteUser, dialogs.handleEditUser, role, t],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleCreateSuccess = () => {
    dialogs.handleCreateSuccess();
    setPage(0);
  };

  return {
    t,
    tableSectionProps: {
      isLoading,
      isError,
      errorText: t("users.error"),
      hasItems: hasUsers,
      emptyText,
      rows: users,
      columns,
      getRowId: (user: UserRow) => user.id,
      onRowClick: handleRowClick,
      pagination: {
        page,
        limit,
        total,
        onPageChange: setPage,
        onLimitChange: setLimit,
        labelRowsPerPage: t("users.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      search,
      isSearchLoading: isFetching,
      isArchived,
      onOpenCreateDialog: dialogs.handleOpenCreateDialog,
      onSearchChange: handleSearchChange,
      onArchivedChange: handleArchivedChange,
    },
    dialogProps: {
      isCreateDialogOpen: dialogs.isCreateDialogOpen,
      userToEdit: dialogs.userToEdit,
      onCloseCreateDialog: dialogs.handleCloseCreateDialog,
      onCreateSuccess: handleCreateSuccess,
      onEditSuccess: dialogs.handleEditSuccess,
    },
    deleteDialogProps: {
      t,
      userToDelete: dialogs.userToDelete,
      isDeletePending: dialogs.deleteUserMutation.isPending,
      onCloseDeleteDialog: dialogs.handleCloseDeleteDialog,
      onConfirmDelete: dialogs.handleConfirmDelete,
    },
  };
};
