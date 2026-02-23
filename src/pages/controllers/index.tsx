import { useTranslation } from "react-i18next";

export const Controllers = () => {
  const { t } = useTranslation();

  return <div>{t("controllers.title")}</div>;
};
