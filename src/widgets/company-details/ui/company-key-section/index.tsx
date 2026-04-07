import type { TFunction } from "i18next";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import type { CompanyDetails } from "@entities/companies";

import { formatDate } from "@shared/helpers";
import { DetailRow } from "@shared/ui/detail-row";

interface Props {
  t: TFunction;
  company: CompanyDetails | null;
  companyKey: string;
  isRefreshPending: boolean;
  onRefresh: () => void;
  onCopy: () => void;
}

export const CompanyKeySection = ({
  t,
  company,
  companyKey,
  isRefreshPending,
  onRefresh,
  onCopy,
}: Props) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 2.5, sm: 3 },
      borderRadius: 3,
      border: "1px solid",
      borderColor: "divider",
    }}
  >
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

        {company?.key && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                lg: "repeat(2, minmax(0, 1fr))",
              },
              gap: 1.25,
              mt: 1.25,
            }}
          >
            <DetailRow
              label={t("companies.details.fields.keyCreatedAt")}
              value={formatDate(company.key.createdAt)}
            />
            <DetailRow
              label={t("companies.details.fields.keyUpdatedAt")}
              value={formatDate(company.key.updatedAt)}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          aria-label={t("companies.details.actions.refresh")}
          color="primary"
          disabled={isRefreshPending || !company?.id}
          onClick={onRefresh}
          sx={{ backgroundColor: "background.paper" }}
        >
          <RefreshRoundedIcon />
        </IconButton>

        {companyKey && (
          <IconButton
            aria-label={t("companies.details.actions.copy")}
            color="primary"
            onClick={onCopy}
            sx={{ backgroundColor: "background.paper" }}
          >
            <ContentCopyRoundedIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  </Paper>
);
