import React from "react";
import { BadgeContainer, BadgeCount } from "./styles";
import { IBadgeProps } from "./types";

export function Badge({
  type = "primary",
  count = ""
}: IBadgeProps) {

  return (
    <BadgeContainer type={type} >
      <BadgeCount children={count} />
    </BadgeContainer>
  )
}
