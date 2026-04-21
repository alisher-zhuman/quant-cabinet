import { useState } from "react";

import {
  createMetersSearchString,
  parseMetersSearchState,
} from "@features/meters";

import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";

export const useMeterFiltersState = () => {
  const initialSearchState = useInitialSearchState(parseMetersSearchState);

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

  const [companyId, setCompanyId] = useState(initialSearchState.companyId);
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

  useSyncSearchParams(
    {
      page,
      limit,
      search,
      isArchived,
      companyId,
      locationType,
      accountNumber,
      clientName,
      address,
      isValveLockedByManager,
    },
    createMetersSearchString,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleArchivedChange = (value: boolean) => {
    setIsArchived(value);
    setPage(0);
  };

  const handleApplyFilters = (filters: {
    companyId: string;
    locationType: string;
    accountNumber: string;
    clientName: string;
    address: string;
    isValveLockedByManager: string;
  }) => {
    setCompanyId(filters.companyId);
    setLocationType(filters.locationType);
    setAccountNumber(filters.accountNumber);
    setClientName(filters.clientName);
    setAddress(filters.address);
    setIsValveLockedByManager(filters.isValveLockedByManager);
    setPage(0);
  };

  const handleResetFilters = () => {
    setCompanyId("");
    setLocationType("");
    setAccountNumber("");
    setClientName("");
    setAddress("");
    setIsValveLockedByManager("");
    setPage(0);
  };

  const hasActiveFilters = Boolean(
    companyId.trim() ||
      locationType.trim() ||
      accountNumber.trim() ||
      clientName.trim() ||
      address.trim() ||
      isValveLockedByManager.trim(),
  );

  return {
    isArchived,
    search,
    debouncedSearch,
    page,
    limit,
    companyId,
    locationType,
    accountNumber,
    clientName,
    address,
    isValveLockedByManager,
    hasActiveFilters,
    handleSearchChange,
    handleArchivedChange,
    handleApplyFilters,
    handleResetFilters,
    setPage,
    setLimit,
  };
};
