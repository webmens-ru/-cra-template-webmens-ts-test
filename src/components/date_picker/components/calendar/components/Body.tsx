import React, { useCallback, useMemo } from 'react';
import {
  BodyContainer,
  DayInCurrentMonth,
  DayInOtherMonth,
  useCustomContext,
} from '..';

export function Body() {
  const { state, dispatch } = useCustomContext();

  const isThisToday = useCallback(
    (day: number, month: number, year: number) => {
      if (
        state.date.getDate() === day &&
        state.date.getMonth() === month &&
        state.date.getFullYear() === year
      ) {
        return '#eee';
      }
      return '#fff';
    },
    [state.date]
  );

  const usefulDate = useCallback(
    (monthShift: number, day: number = 0) => {
      const year = state.date.getFullYear();
      const month = state.date.getMonth();
      const hours = state.date.getHours();
      const minutes = state.date.getMinutes();
      const date = new Date(year, month + monthShift, day, hours, minutes);
      const countDays = date.getDate();

      return { year, month, date, countDays };
    },
    [state.date]
  );

  const daysPastMonth = useMemo(() => {
    const { year, month, date, countDays } = usefulDate(0);

    return Array.from({ length: date.getDay() }, (_, index) => ({
      label: countDays - index,
      isToday: isThisToday(countDays - index, month - 1, year),
    })).reverse();
  }, [isThisToday, usefulDate]);

  const daysCurrentMonth = useMemo(() => {
    const { year, month, date } = usefulDate(1);

    return Array.from({ length: date.getDate() }, (_, index) => ({
      label: index + 1,
      isToday: isThisToday(index + 1, month, year),
    }));
  }, [isThisToday, usefulDate]);

  const daysNextMonth = useMemo(() => {
    const { year, month, date } = usefulDate(1);

    return Array.from({ length: 7 - date.getDay() }, (_, index) => ({
      label: index + 1,
      isToday: isThisToday(index + 1, month - 1, year),
    }));
  }, [isThisToday, usefulDate]);

  const chooseDayInPastMonth = useCallback(
    (day: number) => {
      const { date } = usefulDate(-1, day);
      dispatch({ type: 'set_date', date });
    },
    [dispatch, usefulDate]
  );

  const chooseDayInCurrentMonth = useCallback(
    (day: number) => {
      const { date } = usefulDate(0, day);
      dispatch({ type: 'set_date', date });
    },
    [dispatch, usefulDate]
  );

  const chooseDayInNextMonth = useCallback(
    (day: number) => {
      const { date } = usefulDate(1, day);
      dispatch({ type: 'set_date', date });
    },
    [dispatch, usefulDate]
  );

  return (
    <BodyContainer>
      {daysPastMonth.map((day) => (
        <DayInOtherMonth
          key={day.label}
          onClick={() => chooseDayInPastMonth(day.label)}
          bg={day.isToday}
        >
          {day.label}
        </DayInOtherMonth>
      ))}
      {daysCurrentMonth.map((day) => (
        <DayInCurrentMonth
          key={day.label}
          bg={day.isToday}
          onClick={() => chooseDayInCurrentMonth(day.label)}
        >
          {day.label}
        </DayInCurrentMonth>
      ))}
      {daysNextMonth.map((day) => (
        <DayInOtherMonth
          key={day.label}
          onClick={() => chooseDayInNextMonth(day.label)}
          bg={day.isToday}
        >
          {day.label}
        </DayInOtherMonth>
      ))}
    </BodyContainer>
  );
}
