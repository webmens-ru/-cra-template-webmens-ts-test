import React from "react";
import { Icon } from "@webmens-ru/ui_lib";

interface SettingsCellHeaderProps {
  onClick?: () => void
}

export default function SettingsCellHeader({ onClick = () => {} }: SettingsCellHeaderProps) {
  return (
    <Icon iconName="settingBack" iconWidth="22px" onClick={onClick} />
  )
}
