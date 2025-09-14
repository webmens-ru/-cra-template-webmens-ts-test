import { useEffect, useMemo, useRef } from "react";
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
  const period = useRef<{start: string, end: string} | null>(null)
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
    if (queryPeriod) {
      period.current = queryPeriod
    }

    fetch({ filter, entity, period: queryPeriod })
  }

  useEffect(() => {
    if (period.current) {
      reload(period.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, entity])

  return {
    settings: responseSettings.data,
    data: responseData.data,
    isLoading: responseSettings.isLoading || responseData.isLoading,
    reload,
  };
}
