import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import type { TimelineAction, TimelineActionArgs, TimelineEvent, TimelineProps, TimelineResourceApi, TimelineResource} from "./types";
import React, { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import type { CalendarApi, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { FullCalendarStyle } from "./styles";
import CellContent from "./components/CellContent";
import interactionPlugin from "@fullcalendar/interaction"
import ActionsTooltip from "./components/ActionsTooltip";
import { ColSpec } from "@fullcalendar/resource-common";
import BurgerCellContent from "./components/BurgerCellContent";
import ResourceCellContent from "./components/ResourceCellContent";

interface TimelineActionState extends Omit<TimelineActionArgs, 'action'> {
  actions: TimelineAction[]
  cellRect: DOMRect
}

export default function ResourceTimeLine({
  events = [],
  resources = [],
  options = {},
  settings = {},
  onEventClick,
  onAction,
  onResourceClick,
  onChangeView
}: TimelineProps) {
  const [actionState, setActionState] = useState<TimelineActionState | null>(null)
  const calendarRef = useRef<{ calendar: CalendarApi, elRef: RefObject<HTMLElement> }>(null);
  const selectionTimeoutRef = useRef<NodeJS.Timeout>()

  const resourceAreaColumns = useMemo<ColSpec[]>(() => {
    return [
      {
        field: '_wm_burger',
        headerContent: '#',
        width: 40,
        cellClassNames: 'wm-burger-cell',
        cellContent(props: any) {
          return (
              <BurgerCellContent
                  {...props}
                  actions={options.burger?.actions}
                  onAction={(action) => onAction?.({action, resource: props.resource})}
              />)
        },
      },
      {
        field: 'title',
        headerContent: settings.resourceAreaHeaderContent,
        cellContent: (props: any) => {
          return (
            <ResourceCellContent
              {...props}
              onClick={onResourceClick}
            />
          );
        },
      }
    ]
  }, [onAction, options.burger?.actions, settings.resourceAreaHeaderContent, onResourceClick])

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
    if (!evt.jsEvent || evt.jsEvent.type !== 'mouseup') {
      return
    }
    selectionTimeoutRef.current = setTimeout(() => {
      const resource = evt.resource as unknown as TimelineResourceApi
      const allActions = options?.dateClick?.actions
      const resourceActions = resource.extendedProps.dateClickActions

      if (!allActions?.length || !resourceActions?.length || !calendarRef.current) return

      const allowedActions = allActions.filter(action => resourceActions.includes(action.id))
      const target = calendarRef.current.elRef.current?.querySelector('.fc-highlight')
      const cellRect = target?.getBoundingClientRect()

      if (cellRect) {
        setActionState({
          actions: allowedActions,
          // @ts-ignore
          resource: evt.resource?._resource!,
          dates: {
            start: evt.startStr,
            end: evt.endStr
          },
          cellRect
        })
      }
    }, 50)
  }

  const handleAction = (action: TimelineAction) => {
    if (!actionState) return

    onAction?.({ action, dates: actionState?.dates, resource: actionState.resource })
    setActionState(null)
  }

  const onCloseTooltip = () => {
    setActionState(null)
  }

  const resourceRender = function(info:any) {
    info.el.classList.add(info.resource.className); // добавление CSS класса
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
      {/* @ts-ignore */}
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
        handleCustomRendering={resourceRender}
        resourceAreaColumns={resourceAreaColumns}
        resourceAreaHeaderContent={null}
        events={events}
        eventClick={handleEventClick}
        dayCellContent={CellContent}
        selectable
        select={handleDatesSelect}
        datesSet={(evt) => onChangeView?.(evt.startStr, evt.endStr)}
        eventDidMount={(arg) => { // ← ДОБАВЬТЕ ЭТУ СТРОЧКУ
          const eventData = arg.event.extendedProps as TimelineEvent;

          // Применяем стили из данных события
          if (eventData.style) {
            Object.assign(arg.el.style, eventData.style);
          }

          // Или применяем конкретные свойства
          if (eventData.style?.borderRadius) {
            arg.el.style.borderRadius = eventData.style.borderRadius;
          }
          if (eventData.style?.border) {
            arg.el.style.border = eventData.style.border;
          }
          if (eventData.style?.backgroundColor) {
            arg.el.style.backgroundColor = eventData.style.backgroundColor;
          }

          // Добавляем CSS классы, если они есть
          if (eventData.className && typeof eventData.className === 'string') {
            arg.el.classList.add(eventData.className);
          }
        }}
      />
    </>
  );
}
