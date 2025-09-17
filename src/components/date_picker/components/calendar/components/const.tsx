export const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const yearArray = (() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = -7; i <= 3; i++) {
    years.push(currentYear + i);
  }
  return years;
})();