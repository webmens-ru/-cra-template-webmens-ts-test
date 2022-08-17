import React from "react";
import { GridLink } from "../styles/formatters";
import { LinkFormatterProps } from "../types";

export const LinkFormatter = ({ value, onCellClick }: LinkFormatterProps) => {  
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onCellClick(value)
  }

  return <GridLink href={value.url || value.link || "#"} children={value.title} onClick={handleLinkClick} />
}
