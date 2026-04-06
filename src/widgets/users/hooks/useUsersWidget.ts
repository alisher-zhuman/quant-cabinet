import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import {
  createUserColumns,
  createUsersSearchString,
  getUsersNameSearchParams,
  parseUsersSearchState,
  useDeleteUser,
} from "@features/users";

import { type UserRow, useUsersQuery } from "@entities/users";

import { ROUTES } from "@shared/constants";
import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";

export const useUsersWidget = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserRow | null>(null);

  const navigate = useNavigate();
  
  const { t } = useTranslation();

  const deleteUserMutation = useDeleteUser();

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

  const { firstName, lastName } = getUsersNameSearchParams(debouncedSearch);

  const { users, total, hasUsers, emptyText, isLoading, isError, isFetching } =
    useUsersQuery({
      page,
      limit,
      firstName,
      lastName,
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

  return {
    t,
    isCreateDialogOpen,
    userToEdit,
    isArchived,
    search,
    page,
    limit,
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,
    columns,
    handleSearchChange,
    handleArchivedChange,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleRowClick,
    setPage,
    setLimit,
  };
};
