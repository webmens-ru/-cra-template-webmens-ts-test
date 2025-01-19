type TTabsMutation = (props: Item[]) => void;
type TSetTab = (props: Item) => void;
export type SliderOpenner = (params: any) => void

export interface IMenuProps {
  items?: Item[];
  disabled?: boolean;
  menuStyle?: MenuStyles;
  setItem?: TSetTab;
  itemsMutation?: TTabsMutation;
  sliderOpenner?: SliderOpenner;
  isEditable?: boolean;
  showNativeSlider?: boolean;
  initialMenuId?: number;
}

export type MenuStyles = "main" | "card";

export type Item = {
  id: number;
  title: string;
  visible: boolean;
  order: number;
  menuId: number;
  type: string;
  params: {
    url: string;
    entity: string;
  };
  width?: number;
}

export interface IRenderParagraph {
  item: Item;
  setTab: (item: Item) => void
}

export interface ITopTabs {
  arr: Item[];
  isDraggable: boolean;
  currentId: number;
  setTab: TSetTab;
}

export interface IMenuTabs {
  abroadTabs: Item[];
  hiddenTabs: Item[];
  isDraggable: boolean;
  setTab: (item: Item) => void;
}