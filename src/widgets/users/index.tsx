import { useTranslation } from "react-i18next";

import { useUsersQuery } from "@features/users";

export const UsersWidget = () => {
  const { t } = useTranslation();

  const { users } = useUsersQuery({
    page: 0,
    limit: 10,
    isArchived: false,
  });

  console.log(users);

  return <div>{t("users.title")}</div>;
};
