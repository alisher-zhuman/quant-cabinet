import type { TFunction } from "i18next";

import { CreateUserDialog } from "@features/users";

import { type UserRow } from "@entities/users";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";

interface Props {
  t: TFunction;
  companyId: string;
  isCreateDialogOpen: boolean;
  userToEdit: UserRow | null;
  userToDelete: UserRow | null;
  isDeletePending: boolean;
  onCloseCreateDialog: () => void;
  onCreateSuccess: () => void;
  onEditSuccess: () => void;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
}

export const CompanyUsersDialogs = ({
  t,
  companyId,
  isCreateDialogOpen,
  userToEdit,
  userToDelete,
  isDeletePending,
  onCloseCreateDialog,
  onCreateSuccess,
  onEditSuccess,
  onCloseDeleteDialog,
  onConfirmDelete,
}: Props) => (
  <>
    {isCreateDialogOpen && (
      <CreateUserDialog
        user={userToEdit}
        open={isCreateDialogOpen}
        onClose={onCloseCreateDialog}
        onSuccess={userToEdit ? onEditSuccess : onCreateSuccess}
        {...(!userToEdit ? { companyId } : {})}
      />
    )}

    <ConfirmDialog
      open={Boolean(userToDelete)}
      title={t("users.deleteDialog.title")}
      description={t("users.deleteDialog.description")}
      cancelLabel={t("users.deleteDialog.cancel")}
      confirmLabel={t("users.deleteDialog.confirm")}
      isLoading={isDeletePending}
      onClose={onCloseDeleteDialog}
      onConfirm={onConfirmDelete}
    />
  </>
);
