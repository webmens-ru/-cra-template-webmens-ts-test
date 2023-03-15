import { ActionCreatorWithPayload, ThunkDispatch } from "@reduxjs/toolkit";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Grid2 as Grid, Loader, Toolbar } from "@webmens-ru/ui_lib";
import { FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid/types";
import { BurgerItem, TCellItem, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { IBlockItemMetricFilter, IBlockItemMetricLink } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { useCallback, useState } from "react";
import { axiosInst } from "../app/api/baseQuery";
import { useAppDispatch } from "../app/store/hooks";
import { bxOpen } from "../app/utils/bx";
import { IState } from "../pages/mainPlacement";
import PopupAction, { PopupActionProps } from "./PopupAction";

// TODO: Изучить типизацию redux-toolkit
interface IGridWrapperProps {
  slice: Partial<IState>;
  api?: any;
  schemaSetter: ActionCreatorWithPayload<any>;
  checkboxesSetter: ActionCreatorWithPayload<any>;
  filterSetter?: ActionCreatorWithPayload<any>;
  dispatch?: ThunkDispatch<any, any, any>;
  onShemaMutation: MutationTrigger<any>;
  onRowMutation?: MutationTrigger<any>;
  height?: number;
  onCloseSlider?: () => void
  onClosePopup?: () => void
}

export function GridWrapper({ slice, schemaSetter, checkboxesSetter, filterSetter, height, onShemaMutation, onRowMutation, onCloseSlider, onClosePopup }: IGridWrapperProps) {
  const dispatch = useAppDispatch()
  const gridState = slice.grid
  const rowKey = gridState?.options?.key || "id"
  const burgerItems = gridState?.options?.actions || []
  const [isShowPopup, setShowPopup] = useState(false)
  const [popupAction, setPopupAction] = useState<{ row: TRowItem, popup: PopupActionProps, params: any, handler: string } | null>(null)

  const onCellClick = useCallback((cell: TCellItem) => {
    if (process.env.NODE_ENV === "production") {
      console.log(cell);

      switch (cell.type) {
        case "openPath":
          BX24.openPath(cell.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(cell, function () {
            if (cell.updateOnCloseSlider && onCloseSlider) {
              onCloseSlider()
            }
          });
          break;
        case "openLink":
          window.open(cell.link);
          break;
        default:
          break;
      }
    } else if (cell.type === "openLink") {
      window.open(cell.link);
    } else {
      console.log(cell);
    }
  }, [onCloseSlider]);

  const handleBurgerClick = (item: BurgerItem, row: TRowItem) => {
    const rowID = row[rowKey]
    let id = rowID;
    if (typeof rowID == 'object') {
      id = rowID.title;
    }

    new Promise<void>((resolve) => {
      switch (item.type) {
        case "openApplication":
          BX24.openApplication({ ...item.params, [rowKey]: id }, resolve);
          break;
        case "openApplicationPortal":
          // @ts-ignore
          BX24.openApplication({ ...item.params, handler: item.params.handler.replace("{id}", id), [rowKey]: id, route: "portal" }, resolve)
          break;
        case "openPath":
          BX24.openPath(item.handler.replace("{id}", id), resolve)
          break;
        case "trigger":
          if (item.params.popup) {
            setShowPopup(true)
            setPopupAction({ popup: item.params.popup, row, params: item.params, handler: item.handler })
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

  const handlePopupSubmit = (values?: FormValues) => {
    if (popupAction) {
      const body = { [rowKey]: popupAction.row[rowKey], form: values }
      return axiosInst.post(popupAction.handler, body, { responseType: "output" in popupAction.params ? "blob" : "json" })
    } else {
      return Promise.all([])
    }
  }

  const afterPopupSubmit = (response: any) => {
    if (popupAction && popupAction.params.output && response.data) {
      const link = document.createElement("a")
      const title = popupAction.params.output.documentName
      link.href = URL.createObjectURL(new Blob([response.data]))
      link.download = title //TODO: Убрать дату и расширение. Добавить расширение в title
      link.click()
    }

    if (popupAction && popupAction.params.updateOnCloseSlider && onClosePopup) {
      onClosePopup()
    }
  }

  const calcHeight = (gridState?.header?.blocks) ? 190 : 160;

  if (slice.isLoading) return <Loader />;

  return (
    <>
      {(isShowPopup && popupAction) && (
        <PopupAction
          {...popupAction.popup}
          onClose={() => setShowPopup(false)}
          onSubmit={handlePopupSubmit}
          onAfterSubmit={afterPopupSubmit}
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
      />
    </>
  );
}
