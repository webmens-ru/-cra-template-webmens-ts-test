import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../app/api/baseQuery';

export const visitorApi = createApi({
  reducerPath: "visitorApi",
  baseQuery,
  endpoints: (build) => ({
    getForm: build.query({
      query: (visitorId) => `visitor-form/view?id=${visitorId}`
    })
  })
})

export const {
  useGetFormQuery
} = visitorApi
