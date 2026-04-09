import type { TFunction } from "i18next";
import type { Control } from "react-hook-form";

import type { MeterFormValues } from "@entities/meters";

import { FormSelectField } from "@shared/ui/form-select-field";

interface Option {
  value: string;
  label: string;
}

interface Props {
  t: TFunction;
  control: Control<MeterFormValues>;
  initialCompanyId?: string | undefined;
  initialControllerId?: string | undefined;
  isCompaniesLoading: boolean;
  isControllersLoading: boolean;
  companyOptions: Option[];
  controllerOptions: Option[];
  controllerHelperText: string | undefined;
}

export const MeterContextFields = ({
  t,
  control,
  initialCompanyId,
  initialControllerId,
  isCompaniesLoading,
  isControllersLoading,
  companyOptions,
  controllerOptions,
  controllerHelperText,
}: Props) => (
  <>
    {!initialCompanyId && (
      <FormSelectField
        name="companyId"
        control={control}
        label={t("meters.createDialog.fields.company")}
        fullWidth
        disabled={isCompaniesLoading}
        options={companyOptions}
        emptyOptionLabel={t("meters.createDialog.fields.companyPlaceholder")}
      />
    )}

    {!initialControllerId && (
      <FormSelectField
        name="controllerId"
        control={control}
        label={t("meters.createDialog.fields.controller")}
        fullWidth
        disabled={isControllersLoading || (!initialCompanyId && !controllerOptions.length)}
        options={controllerOptions}
        emptyOptionLabel={t("meters.createDialog.fields.controllerPlaceholder")}
        helperText={controllerHelperText}
      />
    )}
  </>
);
