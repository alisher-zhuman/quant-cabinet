import { useState } from "react";

import {
  createControllersSearchString,
  parseControllersSearchState,
} from "@features/controllers";

import {
  useArchivedFilter,
  useInitialSearchState,
  usePagination,
  useSearchState,
  useSyncSearchParams,
} from "@shared/hooks";

export const useControllerFiltersState = () => {
  const initialSearchState = useInitialSearchState(parseControllersSearchState);

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
  const [serialNumber, setSerialNumber] = useState(
    initialSearchState.serialNumber,
  );
  const [phoneNumber, setPhoneNumber] = useState(
    initialSearchState.phoneNumber,
  );
  const [simIMSI, setSimIMSI] = useState(initialSearchState.simIMSI);

  useSyncSearchParams(
    {
      page,
      limit,
      search,
      isArchived,
      companyId,
      serialNumber,
      phoneNumber,
      simIMSI,
    },
    createControllersSearchString,
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
    companyId: nextCompanyId,
    serialNumber: nextSerialNumber,
    phoneNumber: nextPhoneNumber,
    simIMSI: nextSimIMSI,
  }: {
    companyId: string;
    serialNumber: string;
    phoneNumber: string;
    simIMSI: string;
  }) => {
    setCompanyId(nextCompanyId);
    setSerialNumber(nextSerialNumber);
    setPhoneNumber(nextPhoneNumber);
    setSimIMSI(nextSimIMSI);
    setPage(0);
  };

  const handleResetFilters = () => {
    setCompanyId("");
    setSerialNumber("");
    setPhoneNumber("");
    setSimIMSI("");
    setPage(0);
  };

  const hasActiveFilters = Boolean(
    companyId.trim() ||
      serialNumber.trim() ||
      phoneNumber.trim() ||
      simIMSI.trim(),
  );

  return {
    isArchived,
    search,
    debouncedSearch,
    page,
    limit,
    companyId,
    serialNumber,
    phoneNumber,
    simIMSI,
    hasActiveFilters,
    handleSearchChange,
    handleArchivedChange,
    handleApplyFilters,
    handleResetFilters,
    setPage,
    setLimit,
  };
};
