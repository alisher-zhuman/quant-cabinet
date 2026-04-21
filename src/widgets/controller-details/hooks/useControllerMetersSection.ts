import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createMeterColumns } from "@features/meters";

import { useControllerQuery } from "@entities/controllers";
import { type MeterRow, useMetersQuery } from "@entities/meters";

import { getMeterDetailsRoute } from "@shared/constants";
import { useAuthStore } from "@shared/stores";
import type { Column } from "@shared/types";

import { useControllerMeterDialogs } from "./useControllerMeterDialogs";
import { useControllerMeterFiltersState } from "./useControllerMeterFiltersState";

export const useControllerMetersSection = (controllerId: string) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const role = useAuthStore((state) => state.role);

  const filtersState = useControllerMeterFiltersState();
  
  const dialogs = useControllerMeterDialogs({
    setIsArchived: filtersState.handleArchivedChange,
    setPage: filtersState.setPage,
  });

  const {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
  } = useMetersQuery({
    page: filtersState.page,
    limit: filtersState.limit,
    search: filtersState.debouncedSearch,
    isArchived: filtersState.isArchived,
    companyId: "",
    controllerId,
    locationType: filtersState.locationType,
    accountNumber: filtersState.accountNumber,
    clientName: filtersState.clientName,
    address: filtersState.address,
    isValveLockedByManager: filtersState.isValveLockedByManager,
    enabled: Boolean(controllerId),
  });

  const { controller } = useControllerQuery(controllerId);

  const handleMeterRowClick = useCallback(
    (meter: MeterRow) => {
      navigate(getMeterDetailsRoute(meter.id), {
        state: {
          backTo: `${location.pathname}${location.search}`,
        },
      });
    },
    [location.pathname, location.search, navigate],
  );

  const meterColumns = useMemo<Column<MeterRow>[]>(
    () =>
      createMeterColumns(t, dialogs.handleDeleteMeter, dialogs.handleEditMeter, {
        showCompanyColumn: false,
        currentRole: role,
      }),
    [dialogs.handleDeleteMeter, dialogs.handleEditMeter, role, t],
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
      columns: meterColumns,
      onRowClick: handleMeterRowClick,
      pagination: {
        page: filtersState.page,
        limit: filtersState.limit,
        total,
        onPageChange: filtersState.setPage,
        onLimitChange: filtersState.setLimit,
        labelRowsPerPage: t("meters.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      currentRole: role,
      search: filtersState.search,
      isSearchLoading: isFetching,
      isArchived: filtersState.isArchived,
      hasActiveFilters: filtersState.hasActiveFilters,
      onResetFilters: filtersState.handleResetFilters,
      onOpenFiltersDialog: filtersState.handleOpenFiltersDialog,
      onSearchChange: filtersState.handleSearchChange,
      onArchivedChange: filtersState.handleArchivedChange,
      onOpenCreateDialog: dialogs.handleOpenCreateDialog,
    },
    dialogsProps: {
      t,
      meterToDelete: dialogs.meterToDelete,
      meterToEdit: dialogs.meterToEdit,
      isCreateDialogOpen: dialogs.isCreateDialogOpen,
      isDeletePending: dialogs.isDeletePending,
      isFiltersDialogOpen: filtersState.isFiltersDialogOpen,
      filters: {
        companyId: controller?.company?.id ?? "",
        controllerId,
        locationType: filtersState.locationType,
        accountNumber: filtersState.accountNumber,
        clientName: filtersState.clientName,
        address: filtersState.address,
        isValveLockedByManager: filtersState.isValveLockedByManager,
      },
      onCloseDeleteDialog: dialogs.handleCloseDeleteDialog,
      onConfirmDelete: dialogs.handleConfirmDelete,
      onCloseFiltersDialog: filtersState.handleCloseFiltersDialog,
      onApplyFilters: filtersState.handleApplyFilters,
      onCloseCreateDialog: dialogs.handleCloseCreateDialog,
      onCloseEditDialog: dialogs.handleCloseEditDialog,
      onEditSuccess: dialogs.handleEditSuccess,
      onCreateSuccess: dialogs.handleCreateSuccess,
    },
  };
};
