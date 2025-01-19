import { IBadgeTypes } from "../badge";

export interface IToolbarProps {
  blocks?: IToolbarBlock[];
  onItemClick?: (item: BlockItems, block: IToolbarBlock) => void;
  onMetricFilterClick?: (item: IBlockItemMetricFilter, block: IToolbarBlock) => void;
  onMetricLinkClick?: (item: IBlockItemMetricLink, block: IToolbarBlock) => void;
}

export interface IToolbarBlock {
  order: number;
  title?: string;
  items: Array<BlockItems>;
}

export type BlockItemTypes = "metric-filter" | "metric-link" | "separator"
export type BlockItems = IBlockItemMetricFilter | IBlockItemMetricLink | IBlockItemSeparator

export interface IBlockItemGeneric {
  order: number;
  type: BlockItemTypes;
}

export interface IBlockItemMetricFilter extends IBlockItemGeneric {
  type: "metric-filter";
  title: string;
  value: string | number;
  params: {
    url: string;
    color?: IBadgeTypes;
    [key: string]: any;
  };
}

export interface IBlockItemMetricLink extends IBlockItemGeneric {
  type: "metric-link";
  title: string;
  value?: string | number;
  params: {
    type: string;
    title: string;
    path: string;
    mainDetailTitle?: string;
    entity: string;
    menuId: number;
    bx24_width: number;
    updateOnCloseSlider: boolean;
  }
}

export interface IBlockItemSeparator extends IBlockItemGeneric {
  type: "separator";
}

export interface IBlockItemPropsGeneric<T> {
  blockItem: T;
  key: React.Key;
  onClick: (blockItem: T) => void;
}
