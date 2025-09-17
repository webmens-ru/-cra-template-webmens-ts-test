import { TFunction } from 'i18next';

export const getMonthArray = (t: TFunction) => [
  t('calendar.months.january'),
  t('calendar.months.february'),
  t('calendar.months.march'),
  t('calendar.months.april'),
  t('calendar.months.may'),
  t('calendar.months.june'),
  t('calendar.months.july'),
  t('calendar.months.august'),
  t('calendar.months.september'),
  t('calendar.months.october'),
  t('calendar.months.november'),
  t('calendar.months.december')
];

// Ключи месяцев для других целей
export const monthKeys = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

export const yearArray = (() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = -7; i <= 3; i++) {
    years.push(currentYear + i);
  }
  return years;
})();