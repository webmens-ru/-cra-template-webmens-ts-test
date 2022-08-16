import { FormatterProps } from "react-data-grid";
import { FORMATTERS } from "../consts";
import { TRawColumnItem, TRowItem } from "../types";
import { TCellItem } from './../types/types';

export const getSuitableFormatter = (column: TRawColumnItem, onCellClick: (cell: TCellItem) => void) => {
  const formatter = FORMATTERS[column.type] || FORMATTERS.string

  return (props: FormatterProps<TRowItem, unknown>) => {
    const value = props.row[column.code]
    const formatterProps = { ...props, rowKey: column.code, value, onCellClick }
    return !value ? FORMATTERS.empty(formatterProps) : formatter(formatterProps)
  }
}
