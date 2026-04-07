import { useCallback, useMemo, useState } from "react";

import type { TFunction } from "i18next";

import { createUserColumns, useDeleteUser } from "@features/users";

import { type UserRow, useUsersQuery } from "@entities/users";

import type { Column } from "@shared/types";

interface Params {
  t: TFunction;
  companyId: string;
  page: number;
  limit: number;
  search: string;
  isArchived: boolean;
  enabled: boolean;
  backTo: string;
  navigateToUser: (userId: string, backTo: string) => void;
  setIsArchived: (value: boolean) => void;
  setPage: (value: number) => void;
}

interface CompanyUsersTab {
  isCreateDialogOpen: boolean;
  userToEdit: UserRow | null;
  userToDelete: UserRow | null;
  users: UserRow[];
  total: number;
  hasUsers: boolean;
  emptyText: string;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  userColumns: Column<UserRow>[];
  handleOpenCreateDialog: () => void;
  handleCloseCreateDialog: () => void;
  handleCreateSuccess: () => void;
  handleEditSuccess: () => void;
  handleCloseDeleteDialog: () => void;
  handleConfirmDelete: () => void;
  handleUserRowClick: (user: UserRow) => void;
  deleteUserMutation: ReturnType<typeof useDeleteUser>;
}

export const useCompanyUsersTab = ({
  t,
  companyId,
  page,
  limit,
  search,
  isArchived,
  enabled,
  backTo,
  navigateToUser,
  setIsArchived,
  setPage,
}: Params): CompanyUsersTab => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserRow | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserRow | null>(null);

  const deleteUserMutation = useDeleteUser();

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
    search,
    isArchived,
    companyId,
    enabled,
  });

  const handleDeleteUser = useCallback((user: UserRow) => {
    setUserToDelete(user);
  }, []);

  const handleEditUser = useCallback((user: UserRow) => {
    setUserToEdit(user);
    setIsCreateDialogOpen(true);
  }, []);

  const handleUserRowClick = useCallback(
    (user: UserRow) => {
      navigateToUser(user.id, backTo);
    },
    [backTo, navigateToUser],
  );

  const userColumns = useMemo(
    () =>
      createUserColumns(t, handleEditUser, handleDeleteUser, {
        showCompanyColumn: false,
      }),
    [t, handleDeleteUser, handleEditUser],
  );

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

  const handleCloseDeleteDialog = () => {
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) {
      return;
    }

    deleteUserMutation.mutate(
      { userId: userToDelete.id },
      {
        onSuccess: () => {
          setUserToDelete(null);
        },
      },
    );
  };

  return {
    isCreateDialogOpen,
    userToEdit,
    userToDelete,
    users,
    total,
    hasUsers,
    emptyText,
    isLoading,
    isError,
    isFetching,
    userColumns,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    handleUserRowClick,
    deleteUserMutation,
  };
};
