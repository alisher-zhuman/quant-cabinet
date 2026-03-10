import { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { createUserColumns } from "@features/users";

import { useUsersQuery } from "@entities/users";

import { useDebounce, usePagination } from "@shared/hooks";
import { SearchInput } from "@shared/ui/search-input";
import { TableSection } from "@shared/ui/table-section";

export const UsersWidget = () => {
  const [search, setSearch] = useState("");

  const { t } = useTranslation();

  const debouncedSearch = useDebounce(search);

  const { page, limit, setPage, setLimit } = usePagination();

  const { users, total, hasUsers, emptyText, isLoading, isError, isFetching } =
    useUsersQuery({
      page,
      limit,
      search: debouncedSearch,
      isArchived: false,
    });

  const columns = useMemo(() => createUserColumns(t), [t]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
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
        toolbar={
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            isLoading={isFetching}
            placeholder={t("users.search.placeholder")}
            fullWidth
            sx={{ maxWidth: 360 }}
          />
        }
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
