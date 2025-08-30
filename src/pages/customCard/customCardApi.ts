// customCardApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../app/api/baseQuery";

export const customCardApi = createApi({
  reducerPath: "customCardApi",
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
    }),
    getHelpButton: build.query<{ title: string, params: any }, { entity: string }>({
      query: ({ entity }) => ({
        url: `${entity}/get-help-button`
      })
    }),
    // ДОБАВИМ НОВЫЙ ЭНДПОИНТ ДЛЯ ЦЕНЫ
    getPrice: build.mutation<number | null, { entity: string; data: any }>({
      query: ({ entity, data }) => ({
        url: `${entity}/get-price`,
        method: "POST",
        body: data,
      })
    }),
  }),
});

export const {
  useGetActionButtonsQuery,
  useLazyGetActionButtonsQuery,
  useLazyGetHelpButtonQuery,
  useGetPageTitleQuery,
  useGetPriceMutation
} = customCardApi;