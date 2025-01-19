export type DateFieldProps = {
  type: 'date';
  variant: 'with_border' | 'dashed_underline' | 'text_bold';
  dateISO?: string | 'today';
  format?: string;
  readOnly?: boolean;
  svg?: 'none' | 'left' | 'right';
  onSelect?: (date: string) => void;
  [key: string]: any;
};
