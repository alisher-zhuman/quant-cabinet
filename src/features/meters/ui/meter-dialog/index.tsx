import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import type { MeterRow } from "@entities/meters";

import { useAuthStore } from "@shared/stores";
import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useMeterDialogForm } from "../../hooks/useMeterDialogForm";
import { useMeterDialogOptions } from "../../hooks/useMeterDialogOptions";
import { MeterContextFields } from "../meter-context-fields";
import { MeterManagementFields } from "../meter-management-fields";
import { MeterSiteFields } from "../meter-site-fields";
import { MeterTechnicalFields } from "../meter-technical-fields";

interface Props {
  meter?: MeterRow | null | undefined;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCompanyId?: string | undefined;
  initialControllerId?: string | undefined;
}

export const MeterDialog = ({
  meter,
  open,
  onClose,
  onSuccess,
  initialCompanyId,
  initialControllerId,
}: Props) => {
  const { t } = useTranslation();
  const role = useAuthStore((state) => state.role);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { control, isPending, isDirty, isValid, isEditMode, onSubmit, setValue } =
    useMeterDialogForm({
      meter,
      onSuccess,
      initialCompanyId,
      initialControllerId,
    });

  const {
    isCompaniesLoading,
    isControllersLoading,
    companyOptions,
    controllerOptions,
    locationTypeOptions,
    pendingCommandOptions,
    controllerRestrictionMessage,
  } = useMeterDialogOptions({
    meter,
    role,
    control,
    setValue,
    initialCompanyId,
    initialControllerId,
    isEditMode,
  });

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {t(isEditMode ? "meters.editDialog.title" : "meters.createDialog.title")}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <MeterContextFields
              t={t}
              control={control}
              initialCompanyId={initialCompanyId}
              initialControllerId={initialControllerId}
              currentRole={role}
              isCompaniesLoading={isCompaniesLoading}
              isControllersLoading={isControllersLoading}
              companyOptions={companyOptions}
              controllerOptions={controllerOptions}
              controllerHelperText={controllerRestrictionMessage}
            />

            {!controllerRestrictionMessage && (
              <>
                <MeterTechnicalFields
                  t={t}
                  control={control}
                  locationTypeOptions={locationTypeOptions}
                />

                <MeterSiteFields t={t} control={control} />

                {isEditMode && (
                  <MeterManagementFields
                    t={t}
                    control={control}
                    pendingCommandOptions={pendingCommandOptions}
                  />
                )}
              </>
            )}

            {controllerRestrictionMessage ? (
              <Button size="small" onClick={onClose} sx={{ alignSelf: "flex-end" }}>
                {t(isEditMode ? "meters.editDialog.cancel" : "meters.createDialog.cancel")}
              </Button>
            ) : (
              <FormActions
                onCancel={onClose}
                cancelLabel={t(
                  isEditMode ? "meters.editDialog.cancel" : "meters.createDialog.cancel",
                )}
                submitLabel={t(
                  isEditMode ? "meters.editDialog.submit" : "meters.createDialog.submit",
                )}
                submitLabelLoading={t(
                  isEditMode
                    ? "meters.editDialog.submitLoading"
                    : "meters.createDialog.submitLoading",
                )}
                isSubmitting={isPending}
                isDirty={isDirty}
                submitProps={{ disabled: !isValid }}
              />
            )}
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
