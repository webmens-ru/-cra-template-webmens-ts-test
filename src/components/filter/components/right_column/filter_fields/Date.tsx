import React, { useCallback, useMemo, useState } from 'react'; // Добавлен useEffect
import { DatePicker } from '../../../../date_picker';
import Select, { IDataItem } from '../../../../select';
import { useCustomContext } from '../../../store/Context';
import { DateFieldContainer, DateInput } from '../../../styles';
import { IField, IThreeField, ITwoField } from '../../../types';
import { dateDropDown, getYearsDropDown, monthsDropDown, quartersDropDown } from './const';

export default function DateField({ item, updateField }: IField) {
  const { dispatch } = useCustomContext();
  const variantList: IDataItem[] = item?.options?.variants || dateDropDown;

  const [dropDownValue, setDropDownValue] = useState<IDataItem>(() => {
    const defaultValue = variantList.find((dateItem) => dateItem.value === item.value[0]) || variantList[0];
    
    if (defaultValue?.value) {
      dispatch({
        type: 'SET_FILTER_FIELD_VALUE',
        field: {
          ...item,
          value: [defaultValue.value.toString(), '', '']
        }
      });
    }
    
    return defaultValue
  });

  const updateValue = useCallback((value: string[]) => {
    const field = { ...item, value };
    dispatch({ type: 'SET_FILTER_FIELD_VALUE', field });
    updateField(field, 'value');
  }, [dispatch, item, updateField]);

  const setDDV = useCallback((value: IDataItem[]) => {
    const date = new Date()
    const year = date.getFullYear().toString()

    const resultValue = function () {
      switch (value[0].value) {
        case "month":
          return [value[0].value, (date.getMonth() + 1).toString(), year]
        case "quarter":
          return [value[0].value, "1", year, ""]
        case "year":
          return [value[0].value, year, ""]
        default:
          return [value[0].value.toString(), "", ""]
      }
    }()

    setDropDownValue(value[0]);
    updateValue(resultValue);
  }, [updateValue]);

  const currentComponent = useMemo(() => {
    switch (dropDownValue.value) {
      case 'lastNDays':
      case 'nextNDays':
      case 'year':
      case 'exactDate':
        return (
            <TwoField
                value={dropDownValue}
                setValue={setDDV}
                updateValue={updateValue}
                item={item}
            />
        );
      case 'month':
      case 'quarter':
      case 'range':
        return (
            <ThreeField
                value={dropDownValue}
                setValue={setDDV}
                updateValue={updateValue}
                item={item}
            />
        );
      default:
        return (
            <Select
                filterable={false}
                value={dropDownValue}
                data={variantList}
                closeOnSelect={true}
                selectWidth="100%"
                onChange={setDDV}
            />
        );
    }
  }, [dropDownValue, item, setDDV, updateValue, variantList]);

  return (
      <DateFieldContainer>
        {currentComponent}
      </DateFieldContainer>
  );
}

function TwoField({ value, setValue, updateValue, item }: ITwoField) {
  const yearsDropdown = useMemo(getYearsDropDown, [])

  const setInputValueCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^\d*$/)) {
      updateValue([`${value.value}`, e.target.value, '']); // Исправлено: value.value вместо value.title
    }
  }, [updateValue, value]);

  const buttonChange = useCallback((num: number) => {
    let secondValue = item.value[1];
    if (secondValue) {
      if (+secondValue + num < 0) {
        secondValue = `0`;
      } else {
        secondValue = `${+secondValue + num}`;
      }
    } else {
      secondValue = `0`;
    }
    updateValue([`${value.value}`, secondValue, '']); // Исправлено: value.value вместо value.title
  }, [item.value, updateValue, value]);

  const [selectYear, setSelectYear] = useState<IDataItem[]>(() => {
    const year = item.value[1] && /^(19|20)\d{2}$/.test(item.value[1]) ? item.value[1] : new Date().getFullYear()
    return [{ value: year, title: year.toString() }]
  });

  const setYear = useCallback((year: IDataItem[]) => {
    setSelectYear(year);
    updateValue([`${value.value}`, `${year[0].value}`, '']); // Исправлено: year[0].value вместо year[0].title
  }, [updateValue, value.value]);

  const setDate = useCallback((date: string) => {
    updateValue([`${value.value}`, date, '']); // Исправлено: value.value вместо value.title
  }, [updateValue, value.value]);

  switch (value.value) {
    case 'year':
      return (
          <>
            <Select
                filterable={false}
                value={value}
                data={item?.options?.variants || dateDropDown}
                closeOnSelect={true}
                selectWidth="49%"
                onChange={setValue}
            />
            <Select
                filterable={false}
                value={selectYear}
                data={yearsDropdown}
                closeOnSelect={true}
                selectWidth="49%"
                onChange={setYear}
            />
          </>
      );
    case 'exactDate':
      return (
          <>
            <Select
                filterable={false}
                value={value}
                data={item?.options?.variants || dateDropDown}
                closeOnSelect={true}
                selectWidth="49%"
                onChange={setValue}
            />
            <DatePicker
                fieldWidth="49%"
                onSelect={setDate}
                initialDateISO={item.value[1]}
                withTime={false}
                format="DD.MM.YYYY"
                svg="left"
            />
          </>
      );
    default:
      return (
          <>
            <Select
                filterable={false}
                value={value}
                data={item?.options?.variants || dateDropDown}
                closeOnSelect={true}
                selectWidth="49%"
                onChange={setValue}
            />
            <DateInput width="49%">
              <input
                  type="text"
                  value={item.value[1]}
                  onChange={setInputValueCheck}
              />
              <button onClick={() => buttonChange(1)}></button>
              <button onClick={() => buttonChange(-1)}></button>
            </DateInput>
          </>
      );
  }
}

