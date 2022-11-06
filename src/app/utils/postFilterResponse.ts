import { TField } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { TFilterDates } from "@webmens-ru/ui_lib/dist/components/filter_2/types";
import { IDataItem } from "@webmens-ru/ui_lib/dist/components/select/types";

export interface PostFilterResponse<ValueType> {
  operator: ResponseOperator;
  value: ValueType;
}

export interface PostFilterResponseFields {
  [key: string]: PostFilterResponse<any>[] | null
}

export type ResponseOperator = "" | "=" | "in" | "isNull" | "isNotNull" | "isNotUsed" | "range" | "%like%" | "%like" | "like%" | "=<>" | ">=" | "<=" | "=>=" | "=<=";

export const getFilterResponsePost = (fields: TField[]): PostFilterResponseFields => {
  const response: PostFilterResponseFields = {}
  fields.forEach((item) => {
    switch (item.type) {
      case "date":
        response[item.queryKey] = getDateResponse(item.value)
        break;
      case "integer":
        response[item.queryKey] = getIntegerResponse(item.value);
        break;
      case "string":
        response[item.queryKey] = getStringResponse(item.value);
        break;
      case "multiple_select":
      case "multiple_select_dynamic":
      case "select_dynamic":
      case "select":
        response[item.queryKey] = getSelectResponse(item.value as unknown as IDataItem[]);
        break;
      default:
        return "";
    }
  })
  return response
}

const getSelectResponse = (value: IDataItem[]): PostFilterResponse<Array<string | number>>[] => {
  const valueWithoutSpaces = value.filter(val => val)

  if (valueWithoutSpaces.length === 0) {
    return [];
  }
  if (valueWithoutSpaces.length > 1) {
    return getMultiplySelectResponse(valueWithoutSpaces)
  }
  return [
    { operator: "=", value: value.map(item => item.value) }
  ];
};

const getMultiplySelectResponse = (value: IDataItem[]): PostFilterResponse<Array<string | number>>[] => {
  if (value.length === 0) {
    return [];
  }
  return [{ operator: "in", value: value.map(item => item.value) }]
};

const getStringResponse = (item: string[]): PostFilterResponse<string>[] => {
  if (item.length === 0 || item[0] === "" || !item || (item[0] === "=" && !item[1])) {
    return [];
  }

  const [operator, value] = item
  return [{ operator: operator as ResponseOperator, value }]
};

const getIntegerResponse = (item: string[]): PostFilterResponse<string | null>[] | null => {
  if (!item || item.length === 0 || item[0] === "" || item[0] === "isNotUsed") {
    return null;
  }

  const [operator, firstValue, secondValue] = item
  switch (operator as ResponseOperator) {
    case "isNull":
    case "isNotNull":
      return [{ operator: operator as ResponseOperator, value: null }]
    case "range":
      return [
        { operator: ">=", value: firstValue },
        { operator: "<=", value: secondValue }
      ]
    default:
      return [{ operator: operator as ResponseOperator, value: firstValue }]
  }

};

