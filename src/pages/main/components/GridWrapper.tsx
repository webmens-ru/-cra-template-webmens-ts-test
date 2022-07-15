import React, { useCallback, useMemo } from "react";
import { Grid, Loader } from "@webmens-ru/ui_lib";
import { TRowItem } from "@webmens-ru/ui_lib/dist/components/grid/types";
import { useSaveSchemaMutation } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { setCheckboxes } from "../mainSlice";

export function GridWrapper() {
  const { mainSlice, mainApi } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [schemaMutation] = useSaveSchemaMutation();

  const onCellClick = useCallback((cell: TRowItem) => {
    if (process.env.NODE_ENV === "production") {
      switch (cell.type) {
        case "openPath":
          BX24.openPath(cell.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(cell);
          break;
        default:
          break;
      }
    } else {
      console.log(cell);
    }
  }, []);

  const column = useMemo<any>(
    () =>
      mainApi.queries[`getSchema("${mainSlice.currentTab.params?.entity}")`]
        ?.data,
    [mainApi.queries, mainSlice.currentTab.params?.entity],
  );

  const grid = useMemo<any>(
    () =>
      mainApi.queries[
        `getGrid({"entity":"${mainSlice.currentTab.params?.entity}","filter":"${mainSlice.filterResponse}"})`
      ]?.data,
    [mainApi.queries, mainSlice.currentTab, mainSlice.filterResponse],
  );

  const checkboxesHandler = useCallback(
    (arr: number[]) => {
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

  if (mainSlice.isLoading) return <Loader />;

  return (
    <Grid
      column={column}
      row={grid?.grid}
      footer={grid?.footer}
      height={140}
      columnMutation={schemaMutation}
      isShowCheckboxes
      onChangeCheckboxes={checkboxesHandler}
      onCellClick={onCellClick}
    />
  );
}
