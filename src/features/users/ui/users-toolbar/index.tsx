import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { SearchInput } from "@shared/ui/search-input";

interface Props {
  search: string;
  isSearchLoading: boolean;
  isArchived: boolean;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
}

export const UsersToolbar = ({
  search,
  isSearchLoading,
  isArchived,
  onSearchChange,
  onArchivedChange,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <SearchInput
        value={search}
        onChange={onSearchChange}
        isLoading={isSearchLoading}
        placeholder={t("users.search.placeholder")}
        fullWidth
        sx={{ maxWidth: { xs: "100%", sm: 360 } }}
      />

      <Tabs
        value={isArchived ? "archived" : "active"}
        onChange={(_event, value: string) => {
          if (!value) {
            return;
          }

          onArchivedChange(value === "archived");
        }}
        sx={{ minHeight: 40 }}
      >
        <Tab
          value="active"
          label={t("users.tabs.active")}
          sx={{ minHeight: 40 }}
        />
        <Tab
          value="archived"
          label={t("users.tabs.archived")}
          sx={{ minHeight: 40 }}
        />
      </Tabs>
    </Box>
  );
};
