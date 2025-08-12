import { useEffect } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { useGetGridPostQuery, useGetSchemaQuery } from "../../mainApi";
import { useDispatch } from "react-redux";
import { setGrid, setSchema } from "../../mainSlice";

export default function useTimelineData() {
  const { mainSlice } = useAppSelector((state) => state);
  const dispatch = useDispatch();

  const entity = mainSlice.currentTab.params.entity;

  const responseSchema = useGetSchemaQuery(entity);
  const responseData = useGetGridPostQuery(
    {
      entity,
      // @ts-ignore
      filter: mainSlice.filterResponse,
      pagination: mainSlice.pagination,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (responseSchema.isSuccess && responseData.isSuccess) {
      dispatch(setSchema(responseSchema.data));
      dispatch(setGrid(responseData.data));
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
