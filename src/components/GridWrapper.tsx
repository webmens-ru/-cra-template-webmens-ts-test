import { ActionCreatorWithPayload, ThunkDispatch } from "@reduxjs/toolkit";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Grid2 as Grid, Loader, Toolbar } from "@webmens-ru/ui_lib";
import { FormValues } from "@webmens-ru/ui_lib/dist/components/form/types";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid/types";
import { BurgerItem, TCellItem, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { IBlockItemMetricFilter, IBlockItemMetricLink } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { useCallback, useMemo, useState } from "react";
import { axiosInst } from "../app/api/baseQuery";
import { bxOpen } from "../app/utils/bx";
import { IState } from "../pages/mainPlacement";
import PopupAction, { PopupActionProps } from "./PopupAction";

// TODO: Изучить типизацию redux-toolkit
interface IGridWrapperProps {
  slice: Partial<IState>;
  api: any;
  schemaSetter: ActionCreatorWithPayload<any>;
  checkboxesSetter: ActionCreatorWithPayload<any>;
  filterSetter: ActionCreatorWithPayload<any>;
  dispatch: ThunkDispatch<any, any, any>;
  onShemaMutation: MutationTrigger<any>;
  onCloseSlider?: () => void
}

export function GridWrapper({ slice, api, schemaSetter, checkboxesSetter, filterSetter, dispatch, onShemaMutation, onCloseSlider }: IGridWrapperProps) {
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

    new Promise<void>((resolve) => {
      switch (item.type) {
        case "openApplication":
          BX24.openApplication({ ...item.params, [rowKey]: rowID }, resolve);
          break;
        case "openApplicationPortal":
          // @ts-ignore
          BX24.openApplication({ ...item.params, handler: item.params.handler.replace("{id}", rowID), [rowKey]: rowID, route: "portal" }, resolve)
          break;
        case "openPath":
          BX24.openPath(item.handler.replace("{id}", rowID), resolve)
          break;
        case "trigger":
          console.log(item.params);

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

  const column = useMemo<any>(
    () =>
      api.queries[`getSchema("${slice.entity}")`]
        ?.data,
    [api.queries, slice.entity],
  );

  const checkboxesHandler = useCallback(
    (arr: TRowID[]) => {
      if (gridState) {
        dispatch(checkboxesSetter(arr));
      }
    },
    [checkboxesSetter, dispatch, gridState],
  );

  const handleMetricFilter = (item: IBlockItemMetricFilter) => {
    if (item.params && item.params.url !== null) {
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
      axiosInst.post(popupAction.handler, body, { responseType: "output" in popupAction.params ? "blob" : "json" }).then(response => {
        if (popupAction.params.output && response.data) {
          const link = document.createElement("a")
          const title = popupAction.params.output.documentName
          link.href = URL.createObjectURL(new Blob([response.data]))
          link.download = title //TODO: Убрать дату и расширение. Добавить расширение в title
          link.click()
        }
      })
    }
  }

  const height = (gridState?.header?.blocks) ? 190 : 160;

  if (slice.isLoading) return <Loader />;

  return (
    <>
      {(isShowPopup && popupAction) && (
        <PopupAction
          {...popupAction.popup}
          onClose={() => setShowPopup(false)}
          onSubmit={handlePopupSubmit}
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
        columns={column}
        rows={gridState?.grid}
        footer={gridState?.footer}
        height={window.innerHeight - height}
        columnMutation={handleSchemaMutation}
        onChangeCheckboxes={checkboxesHandler}
        burgerItems={burgerItems}
        // TODO: Убрать после обновления библиотеки
        onBurgerItemClick={handleBurgerClick as unknown as any}
        onCellClick={onCellClick}
      />
    </>
  );
}
