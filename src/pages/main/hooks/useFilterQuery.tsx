import { useCallback, useMemo, useRef } from "react";
import {
  setCurrentFilter as setFilter, setFilterResponse,
  setIsLoading, useAddFieldMutation, useAddFieldsMutation, useCreateFilterMutation, useDeleteFieldMutation, useDeleteFilterMutation,
  useLazyGetFieldsQuery, useUpdateFieldMutation, useUpdateFilterMutation, useUpdateFiltersOrderMutation
} from "..";
import { axiosInst } from "../../../app/api/baseQuery";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";
import { getFilterResponsePost } from "../../../app/utils/postFilterResponse";
import type { TField, TFilter, FilterProps } from "../../../components/filter/types";

export const useFilterQuery = (): FilterProps => {
  const dispatch = useAppDispatch();
  const { mainSlice, mainApi } = useAppSelector((state) => state);
  const [createFilter] = useCreateFilterMutation();
  const [updateFilter] = useUpdateFilterMutation();
  const [deleteFilter] = useDeleteFilterMutation();
  const [updateFiltersOrder] = useUpdateFiltersOrderMutation();
  const [updateFieldMut] = useUpdateFieldMutation();
  const [createField] = useAddFieldMutation();
  const [createFields] = useAddFieldsMutation()
  const [deleteField] = useDeleteFieldMutation();
  const [getFieldsQuery] = useLazyGetFieldsQuery();

  const searchTextRef = useRef<string>("")

  const onSearch = useCallback(async (fields: TField[]) => {
    dispatch(setIsLoading(true));

    const filterResponse = getFilterResponsePost(fields, searchTextRef.current);

    getFieldsQuery(mainSlice.currentFilter.id);
    dispatch(setFilterResponse(filterResponse));
    dispatch(setIsLoading(false));
  }, [dispatch, getFieldsQuery, mainSlice.currentFilter]);

  const updateField = async (field: TField, param: string) => {
    if (param === "hide") {
      deleteField(field.id);
    }
    if (param === "create") {
      createField({
        ...field,
        filterFieldId: -field.id,
        filterId: mainSlice.currentFilter.id,
      });
    }
    if (param === "value") {
      await axiosInst.post(
        `/admin/ui/filter/filter-field-setting/update?id=${field.id}`,
        field,
      );
    }
    if (param === "valueWithRefetch") {
      updateFieldMut(field);
    }
  };

  const addFields = (fields: TField[]) => {
    const queryFields = fields.map(field => ({
      ...fields, filterFieldId:
        -field.id,
      filterId: mainSlice.currentFilter.id
    }))

    createFields(queryFields)
  }

  const setCurrentFilter = (filter: TFilter) => {    
    getFieldsQuery(filter.id).then(response => {
      dispatch(setFilter(filter));
    })
  }

  const filters = useMemo<any>(
    () =>
      mainApi.queries[`getFilters("${mainSlice.currentTab.params?.entity}")`]
        ?.data,
    [mainApi.queries, mainSlice.currentTab.params?.entity],
  );

  const rawFields = useMemo<any>(
    () => mainApi.queries[`getFields(${mainSlice.currentFilter?.id})`]?.data,
    [mainApi.queries, mainSlice.currentFilter?.id],
  );

  const allFields = useMemo<any>(
    () =>
      mainApi.queries[`getAllFields("${mainSlice.currentTab.params?.entity}")`]
        ?.data,
    [mainApi.queries, mainSlice.currentTab.params?.entity],
  );

  const fields = useMemo<any>(() => concatFieldsAndAllFields(rawFields, allFields), [allFields, rawFields]);

  const updateFieldsOrder = async (fields: TField[]) => {
    await axiosInst.post(
      "/admin/ui/filter/filter-field-setting/edit-order",
      fields.filter((f) => f.visible),
    );
  };

  const updateTextSearch = (text: string) => {
    searchTextRef.current = text
  }

  return {
    filters,
    fields,
    createFilter,
    updateFilter,
    deleteFilter,
    updateFiltersOrder,
    updateFieldsOrder,
    updateField,
    addFields,
    onSearch,
    setCurrentFilter,
    updateTextSearch
  };
};
