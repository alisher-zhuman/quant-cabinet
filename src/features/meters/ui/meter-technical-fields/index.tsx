import type { TFunction } from "i18next";
import type { Control } from "react-hook-form";

import type { MeterEditFormValues } from "@entities/meters";

import { FormSelectField } from "@shared/ui/form-select-field";
import { FormTextField } from "@shared/ui/form-text-field";

interface Option {
  value: string;
  label: string;
}

interface Props {
  t: TFunction;
  control: Control<MeterEditFormValues>;
  locationTypeOptions: Option[];
}

export const MeterTechnicalFields = ({ t, control, locationTypeOptions }: Props) => (
  <>
    <FormTextField
      name="serialNumber"
      control={control}
      label={t("meters.createDialog.fields.serialNumber")}
      fullWidth
    />

    <FormSelectField
      name="locationType"
      control={control}
      label={t("meters.createDialog.fields.locationType")}
      fullWidth
      options={locationTypeOptions}
    />

    <FormTextField
      name="port"
      control={control}
      label={t("meters.createDialog.fields.port")}
      fullWidth
    />
  </>
);
