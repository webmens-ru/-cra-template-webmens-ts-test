import { Column } from 'react-data-grid';
import { PaginationProps } from '../components/pagination';
import { EditorTypes } from './editors';

export interface IGridProps {
  columns?: TRawColumnItem[];
  rows?: TRowItem[];
  footer?: unknown[];
  height?: number;
  burgerItems?: BurgerItem[];
  rowKey?: string;
  burgerKey?: string;
  isShowCheckboxes?: boolean;
  pagination?: PaginationProps;
  rowColorKey?: string;
  cellColorKey?: CellColorKey | CellColorKey[];
  columnMutation?: (arr: TRawColumnItem[]) => void;
  onRowMutation?: (row: TRowItem, key: string, value: any) => void;
  onBurgerItemClick?: (arg: BurgerItem, row: TRowItem) => void;
  onChangeCheckboxes?: (arr: TRowID[]) => void;
  onCellClick?: (cell: TCellItem) => void;
}

export type TColumnType = "string" | "number" | "date" | "metric" | "image" | "link"
export enum GridColor {
  "red" = "#ffa5a5",
  "light-red" = "#ffb9b9",
  "dark-red" = "#ff9191",

  "blue" = "#a5c8ff",
  "light-blue" = "#b9dcff",
  "dark-blue" = "#91b4ff",

  "green" = "#a5dca5",
  "light-green" = "#b9dcb9",
  "dark-green" = "#91dc91",

  "yellow" = "#ffffa5",
  "light-yellow" = "#ffffb9",
  "dark-yellow" = "#ffff91",

  "orange" = "#ffdca5",
  "light-orange" = "#ffdcb9",
  "dark-orange" = "#ffdc91",

  "grey" = "#a5a5a5",
  "light-grey" = "#b9b9b9",
  "dark-grey" = "#919191",

  "purple" = "#c8a5ff",
  "light-purple" = "#dcb9ff",
  "dark-purple" = "#b491ff",
}

export type TRawColumnItem = {
  id: number;
  code: string;
  type: TColumnType;
  title: string;
  visible: boolean;
  frozen?: boolean | null;
  resizeble?: boolean | null;
  reordering?: boolean | null;
  sortable?: boolean | null;
  editable?: boolean | null;
  color?: GridColor;
  info?: string;
  editor?: {
    type: EditorTypes,
    editorProps?: {
      name?: string
    }
  }
  order: number;
  width: number;
};

export interface TColumnItem extends Column<TRowItem, unknown> {
  instance: TRawColumnItem
}

export type TRowID = number | string;

export type TRowItem = {
  id: TRowID | { title: TRowID, [key: string]: any };
  [key: string]: any;
};

export type TCellItem = {
  [key: string]: any
}

export interface CellColorKey {
  column: string;
  key: string;
}

interface BurgetItemGeneric {
  id: string;
  title: string;
  handler: string;
}

export type BurgerItem = BurgerOpenApplication | BurgerOpenPath | BurgerOpenApplicationPortal | BurgerTrigger

interface BurgerOpenApplication extends BurgetItemGeneric {
  type: "openApplication";
  params: {
    path: string;
    width: number;
    updateOnCloseSlider: boolean;
    params: any;
  }
  iframeUrl?: string;
}

interface BurgerOpenPath extends BurgetItemGeneric {
  type: "openPath";
  params: {
    updateOnCloseSlider: boolean;
  }
}

interface BurgerOpenApplicationPortal extends BurgetItemGeneric {
  type: "openApplicationPortal";
  params: {
    handler: string;
    updateOnCloseSlider: boolean;
  }
}

interface BurgerTrigger extends BurgetItemGeneric {
  type: "trigger";
  params: {
    updateOnCloseSlider: boolean;
    popup: any;
    output: any;
    [key: string]: any;
  }
}
