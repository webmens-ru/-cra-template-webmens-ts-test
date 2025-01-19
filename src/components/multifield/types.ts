import { IInputProps, InputValue } from '../input/types';
import { SelectPropsValue, ISelectProps } from '../select/types';

export interface IMultifieldPropsGeneric {
  minLimit?: number;
  maxLimit?: number;
  fields?: MultifieldItemProps[];
  comboParams?: ISelectProps;
  addTitle?: string;
  onChange: (fields: MultifieldItem[]) => void;
}

export type IMultifieldProps = IMultifieldPropsGeneric & (
  | { type?: "input" | "combo", fieldParams?: IInputProps }
  | { type?: "select", fieldParams?: ISelectProps }
);

export type MultifieldTypes = "input" | "select" | "combo";

export type MultifieldItemProps = {
  value: MultifieldItemValue;
  order?: number;
} | string

export type MultifieldItem = {
  value: MultifieldItemValue;
  order: number;
  key: number;
}

export type MultifieldItemValue = InputValue | SelectPropsValue | MultifieldItemComboValue

export type MultifieldItemComboValue = {
  text: InputValue;
  type?: SelectPropsValue;
}

/* State */
export interface IMultifieldReducerProps {
  minLimit: number;
  maxLimit: number;
  fields: MultifieldItemProps[];
  comboParams?: ISelectProps;
  type: MultifieldTypes;
  onChange: (fields: MultifieldItem[]) => void;
}

export type IMultifieldReducerAction = 
  | { type: "ADD_FIELD" }
  | { type: "SET_VALUE", payload: {value: MultifieldItemValue, field: MultifieldItem} }
  | { type: "SET_COMBO_VALUE", payload: {value: InputValue|SelectPropsValue, field: MultifieldItem, type: 'input'|'select'} }
  | { type: "REMOVE_FIELD", payload: {field: MultifieldItem} }

export interface IMultifieldState {
  fields: MultifieldItem[];
  type: MultifieldTypes;
  comboParams?: ISelectProps;
  minLimit: number;
  maxLimit: number;
  keyCounter: number;
  onChange: (fields: MultifieldItem[]) => void;
}
