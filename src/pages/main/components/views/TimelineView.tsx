import { forwardRef, useImperativeHandle } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { Loader } from "../../../../components/loader";
import ResourceTimeLineWrapper from "../../../../components/ResourceTimeLineWrapper";
import useTimelineData from "./useTimelineData";

export const TimelineView = forwardRef(({ entity, parentId }: { entity: string, parentId?: string }, ref) => {
  const { mainSlice } = useAppSelector((state) => state);
  const { settings, data, reload, isLoading } = useTimelineData({ entity, parentId });

  useImperativeHandle(ref, () => ({
    reload
  }))

  return (
    <>
      {isLoading && <Loader />}
      <ResourceTimeLineWrapper
        slice={mainSlice}
        events={data?.events}
        resources={data?.resources}
        settings={settings}
        onCloseSlider={reload}
      />
    </>
  );
})
