import { FileInputItem } from '../../file_input';
import { FileInputPropsValue } from './../../file_input/types';
import { IMultifieldProps, MultifieldItem } from './../../multifield/types';
import { IDataItem, ISelectProps } from './../../select/types';
import { buildCallbackValue } from './../../select/utils/selectUtils';
import { FormValues, IFormReducerState } from './../types';

export const prepareFormData = ({ fields, tempValues: values }: IFormReducerState): FormValues => {
  const parsedValues = Object.entries(values)
  let result = {} as FormValues

  parsedValues.forEach(([name, value]) => {
    let parsedValue = value as any
    const field = fields.find(field => field.name === name)

    if (field?.type === 'select') {
      const multiple = (field?.fieldParams as ISelectProps).multiple
      parsedValue = buildCallbackValue(parsedValue as IDataItem[], multiple)
    }
    if (field?.type === 'multifield') {
      const fieldType = (field?.fieldParams as IMultifieldProps)?.type
      const multifieldValue = (value as unknown as MultifieldItem[])
      switch (fieldType) {
        case 'input':
          parsedValue = multifieldValue.map(item => item.value)
          break;
        case 'select':
          parsedValue = multifieldValue.map(item => buildCallbackValue(item.value as IDataItem[], false))
          break;
        default:
          parsedValue = value
      }
    }

    if (field?.type === "file") {
      const fileValue = (value as unknown as FileInputPropsValue | FileInputItem[])

      if (!Array.isArray(fileValue)) {
        parsedValue = fileValue
      } else {
        const fileInstances = fileValue.filter(item => !!item.instance).map(item => item.instance)
        parsedValue = fileInstances.length ? fileInstances[0] : fileValue
      }
    }

    result[name] = parsedValue
  })

  return result
}

export const parseStringRegExp = (regexp: string) => {
  const regexpWithoutSlashes = regexp.slice(1, regexp.length - 1)
  return new RegExp(regexpWithoutSlashes)
}
