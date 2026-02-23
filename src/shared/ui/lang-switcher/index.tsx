import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";

import { COLORS, LANGUAGE_BADGE, SUPPORTED_LANGUAGES } from "@shared/constants";
import { getResolvedLanguage } from "@shared/helpers";

interface Props {
  sx?: SxProps<Theme>;
}

export const LangSwitcher = ({ sx }: Props) => {
  const { t, i18n } = useTranslation();

  const currentLanguage = getResolvedLanguage(i18n.resolvedLanguage);
  const currentLanguageIndex = SUPPORTED_LANGUAGES.indexOf(currentLanguage);
  const nextLanguage =
    SUPPORTED_LANGUAGES[
      (currentLanguageIndex + 1) % SUPPORTED_LANGUAGES.length
    ] ?? SUPPORTED_LANGUAGES[0];

  const currentLanguageBadge = LANGUAGE_BADGE[currentLanguage];
  const containerProps = sx ? { sx } : {};

  const onToggleLanguage = () => {
    if (!nextLanguage || nextLanguage === currentLanguage) {
      return;
    }

    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <Box {...containerProps}>
      <Button
        type="button"
        variant="outlined"
        onClick={onToggleLanguage}
        aria-label={t("common.language.label")}
        sx={{
          minWidth: "auto",
          display: "flex",
          gap: 0.5,
          px: 1.5,
          py: 1,
          cursor: "pointer",
          borderRadius: 2,
          borderColor: COLORS.primary.main,
          color: COLORS.primary.dark,
          bgcolor: COLORS.primary.light,
          textTransform: "none",
          fontWeight: 700,
          lineHeight: 1,
          "&:hover": {
            borderColor: COLORS.primary.dark,
            bgcolor: COLORS.neutral[100],
          },
        }}
      >
        <Box component="span" sx={{ fontSize: 22, lineHeight: 1 }}>
          {currentLanguageBadge.flag}
        </Box>

        <Box component="span" sx={{ fontSize: 14, lineHeight: 1 }}>
          {currentLanguageBadge.code}
        </Box>
      </Button>
    </Box>
  );
};
