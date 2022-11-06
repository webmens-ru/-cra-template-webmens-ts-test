import { Input, Select } from '@webmens-ru/ui_lib';
import { IDataItem } from '@webmens-ru/ui_lib/dist/components/select/types';
import { useState } from 'react';
import { useCustomContext } from '../../../store/Context';
import { SelectTextStyle } from '../../../styles';
import { IField } from '../../../types';
import { stringDropDownValues } from './const';

export default function SelectStringField({
  item,
  updateField,
  ...props
}: IField) {
  const { dispatch } = useCustomContext();
  const [selectValue, setSelectValue] = useState<IDataItem>(
    stringDropDownValues.find((val) => val.value === item.value[0]) ||
    stringDropDownValues[0]
  );

  const checkFirstValue = (value: string) => {
    dispatch({
      type: 'SET_FILTER_FIELD_VALUE',
      field: { ...item, value: [item.value[0], value, item.value[2]] },
    });
  };

  const changeAttr = (valuesItem: IDataItem[]) => {
    const field = { ...item, value: [`${valuesItem[0].value}`, item.value[1], item.value[2]] };
    dispatch({
      type: "SET_FILTER_FIELD_VALUE",
      field,
    });
    setSelectValue(valuesItem[0]);
    updateField(field, "value");
  };

  return (
    <SelectTextStyle {...props}>
      <Select
        filterable={false}
        value={selectValue}
        data={item?.options?.variants || stringDropDownValues}
        closeOnSelect={true}
        selectWidth="33%"
        onChange={changeAttr}
      />
      <Input
        width="67%"
        value={item.value[1]}
        onChange={checkFirstValue}
        onBlur={() => updateField(item, 'value')}
      />
    </SelectTextStyle>
  );
}
