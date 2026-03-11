import { Component, type ErrorInfo, type ReactNode } from "react";

import { ErrorFallbackScreen } from "../error-fallback-screen";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  componentStack?: string;
}

export class AppErrorBoundary extends Component<Props, State> {
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

    // Integration point: send render error data to Sentry or another monitoring service.
  }

  override render() {
    const { error, componentStack } = this.state;

    if (error) {
      return (
        <ErrorFallbackScreen
          error={error}
          {...(componentStack ? { componentStack } : {})}
        />
      );
    }

    return this.props.children;
  }
}
