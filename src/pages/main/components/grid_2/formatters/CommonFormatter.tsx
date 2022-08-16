import React from "react";
import { FormatterErrorBoundary } from "../components/FormatterErrorBoundary";
import { CommonCell } from "../styles/formatters";
import { CommonFormatterProps } from "../types";

export const CommonFormatter = ({ value, rowKey }: CommonFormatterProps) => {
  return (
    <FormatterErrorBoundary>
      <CommonCell children={value} />
    </FormatterErrorBoundary>
  )
}
