import { Link, useParams } from "react-router";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { useRefreshCompanyToken } from "@features/companies";

import { useCompanyQuery } from "@entities/companies";

import { ROUTES } from "@shared/constants";
import { formatDate } from "@shared/helpers";

export const CompanyDetailsWidget = () => {
  const { t } = useTranslation();

  const { companyId } = useParams();
  const { company } = useCompanyQuery(companyId);
  const refreshCompanyTokenMutation = useRefreshCompanyToken(company?.id);

  const companyKey = company?.key?.key ?? "";

  const handleCopyKey = async () => {
    if (!companyKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(companyKey);
      toast.success(t("companies.details.toast.copySuccess"));
    } catch {
      toast.error(t("companies.details.toast.copyError"));
    }
  };

  const handleRefreshKey = () => {
    if (!company?.id) {
      return;
    }

    refreshCompanyTokenMutation.mutate({ companyId: company.id });
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

          <IconButton
            aria-label={t("companies.details.actions.refresh")}
            color="primary"
            disabled={refreshCompanyTokenMutation.isPending || !company?.id}
            onClick={handleRefreshKey}
          >
            <RefreshRoundedIcon />
          </IconButton>

          {companyKey && (
            <IconButton
              aria-label={t("companies.details.actions.copy")}
              color="primary"
              onClick={handleCopyKey}
            >
              <ContentCopyRoundedIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};
