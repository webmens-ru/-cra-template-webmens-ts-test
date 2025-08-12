export interface TimelineProps {
  resources: TimelineResource[]
  events: TimelineEvent[]
}

export interface TimelineResource {
  id: string | number
  parentId?: string | number
  title?: string
  eventBackgroundColor?: string
  eventBorderColor?: string
  eventTextColor?: string
  [key: string]: unknown
}

// Дата формата 2018-09-01T12:30:00
export type TimelineEventDate = string

export interface TimelineEvent {
  id: string | number
  start: TimelineEventDate
  end: TimelineEventDate
  title?: string
}