import type { TFunction } from "i18next";
import type { Control } from "react-hook-form";

import type { UserFormValues } from "@entities/users";

import { FormSelectField } from "@shared/ui/form-select-field";
import { FormTextField } from "@shared/ui/form-text-field";

interface Option {
  value: string;
  label: string;
}

interface Props {
  t: TFunction;
  control: Control<UserFormValues>;
  isEditMode: boolean;
  roleOptions: Option[];
}

export const UserMainFields = ({
  t,
  control,
  isEditMode,
  roleOptions,
}: Props) => (
  <>
    {!isEditMode && (
      <FormTextField
        name="email"
        control={control}
        label={t("users.createDialog.fields.email")}
        type="email"
        fullWidth
      />
    )}

    <FormTextField
      name="firstName"
      control={control}
      label={t("users.createDialog.fields.firstName")}
      fullWidth
    />

    <FormTextField
      name="lastName"
      control={control}
      label={t("users.createDialog.fields.lastName")}
      fullWidth
    />

    <FormSelectField
      name="role"
      control={control}
      label={t("users.createDialog.fields.role")}
      fullWidth
      options={roleOptions}
    />

    <FormTextField
      name="phoneNumber"
      control={control}
      label={t("users.createDialog.fields.phoneNumber")}
      fullWidth
    />

    <FormTextField
      name="descriptions"
      control={control}
      label={t("users.createDialog.fields.descriptions")}
      fullWidth
    />
  </>
);
