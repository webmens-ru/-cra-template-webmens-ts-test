import { useMemo } from "react";
import { useCustomContext } from "../store/Context";
import { DateFieldOperator, FieldOperator, FilterSquare, TField } from './../types/index';

const genericOperators: { [key in FieldOperator]?: string } = {
  "": "Не используется",
  "isNotUsed": "Не используется",
  "isNull": "Не заполнено",
  "isNotNull": "Заполнено",
}

const getFieldValue = (field: TField): string => {
  const [operator, firstValue, secondValue] = field.value as [FieldOperator, any, any]

  if (Object.keys(genericOperators).includes(operator)) {
    return genericOperators[operator] as string
  }

  switch (field.type) {
    case "integer":
    case "number":
      switch (operator) {
        case "range":
          if (!firstValue && !!secondValue) {
            return `Меньше чем ${secondValue}`
          } else if (!!firstValue && !secondValue) {
            return `Больше чем ${firstValue}`
          } else {
            return `${firstValue}-${secondValue}`
          }
        case "=": return firstValue
        default: return `${operator} ${firstValue}`
      }
    case "string":
      return firstValue
    case "date":
      const [firstDate, secondDate] = [
        new Date(firstValue).toLocaleDateString(),
        new Date(secondValue).toLocaleDateString()
      ]
      switch (operator as DateFieldOperator) {
        case "exactDate":
          return firstDate
        case "range":
          if (!firstValue && !!secondValue) {
            return `Раньше чем ${secondDate}`
          } else if (!!firstValue && !secondValue) {
            return `Позже чем ${firstDate}`
          } else {
            return `${firstDate}-${secondDate}`
          }
        case "lastNDays":
        case "nextNDays":
          // const NDaysTitle = dateDropDown.find(item => item.value === operator)!.title as string
          // return NDaysTitle.replace("N", firstValue.toString())
          return '';
        case "month":
          const month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
          return (firstValue) ? `${month[firstValue - 1]}` : ``
        case "quarter":
          const quarter = ['I Квартал', 'II Квартал', 'III Квартал', 'IV Квартал'];
          return (firstValue) ? `${quarter[firstValue - 1]}` : ``
        case "year":
          // return `${firstValue.title}`
          return '';
        default:
          // return dateDropDown.find(item => item.value === operator)!.title as string
          return '';
      }
    case 'select':
    case 'multiple_select':
    case 'select_dynamic':
    case 'multiple_select_dynamic':
      // if (field?.params?.multiple) {
      //   return field.value.map((item: any): string => item.title).join(", ")
      // } else {
      //   return firstValue[0].title
      // }
      return '';
    default: return ""
  }
}

export default function useSquares(): { squares: FilterSquare[], validFieldsCount: number } {
  const { state } = useCustomContext();  

  return useMemo(() => {
    const fields = state.fields
      .filter(field => field.visible && !!field.value && (!!field.value[0] || !!field.value[1] || !!field.value[2]))
      .sort((a, b) => a.order - b.order)
    
    const squares = fields.reduce<Array<{ title: string, value: string }>>((arr, field) => {      
      if (arr.length === 2) {
        return arr
      } else {
        arr.push({ title: field.title, value: getFieldValue(field) })        
        return arr
      }
    }, [])
    return {
      squares,
      validFieldsCount: fields.length
    }
  }, [state.fields])
}
