import { TField } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { IDataItem } from "@webmens-ru/ui_lib/dist/components/select/types";

export const getFilterResponse = (array: TField[]) => {
  return array
    .map((item) => {
      switch (item.type) {
        case "date":
          return getDateResponse(item.value, item.queryKey)
            .replace(/-(\d{1})([-,\]])/g, "-0$1$2")
            .replace(/-(\d{1})([-,\]])/g, "-0$1$2");
        case "integer":
          return getIntegerResponse(item.value, item.queryKey);
        case "string":
          return getStringResponse(item.value, item.queryKey);
        case "multiple_select":
        case "multiple_select_dynamic":
        case "select_dynamic":
        case "select":
          return getSelectResponse(item.value as unknown as IDataItem[], item.queryKey);
        default:
          return "";
      }
    })
    .filter((item) => item !== "")
    .join("&");
};

const getSelectResponse = (value: IDataItem[], name: string) => {
  const valueWithoutSpaces = value.filter(val => val)

  if (valueWithoutSpaces.length === 0) {
    return "";
  }
  if (valueWithoutSpaces.length > 1) {
    return getMultiplySelectResponse(valueWithoutSpaces, name)
  }
  return `${name}=${value[0].value}`;
};

const getMultiplySelectResponse = (value: IDataItem[], name: string) => {
  if (value.length === 0) {
    return "";
  }
  return `${name}=in[${value.map(val => val.value).join(",")}]`;
};

const getStringResponse = (value: string[], name: string) => {
  if (value.length === 0 || value[0] === "" || !value) {
    return "";
  }
  if (value[0] === "isNull") {
    return `${name}=isNull`;
  }
  return `${name}${value[0]}${value[1]}`;
};

const getIntegerResponse = (value: string[], name: string) => {
  if (value.length === 0 || value[0] === "" || !value) {
    return "";
  }
  if (value[0] === "isNull") {
    return `${name}=isNull`;
  }
  if (value[0] === "=[>f,<s]") {
    return `${name}=[>=${value[1]},<=${value[2]}]`;
  }
  return `${name}${value[0]}${value[1]}`;
};

