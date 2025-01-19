import { IFormReducerAction, FormFieldsItem, IFormProps, IFormReducerState } from './../../types';

export interface IEditFormProps extends IFormProps {
  form: IFormReducerState;
  fields: FormFieldsItem[];
  dispatch: React.Dispatch<IFormReducerAction>;
}