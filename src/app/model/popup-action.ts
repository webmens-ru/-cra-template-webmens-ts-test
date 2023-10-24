import { TRowItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { PopupActionProps } from "../../components/PopupAction";

export interface PopupAction {
  handler: string;
  params: PopupActionParams;
  grid?: TRowItem[];
}

export interface PopupActionParams {
  output?: PopupActionParamsOutput;
  popup?: PopupActionProps;
  columns?: string[];
  updateOnCloseSlider?: boolean
  allowActionIsSelectedEmpty?: boolean
}

export interface PopupActionParamsOutput {
  action?: "download" | "print";
  type?: string;
  documentName?: string
}
