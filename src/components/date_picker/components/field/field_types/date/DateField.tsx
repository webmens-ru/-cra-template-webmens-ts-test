import React, { useCallback, useEffect, useState } from 'react';
import { GreyBorderContainer, SvgCalendar } from '../../styles/Containers';
import { DateFieldProps } from './types';

export function DateField({
  placeholder,
  dateISO,
  format = 'DD.MM.YYYY hh:mm',
  readOnly = false,
  onSelect,
  svg,
  ...props
}: DateFieldProps) {
  const [data, setData] = useState<Data>({
    date: isValidDateISO(dateISO) && dateISO ? new Date(dateISO) : new Date(),
    value: dateToString(format, dateISO),
  });

  useEffect(() => {
    setData({
      value: dateToString(format, dateISO),
      date: isValidDateISO(dateISO) && dateISO ? new Date(dateISO) : new Date(),
    });
  }, [dateISO, format]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (isPrint(data.value, value)) {
        let date = new Date(data.date.getTime());

        if (!value.match(/^[\d./,-]*$/) || value.length > 10) return;

        if (value.length === 3 && !value[2].match(/[./,-]/)) {
          date.setDate(+value.slice(0, 2));
          value = data.value + '.' + value.slice(-1);
          if (onSelect) onSelect(date.toISOString());
        }

        if (value.length === 6 && !value[5].match(/[./,-]/)) {
          date.setDate(+value.slice(0, 2));
          date.setMonth(+value.slice(3, 5) - 1);
          value = data.value + '.' + value.slice(-1);
          if (onSelect) onSelect(date.toISOString());
        }

        if (value.length === 10) {
          date.setDate(+value.slice(0, 2));
          date.setMonth(+value.slice(3, 5) - 1);
          date.setFullYear(+value.slice(-4));
          if (onSelect) onSelect(date.toISOString());
        }

        setData((old) => ({
          ...old,
          value,
        }));
      }

      if (isErase(data.value, e.target.value)) {
        setData((data) => ({
          ...data,
          value,
        }));
      }
    },
    [data.date, data.value, onSelect]
  );

  return (
    <GreyBorderContainer {...props}>
      {svg === 'left' && <SvgCalendar />}
      <input
        value={data.value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
      />
      {svg === 'right' && <SvgCalendar />}
    </GreyBorderContainer>
  );
}

type Data = {
  date: Date;
  value: string;
};

const isPrint = (old: string, current: string) => {
  return old.length < current.length;
};

const isErase = (old: string, current: string) => {
  return old.length > current.length;
};

const dateToString = (format: string, dateISO?: string) => {
  if (!dateISO) return '';

  let date;
  if (dateISO === 'today') {
    date = new Date();
  }
  if (isValidDateISO(dateISO)) {
    date = new Date(dateISO);
  } else {
    return dateISO;
  }

  return format
    .replace('YYYY', `${date.getFullYear()}`)
    .replace('YY', `${date.getFullYear()}`.slice(-2))
    .replace('MM', `0${date.getMonth() + 1}`.slice(-2))
    .replace('DD', `0${date.getDate()}`.slice(-2))
    .replace('hh', `0${date.getHours()}`.slice(-2))
    .replace('mm', `0${date.getMinutes()}`.slice(-2));
};

function isValidDateISO(dateISO?: string) {
  if (!dateISO) return false;
  const date = new Date(dateISO);
  return !isNaN(date.getTime());
}
