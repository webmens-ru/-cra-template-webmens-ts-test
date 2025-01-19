import React from "react";
import { LoadingSelectContainer, LoadingSelectRing } from "./styles";

export default function LoadingSelect() {
  return (
    <LoadingSelectContainer>
      <LoadingSelectRing>
        <div></div>
        <div></div>
        <div></div>
      </LoadingSelectRing>
    </LoadingSelectContainer>
  );
}