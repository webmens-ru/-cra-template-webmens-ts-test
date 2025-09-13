import { useEffect, useMemo } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import type { ResponseOperator } from "../../../../app/utils/postFilterResponse";
import { useGetTimelineSettingsQuery, useLazyGetTimelineDataQuery } from "../../mainApi";

interface UseTimelineDataProps {
  entity: string
  parentId?: string
  period?: {
    start: string
    end: string
  }
}

export default function useTimelineData({ entity, parentId }: UseTimelineDataProps) {
  const { mainSlice } = useAppSelector((state) => state);

  const filter = useMemo(() => parentId ? {
    ...mainSlice.filterResponse,
    parentId: [{
      operator: "=" as ResponseOperator,
      value: parentId
    }]
  } : mainSlice.filterResponse, [mainSlice.filterResponse, parentId])

  const responseSettings = useGetTimelineSettingsQuery({entity}, { refetchOnMountOrArgChange: true });
  const [fetch, responseData] = useLazyGetTimelineDataQuery()

  const reload = (queryPeriod?: UseTimelineDataProps['period']) => {
    fetch({ filter, entity, period: queryPeriod })
  }

  return {
    settings: responseSettings.data,
    data: responseData.data,
    isLoading: responseSettings.isLoading || responseData.isLoading,
    reload,
  };
}
