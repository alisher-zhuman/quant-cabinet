import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import { createMeterColumns, useDeleteMeter } from "@features/meters";

import { type MeterRow, useMetersQuery } from "@entities/meters";

import { ROUTES } from "@shared/constants";
import {
  useArchivedFilter,
  usePagination,
  useSearchState,
} from "@shared/hooks";
import type { Column } from "@shared/types";

export const useControllerMetersSection = (controllerId: string) => {
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [meterToDelete, setMeterToDelete] = useState<MeterRow | null>(null);
  const [locationType, setLocationType] = useState("");
  const [meterStatus, setMeterStatus] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [isValveLockedByManager, setIsValveLockedByManager] = useState("");

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const { isArchived, setIsArchived } = useArchivedFilter({
    initialIsArchived: false,
  });

  const { search, debouncedSearch, setSearch } = useSearchState({
    initialSearch: "",
  });

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: 0,
    initialLimit: 10,
    resetPage: 0,
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
    page,
    limit,
    search: debouncedSearch,
    isArchived,
    companyId: "",
    controllerId,
    locationType,
    meterStatus,
    accountNumber,
    clientName,
    address,
    isValveLockedByManager,
    enabled: Boolean(controllerId),
  });

  const handleCloseDeleteDialog = () => {
    setMeterToDelete(null);
  };

  const deleteMeterMutation = useDeleteMeter(handleCloseDeleteDialog);

  const handleConfirmDelete = () => {
    if (!meterToDelete) {
      return;
    }

    deleteMeterMutation.mutate({ id: meterToDelete.id });
  };

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

  const meterColumns = useMemo<Column<MeterRow>[]>(
    () =>
      createMeterColumns(t, setMeterToDelete, {
        showCompanyColumn: false,
      }),
    [t],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleApplyFilters = ({
    locationType: nextLocationType,
    meterStatus: nextMeterStatus,
    accountNumber: nextAccountNumber,
    clientName: nextClientName,
    address: nextAddress,
    isValveLockedByManager: nextIsValveLockedByManager,
  }: {
    locationType: string;
    meterStatus: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  }) => {
    setLocationType(nextLocationType);
    setMeterStatus(nextMeterStatus);
    setAccountNumber(nextAccountNumber);
    setClientName(nextClientName);
    setAddress(nextAddress);
    setIsValveLockedByManager(nextIsValveLockedByManager);
    setPage(0);
    setIsFiltersDialogOpen(false);
  };

  const handleResetFilters = () => {
    setLocationType("");
    setMeterStatus("");
    setAccountNumber("");
    setClientName("");
    setAddress("");
    setIsValveLockedByManager("");
    setPage(0);
  };

  const hasActiveFilters = Boolean(
    locationType.trim() ||
      meterStatus.trim() ||
      accountNumber.trim() ||
      clientName.trim() ||
      address.trim() ||
      isValveLockedByManager.trim(),
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
        page,
        limit,
        total,
        onPageChange: setPage,
        onLimitChange: setLimit,
        labelRowsPerPage: t("meters.table.rowsPerPage"),
      },
    },
    toolbarProps: {
      t,
      search,
      isSearchLoading: isFetching,
      isArchived,
      hasActiveFilters,
      onResetFilters: handleResetFilters,
      onOpenFiltersDialog: () => {
        setIsFiltersDialogOpen(true);
      },
      onSearchChange: handleSearchChange,
      onArchivedChange: handleArchivedChange,
    },
    dialogsProps: {
      t,
      meterToDelete,
      isDeletePending: deleteMeterMutation.isPending,
      isFiltersDialogOpen,
      filters: {
        companyId: "",
        locationType,
        meterStatus,
        accountNumber,
        clientName,
        address,
        isValveLockedByManager,
      },
      onCloseDeleteDialog: handleCloseDeleteDialog,
      onConfirmDelete: handleConfirmDelete,
      onCloseFiltersDialog: () => {
        setIsFiltersDialogOpen(false);
      },
      onApplyFilters: handleApplyFilters,
    },
  };
};
