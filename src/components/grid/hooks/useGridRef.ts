import { useState, useRef, useEffect } from "react";
import { DataGridHandle } from "react-data-grid";

export default function useGridRef() {
  const gridRef = useRef<DataGridHandle>(null)
  const [refReady, setRefReady] = useState(false)

  useEffect(() => {
    if (gridRef.current) {
      setRefReady(true)
    }
  }, [gridRef])

  return { gridRef, refReady }
}
