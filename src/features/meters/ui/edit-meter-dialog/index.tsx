import { useEffect, useMemo } from "react";

import { useWatch } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useCompaniesQuery } from "@entities/companies";
import { useControllersQuery } from "@entities/controllers";
import { useMeterQuery } from "@entities/meters";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useMeterForm } from "../../hooks/useMeterForm";
import { MeterContextFields } from "../meter-context-fields";
import { MeterMainFields } from "../meter-main-fields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  meterId: string;
}

export const EditMeterDialog = ({
  open,
  onClose,
  onSuccess,
  meterId,
}: Props) => {
  const { t } = useTranslation();

  const { meter, isLoading: isMeterLoading } = useMeterQuery(meterId);

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: true,
  });

  const companyOptions = useMemo(
    () =>
      companies.map((company) => ({ value: company.id, label: company.name })),
    [companies],
  );

  const { control, isPending, isDirty, isValid, onSubmit, setValue } =
    useMeterForm({
      onSuccess,
      meterId,
      ...(meter
        ? {
            initialValues: {
              companyId: (meter as Record<string, unknown>).companyId as string,
              controllerId: (meter as Record<string, unknown>).controllerId as string,
              serialNumber: meter.serialNumber,
              locationType: meter.locationType as "indoor" | "well" | "cabinet",
              port: String(meter.port),
              accountNumber: meter.accountNumber,
              clientName: meter.clientName,
              address: meter.address,
              descriptions: meter.descriptions,
            },
          }
        : {}),
    });

  const selectedCompanyId = useWatch({ control, name: "companyId" });

  const { controllers, isLoading: isControllersLoading } = useControllersQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    companyId: selectedCompanyId ?? "",
    serialNumber: "",
    phoneNumber: "",
    simIMSI: "",
    enabled: Boolean(selectedCompanyId),
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
    if (!meter) {
      return;
    }

    setValue("companyId", (meter as Record<string, unknown>).companyId as string, {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue("controllerId", (meter as Record<string, unknown>).controllerId as string, {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue("serialNumber", meter.serialNumber, {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue("locationType", meter.locationType as "indoor" | "well" | "cabinet", {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue("port", String(meter.port), {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue("accountNumber", meter.accountNumber, {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue("clientName", meter.clientName, {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue("address", meter.address, {
      shouldDirty: false,
      shouldValidate: true,
    });
    setValue("descriptions", meter.descriptions, {
      shouldDirty: false,
      shouldValidate: true,
    });
  }, [meter, setValue]);

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("meters.editDialog.title")}</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending || isMeterLoading} sx={{ pt: 1 }}>
            <MeterContextFields
              t={t}
              control={control}
              isCompaniesLoading={isCompaniesLoading}
              isControllersLoading={isControllersLoading}
              companyOptions={companyOptions}
              controllerOptions={controllerOptions}
              controllerHelperText={undefined}
            />

            <MeterMainFields
              t={t}
              control={control}
              locationTypeOptions={locationTypeOptions}
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t("meters.editDialog.cancel")}
              submitLabel={t("meters.editDialog.submit")}
              submitLabelLoading={t("meters.editDialog.submitLoading")}
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