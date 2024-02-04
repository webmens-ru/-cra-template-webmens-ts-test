import { Loader, Menu } from "@webmens-ru/ui_lib";
import { Item as MenuItem } from "@webmens-ru/ui_lib/dist/components/menu/types";
import { setCheckboxes, setFilterResponse, setPage, setSchema, useEditRowMutation, useSaveSchemaMutation, useSetTabsMutation } from ".";
import useNavigation from "../../app/hooks/useNavigation";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";
import { GridWrapper } from "../../components/GridWrapper";
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
