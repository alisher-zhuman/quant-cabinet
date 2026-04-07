import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";

import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";

interface Props {
  t: TFunction;
  search: string;
  isSearchLoading: boolean;
  isArchived: boolean;
  onOpenCreateDialog: () => void;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
}

export const CompanyUsersToolbar = ({
  t,
  search,
  isSearchLoading,
  isArchived,
  onOpenCreateDialog,
  onSearchChange,
  onArchivedChange,
}: Props) => (
  <SearchTabsToolbar
    search={search}
    searchPlaceholder={t("users.search.placeholder")}
    activeLabel={t("users.tabs.active")}
    archivedLabel={t("users.tabs.archived")}
    isSearchLoading={isSearchLoading}
    isArchived={isArchived}
    actions={
      <Button
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={onOpenCreateDialog}
      >
        {t("users.actions.create")}
      </Button>
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
