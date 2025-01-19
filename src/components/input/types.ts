import { IconName } from "../icon/types";

export interface IInputProps {
  value?: InputValue;
  placeholder?: string;
  readonly?: boolean;
  iconPosition?: "none"|"left"|"right"|"both";
  iconLeftName?: IconName;
  iconRightName?: IconName;
  width?: string;
  nativeInputProps?: React.InputHTMLAttributes<HTMLInputElement>
  onChange?: (value: string) => string | void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export type InputValue = string|number
