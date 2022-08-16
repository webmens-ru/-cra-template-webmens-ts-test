import { Column } from 'react-data-grid';

export interface IGridProps {
  columns?: TRawColumnItem[];
  rows?: TRowItem[];
  footer?: TRowItem[];
  height?: number;
  minHeight?: string;
  burgerItems?: BurgerItem[];
  isShowCheckboxes?: boolean;
  columnMutation?: (arr: TRawColumnItem[]) => void;
  onBurgerItemClick?: (arg: BurgerItem, row?: TRowItem) => void;
  onChangeCheckboxes?: (arr: TRowID[]) => void;
  onCellClick?: (cell: TRowItem) => void;
}

export type TColumnType = "string" | "number" | "date" | "image" | "link"

export type TRawColumnItem = {
  id: number;
  code: string;
  type: TColumnType;
  title: string;
  visible: number;
  order: number;
  width: number;
};

export interface TColumnItem extends Column<TRowItem, unknown> {
  instance: TRawColumnItem
}

export type TRowID = number | string;

export type TRowItem = {
  id: TRowID | {title: TRowID, [key: string]: any};
  [key: string]: any;
};

export type BurgerItem = { label: string; [key: string]: any };
