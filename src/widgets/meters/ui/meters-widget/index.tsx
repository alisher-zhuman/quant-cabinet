import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { TableSection } from "@shared/ui/table-section";

import { useMetersWidget } from "../../hooks/useMetersWidget";
import { MetersDialogs } from "../meters-dialogs";
import { MetersToolbar } from "../meters-toolbar";

export const MetersWidget = () => {
  const {
    t,
    tableSectionProps,
    toolbarProps,
    dialogsProps,
  } = useMetersWidget();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
        <Typography component="h1" variant="h4">
          {t("meters.title")}
        </Typography>

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
          toolbar={<MetersToolbar {...toolbarProps} />}
          pagination={tableSectionProps.pagination}
        />
      </Box>

      <MetersDialogs {...dialogsProps} />
    </>
  );
};
