import { useMemo, useState } from "react";

import { useCompaniesQuery } from "@entities/companies";

import type { MeterFilters } from "../types";

interface Params {
  open: boolean;
  filters: MeterFilters;
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
  onApply,
}: Params) => {
  const [values, setValues] = useState(() => filters);

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

  const handleReset = () => {
    setValues(EMPTY_FILTERS);
    onApply(EMPTY_FILTERS);
  };

  const handleApply = () => {
    onApply(values);
  };

  return {
    values,
    companyOptions,
    isCompaniesLoading,
    handleChange,
    handleReset,
    handleApply,
  };
};
