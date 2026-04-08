import { Component, type ErrorInfo, type ReactNode } from "react";

import { ErrorFallback } from "@shared/ui/error-fallback";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  componentStack?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState(
      errorInfo.componentStack
        ? {
            error,
            componentStack: errorInfo.componentStack,
          }
        : { error },
    );
  }

  override render() {
    const { error, componentStack } = this.state;

    if (error) {
      return (
        <ErrorFallback
          error={error}
          {...(componentStack ? { componentStack } : {})}
        />
      );
    }

    return this.props.children;
  }
}
