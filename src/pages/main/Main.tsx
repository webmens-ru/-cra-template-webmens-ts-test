import { useSetTabsMutation } from ".";
import useNavigation from "../../app/hooks/useNavigation";
import { useAppSelector } from "../../app/store/hooks";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";
import { Loader } from "../../components/loader";
import { Menu } from "../../components/menu";
import type { MenuItem } from "../../components/menu/types";
import { TopBar } from "./components/TopBar";
import { useData } from "./hooks/useData";
import { useMenuData } from "./hooks/useMenuData";
import { MainContainer, MainContent, MainStartScreen } from "./mainStyle";
import { GridView } from "./components/views/GridView";
import { TimelineView } from "./components/views/TimelineView";
import { useRef } from "react";

export function Main({ menuId = 1 }: { menuId?: number }) {
  const { mainSlice } = useAppSelector(state => state)
  const { tabs, isLoading: tabsLoading, setTab } = useMenuData(menuId);
  const [itemsMutation] = useSetTabsMutation();
  const { reload } = useData({ entity: mainSlice.currentTab.params?.entity });
  const navigate = useNavigation()

  const viewRef = useRef<any>(null)

  const handleSliderOpen = (item: MenuItem) => {
    navigate({
      type: item.type,
      // @ts-ignore
      url: item.type === "openApplication" ? item.params.iframeUrl : item.params.url,
      params: item.params,
      // @ts-ignore
      width: item.params.bx24_width
    })
  }

  const renderContent = () => {
    if (!mainSlice.currentTab.params?.entity) {
      return (
        <MainStartScreen>
          <img src={webmensLogo} alt="webmens logo" />
        </MainStartScreen>
      );
    }

    return (
      <>
        <TopBar
          entity={mainSlice.currentTab.params.entity}
          title={mainSlice.currentTab.title}
          onCloseSlider={viewRef.current?.reload}
          onClosePopup={viewRef.current?.reload}
          viewMode={mainSlice.currentTab.params.viewMode}
        />
        {renderContentView()}
      </>
    )
  };

  const renderContentView = () => {
    if (!mainSlice.isLoading && mainSlice.filterInited) {
      switch (mainSlice.currentTab.params.viewMode) {
        case 'grid':
          return <GridView ref={viewRef} entity={mainSlice.currentTab.params.entity} />
        case 'resource-timeline':
          return <TimelineView entity={mainSlice.currentTab.params.entity} />
        default: 
          return <GridView ref={viewRef} entity={mainSlice.currentTab.params.entity} />
      }
    }
  }

  if (tabsLoading) return <Loader />;

  return (
      <MainContainer>
        <Menu
          items={tabs}
          setItem={setTab}
          itemsMutation={itemsMutation}
          sliderOpenner={handleSliderOpen}
        />
        <MainContent>
          {renderContent()}
        </MainContent>
      </MainContainer>
  );
}
