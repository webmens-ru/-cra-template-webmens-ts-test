import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import type { TimelineAction, TimelineActionArgs, TimelineEvent, TimelineProps, TimelineResourceApi } from "./types";
import React, { useEffect, useRef, useState } from "react";
import type { CalendarApi, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { FullCalendarStyle } from "./styles";
import CellContent from "./components/CellContent";
import interactionPlugin, { type DateClickArg } from "@fullcalendar/interaction"
import ActionsTooltip from "./components/ActionsTooltip";

interface TimelineActionState extends Omit<TimelineActionArgs, 'action'> {
  actions: TimelineAction[]
  cellRect: DOMRect
}

export default function ResourceTimeLine({
  events = [],
  resources = [],
  options = {},
  settings,
  onEventClick,
  onAction
}: TimelineProps) {
  const [actionState, setActionState] = useState<TimelineActionState | null>(null)
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

  const handleDatesSelect = (evt: DateSelectArg) => {
    const resource = evt.resource as unknown as TimelineResourceApi
    const allActions = options?.dateClick?.actions
    const resourceActions = resource.extendedProps.dateClickActions

    if (!allActions?.length || !resourceActions?.length) return

    const allowedActions = allActions.filter(action => resourceActions.includes(action.id))
    const target = evt.jsEvent?.target as HTMLElement
    const cellRect = target.getBoundingClientRect()

    if (target.classList.contains('fc-highlight')) {
      setActionState({
        actions: allowedActions,
        // @ts-ignore
        resource: evt.resource?._resource!,
        dates: {
          start: evt.startStr,
          end: evt.endStr
        },
        cellRect
      });
    }
  }

  const handleAction = (action: TimelineAction) => {
    if (!actionState) return

    onAction?.({ action, dates: actionState?.dates, resource: actionState.resource })
    setActionState(null)
  }

  const onCloseTooltip = () => {
    setActionState(null)
  }

  return (
    <>
      <FullCalendarStyle />
      {actionState && (
        <ActionsTooltip
          cellRect={actionState?.cellRect}
          actions={actionState?.actions}
          onAction={handleAction}
          onClose={onCloseTooltip}
        />
      )}
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
        select={handleDatesSelect}
      />
    </>
  );
}
