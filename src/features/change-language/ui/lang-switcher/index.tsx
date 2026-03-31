import type { SxProps, Theme } from "@mui/material/styles";

import { LangSwitcher as SharedLangSwitcher } from "@shared/ui/lang-switcher";

import { useChangeLanguage } from "../../hooks/useChangeLanguage";

interface Props {
  sx?: SxProps<Theme>;
}

export const LangSwitcher = ({ sx }: Props) => {
  const { isPending, onChangeLanguage } = useChangeLanguage();

  return (
    <SharedLangSwitcher
      isLoading={isPending}
      onChangeLanguage={onChangeLanguage}
      {...(sx ? { sx } : {})}
    />
  );
};
