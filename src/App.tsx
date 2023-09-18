import { useEffect } from "react";
import { useAppSelector } from "./app/store/hooks";
import { Slider } from "./components/slider";
import { Main } from "./pages/main";
import MainCard from "./pages/mainCard/MainCard";
import { MainDetail } from "./pages/mainDetail";
import MainForm from "./pages/mainForm/mainForm";
import MainIframe from "./pages/mainIframe/mainIframe";
import MainPlacement from "./pages/mainPlacement/MainPlacement";

function App({ placementOptions }: { placementOptions?: TPlacementOptions }) {
  const { show: showSlider, ...sliderProps } = useAppSelector(store => store.sliderSlice)
  
  useEffect(() => {
    // if (process.env.NODE_ENV === "production") {
    //   const size = BX24.getScrollSize()
    //   BX24.resizeWindow(size.scrollWidth, size.scrollHeight - 5)
    // }
  }, [])

  const stringToBoolean = (value?: string|boolean) => {
    if (value === undefined || value === null|| value === true|| value === false ) return value

    return value === "true"
  }

  const switchPath = (opt: TPlacementOptions) => {

    try {
      switch (opt?.path) {
        case "mainDetail":
          return <MainDetail title={opt.mainDetailTitle} entity={opt.entity} body={opt.queryParams} parentId={opt.parentId} />;
        case "mainForm":
          if ('params' in opt) {
            opt = {
              ...opt,
              ...opt.params
            };
          }
          return (
            <MainForm
              mode={opt.mode}
              entity={opt.entity} 
              action={opt.action} 
              id={opt?.id} 
              canToggleMode={stringToBoolean(opt?.canToggleMode)} 
              closeSliderOnSubmit={stringToBoolean(opt.closeSliderOnSubmit)} 
              defaultValue={opt?.defaultValue}
            />
          );
        case "mainPlacement":
          return <MainPlacement entity={opt.entity} parentId={opt.parentId} />;
        case "mainCard":
        case "mainCardChildren":
          // return <MainCard entity={opt.entity} parentId={opt.id} menuId={opt.menuId} path={opt.path} title={opt.title} />
          return (
            <MainCard
              parentId={opt.id}
              entity={opt.params.entity}
              menuId={opt.params.menuId}
              path={opt.path}
              form={{
                entity: opt.params.entity,
                closeSliderOnSubmit: stringToBoolean(opt.params.closeSliderOnSubmit),
                 ...opt.params.form
              }}
            />
          )
        case "mainIframe":
          return <MainIframe src={opt.params.link} />
        default:
          return <Main menuId={opt.menuId}/>
      }
    } catch (error) {
      console.error([error, 'error']);
      return <Main />
    }
  };

  return (
    <>
      {switchPath(placementOptions || window._PARAMS_.placementOptions)}
      <Slider
        {...sliderProps}
        show={showSlider}
      />
    </>
  )

  // if (process.env.NODE_ENV === "production") {
  //   return switchPath(window._PARAMS_.placementOptions);
  // }
  // if (process.env.NODE_ENV === "development") {
  //   const pathArr = window.location.pathname
  //     .replace("/", "")
  //     .split("&")
  //     .map((item) => item.split("="))
  //     .flat();
  //   const pathObj: any = {};
  //   for (let i = 0; i < pathArr.length; i += 2) {
  //     pathObj[pathArr[i]] = pathArr[i + 1];
  //   }

    console.log(pathObj)

    return switchPath(pathObj);
  }
  return <Main />;
}

export default App;

