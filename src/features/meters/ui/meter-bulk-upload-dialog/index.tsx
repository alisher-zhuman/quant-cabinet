import { useWatch } from "react-hook-form";

import { useTranslation } from "react-i18next";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FormActions } from "@shared/ui/form-actions";
import { FormFieldset } from "@shared/ui/form-fieldset";

import { useMeterBulkUploadForm } from "../../hooks/useMeterBulkUploadForm";
import { MeterBulkUploadFields } from "../meter-bulk-upload-fields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MeterBulkUploadDialog = ({
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
  } = useMeterBulkUploadForm({
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
      <DialogTitle>{t("meters.bulkUpload.import.title")}</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit}>
          <FormFieldset disabled={isPending} sx={{ pt: 1 }}>
            <MeterBulkUploadFields
              t={t}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
              control={control as any}
              selectedFile={selectedFile}
              onFileChange={handleFileChange}
            />

            <FormActions
              onCancel={onClose}
              cancelLabel={t("meters.bulkUpload.import.actions.cancel")}
              submitLabel={t("meters.bulkUpload.import.actions.submit")}
              submitLabelLoading={t(
                "meters.bulkUpload.import.actions.submitLoading",
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
