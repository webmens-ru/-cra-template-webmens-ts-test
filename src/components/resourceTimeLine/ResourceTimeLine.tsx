import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import type { TimelineEvent, TimelineProps, TimelineResourceApi } from "./types";
import React, { useEffect, useRef, useState } from "react";
import type { CalendarApi, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { FullCalendarStyle } from "./styles";
import CellContent from "./components/CellContent";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction"
import { Tooltip } from 'react-tooltip'
import { BurgerItem } from "../grid";
import ActionsTooltip from "./components/ActionsTooltip";

export default function ResourceTimeLine({
  events = [],
  resources = [],
  options = {},
  settings,
  onEventClick,
  onDateClick,
}: TimelineProps) {
  const [actions, setActions] = useState<BurgerItem[]>([])
  const tooltipCel = useRef<HTMLElement | null>(null)
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

  const handleDateClick = (evt: DateClickArg) => {
    const resource = evt.resource as unknown as TimelineResourceApi
    const allActions = options?.dateClick?.actions
    const resourceActions = resource.extendedProps.dateClickActions

    if (!allActions?.length || !resourceActions?.length) return

    const allowedActions = allActions.filter(action => resourceActions.includes(action.id))
    setActions(allowedActions);

    const target = evt.jsEvent.target as HTMLElement
    target.dataset.tooltipId = 'timeline-action-tooltip'
  }

  return (
    <>
      <FullCalendarStyle />
      <ActionsTooltip target={tooltipCel.current} actions={actions} />
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
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        resources={resources}
        events={events}
        eventClick={handleEventClick}
        dayCellContent={CellContent}
        selectable
        dateClick={handleDateClick}
      />
    </>
  );
}
