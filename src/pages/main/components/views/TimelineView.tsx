import { useAppSelector } from "../../../../app/store/hooks";
import ResourceTimeLineWrapper from "../../../../components/ResourceTimeLineWrapper";

export default function TimelineView() {
  const { mainSlice, mainApi } = useAppSelector((state) => state);

  return (
    <ResourceTimeLineWrapper slice={mainSlice} />
  )
}