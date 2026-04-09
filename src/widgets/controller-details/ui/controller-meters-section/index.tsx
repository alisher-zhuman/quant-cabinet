import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { TableSection } from "@shared/ui/table-section";

import { useControllerMetersSection } from "../../hooks/useControllerMetersSection";
import { ControllerMetersDialogs } from "../controller-meters-dialogs";
import { ControllerMetersToolbar } from "../controller-meters-toolbar";

export const ControllerMetersSection = ({
  controllerId,
}: {
  controllerId: string;
}) => {
  const {
    t,
    tableSectionProps,
    toolbarProps,
    dialogsProps,
  } = useControllerMetersSection(controllerId);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.96),
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={700}>
            {t("controllers.details.sections.meters")}
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
            toolbar={<ControllerMetersToolbar {...toolbarProps} />}
            pagination={tableSectionProps.pagination}
          />
        </Stack>
      </Paper>

      <ControllerMetersDialogs {...dialogsProps} />
    </>
  );
};
