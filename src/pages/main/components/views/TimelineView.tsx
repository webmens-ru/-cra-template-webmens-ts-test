import { forwardRef, useImperativeHandle } from "react";
import { Loader } from "../../../../components/loader";
import ResourceTimeLineWrapper from "../../../../components/ResourceTimeLineWrapper";
import useTimelineData from "./useTimelineData";
import { setFilterResponse } from "../../mainSlice";
import type { TimelineResource } from "../../../../components/resourceTimeLine/types" //"../../../../components/ResourceTimeLineWrapper/types";

export const TimelineView = forwardRef(({ entity, parentId }: { entity: string, parentId?: string }, ref) => {
  const { settings, data, reload, isLoading } = useTimelineData({ entity, parentId });

  useImperativeHandle(ref, () => ({
    reload
  }))
    const handleResourceClick = (resource: TimelineResource) => {
        // Здесь можно реализовать логику, например, открыть слайдер с деталями ресурса
        console.log('Resource clicked:', resource);
        // Например: navigateToResourceDetails(resource.id);
    };

  return (
    <>
      {isLoading && <Loader />}
      <ResourceTimeLineWrapper
        parentId={parentId}
        filterSetter={setFilterResponse}
        header={data?.header}
        events={data?.events}
        resources={data?.resources}
        options={data?.options}
        settings={settings}
        onCloseSlider={reload}
        onResourceClick={handleResourceClick}
      />
    </>
  );
})