export const getDateResponse = (value: string[], name: string) => {
  const date = new Date();
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  switch (value[0]) {
    case "Любая дата":
      return "";
    case "Вчера":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${autoYear(-1)}-${autoMonth(-1)}-${autoDays(-1)}`)
          .replace("s", `${year}-${month}-${autoDays(0)}`)
      );
    case "Сегодня":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${year}-${month}-${autoDays(0)}`)
          .replace("s", `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}`)
      );
    case "Завтра":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}`)
          .replace("s", `${autoYear(2)}-${autoMonth(2)}-${autoDays(2)}`)
      );
    case "Текущая неделя":
      let countDaysToStartOfWeek = date.getDay() - 1;
      let countDaysToEndOfWeek = 7 - (date.getDay() || 7) + 1;
      return (
        name +
        "=[>=f,<s]"
          .replace(
            "f",
            `${autoYear(-countDaysToStartOfWeek)}-${autoMonth(
              -countDaysToStartOfWeek,
            )}-${autoDays(-countDaysToStartOfWeek)}`,
          )
          .replace(
            "s",
            `${autoYear(countDaysToEndOfWeek)}-${autoMonth(
              countDaysToEndOfWeek,
            )}-${autoDays(countDaysToEndOfWeek)}`,
          )
      );
    case "Текущий месяц":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${year}-${month}-1`)
          .replace(
            "s",
            `${autoYear(getCountDaysInMonth(month) + 1)}-${autoMonth(
              getCountDaysInMonth(month) + 1,
            )}-1`,
          )
      );
    case "Текущий квартал":
      const currentQuarter =
        month < 4
          ? [1, 4]
          : month < 7
          ? [4, 7]
          : month < 10
          ? [7, 10]
          : [10, 1];
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${year}-${currentQuarter[0]}-1`)
          .replace(
            "s",
            `${month < 10 ? year : year + 1}-${currentQuarter[1]}-1`,
          )
      );
    case "Последние 7 дней":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${autoYear(-6)}-${autoMonth(-6)}-${autoDays(-6)}`)
          .replace("s", `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}`)
      );
    case "Последние 30 дней":
      return (
        name +
        "=[>=f,<s]"
          .replace(
            "f",
            `${autoYear(-30)}-${autoMonth(-30)}-${autocomplete(-30).getDate()}`,
          )
          .replace("s", `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}`)
      );
    case "Последние 60 дней":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${autoYear(-60)}-${autoMonth(-60)}-${autoDays(-60)}`)
          .replace("s", `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}`)
      );
    case "Последние 90 дней":
      return (
        name +
        "=[>=f,<=s]"
          .replace("f", `${autoYear(-90)}-${autoMonth(-90)}-${autoDays(-90)}`)
          .replace("s", `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}`)
      );
    case "Последние N дней":
      return (
        name +
        "=[>=f,<=s]"
          .replace(
            "f",
            `${autoYear(-value[1])}-${autoMonth(-value[1])}-${autoDays(
              -value[1],
            )}`,
          )
          .replace("s", `${autoYear(1)}-${autoMonth(1)}-${autoDays(1)}`)
      );
    case "Следующие N дней":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${year}-${month}-${autoDays(0)}`)
          .replace(
            "s",
            `${autoYear(+value[1])}-${autoMonth(+value[1])}-${autoDays(
              +value[1],
            )}`,
          )
      );
    case "Месяц":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${value[2] || year}-${value[1] || month}-${1}`)
          .replace(
            "s",
            `${(+value[1] || month) === 12 ? year + 1 : year}-${
              (+value[1] || month) === 12 ? 1 : (+value[1] || month) + 1
            }-1`,
          )
      );
    case "Квартал":
      switch (value[1]) {
        case "1":
          return (
            name +
            "=[>=f,<s]"
              .replace("f", `${+value[2] - 1 || year}-1-1`)
              .replace("s", `${value[2] || year}-4-1`)
          );
        case "2":
          return (
            name +
            "=[>=f,<s]"
              .replace("f", `${value[2] || year}-4-1`)
              .replace("s", `${value[2] || year}-7-1`)
          );
        case "3":
          return (
            name +
            "=[>=f,<s]"
              .replace("f", `${value[2] || year}-7-1`)
              .replace("s", `${value[2] || year}-10-1`)
          );
        default:
          return (
            name +
            "=[>=f,<s]"
              .replace("f", `${value[2] || year}-10-1`)
              .replace("s", `${+value[2] + 1 || year + 1}-1-1`)
          );
      }
    case "Год":
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${+value[1] || year}-1-1`)
          .replace("s", `${+value[1] + 1 || year + 1}-1-1`)
      );
    case "Точная дата":
      const dayBefore = new Date(+value[1]);
      const dayAfter = new Date(+value[1] + 86400000);
      return (
        name +
        `=[>=f,<s]`
          .replace(
            "f",
            `${dayBefore.getFullYear() || year}-${
              dayBefore.getMonth() + 1 || month
            }-${dayBefore.getDate()}`,
          )
          .replace(
            "s",
            `${dayAfter.getFullYear() || year}-${
              dayAfter.getMonth() + 1 || month
            }-${dayAfter.getDate()}`,
          )
      );
    case "Прошлая неделя":
      let beforeToday1 = -date.getDay() - 6;
      let afterToday1 = -date.getDay() + 1;
      return (
        name +
        "=[>=f,<s]"
          .replace(
            "f",
            `${autoYear(beforeToday1)}-${autoMonth(beforeToday1)}-${autoDays(
              beforeToday1,
            )}`,
          )
          .replace(
            "s",
            `${autoYear(afterToday1)}-${autoMonth(afterToday1)}-${autoDays(
              afterToday1,
            )}`,
          )
      );
    case "Прошлый месяц":
      const prevMonth = month === 1 ? 12 : month - 1;
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${month === 0 ? year - 1 : year}-${prevMonth}-1`)
          .replace("s", `${year}-${month}-1`)
      );
    case "Диапазон":
      const dayBefore1 = new Date(+value[1]);
      const dayAfter1 = new Date(+value[2] + 86400000);
      return (
        name +
        `=[>=f,<s]`
          .replace(
            "f",
            `${dayBefore1.getFullYear() || year}-${
              dayBefore1.getMonth() + 1 || month
            }-${dayBefore1.getDate()}`,
          )
          .replace(
            "s",
            `${dayAfter1.getFullYear() || year}-${
              dayAfter1.getMonth() + 1 || month
            }-${dayAfter1.getDate()}`,
          )
      );
    case "Следующая неделя":
      let nextMonday = 8 - date.getDay();
      return (
        name +
        "=[>=f,<s]"
          .replace(
            "f",
            `${autoYear(nextMonday)}-${autoMonth(nextMonday)}-${autoDays(
              nextMonday,
            )}`,
          )
          .replace(
            "s",
            `${autoYear(nextMonday + 7)}-${autoMonth(
              nextMonday + 7,
            )}-${autoDays(nextMonday + 7)}`,
          )
      );
    case "Следующий месяц":
      let yearMaybeNext = year;
      let nextMonth = month + 1;
      if (month === 12) {
        yearMaybeNext++;
        nextMonth = 0;
      }
      return (
        name +
        "=[>=f,<s]"
          .replace("f", `${yearMaybeNext}-${nextMonth + 1}-1`)
          .replace("s", `${yearMaybeNext}-${nextMonth + 2}-1`)
      );
    default:
      return "";
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
