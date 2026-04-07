import { TableSection } from "@shared/ui/table-section";

import { useCompanyControllersTab } from "../../hooks/useCompanyControllersTab";
import { CompanyControllersDialogs } from "../company-controllers-dialogs";
import { CompanyControllersToolbar } from "../company-controllers-toolbar";

export const CompanyControllersTab = ({
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
  } = useCompanyControllersTab({
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
        getRowId={(controller) => controller.id}
        onRowClick={tableSectionProps.onRowClick}
        toolbar={<CompanyControllersToolbar {...toolbarProps} />}
        pagination={tableSectionProps.pagination}
      />

      <CompanyControllersDialogs {...dialogsProps} />
    </>
  );
};
