import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";

import { CreateUserDialog } from "@features/users";

import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

import { useCompanyUsersTab } from "../../hooks/useCompanyUsersTab";

export const CompanyUsersTab = ({
  companyId,
  isActive,
}: {
  companyId: string;
  isActive: boolean;
}) => {
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
    userColumns,
    handleSearchChange,
    handleArchivedChange,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleCreateSuccess,
    handleEditSuccess,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    handleUserRowClick,
    deleteUserMutation,
    setPage,
    setLimit,
  } = useCompanyUsersTab({
    companyId,
    isActive,
  });

  return (
    <>
      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={t("users.error")}
        hasItems={hasUsers}
        emptyText={emptyText}
        rows={users}
        columns={userColumns}
        getRowId={(user) => user.id}
        onRowClick={handleUserRowClick}
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

      {isCreateDialogOpen && (
        <CreateUserDialog
          user={userToEdit}
          open={isCreateDialogOpen}
          onClose={handleCloseCreateDialog}
          onSuccess={userToEdit ? handleEditSuccess : handleCreateSuccess}
          {...(!userToEdit ? { companyId } : {})}
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
