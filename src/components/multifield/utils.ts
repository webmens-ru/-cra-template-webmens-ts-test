import { IDataItem } from '../select/types';
import { MultifieldItem, MultifieldItemProps, MultifieldItemComboValue } from './types';

export const initFieldsProperrties = (fields: MultifieldItemProps[]): MultifieldItem[] => {
  return fields.map((field, index) => {
    if (typeof field === 'string') {
      return { value: field, order: index + 1, key: index }
    } else {
      return { ...field, order: index + 1, key: index }
    }
  })
}

export const recalculateOrders = (fields: MultifieldItem[]) => {
  return fields
    .sort((current, next) => current.order - next.order)
    .map((field, index) => ({ ...field, order: index + 1 }))
}

export const getDefaultComboValue = (comboData?: IDataItem[]): MultifieldItemComboValue => {
  return {
    text: "",
    type: comboData?.length ? comboData[0] : undefined
  }
}
