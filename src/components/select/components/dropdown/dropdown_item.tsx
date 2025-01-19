import React from "react";
import { IDataItem, IGroupDataItem } from "../../types";
import { DropdownGroupContainer, DropdownItemContainer, GroupTitle } from "./styles";

export interface DropdownItemProps<T> {
  option: T;
  multiple: boolean;
  checkIsSelected: (option: IDataItem) => boolean;
  onChange: (evt: React.MouseEvent, option: IDataItem) => void;
}

export const DropdownItem = ({ option, multiple, checkIsSelected, onChange }: DropdownItemProps<IDataItem>) => {
  return (
    <DropdownItemContainer
      key={option.value}
      className="dropdown-item"
      selected={multiple ? false : checkIsSelected(option)}
      onClick={(event) => onChange(event, option)}
    >
      {multiple && (
        <input
          type="checkbox"
          readOnly
          checked={checkIsSelected(option)}
        />
      )}
      {option.title}
    </DropdownItemContainer>
  )
}

export const GroupDropdownItem = ({ option, multiple, checkIsSelected, onChange }: DropdownItemProps<IGroupDataItem>) => {
  return (
    <DropdownGroupContainer>
      <GroupTitle children={option.title} />
      {option.options.map((item) => (
        <DropdownItem
          option={item}
          multiple={multiple}
          checkIsSelected={checkIsSelected}
          onChange={onChange}
        />
      ))}
    </DropdownGroupContainer>
  )
}