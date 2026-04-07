import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CreateUserDialog } from "@features/users";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { TableSection } from "@shared/ui/table-section";

import { useUsersWidget } from "../../hooks/useUsersWidget";
import { UsersToolbar } from "../users-toolbar";

export const UsersWidget = () => {
  const {
    t,
    tableSectionProps,
    toolbarProps,
    dialogProps,
    deleteDialogProps,
  } = useUsersWidget();

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}
      >
        <Typography component="h1" variant="h4">
          {t("users.title")}
        </Typography>

        <TableSection
          {...tableSectionProps}
          toolbar={<UsersToolbar {...toolbarProps} />}
        />
      </Box>

      {dialogProps.isCreateDialogOpen && (
        <CreateUserDialog
          user={dialogProps.userToEdit}
          open={dialogProps.isCreateDialogOpen}
          onClose={dialogProps.onCloseCreateDialog}
          onSuccess={
            dialogProps.userToEdit
              ? dialogProps.onEditSuccess
              : dialogProps.onCreateSuccess
          }
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteDialogProps.userToDelete)}
        title={t("users.deleteDialog.title")}
        description={t("users.deleteDialog.description")}
        cancelLabel={t("users.deleteDialog.cancel")}
        confirmLabel={t("users.deleteDialog.confirm")}
        isLoading={deleteDialogProps.isDeletePending}
        onClose={deleteDialogProps.onCloseDeleteDialog}
        onConfirm={deleteDialogProps.onConfirmDelete}
      />
    </>
  );
};
