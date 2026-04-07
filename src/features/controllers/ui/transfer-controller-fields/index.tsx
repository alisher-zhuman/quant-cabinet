import type { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  type TransferControllerFormValues,
} from "@entities/controllers";

import { FormSelectField } from "@shared/ui/form-select-field";

interface Props {
  control: Control<TransferControllerFormValues>;
  isCompaniesLoading: boolean;
  companyOptions: Array<{
    value: string;
    label: string;
  }>;
}

export const TransferControllerFields = ({
  control,
  isCompaniesLoading,
  companyOptions,
}: Props) => {
  const { t } = useTranslation();

  return (
    <FormSelectField
      name="companyId"
      control={control}
      label={t("controllers.transferDialog.fields.company")}
      fullWidth
      disabled={isCompaniesLoading}
      options={companyOptions}
      emptyOptionLabel={t("controllers.transferDialog.fields.companyPlaceholder")}
    />
  );
};
