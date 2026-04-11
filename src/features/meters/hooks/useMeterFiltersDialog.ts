import { useEffect, useMemo, useState } from "react";

import { useCompaniesQuery } from "@entities/companies";

import type { MeterFilters } from "../types";

interface Params {
  open: boolean;
  filters: MeterFilters;
  hideCompanyField?: boolean;
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
  hideCompanyField = false,
  onClose,
  onApply,
}: Params) => {
  const [values, setValues] = useState(() => filters);
  
  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: open && !hideCompanyField,
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
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues(filters);
    }
  }, [filters, open]);

  const handleReset = () => {
    const nextFilters = hideCompanyField
      ? {
          ...EMPTY_FILTERS,
          companyId: filters.companyId,
        }
      : EMPTY_FILTERS;

    setValues(nextFilters);
    onApply(nextFilters);
    onClose();
  };

  const handleApply = () => {
    onApply(values);
    onClose();
  };

  const hasActiveFilters = Boolean(
    (!hideCompanyField && filters.companyId.trim()) ||
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
    hideCompanyField,
    isCompaniesLoading,
    hasActiveFilters,
    handleChange,
    handleReset,
    handleApply,
  };
};
