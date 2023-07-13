import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../app/api/baseQuery";

export const mainCardApi = createApi({
  reducerPath: "mainCardApi",
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getPageTitle: build.query<string, any>({
      query: ({ entity, id }) => ({
        url: `${entity}/get-title`,
        params: { id }
      })
    }),
    getActionButtons: build.query({
      query: ({ entity, id }: { entity: string, id: number }) => ({
        url: `${entity}/card-actions`,
        params: { id }
      })
    }),
    submitAction: build.query({
      query: ({ url, data }: { url: string, data: any }) => ({
        url,
        body: data,
        method: "POST"
      })
    })
  }),
});

export const {
  useGetActionButtonsQuery,
  useLazyGetActionButtonsQuery,
  useGetPageTitleQuery
} = mainCardApi;
