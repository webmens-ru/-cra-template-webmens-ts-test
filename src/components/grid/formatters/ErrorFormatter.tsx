import React from "react";
import { ErrorFormatterProps } from "../types";

export const ErrorFormatter = (_props: ErrorFormatterProps) => {
  return <b style={{color: "red"}}>Column type error!</b>
}
