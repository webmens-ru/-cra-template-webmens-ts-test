import { forwardRef, useImperativeHandle } from "react";
import { Loader } from "../../../../components/loader";
import ResourceTimeLineWrapper from "../../../../components/ResourceTimeLineWrapper";
import useTimelineData from "./useTimelineData";
import { setFilterResponse } from "../../mainSlice";

export const TimelineView = forwardRef(({ entity, parentId }: { entity: string, parentId?: string }, ref) => {
  const { settings, data, reload, isLoading } = useTimelineData({ entity, parentId });

  const handleChangeView = (start: string, end: string) => {
    reload({ start, end })
  }

  useImperativeHandle(ref, () => ({
    reload
  }))

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
        onChangeView={handleChangeView}
      />
    </>
  );
})
