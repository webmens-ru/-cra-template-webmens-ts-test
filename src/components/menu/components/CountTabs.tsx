import { useEffect } from "react";
import { useCustomContext } from "../store";

export default function CountTabs() {
  const { state, dispatch } = useCustomContext();

  useEffect(() => {
    if (state.isReadyForRender) {
      const visibleItems = state.items.filter((tab) => tab.visible);
      let count = visibleItems.length;
      for (let i = 0, sum = 0; i < visibleItems.length; i++) {
        sum += (visibleItems[i]?.width || 0) + 25;
        if (sum > document.body.clientWidth) {
          count = i;
          break;
        }
      }
      if (count !== state.countTopItems) {
        dispatch({type: 'set_count_top_items', count})
      }
    }
  }, [dispatch, state.countTopItems, state.isReadyForRender, state.items]);

  return null;
}
