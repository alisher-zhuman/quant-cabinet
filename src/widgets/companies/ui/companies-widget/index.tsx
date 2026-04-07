import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { TableSection } from "@shared/ui/table-section";

import { useCompaniesWidget } from "../../hooks/useCompaniesWidget";
import { CompaniesDialogs } from "../companies-dialogs";
import { CompaniesToolbar } from "../companies-toolbar";

export const CompaniesWidget = () => {
  const {
    t,
    tableSectionProps,
    toolbarProps,
    dialogProps,
  } = useCompaniesWidget();

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}
      >
        <Typography component="h1" variant="h4">
          {t("companies.title")}
        </Typography>

        <TableSection
          isLoading={tableSectionProps.isLoading}
          isError={tableSectionProps.isError}
          errorText={tableSectionProps.errorText}
          hasItems={tableSectionProps.hasItems}
          emptyText={tableSectionProps.emptyText}
          rows={tableSectionProps.rows}
          columns={tableSectionProps.columns}
          getRowId={(company) => company.id}
          onRowClick={tableSectionProps.onRowClick}
          toolbar={<CompaniesToolbar {...toolbarProps} />}
          pagination={tableSectionProps.pagination}
        />
      </Box>

      <CompaniesDialogs {...dialogProps} />
    </>
  );
};
