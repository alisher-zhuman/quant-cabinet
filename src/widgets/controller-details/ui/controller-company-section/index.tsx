import type { TFunction } from "i18next";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import type { ControllerRow } from "@entities/controllers";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

interface Props {
  t: TFunction;
  controller: NonNullable<ControllerRow["company"]>;
  companyStatus: string;
}

export const ControllerCompanySection = ({
  t,
  controller,
  companyStatus,
}: Props) => (
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
        value={controller.name ?? "-"}
      />
      <DetailRow
        label={t("controllers.details.fields.companyStatus")}
        value={companyStatus}
      />
      <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
        <DetailRow
          label={t("controllers.details.fields.companyAddress")}
          value={controller.address || "-"}
        />
      </Box>
      <DetailRow
        label={t("controllers.details.fields.companyCreatedAt")}
        value={controller.createdAt ? formatDate(controller.createdAt) : "-"}
      />
      <DetailRow
        label={t("controllers.details.fields.companyUpdatedAt")}
        value={controller.updatedAt ? formatDate(controller.updatedAt) : "-"}
      />
      <Box sx={{ gridColumn: { xs: "auto", lg: "1 / -1" } }}>
        <DetailRow
          label={t("controllers.details.fields.companyId")}
          value={controller.id ?? "-"}
        />
      </Box>
    </Box>
  </Stack>
);
