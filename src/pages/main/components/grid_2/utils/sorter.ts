import { IDateFormatterValue, ILinkFormatterValue } from './../types/formatters';
import { TRawColumnItem, TRowItem } from './../types';

export const getSorter = (columnKey: string, rawColumns: TRawColumnItem[]) => {
  const column = rawColumns.find(item => item.code === columnKey)  

  switch(column?.type) {
    case "string": return stringSorter
    case "number": return numberSorter
    case "date": return dateSorter
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

export const linkSorter = (a: TRowItem, b: TRowItem, columnKey: string) => {
  const [aValue, bValue] = [a[columnKey] as ILinkFormatterValue, b[columnKey] as ILinkFormatterValue]
  const [aTitle, bTitle] = [aValue?.title || "", bValue?.title || ""]

  if (typeof aTitle === "number" && typeof bTitle === "number") {
    return aTitle - bTitle
  } else {
    return aTitle.toString().localeCompare(bTitle.toString())
  }
}
