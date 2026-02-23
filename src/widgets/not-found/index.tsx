import { useNavigate } from "react-router";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const NotFoundWidget = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      textAlign="center"
    >
      <Typography variant="h1" component="h1" fontWeight={700}>
        404
      </Typography>

      <Typography variant="h6" color="text.secondary">
        {t("notFound.description")}
      </Typography>

      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        {t("notFound.backButton")}
      </Button>
    </Box>
  );
};
