import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@shared/constants";
import type { AppLanguage } from "@shared/types";

interface Props {
  sx?: SxProps<Theme>;
}

const getResolvedLanguage = (language: string | undefined): AppLanguage => {
  if (!language) {
    return DEFAULT_LANGUAGE;
  }

  const normalizedLanguage = language.split("-")[0];

  return SUPPORTED_LANGUAGES.includes(normalizedLanguage as AppLanguage)
    ? (normalizedLanguage as AppLanguage)
    : DEFAULT_LANGUAGE;
};

export const LanguageSwitcher = ({ sx }: Props) => {
  const { t, i18n } = useTranslation();

  const currentLanguage = getResolvedLanguage(i18n.resolvedLanguage);
  const containerProps = sx ? { sx } : {};

  const onChangeLanguage = (
    _event: MouseEvent<HTMLElement>,
    nextLanguage: AppLanguage | null,
  ) => {
    if (!nextLanguage || nextLanguage === currentLanguage) {
      return;
    }

    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <Box {...containerProps}>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={currentLanguage}
        onChange={onChangeLanguage}
        aria-label={t("common.language.label")}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <ToggleButton key={language} value={language}>
            {t(`common.language.${language}`)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
