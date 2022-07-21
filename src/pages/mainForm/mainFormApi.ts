import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../app/api/baseQuery';

export const mainFormApi: any = createApi({
  reducerPath: "mainFormApi",
  baseQuery,
  endpoints: (build) => ({
    getFormFields: build.query({
      query: (entity) => ({
        url: `${entity}/get-form-fields`,
      }),
    }),
    getValidation: build.query({
      query: (entity) => ({
        url: `${entity}/validation`,
      }),
    }),
  })
})


export const {
  useGetFormFieldsQuery,
  useGetValidationQuery
} = mainFormApi
