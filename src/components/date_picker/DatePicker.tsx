import React, { useEffect, useState } from "react";
import { useShowControl } from "../../hooks";
import { Calendar } from "./components/calendar";
import { Field } from "./components/field";
import { DatePickerContainer } from './styles';
import { IDatePicker } from "./types";

export function DatePicker({
                             onSelect,
                             fieldWidth = "100%",
                             initialDateISO,
                             withTime = true,
                             initialCalendarTime,
                             svg,
                             format = "DD.MM.YYYY hh:mm",
                           }: IDatePicker) {
  const [dateValue, setDateValue] = useState(() => {
    let calendar = initialDateISO || "";
    if (initialCalendarTime) {
      // Используем новую функцию formatLocalDate вместо toISOString()
      calendar = formatLocalDate(setTime(initialCalendarTime, initialDateISO));
    }
    return {
      field: initialDateISO || "",
      calendar: calendar,
    };
  });

  const { ref, isShow, setShow } = useShowControl();

  useEffect(() => {
    setDateValue((old) => ({
      ...old,
      field: initialDateISO || "",
    }));
  }, [initialDateISO]);

  const calendarSelectHandler = (date: string) => {
    setDateValue({ field: date, calendar: date });
    setShow(false);
    if (onSelect) onSelect(date);
  };

  const fieldSelectHandler = (date: string) => {
    setDateValue((old) => ({ ...old, calendar: date }));
    if (onSelect) onSelect(date);
  };

  return (
      <DatePickerContainer ref={ref} width={fieldWidth}>
        <Field
            type="date"
            variant="with_border"
            dateISO={dateValue.field} // Изменено с dateISO.field на dateValue.field
            onClick={() => setShow(true)}
            onSelect={fieldSelectHandler}
            svg={svg}
            format={format}
        />
        <Calendar
            isShow={isShow}
            dateISO={dateValue.calendar} // Изменено с dateISO.calendar на dateValue.calendar
            onSelect={calendarSelectHandler}
            withTime={withTime}
        />
      </DatePickerContainer>
  );
}

function isValidDateISO(dateISO?: string) {
  if (!dateISO) return false;
  const date = new Date(dateISO);
  return date instanceof Date && !isNaN(date.getTime());
}

function createDate(dateISO?: string) {
  return isValidDateISO(dateISO) && dateISO ? new Date(dateISO) : new Date();
}

function setTime(initialCalendarTime?: string, initialDateISO?: string) {
  let date = createDate(initialDateISO);
  if (!initialCalendarTime) return date;
  let time = initialCalendarTime.split(":");
  date.setHours(+time[0]);
  date.setMinutes(+time[1]);
  return date;
}

// Новая функция для форматирования даты в локальный формат без временной зоны
function formatLocalDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  // Формат: "YYYY-MM-DDTHH:mm" (без секунд и временной зоны)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}