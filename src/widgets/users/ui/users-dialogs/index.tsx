import { CreateUserDialog } from "@features/users";

import { type UserRow } from "@entities/users";

interface Props {
  userToEdit: UserRow | null;
  isCreateDialogOpen: boolean;
  onCloseCreateDialog: () => void;
  onEditSuccess: () => void;
  onCreateSuccess: () => void;
}

export const UsersDialogs = ({
  userToEdit,
  isCreateDialogOpen,
  onCloseCreateDialog,
  onEditSuccess,
  onCreateSuccess,
}: Props) => (
  <>
    {isCreateDialogOpen && (
      <CreateUserDialog
        user={userToEdit}
        open={isCreateDialogOpen}
        onClose={onCloseCreateDialog}
        onSuccess={userToEdit ? onEditSuccess : onCreateSuccess}
      />
    )}
  </>
);
