import type { ToolbarInput } from "@fullcalendar/core";
import type { BurgerItem, TRowItem } from "../../components/grid";
import type { PaginationProps } from "../../components/grid/components/pagination";
import type { TimelineAction, TimelineEvent, TimelineResource } from "../../components/resourceTimeLine/types";
import type { IToolbarBlock } from "../../components/toolbar";
import type { ViewOptionsRefined } from "@fullcalendar/core/internal";

// TODO: Написать тип ошибки сабмита
export type ErrorResponse = any;

export type ViewMode = 'grid' | 'resource-timeline'

export interface GridDataResponse {
  header?: {
    blocks: IToolbarBlock[]
  };
  grid?: TRowItem[];
  footer?: TRowItem[];
  pagination?: PaginationProps;
  options?: {
    key: string;
    actionColumnName: string;
    actions: BurgerItem[]
  }
}

export interface TimelineDataResponse {
  header: {
    blocks: IToolbarBlock[]
  }
  resources: TimelineResource[]
  events: TimelineEvent[]
  options: TimelineOptions
}

export interface TimelineOptions {
  dateClick?: TimelineActionList
  datesSelect?: TimelineActionList
  burger?: TimelineActionList
}

export interface TimelineActionList {
  key: string
  actions: TimelineAction[]
}

export interface TimelineSettingsResponse {
  initialView?: string
  headerToolbar?: ToolbarInput
  editable?: boolean
  selectable?: boolean
  resourceGroupField?: string
  resourceAreaHeaderContent?: string
  views?: {
    [key: string]: ViewOptionsRefined
  }
}
