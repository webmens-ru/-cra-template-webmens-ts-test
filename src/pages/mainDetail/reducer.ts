import { TColumnItem, TRowID } from "@webmens-ru/ui_lib/dist/components/grid";
import { IGridState } from "../main/mainSlice";

export interface IMainDetailReducerState {
  grid: IGridState;
  schema: TColumnItem[];
  checkboxes: TRowID[];
  inited: boolean;
}

export type IMainDetailReducerAction =
  | { type: "SET_GRID", grid: IGridState }
  | { type: "SET_SCHEMA", schema: TColumnItem[] }
  | { type: "SET_CHECKBOXES", checkboxes: TRowID[] }
  | { type: "INIT", payload: { grid: IGridState, schema: TColumnItem[] } }

export const initialState: IMainDetailReducerState = {
  grid: {},
  schema: [],
  checkboxes: [],
  inited: false
}

export const reducer = (
  state: IMainDetailReducerState = initialState,
  action: IMainDetailReducerAction
): IMainDetailReducerState => {
  switch (action.type) {
    case "SET_GRID":
      return { ...state, grid: action.grid }
    case "SET_SCHEMA":
      return { ...state, schema: action.schema }
    case "SET_CHECKBOXES":
      return { ...state, checkboxes: action.checkboxes }
    case "INIT":
      return { ...state, ...action.payload, inited: true }
    default: return state
  }
}
