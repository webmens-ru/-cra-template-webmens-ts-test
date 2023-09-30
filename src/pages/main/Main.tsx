import { Loader, Menu } from "@webmens-ru/ui_lib";
import { setCheckboxes, setFilterResponse, setPage, setSchema, useEditRowMutation, useSaveSchemaMutation, useSetTabsMutation } from ".";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";
import { GridWrapper } from "../../components/GridWrapper";
import { SliderProps } from "../../components/slider";
import useSlider from "../../components/slider/hooks/useSlider";
import { TopBar } from "./components/TopBar";
import { useData } from "./hooks/useData";
import { useMenuData } from "./hooks/useMenuData";
import { MainContainer } from "./mainStyle";

export function Main({ menuId = 1 }: { menuId?: number }) {
  const dispatch = useAppDispatch()
  const { mainSlice, mainApi } = useAppSelector(state => state)
  const { tabs, setTab } = useMenuData(menuId);
  const [itemsMutation] = useSetTabsMutation();
  const [schemaMutation] = useSaveSchemaMutation()
  const [rowMutation] = useEditRowMutation()
  const { isCorrect, reload } = useData();
  const sliderService = useSlider()

  if (tabs.isLoading) return <Loader />;

  const handleSliderOpen = (item: any) => {
    let sliderProps: SliderProps

    switch (item.type) {
      case "openApplication":
        sliderProps = {
          type: "iframe",
          typeParams: { iframeUrl: item.params.iframeUrl },//TODO iframeUrl BX24
          placementOptions: item.params,
          width: item.params.width,
          onClose: () => sliderService.hide()
        }
        sliderService.show(sliderProps)
        break;
      case "openApplicationPortal":
        // @ts-ignore
        sliderProps = {
          type: "content",
          placementOptions: item.params,
          onClose: () => sliderService.hide()
        }
        break;
      case "openPath":
        sliderProps = {
          type: "iframe",
          typeParams: { iframeUrl: item.params.url },
          onClose: () => sliderService.hide()
        }
        break;
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
      {isCorrect ? (
        <>
          <TopBar
            onCloseSlider={reload}
            onClosePopup={reload}
          />
          <GridWrapper
            slice={{ ...mainSlice, entity: mainSlice.currentTab.params.entity }}
            api={mainApi}
            onShemaMutation={schemaMutation}
            onRowMutation={rowMutation}
            checkboxesSetter={setCheckboxes}
            schemaSetter={setSchema}
            filterSetter={setFilterResponse}
            onCloseSlider={reload}
            onClosePopup={reload}
            onNavigate={(page) => dispatch(setPage(page))}
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
