import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  hasActiveFilters: boolean;
  onReset: () => void;
  onClose: () => void;
  onApply: () => void;
}

export const ControllerFilterActions = ({
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
          {t("controllers.filters.reset")}
        </Button>
      )}

      <Button variant="text" onClick={onClose}>
        {t("controllers.filters.cancel")}
      </Button>

      <Button variant="contained" onClick={onApply}>
        {t("controllers.filters.apply")}
      </Button>
    </Box>
  );
};
