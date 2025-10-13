import React from "react";
import Select, { IDataItem, SelectProps } from '../../../../select';
import { useCustomContext } from "../../../store/Context";
import { SelectContainer } from "../../../styles";
import { IField } from "../../../types";

export function SelectWrapper({ item, updateField, ...props }: IField) {
  const { dispatch } = useCustomContext();

  const updateValue = (options: IDataItem[]) => {
    const field = { ...item, value: options as unknown as any };
    
    dispatch({ type: "SET_FILTER_FIELD_VALUE", field });
    updateField(field, "valueWithRefetch");
  };

  return (
    <SelectContainer {...props}>
      <Select
        {...item.params}
        queryParams={{ ...(item.params as SelectProps).queryParams, ...item.queryParams }}
        value={item.value.filter(val => val)}
        onChange={updateValue}
      />
    </SelectContainer>
  );
}
