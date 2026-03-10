import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { createUserColumns } from "@features/users";

import { useUsersQuery } from "@entities/users";

import { usePagination } from "@shared/hooks";
import { TableSection } from "@shared/ui/table-section";

export const UsersWidget = () => {
  const { t } = useTranslation();

  const { page, limit, setPage, setLimit } = usePagination();

  const { users, total, hasUsers, emptyText, isLoading, isError } =
    useUsersQuery({
      page,
      limit,
      isArchived: false,
    });

  const columns = useMemo(() => createUserColumns(t), [t]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography component="h1" variant="h4">
        {t("users.title")}
      </Typography>

      <TableSection
        isLoading={isLoading}
        isError={isError}
        errorText={t("users.error")}
        hasItems={hasUsers}
        emptyText={emptyText}
        rows={users}
        columns={columns}
        getRowId={(user) => user.email}
        pagination={{
          page,
          limit,
          total,
          onPageChange: setPage,
          onLimitChange: setLimit,
          labelRowsPerPage: t("users.table.rowsPerPage"),
        }}
      />
    </Box>
  );
};
