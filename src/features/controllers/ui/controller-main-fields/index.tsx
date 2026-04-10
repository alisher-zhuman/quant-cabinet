import type { TFunction } from "i18next";
import type { Control } from "react-hook-form";

import type { ControllerFormValues } from "@entities/controllers";

import { FormSelectField } from "@shared/ui/form-select-field";
import { FormTextField } from "@shared/ui/form-text-field";

interface Option {
  value: string;
  label: string;
}

interface Props {
  t: TFunction;
  control: Control<ControllerFormValues>;
  isEditMode: boolean;
  initialCompanyId?: string | undefined;
  isCompaniesLoading: boolean;
  companyOptions: Option[];
  typeOptions: Option[];
  currentRole?: string | null;
}

export const ControllerMainFields = ({
  t,
  control,
  isEditMode,
  initialCompanyId,
  isCompaniesLoading,
  companyOptions,
  typeOptions,
  currentRole,
}: Props) => {
  if (isEditMode) {
    return null;
  }

  return (
    <>
      <FormTextField
        name="serialNumber"
        control={control}
        label={t("controllers.createDialog.fields.serialNumber")}
        fullWidth
      />

      {!initialCompanyId && currentRole !== "manager" && (
        <FormSelectField
          name="companyId"
          control={control}
          label={t("controllers.createDialog.fields.company")}
          fullWidth
          disabled={isCompaniesLoading}
          options={companyOptions}
          emptyOptionLabel={t("controllers.createDialog.fields.companyPlaceholder")}
        />
      )}

      <FormSelectField
        name="type"
        control={control}
        label={t("controllers.createDialog.fields.type")}
        fullWidth
        options={typeOptions}
      />
    </>
  );
};
