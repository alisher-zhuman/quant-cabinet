import { useTranslation } from "react-i18next";

export const Users = () => {
  const { t } = useTranslation();

  return <div>{t("users.title")}</div>;
};
