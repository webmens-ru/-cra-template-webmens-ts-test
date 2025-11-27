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
  const [actionState, setActionState] = useState<TimelineActionState | null>(null);
  const calendarRef = useRef<{ calendar: CalendarApi, elRef: RefObject<HTMLElement> }>(null);
  const selectionTimeoutRef = useRef<NodeJS.Timeout>();

  const minSlotsForTooltip = settings.minSlotsForTooltip ?? 1;

  // Настройки подсветки текущей даты
  const currentDate = settings.currentDate;
  const showCurrentDate = settings.showCurrentDate ?? true;
  const highlightConfig = settings.currentDateHighlight || {
    color: '#ffeb3b',
    opacity: 0.2,
    borderColor: '#ffeb3b',
    borderWidth: '2px'
  };

  // Функция для применения подсветки
  const applyCurrentDateHighlight = () => {
    if (!calendarRef.current?.calendar || !currentDate || !showCurrentDate) {
      return;
    }

    // Убираем предыдущую подсветку
    document.querySelectorAll('.fc-current-date-highlight').forEach(el => {
      el.classList.remove('fc-current-date-highlight');
    });

    try {
      const date = new Date(currentDate);
      const targetDateString = date.toISOString().split('T')[0];

      // Ищем все элементы с data-date
      const allDateElements = document.querySelectorAll('[data-date]');

      allDateElements.forEach(element => {
        const elementDate = element.getAttribute('data-date');
        if (elementDate && elementDate.includes(targetDateString)) {
          element.classList.add('fc-current-date-highlight');
        }
      });

    } catch (error) {
      console.error('Error applying current date highlight:', error);
    }
  };

  // Эффект для подсветки при изменении даты или настроек
  useEffect(() => {
    const timer = setTimeout(applyCurrentDateHighlight, 500);
    return () => clearTimeout(timer);
  }, [currentDate, showCurrentDate, highlightConfig]);

  // Эффект для переприменения подсветки при изменении ресурсов или событий
  useEffect(() => {
    const timer = setTimeout(applyCurrentDateHighlight, 300);
    return () => clearTimeout(timer);
  }, [resources, events]);

  const resourceAreaColumns = useMemo<ColSpec[]>(() => {
    const backendColumns = settings.resourceAreaColumns || [];

    // Базовые колонки с фронтенда
    const frontendColumns: ColSpec[] = [
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
              />
          )
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
    ];

    if (backendColumns.length === 0) {
      return frontendColumns;
    }

    const resultColumns: ColSpec[] = [];

    backendColumns.forEach(backendCol => {
      const frontendCol = frontendColumns.find(col => col.field === backendCol.field);

      if (frontendCol) {
        resultColumns.push({
          ...frontendCol,
          ...backendCol,
          cellContent: frontendCol.cellContent,
        });
      } else {
        resultColumns.push(backendCol);
      }
    });

    return resultColumns;
  }, [
    onAction,
    options.burger?.actions,
    settings.resourceAreaHeaderContent,
    settings.resourceAreaColumns,
    onResourceClick
  ]);

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

    const start = new Date(evt.startStr);
    const end = new Date(evt.endStr);

    const slotDuration = settings?.slotDuration || '24:00:00';

    const parseSlotDuration = (duration: string): number => {
      const [hours, minutes, seconds] = duration.split(':').map(Number);
      return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    };

    const slotDurationMs = parseSlotDuration(slotDuration);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffSlots = Math.ceil(diffTime / slotDurationMs);

    if (diffSlots < minSlotsForTooltip) {
      return;
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
    info.el.classList.add(info.resource.className);
  }

  // Обработчик изменения вида
  const handleDatesSet = (evt: any) => {
    onChangeView?.(evt.startStr, evt.endStr);

    // Переприменяем подсветку при смене вида
    setTimeout(applyCurrentDateHighlight, 800);
  }

  return (
      <>
        <FullCalendarStyle />

        {/* Кастомные стили для подсветки текущей даты */}
        <style>
          {`
          .fc-current-date-highlight {
            background-color: ${highlightConfig.color} !important;
            opacity: ${highlightConfig.opacity} !important;
            position: relative;
            z-index: 5;
          }
          
          .fc-current-date-highlight::before {
            content: '';
            position: absolute;
            top: 1px;
            left: 1px;
            right: 1px;
            bottom: 1px;
            border: ${highlightConfig.borderWidth} solid ${highlightConfig.borderColor};
            pointer-events: none;
            box-sizing: border-box;
            z-index: 6;
            border-radius: 2px;
          }
          
          /* Усиливаем специфичность для различных элементов */
          .fc .fc-timeline-slot.fc-current-date-highlight {
            background-color: ${highlightConfig.color} !important;
          }
          
          .fc .fc-timeline-cell.fc-current-date-highlight {
            background-color: ${highlightConfig.color} !important;
          }
          
          .fc-timeline .fc-current-date-highlight {
            background-color: ${highlightConfig.color} !important;
          }
          
          .fc-timeline-slot-lane .fc-current-date-highlight,
          .fc-timeline-bg .fc-current-date-highlight {
            background-color: ${highlightConfig.color} !important;
          }
          
          /* Для темной темы */
          .fc-theme-standard .fc-current-date-highlight {
            background-color: ${highlightConfig.color} !important;
          }
          
          .fc-theme-dark .fc-current-date-highlight {
            background-color: ${highlightConfig.color} !important;
          }
        `}
        </style>

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
            datesSet={handleDatesSet}
            eventDidMount={(arg) => {
              const eventData = arg.event.extendedProps as TimelineEvent;

              if (eventData.style) {
                Object.assign(arg.el.style, eventData.style);
              }

              if (eventData.style?.borderRadius) {
                arg.el.style.borderRadius = eventData.style.borderRadius;
              }
              if (eventData.style?.border) {
                arg.el.style.border = eventData.style.border;
              }
              if (eventData.style?.backgroundColor) {
                arg.el.style.backgroundColor = eventData.style.backgroundColor;
              }
              if (eventData.style?.height) {
                arg.el.style.height = eventData.style.height;
              }

              if (eventData.className && typeof eventData.className === 'string') {
                arg.el.classList.add(eventData.className);
              }
            }}
        />
      </>
  );
}