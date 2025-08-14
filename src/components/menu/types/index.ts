type TTabsMutation = (props: MenuItem[]) => void;
type TSetTab = (props: MenuItem) => void;
export type SliderOpenner = (params: any) => void

export interface IMenuProps {
  items?: MenuItem[];
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

export type MenuItem = {
  id: number;
  title: string;
  visible: boolean;
  order: number;
  menuId: number;
  type: string;
  params: {
    url: string;
    entity: string;
    viewMode?: 'grid' | 'resource-timeline';
  };
  width?: number;
}

export interface IRenderParagraph {
  item: MenuItem;
  setTab: (item: MenuItem) => void
}

export interface ITopTabs {
  arr: MenuItem[];
  isDraggable: boolean;
  currentId: number;
  setTab: TSetTab;
}

export interface IMenuTabs {
  abroadTabs: MenuItem[];
  hiddenTabs: MenuItem[];
  isDraggable: boolean;
  setTab: (item: MenuItem) => void;
}