import type { TFunction } from "i18next";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { ResponsiveButton } from "@shared/ui/responsive-button";
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
      <ResponsiveButton
        variant="contained"
        icon={<AddRoundedIcon />}
        label={t("companies.actions.create")}
        onClick={onOpenCreateDialog}
      />
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
