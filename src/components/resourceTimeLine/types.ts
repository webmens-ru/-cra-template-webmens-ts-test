import type { TimelineSettingsResponse } from "../../app/model/query"

export interface TimelineProps {
  resources?: TimelineResource[]
  events?: TimelineEvent[]
  settings?: TimelineSettingsResponse
  onEventClick?: (event: TimelineEvent) => void
}

export interface TimelineResource {
  id: string
  parentId?: string
  title?: string
  eventBackgroundColor?: string
  eventBorderColor?: string
  eventTextColor?: string
  [key: string]: unknown
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
  [key: string]: unknown;
}