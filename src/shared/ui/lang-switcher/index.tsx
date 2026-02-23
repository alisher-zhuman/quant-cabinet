import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { SUPPORTED_LANGUAGES } from "@shared/constants";
import { getResolvedLanguage } from "@shared/helpers";
import type { AppLanguage } from "@shared/types";

interface Props {
  sx?: SxProps<Theme>;
}

export const LangSwitcher = ({ sx }: Props) => {
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
