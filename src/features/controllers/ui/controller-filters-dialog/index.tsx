import { useTranslation } from "react-i18next";

import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useControllerFiltersDialog } from "../../hooks/useControllerFiltersDialog";
import type { ControllerFilters } from "../../types";
import { ControllerFilterActions } from "../controller-filter-actions";
import { ControllerFilterFields } from "../controller-filter-fields";

interface Props {
  open: boolean;
  filters: ControllerFilters;
  onClose: () => void;
  onApply: (filters: ControllerFilters) => void;
  hideCompanyField?: boolean;
}

const ControllerFiltersDialogContent = ({
  open,
  filters,
  onClose,
  onApply,
  hideCompanyField = false,
}: Props) => {
  const { t } = useTranslation();
  const {
    values,
    companyOptions,
    isCompaniesLoading,
    hasActiveFilters,
    handleChange,
    handleReset,
    handleApply,
  } = useControllerFiltersDialog({
    open,
    filters,
    hideCompanyField,
    onClose,
    onApply,
  });

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
          <ControllerFilterFields
            values={values}
            hideCompanyField={hideCompanyField}
            isCompaniesLoading={isCompaniesLoading}
            companyOptions={companyOptions}
            onChange={handleChange}
          />

          <ControllerFilterActions
            hasActiveFilters={hasActiveFilters}
            onReset={handleReset}
            onClose={onClose}
            onApply={handleApply}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export const ControllerFiltersDialog = (props: Props) => {
  const dialogKey = JSON.stringify({
    filters: props.filters,
    hideCompanyField: props.hideCompanyField ?? false,
  });

  return <ControllerFiltersDialogContent key={dialogKey} {...props} />;
};
