import React from "react";
import { useCustomContext } from "../Context";
import { BtnNextContainer, BtnPrevContainer } from "../styles/Calendar";

type MonthBtnProps = { dir: "next" | "prev" };

export const MonthBtn = React.memo(({ dir }: MonthBtnProps) => {
  const { dispatch } = useCustomContext();

  const next = () => dispatch({ type: "next_month" });
  const prev = () => dispatch({ type: "prev_month" });

  return dir === "next" ? (
    <BtnNextContainer onClick={next} />
  ) : (
    <BtnPrevContainer onClick={prev} />
  );
});
