import { Link, useParams } from "react-router";

import { useTranslation } from "react-i18next";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useCompanyQuery } from "@entities/companies";

import { ROUTES } from "@shared/constants";
import { formatDate } from "@shared/helpers";

export const CompanyDetailsWidget = () => {
  const { t } = useTranslation();

  const { companyId } = useParams();
  
  const { company } = useCompanyQuery(companyId);

  const companyKey = company?.key?.key ?? "";

  const handleCopyKey = async () => {
    if (!companyKey) {
      return;
    }

    await navigator.clipboard.writeText(companyKey);
  };

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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body1">
          {t("companies.details.fields.name")}: {company?.name ?? "-"}
        </Typography>

        <Typography variant="body1">
          {t("companies.details.fields.address")}: {company?.address ?? "-"}
        </Typography>

        <Typography variant="body1">
          {t("companies.details.fields.createdAt")}:{" "}
          {company?.createdAt ? formatDate(company.createdAt) : "-"}
        </Typography>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}
        >
          <Typography variant="body1">
            {t("companies.details.fields.key")}: {companyKey || "-"}
          </Typography>

          {companyKey && (
            <Button
              type="button"
              variant="outlined"
              size="small"
              startIcon={<ContentCopyRoundedIcon />}
              onClick={handleCopyKey}
            >
              {t("companies.details.copy")}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
