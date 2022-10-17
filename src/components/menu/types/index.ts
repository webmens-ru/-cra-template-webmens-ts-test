type TTabsMutation = (props: Item[]) => void;
type TSetTab = (props: Item) => void;

export interface IMenuProps {
  items?: Item[];
  setItem?: TSetTab;
  itemsMutation?: TTabsMutation;
  isEditable?: boolean;
  initialMenuId?: number;
}

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