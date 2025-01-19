import { IMenuProps, Item, SliderOpenner } from "../types";
import { MenuStyles } from './../types/index';

export type MenuState = {
  items: Item[];
  disabled: boolean;
  menuStyle: MenuStyles;
  currentItem: Item | undefined;
  isReadyForRender: boolean;
  countTopItems: number;
  isEditable: boolean;
  itemsMutation: (items: Item[]) => void
  sliderOpenner: SliderOpenner
};

export type Action =
  | { type: "set_items"; items: Item[] }
  | { type: "set_count_top_items"; count: number }
  | { type: "set_current_item"; item: Item }
  | { type: "set_disabled"; disabled: boolean };

export interface IContext {
  state: MenuState;
  dispatch: (act: Action) => void;
}

export interface IPropsContext extends IMenuProps {
  children: JSX.Element[];
}
