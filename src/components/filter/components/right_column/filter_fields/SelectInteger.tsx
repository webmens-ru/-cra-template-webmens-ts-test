import React, { useState } from 'react';
import Select, { IDataItem } from '../../../../select';
import { useCustomContext } from '../../../store/Context';
import { SelectTextStyle } from '../../../styles';
import { IField } from '../../../types';
import Input from '../../../../input';
import { useTranslation } from 'react-i18next';

export default function SelectIntegerField({
  item,
  updateField,
  ...props
}: IField) {
  const { dispatch } = useCustomContext();
  const { t } = useTranslation();

  const localizedIntegerDropDownValues = [
    {
      title: t('filter.not_used'),
      value: 'isNotUsed',
    },
    {
      title: t('filter.not_filled'),
      value: 'isNull',
    },
    {
      title: t('filter.filled'),
      value: 'isNotNull',
    },
    {
      title: t('filter.exactly'),
      value: '=',
    },
    {
      title: t('filter.not_equal'),
      value: '<>',
    },
    {
      title: t('filter.range'),
      value: 'range',
    },
    {
      title: t('filter.greater_than'),
      value: '>',
    },
    {
      title: t('filter.less_than'),
      value: '<',
    },
    {
      title: t('filter.greater_than_or_equal'),
      value: '>=',
    },
    {
      title: t('filter.less_than_or_equal'),
      value: '<=',
    },
  ];

  const [selectValue, setSelectValue] = useState<IDataItem>(
      localizedIntegerDropDownValues.find((val) => val.value === item.value[0]) ||
      localizedIntegerDropDownValues[0]
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
      data={item?.options?.variants || localizedIntegerDropDownValues}
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
        data={item?.options?.variants || localizedIntegerDropDownValues}
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
        data={item?.options?.variants || localizedIntegerDropDownValues}
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
        data={item?.options?.variants || localizedIntegerDropDownValues}
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
