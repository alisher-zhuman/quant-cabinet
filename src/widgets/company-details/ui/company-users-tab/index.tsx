import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";

import { CreateUserDialog } from "@features/users";

import { type UserRow } from "@entities/users";

import { type Column } from "@shared/types";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

interface Props {
  t: TFunction;
  isCreateDialogOpen: boolean;
  userToEdit: UserRow | null;
  isArchived: boolean;
  search: string;
  page: number;
  limit: number;
  users: UserRow[];
  total: number;
  hasUsers: boolean;
  emptyText: string;
  isUsersLoading: boolean;
  isUsersError: boolean;
  isUsersFetching: boolean;
  userColumns: Column<UserRow>[];
  handleSearchChange: (value: string) => void;
  handleArchivedChange: (value: boolean) => void;
  handleOpenCreateDialog: () => void;
  handleCloseCreateDialog: () => void;
  handleCreateSuccess: () => void;
  handleEditSuccess: () => void;
  handleUserRowClick: (user: UserRow) => void;
  setPage: (newPage: number) => void;
  setLimit: (newLimit: number) => void;
}

export const CompanyUsersTab = ({
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
  isUsersLoading,
  isUsersError,
  isUsersFetching,
  userColumns,
  handleSearchChange,
  handleArchivedChange,
  handleOpenCreateDialog,
  handleCloseCreateDialog,
  handleCreateSuccess,
  handleEditSuccess,
  handleUserRowClick,
  setPage,
  setLimit,
}: Props) => (
  <>
    <TableSection
      isLoading={isUsersLoading}
      isError={isUsersError}
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
          isSearchLoading={isUsersFetching}
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
      />
    )}
  </>
);
