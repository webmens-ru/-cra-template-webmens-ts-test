export interface ICalendarProps {
  dateISO: string;
  isShow?: boolean;
  withTime?: boolean;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  onSelect?: (data: string) => void;
}

export interface IProviderProps extends ICalendarProps {
  children: JSX.Element;
}

export type State = {
  date: Date;
};

export interface ICalendarContext {
  state: State;
  dispatch: (act: Action) => void;
}

export type Action =
  | { type: 'next_month' }
  | { type: 'prev_month' }
  | { type: 'set_month'; month: number }
  | { type: 'set_year'; year: number }
  | { type: 'set_date'; date: Date }
  | { type: 'set_hour'; hour: number }
  | { type: 'set_minute'; minute: number }
  | { type: 'submit' }
  | { type: 'cancel' };
