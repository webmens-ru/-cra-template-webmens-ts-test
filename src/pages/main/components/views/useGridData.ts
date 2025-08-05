import { useCallback, useEffect } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { useLazyGetGridPostQuery, useLazyGetSchemaQuery } from "../../mainApi";
import { setSchema, setGrid, setPagination } from "../../mainSlice";
import { useDispatch } from "react-redux";

export default function useGridData() {
  const dispatch = useDispatch();
  const [getSchema] = useLazyGetSchemaQuery();
  const [getGridPost] = useLazyGetGridPostQuery();

  const { mainSlice } = useAppSelector((state) => state);
  const entity = mainSlice.currentTab.params.entity;

  const getGridData = useCallback(async () => {
    const grid = await getGridPost({
      entity,
      // @ts-ignore
      filter: mainSlice.filterResponse,
      pagination: mainSlice.pagination,
    });

    dispatch(setGrid(grid.data));
    dispatch(setPagination(grid.data?.pagination));
  }, [
    dispatch,
    entity,
    getGridPost,
    mainSlice.filterResponse,
    mainSlice.pagination,
  ]);

  const init = useCallback(async () => {
    const [schema] = await Promise.all([getSchema(entity), getGridData()]);

    dispatch(setSchema(schema.data));
  }, [dispatch, entity, getGridData, getSchema]);

  useEffect(() => {
    init();
  }, [init]);

  return {
    reload: getGridData,
  };
}
