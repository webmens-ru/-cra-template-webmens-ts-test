import React, { useEffect, useState } from 'react';
import { BodyPortal } from '../../../body_portal';
import { DropdownMessage } from '../../styles';
import { DropdownPosition, IDataItem, IDropdownProps, IGroupDataItem } from '../../types';
import LoadingSelect from '../loading_select';
import { DropdownItem, DropdownItemProps, GroupDropdownItem } from './dropdown_item';
import { SelectDropdownContainer } from './styles';

const SelectDropdown = React.forwardRef<HTMLDivElement, IDropdownProps>(({
  multiple = false,
  isShowLettersCount,
  lettersRemaining,
  isNoData,
  canSelectMore,
  isLoading,
  selectedOptions = [],
  data = [],
  position,
  onChange = () => { },
}, dropdownRef) => {
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({ left: 0, width: 0 })

  const getIsOptionSelected = (option: IDataItem) => {
    return selectedOptions.some((item) => item.value === option.value);
  };

  const handleSelectChange = (evt: React.MouseEvent, option: IDataItem) => {
    evt.preventDefault();
    onChange(option);
  };

  useEffect(() => {
    if (!dropdownRef || !("current" in dropdownRef) || !position) return

    const dropdownHeight = dropdownRef?.current?.clientHeight || 200

    const { left, top, bottom, width, height } = position
    const pxToBottom = window.innerHeight - top - height

    if (pxToBottom <= dropdownHeight && top <= dropdownHeight) {
      const positionKey = pxToBottom < top ? "top" : "bottom"
      setDropdownPosition({ width, left, [positionKey]: bottom + 10 })
    } else if (pxToBottom >= dropdownHeight) {
      setDropdownPosition({ width, left, top: bottom + 10 })
    } else if (top >= dropdownHeight) {
      setDropdownPosition({ width, left, top: "auto", bottom: pxToBottom + height + 10 })
    }
  }, [data.length, dropdownRef, position])

  return (
    <BodyPortal container="wm-select-dropdown">
      <SelectDropdownContainer ref={dropdownRef} style={{ position: "absolute", ...dropdownPosition }}>
        {isShowLettersCount && (
          <DropdownMessage>
            Введите ещё {lettersRemaining} символов, чтобы отобразить результат поиска
          </DropdownMessage>
        )}
        {isNoData && <DropdownMessage>Нет данных</DropdownMessage>}
        {!canSelectMore && <DropdownMessage>Достигнут предел выбранных записей</DropdownMessage>}
        {isLoading && <LoadingSelect />}

        {(!isLoading && canSelectMore) &&
          data.map((option, index) => {
            const props: DropdownItemProps<IDataItem | IGroupDataItem> = {
              option: option,
              multiple: multiple,
              checkIsSelected: getIsOptionSelected,
              onChange: handleSelectChange,
            }

            if ('title' in option && 'options' in option) {
              return (
                // @ts-ignore
                <GroupDropdownItem {...props} key={index} />
              )
            } else {
              return (
                // @ts-ignore
                <DropdownItem {...props} key={option.value} />
              )
            }
          })}
      </SelectDropdownContainer>
    </BodyPortal>

  );
})

export default SelectDropdown;
