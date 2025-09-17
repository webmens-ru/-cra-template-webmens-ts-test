export const monthArray = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const yearArray = (() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = -7; i <= 3; i++) {
    years.push(currentYear + i);
  }
  return years;
})();