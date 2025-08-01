import { setCheckboxes, setFilterResponse, setPage, setSchema, useEditRowMutation, useSaveSchemaMutation, useSetTabsMutation } from ".";
import useNavigation from "../../app/hooks/useNavigation";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import webmensLogo from "../../assets/logo/WebMens_407-268.png";
import { GridWrapper } from "../../components/GridWrapper";
import { Loader } from "../../components/loader";
import { Menu } from "../../components/menu";
import type { Item } from "../../components/menu/types";
import { TopBar } from "./components/TopBar";
import { useData } from "./hooks/useData";
import { useMenuData } from "./hooks/useMenuData";
import { MainContainer } from "./mainStyle";
import ResourceTimeLineWrapper from "../../components/ResourceTimeLineWrapper";

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

  const handleSliderOpen = (item: Item) => {
    navigate({
      type: item.type,
      // @ts-ignore
      url: item.type === "openApplication" ? item.params.iframeUrl : item.params.url,
      params: item.params,
      // @ts-ignore
      width: item.params.bx24_width
    })
  }
// console.log(mainSlice.currentTab.params.viewMode)
//   return (
//     <>
//       <Menu
//         items={tabs.data}
//         setItem={setTab}
//         itemsMutation={itemsMutation}
//         sliderOpenner={handleSliderOpen}
//       />
//       {isCorrect ? (
//         <>
//           <TopBar
//             onCloseSlider={reload}
//             onClosePopup={reload}
//           />
//           <GridWrapper
//             slice={{ ...mainSlice, entity: mainSlice.currentTab.params.entity }}
//             api={mainApi}
//             onShemaMutation={schemaMutation}
//             onRowMutation={rowMutation}
//             checkboxesSetter={setCheckboxes}
//             schemaSetter={setSchema}
//             filterSetter={setFilterResponse}
//             onCloseSlider={reload}
//             onClosePopup={reload}
//             onNavigate={(page) => dispatch(setPage(page))}
//           />
//         </>
//       ) : (
//         <MainContainer>
//           <img src={webmensLogo} alt="webmens logo" />
//         </MainContainer>
//       )}
//     </>
//   );

  // console.log(mainSlice.currentTab.params.viewMode);

  const renderContent = () => {
    if (!isCorrect) {
      return (
          <MainContainer>
            <img src={webmensLogo} alt="webmens logo" />
          </MainContainer>
      );
    }

    switch (mainSlice.currentTab.params.viewMode) {
      case 'grid':
        return (
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
        );
      case 'resource-time-line':
        return <>
          <TopBar
              onCloseSlider={reload}
              onClosePopup={reload}
          />
          <ResourceTimeLineWrapper/>
        </>
      default:
        return (
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
        );
    }
  };

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
