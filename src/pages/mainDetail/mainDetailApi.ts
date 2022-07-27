import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../app/api/baseQuery";

export const mainDetailApi = createApi({
  reducerPath: "mainDetailApi",
  tagTypes: ["Schema"],
  baseQuery,
  endpoints: (build) => ({
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
    getGrid: build.query({
      query: ({entity, body}) => ({
        url: `${entity}/data`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazyGetSchemaQuery,
  useLazyGetGridQuery,
  useSaveSchemaMutation,
} = mainDetailApi;
