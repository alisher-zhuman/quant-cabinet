import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { TableSection } from "@shared/ui/table-section";

import { useControllersWidget } from "../../hooks/useControllersWidget";
import { ControllersDialogs } from "../controllers-dialogs";
import { ControllersToolbar } from "../controllers-toolbar";

export const ControllersWidget = () => {
  const {
    t,
    tableSectionProps,
    toolbarProps,
    dialogsProps,
  } = useControllersWidget();

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}
      >
        <Typography component="h1" variant="h4">
          {t("controllers.title")}
        </Typography>

        <TableSection
          {...tableSectionProps}
          toolbar={
            <ControllersToolbar {...toolbarProps} />
          }
        />
      </Box>

      <ControllersDialogs {...dialogsProps} />
    </>
  );
};
