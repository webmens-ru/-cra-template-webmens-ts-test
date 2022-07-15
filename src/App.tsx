import React, { useMemo } from "react";
import { Main } from "./pages/main";

function App() {
  const router = useMemo(() => {
    let params: { [key: string]: any } = {};
    if (process.env.NODE_ENV === "production") {
      params = window._PARAMS_.placementOptions;
    } else {
      const pathArr = window.location.pathname
        .replace("/", "")
        .split("&")
        .map((item) => item.split("="))
        .flat();
      for (let i = 0; i < pathArr.length; i += 2) {
        params[pathArr[i]] = pathArr[i + 1];
      }
    }
    if (!params) return <h1>error</h1>;
    switch (params.entity) {
      // case "taskstatistics/all-in-work":
      //   return <AllInWorks />;
      // case "taskstatistics/leader-effectiveness":
      //   return <LeaderEff menuId={params.menuId}/>
      // case "taskstatistics/task-report":
      //   return <TaskReport menuId={params.menuId}/>
      // case "taskstatistics/personal-efficiency":
      //   return <PersonalEff menuId={params.menuId}/>
      default:
        return <Main menuId={params.menuId} />;
    }
  }, []);

  return router;
}

export default App;
// npx create-react-app dir_name --template webmens-ts