import { useCallback, useState } from "react";

import { useDeleteUser } from "@features/users";

import type { UserRow } from "@entities/users";

export const useUserDialogs = (setIsArchived: (value: boolean) => void) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserRow | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserRow | null>(null);

  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = useCallback((user: UserRow) => {
    setUserToDelete(user);
  }, []);

  const handleEditUser = useCallback((user: UserRow) => {
    setUserToEdit(user);
    setIsCreateDialogOpen(true);
  }, []);

  const handleOpenCreateDialog = () => {
    setUserToEdit(null);
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
    setIsArchived(false);
  };

  const handleEditSuccess = () => {
    setIsCreateDialogOpen(false);
    setUserToEdit(null);
  };

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
    deleteUserMutation,
    handleDeleteUser,
    handleEditUser,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleCloseDeleteDialog,
    handleConfirmDelete,
  };
};
