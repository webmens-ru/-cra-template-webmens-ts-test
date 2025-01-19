import React from "react";
import { EmptyCell } from "../styles/formatters";
import { EmptyFormatterProps } from "../types";

export const EmptyFormatter = (_props: EmptyFormatterProps) => {
  return <EmptyCell children="Пусто" />
}
