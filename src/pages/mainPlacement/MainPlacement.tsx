import React, { useEffect } from "react";
import { Loader, Menu } from "@webmens-ru/ui_lib";
import { GridWrapper } from "./components/GridWrapper";
import { TopBar } from "./components/TopBar";
import { useData } from "./hooks/useData";
import { MainContainer } from "./mainStyle";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { setEntity, setTitle, setParentId } from ".";
import { useGetTitleQuery } from ".";

export interface MainPlacementProps {
  entity: string,
  parentId: any
}



export default function MainPlacement({ entity, parentId}: MainPlacementProps) {
  const dispatch = useAppDispatch();
  const { mainPlacementSlice } = useAppSelector((state) => state);
  const title = useGetTitleQuery(entity);
  dispatch(setParentId(parentId));
  dispatch(setEntity(entity));
  useEffect(() => {
    dispatch(setTitle(title.data?.name));
  }, [title]);

  useData({entity, parentId});
  return (
    <>
      <TopBar />
      <GridWrapper />
    </>
  );
}
