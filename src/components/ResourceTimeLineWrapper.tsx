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
import { IState } from "../pages/mainPlacement";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { bxOpen } from "../app/utils/bx";
import { useAppDispatch } from "../app/store/hooks";

interface IResourceTimeLineWrapperProps {
  slice: Partial<IState>;
  filterSetter?: ActionCreatorWithPayload<any>;
  onCloseSlider?: () => void;
  onClosePopup?: () => void;
}

export default function ResourceTimeLineWrapper({
  slice,
  filterSetter,
  onCloseSlider,
  onClosePopup,
}:
IResourceTimeLineWrapperProps) {
  const dispatch = useAppDispatch();
  const [notificationContext, notificationAPI] = useNotification();
  const { isShowPopup, popupAction, ...popupProps } = usePopupHandler({
    notificationAPI,
    onClosePopup,
  });
  const rtlState = slice.grid;
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
      <ResourceTimeLine />
    </>
  );
}
