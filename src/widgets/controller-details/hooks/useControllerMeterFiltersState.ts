import { useState } from "react";

import {
  useArchivedFilter,
  usePagination,
  useSearchState,
} from "@shared/hooks";

interface MeterFiltersValues {
  locationType: string;
  accountNumber: string;
  clientName: string;
  address: string;
  isValveLockedByManager: string;
}

export const useControllerMeterFiltersState = () => {
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [locationType, setLocationType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [isValveLockedByManager, setIsValveLockedByManager] = useState("");

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
    accountNumber: nextAccountNumber,
    clientName: nextClientName,
    address: nextAddress,
    isValveLockedByManager: nextIsValveLockedByManager,
  }: MeterFiltersValues) => {
    setLocationType(nextLocationType);
    setAccountNumber(nextAccountNumber);
    setClientName(nextClientName);
    setAddress(nextAddress);
    setIsValveLockedByManager(nextIsValveLockedByManager);
    setPage(0);
    setIsFiltersDialogOpen(false);
  };

  const handleResetFilters = () => {
    setLocationType("");
    setAccountNumber("");
    setClientName("");
    setAddress("");
    setIsValveLockedByManager("");
    setPage(0);
  };

  const hasActiveFilters = Boolean(
    locationType.trim() ||
      accountNumber.trim() ||
      clientName.trim() ||
      address.trim() ||
      isValveLockedByManager.trim(),
  );

  return {
    isFiltersDialogOpen,
    isArchived,
    search,
    debouncedSearch,
    page,
    limit,
    locationType,
    accountNumber,
    clientName,
    address,
    isValveLockedByManager,
    hasActiveFilters,
    setPage,
    setLimit,
    handleSearchChange,
    handleArchivedChange,
    handleApplyFilters,
    handleResetFilters,
    handleOpenFiltersDialog: () => {
      setIsFiltersDialogOpen(true);
    },
    handleCloseFiltersDialog: () => {
      setIsFiltersDialogOpen(false);
    },
  };
};
