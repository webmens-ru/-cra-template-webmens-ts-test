import { useEffect } from "react";
import { Main } from "./pages/main";
import MainCard from "./pages/mainCard/MainCard";
import { MainDetail } from "./pages/mainDetail";
import MainForm from "./pages/mainForm/mainForm";
import MainPlacement from "./pages/mainPlacement/MainPlacement";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const size = BX24.getScrollSize()
      BX24.resizeWindow(size.scrollWidth, size.scrollHeight - 5)
    }
  }, [])
  const switchPath = (opt: TPlacementOptions) => {
    try {
      switch (opt.path) {
        case "mainDetail":
          return <MainDetail title={opt.mainDetailTitle} entity={opt.entity} body={opt.queryParams} />;
        case "mainForm":
          console.log(opt)
          if ('params' in opt) {
            opt = {
              ...opt,
              ...opt.params
            };
          }
          return <MainForm mode={opt.mode} entity={opt.entity} action={opt.action} id={opt?.id} canToggleMode={opt?.canToggleMode} defaultValue={opt?.defaultValue}/>;
        case "mainPlacement":
          return <MainPlacement entity={opt.entity} parentId={opt.parentId} />;
        case "mainCard":
        case "mainCardChildren":
          // return <MainCard entity={opt.entity} parentId={opt.id} menuId={opt.menuId} path={opt.path} title={opt.title} />
          return <MainCard entity={"this-year-form"} parentId={86} menuId={7} path={opt.path} />
        default:
          return <Main menuId={opt.menuId}/>
      }
    } catch (error) {
      console.log([error, 'error']);
      return <Main />
    }
  };

  if (process.env.NODE_ENV === "production") {
    return switchPath(window._PARAMS_.placementOptions);
  }
  if (process.env.NODE_ENV === "development") {
    const pathArr = window.location.pathname
      .replace("/", "")
      .split("&")
      .map((item) => item.split("="))
      .flat();
    const pathObj: any = {};
    for (let i = 0; i < pathArr.length; i += 2) {
      pathObj[pathArr[i]] = pathArr[i + 1];
    }

    console.log(pathObj)

    return switchPath(pathObj);
  }
  return <Main />;
}

export default App;

