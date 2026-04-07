import { type Control,Controller } from "react-hook-form";

import type { TFunction } from "i18next";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import type { UserFormValues } from "@entities/users";

import { FormSelectField } from "@shared/ui/form-select-field";

interface Option {
  value: string;
  label: string;
}

interface Props {
  t: TFunction;
  control: Control<UserFormValues>;
  isEditMode: boolean;
  shouldShowCompanyField: boolean;
  isCompaniesLoading: boolean;
  companyOptions: Option[];
}

export const UserCompanyFields = ({
  t,
  control,
  isEditMode,
  shouldShowCompanyField,
  isCompaniesLoading,
  companyOptions,
}: Props) => (
  <>
    {shouldShowCompanyField && (
      <FormSelectField
        name="company"
        control={control}
        label={t("users.createDialog.fields.company")}
        fullWidth
        disabled={isCompaniesLoading}
        options={companyOptions}
        emptyOptionLabel={t("users.createDialog.fields.companyPlaceholder")}
      />
    )}

    {isEditMode && (
      <Controller
        name="isArchived"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label={t("users.editDialog.fields.isArchived")}
            control={
              <Switch
                checked={field.value}
                onChange={(_, checked) => field.onChange(checked)}
              />
            }
          />
        )}
      />
    )}
  </>
);
