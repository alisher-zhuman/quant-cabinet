import { useMemo, useState } from "react";

import { useCompaniesQuery } from "@entities/companies";

import type { ControllerFilters } from "../types";

interface Params {
  open: boolean;
  filters: ControllerFilters;
  hideCompanyField: boolean;
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
