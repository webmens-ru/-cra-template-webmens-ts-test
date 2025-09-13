import React from "react";
import PopupAction from "./PopupAction";
import {
  IBlockItemMetricFilter,
  IBlockItemMetricLink,
  Toolbar,
  type IToolbarBlock,
} from "./toolbar";
import ResourceTimeLine from "./resourceTimeLine/ResourceTimeLine";
import useNotification from "./notification";
import usePopupHandler from "../app/hooks/usePopupHandler";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { bxOpen } from "../app/utils/bx";
import { useAppDispatch } from "../app/store/hooks";
import type {
  TimelineActionArgs,
  TimelineEvent,
  TimelineResource,
} from "./resourceTimeLine/types";
import type {
  TimelineOptions,
  TimelineSettingsResponse,
} from "../app/model/query";
import useNavigation from "../app/hooks/useNavigation";

interface ResourceTimelineWrapperProps {
  parentId?: string
  filterSetter?: ActionCreatorWithPayload<any>;
  header?: {
    blocks: IToolbarBlock[]
  }
  resources?: TimelineResource[];
  events?: TimelineEvent[];
  options?: TimelineOptions;
  settings?: TimelineSettingsResponse;
  onCloseSlider?: () => void;
  onClosePopup?: () => void;
  onReload?: () => void;
  onChangeView?: (start: string, end: string) => void
}

export default function ResourceTimeLineWrapper({
  parentId,
  filterSetter,
  header,
  resources = [],
  events = [],
  settings = {},
  options = {},
  onCloseSlider,
  onClosePopup,
  onReload,
  onChangeView
}: ResourceTimelineWrapperProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigation(); // Добавьте эту строку
  const [notificationContext, notificationAPI] = useNotification();
  const { isShowPopup, popupAction, ...popupProps } = usePopupHandler({
    notificationAPI,
    onClosePopup,
    onReloadData: onReload
  });
  const handleResourceClick = (resource: TimelineResource) => {
    // Берем action из extendedProps
    // @ts-ignore
    const action = resource.extendedProps?.action;

    if (action) {
      const { type, url, params, bx24_width, updateOnCloseSlider } = action;

      navigate({
        type: type || "openApplication",
        url: url,
        params: params || {},
        width: bx24_width,
        onCloseSlider: () => handleCloseSlider(updateOnCloseSlider),
      });
    } else {
      console.log('No action found in resource.extendedProps');
    }
  };

  const handleEventClick = (event: TimelineEvent) => {
    if (event.action) {
      const { updateOnCloseSlider, params } = event.action;

      // Предполагаем, что params уже содержит правильную структуру
      const navigationParams = {
        type: event.action.type || "openApplication",
        path: event.action.path,
        updateOnCloseSlider: updateOnCloseSlider ? "true" : "false",
        id: event.id,
        params: params || {}, // Используем готовые params из action
      };

      navigate({
        type: navigationParams.type,
        url: navigationParams.path,
        params: navigationParams,
        width: event.action.bx24_width,
        onCloseSlider: () => handleCloseSlider(updateOnCloseSlider),
      });
    }
  };

  const handleAction = ({ action, dates, resource }: TimelineActionArgs) => {
    if (action.params.type === 'trigger') {
      popupProps.show({
        params: {
          popup: action.params.params?.popup,
          output: action.params.params?.output,
          updateOnCloseSlider: action.params.params?.updateOnCloseSlider
        },
        handler: action.params.params?.link,
        row: resource
      });
      return;
    }

    navigate({
      type: action.params.type,
      params: {
        ...action.params,
        queryParams: {
          resourceId: resource.id,
          dateStart: dates?.start,
          dateEnd: dates?.end,
          parentId
        }
      },
      // @ts-ignore
      onCloseSlider: () => handleCloseSlider(action.params.updateOnCloseSlider),
    })
  }

  const handleMetricFilter = (item: IBlockItemMetricFilter) => {
    if (filterSetter && item.params && item.params.url !== null) {
      dispatch(filterSetter(item.params.url));
    }
  };

  const handleMetricLink = (item: IBlockItemMetricLink) => {
    // @ts-ignore
    bxOpen(item.params.type, item.params.link, item.params);
  };

  const handleCloseSlider = (updateOnClose: boolean = true) => {
    if (updateOnClose) {
      if (onReload) {
        onReload();
      }
      if (onCloseSlider) {
        onCloseSlider();
      }
    }
  };

  return (
    <>
      {/*{slice.isLoading && <Loader transparent />}*/}
      {notificationContext}
      {isShowPopup && !!popupAction?.params.popup && (
        <PopupAction
          {...popupAction.params.popup}
          onClose={popupProps.close}
          onSubmit={(form) =>
            popupProps.handlePopupSubmit({
              form,
              /*[rowKey]: popupAction.row ? popupAction?.row[rowKey] :*/ undefined,
            })
          }
          onAfterSubmit={popupProps.afterPopupSubmit}
        />
      )}
      {header?.blocks && (
        <Toolbar
          blocks={header.blocks}
          onMetricFilterClick={handleMetricFilter}
          onMetricLinkClick={handleMetricLink}
        />
      )}
      {settings.initialView && (
        <ResourceTimeLine
          events={events}
          resources={resources}
          settings={settings}
          options={options}
          onEventClick={handleEventClick}
          onAction={handleAction}
          onResourceClick={handleResourceClick}
          onChangeView={onChangeView}
        />
      )}
    </>
  );
}
