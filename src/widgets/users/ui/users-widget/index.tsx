import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { CreateUserDialog } from "@features/users";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

import { useUsersWidget } from "../../hooks/useUsersWidget";

export const UsersWidget = () => {
  const {
    t,
    isCreateDialogOpen,
    userToEdit,
    userToDelete,
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
    handleCloseDeleteDialog,
    handleConfirmDelete,
    handleRowClick,
    deleteUserMutation,
    setPage,
    setLimit,
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

      <ConfirmDialog
        open={Boolean(userToDelete)}
        title={t("users.deleteDialog.title")}
        description={t("users.deleteDialog.description")}
        cancelLabel={t("users.deleteDialog.cancel")}
        confirmLabel={t("users.deleteDialog.confirm")}
        isLoading={deleteUserMutation.isPending}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
