import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { Loader } from "../../../../components/loader";
import ResourceTimeLineWrapper from "../../../../components/ResourceTimeLineWrapper";
import useTimelineData from "./useTimelineData";

export default function TimelineView() {
  const dispatch = useAppDispatch();
  const { mainSlice, mainApi } = useAppSelector((state) => state);
  const { settings, data, reload, isLoading } = useTimelineData();

  return (
    <>
      {isLoading && <Loader />}
      <ResourceTimeLineWrapper
        slice={mainSlice}
        events={data?.events}
        resources={data?.resources}
        settings={settings}
      />
    </>
  );
}
