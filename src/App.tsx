import { useEffect } from "react";
import { Main } from "./pages/main";
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
          if ('params' in opt) {
            opt = {
              ...opt,
              ...opt.params
            };
          }
          return <MainForm mode={opt.mode} entity={opt.entity} action={opt.action} id={opt?.id} canToggleMode={opt?.canToggleMode}/>;
        case "mainPlacement":
          return <MainPlacement entity={opt.entity} parentId={opt.parentId}/>;
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
    const urlParams = new URLSearchParams(document.location.search)
    const objParams = Object.fromEntries(urlParams) as TPlacementOptions

    return switchPath(objParams);
  }
  return <Main />;
}

export default App;

