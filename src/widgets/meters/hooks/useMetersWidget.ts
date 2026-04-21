import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createMeterColumns } from "@features/meters";

import { type MeterRow, useMetersQuery } from "@entities/meters";

import { getMeterDetailsRoute } from "@shared/constants";
import { isAdmin } from "@shared/helpers";
import { useAuthStore } from "@shared/stores";

import { useMeterDialogs } from "./useMeterDialogs";
import { useMeterFiltersState } from "./useMeterFiltersState";

export const useMetersWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = useAuthStore((state) => state.role);

  const { t } = useTranslation();
  
  const filters = useMeterFiltersState();

  const {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useMetersQuery({
    page: filters.page,
    limit: filters.limit,
    search: filters.debouncedSearch,
    isArchived: filters.isArchived,
    companyId: filters.companyId,
    controllerId: "",
    locationType: filters.locationType,
    accountNumber: filters.accountNumber,
    clientName: filters.clientName,
    address: filters.address,
    isValveLockedByManager: filters.isValveLockedByManager,
  });

  const dialogs = useMeterDialogs(filters.handleArchivedChange);

  const handleApplyFilters = (nextFilters: {
    companyId: string;
    locationType: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  }) => {
    filters.handleApplyFilters(nextFilters);
    dialogs.handleCloseFiltersDialog();
  };

  const columns = useMemo(
    () =>
      createMeterColumns(t, dialogs.setMeterToDelete, dialogs.handleOpenEditDialog, {
        currentRole: role,
        showCompanyColumn: isAdmin(role),
      }),
    [dialogs.setMeterToDelete, dialogs.handleOpenEditDialog, role, t],
  );

  const handleRowClick = useCallback(
    (meter: MeterRow) => {
      navigate(getMeterDetailsRoute(meter.id), {
        state: {
          backTo: `${location.pathname}${location.search}`,
        },
      });
    },
    [location.pathname, location.search, navigate],
  );

  return {
    t,
    tableSectionProps: {
      isLoading,
      isError,
      errorText: t("meters.error"),
      hasItems: hasMeters,
      emptyText,
      rows: meters,
      columns,
      onRowClick: handleRowClick,
      pagination: {
        page: filters.page,
        limit: filters.limit,
        total,
        onPageChange: filters.setPage,
        onLimitChange: filters.setLimit,
        labelRowsPerPage: t("meters.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      currentRole: role,
      search: filters.search,
      isSearchLoading: isFetching,
      isArchived: filters.isArchived,
      isTemplateDownloadPending: dialogs.isTemplateDownloadPending,
      hasActiveFilters: filters.hasActiveFilters,
      onOpenCreateDialog: dialogs.handleOpenCreateDialog,
      onDownloadTemplate: dialogs.handleDownloadTemplate,
      onOpenBulkUploadDialog: dialogs.handleOpenBulkUploadDialog,
      onResetFilters: filters.handleResetFilters,
      onOpenFiltersDialog: dialogs.handleOpenFiltersDialog,
      onSearchChange: filters.handleSearchChange,
      onArchivedChange: filters.handleArchivedChange,
    },
    dialogsProps: {
      t,
      meterToDelete: dialogs.deleteDialogProps.meterToDelete,
      meterToEdit: dialogs.editDialogProps.meterToEdit,
      isDeletePending: dialogs.deleteDialogProps.isDeletePending,
      isCreateDialogOpen: dialogs.isCreateDialogOpen,
      isBulkUploadDialogOpen: dialogs.isBulkUploadDialogOpen,
      isFiltersDialogOpen: dialogs.isFiltersDialogOpen,
      hideCompanyField: !isAdmin(role),
      filters: {
        companyId: filters.companyId,
        locationType: filters.locationType,
        accountNumber: filters.accountNumber,
        clientName: filters.clientName,
        address: filters.address,
        isValveLockedByManager: filters.isValveLockedByManager,
      },
      onCloseDeleteDialog: dialogs.deleteDialogProps.onCloseDeleteDialog,
      onConfirmDelete: dialogs.deleteDialogProps.onConfirmDelete,
      onCloseEditDialog: dialogs.editDialogProps.onCloseEditDialog,
      onCloseCreateDialog: dialogs.handleCloseCreateDialog,
      onCloseBulkUploadDialog: dialogs.handleCloseBulkUploadDialog,
      onCloseFiltersDialog: dialogs.handleCloseFiltersDialog,
      onCreateSuccess: dialogs.handleCreateSuccess,
      onEditSuccess: dialogs.handleEditSuccess,
      onBulkUploadSuccess: dialogs.handleBulkUploadSuccess,
      onApplyFilters: handleApplyFilters,
    },
  };
};
