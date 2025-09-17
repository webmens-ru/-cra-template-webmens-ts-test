import React from "react";
import { useTranslation } from 'react-i18next';
import { DaysOfWeekContainer } from "..";

export const DaysOfWeek = React.memo(() => {
  const { t } = useTranslation();
  const daysShort = t('calendar.days_short', { returnObjects: true }) as string[];

  return (
    <DaysOfWeekContainer>
      {daysShort.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </DaysOfWeekContainer>
  );
});
