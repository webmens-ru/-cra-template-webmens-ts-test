import React from "react";
import { Column } from "react-data-grid";
import { TRowItem } from "../types";

interface IFooterFormatterProps {
  column?: Column<TRowItem>;
  row?: unknown;
}

export default function FooterFormatter({ column, row }: IFooterFormatterProps) {
  if (!row || !column) return <></>

  const value = (row as TRowItem)[column?.key]
  
  return value
}
