import { useEffect } from "react";
import { setEntity, setParentId, setTitle, useLazyGetTitleQuery } from ".";
import { useAppDispatch } from "../../app/store/hooks";
import { GridWrapper } from "./components/GridWrapper";
import { TopBar } from "./components/TopBar";
import { usePlacementData } from "./hooks/usePlacementData";

export interface MainPlacementProps {
  entity: string,
  parentId: any
}

export default function MainPlacement({ entity, parentId }: MainPlacementProps) {
  const dispatch = useAppDispatch();
  const [getTitle] = useLazyGetTitleQuery()
  usePlacementData({ entity, parentId });

  useEffect(() => {
    dispatch(setParentId(parentId));
  }, [dispatch, parentId]);

  useEffect(() => {
    dispatch(setEntity(entity));
    getTitle(entity).then((response) => {
      dispatch(setTitle(response.data.name))
    })
  }, [dispatch, entity, getTitle])

  return (
    <>
      <TopBar />
      <GridWrapper />
    </>
  );
}
