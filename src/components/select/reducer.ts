import { getInitialValue } from './utils/selectUtils';
import { ISelectReducerState, ISelectReducerAction, ISelectReducerProps } from "./types"

export const reducer = function(state: ISelectReducerState, action: ISelectReducerAction): ISelectReducerState {
  switch (action.type) {
    case "setLoading":
      return {...state, loading: action.loading}
    case "setValue":
      return {...state, value: action.value}
    case "setFilterValue":
      return {...state, filterValue: action.filterValue}
    case "setFilteredData":
      return {...state, filteredData: action.filteredData}
    case "setFetchError":
      return {...state, hasErrorsOnFetch: true, loading: true}
    default: 
      return state
  }
}

export const init = function({ minInputLength, data, filterable, value }: ISelectReducerProps): ISelectReducerState {
  let selectData = data
  let hasErrorsOnFetch = false

  const filteredData = filterable && (minInputLength > 0) ? [] : selectData

  return {
    value: getInitialValue(value, data),
    data: selectData,
    filteredData,
    inited: true,
    loading: false,
    hasErrorsOnFetch,
    filterValue: '',
  }
}
