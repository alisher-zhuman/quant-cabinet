import { type Control,Controller } from "react-hook-form";

import type { TFunction } from "i18next";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import type { ControllerFormValues } from "@entities/controllers";

import { FormTextField } from "@shared/ui/form-text-field";

interface Props {
  t: TFunction;
  control: Control<ControllerFormValues>;
  isEditMode: boolean;
}

export const ControllerTechnicalFields = ({
  t,
  control,
  isEditMode,
}: Props) => (
  <>
    <FormTextField
      name="simIMSI"
      control={control}
      label={t("controllers.createDialog.fields.simIMSI")}
      fullWidth
    />

    <FormTextField
      name="phoneNumber"
      control={control}
      label={t("controllers.createDialog.fields.phoneNumber")}
      fullWidth
    />

    <FormTextField
      name="descriptions"
      control={control}
      label={t("controllers.createDialog.fields.descriptions")}
      fullWidth
    />

    {isEditMode && (
      <>
        <FormTextField
          name="setInterval"
          control={control}
          label={t("controllers.editDialog.fields.setInterval")}
          type="number"
          slotProps={{
            htmlInput: {
              min: 1,
              max: 255,
            },
          }}
          fullWidth
        />

        <Controller
          name="correctTime"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label={t("controllers.editDialog.fields.correctTime")}
              control={
                <Switch
                  checked={field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                />
              }
            />
          )}
        />

        <Controller
          name="correctInterval"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label={t("controllers.editDialog.fields.correctInterval")}
              control={
                <Switch
                  checked={field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                />
              }
            />
          )}
        />

        <Controller
          name="isArchived"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label={t("controllers.editDialog.fields.isArchived")}
              control={
                <Switch
                  checked={field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                />
              }
            />
          )}
        />
      </>
    )}
  </>
);
