import React from "react";
import Badge, { IBadgeTypes } from "../../../badge";
import { MetricFilterContainer } from "../../styles";
import { IBlockItemMetricFilter, IBlockItemPropsGeneric } from "../../types";

interface IMetricFilterProps extends IBlockItemPropsGeneric<IBlockItemMetricFilter> {
  color?: IBadgeTypes
}

export function MetricFilter({ blockItem, onClick, key }: IMetricFilterProps) {
  return (
    <MetricFilterContainer key={key} title={blockItem.title} onClick={() => onClick(blockItem)} >
      <Badge count={blockItem.value} type={blockItem.params.color} />
      <span>{blockItem.title}</span>
    </MetricFilterContainer>
  )
}
