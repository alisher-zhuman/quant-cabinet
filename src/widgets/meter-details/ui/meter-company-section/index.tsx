import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { MeterDetails } from "@entities/meters";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

interface Props {
  t: TFunction;
  company: NonNullable<MeterDetails["company"]> | null;
  companyStatus: string;
}

export const MeterCompanySection = ({
  t,
  company,
  companyStatus,
}: Props) => {
  if (!company) {
    return null;
  }

  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2" color="text.secondary">
        {t("controllers.details.sections.company")}
      </Typography>

      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: (theme) => alpha(theme.palette.info.light, 0.08),
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
          label={t("controllers.details.fields.companyName")}
          value={company.name || "-"}
        />
        <DetailRow
          label={t("controllers.details.fields.companyStatus")}
          value={companyStatus}
        />
        {company.address && (
          <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
            <DetailRow
              label={t("controllers.details.fields.companyAddress")}
              value={company.address || "-"}
            />
          </Box>
        )}
        {company.createdAt && (
          <DetailRow
            label={t("controllers.details.fields.companyCreatedAt")}
            value={formatDate(company.createdAt)}
          />
        )}
        <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
          <DetailRow
            label={t("controllers.details.fields.companyId")}
            value={company.id || "-"}
          />
        </Box>
      </Box>
    </Stack>
  );
};
