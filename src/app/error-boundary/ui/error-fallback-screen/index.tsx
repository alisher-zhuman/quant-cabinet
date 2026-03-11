import { useTranslation } from "react-i18next";

import { ErrorFallback } from "@shared/ui/error-fallback";

interface Props {
  error: Error | null;
  componentStack?: string;
}

export const ErrorFallbackScreen = ({ error, componentStack }: Props) => {
  const { t } = useTranslation();

  return (
    <ErrorFallback
      title={t("errorBoundary.title")}
      description={t("errorBoundary.description")}
      reloadLabel={t("errorBoundary.actions.reload")}
      homeLabel={t("errorBoundary.actions.home")}
      homeHref="/"
      error={error}
      detailsTitle={t("errorBoundary.details.title")}
      errorMessageLabel={t("errorBoundary.details.errorMessage")}
      componentStackLabel={t("errorBoundary.details.componentStack")}
      showTechnicalDetails={import.meta.env.DEV}
      onReload={() => window.location.reload()}
      {...(componentStack ? { componentStack } : {})}
    />
  );
};
