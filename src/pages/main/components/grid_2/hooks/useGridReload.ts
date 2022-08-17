import { useState } from "react";

export default function useGridReload() {
  const [gridKey, setGridKey] = useState(0)

  function reloadGrid() {
    setGridKey(Math.random())
  }

  return { gridKey, reloadGrid }
}
