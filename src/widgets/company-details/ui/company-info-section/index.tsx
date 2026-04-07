import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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

      <Box
        sx={{
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
