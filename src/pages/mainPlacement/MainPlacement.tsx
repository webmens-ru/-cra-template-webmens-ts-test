import React, { useEffect } from "react";
import { Loader } from "@webmens-ru/ui_lib";
import { GridWrapper } from "./components/GridWrapper";
import { TopBar } from "./components/TopBar";
import { useData } from "./hooks/useData";
import { useAppDispatch } from "../../app/store/hooks";
import { setEntity, setTitle, setParentId } from ".";
import { useLazyGetTitleQuery } from ".";

export interface MainPlacementProps {
  entity: string,
  parentId: any
}

export default function MainPlacement({ entity, parentId}: MainPlacementProps) {
  const dispatch = useAppDispatch();
  const [getTitle] = useLazyGetTitleQuery()
  useData({entity, parentId});

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
