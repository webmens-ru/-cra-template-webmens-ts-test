import React from "react";
import { ErrorFormatter } from "../formatters/ErrorFormatter";

export class FormatterErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFormatter />
    }

    // @ts-ignore
    return this.props.children
  }
}
