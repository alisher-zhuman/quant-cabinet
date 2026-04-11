import { useEffect, useMemo, useState } from "react";

import { useCompaniesQuery } from "@entities/companies";

import type { ControllerFilters } from "../types";

interface Params {
  open: boolean;
  filters: ControllerFilters;
  hideCompanyField: boolean;
  onClose: () => void;
  onApply: (filters: ControllerFilters) => void;
}

const EMPTY_FILTERS: ControllerFilters = {
  companyId: "",
  serialNumber: "",
  phoneNumber: "",
  simIMSI: "",
};

export const useControllerFiltersDialog = ({
  open,
  filters,
  hideCompanyField,
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

  const handleChange = (field: keyof ControllerFilters, value: string) => {
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
    setValues(EMPTY_FILTERS);
    onApply(EMPTY_FILTERS);
    onClose();
  };

  const handleApply = () => {
    onApply(values);
    onClose();
  };

  const hasActiveFilters = Boolean(
    filters.companyId.trim() ||
      filters.serialNumber.trim() ||
      filters.phoneNumber.trim() ||
      filters.simIMSI.trim(),
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
