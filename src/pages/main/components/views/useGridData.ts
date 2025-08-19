import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { useGetGridPostQuery, useGetSchemaQuery } from "../../mainApi";
import { setGrid, setPagination, setSchema } from "../../mainSlice";
import type { ResponseOperator } from "../../../../app/utils/postFilterResponse";

export default function useGridData({ entity, parentId }: { entity: string, parentId?: string }) {
  const { mainSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const filter = parentId ? {
    ...mainSlice.filterResponse,
    parentId: [{
      operator: "=" as ResponseOperator,
      value: parentId
    }]
  } : mainSlice.filterResponse

  const responseSchema = useGetSchemaQuery(entity);
  const responseData = useGetGridPostQuery(
    {
      entity,
      filter,
      pagination: mainSlice.pagination,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (responseSchema.isSuccess && responseData.isSuccess) {
      dispatch(setSchema(responseSchema.data));
      dispatch(setGrid(responseData.data));
      
      if (responseData.data.pagination) {
        dispatch(setPagination(responseData.data.pagination))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, responseSchema.isSuccess, responseData.isSuccess]);

  return {
    schema: responseSchema.data,
    data: responseData.data,
    isLoading: responseSchema.isLoading || responseData.isLoading,
    reload: responseData.refetch,
  };
}
