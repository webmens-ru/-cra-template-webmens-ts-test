import { IMenuProps, MenuItem, SliderOpenner } from "../types";
import { MenuStyles } from './../types/index';

export type MenuState = {
  items: MenuItem[];
  disabled: boolean;
  menuStyle: MenuStyles;
  currentItem: MenuItem | undefined;
  isReadyForRender: boolean;
  countTopItems: number;
  isEditable: boolean;
  itemsMutation: (items: MenuItem[]) => void
  sliderOpenner: SliderOpenner
};

export type Action =
  | { type: "set_items"; items: MenuItem[] }
  | { type: "set_count_top_items"; count: number }
  | { type: "set_current_item"; item: MenuItem }
  | { type: "set_disabled"; disabled: boolean };

export interface IContext {
  state: MenuState;
  dispatch: (act: Action) => void;
}

export interface IPropsContext extends IMenuProps {
  children: JSX.Element[];
}
