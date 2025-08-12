import type { BurgerItem, TRowItem } from "../../components/grid";
import type { PaginationProps } from "../../components/grid/components/pagination";
import type { IToolbarBlock } from "../../components/toolbar";

// TODO: Написать тип ошибки сабмита
export type ErrorResponse = any;

export interface GridDataResponse {
  header?: {
    blocks: IToolbarBlock[]
  };
  grid?: TRowItem[];
  footer?: TRowItem[];
  pagination?: PaginationProps;
  options?: {
    key: string;
    actionColumnName: string;
    actions: BurgerItem[]
  }
}
