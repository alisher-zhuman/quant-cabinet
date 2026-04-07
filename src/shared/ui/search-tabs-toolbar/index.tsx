import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { SearchInput } from "../search-input";

interface Props {
  search: string;
  searchPlaceholder: string;
  activeLabel: string;
  archivedLabel: string;
  isSearchLoading: boolean;
  isArchived: boolean;
  actions?: ReactNode;
  left?: ReactNode;
  hideSearch?: boolean;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
}

export const SearchTabsToolbar = ({
  search,
  searchPlaceholder,
  activeLabel,
  archivedLabel,
  isSearchLoading,
  isArchived,
  actions,
  left,
  hideSearch = false,
  onSearchChange,
  onArchivedChange,
}: Props) => (
  <Box
    sx={{
      display: "flex",
      alignItems: { xs: "stretch", sm: "center" },
      justifyContent: "space-between",
      flexDirection: { xs: "column", sm: "row" },
      gap: 2,
    }}
  >
    {left ? (
      left
    ) : (
      !hideSearch && (
      <SearchInput
        value={search}
        onChange={onSearchChange}
        isLoading={isSearchLoading}
        placeholder={searchPlaceholder}
        fullWidth
        sx={{ maxWidth: { xs: "100%", sm: 360 } }}
      />
      )
    )}

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "space-between", sm: "flex-end" },
        flexWrap: "wrap",
        gap: 1.5,
      }}
    >
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
        <Tab value="active" label={activeLabel} sx={{ minHeight: 40 }} />
        <Tab value="archived" label={archivedLabel} sx={{ minHeight: 40 }} />
      </Tabs>

      {actions}
    </Box>
  </Box>
);
