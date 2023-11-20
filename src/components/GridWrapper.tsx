import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Grid2 as Grid, Loader, Toolbar, useNotification } from "@webmens-ru/ui_lib";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid/types";
import { BurgerItem, TCellItem, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { IBlockItemMetricFilter, IBlockItemMetricLink } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { useCallback, useMemo } from "react";
import usePopupHandler from "../app/hooks/usePopupHandler";
import { useAppDispatch } from "../app/store/hooks";
import { bxOpen } from "../app/utils/bx";
import { IState } from "../pages/mainPlacement";
import PopupAction from "./PopupAction";
import { SliderProps } from "./slider";
import useSlider from "./slider/hooks/useSlider";

// TODO: Изучить типизацию redux-toolkit
interface IGridWrapperProps {
  slice: Partial<IState>;
  api?: any;
  schemaSetter: ActionCreatorWithPayload<any>;
  checkboxesSetter: ActionCreatorWithPayload<any>;
  filterSetter?: ActionCreatorWithPayload<any>;
  onShemaMutation: MutationTrigger<any>;
  onRowMutation?: MutationTrigger<any>;
  height?: number;
  onCloseSlider?: () => void
  onClosePopup?: () => void
  onNavigate?: (page: number) => void
}

export function GridWrapper({
  slice,
  schemaSetter,
  checkboxesSetter,
  filterSetter,
  height,
  onShemaMutation,
  onRowMutation,
  onCloseSlider,
  onClosePopup,
  onNavigate
}: IGridWrapperProps) {
  const dispatch = useAppDispatch()
  const sliderService = useSlider()
  const [notificationContext, notificationAPI] = useNotification()
  const { isShowPopup, popupAction, ...popupProps } = usePopupHandler({ notificationAPI, onClosePopup })
  const gridState = slice.grid
  const rowKey = gridState?.options?.key || "id"
  const burgerItems = gridState?.options?.actions || []


  const pagination = useMemo(() => {
    if (slice.pagination) {
      return { ...slice.pagination, onNavigate }
    }
  }, [onNavigate, slice.pagination])

  const onCellClick = (cell: TCellItem) => {
    // if (process.env.NODE_ENV === "production") {
    switch (cell.type) {
      case "openPath":
        BX24.openPath(cell.link, (res: any) => console.log(res));
        break;
      case "openApplication":
        if (window._APP_TYPE_ === 'site') {
          sliderService.show({
            type: "iframe",
            typeParams: { iframeUrl: cell.iframeUrl },
            placementOptions: { ...cell },
            width: cell.bx24_width,
            onClose: () => handleCloseSlider(cell.updateOnCloseSlider)
          })
        } else {
          BX24.openApplication(cell, function () {
            if (cell.updateOnCloseSlider && onCloseSlider) {
              onCloseSlider()
            }
          });
        }

        break;
      case "openLink":
        window.open(cell.link);
        break;
      default:
        break;
    }

    // } else if (cell.type === "openLink") {
    //   window.open(cell.link);
    // } else {
    //   console.log(cell);
    // }
  }

  const handleBurgerClick = (item: BurgerItem, row: TRowItem) => {
    let sliderProps: SliderProps = {}
    const rowID = row[rowKey]
    let id = rowID;
    if (typeof rowID == 'object') {
      id = rowID.title;
    }
    new Promise<void>((resolve) => {
      switch (item.type) {
        case "openApplication":
          if (window._APP_TYPE_ === 'site') {
            sliderProps = {
              type: "iframe",
              //@ts-ignore
              typeParams: { iframeUrl: item?.iframeUrl },
              placementOptions: { ...item.params, [rowKey]: id },
              width: item.params.width,
              onClose: () => handleCloseSlider(item.params.updateOnCloseSlider)
            }
            sliderService.show(sliderProps)
          } else {
            BX24.openApplication({ ...item.params, [rowKey]: id }, resolve);
          }

          break;
        case "openApplicationPortal":
          // @ts-ignore
          sliderProps = {
            type: "content",
            placementOptions: {
              ...item.params,
              handler: item.params.handler.replace("{id}", id),
              [rowKey]: id,
              route: "portal"
            }
          }
          break;
        case "openPath":
          sliderProps = {
            type: "iframe",
            typeParams: { iframeUrl: item.handler.replace("{id}", id) }
          }
          break;
        case "trigger":
          if (item.params.popup) {
            popupProps.show({ params: item.params, row, handler: item.handler })
          }
          break;
      }
    }).then(() => {
      if (item.params.updateOnCloseSlider && onCloseSlider) {
        onCloseSlider()
      }
    })
  }

  const handleSchemaMutation = (schema: any) => {
    onShemaMutation(schema).then(response => {
      dispatch(schemaSetter(schema))
    })
  }

  const handleRowMutation = (row: TRowItem, key: string, value: any) => {
    if (onRowMutation) {
      onRowMutation({ id: row[rowKey], key, value, entity: slice.entity })
    }
  }

  const checkboxesHandler = useCallback(
    (arr: TRowID[]) => {
      if (gridState) {
        dispatch(checkboxesSetter(arr));
      }
    },
    [checkboxesSetter, dispatch, gridState],
  );

  const handleMetricFilter = (item: IBlockItemMetricFilter) => {
    if (filterSetter && item.params && item.params.url !== null) {
      dispatch(filterSetter(item.params.url))
    }
  }

  const handleMetricLink = (item: IBlockItemMetricLink) => {
    // @ts-ignore
    bxOpen(item.params.type, item.params.link, item.params)
  }

  const handleCloseSlider = (updateOnClose: boolean = true) => {
    sliderService.hide()

    if (updateOnClose && onCloseSlider) {
      onCloseSlider()
    }
  }

  const calcHeight = (gridState?.header?.blocks) ? 190 : 160;

  if (slice.isLoading) return <Loader />;

  return (
    <>
      {notificationContext}
      {(isShowPopup && !!popupAction?.params.popup) && (
        <PopupAction
          {...popupAction.params.popup}
          onClose={popupProps.close}
          onSubmit={(form) => popupProps.handlePopupSubmit({ form, [rowKey]: row[rowKey] })}
          onAfterSubmit={popupProps.afterPopupSubmit}
        />
      )}
      {gridState?.header?.blocks && (
        <Toolbar
          blocks={gridState.header.blocks}
          onMetricFilterClick={handleMetricFilter}
          onMetricLinkClick={handleMetricLink}
        />
      )}
      <Grid
        columns={slice.schema}
        rows={gridState?.grid}
        footer={gridState?.footer}
        height={height || window.innerHeight - calcHeight}
        columnMutation={handleSchemaMutation}
        onChangeCheckboxes={checkboxesHandler}
        onRowMutation={handleRowMutation}
        burgerItems={burgerItems}
        onBurgerItemClick={handleBurgerClick}
        onCellClick={onCellClick}
        pagination={pagination}
      />
    </>
  );
}
