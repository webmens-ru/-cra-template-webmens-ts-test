import { createApi } from "@reduxjs/toolkit/query/react";
import { TSelectDynamicItem } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { PaginationProps } from "@webmens-ru/ui_lib/dist/components/grid/components/pagination";
import { TRowItem } from '@webmens-ru/ui_lib/dist/components/grid/types/index';
import { baseQuery } from "../../app/api/baseQuery";
import { PostFilterResponseFields } from './../../app/utils/postFilterResponse';

export const mainApi = createApi({
  reducerPath: "mainApi",
  tagTypes: ["Tabs", "Filter", "Field", "Schema"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getTabs: build.query({
      query: (menuId: number) => ({
        url: `admin/ui/menu/menu-item/items?menuId=${menuId}`,
      }),
    }),
    setTabs: build.mutation({
      query: (tabs) => ({
        url: "admin/ui/menu/menu-item-personal-settings/save-items",
        method: "POST",
        body: tabs,
      }),
    }),
    getFilters: build.query({
      query: (entity) => ({
        url: `admin/ui/filter/filter/items?entity=${entity}`,
      }),
      transformResponse: (data: any[]) => {
        return data.map((item: any) => ({
          ...item,
          visible: item.isName === 1,
        }));
      },
      providesTags: ["Filter"],
    }),
    createFilter: build.mutation({
      query: (newFilter) => ({
        url: "admin/ui/filter/filter/create",
        method: "POST",
        body: newFilter,
      }),
      invalidatesTags: ["Filter"],
    }),
    updateFilter: build.mutation({
      query: (filter) => ({
        url: `admin/ui/filter/filter/update?id=${filter.id}`,
        method: "POST",
        body: { title: filter.title },
      }),
      invalidatesTags: ["Filter"],
    }),
    getFields: build.query({
      query: (id) => ({
        url: `admin/ui/filter/filter/fields-settings?filterId=${id}`,
      }),
      providesTags: ["Field"],
    }),
    getAllFields: build.query({
      query: (entity) => ({
        url: `admin/ui/filter/filter/fields?entity=${entity}`,
      }),
    }),
    deleteFilter: build.mutation({
      query: (id) => ({
        url: `admin/ui/filter/filter/delete?id=${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Filter"],
    }),
    updateFiltersOrder: build.mutation({
      query: (newFiltersArray) => ({
        url: `admin/ui/filter/filter/edit-order`,
        method: "POST",
        body: newFiltersArray,
      }),
      invalidatesTags: ["Filter"],
    }),
    updateField: build.mutation({
      query: (filter) => ({
        url: `/admin/ui/filter/filter-field-setting/update?id=${filter.id}`,
        method: "POST",
        body: filter,
      }),
      invalidatesTags: ["Field"],
    }),
    addField: build.mutation({
      query: (body) => ({
        url: `admin/ui/filter/filter-field-setting/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Field"],
    }),
    deleteField: build.mutation({
      query: (id) => ({
        url: `admin/ui/filter/filter-field-setting/delete?id=${id}`,
      }),
      invalidatesTags: ["Field"],
    }),
    getSchema: build.query({
      query: (entity) => ({
        url: `admin/ui/grid/grid-column/schema?entity=${entity}`,
      }),
      providesTags: ["Schema"],
    }),
    saveSchema: build.mutation({
      query: (data) => ({
        url: `admin/ui/grid/grid-column-personal/save-schema`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Schema"],
    }),
    getGrid: build.query<{header: any[], grid: TRowItem[], footer: TRowItem[]}, { entity: string, filter: string }>({
      query: (params) => ({
        url: `${params.entity}/data?${params.filter}`,
      }),
    }),
    editRow: build.mutation<any, { entity: string, id: string | number, key: string, value: any }>({
      query: ({ entity, id, key, value }) => ({
        url: `${entity}/edit-row`,
        method: "POST",
        body: { id, [key]: value }
      }),      
    }),
    getGridPost: build.query<{header: any[], grid: TRowItem[], footer: TRowItem[], pagination: PaginationProps}, { entity: string, filter: PostFilterResponseFields, pagination?: PaginationProps }>({
      query: (params) => ({
        url: `${params.entity}/data`,
        params: { page: params.pagination?.currentPage, perPage: params.pagination?.perPage },
        method: "POST",
        body: {'filter': params.filter}
      })
    }),
    getDynamicSelectItems: build.query<TSelectDynamicItem[], string>({
      query: (code) => ({
        url: `select-dinamic/get-list?name=${code}`
      })
    }),
    getDynamicButtonItems: build.query<{ label: string, title: string }[], { entity: string, parentId?: string | number }>({
      query: ({ entity, parentId }) => ({
        // url: `/admin/ui/grid/action/entity-actions?entity=${entity}`
        url: `/${entity}/grid-actions`,
        params: { parentId }
      })
    }),
    sendDataOnButtonClick: build.mutation({
      query: ({ url, body }) => ({
        url,
        method: "POST",
        body,
      }),
    }),
    getButtonAdd: build.query<{title: string, params: any, items: any, dropdownWidth?: string}, {entity: string, parentId:string | number | undefined}>({
      query: ({entity, parentId}) => ({
        url: `${entity}/get-button-add`,
        method: "POST",
        body: {"parentId": parentId}
      }),
    }),
    getHelpButton: build.query<{ title: string, params: any }, { entity: string }>({
      query: ({ entity }) => ({
        url: `${entity}/get-help-button`
      })
    })
  }),
});

export const {
  useLazyGetTabsQuery,
  useSetTabsMutation,
  useLazyGetFiltersQuery,
  useCreateFilterMutation,
  useUpdateFilterMutation,
  useLazyGetFieldsQuery,
  useLazyGetAllFieldsQuery,
  useUpdateFiltersOrderMutation,
  useDeleteFilterMutation,
  useUpdateFieldMutation,
  useAddFieldMutation,
  useDeleteFieldMutation,
  useLazyGetSchemaQuery,
  useSaveSchemaMutation,
  useLazyGetGridQuery,
  useLazyGetGridPostQuery,
  useLazyGetDynamicSelectItemsQuery,
  useSendDataOnButtonClickMutation,
  useLazyGetDynamicButtonItemsQuery,
  useLazyGetButtonAddQuery,
  useEditRowMutation,
  useLazyGetHelpButtonQuery
} = mainApi;
