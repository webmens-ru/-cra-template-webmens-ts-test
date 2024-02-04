import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Grid2 as Grid, Loader, Toolbar, useNotification } from "@webmens-ru/ui_lib";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid/types";
import { BurgerItem, TCellItem, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { IBlockItemMetricFilter, IBlockItemMetricLink } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { useCallback, useMemo } from "react";
import useNavigation from "../app/hooks/useNavigation";
import usePopupHandler from "../app/hooks/usePopupHandler";
import { useAppDispatch } from "../app/store/hooks";
import { bxOpen } from "../app/utils/bx";
import { IState } from "../pages/mainPlacement";
import PopupAction from "./PopupAction";
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
  const navigate = useNavigation()
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
    navigate({
      type: cell.type,
      url: cell.type === "openApplication" ? cell.iframeUrl : cell.link,
      params: cell,
      width: cell.bx24_width,
      onCloseSlider: () => handleCloseSlider(cell.updateOnCloseSlider)
    })
  }

  const handleBurgerClick = (item: BurgerItem, row: TRowItem) => {
    const rowID = row[rowKey] as { title: string } | string
    const id = typeof rowID === "object" ? rowID?.title : rowID;

    if (item.type === "trigger" && item.params.popup) {
      popupProps.show({ params: item.params, row, handler: item.handler })
      return
    }

    navigate({
      type: item.type,
      url: item.type === "openApplication" ? item.iframeUrl : item.handler.replace("{id}", id),
      params: {
        ...item.params,
        [rowKey]: id,
        handler: item.type === "openApplicationPortal" ? item.params.handler.replace("{id}", id) : undefined
      },
      // @ts-ignore
      width: item.params.width,
      onCloseSlider: () => handleCloseSlider(item.params.updateOnCloseSlider)
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
          onSubmit={(form) => popupProps.handlePopupSubmit({ form, [rowKey]: popupAction.row ? popupAction?.row[rowKey] : undefined })}
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
