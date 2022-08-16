import React from "react";
import { EmptyCell } from "../styles/formatters";
import { EmptyFormatterProps } from "../types";

export const EmptyFormatter = ({ value }: EmptyFormatterProps) => {
  return <EmptyCell children="Пусто" />
}
