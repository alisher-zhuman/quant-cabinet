import { useMemo } from "react";

import { Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { useCompaniesQuery } from "@entities/companies";
import type { UserRow } from "@entities/users";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";
import { FormSelectField } from "@shared/ui/form-select-field";
import { FormTextField } from "@shared/ui/form-text-field";

import { useUserForm } from "../../hooks/useUserForm";

interface Props {
  user?: UserRow | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateUserDialog = ({
  user,
  open,
  onClose,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const isEditMode = Boolean(user);

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
  });

  const companyOptions = useMemo(
    () => companies.map((company) => ({ value: company.id, label: company.name })),
    [companies],
  );

  const roleOptions = useMemo(
    () =>
      isEditMode
        ? [
            { value: "admin", label: t("profile.roles.admin") },
            { value: "manager", label: t("profile.roles.manager") },
            { value: "user", label: t("profile.roles.user") },
          ]
        : [
            { value: "user", label: t("profile.roles.user") },
            { value: "manager", label: t("profile.roles.manager") },
          ],
    [isEditMode, t],
  );

  const { control, isPending, isValid, onSubmit } = useUserForm({
    user,
    onSuccess,
  });

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {t(isEditMode ? "users.editDialog.title" : "users.createDialog.title")}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <FormTextField
              name="email"
              control={control}
              label={t("users.createDialog.fields.email")}
              type="email"
              fullWidth
              disabled={isEditMode}
            />

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

            <FormSelectField
              name="company"
              control={control}
              label={t("users.createDialog.fields.company")}
              fullWidth
              disabled={isCompaniesLoading}
              options={companyOptions}
              emptyOptionLabel={t("users.createDialog.fields.companyPlaceholder")}
            />

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

            <FormActions
              onCancel={onClose}
              cancelLabel={t(
                isEditMode
                  ? "users.editDialog.cancel"
                  : "users.createDialog.cancel",
              )}
              submitLabel={t(
                isEditMode
                  ? "users.editDialog.submit"
                  : "users.createDialog.submit",
              )}
              submitLabelLoading={t(
                isEditMode
                  ? "users.editDialog.submitLoading"
                  : "users.createDialog.submitLoading",
              )}
              isSubmitting={isPending}
              submitProps={{ disabled: !isValid }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
