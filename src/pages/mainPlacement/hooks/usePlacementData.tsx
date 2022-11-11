import { useCallback, useLayoutEffect } from "react";
import { setCurrentFilter, setIsLoading } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { getFilterResponse } from "../../../app/utils/filterResponse";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";
import { getFilterResponsePost, PostFilterResponseFields } from "../../../app/utils/postFilterResponse";
import {
  useLazyGetAllFieldsQuery, useLazyGetFieldsQuery, useLazyGetFiltersQuery, useLazyGetGridPostQuery, useLazyGetGridQuery, useLazyGetSchemaQuery
} from "../mainPlacementApi";
import { setGrid, setSchema } from "../mainPlacementSlice";

export const usePlacementData = ({ entity, parentId }: { entity: string, parentId: any }) => {
  
  const { mainPlacementSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [getFilters] = useLazyGetFiltersQuery();
  const [getAllFields] = useLazyGetAllFieldsQuery();
  const [getSchema] = useLazyGetSchemaQuery();
  const [getCurrentFiltersFields] = useLazyGetFieldsQuery();
  const [getGridPost] = useLazyGetGridPostQuery();

  const init = useCallback(async () => {
    dispatch(setIsLoading(true));
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

      // const filterResponse = {
      //   ...getFilterResponsePost(correctFields),
      //   parentId: {
      //     operator: "=",
      //     value: "parentId"
      //   } 
      // } as PostFilterResponseFields;
      
      const filterResponse = getFilterResponsePost(correctFields);
      const grid = await getGridPost({
        entity,
        filter: {
          ...filterResponse,
          parentId: [{
                operator: "=",
                value: parentId
              }]
        } as PostFilterResponseFields,
      });

      dispatch(setSchema(schema.data))
      dispatch(setGrid(grid.data))
    }
    dispatch(setIsLoading(false));
  }, [dispatch, entity, getAllFields, getCurrentFiltersFields, getFilters, getGridPost, getSchema, mainPlacementSlice.filterResponse, parentId]);

  useLayoutEffect(() => {
    init();
  }, [init]);

  return {reload: init };
};
