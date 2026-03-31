import { useEffect } from "react";
import { Link, useParams } from "react-router";

import { useTranslation } from "react-i18next";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useCompanyQuery } from "@entities/companies";

import { ROUTES } from "@shared/constants";

export const CompanyDetailsWidget = () => {
  const { t } = useTranslation();
  const { companyId } = useParams();
  const { company } = useCompanyQuery(companyId);

  useEffect(() => {
    if (!company) {
      return;
    }

    console.log(company);
  }, [company]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
      <Button
        component={Link}
        to={`/${ROUTES.COMPANIES}`}
        variant="text"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ width: "fit-content", px: 0 }}
      >
        {t("companies.details.back")}
      </Button>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography component="h1" variant="h4">
          {t("companies.details.title")}
        </Typography>

        <Typography color="text.secondary">
          {t("companies.details.description")}
        </Typography>
      </Box>

      <Typography variant="body1">
        {t("companies.details.idLabel")}: {companyId ?? "-"}
      </Typography>
    </Box>
  );
};
