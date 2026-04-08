import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  hasActiveFilters: boolean;
  onReset: () => void;
  onClose: () => void;
  onApply: () => void;
}

export const MeterFilterActions = ({
  hasActiveFilters,
  onReset,
  onClose,
  onApply,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        gap: 1.5,
        pt: 1,
      }}
    >
      {hasActiveFilters && (
        <Button variant="text" onClick={onReset}>
          {t("meters.filters.reset")}
        </Button>
      )}

      <Button variant="text" onClick={onClose}>
        {t("meters.filters.cancel")}
      </Button>

      <Button variant="contained" onClick={onApply}>
        {t("meters.filters.apply")}
      </Button>
    </Box>
  );
};
