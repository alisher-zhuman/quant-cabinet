import { useState } from "react";

import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";

import {
  createCompanyDetailsSearchString,
  parseCompanyDetailsSearchState,
} from "../helpers";

interface Params {
  isActive: boolean;
}

export const useCompanyMeterFiltersState = ({ isActive }: Params) => {
  const initialSearchState = useInitialSearchState(
    parseCompanyDetailsSearchState,
  );
  
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [locationType, setLocationType] = useState(
    initialSearchState.locationType,
  );
  const [accountNumber, setAccountNumber] = useState(
    initialSearchState.accountNumber,
  );
  const [clientName, setClientName] = useState(initialSearchState.clientName);
  const [address, setAddress] = useState(initialSearchState.address);
  const [isValveLockedByManager, setIsValveLockedByManager] = useState(
    initialSearchState.isValveLockedByManager,
  );

  const { isArchived, setIsArchived } = useArchivedFilter({
    initialIsArchived: initialSearchState.isArchived,
  });

  const { search, debouncedSearch, setSearch } = useSearchState({
    initialSearch: initialSearchState.search,
  });

  const { page, limit, setPage, setLimit } = usePagination({
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
    resetPage: 0,
  });

  useSyncSearchParams(
    {
      tab: "meters",
      page,
      limit,
      search,
      isArchived,
      serialNumber: "",
      phoneNumber: "",
      simIMSI: "",
      locationType,
      accountNumber,
      clientName,
      address,
      isValveLockedByManager,
    },
    createCompanyDetailsSearchString,
    isActive,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleOpenFiltersDialog = () => {
    setIsFiltersDialogOpen(true);
  };

  const handleCloseFiltersDialog = () => {
    setIsFiltersDialogOpen(false);
  };

  const handleApplyFilters = ({
    locationType: nextLocationType,
    accountNumber: nextAccountNumber,
    clientName: nextClientName,
    address: nextAddress,
    isValveLockedByManager: nextIsValveLockedByManager,
  }: {
    locationType: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  }) => {
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
    handleSearchChange,
    handleArchivedChange,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
    handleApplyFilters,
    handleResetFilters,
    setPage,
    setLimit,
  };
};
