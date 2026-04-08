import { TableSection } from "@shared/ui/table-section";

import { useCompanyMetersTab } from "../../hooks/useCompanyMetersTab";
import { CompanyMetersDialogs } from "../company-meters-dialogs";
import { CompanyMetersToolbar } from "../company-meters-toolbar";

export const CompanyMetersTab = ({
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
  } = useCompanyMetersTab({
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
        getRowId={(meter) => meter.id}
        onRowClick={tableSectionProps.onRowClick}
        toolbar={<CompanyMetersToolbar {...toolbarProps} />}
        pagination={tableSectionProps.pagination}
      />

      <CompanyMetersDialogs {...dialogsProps} />
    </>
  );
};
