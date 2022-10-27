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
    const path: string = opt.path || opt.params.path
    try {
      console.log(path);
      switch (path) {
        case "mainDetail":
          const mainDetailsProps = "params" in opt.params ? opt.params.params : opt.params
          return <MainDetail {...mainDetailsProps} />;
        case "mainForm":
          const mainFormProps = "params" in opt.params ? opt.params.params : {
            ...opt.params,
            id: opt?.id
          }
          return <MainForm {...mainFormProps} />;
        case "mainPlacement":
          const mainPlacementProps = "params" in opt.params ? opt.params.params : {
            entity: opt.entity,
            parentId: opt.parentId
          }
          return <MainPlacement {...mainPlacementProps} />;
        default:
          const mainProps = "params" in opt.params ? opt.params.params : {
            menuId: opt.menuId
          }
          return <Main {...mainProps} />
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

    return switchPath(pathObj);
  }
  return <Main />;
}

export default App;

