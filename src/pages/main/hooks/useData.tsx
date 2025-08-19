import { useCallback, useEffect } from "react";
import { setCurrentFilter, setFilterResponse, setIsLoading} from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useLazyGetAllFieldsQuery, useLazyGetFieldsQuery, useLazyGetFiltersQuery } from "../mainApi";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";
import { getFilterResponsePost } from "../../../app/utils/postFilterResponse";

interface UseDataProps {
  entity: string
}

export const useData = ({ entity }: UseDataProps) => {
  const { mainSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [getFilters] = useLazyGetFiltersQuery();
  const [getAllFields] = useLazyGetAllFieldsQuery();
  const [getCurrentFiltersFields] = useLazyGetFieldsQuery();

  const init = useCallback(async () => {
    if (!entity) return

    dispatch(setIsLoading(true));

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

    dispatch(setIsLoading(false));
  }, [dispatch, getAllFields, getCurrentFiltersFields, getFilters, mainSlice.currentFilter, entity]);

  useEffect(() => {
    init();
  }, [init]);

  return { isCorrect: !!entity, reload: init };
};
