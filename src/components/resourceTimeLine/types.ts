import type { ResourceApi } from "@fullcalendar/resource-common"
import type { TimelineOptions, TimelineSettingsResponse } from "../../app/model/query"
import type { BurgerItem } from "../grid"
import type { Colors } from "../../app/model/colors"

export interface TimelineProps {
  resources?: TimelineResource[]
  events?: TimelineEvent[]
  settings?: TimelineSettingsResponse & {
    currentDate?: string;
    showCurrentDate?: boolean;
    currentDateHighlight?: {
      color?: string;
      opacity?: number;
      borderColor?: string;
      borderWidth?: string;
    };
  }
  options?: TimelineOptions
  onEventClick?: (event: TimelineEvent) => void
  onDateClick?: (resource: TimelineResourceApi) => void
  onAction?: ({ action, resource, dates }: TimelineActionArgs) => void
  onResourceClick?: (resource: TimelineResource) => void;
  onChangeView?: (start: string, end: string) => void;
}

export interface TimelineActionArgs {
  action: TimelineAction
  resource: TimelineResourceApi
  dates?: {
    start: string
    end: string
  }
}

export interface TimelineResource {
  id: string
  parentId?: string
  title?: string
  eventBackgroundColor?: string
  eventBorderColor?: string
  eventTextColor?: string
  [key: string]: unknown
  action?: {
    type?: string;
    url?:string;
    path: string;
    updateOnCloseSlider?: boolean;
    bx24_width?: string;
    params?: {
      [key: string]: any;
    };
  };
}

export interface TimelineResourceApi extends ResourceApi {
  extendedProps: {
    wmCellColor?: keyof typeof Colors;
    action?: TimelineAction
    dateClickActions?: string[]
    datesSelectActions?: string[]
    burgerActions?: string[]
  }
}

export interface TimelineResourceAction {
  type: 'openApplication' | 'openPath' | 'openPopup' | 'openLink'
}

// Дата формата 2018-09-01T12:30:00
export type TimelineEventDate = string

export interface TimelineEvent {
  id: string
  start: TimelineEventDate
  end: TimelineEventDate
  resourceId: TimelineResource['id']
  title?: string
  action?: {
    type?: string; // тип для навигации
    path?: string;
    url?: string; // URL для перехода
    iframeUrl?: string; // для openApplication
    bx24_width?: string; // ширина слайдера
    updateOnCloseSlider?: boolean; // флаг обновления при закрытии
    params?: any; // дополнительные параметры
  }
  style?: {
    borderRadius?: string;
    border?: string;
    backgroundColor?: string;
    color?: string;
    height?: string;
  };
  [key: string]: unknown;
}

export interface TimelineAction {
  id: string
  title: string
  params: BurgerItem
}
