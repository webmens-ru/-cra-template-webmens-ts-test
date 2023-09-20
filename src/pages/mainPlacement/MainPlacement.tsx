import { useEffect } from "react";
import { setCheckboxes, setEntity, setFilterResponse, setParentId, setSchema, setTitle, useLazyGetTitleQuery, useSaveSchemaMutation } from ".";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { GridWrapper } from "../../components/GridWrapper";
import { TopBar } from "./components/TopBar";
import { usePlacementData } from "./hooks/usePlacementData";
import {MainContainer, setPage} from "../main";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";

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
  
  if (process.env.NODE_ENV === "production" && window._APP_TYPE_ != 'site') {
    BX24.resizeWindow(window.innerWidth, 850);
  }

  useEffect(() => {
    dispatch(setEntity(entity));
    dispatch(setParentId(parentId));
    getTitle(entity).then((response) => {
      dispatch(setTitle(response?.data.name))
    })
  }, [dispatch, entity, getTitle, parentId])

  return (
      <>
        {parentId ? (
            <>
              <TopBar
                  parentId={parentId}
                  onCloseSlider={reload}
                  onClosePopup={reload}
              />
              <GridWrapper
                  slice={mainPlacementSlice}
                  api={mainPlacementApi}
                  onShemaMutation={schemaMutation}
                  checkboxesSetter={setCheckboxes}
                  schemaSetter={setSchema}
                  filterSetter={setFilterResponse}
                  onCloseSlider={reload}
                  onClosePopup={reload}
              />
            </>
        ) : (
            <MainContainer>
              <img src={webmensLogo} alt="webmens logo" />
            </MainContainer>
        )}
      </>

  );
}
