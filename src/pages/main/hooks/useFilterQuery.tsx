import { TField } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { useCallback, useMemo } from "react";
import {
  setFilterResponse,
  useAddFieldMutation,
  useDeleteFieldMutation,
  useCreateFilterMutation,
  useUpdateFilterMutation,
  useDeleteFilterMutation,
  useLazyGetFieldsQuery,
  useUpdateFiltersOrderMutation,
  useUpdateFieldMutation,
  useLazyGetGridQuery,
  setIsLoading,
  setGrid,
} from "..";
import { axiosInst } from "../../../app/api/baseQuery";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { getFilterResponse } from "../../../app/utils/filterResponse";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";

export const useFilterQuery = () => {
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
  const [getGrid] = useLazyGetGridQuery();  

  const onSearch = useCallback(
    async (fields: TField[]) => {
      dispatch(setIsLoading(true));
      const filterResponse = getFilterResponse(fields);
      const grid = await getGrid({
        entity: mainSlice.currentTab.params.entity,
        filter: filterResponse,
      });
      
      getFieldsQuery(mainSlice.currentFilter.id);
      dispatch(setFilterResponse(filterResponse));
      dispatch(setGrid(grid.data))
      dispatch(setIsLoading(false));
    },
    [
      dispatch,
      getFieldsQuery,
      getGrid,
      mainSlice.currentFilter,
      mainSlice.currentTab,
    ],
  );

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

  const filters = useMemo<any>(
    () =>
      mainApi.queries[`getFilters("${mainSlice.currentTab.params?.entity}")`]
        ?.data,
    [mainApi.queries, mainSlice.currentTab.params?.entity],
  );

  const f = useMemo<any>(
    () => mainApi.queries[`getFields(${mainSlice.currentFilter?.id})`]?.data,
    [mainApi.queries, mainSlice.currentFilter?.id],
  );
  const all = useMemo<any>(
    () =>
      mainApi.queries[`getAllFields("${mainSlice.currentTab.params?.entity}")`]
        ?.data,
    [mainApi.queries, mainSlice.currentTab.params?.entity],
  );

  const fields = useMemo<any>(() => concatFieldsAndAllFields(f, all), [all, f]);  

  const updateFieldsOrder = async (fields: TField[]) => {
    await axiosInst.post(
      "/admin/ui/filter/filter-field-setting/edit-order",
      fields.filter((f) => f.visible),
    );
  };

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
  };
};
