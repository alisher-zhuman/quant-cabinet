import { useEffect, useMemo } from "react";

import { useWatch } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { useCompaniesQuery } from "@entities/companies";
import { useControllerQuery, useControllersQuery } from "@entities/controllers";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useMeterForm } from "../../hooks/useMeterForm";
import { MeterContextFields } from "../meter-context-fields";
import { MeterMainFields } from "../meter-main-fields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCompanyId?: string;
  initialControllerId?: string;
}

export const CreateMeterDialog = ({
  open,
  onClose,
  onSuccess,
  initialCompanyId,
  initialControllerId,
}: Props) => {
  const { t } = useTranslation();

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: !initialCompanyId,
  });

  const companyOptions = useMemo(
    () => companies.map((company) => ({ value: company.id, label: company.name })),
    [companies],
  );

  const { control, isPending, isDirty, isValid, onSubmit, setValue } = useMeterForm({
    onSuccess,
    ...(initialCompanyId !== undefined ? { initialCompanyId } : {}),
    ...(initialControllerId !== undefined ? { initialControllerId } : {}),
  });

  const selectedCompanyId = useWatch({ control, name: "companyId" });
  const watchedControllerId = useWatch({ control, name: "controllerId" });
  
  const selectedControllerId = watchedControllerId ?? initialControllerId;

  const { controller: selectedController } = useControllerQuery(selectedControllerId);

  const activeControllerMeters = useMemo(
    () =>
      selectedController?.meters?.filter((meter) => !meter.isArchived) ?? [],
    [selectedController?.meters],
  );

  const controllerRestrictionMessage = useMemo(() => {
    if (!selectedController) {
      return undefined;
    }

    if (selectedController.controllerType === "single" && activeControllerMeters.length >= 1) {
      return t("meters.createDialog.controllerRestriction.single");
    }

    if (selectedController.controllerType === "multiple" && activeControllerMeters.length >= 8) {
      return t("meters.createDialog.controllerRestriction.multiple");
    }

    return undefined;
  }, [selectedController, activeControllerMeters.length, t]);

  const { controllers, isLoading: isControllersLoading } = useControllersQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    companyId: initialCompanyId ?? selectedCompanyId ?? "",
    serialNumber: "",
    phoneNumber: "",
    simIMSI: "",
    enabled: Boolean(initialCompanyId ?? selectedCompanyId),
  });

  const controllerOptions = useMemo(
    () =>
      controllers.map((controller) => ({
        value: controller.id,
        label: controller.serialNumber,
      })),
    [controllers],
  );

  const locationTypeOptions = useMemo(
    () => [
      { value: "indoor", label: t("meters.details.locationType.indoor") },
      { value: "well", label: t("meters.details.locationType.well") },
      { value: "cabinet", label: t("meters.details.locationType.cabinet") },
    ],
    [t],
  );

  useEffect(() => {
    if (initialCompanyId || initialControllerId) {
      return;
    }

    setValue("controllerId", "", {
      shouldDirty: false,
      shouldValidate: true,
    });
  }, [initialCompanyId, initialControllerId, selectedCompanyId, setValue]);

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("meters.createDialog.title")}</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <MeterContextFields
              t={t}
              control={control}
              initialCompanyId={initialCompanyId}
              initialControllerId={initialControllerId}
              isCompaniesLoading={isCompaniesLoading}
              isControllersLoading={isControllersLoading}
              companyOptions={companyOptions}
              controllerOptions={controllerOptions}
              controllerHelperText={controllerRestrictionMessage}
            />

            {controllerRestrictionMessage && initialControllerId && (
              <Typography color="error" sx={{ mt: 2 }}>
                {controllerRestrictionMessage}
              </Typography>
            )}

            <MeterMainFields
              t={t}
              control={control}
              locationTypeOptions={locationTypeOptions}
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t("meters.createDialog.cancel")}
              submitLabel={t("meters.createDialog.submit")}
              submitLabelLoading={t("meters.createDialog.submitLoading")}
              isSubmitting={isPending}
              isDirty={isDirty}
              submitProps={{ disabled: !isValid || Boolean(controllerRestrictionMessage) }}
            />
          </FormFieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
