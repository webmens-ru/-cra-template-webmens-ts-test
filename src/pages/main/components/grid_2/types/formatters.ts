import { FormatterProps } from "react-data-grid";
import { BurgerItem, TCellItem, TRowItem } from "./types";

export interface IFormatterProps<T> extends FormatterProps<TRowItem, unknown> {
  row: TRowItem;
  rowKey: string;
  value: T;
  onCellClick: (cell: TCellItem) => void;
}

export type ICommonFormatterValue = string | number;
export type IEmptyFormatterValue = null | undefined;
export interface IImageFormatterValue {
  url: string
}
export interface ILinkFormatterValue {
  id: number;
  title: string | number;
  type: "openApplication" | "openLink" | "openPath";
  route: string;
  url?: string;
  link?: string;
}
export interface IDateFormatterValue {
  format: string;
  title: string;
}

export type CommonFormatterProps = IFormatterProps<ICommonFormatterValue>
export type DateFormatterProps = IFormatterProps<IDateFormatterValue>
export type ImageFormatterProps = IFormatterProps<IImageFormatterValue>
export type LinkFormatterProps = IFormatterProps<ILinkFormatterValue>
export type EmptyFormatterProps = IFormatterProps<IEmptyFormatterValue>
export type ActionFormatterProps = IFormatterProps<BurgerItem>
export type ErrorFormatterProps = Partial<IFormatterProps<any>>

export interface IFormattersCollection {
  string: (props: CommonFormatterProps) => JSX.Element;
  number: (props: CommonFormatterProps) => JSX.Element;
  date: (props: DateFormatterProps) => JSX.Element;
  image: (props: ImageFormatterProps) => JSX.Element;
  link: (props: LinkFormatterProps) => JSX.Element;
  empty: (props: EmptyFormatterProps) => JSX.Element
}
