import { useTranslation } from "react-i18next";

import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useMeterFiltersDialog } from "../../hooks/useMeterFiltersDialog";
import type { MeterFilters } from "../../types";
import { MeterFilterActions } from "../meter-filter-actions";
import { MeterFilterFields } from "../meter-filter-fields";

interface Props {
  open: boolean;
  filters: MeterFilters;
  onClose: () => void;
  onApply: (filters: MeterFilters) => void;
}

export const MeterFiltersDialog = ({
  open,
  filters,
  onClose,
  onApply,
}: Props) => {
  const { t } = useTranslation();
  const {
    values,
    companyOptions,
    isCompaniesLoading,
    handleChange,
    handleReset,
    handleApply,
  } = useMeterFiltersDialog({
    open,
    filters,
    onApply,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FilterListRoundedIcon fontSize="small" />
        {t("meters.filters.title")}
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
          <MeterFilterFields
            values={values}
            isCompaniesLoading={isCompaniesLoading}
            companyOptions={companyOptions}
            onChange={handleChange}
          />

          <MeterFilterActions
            onReset={handleReset}
            onClose={onClose}
            onApply={handleApply}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
