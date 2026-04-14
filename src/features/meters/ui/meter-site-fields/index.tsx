import type { TFunction } from "i18next";
import type { Control } from "react-hook-form";

import type { MeterEditFormValues } from "@entities/meters";

import { FormTextField } from "@shared/ui/form-text-field";

interface Props {
  t: TFunction;
  control: Control<MeterEditFormValues>;
}

export const MeterSiteFields = ({ t, control }: Props) => (
  <>
    <FormTextField
      name="accountNumber"
      control={control}
      label={t("meters.createDialog.fields.accountNumber")}
      fullWidth
    />

    <FormTextField
      name="clientName"
      control={control}
      label={t("meters.createDialog.fields.clientName")}
      fullWidth
    />

    <FormTextField
      name="address"
      control={control}
      label={t("meters.createDialog.fields.address")}
      fullWidth
    />

    <FormTextField
      name="descriptions"
      control={control}
      label={t("meters.createDialog.fields.descriptions")}
      fullWidth
      multiline
      minRows={3}
    />
  </>
);
