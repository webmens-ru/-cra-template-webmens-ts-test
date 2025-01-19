import Icons from "../icons";

export interface IIconProps {
  iconWidth?: string;
  iconName: keyof typeof Icons;
  onClick?: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export type IconName = keyof typeof Icons