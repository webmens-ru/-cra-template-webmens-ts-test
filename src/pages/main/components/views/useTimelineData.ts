import { useAppSelector } from "../../../../app/store/hooks";
import { useGetTimelineDataQuery, useGetTimelineSettingsQuery } from "../../mainApi";

export default function useTimelineData() {
  const { mainSlice } = useAppSelector((state) => state);

  const entity = mainSlice.currentTab.params.entity;

  const responseSettings = useGetTimelineSettingsQuery({entity});
  const responseData = useGetTimelineDataQuery(
    {
      entity,
      // @ts-ignore
      filter: mainSlice.filterResponse,
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
