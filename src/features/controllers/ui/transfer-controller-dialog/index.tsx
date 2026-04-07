import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  type ControllerRow,
} from "@entities/controllers";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useTransferControllerDialog } from "../../hooks/useTransferControllerDialog";
import { TransferControllerFields } from "../transfer-controller-fields";

interface Props {
  controller: ControllerRow | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialCompanyId?: string;
}

export const TransferControllerDialog = ({
  controller,
  open,
  onClose,
  onSuccess,
  initialCompanyId,
}: Props) => {
  const { t } = useTranslation();
  const {
    control,
    isDirty,
    isValid,
    onSubmit,
    isPending,
    isCompaniesLoading,
    companyOptions,
  } = useTransferControllerDialog({
    controller,
    open,
    onSuccess,
    initialCompanyId,
  });

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("controllers.transferDialog.title")}</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <TransferControllerFields
              control={control}
              isCompaniesLoading={isCompaniesLoading}
              companyOptions={companyOptions}
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t("controllers.transferDialog.cancel")}
              submitLabel={t("controllers.transferDialog.submit")}
              submitLabelLoading={t("controllers.transferDialog.submitLoading")}
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
