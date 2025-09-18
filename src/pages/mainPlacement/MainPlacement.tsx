import {  useAppSelector } from "../../app/store/hooks";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";
import { MainStartScreen, useGetTitleQuery } from "../main";
import { useData } from "../main/hooks/useData";
import { GridView } from "../main/components/views/GridView";
import type { ViewMode } from "../../app/model/query";
import { TopBar } from "../main/components/TopBar";
import { useRef } from "react";
import { TimelineView } from "../main/components/views/TimelineView";
import { MainPlacementContainer, MainPlacementContent } from "./mainStyle";

export interface MainPlacementProps {
  entity: string,
  parentId: any,
  viewMode: ViewMode
}

export default function MainPlacement({ entity, parentId, viewMode }: MainPlacementProps) {
  const { mainSlice } = useAppSelector((state) => state)
  // TODO: Лучше брать из placementOptions
  const { data: titleData } = useGetTitleQuery(entity)
  useData({ entity });

  const viewRef = useRef<{ reload: () => void }>(null);

  const handleReload = () => {
    viewRef.current?.reload();
  };

  if (process.env.NODE_ENV === "production" && window._APP_TYPE_ !== 'site') {
    BX24.resizeWindow(window.innerWidth, 750);
  }

  const renderContentView = () => {
    if (!mainSlice.isLoading && mainSlice.filterInited) {
      switch (viewMode) {
        case 'grid':
          return <GridView ref={viewRef} entity={entity} parentId={parentId} />
        case 'resource-timeline':
          return <TimelineView ref={viewRef} entity={entity} parentId={parentId} />
        default: 
          return <GridView ref={viewRef} entity={entity} parentId={parentId} />
      }
    }
  }

  return (
    <MainPlacementContainer>
      <MainPlacementContent>
        {parentId ? (
            <>
              <TopBar
                  entity={entity}
                  parentId={parentId}
                  title={titleData?.name}
                  onCloseSlider={handleReload}
                  onClosePopup={handleReload}
                  viewMode={viewMode}
              />
              {renderContentView()}
            </>
        ) : (
            <MainStartScreen>
              <img src={webmensLogo} alt="webmens logo" />
            </MainStartScreen>
        )}
      </MainPlacementContent>
    </MainPlacementContainer>

  );
}
