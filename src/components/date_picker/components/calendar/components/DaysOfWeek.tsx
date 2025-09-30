import React from "react";
import { DaysOfWeekContainer } from "..";

export const DaysOfWeek = React.memo(() => {
  return (
    <DaysOfWeekContainer>
      {names.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </DaysOfWeekContainer>
  );
});

const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
