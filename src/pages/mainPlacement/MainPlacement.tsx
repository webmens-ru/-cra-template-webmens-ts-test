import { useEffect } from "react";
import { setCheckboxes, setEntity, setFilterResponse, setSchema, setTitle, useLazyGetTitleQuery, useSaveSchemaMutation, setParentId } from ".";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { GridWrapper } from "../../components/GridWrapper";
import { TopBar } from "./components/TopBar";
import { usePlacementData } from "./hooks/usePlacementData";

export interface MainPlacementProps {
  entity: string,
  parentId: any
}

export default function MainPlacement({ entity, parentId }: MainPlacementProps) {
  const dispatch = useAppDispatch();
  const { mainPlacementSlice, mainPlacementApi } = useAppSelector((state) => state)  
  const [schemaMutation] = useSaveSchemaMutation()
  const [getTitle] = useLazyGetTitleQuery()
  const { reload } = usePlacementData({ entity, parentId });
  BX24.resizeWindow(window.innerWidth, 850);
  useEffect(() => {
    dispatch(setEntity(entity));
    dispatch(setParentId(parentId));
    getTitle(entity).then((response) => {
      dispatch(setTitle(response.data.name))
    })
  }, [dispatch, entity, getTitle])

  return (
    <>
      <TopBar
        parentId={parentId}
        onCloseSlider={reload}
        onClosePopup={reload}
      />
      <GridWrapper
        slice={mainPlacementSlice}
        api={mainPlacementApi}
        dispatch={dispatch}
        onShemaMutation={schemaMutation}
        checkboxesSetter={setCheckboxes}
        schemaSetter={setSchema}
        filterSetter={setFilterResponse}
        onCloseSlider={reload}
        onClosePopup={reload}
      />
    </>
  );
}
