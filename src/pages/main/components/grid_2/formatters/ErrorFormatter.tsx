import React from "react";
import { ErrorFormatterProps } from "../types";

export const ErrorFormatter = (props: ErrorFormatterProps) => {
  return <b style={{color: "red"}}>Column type error!</b>
}
