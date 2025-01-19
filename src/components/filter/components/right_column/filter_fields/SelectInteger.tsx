import React, { useState } from 'react';
import Select, { IDataItem } from '../../../../select';
import { useCustomContext } from '../../../store/Context';
import { SelectTextStyle } from '../../../styles';
import { IField } from '../../../types';
import { integerDropDownValues } from './const';
import Input from '../../../../input';

export default function SelectIntegerField({
  item,
  updateField,
  ...props
}: IField) {
  const { dispatch } = useCustomContext();

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

  let field;

  if (selectValue.value === 'isNotUsed' || selectValue.value === 'isNull' || selectValue.value === 'isNotNull') {
    field = <Select
      filterable={false}
      value={selectValue}
      data={item?.options?.variants || integerDropDownValues}
      closeOnSelect={true}
      selectWidth="100%"
      onChange={changeAttr}
    />
  } else if (selectValue.value === 'range') {
    field = 
    <>
      <Select
        filterable={false}
        value={selectValue}
        data={item?.options?.variants || integerDropDownValues}
        closeOnSelect={true}
        selectWidth="33%"
        onChange={changeAttr}
      />
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
  } else {
    field = <>
      <Select
        filterable={false}
        value={selectValue}
        data={item?.options?.variants || integerDropDownValues}
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
    </>
  }


  return (
    <SelectTextStyle {...props}>
      {field}
      {/* {<Select
        filterable={false}
        value={selectValue}
        data={item?.options?.variants || integerDropDownValues}
        closeOnSelect={true}
        selectWidth="33%"
        onChange={changeAttr}
      />
      {selectValue.title === 'range' ? (
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
      )} */}
    </SelectTextStyle>
  );
}
