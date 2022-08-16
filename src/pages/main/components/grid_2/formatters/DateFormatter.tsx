import React from "react";
import { DateFormatterProps } from "../types";

export const DateFormatter = ({ value }: DateFormatterProps) => {
  const text = new Date(value.title).toLocaleString()
  return <span children={text} />
}
