import { useCallback, useEffect, useMemo } from "react";
import { setCurrentFilter, setFilterResponse, setIsLoading} from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useLazyGetAllFieldsQuery, useLazyGetFieldsQuery, useLazyGetFiltersQuery } from "../mainApi";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";
import { getFilterResponsePost } from "../../../app/utils/postFilterResponse";

export const useData = () => {
  const { mainSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [getFilters] = useLazyGetFiltersQuery();
  const [getAllFields] = useLazyGetAllFieldsQuery();
  const [getCurrentFiltersFields] = useLazyGetFieldsQuery();

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

      const [filters, allFields] = await Promise.all([
        getFilters(entity),
        getAllFields(entity),
      ]);

      if (filters.data) {
        currentFilter = (Object.keys(mainSlice.currentFilter).length === 0 ? undefined : mainSlice.currentFilter) || filters.data.find((f) => Boolean(f.visible)) || filters.data[0];
      }
      
      if (currentFilter && "id" in currentFilter) {
        dispatch(setCurrentFilter(currentFilter));
        currentFields = await getCurrentFiltersFields(currentFilter.id);

        const fields = concatFieldsAndAllFields(currentFields.data, allFields.data)
        const visibleFields = fields.filter((field) => !!field.visible)
        const filterResponse = getFilterResponsePost(visibleFields)
    
        dispatch(setFilterResponse(filterResponse))
      }
    }
    dispatch(setIsLoading(false));
  }, [dispatch, getAllFields, getCurrentFiltersFields, getFilters, isCorrect, mainSlice.currentFilter, mainSlice.currentTab.params?.entity]);

  useEffect(() => {
    init();
  }, [init]);

  return { isCorrect, reload: init };
};
