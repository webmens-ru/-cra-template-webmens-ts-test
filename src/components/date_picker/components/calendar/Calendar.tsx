import React, { StrictMode } from "react";
import { CalendarProvider, ICalendarProps } from ".";
import { useWindowBound } from "../../../../hooks";
import { Body } from "./components/Body";
import { DaysOfWeek } from "./components/DaysOfWeek";
import { Dropdown } from "./components/Dropdown";
import { MonthBtn } from "./components/MonthBtn";
import { Time } from "./components/Time";
import { CalendarContainer, HeaderContainer } from "./styles/Calendar";

/**
 * @param isShow - boolean
 * @param withTime - boolean
 * @param dateISO - date in ISO8601 or string text(placeholder)
 * @param onSelect - return date in ISO8601 after select
 * @param top - css property
 * @param left - css property
 * @param bottom - css property
 * @param right - css property
 * @returns 
 */

export function Calendar({
  isShow,
  withTime,
  dateISO,
  onSelect,
  ...props
}: ICalendarProps) {
  const { ref } = useWindowBound();

  if (!isShow) return null;

  return (
    <StrictMode>
      <CalendarProvider dateISO={dateISO} onSelect={onSelect}>
        <CalendarContainer isShow={isShow} ref={ref} {...props}>
          <HeaderContainer>
            <MonthBtn dir="prev" />
            <Dropdown variant="month" />
            <Dropdown variant="year" />
            <MonthBtn dir="next" />
          </HeaderContainer>
          <DaysOfWeek />
          <Body />
          {withTime && <Time />}
        </CalendarContainer>
      </CalendarProvider>
    </StrictMode>
  );
}
