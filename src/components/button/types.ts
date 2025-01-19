import { defaultThemes, svgBeforeList } from '.';

export type Palette = {
  static?: string;
  hover?: string;
  fontColor?: string;
  borderColor?: string;
};

export type Color = keyof typeof defaultThemes;
export type TriangleColor = 'white' | 'black';
export type Variant = 'default' | 'square' | 'dropdown' | 'circle';
export type Direction = 'left' | 'right';
export type SquareMode = 'mail' | 'phone' | 'chat' | 'reload';
type SvgBefore = keyof typeof svgBeforeList;
type Item = {
  label: string;
  borderTop?: boolean;
  borderBottom?: boolean;
  [key: string]: any;
};

export type ButtonProps = {
  color?: Color;
  variant?: Variant;
  children?: string;
  palette?: Palette;
  svgBefore?: SvgBefore;
  buttonProps?: any;
  items?: Item[];
  disabled?: boolean;
  itemsProps?: any;
  dropdownDirection?: Direction;
  dropdownWidth?: string;
  onClick?: VoidFunction;
};
