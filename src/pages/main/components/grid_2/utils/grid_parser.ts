import { ACTION_COLUMN, SELECT_COLUMN } from '../consts';
import FooterFormatter from '../formatters/FooterFormatter';
import { TColumnItem, TRawColumnItem } from '../types/types';
import { TCellItem } from './../types/types';
import { getSuitableFormatter } from './formatter';

export const fromRawColumns = (schema: TRawColumnItem[], onCellClick: (cell: TCellItem) => void): TColumnItem[] => {
  const columns: TColumnItem[] = schema
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(column => ({
      key: column.code,
      name: column.title,
      width: column.width,
      formatter: getSuitableFormatter(column, onCellClick),
      summaryFormatter: FooterFormatter,
      instance: {...column},
      sortable: true,
      resizable: true,
    }))

  columns.unshift(SELECT_COLUMN, ACTION_COLUMN);

  return columns
}

export const toRawColumns = (columns: TColumnItem[]): TRawColumnItem[] => {
  const schema: TRawColumnItem[] = columns
    .filter(column => column.key !== "action")
    .map(column => column.instance)

  return schema
}

export const updateInstance = (columns: TColumnItem[]): TColumnItem[] => columns.map((column, index) => ({
  ...column,
  instance: {
    ...column.instance,
    order: index,
    width: parseInt(column.width as string)
  }
}))
