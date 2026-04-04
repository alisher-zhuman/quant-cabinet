import { type ChangeEvent, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import { useCompaniesQuery } from "@entities/companies";

import type { ControllerFilters } from "../../types";

interface Props {
  open: boolean;
  filters: ControllerFilters;
  onClose: () => void;
  onApply: (filters: ControllerFilters) => void;
}

export const ControllerFiltersDialog = ({
  open,
  filters,
  onClose,
  onApply,
}: Props) => {
  const [values, setValues] = useState(() => filters);

  const { t } = useTranslation();

  const { companies, isLoading: isCompaniesLoading } = useCompaniesQuery({
    page: 0,
    limit: 1000,
    search: "",
    isArchived: false,
    enabled: open,
  });

  const companyOptions = useMemo(
    () =>
      companies.map((company) => ({
        value: company.id,
        label: company.name,
      })),
    [companies],
  );

  const handleChange = (field: keyof ControllerFilters, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createChangeHandler =
    (field: keyof ControllerFilters) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      handleChange(field, event.target.value);
    };

  const handleReset = () => {
    onApply({
      companyId: "",
      serialNumber: "",
      phoneNumber: "",
      simIMSI: "",
    });
  };

  const handleApply = () => {
    onApply(values);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FilterListRoundedIcon fontSize="small" />
        {t("controllers.filters.title")}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 1,
          }}
        >
          <TextField
            select
            value={values.companyId}
            label={t("controllers.filters.fields.companyId")}
            onChange={createChangeHandler("companyId")}
            disabled={isCompaniesLoading}
          >
            <MenuItem value="">
              <em>{t("controllers.createDialog.fields.companyPlaceholder")}</em>
            </MenuItem>
            {companyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            value={values.serialNumber}
            label={t("controllers.filters.fields.serialNumber")}
            onChange={createChangeHandler("serialNumber")}
          />

          <TextField
            value={values.phoneNumber}
            label={t("controllers.filters.fields.phoneNumber")}
            onChange={createChangeHandler("phoneNumber")}
          />

          <TextField
            value={values.simIMSI}
            label={t("controllers.filters.fields.simIMSI")}
            onChange={createChangeHandler("simIMSI")}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: 1.5,
              pt: 1,
            }}
          >
            <Button variant="text" onClick={handleReset}>
              {t("controllers.filters.reset")}
            </Button>

            <Button variant="text" onClick={onClose}>
              {t("controllers.filters.cancel")}
            </Button>

            <Button variant="contained" onClick={handleApply}>
              {t("controllers.filters.apply")}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
