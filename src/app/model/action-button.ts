import { PopupActionProps } from "../../components/PopupAction";

export interface ActionButton {
  label: string;
  handler: string;
  params: ActionButtonParams;
}

export interface ActionButtonParams {
  updateOnCloseSlider?: boolean;
  popup?: PopupActionProps;
  output?: {
    documentName: string;
  }
}
