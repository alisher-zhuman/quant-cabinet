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

export const useCompanyControllerFiltersState = ({ isActive }: Params) => {
  const initialSearchState = useInitialSearchState(
    parseCompanyDetailsSearchState,
  );
  
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState(
    initialSearchState.serialNumber,
  );
  const [phoneNumber, setPhoneNumber] = useState(
    initialSearchState.phoneNumber,
  );
  const [simIMSI, setSimIMSI] = useState(initialSearchState.simIMSI);

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
      tab: "controllers",
      page,
      limit,
      search,
      isArchived,
      serialNumber,
      phoneNumber,
      simIMSI,
      locationType: "",
      meterStatus: "",
      accountNumber: "",
      clientName: "",
      address: "",
      isValveLockedByManager: "",
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
    serialNumber: nextSerialNumber,
    phoneNumber: nextPhoneNumber,
    simIMSI: nextSimIMSI,
  }: {
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => {
    setSerialNumber(nextSerialNumber);
    setPhoneNumber(nextPhoneNumber);
    setSimIMSI(nextSimIMSI);
    setPage(0);
    setIsFiltersDialogOpen(false);
  };

  const handleResetFilters = () => {
    setSerialNumber("");
    setPhoneNumber("");
    setSimIMSI("");
    setPage(0);
  };

  const hasActiveFilters = Boolean(
    serialNumber.trim() || phoneNumber.trim() || simIMSI.trim(),
  );

  return {
    isFiltersDialogOpen,
    isArchived,
    search,
    debouncedSearch,
    page,
    limit,
    serialNumber,
    phoneNumber,
    simIMSI,
    hasActiveFilters,
    handleSearchChange,
    handleArchivedChange,
    handleOpenFiltersDialog,
    handleCloseFiltersDialog,
    handleApplyFilters,
    handleResetFilters,
    setIsArchived,
    setPage,
    setLimit,
  };
};
