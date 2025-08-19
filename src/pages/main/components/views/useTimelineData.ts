import { useAppSelector } from "../../../../app/store/hooks";
import type { ResponseOperator } from "../../../../app/utils/postFilterResponse";
import { useGetTimelineDataQuery, useGetTimelineSettingsQuery } from "../../mainApi";

export default function useTimelineData({ entity, parentId }: { entity: string, parentId?: string }) {
  const { mainSlice } = useAppSelector((state) => state);

  const filter = parentId ? {
    ...mainSlice.filterResponse,
    parentId: [{
      operator: "=" as ResponseOperator,
      value: parentId
    }]
  } : mainSlice.filterResponse

  const responseSettings = useGetTimelineSettingsQuery({entity});
  const responseData = useGetTimelineDataQuery(
    {
      entity,
      filter,
    },
    { refetchOnMountOrArgChange: true }
  );

  return {
    settings: responseSettings.data,
    data: responseData.data,
    isLoading: responseSettings.isLoading || responseData.isLoading,
    reload: responseData.refetch,
  };
}
