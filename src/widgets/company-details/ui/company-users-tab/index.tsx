import { TableSection } from "@shared/ui/table-section";

import { useCompanyUsersTab } from "../../hooks/useCompanyUsersTab";
import { CompanyUsersDialogs } from "../company-users-dialogs";
import { CompanyUsersToolbar } from "../company-users-toolbar";

export const CompanyUsersTab = ({
  companyId,
  isActive,
}: {
  companyId: string;
  isActive: boolean;
}) => {
  const {
    tableSectionProps,
    toolbarProps,
    dialogsProps,
  } = useCompanyUsersTab({
    companyId,
    isActive,
  });

  return (
    <>
      <TableSection
        isLoading={tableSectionProps.isLoading}
        isError={tableSectionProps.isError}
        errorText={tableSectionProps.errorText}
        hasItems={tableSectionProps.hasItems}
        emptyText={tableSectionProps.emptyText}
        rows={tableSectionProps.rows}
        columns={tableSectionProps.columns}
        getRowId={(user) => user.id}
        onRowClick={tableSectionProps.onRowClick}
        toolbar={
          <CompanyUsersToolbar {...toolbarProps} />
        }
        pagination={tableSectionProps.pagination}
      />

      <CompanyUsersDialogs {...dialogsProps} />
    </>
  );
};
