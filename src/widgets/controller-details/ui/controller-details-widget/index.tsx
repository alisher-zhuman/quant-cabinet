import { Link } from "react-router";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ROUTES } from "@shared/constants";
import { Loader } from "@shared/ui/loader";

import { useControllerDetailsWidget } from "../../hooks/useControllerDetailsWidget";
import { ControllerCompanySection } from "../controller-company-section";
import { ControllerInfoSection } from "../controller-info-section";

export const ControllerDetailsWidget = () => {
  const {
    t,
    controllerId,
    controller,
    isLoading,
    isError,
    controllerStatus,
    controllerType,
    archivedStatus,
    companyStatus,
    correctTimeLabel,
    correctIntervalLabel,
  } = useControllerDetailsWidget();

  if (isLoading) {
    return <Loader isFullscreen />;
  }

  if (isError || !controller) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{t("controllers.error")}</Typography>

        <Button
          component={Link}
          to={`/${ROUTES.CONTROLLERS}`}
          sx={{ mt: 2 }}
        >
          {t("controllers.details.back")}
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        width: "100%",
        maxWidth: "none",
      }}
    >
      <Button
        component={Link}
        to={`/${ROUTES.CONTROLLERS}`}
        variant="text"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ width: "fit-content", px: 1, alignSelf: "flex-start" }}
      >
        {t("controllers.details.back")}
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="h4" fontWeight={700}>
              {controller.serialNumber}
            </Typography>

            <Typography color="text.secondary">
              {controllerType} • {controllerStatus}
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            <ControllerInfoSection
              t={t}
              controller={controller}
              controllerId={controllerId}
              controllerStatus={controllerStatus}
              controllerType={controllerType}
              archivedStatus={archivedStatus}
              correctTimeLabel={correctTimeLabel}
              correctIntervalLabel={correctIntervalLabel}
            />
          </Stack>

          {controller.company && (
            <>
              <Divider />

              <ControllerCompanySection
                t={t}
                controller={controller.company}
                companyStatus={companyStatus}
              />
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};
