import { headersGeneric } from '../../../app/api';
import { IDataItem, SelectPropsValue } from '../types';
import { IGroupDataItem, IQueryParams, SelectData, SelectValue } from './../types';

export const getInitialValue = (
  propsValue: SelectPropsValue,
  data: Array<IDataItem | IGroupDataItem> = [],
): SelectValue => {
  switch (typeof propsValue) {
    case 'number':
    case 'string':
      if (propsValue === "") return []
      const title = getDeepTitle(propsValue, data) || '';
      return [{ value: propsValue, title }];
    case 'object':
      if (Array.isArray(propsValue)) {
        return (propsValue as Array<string | number | IDataItem>).map((item) => {
          if (typeof item === "string" || typeof item === "number") {
            return { value: item, title: getDeepTitle(item, data) || '' }
          }
          if (typeof item === 'object' && 'value' in item && 'title' in item) {
            return item;
          } else {
            const title = getDeepTitle(item, data) || '';
            return { value: item as string | number, title };
          }
        });
      } else return [propsValue];
    default:
      return [];
  }
};

export const getDeepTitle = (propsValue: string | number, data: SelectData = []) => {
  const object = data.find(item => {
    if ('options' in item && Array.isArray(item.options)) {
      return item.options.some(option => option.value === propsValue)
    } else if ('value' in item) {
      return item.value === propsValue
    } else return false
  })

  return object?.title
}

export const filterSelectData = (data: SelectData, filterBy: string) => {
  const parsedFilterBy = filterBy.trim().toLowerCase()

  return data.map((option) => {
    if ('options' in option && Array.isArray(option.options)) {
      const matchedOptions = option.options.filter(item => {
        const parsedTitle = item.title.toString().toLowerCase()
        return parsedTitle.includes(parsedFilterBy)
      })
      return matchedOptions.length > 0 ? { ...option, options: matchedOptions } : undefined
    } else {
      const parsedTitle = option.title.toString().toLowerCase()
      if (parsedTitle.includes(parsedFilterBy)) {
        return option
      } else {
        return undefined
      }
    }
  }).filter((option) => option !== undefined) as any //TODO: Поправить типизацию
}

export const buildFilterQuery = (url: string, queryParams: IQueryParams, filterBy: string, queryFilterBy: string): Promise<Response> => {
  const selectQueryParams = new URLSearchParams({
    ...queryParams,
    [queryFilterBy]: filterBy.trim()
  }).toString()
  const queryUrl = `${url}?${selectQueryParams}`

  return fetch(queryUrl, {
    headers: headersGeneric
  })
}

export const buildCallbackValue = (value: IDataItem[], multiple: boolean = false): string | string[] => {
  if (multiple) {
    return value.map(item => item.value.toString())
  } else {
    return value[0]?.value?.toString()
  }
}
