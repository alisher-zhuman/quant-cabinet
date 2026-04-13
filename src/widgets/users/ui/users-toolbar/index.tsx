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

export const UsersToolbar = ({
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
      <ResponsiveButton
        variant="contained"
        icon={<AddRoundedIcon />}
        label={t("users.actions.create")}
        onClick={onOpenCreateDialog}
      />
    }
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
