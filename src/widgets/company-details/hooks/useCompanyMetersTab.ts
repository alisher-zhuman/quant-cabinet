import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createMeterColumns, useDeleteMeter } from "@features/meters";

import { type MeterRow, useMetersQuery } from "@entities/meters";

import { ROUTES } from "@shared/constants";
import type { Column } from "@shared/types";

import { useCompanyMeterFiltersState } from "./useCompanyMeterFiltersState";

interface Params {
  companyId: string;
  isActive: boolean;
}

interface CompanyMetersTab {
  t: ReturnType<typeof useTranslation>["t"];
  tableSectionProps: {
    isLoading: boolean;
    isError: boolean;
    errorText: string;
    hasItems: boolean;
    emptyText: string;
    rows: MeterRow[];
    columns: Column<MeterRow>[];
    onRowClick: (meter: MeterRow) => void;
    pagination: {
      page: number;
      limit: number;
      total: number;
      onPageChange: (value: number) => void;
      onLimitChange: (value: number) => void;
      labelRowsPerPage: string;
    };
  };
  toolbarProps: {
    t: ReturnType<typeof useTranslation>["t"];
    search: string;
    isSearchLoading: boolean;
    isArchived: boolean;
    hasActiveFilters: boolean;
    onResetFilters: () => void;
    onOpenFiltersDialog: () => void;
    onSearchChange: (value: string) => void;
    onArchivedChange: (value: boolean) => void;
  };
  dialogsProps: {
    t: ReturnType<typeof useTranslation>["t"];
    meterToDelete: MeterRow | null;
    isDeletePending: boolean;
    isFiltersDialogOpen: boolean;
    filters: {
      companyId: string;
      locationType: string;
      meterStatus: string;
      accountNumber: string;
      clientName: string;
      address: string;
      isValveLockedByManager: string;
    };
    onCloseDeleteDialog: () => void;
    onConfirmDelete: () => void;
    onCloseFiltersDialog: () => void;
    onApplyFilters: (filters: {
      locationType: string;
      meterStatus: string;
      accountNumber: string;
      clientName: string;
      address: string;
      isValveLockedByManager: string;
    }) => void;
  };
}

export const useCompanyMetersTab = ({
  companyId,
  isActive,
}: Params): CompanyMetersTab => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const filtersState = useCompanyMeterFiltersState({ isActive });
  const [meterToDelete, setMeterToDelete] = useState<MeterRow | null>(null);

  const handleCloseDeleteDialog = () => {
    setMeterToDelete(null);
  };

  const deleteMeterMutation = useDeleteMeter(handleCloseDeleteDialog);

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
    companyId,
    locationType: filtersState.locationType,
    meterStatus: filtersState.meterStatus,
    accountNumber: filtersState.accountNumber,
    clientName: filtersState.clientName,
    address: filtersState.address,
    isValveLockedByManager: filtersState.isValveLockedByManager,
    enabled: isActive && Boolean(companyId),
  });

  const handleMeterRowClick = useCallback(
    (meter: MeterRow) => {
      navigate(`/${ROUTES.METERS}/${meter.id}`, {
        state: {
          backTo: `${location.pathname}${location.search}`,
        },
      });
    },
    [location.pathname, location.search, navigate],
  );

  const meterColumns = useMemo(
    () =>
      createMeterColumns(t, setMeterToDelete, {
        showCompanyColumn: false,
      }),
    [t],
  );

  const handleConfirmDelete = () => {
    if (!meterToDelete) {
      return;
    }

    deleteMeterMutation.mutate({ id: meterToDelete.id });
  };

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
      search: filtersState.search,
      isSearchLoading: isFetching,
      isArchived: filtersState.isArchived,
      hasActiveFilters: filtersState.hasActiveFilters,
      onResetFilters: filtersState.handleResetFilters,
      onOpenFiltersDialog: filtersState.handleOpenFiltersDialog,
      onSearchChange: filtersState.handleSearchChange,
      onArchivedChange: filtersState.handleArchivedChange,
    },
    dialogsProps: {
      t,
      meterToDelete,
      isDeletePending: deleteMeterMutation.isPending,
      isFiltersDialogOpen: filtersState.isFiltersDialogOpen,
      filters: {
        companyId,
        locationType: filtersState.locationType,
        meterStatus: filtersState.meterStatus,
        accountNumber: filtersState.accountNumber,
        clientName: filtersState.clientName,
        address: filtersState.address,
        isValveLockedByManager: filtersState.isValveLockedByManager,
      },
      onCloseDeleteDialog: handleCloseDeleteDialog,
      onConfirmDelete: handleConfirmDelete,
      onCloseFiltersDialog: filtersState.handleCloseFiltersDialog,
      onApplyFilters: filtersState.handleApplyFilters,
    },
  };
};
