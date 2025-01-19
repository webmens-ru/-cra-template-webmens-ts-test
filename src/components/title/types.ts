import { defaultConfig } from ".";

export interface ITitleProps {
  label: string;
  childrenBefore?: string | JSX.Element | JSX.Element[];
  childrenAfter?: string | JSX.Element | JSX.Element[];
  variant?: Variant
  customConfig?: Config
}

export type Variant = keyof typeof defaultConfig
export type Config = {
  fontSize: string | number,
  fontWeight: string | number,
}

export type TextProps = {
  config: Config
}