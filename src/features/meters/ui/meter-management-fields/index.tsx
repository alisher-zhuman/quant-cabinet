import { Controller } from "react-hook-form";

import type { TFunction } from "i18next";
import type { Control } from "react-hook-form";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import type { MeterEditFormValues } from "@entities/meters";

import { FormSelectField } from "@shared/ui/form-select-field";

interface Option {
  value: string;
  label: string;
}

interface Props {
  t: TFunction;
  control: Control<MeterEditFormValues>;
  pendingCommandOptions: Option[];
}

export const MeterManagementFields = ({ t, control, pendingCommandOptions }: Props) => (
  <>
    <FormSelectField
      name="pendingCommand"
      control={control}
      label={t("meters.editDialog.fields.pendingCommand")}
      fullWidth
      options={pendingCommandOptions}
    />

    <Controller
      name="isValveLockedByManager"
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          label={t("meters.editDialog.fields.isValveLockedByManager")}
        />
      )}
    />

    <Controller
      name="isArchived"
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
          label={t("meters.editDialog.fields.isArchived")}
        />
      )}
    />
  </>
);
