import { useTranslation } from "react-i18next";

export const Companies = () => {
  const { t } = useTranslation();

  return <div>{t("companies.title")}</div>;
};
