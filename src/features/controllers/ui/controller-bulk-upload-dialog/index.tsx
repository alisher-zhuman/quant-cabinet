import { useWatch } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useControllerBulkUploadForm } from "../../hooks/useControllerBulkUploadForm";
import { ControllerBulkUploadFields } from "../controller-bulk-upload-fields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ControllerBulkUploadDialog = ({
  open,
  onClose,
  onSuccess,
}: Props) => {
  const { t } = useTranslation();
  const {
    control,
    isPending,
    isDirty,
    isValid,
    onSubmit,
    handleFileChange,
  } = useControllerBulkUploadForm({
    onSuccess,
  });
  const selectedFile = useWatch({
    control,
    name: "file",
  });

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("controllers.bulkUpload.import.title")}</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <ControllerBulkUploadFields
              t={t}
              control={control}
              selectedFile={selectedFile}
              onFileChange={handleFileChange}
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t("controllers.bulkUpload.import.actions.cancel")}
              submitLabel={t("controllers.bulkUpload.import.actions.submit")}
              submitLabelLoading={t(
                "controllers.bulkUpload.import.actions.submitLoading",
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
