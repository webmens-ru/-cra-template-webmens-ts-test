import React from "react";
import PopupAction from "./PopupAction";
import {
  IBlockItemMetricFilter,
  IBlockItemMetricLink,
  Toolbar,
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
import type { MainSliceState } from "../pages/main";
import useNavigation from "../app/hooks/useNavigation";

interface ResourceTimelineWrapperProps {
  slice: Partial<MainSliceState>;
  parentId?: string
  filterSetter?: ActionCreatorWithPayload<any>;
  resources?: TimelineResource[];
  events?: TimelineEvent[];
  options?: TimelineOptions;
  settings?: TimelineSettingsResponse;
  onCloseSlider?: () => void;
  onClosePopup?: () => void;
}

export default function ResourceTimeLineWrapper({
  slice,
  parentId,
  filterSetter,
  resources = [],
  events = [],
  settings = {},
  options = {},
  onCloseSlider,
  onClosePopup,
}: ResourceTimelineWrapperProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigation(); // Добавьте эту строку
  const [notificationContext, notificationAPI] = useNotification();
  const { isShowPopup, popupAction, ...popupProps } = usePopupHandler({
    notificationAPI,
    onClosePopup,
  });
  const rtlState = slice.grid;

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
    console.log(action, dates, resource)
    navigate({
      type: action.params.type,
      params: {
        ...action.params,
        queryParams: {
          resourceId: resource.id,
          dateStart: dates.start,
          dateEnd: dates.end,
          parentId
        }
      }
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
    if (updateOnClose && onCloseSlider) {
      onCloseSlider();
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
      {rtlState?.header?.blocks && (
        <Toolbar
          blocks={rtlState.header.blocks}
          onMetricFilterClick={handleMetricFilter}
          onMetricLinkClick={handleMetricLink}
        />
      )}
      <ResourceTimeLine
        events={events}
        resources={resources}
        settings={settings}
        options={options}
        onEventClick={handleEventClick}
        onAction={handleAction}
      />
    </>
  );
}
