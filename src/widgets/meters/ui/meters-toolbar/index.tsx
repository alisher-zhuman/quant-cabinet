import type { TFunction } from "i18next";

import { SearchTabsToolbar } from "@shared/ui/search-tabs-toolbar";

interface Props {
  t: TFunction;
  search: string;
  isSearchLoading: boolean;
  isArchived: boolean;
  onSearchChange: (value: string) => void;
  onArchivedChange: (value: boolean) => void;
}

export const MetersToolbar = ({
  t,
  search,
  isSearchLoading,
  isArchived,
  onSearchChange,
  onArchivedChange,
}: Props) => (
  <SearchTabsToolbar
    search={search}
    searchPlaceholder={t("meters.search.placeholder")}
    activeLabel={t("meters.tabs.active")}
    archivedLabel={t("meters.tabs.archived")}
    isSearchLoading={isSearchLoading}
    isArchived={isArchived}
    onSearchChange={onSearchChange}
    onArchivedChange={onArchivedChange}
  />
);
