import { Loader, Menu } from "@webmens-ru/ui_lib";
import { setCheckboxes, setFilterResponse, setSchema, useSaveSchemaMutation, useSetTabsMutation } from ".";
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
  const { isCorrect, reload } = useData();

  if (tabs.isLoading) return <Loader />;

  return (
    <>
      {/* @ts-ignore */}
      <Menu items={tabs.data} menuStyle="main" setItem={setTab} itemsMutation={itemsMutation} />
      {isCorrect ? (
        <>
          <TopBar
            onCloseSlider={reload}
            onClosePopup={reload}
          />
          <GridWrapper
            slice={{ ...mainSlice, entity: mainSlice.currentTab.params.entity }}
            api={mainApi}
            dispatch={dispatch}
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
