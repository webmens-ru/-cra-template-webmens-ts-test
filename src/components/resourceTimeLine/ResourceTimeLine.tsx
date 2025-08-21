import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import type {TimelineEvent, TimelineProps} from "./types";
import { useEffect, useRef } from "react";
import type { CalendarApi, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { FullCalendarStyle } from "./styles";

interface ExtendedTimelineProps extends TimelineProps {
    onEventClick?: (event: TimelineEvent) => void;
}

export default function ResourceTimeLine({
  events = [],
  resources = [],
  settings,
  onEventClick,
}: TimelineProps) {
  const calendarRef = useRef<{ calendar: CalendarApi }>(null);

  useEffect(() => {
    if (settings?.initialView) {
      calendarRef.current?.calendar.changeView(settings.initialView);
    }
  }, [settings?.initialView]);

    const handleEventClick = (clickInfo: EventClickArg) => {
        if (onEventClick) {
            const eventData = clickInfo.event.extendedProps as TimelineEvent;
            onEventClick({
                ...eventData,
                id: clickInfo.event.id,
                title: clickInfo.event.title,
                start: clickInfo.event.startStr,
                end: clickInfo.event.endStr,
                resourceId: clickInfo.event.getResources()[0]?.id,
            });
        }
    };


    return (
    <>
      <FullCalendarStyle />
      <FullCalendar
        {...settings}
        // @ts-ignore
        ref={calendarRef}
        // buttonText={{
        //   today: "Сегодня",
        //   month: "Месяц",
        //   week: "Неделя",
        //   day: "День",
        //   list: "Список",
        // }}
        schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
        plugins={[resourceTimelinePlugin]}
        resources={resources}
        events={events}
        eventClick={handleEventClick} // Добавьте обработчик клика
      />
    </>
  );
}
