"use client";

import { Component, ErrorInfo, ReactNode } from "react";

import LandingLayout from "@/layouts/LandingLayout";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <LandingLayout>
          <div className="fixed inset-0 flex items-center justify-center">
            Sorry... there was an error
          </div>
        </LandingLayout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
