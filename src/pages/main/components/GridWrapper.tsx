import { Loader, Toolbar } from "@webmens-ru/ui_lib";
import { IListItem } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { useCallback, useMemo } from "react";
import { useSaveSchemaMutation } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { setCheckboxes, setFilterResponse, setSchema } from "../mainSlice";
import { Grid } from "./grid_2/Grid";
import { TCellItem, TRawColumnItem, TRowID } from "./grid_2/types";

export function GridWrapper() {
  const { mainSlice, mainApi } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [schemaMutation] = useSaveSchemaMutation();

  const onCellClick = useCallback((cell: TCellItem) => {
    if (process.env.NODE_ENV === "production") {
      console.log(cell);
      
      switch (cell.type) {
        case "openPath":
          BX24.openPath(cell.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(cell, function() {
            if (cell.updateOnCloseSlider) {
              // dispatch(setTimeSliderOpened(Date.now()))
              // TODO: Сделать функцию в хуке useData по вызову обновления
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
  }, [dispatch]);

  const handleSchemaMutation = (schema: any) => {
    schemaMutation(schema).then(response => {
      dispatch(setSchema(schema))
    })
  }

  const column = useMemo<any>(
    () =>
      mainApi.queries[`getSchema("${mainSlice.currentTab.params?.entity}")`]
        ?.data,
    [mainApi.queries, mainSlice.currentTab.params?.entity],
  );

  const grid = mainSlice.grid  

  const checkboxesHandler = useCallback(
    (arr: TRowID[]) => {
      if (grid) {
        dispatch(setCheckboxes(arr));
      }
    },
    [dispatch, grid],
  );

  const handleToolbarItemClick = (item: IListItem) => {
    if (item.params && item.params.url !== null) {
      dispatch(setFilterResponse(item.params.url))
    }
  }
  

  if (mainSlice.isLoading) return <Loader />;

  return (
    <>
      {grid?.header?.blocks && (
        <Toolbar 
          blocks={grid.header.blocks}
          onItemClick={handleToolbarItemClick}
        />
      )}
      {/* <Grid
        column={column}
        row={grid?.grid}
        footer={grid?.footer}
        height={140}
        columnMutation={handleSchemaMutation}
        isShowCheckboxes
        onChangeCheckboxes={checkboxesHandler}
        onCellClick={onCellClick}
      /> */}
      <Grid 
        columns={column as TRawColumnItem[]}
        rows={grid.grid}
        footer={grid.footer}
        columnMutation={handleSchemaMutation}
        onChangeCheckboxes={checkboxesHandler}
        onBurgerItemClick={console.log}
        onCellClick={onCellClick}
      />
    </>
  );
}
