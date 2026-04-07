import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import type { ControllerFilters } from "../../types";

interface Props {
  values: ControllerFilters;
  hideCompanyField: boolean;
  isCompaniesLoading: boolean;
  companyOptions: Array<{
    value: string;
    label: string;
  }>;
  onChange: (field: keyof ControllerFilters, value: string) => void;
}

export const ControllerFilterFields = ({
  values,
  hideCompanyField,
  isCompaniesLoading,
  companyOptions,
  onChange,
}: Props) => {
  const { t } = useTranslation();

  const createChangeHandler =
    (field: keyof ControllerFilters) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <>
      {!hideCompanyField && (
        <TextField
          select
          value={values.companyId}
          label={t("controllers.filters.fields.companyId")}
          onChange={createChangeHandler("companyId")}
          disabled={isCompaniesLoading}
        >
          <MenuItem value="">
            <em>{t("controllers.createDialog.fields.companyPlaceholder")}</em>
          </MenuItem>
          {companyOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}

      <TextField
        value={values.serialNumber}
        label={t("controllers.filters.fields.serialNumber")}
        onChange={createChangeHandler("serialNumber")}
      />

      <TextField
        value={values.phoneNumber}
        label={t("controllers.filters.fields.phoneNumber")}
        onChange={createChangeHandler("phoneNumber")}
      />

      <TextField
        value={values.simIMSI}
        label={t("controllers.filters.fields.simIMSI")}
        onChange={createChangeHandler("simIMSI")}
      />
    </>
  );
};
