import React, { useEffect, useState } from "react";
import { useShowControl } from "../../hooks";
import { Calendar } from "./components/calendar";
import { Field } from "./components/field";
import { DatePickerContainer } from './styles';
import { IDatePicker } from "./types";

/**
 * 
 * @param onSelect - return date in ISO8601 after select
 * @param fieldWidth - css property
 * @param initialDateISO - date in ISO8601 or string text(placeholder)
 * @param withTime - boolean value for control
 * @param initialCalendarTime - hours:minutes (18:00)
 * @param svg - "none" | "left" | "right" | undefined
 * @param format - default "DD.MM.YYYY hh:mm"
 * @returns 
 */

export function DatePicker({
  onSelect,
  fieldWidth = "100%",
  initialDateISO,
  withTime = true,
  initialCalendarTime,
  svg,
  format = "DD.MM.YYYY hh:mm",
}: IDatePicker) {
  const [dateISO, setDateISO] = useState(() => {
    let calendar = initialDateISO || "";
    if (initialCalendarTime) {
      calendar = setTime(initialCalendarTime).toISOString();
    }
    return {
      field: initialDateISO,
      calendar,
    };
  });

  const { ref, isShow, setShow } = useShowControl();

  useEffect(() => {
    setDateISO((old) => ({
      ...old,
      field: initialDateISO,
    }));
  }, [initialDateISO]);

  const calendarSelectHandler = (date: string) => {
    setDateISO({ field: date, calendar: date });
    setShow(false);
    if (onSelect) onSelect(date);
  };

  const fieldSelectHandler = (date: string) => {
    setDateISO((old) => ({ ...old, calendar: date }));
    if (onSelect) onSelect(date);
  };

  return (
    <DatePickerContainer ref={ref} width={fieldWidth}>
      <Field
        type="date"
        variant="with_border"
        dateISO={dateISO.field}
        onClick={() => setShow(true)}
        onSelect={fieldSelectHandler}
        svg={svg}
        format={format}
      />
      <Calendar
        isShow={isShow}
        dateISO={dateISO.calendar}
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
