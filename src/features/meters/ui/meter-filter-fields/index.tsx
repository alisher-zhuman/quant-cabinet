import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import type { MeterFilters } from "../../types";

interface Props {
  values: MeterFilters;
  isCompaniesLoading: boolean;
  companyOptions: Array<{
    value: string;
    label: string;
  }>;
  onChange: (field: keyof MeterFilters, value: string) => void;
}

export const MeterFilterFields = ({
  values,
  isCompaniesLoading,
  companyOptions,
  onChange,
}: Props) => {
  const { t } = useTranslation();

  const createChangeHandler =
    (field: keyof MeterFilters) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <>
      <TextField
        select
        value={values.companyId}
        label={t("meters.filters.fields.companyId")}
        onChange={createChangeHandler("companyId")}
        disabled={isCompaniesLoading}
      >
        <MenuItem value="">
          <em>{t("meters.filters.values.all")}</em>
        </MenuItem>
        {companyOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        value={values.locationType}
        label={t("meters.filters.fields.locationType")}
        onChange={createChangeHandler("locationType")}
      >
        <MenuItem value="">
          <em>{t("meters.filters.values.all")}</em>
        </MenuItem>
        <MenuItem value="indoor">{t("meters.details.locationType.indoor")}</MenuItem>
        <MenuItem value="well">{t("meters.details.locationType.well")}</MenuItem>
        <MenuItem value="cabinet">{t("meters.details.locationType.cabinet")}</MenuItem>
      </TextField>

      <TextField
        select
        value={values.meterStatus}
        label={t("meters.filters.fields.meterStatus")}
        onChange={createChangeHandler("meterStatus")}
      >
        <MenuItem value="">
          <em>{t("meters.filters.values.all")}</em>
        </MenuItem>
        <MenuItem value="normal">{t("meters.details.statuses.normal")}</MenuItem>
        <MenuItem value="low">{t("meters.details.statuses.low")}</MenuItem>
        <MenuItem value="critical">{t("meters.details.statuses.critical")}</MenuItem>
      </TextField>

      <TextField
        value={values.accountNumber}
        label={t("meters.filters.fields.accountNumber")}
        onChange={createChangeHandler("accountNumber")}
      />

      <TextField
        value={values.clientName}
        label={t("meters.filters.fields.clientName")}
        onChange={createChangeHandler("clientName")}
      />

      <TextField
        value={values.address}
        label={t("meters.filters.fields.address")}
        onChange={createChangeHandler("address")}
      />

      <TextField
        select
        value={values.isValveLockedByManager}
        label={t("meters.filters.fields.isValveLockedByManager")}
        onChange={createChangeHandler("isValveLockedByManager")}
      >
        <MenuItem value="">
          <em>{t("meters.filters.values.all")}</em>
        </MenuItem>
        <MenuItem value="true">{t("meters.details.values.yes")}</MenuItem>
        <MenuItem value="false">{t("meters.details.values.no")}</MenuItem>
      </TextField>
    </>
  );
};
