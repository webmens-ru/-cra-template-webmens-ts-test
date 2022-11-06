import { Input, Select } from '@webmens-ru/ui_lib';
import { IDataItem } from '@webmens-ru/ui_lib/dist/components/select/types';
import { useState } from 'react';
import { useFieldsDraggable } from '../../../hooks/useFieldsDraggble';
import { useCustomContext } from '../../../store/Context';
import { SelectTextStyle } from '../../../styles';
import { IField } from '../../../types';
import { integerDropDownValues } from './const';

export default function SelectIntegerField({
  item,
  updateField,
  ...props
}: IField) {
  const { dispatch } = useCustomContext();
  const { draggable, events } = useFieldsDraggable();

  const [selectValue, setSelectValue] = useState<IDataItem>(
    integerDropDownValues.find((val) => val.value === item.value[0]) ||
    integerDropDownValues[0]
  );

  const checkFirstValue = (value: string) => {
    if (value.match(/^\d*$/)) {
      dispatch({ type: 'SET_FILTER_FIELD_VALUE', field: { ...item, value: [item.value[0], value, item.value[2]] } });
    }
  };

  const checkSecondValue = (value: string) => {
    if (value.match(/^\d*$/)) {
      dispatch({ type: 'SET_FILTER_FIELD_VALUE', field: { ...item, value: [item.value[0], item.value[1], value] } });
    }
  };

  const changeAttr = (valuesItem: IDataItem[]) => {
    const field = { ...item, value: [`${valuesItem[0].value}`, item.value[1], item.value[2]] };
    dispatch({ type: "SET_FILTER_FIELD_VALUE", field, });
    setSelectValue(valuesItem[0]);
    updateField(field, "value");
  };

  return (
    <SelectTextStyle draggable={draggable} {...props}>
      <Select
        filterable={false}
        value={selectValue}
        data={item?.options?.variants || integerDropDownValues}
        closeOnSelect={true}
        selectWidth="33%"
        onChange={changeAttr}
      />
      {selectValue.title === 'Диапазон' ? (
        <>
          <Input
            width="33%"
            value={item.value[1]}
            onChange={checkFirstValue}
            onBlur={() => updateField(item, 'value')}
          />
          <Input
            width="33%"
            value={item.value[2]}
            onChange={checkSecondValue}
            onBlur={() => updateField(item, 'value')}
          />
        </>
      ) : (
        <Input
          width="67%"
          value={item.value[1]}
          onChange={checkFirstValue}
          onBlur={() => updateField(item, 'value')}
        />
      )}
    </SelectTextStyle>
  );
}
