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
    getFormTitle: build.query({
      query: (entity) => ({
        url: `/admin/ui/entity/view?id=${entity}`,
      }),
    }),
    getFormValues: build.query({
      query: ({entity, id}) => ({
        url: `${entity}/view?id=${id}`,
      }),
    }),
  })
})


export const {
  useGetFormValuesQuery,
  useLazyGetFormValuesQuery,
  useGetFormTitleQuery,
  useGetFormFieldsQuery,
  useGetValidationQuery
} = mainFormApi
