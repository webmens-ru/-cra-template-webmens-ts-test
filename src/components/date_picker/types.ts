export interface IDatePicker{
  initialDateISO?: string
  initialCalendarTime?: string;
  fieldWidth?: string;
  onSelect?: (date: string) => void;
  svg?: "none" | "left" | "right"
  withTime?: boolean;
  format?: string
}