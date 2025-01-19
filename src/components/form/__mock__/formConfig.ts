import { IFormProps } from './../types';

export const formConfig = {
  fields: [
    {type: 'input', name: 'number', label: 'Номер', readonly: false},
    {type: 'select', name: 'user', label: 'Текущий Пользователь',value: 1, fieldParams: {
      data: [{value: 1, title: 'User123'}, {value: 2, title: 'User456'}], dataUrl: '', multiple: false
    }},
    {type: 'select', name: 'users', label: 'Пользователи', value: 2, fieldParams: {
      data: [], dataUrl: 'http://localhost:3001/select', minInputLength: 3, multiple: true, remoteMode: true
    }},
    {type: 'date', name: 'date', label: 'Дата', fieldParams: {
      format: 'DD.MM.YYYY hh:mm', isShowTime: true
    }},
    {type: 'checkbox', name: 'isEnable', label: 'Показывать?'},
  ],
  mode: "edit",
  formTitle: "Форма",
  canToggleMode: true,
  validationRules: [],
} as IFormProps

export default formConfig
