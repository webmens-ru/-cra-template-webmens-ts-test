import React from "react";
import { DateFormatterProps } from "../types";
import { parseDate } from "../utils/parser";

export const DateFormatter = ({ value }: DateFormatterProps) => {
  const text = parseDate(value.title, value.format)
  return <span children={text} />
}
