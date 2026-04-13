import { useEffect, useMemo } from "react";

import { useWatch } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useCompaniesQuery } from "@entities/companies";
import type { UserRow } from "@entities/users";

import { AUTH_ROLES } from "@shared/constants";
import { isManager } from "@shared/helpers";
import { useAuthStore } from "@shared/stores";
import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useUserForm } from "../../hooks/useUserForm";
import { UserCompanyFields } from "../user-company-fields";
import { UserMainFields } from "../user-main-fields";

interface Props {
  user?: UserRow | null;
  companyId?: string;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateUserDialog = ({
  user,
  companyId,
  open,
  onClose,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const currentRole = useAuthStore((state) => state.role);

  const isEditMode = Boolean(user);

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: !isManager(currentRole),
  });

  const companyOptions = useMemo(
    () => companies.map((company) => ({ value: company.id, label: company.name })),
    [companies],
  );
  const roleOptions = useMemo(
    () => {
      const options = [
        { value: AUTH_ROLES.ADMIN, label: t("profile.roles.admin") },
        { value: AUTH_ROLES.MANAGER, label: t("profile.roles.manager") },
        { value: AUTH_ROLES.USER, label: t("profile.roles.user") },
      ];

      if (isManager(currentRole)) {
        return options.filter((opt) => opt.value !== AUTH_ROLES.ADMIN);
      }

      return options;
    },
    [currentRole, t],
  );

  const { control, isPending, isDirty, isValid, onSubmit, setValue } = useUserForm({
    user,
    companyId,
    onSuccess,
  });

  const selectedRole = useWatch({ control, name: "role" });

  const shouldShowCompanyField =
    selectedRole !== AUTH_ROLES.ADMIN && !companyId && !isManager(currentRole);

  useEffect(() => {
    if (!shouldShowCompanyField) {
      setValue("company", companyId ?? "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [companyId, setValue, shouldShowCompanyField]);

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
            <UserMainFields
              t={t}
              control={control}
              isEditMode={isEditMode}
              roleOptions={roleOptions}
            />

            <UserCompanyFields
              t={t}
              control={control}
              isEditMode={isEditMode}
              shouldShowCompanyField={shouldShowCompanyField}
              isCompaniesLoading={isCompaniesLoading}
              companyOptions={companyOptions}
            />

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
              isDirty={isDirty}
              submitProps={{ disabled: !isValid }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
