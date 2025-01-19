export interface IFieldProps {
  label?: string;
  labelSuffix?: string;
  errors?: ErrorsItem[];
  name?: string;
  children: JSX.Element;
}

export type ErrorsItem = {
  field: string;
  message: string;
}
