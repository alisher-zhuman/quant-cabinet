import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
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
  handleResetFilters: () => void;
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
  handleResetFilters,
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
          left={
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <Button
                variant="outlined"
                startIcon={
                  <Badge
                    color="primary"
                    overlap="circular"
                    variant="dot"
                    invisible={!hasActiveFilters}
                  >
                    <FilterListRoundedIcon />
                  </Badge>
                }
                onClick={handleOpenFiltersDialog}
              >
                {t("controllers.actions.filters")}
              </Button>

              {hasActiveFilters && (
                <IconButton
                  size="small"
                  color="error"
                  aria-label={t("controllers.filters.reset")}
                  onClick={handleResetFilters}
                  sx={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    width: 20,
                    height: 20,
                    backgroundColor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: 1,
                    "&:hover": {
                      backgroundColor: "background.paper",
                    },
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 12 }} />
                </IconButton>
              )}
            </Box>
          }
          actions={
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={handleOpenCreateDialog}
              >
                {t("controllers.actions.create")}
              </Button>
            </Box>
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
        filters={{
          serialNumber,
          phoneNumber,
          simIMSI,
          companyId: "",
        }}
        onClose={handleCloseFiltersDialog}
        onApply={({
          serialNumber: nextSerialNumber,
          phoneNumber: nextPhoneNumber,
          simIMSI: nextSimIMSI,
        }) =>
          handleApplyFilters({
            serialNumber: nextSerialNumber,
            phoneNumber: nextPhoneNumber,
            simIMSI: nextSimIMSI,
          })
        }
        hideCompanyField
      />
    )}

    {controllerToTransfer && (
      <TransferControllerDialog
        controller={controllerToTransfer}
        open={Boolean(controllerToTransfer)}
        onClose={handleCloseTransferDialog}
        onSuccess={handleTransferSuccess}
        initialCompanyId={companyId}
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
