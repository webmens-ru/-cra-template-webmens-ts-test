import React from "react";
import { LinkFormatterProps } from "../types";

export const LinkFormatter = ({ value }: LinkFormatterProps) => {  
  return <a href={value.url} children={value.title} />
}
