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

export const CompaniesToolbar = ({
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
    searchPlaceholder={t("companies.search.placeholder")}
    activeLabel={t("companies.tabs.active")}
    archivedLabel={t("companies.tabs.archived")}
    isSearchLoading={isSearchLoading}
    isArchived={isArchived}
    actions={
      <Button
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={onOpenCreateDialog}
      >
        {t("companies.actions.create")}
      </Button>
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
