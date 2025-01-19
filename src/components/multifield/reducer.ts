import { IDataItem } from './../select/types';
import { IMultifieldReducerAction, IMultifieldReducerProps, IMultifieldState, MultifieldItemComboValue } from './types';
import { recalculateOrders, initFieldsProperrties, getDefaultComboValue } from './utils';

export const reducer = function (state: IMultifieldState, action: IMultifieldReducerAction): IMultifieldState {
  switch (action.type) {
    case 'ADD_FIELD':
      if (state.fields.length >= state.maxLimit) return state

      const value = state.type === 'combo' ? getDefaultComboValue(state.comboParams?.data as IDataItem[]) : ""

      const fieldsWithNew = state.fields.concat([{ value, order: state.fields.length + 1, key: state.keyCounter + 1 }])
      return { ...state, fields: fieldsWithNew, keyCounter: ++state.keyCounter }
    case 'REMOVE_FIELD':
      if (state.fields.length <= state.minLimit) return state

      const cuttedFields = state.fields.filter(item => item !== action.payload.field)
      return { ...state, fields: recalculateOrders(cuttedFields) }
    case 'SET_VALUE':
      const fields = state.fields.map(field => {
        if (field === action.payload.field) {
          return {
            ...field,
            value: action.payload.value
          }
        }
        return field
      })

      return { ...state, fields }
    case 'SET_COMBO_VALUE':
      const comboFields = state.fields.map(field => {
        if (field === action.payload.field) {
          return {
            ...field,
            value: {
              ...field.value as MultifieldItemComboValue,
              [action.payload.type === "input" ? "text" : "type"]: action.payload.value
            }
          }
        }
        return field
      })

      return { ...state, fields: comboFields }
    default:
      return state
  }
}

export const init = function ({ minLimit, maxLimit, fields, type, comboParams, onChange }: IMultifieldReducerProps): IMultifieldState {
  let initedFields = fields.slice()

  if (initedFields.length < minLimit) {
    for (let i = 0; i < minLimit; i++) {
      const value = type === "combo"
        ? getDefaultComboValue(comboParams?.data as IDataItem[])
        : ""

      initedFields.push({ value })
    }
  }
  else if (initedFields.length > maxLimit) {
    for (let i = initedFields.length; i > maxLimit; i--) {
      initedFields.pop()
    }
  }

  return {
    fields: initFieldsProperrties(initedFields),
    type,
    minLimit,
    maxLimit,
    comboParams,
    keyCounter: initedFields.length - 1,
    onChange
  }
}