export const getDateResponse = (value: string[]): PostFilterResponse<string>[] => {
  const date = new Date();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  switch (value[0] as TFilterDates) {
    case "anyDate":
      return [];
    case "yesterday":
      return [
        { operator: ">=", value: `${autoYear(-1)}-${autoMonth(-1)}-${autoDays(-1)}` },
        { operator: "<=", value: `${year}-${month}-${autoDays(0)}` }
      ]
    case "today":
      return [
        { operator: ">=", value: `${year}-${month}-${autoDays(0)}` },
        { operator: "<=", value: `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}` }
      ]
    case "tomorrow":
      return [
        { operator: ">=", value: `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}` },
        { operator: "<=", value: `${autoYear(2)}-${autoMonth(2)}-${autoDays(2)}` }
      ]
    case "currentWeek":
      let countDaysToStartOfWeek = date.getDay() - 1;
      let countDaysToEndOfWeek = 7 - (date.getDay() || 7) + 1;
      return [
        { operator: ">=", value: `${autoYear(-countDaysToStartOfWeek)}-${autoMonth(-countDaysToStartOfWeek)}-${autoDays(-countDaysToStartOfWeek)}` },
        { operator: "<=", value: `${autoYear(countDaysToEndOfWeek)}-${autoMonth(countDaysToEndOfWeek)}-${autoDays(countDaysToEndOfWeek)}` }
      ]
    case "currentMonth":
      return [
        { operator: ">=", value: `${year}-${month}-1` },
        { operator: "<=", value: `${autoYear(getCountDaysInMonth(month) + 1)}-${autoMonth(getCountDaysInMonth(month) + 1)}-1` }
      ]
    case "currentQuarter":
      let currentQuarter = month < 4 ? [1, 4] : month < 7 ? [4, 7] : month < 10 ? [7, 10] : [10, 1];
      return [
        { operator: ">=", value: `${year}-${currentQuarter[0]}-1` },
        { operator: "<=", value: `${month < 10 ? year : year + 1}-${currentQuarter[1]}-1` }
      ]
    case "last7Days":
      return [
        { operator: ">=", value: `${autoYear(-6)}-${autoMonth(-6)}-${autoDays(-6)}` },
        { operator: "<=", value: `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}` },
      ]
    case "last30Days":
      return [
        { operator: ">=", value: `${autoYear(-30)}-${autoMonth(-30)}-${autocomplete(-30).getDate()}` },
        { operator: "<=", value: `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}` }
      ]
    case "last60Days":
      return [
        { operator: ">=", value: `${autoYear(-60)}-${autoMonth(-60)}-${autocomplete(-60).getDate()}` },
        { operator: "<=", value: `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}` }
      ]
    case "last90Days":
      return [
        { operator: ">=", value: `${autoYear(-90)}-${autoMonth(-90)}-${autocomplete(-90).getDate()}` },
        { operator: "<=", value: `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}` }
      ]
    case "lastNDays":
      return [
        { operator: ">=", value: `${autoYear(-value[1])}-${autoMonth(-value[1])}-${autoDays(-value[1])}` },
        { operator: "<=", value: `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}` }
      ]
    case "nextNDays":
      return [
        { operator: ">=", value: `${year}-${month}-${autoDays(0)}` },
        { operator: "<=", value: `${autoYear(+value[1])}-${autoMonth(+value[1])}-${autoDays(+value[1])}` }
      ]
    case "month":
      return [
        { operator: ">=", value: `${value[2] || year}-${value[1] || month}-${1}` },
        { operator: "<=", value: `${(+value[1] || month) === 12 ? year + 1 : year}-${(+value[1] || month) === 12 ? 1 : (+value[1] || month) + 1}-1` }
      ]
    case "quarter":
      let [cm, nm] = value[1] === "1" ? [1, 4] : value[1] === "2" ? [4, 7] : value[1] === "3" ? [7, 10] : [10, 1]
      let [cy, ny] = value[1] === "1" ? [+value[2] - 1, value[2]] : value[1] === "4" ? [value[2], +value[2] + 1] : [value[2], value[2]]

      return [
        { operator: ">=", value: `${cy || year}-${cm}-1` },
        { operator: "<=", value: `${ny || year}-${nm}-1` }
      ]
    case "year":
      return [
        { operator: ">=", value: `${+value[1] || year}-1-1` },
        { operator: "<=", value: `${+value[1] + 1 || year + 1}-1-1` }
      ]
    case "exactDate":
      const dayBefore = new Date(+value[1]);
      const dayAfter = new Date(+value[1] + 86400000);
      return [
        { operator: ">=", value: `${dayBefore.getFullYear() || year}-${dayBefore.getMonth() + 1 || month}-${dayBefore.getDate()}` },
        { operator: "<=", value: `${dayAfter.getFullYear() || year}-${dayAfter.getMonth() + 1 || month}-${dayAfter.getDate()}` }
      ]
    case "lastWeek":
      let beforeToday1 = -date.getDay() - 6;
      let afterToday1 = -date.getDay() + 1;
      return [
        { operator: ">=", value: `${autoYear(beforeToday1)}-${autoMonth(beforeToday1)}-${autoDays(beforeToday1)}` },
        { operator: "<=", value: `${autoYear(afterToday1)}-${autoMonth(afterToday1)}-${autoDays(afterToday1)}` }
      ]
    case "lastMonth":
      const prevMonth = month === 1 ? 12 : month - 1;
      return [
        { operator: ">=", value: `${month === 0 ? year - 1 : year}-${prevMonth}-1` },
        { operator: "<=", value: `${year}-${month}-1` },
      ]
    case "range":
      const dayBefore1 = new Date(value[1]);
      const dayAfter1 = new Date(new Date(value[2]).getTime() + 86400000);
      return [
        { operator: ">=", value: `${dayBefore1.getFullYear() || year}-${dayBefore1.getMonth() + 1 || month}-${dayBefore1.getDate()}` },
        { operator: "<=", value: `${dayAfter1.getFullYear() || year}-${dayAfter1.getMonth() + 1 || month}-${dayAfter1.getDate()}` }
      ]
    case "nextWeek":
      let nextMonday = 8 - date.getDay();
      return [
        { operator: ">=", value: `${autoYear(nextMonday)}-${autoMonth(nextMonday)}-${autoDays(nextMonday)}` },
        { operator: "<=", value: `${autoYear(nextMonday + 7)}-${autoMonth(nextMonday + 7)}-${autoDays(nextMonday + 7)}` }
      ]
    case "nextMonth":
      let yearMaybeNext = year;
      let nextMonth = month + 1;
      if (month === 12) {
        yearMaybeNext++;
        nextMonth = 0;
      }
      return [
        { operator: ">=", value: `${yearMaybeNext}-${nextMonth + 1}-1` },
        { operator: "<=", value: `${yearMaybeNext}-${nextMonth + 2}-1` }
      ]
    default:
      return [];
  }
};
// если дней больше/меньше чем в месяце вернет число прошлого/следующего месяца
const autocomplete = (days = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const autoDays = (days: number) => {
  return autocomplete(days).getDate();
};

const autoMonth = (days: number) => {
  return autocomplete(days).getMonth() + 1;
};
const autoYear = (days: number) => {
  return autocomplete(days).getFullYear();
};

const getCountDaysInMonth = (month: number) => {
  const dt = new Date();
  const year = dt.getFullYear();
  return new Date(year, month, 0).getDate();
};
