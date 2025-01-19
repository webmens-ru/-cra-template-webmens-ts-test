import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Action, ICalendarContext, IProviderProps, State } from ".";

const reducer = (state: State, action: Action) => {
  let date = new Date(state.date.getTime());
  switch (action.type) {
    case "next_month":
      date.setMonth(date.getMonth() + 1);
      return { ...state, date };
    case "prev_month":
      date.setMonth(date.getMonth() - 1);
      return { ...state, date };
    case "set_month":
      date.setMonth(action.month);
      return { ...state, date };
    case "set_year":
      date.setFullYear(action.year);
      return { ...state, date };
    case "set_date":
      return { ...state, date: action.date };
    case "set_hour":
      date.setHours(action.hour);
      return { ...state, date };
    case "set_minute":
      date = new Date(state.date.getTime());
      date.setMinutes(action.minute);
      return { ...state, date };
    default:
      return state;
  }
};

export const CalendarContext = createContext<ICalendarContext>(
  {} as ICalendarContext,
);

export function CalendarProvider(props: IProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    date: isValidDateISO(props.dateISO) ? new Date(props.dateISO) : new Date(),
  });

  const dispatchWithMiddleware = useCallback((action: Action) => {
    if (props.onSelect) {
      if (action.type === "submit") props.onSelect(state.date.toISOString());
      if (action.type === "set_date") props.onSelect(action.date.toISOString());
    }
    dispatch(action);
  }, [props, state.date]);

  useEffect(() => {
    if (isValidDateISO(props.dateISO))
      dispatch({ type: "set_date", date: new Date(props.dateISO) });
  }, [props.dateISO]);

  return (
    <CalendarContext.Provider
      value={{ state, dispatch: dispatchWithMiddleware }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
}

export const useCustomContext = () => useContext(CalendarContext);

function isValidDateISO(dateISO?: string) {
  if (!dateISO) return false;
  const date = new Date(dateISO);
  return date instanceof Date && !isNaN(date.getTime());
}
