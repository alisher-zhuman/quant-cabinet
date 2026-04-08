import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createMeterColumns } from "@features/meters";

import { type MeterRow, useMetersQuery } from "@entities/meters";

import { ROUTES } from "@shared/constants";

import { useMeterDialogs } from "./useMeterDialogs";
import { useMeterFiltersState } from "./useMeterFiltersState";

export const useMetersWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    locationType: filters.locationType,
    meterStatus: filters.meterStatus,
    accountNumber: filters.accountNumber,
    clientName: filters.clientName,
    address: filters.address,
    isValveLockedByManager: filters.isValveLockedByManager,
  });

  const dialogs = useMeterDialogs();

  const handleApplyFilters = (nextFilters: {
    companyId: string;
    locationType: string;
    meterStatus: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  }) => {
    filters.handleApplyFilters(nextFilters);
    dialogs.handleCloseFiltersDialog();
  };

  const columns = useMemo(() => createMeterColumns(t, dialogs.setMeterToDelete), [
    dialogs.setMeterToDelete,
    t,
  ]);

  const handleRowClick = useCallback(
    (meter: MeterRow) => {
      navigate(`/${ROUTES.METERS}/${meter.id}`, {
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
      search: filters.search,
      isSearchLoading: isFetching,
      isArchived: filters.isArchived,
      hasActiveFilters: filters.hasActiveFilters,
      onResetFilters: filters.handleResetFilters,
      onOpenFiltersDialog: dialogs.handleOpenFiltersDialog,
      onSearchChange: filters.handleSearchChange,
      onArchivedChange: filters.handleArchivedChange,
    },
    dialogsProps: {
      t,
      meterToDelete: dialogs.deleteDialogProps.meterToDelete,
      isDeletePending: dialogs.deleteDialogProps.isDeletePending,
      isFiltersDialogOpen: dialogs.isFiltersDialogOpen,
      filters: {
        companyId: filters.companyId,
        locationType: filters.locationType,
        meterStatus: filters.meterStatus,
        accountNumber: filters.accountNumber,
        clientName: filters.clientName,
        address: filters.address,
        isValveLockedByManager: filters.isValveLockedByManager,
      },
      onCloseDeleteDialog: dialogs.deleteDialogProps.onCloseDeleteDialog,
      onConfirmDelete: dialogs.deleteDialogProps.onConfirmDelete,
      onCloseFiltersDialog: dialogs.handleCloseFiltersDialog,
      onApplyFilters: handleApplyFilters,
    },
  };
};
