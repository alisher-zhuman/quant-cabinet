import { Link, useParams } from "react-router";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useRefreshCompanyToken } from "@features/companies";

import { useCompanyQuery } from "@entities/companies";

import { ROUTES } from "@shared/constants";
import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 2,
        maxWidth: 920,
      }}
    >
      <Button
        component={Link}
        to={`/${ROUTES.COMPANIES}`}
        variant="text"
        startIcon={<ArrowBackRoundedIcon />}
        sx={{ width: "fit-content", px: 1, alignSelf: "flex-start" }}
      >
        {t("companies.details.back")}
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Typography variant="h4" fontWeight={700}>
              {company?.name ?? "-"}
            </Typography>

            <Typography color="text.secondary">
              ID: {company?.id ?? companyId ?? "-"}
            </Typography>
          </Box>

          <Stack spacing={1.25}>
            <DetailRow
              label={t("companies.details.fields.name")}
              value={company?.name ?? "-"}
            />
            <DetailRow
              label={t("companies.details.fields.address")}
              value={company?.address ?? "-"}
            />
            <DetailRow
              label={t("companies.details.fields.createdAt")}
              value={company?.createdAt ? formatDate(company.createdAt) : "-"}
            />
          </Stack>

          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              p: 2,
              borderRadius: 2.5,
              backgroundColor: "background.default",
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="body1"
                sx={{
                  wordBreak: "break-all",
                  lineHeight: 1.65,
                }}
              >
                <Box
                  component="span"
                  sx={{ fontWeight: 700, color: "text.secondary" }}
                >
                  {t("companies.details.fields.key")}:
                </Box>{" "}
                <Box
                  component="span"
                  sx={{
                    fontFamily:
                      '"SFMono-Regular", "SFMono-Regular", Consolas, monospace',
                  }}
                >
                  {companyKey || "-"}
                </Box>
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                aria-label={t("companies.details.actions.refresh")}
                color="primary"
                disabled={refreshCompanyTokenMutation.isPending || !company?.id}
                onClick={handleRefreshKey}
                sx={{ backgroundColor: "background.paper" }}
              >
                <RefreshRoundedIcon />
              </IconButton>

              {companyKey && (
                <IconButton
                  aria-label={t("companies.details.actions.copy")}
                  color="primary"
                  onClick={handleCopyKey}
                  sx={{ backgroundColor: "background.paper" }}
                >
                  <ContentCopyRoundedIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
