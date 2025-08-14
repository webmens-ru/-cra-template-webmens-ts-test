import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import type { TimelineProps } from "./types";
import { useEffect, useRef } from "react";
import type { CalendarApi } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { FullCalendarStyle } from "./styles";

export default function ResourceTimeLine({
  events = [],
  resources = [],
  settings,
}: TimelineProps) {
  const calendarRef = useRef<{ calendar: CalendarApi }>(null);

  useEffect(() => {
    if (settings?.initialView) {
      calendarRef.current?.calendar.changeView(settings.initialView);
    }
  }, [settings?.initialView]);

  return (
    <>
      <FullCalendarStyle />
      <FullCalendar
        {...settings}
        // @ts-ignore
        ref={calendarRef}
        buttonText={{
          today: "Сегодня",
          month: "Месяц",
          week: "Неделя",
          day: "День",
          list: "Список",
        }}
        locale="ru"
        schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
        plugins={[resourceTimelinePlugin]}
        resources={resources}
        events={events}
      />
    </>
  );
}
