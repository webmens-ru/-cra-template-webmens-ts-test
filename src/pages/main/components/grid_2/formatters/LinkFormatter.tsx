import React from "react";
import { LinkFormatterProps } from "../types";

export const LinkFormatter = ({ value, onCellClick }: LinkFormatterProps) => {  
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onCellClick(value)
  }

  return <a href={value.url || value.link || "#"} children={value.title} onClick={handleLinkClick} />
}
