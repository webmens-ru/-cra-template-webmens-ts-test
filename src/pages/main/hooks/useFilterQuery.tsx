import { TField, TFilter, TProps } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { useCallback, useMemo, useRef } from "react";
import {
  setCurrentFilter as setFilter, setFilterResponse,
  setIsLoading, useAddFieldMutation, useCreateFilterMutation, useDeleteFieldMutation, useDeleteFilterMutation,
  useLazyGetFieldsQuery, useUpdateFieldMutation, useUpdateFilterMutation, useUpdateFiltersOrderMutation
} from "..";
import { axiosInst } from "../../../app/api/baseQuery";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";
import { getFilterResponsePost } from "../../../app/utils/postFilterResponse";

export const useFilterQuery = (): TProps => {
  const dispatch = useAppDispatch();
  const { mainSlice, mainApi } = useAppSelector((state) => state);
  const [createFilter] = useCreateFilterMutation();
  const [updateFilter] = useUpdateFilterMutation();
  const [deleteFilter] = useDeleteFilterMutation();
  const [updateFiltersOrder] = useUpdateFiltersOrderMutation();
  const [updateFieldMut] = useUpdateFieldMutation();
  const [createField] = useAddFieldMutation();
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

  const updateField = async (filter: TField, param: string) => {
    if (param === "hide") {
      deleteField(filter.id);
    }
    if (param === "create") {
      createField({
        ...filter,
        filterFieldId: -filter.id,
        filterId: mainSlice.currentFilter.id,
      });
    }
    if (param === "value") {
      await axiosInst.post(
        `/admin/ui/filter/filter-field-setting/update?id=${filter.id}`,
        filter,
      );
    }
    if (param === "valueWithRefetch") {
      updateFieldMut(filter);
    }
  };

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
    onSearch,
    setCurrentFilter,
    updateTextSearch
  };
};
