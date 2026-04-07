import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import {
  ControllerFiltersDialog,
  CreateControllerDialog,
  TransferControllerDialog,
} from "@features/controllers";

import { type ControllerRow } from "@entities/controllers";

import { type Column } from "@shared/types";
import { ConfirmDialog } from "@shared/ui/confirm-dialog";
import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";
import { TableSection } from "@shared/ui/table-section";

interface Props {
  companyId: string;
  t: TFunction;
  isCreateDialogOpen: boolean;
  isFiltersDialogOpen: boolean;
  controllerToEdit: ControllerRow | null;
  controllerToDelete: ControllerRow | null;
  controllerToTransfer: ControllerRow | null;
  isArchived: boolean;
  search: string;
  page: number;
  limit: number;
  controllers: ControllerRow[];
  total: number;
  hasControllers: boolean;
  emptyText: string;
  isControllersLoading: boolean;
  isControllersError: boolean;
  isControllersFetching: boolean;
  controllerColumns: Column<ControllerRow>[];
  serialNumber: string;
  phoneNumber: string;
  simIMSI: string;
  hasActiveFilters: boolean;
  handleSearchChange: (value: string) => void;
  handleArchivedChange: (value: boolean) => void;
  handleOpenCreateDialog: () => void;
  handleCloseCreateDialog: () => void;
  handleCreateSuccess: () => void;
  handleEditSuccess: () => void;
  handleOpenFiltersDialog: () => void;
  handleCloseFiltersDialog: () => void;
  handleApplyFilters: (filters: {
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => void;
  handleCloseDeleteDialog: () => void;
  handleConfirmDelete: () => void;
  handleCloseTransferDialog: () => void;
  handleTransferSuccess: () => void;
  handleControllerRowClick: (controller: ControllerRow) => void;
  deleteControllerMutationIsPending: boolean;
  setPage: (newPage: number) => void;
  setLimit: (newLimit: number) => void;
}

export const CompanyControllersTab = ({
  companyId,
  t,
  isCreateDialogOpen,
  isFiltersDialogOpen,
  controllerToEdit,
  controllerToDelete,
  controllerToTransfer,
  isArchived,
  search,
  page,
  limit,
  controllers,
  total,
  hasControllers,
  emptyText,
  isControllersLoading,
  isControllersError,
  isControllersFetching,
  controllerColumns,
  serialNumber,
  phoneNumber,
  simIMSI,
  hasActiveFilters,
  handleSearchChange,
  handleArchivedChange,
  handleOpenCreateDialog,
  handleCloseCreateDialog,
  handleCreateSuccess,
  handleEditSuccess,
  handleOpenFiltersDialog,
  handleCloseFiltersDialog,
  handleApplyFilters,
  handleCloseDeleteDialog,
  handleConfirmDelete,
  handleCloseTransferDialog,
  handleTransferSuccess,
  handleControllerRowClick,
  deleteControllerMutationIsPending,
  setPage,
  setLimit,
}: Props) => (
  <>
    <TableSection
      isLoading={isControllersLoading}
      isError={isControllersError}
      errorText={t("controllers.error")}
      hasItems={hasControllers}
      emptyText={emptyText}
      rows={controllers}
      columns={controllerColumns}
      getRowId={(controller) => controller.id}
      onRowClick={handleControllerRowClick}
      toolbar={
        <SearchTabsToolbar
          search={search}
          searchPlaceholder={t("controllers.search.placeholder")}
          activeLabel={t("controllers.tabs.active")}
          archivedLabel={t("controllers.tabs.archived")}
          isSearchLoading={isControllersFetching}
          isArchived={isArchived}
          actions={
            <>
              <IconButton
                aria-label={t("controllers.actions.filters")}
                color="primary"
                onClick={handleOpenFiltersDialog}
                sx={{ backgroundColor: "background.paper" }}
              >
                <Badge
                  color="error"
                  variant="dot"
                  invisible={!hasActiveFilters}
                >
                  <FilterAltRoundedIcon />
                </Badge>
              </IconButton>

              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={handleOpenCreateDialog}
              >
                {t("controllers.actions.create")}
              </Button>
            </>
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
        labelRowsPerPage: t("controllers.table.rowsPerPage"),
      }}
    />

    {isCreateDialogOpen && (
      <CreateControllerDialog
        controller={controllerToEdit}
        open={isCreateDialogOpen}
        onClose={handleCloseCreateDialog}
        onSuccess={controllerToEdit ? handleEditSuccess : handleCreateSuccess}
        {...(!controllerToEdit ? { initialCompanyId: companyId } : {})}
      />
    )}

    {isFiltersDialogOpen && (
      <ControllerFiltersDialog
        open={isFiltersDialogOpen}
        initialFilters={{
          serialNumber,
          phoneNumber,
          simIMSI,
          companyId: "",
        }}
        onClose={handleCloseFiltersDialog}
        onApply={handleApplyFilters}
      />
    )}

    {controllerToTransfer && (
      <TransferControllerDialog
        controller={controllerToTransfer}
        open={Boolean(controllerToTransfer)}
        onClose={handleCloseTransferDialog}
        onSuccess={handleTransferSuccess}
      />
    )}

    <ConfirmDialog
      open={Boolean(controllerToDelete)}
      title={t("controllers.deleteDialog.title")}
      description={t("controllers.deleteDialog.description")}
      cancelLabel={t("controllers.deleteDialog.cancel")}
      confirmLabel={t("controllers.deleteDialog.confirm")}
      isLoading={deleteControllerMutationIsPending}
      onClose={handleCloseDeleteDialog}
      onConfirm={handleConfirmDelete}
    />
  </>
);
