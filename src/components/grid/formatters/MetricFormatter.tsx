import React from "react";
import { MetricFormatterProps } from "../types";

export const MetricFormatter = ({ value }: MetricFormatterProps) => {
  return <span children={value.title} />
}