function ThreeField({ value, setValue, updateValue, item }: IThreeField) {
  const firstDropDown = (
      <Select
          filterable={false}
          value={value}
          data={item?.options?.variants || dateDropDown}
          closeOnSelect={true}
          selectWidth="32%"
          onChange={setValue}
      />
  );

  const [selectYear, setSelectYear] = useState<IDataItem[]>(() => {
    const yearFromValue = item.value[2] && /^(19|20)\d{2}$/.test(item.value[2])
        ? parseInt(item.value[2])
        : new Date().getFullYear();
    return [{ value: yearFromValue, title: yearFromValue.toString() }];
  });

  const setYear = useCallback((year: IDataItem[]) => {
    setSelectYear(year);
    updateValue([item.value[0], item.value[1], `${year[0].value}`]); // Исправлено: year[0].value вместо year[0].title
  }, [item.value, updateValue]);

  const yearDropDown = useMemo(() => (
      <Select
          filterable={false}
          value={selectYear}
          data={item?.params?.data || getYearsDropDown()}
          closeOnSelect={true}
          selectWidth="32%"
          onChange={setYear}
      />
  ), [item?.params?.data, selectYear, setYear]);

  const [selectMonth, setSelectMonth] = useState<IDataItem[]>(() => {
    const monthFromValue = item.value[1] ? parseInt(item.value[1]) : new Date().getMonth() + 1;
    return [monthsDropDown.find(m => m.value === monthFromValue) as IDataItem] || [monthsDropDown[0]];
  });

  const setMonth = useCallback((month: IDataItem[]) => {
    setSelectMonth(month);
    updateValue([item.value[0], `${month[0].value}`, item.value[2]]);
  }, [item.value, updateValue]);

  const monthDropDown = useMemo(() => (
      <Select
          key="month"
          filterable={false}
          value={selectMonth}
          data={item?.params?.data || monthsDropDown}
          closeOnSelect={true}
          selectWidth="32%"
          onChange={setMonth}
      />
  ), [item?.params?.data, selectMonth, setMonth]);

  const [selectQuarter, setSelectQuarter] = useState<IDataItem[]>(() => {
    const quarterFromValue = item.value[1] ? parseInt(item.value[1]) : 1;
    const quarters: IDataItem[] = item?.params?.data || quartersDropDown;
    return [quarters.find(q => q.value === quarterFromValue) || quarters[0]];
  });

  const setQuarter = useCallback((quarter: IDataItem[]) => {
    setSelectQuarter(quarter);
    updateValue([item.value[0], `${quarter[0].value}`, item.value[2]]);
  }, [item.value, updateValue]);

  const quarterDropDown = useMemo(() => (
      <Select
          key="quarter"
          filterable={false}
          value={selectQuarter}
          data={item?.params?.data || quartersDropDown}
          closeOnSelect={true}
          selectWidth="32%"
          onChange={setQuarter}
      />
  ), [item?.params?.data, selectQuarter, setQuarter]);

  const setFirstDate = useCallback((date: string) => {
    updateValue([item.value[0], date, item.value[2]]);
  }, [item.value, updateValue]);

  const setSecondDate = useCallback((date: string) => {
    updateValue([item.value[0], item.value[1], date]);
  }, [item.value, updateValue]);

  return (
      <>
        {value.value === "month" ? (
            <>
              {firstDropDown}
              {monthDropDown}
              {yearDropDown}
            </>

        ) : value.value === "quarter" ? (
            <>
              {firstDropDown}
              {quarterDropDown}
              {yearDropDown}
            </>
        ) : (
            <>
              {firstDropDown}
              <DatePicker
                  onSelect={setFirstDate}
                  initialDateISO={item.value[1]}
                  fieldWidth="32%"
                  withTime={false}
                  format="DD.MM.YYYY"
                  svg="left"
              />
              <DatePicker
                  onSelect={setSecondDate}
                  initialDateISO={item.value[2]}
                  fieldWidth="32%"
                  withTime={false}
                  format="DD.MM.YYYY"
                  svg="left"
              />
            </>
        )}
      </>
  )
}