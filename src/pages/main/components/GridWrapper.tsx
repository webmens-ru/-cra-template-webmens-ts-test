import React, { useCallback, useMemo } from "react";
import { Grid, Loader } from "@webmens-ru/ui_lib";
import { TRowID, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid"; 
import { useSaveSchemaMutation } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { setCheckboxes, setSchema, setTimeSliderOpened, setToolbarFilterResponse } from "../mainSlice";
import { IListItem } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { Toolbar } from "@webmens-ru/ui_lib";

export function GridWrapper() {
  const { mainSlice, mainApi } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [schemaMutation] = useSaveSchemaMutation();

  const onCellClick = useCallback((cell: TRowItem) => {
    if (process.env.NODE_ENV === "production") {
      console.log(cell);
      
      switch (cell.type) {
        case "openPath":
          BX24.openPath(cell.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(cell, function() {
            if (cell.updateOnCloseSlider) {
              dispatch(setTimeSliderOpened(Date.now()))
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
  }, []);

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

  // const grid = useMemo<any>(
  //   () => {
  //     const data = mainApi.queries[
  //       `getGrid({"entity":"${mainSlice.currentTab.params?.entity}","filter":"${mainSlice.filterResponse}"})`
  //     ]?.data;
  //     dispatch(setGrid(data))
  //     return data;
  //   },
  //   [mainApi.queries, mainSlice.currentTab, mainSlice.filterResponse],
  // );

  const grid = mainSlice.grid  

  const checkboxesHandler = useCallback(
    (arr: TRowID[]) => {
      if (grid) {
        // const checkboxes = grid?.grid
        //   ?.filter((row: { id: number }) => arr.includes(row.id))
        //   .map((item: { id: any; whoPays: any }) => ({
        //     id: item.id,
        //     whoPays: item.whoPays,
        //   }));
        dispatch(setCheckboxes(arr));
      }
    },
    [dispatch, grid],
  );

  const handleToolbarItemClick = (item: IListItem) => {
    if (item.params && item.params.url !== null) {
      dispatch(setToolbarFilterResponse(item.params.url))
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
      <Grid
        column={column}
        row={grid?.grid}
        footer={grid?.footer}
        height={140}
        columnMutation={handleSchemaMutation}
        isShowCheckboxes
        onChangeCheckboxes={checkboxesHandler}
        onCellClick={onCellClick}
      />
    </>
  );
}
