import { setFilterResponse, useSetTabsMutation } from ".";
import useNavigation from "../../app/hooks/useNavigation";
import { useAppSelector } from "../../app/store/hooks";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";
import { Loader } from "../../components/loader";
import { Menu } from "../../components/menu";
import type { MenuItem } from "../../components/menu/types";
import { TopBar } from "./components/TopBar";
import { useData } from "./hooks/useData";
import { useMenuData } from "./hooks/useMenuData";
import { MainContainer } from "./mainStyle";
import ResourceTimeLineWrapper from "../../components/ResourceTimeLineWrapper";
import { GridView } from "./components/views/GridView";
import TimelineView from "./components/views/TimelineView";

export function Main({ menuId = 1 }: { menuId?: number }) {
  const { mainSlice } = useAppSelector(state => state)
  const { tabs, setTab } = useMenuData(menuId);
  const [itemsMutation] = useSetTabsMutation();
  const { isCorrect, reload } = useData();
  const navigate = useNavigation()

  if (tabs.isLoading) return <Loader />;

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
    if (!isCorrect) {
      return (
        <MainContainer>
          <img src={webmensLogo} alt="webmens logo" />
        </MainContainer>
      );
    }

    return (
      <>
        <TopBar
          onCloseSlider={reload}
          onClosePopup={reload}
        />
        {renderContentView()}
      </>
    )
  };

  const renderContentView = () => {
    if (!mainSlice.isLoading && mainSlice.filterInited) {
      switch (mainSlice.currentTab.params.viewMode) {
        case 'grid':
          return <GridView />
        // @ts-ignore
        case 'resource-timeline':
          return (
            <TimelineView />
          )
      }
    }
  }

  return (
      <>
        <Menu
            items={tabs.data}
            setItem={setTab}
            itemsMutation={itemsMutation}
            sliderOpenner={handleSliderOpen}
        />
        {renderContent()}
      </>
  );
}
