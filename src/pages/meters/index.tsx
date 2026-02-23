import { useTranslation } from "react-i18next";

export const Meters = () => {
  const { t } = useTranslation();

  return <div>{t("meters.title")}</div>;
};
