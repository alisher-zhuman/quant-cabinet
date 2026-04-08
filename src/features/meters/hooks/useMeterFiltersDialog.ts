import { useEffect, useMemo, useRef, useState } from "react";

import { useCompaniesQuery } from "@entities/companies";

import type { MeterFilters } from "../types";

interface Params {
  open: boolean;
  filters: MeterFilters;
  onClose: () => void;
  onApply: (filters: MeterFilters) => void;
}

const EMPTY_FILTERS: MeterFilters = {
  companyId: "",
  locationType: "",
  meterStatus: "",
  accountNumber: "",
  clientName: "",
  address: "",
  isValveLockedByManager: "",
};

export const useMeterFiltersDialog = ({
  open,
  filters,
  onClose,
  onApply,
}: Params) => {
  const [values, setValues] = useState(() => filters);
  const pendingFiltersRef = useRef<MeterFilters | null>(null);

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: open,
  });

  const companyOptions = useMemo(
    () =>
      companies.map((company) => ({
        value: company.id,
        label: company.name,
      })),
    [companies],
  );

  const handleChange = (field: keyof MeterFilters, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!open) {
      pendingFiltersRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    const pendingFilters = pendingFiltersRef.current;

    if (!open || !pendingFilters) {
      return;
    }

    const isApplied =
      filters.companyId === pendingFilters.companyId &&
      filters.locationType === pendingFilters.locationType &&
      filters.meterStatus === pendingFilters.meterStatus &&
      filters.accountNumber === pendingFilters.accountNumber &&
      filters.clientName === pendingFilters.clientName &&
      filters.address === pendingFilters.address &&
      filters.isValveLockedByManager === pendingFilters.isValveLockedByManager;

    if (!isApplied) {
      return;
    }

    pendingFiltersRef.current = null;
    onClose();
  }, [filters, onClose, open]);

  const handleReset = () => {
    setValues(EMPTY_FILTERS);
    pendingFiltersRef.current = EMPTY_FILTERS;
    onApply(EMPTY_FILTERS);
  };

  const handleApply = () => {
    pendingFiltersRef.current = values;
    onApply(values);
  };

  const hasActiveFilters = Boolean(
    filters.companyId.trim() ||
      filters.locationType.trim() ||
      filters.meterStatus.trim() ||
      filters.accountNumber.trim() ||
      filters.clientName.trim() ||
      filters.address.trim() ||
      filters.isValveLockedByManager.trim(),
  );

  return {
    values,
    companyOptions,
    isCompaniesLoading,
    hasActiveFilters,
    handleChange,
    handleReset,
    handleApply,
  };
};
