import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createControllerColumns } from "@features/controllers";

import { type ControllerRow, useControllersQuery } from "@entities/controllers";

import { ROUTES } from "@shared/constants";

import { useControllerDialogs } from "./useControllerDialogs";
import { useControllerFiltersState } from "./useControllerFiltersState";

export const useControllersWidget = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const filters = useControllerFiltersState();

  const dialogs = useControllerDialogs(filters.handleArchivedChange);

  const {
    controllers,
    total,
    hasControllers,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useControllersQuery({
    page: filters.page,
    limit: filters.limit,
    search: filters.debouncedSearch,
    isArchived: filters.isArchived,
    companyId: filters.companyId,
    serialNumber: filters.serialNumber,
    phoneNumber: filters.phoneNumber,
    simIMSI: filters.simIMSI,
  });

  const columns = useMemo(
    () =>
      createControllerColumns(
        t,
        dialogs.handleEditController,
        dialogs.handleTransferController,
        dialogs.setControllerToDelete,
      ),
    [
      dialogs.handleEditController,
      dialogs.handleTransferController,
      dialogs.setControllerToDelete,
      t,
    ],
  );

  const handleRowClick = (controller: ControllerRow) => {
    navigate(`/${ROUTES.CONTROLLERS}/${controller.id}`, {
      state: {
        backTo: `${location.pathname}${location.search}`,
      },
    });
  };

  return {
    t,
    tableSectionProps: {
      isLoading,
      isError,
      errorText: t("controllers.error"),
      hasItems: hasControllers,
      emptyText,
      rows: controllers,
      columns,
      getRowId: (controller: ControllerRow) =>
        controller.serialNumber ?? controller.id ?? controller.createdAt,
      onRowClick: handleRowClick,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        onPageChange: filters.setPage,
        onLimitChange: filters.setLimit,
        labelRowsPerPage: t("controllers.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      search: filters.search,
      isSearchLoading: isFetching,
      isArchived: filters.isArchived,
      isTemplateDownloadPending: dialogs.isTemplateDownloadPending,
      hasActiveFilters: filters.hasActiveFilters,
      onDownloadTemplate: dialogs.handleDownloadTemplate,
      onResetFilters: filters.handleResetFilters,
      onOpenFiltersDialog: dialogs.handleOpenFiltersDialog,
      onOpenBulkUploadDialog: dialogs.handleOpenBulkUploadDialog,
      onOpenCreateDialog: dialogs.handleOpenCreateDialog,
      onSearchChange: filters.handleSearchChange,
      onArchivedChange: filters.handleArchivedChange,
    },
    dialogsProps: {
      t,
      controllerToDelete: dialogs.controllerToDelete,
      controllerToEdit: dialogs.controllerToEdit,
      controllerToTransfer: dialogs.controllerToTransfer,
      isCreateDialogOpen: dialogs.isCreateDialogOpen,
      isBulkUploadDialogOpen: dialogs.isBulkUploadDialogOpen,
      isFiltersDialogOpen: dialogs.isFiltersDialogOpen,
      isDeletePending: dialogs.deleteControllerMutation.isPending,
      filters: {
        companyId: filters.companyId,
        serialNumber: filters.serialNumber,
        phoneNumber: filters.phoneNumber,
        simIMSI: filters.simIMSI,
      },
      onCloseDeleteDialog: dialogs.handleCloseDeleteDialog,
      onConfirmDelete: dialogs.handleConfirmDelete,
      onCloseFiltersDialog: dialogs.handleCloseFiltersDialog,
      onApplyFilters: filters.handleApplyFilters,
      onCloseCreateDialog: dialogs.handleCloseCreateDialog,
      onCloseBulkUploadDialog: dialogs.handleCloseBulkUploadDialog,
      onCloseTransferDialog: dialogs.handleCloseTransferDialog,
      onCreateSuccess: dialogs.handleCreateSuccess,
      onBulkUploadSuccess: dialogs.handleBulkUploadSuccess,
      onEditSuccess: dialogs.handleEditSuccess,
      onTransferSuccess: dialogs.handleTransferSuccess,
    },
  };
};
