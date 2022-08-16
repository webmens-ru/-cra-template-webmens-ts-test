import { FormatterProps } from "react-data-grid";
import { FORMATTERS } from "../consts";
import { TRawColumnItem, TRowItem } from "../types";

export const getSuitableFormatter = (column: TRawColumnItem) => {
  const formatter = FORMATTERS[column.type]

  return (props: FormatterProps<TRowItem, unknown>) => {
    const value = props.row[column.code]
    const formatterParams = { ...props, rowKey: column.code, value }
    return !value ? FORMATTERS.empty(formatterParams) : formatter(formatterParams)
  }
}
