import { useCallback, useLayoutEffect, useMemo } from "react";
import { setCurrentFilter, setIsLoading } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";
import { getFilterResponsePost, PostFilterResponseFields } from "../../../app/utils/postFilterResponse";
import { useLazyGetAllFieldsQuery, useLazyGetFieldsQuery, useLazyGetFiltersQuery, useLazyGetGridPostQuery, useLazyGetGridQuery, useLazyGetSchemaQuery } from "../mainApi";
import { setGrid, setSchema } from "../mainSlice";

export const useData = () => {
  const { mainSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [getFilters] = useLazyGetFiltersQuery();
  const [getAllFields] = useLazyGetAllFieldsQuery();
  const [getSchema] = useLazyGetSchemaQuery();
  const [getCurrentFiltersFields] = useLazyGetFieldsQuery();
  const [getGrid] = useLazyGetGridQuery();
  const [getGridPost] = useLazyGetGridPostQuery()

  const isCorrect = useMemo(() => {
    return (
      "params" in mainSlice.currentTab &&
      "menuId" in mainSlice.currentTab.params &&
      "entity" in mainSlice.currentTab.params
    );
  }, [mainSlice.currentTab]);

  const init = useCallback(async () => {
    dispatch(setIsLoading(true));
    if (isCorrect) {
      const entity = mainSlice.currentTab.params.entity;
      let currentFilter;
      let currentFields;

      const [filters, allFields, schema] = await Promise.all([
        getFilters(entity),
        getAllFields(entity),
        getSchema(entity),
      ]);

      if (filters.data) {
        currentFilter =
          filters.data.find((f) => Boolean(f.visible)) || filters.data[0];
      }

      if (currentFilter && "id" in currentFilter) {
        dispatch(setCurrentFilter(currentFilter));
        currentFields = await getCurrentFiltersFields(currentFilter.id);
      }

      if (currentFields) {
        const correctFields = concatFieldsAndAllFields(
          currentFields.data,
          allFields.data,
        ).filter((f) => Boolean(f.visible));

        const filterResponse = getFilterResponsePost(correctFields);
        const grid = await getGridPost({
          entity,
          filter: ((mainSlice.filterResponse !== null && mainSlice.filterResponse !== undefined) ? mainSlice.filterResponse : filterResponse) as PostFilterResponseFields,
        });

        dispatch(setSchema(schema.data))
        dispatch(setGrid(grid.data))
      }
    }
    dispatch(setIsLoading(false));
  }, [dispatch, getAllFields, getCurrentFiltersFields, getFilters, getGridPost, getSchema, isCorrect, mainSlice.currentTab.params, mainSlice.filterResponse]);

  useLayoutEffect(() => {
    init();
  }, [init]);

  return { isCorrect, reload: init };
};
