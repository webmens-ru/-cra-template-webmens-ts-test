import { TRawColumnItem, TRowItem } from './../types';
import { IDateFormatterValue, ILinkFormatterValue, IMetricFormatterValue } from './../types/formatters';

export const getSorter = (columnKey: string, rawColumns: TRawColumnItem[]) => {
  const column = rawColumns.find(item => item.code === columnKey)  

  switch(column?.type) {
    case "string": return stringSorter
    case "number": return numberSorter
    case "date": return dateSorter
    case "metric": return metricSorter
    case "link": return linkSorter
    default: return stringSorter
  }
}

export const stringSorter = (a: TRowItem, b: TRowItem, columnKey: string) => {
  const [aValue, bValue] = [a[columnKey] || "" as string, b[columnKey] || "" as string]
  console.log(aValue, bValue);
  
  return aValue.localeCompare(bValue)
}

export const numberSorter = (a: TRowItem, b: TRowItem, columnKey: string) => {
  const [aValue, bValue] = [a[columnKey] as number, b[columnKey] as number]
  return aValue - bValue
}

export const dateSorter = (a: TRowItem, b: TRowItem, columnKey: string) => {
  const [aValue, bValue] = [a[columnKey] as IDateFormatterValue, b[columnKey] as IDateFormatterValue]
  const [aTitle, bTitle] = [aValue?.title || "", bValue?.title || ""]
  
  return aTitle.localeCompare(bTitle)
}

export const metricSorter = (a: TRowItem, b: TRowItem, columnKey: string) => {
  const [aValue, bValue] = [a[columnKey] as IMetricFormatterValue, b[columnKey] as IMetricFormatterValue]
  const [aVal, bVal] = [aValue.value, bValue.value]
  
  return aVal - bVal
}

export const linkSorter = (a: TRowItem, b: TRowItem, columnKey: string) => {
  const [aValue, bValue] = [a[columnKey] as ILinkFormatterValue, b[columnKey] as ILinkFormatterValue]
  const [aTitle, bTitle] = [aValue?.title || "", bValue?.title || ""]

  if (typeof aTitle === "number" && typeof bTitle === "number") {
    return aTitle - bTitle
  } else {
    return aTitle.toString().localeCompare(bTitle.toString())
  }
}
