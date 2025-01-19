import React from "react";
import { IIconProps } from "./types";
import { IconContainer } from "./styles";

export const Icon = ({ iconWidth = "32px", iconName, onClick = () => {} }: IIconProps) => {
  if(iconName === "none") return null
  return (
    <IconContainer iconWidth={iconWidth} iconName={iconName} onClick={onClick} >
      <i className="wm-icon"></i>
    </IconContainer>
  )
}
