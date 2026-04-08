import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { CompanyDetails } from "@entities/companies";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

interface Props {
  t: TFunction;
  company: CompanyDetails | null;
  companyId?: string;
}

export const CompanyInfoSection = ({ t, company, companyId }: Props) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2.5, sm: 3 },
      borderRadius: 4,
      border: "1px solid",
      borderColor: "divider",
      background: (theme) =>
        `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.success.light, 0.06)} 100%)`,
      boxShadow: (theme) => `0 18px 40px ${alpha(theme.palette.common.black, 0.05)}`,
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", lg: "flex-end" },
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.03em" }}>
            {company?.name ?? "-"}
          </Typography>

          <Typography color="text.secondary">
            ID: {company?.id ?? companyId ?? "-"}
          </Typography>
        </Box>

        <Chip
          size="small"
          label={
            company
              ? t(
                  company.isArchived
                    ? "companies.details.values.archived"
                    : "companies.details.values.active",
                )
              : "-"
          }
          sx={{
            borderRadius: 999,
            backgroundColor: (theme) => alpha(theme.palette.success.main, 0.12),
          }}
        />
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.88),
          border: "1px solid",
          borderColor: "divider",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
          },
          gap: 1.25,
        }}
      >
        <DetailRow
          label={t("companies.details.fields.name")}
          value={company?.name ?? "-"}
        />
        <DetailRow
          label={t("companies.details.fields.isArchived")}
          value={
            company
              ? t(
                  company.isArchived
                    ? "companies.details.values.archived"
                    : "companies.details.values.active",
                )
              : "-"
          }
        />
        <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
          <DetailRow
            label={t("companies.details.fields.address")}
            value={company?.address ?? "-"}
          />
        </Box>
        <DetailRow
          label={t("companies.details.fields.createdAt")}
          value={company?.createdAt ? formatDate(company.createdAt) : "-"}
        />
        <DetailRow
          label={t("companies.details.fields.updatedAt")}
          value={company?.updatedAt ? formatDate(company.updatedAt) : "-"}
        />
        <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
          <DetailRow
            label={t("companies.details.fields.id")}
            value={company?.id ?? companyId ?? "-"}
          />
        </Box>
      </Box>
    </Box>
  </Paper>
);
