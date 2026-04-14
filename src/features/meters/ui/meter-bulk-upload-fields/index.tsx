import { type Control, useController } from "react-hook-form";

import type { TFunction } from "i18next";
import type { ChangeEvent } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { useCompaniesQuery } from "@entities/companies";
import {
  type MeterBulkUploadFormValues,
} from "@entities/meters";

import { FormSelectField } from "@shared/ui/form-select-field";

interface Props {
  t: TFunction;
  control: Control<MeterBulkUploadFormValues>;
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
}

export const MeterBulkUploadFields = ({
  t,
  control,
  selectedFile,
  onFileChange,
}: Props) => {
  const { companies, isLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
  });

  const { fieldState } = useController({
    control,
    name: "file",
  });

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    onFileChange(file);
    event.target.value = "";
  };

  return (
    <Stack spacing={2}>
      <FormSelectField
        name="companyId"
        control={control}
        label={t("meters.bulkUpload.import.fields.company")}
        placeholder={t("meters.bulkUpload.import.fields.companyPlaceholder")}
        options={companyOptions}
        disabled={isLoading}
      />

      <Stack spacing={1}>
        <TextField
          label={t("meters.bulkUpload.import.fields.file")}
          value={selectedFile?.name ?? ""}
          placeholder={t("meters.bulkUpload.import.fields.filePlaceholder")}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            input: {
              readOnly: true,
            },
          }}
          error={Boolean(fieldState.error?.message)}
          helperText={
            fieldState.error?.message ??
            t("meters.bulkUpload.import.fields.fileHelper")
          }
        />

        <Button variant="outlined" component="label">
          {t("meters.bulkUpload.import.actions.chooseFile")}
          <input
            hidden
            type="file"
            accept=".xlsx,.xls"
            onChange={handleInputChange}
          />
        </Button>
      </Stack>
    </Stack>
  );
};
