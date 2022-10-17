import { useCallback, useLayoutEffect } from "react";
import { useAppDispatch } from "../../../app/store/hooks";
import { Item } from "../../../components/menu/types";
import { useLazyGetTabsQuery } from "../mainApi";
import { setCurrentTab } from "../mainSlice";

export const useMenuData = (menuId: number = 1) => {
  const dispatch = useAppDispatch();
  const [getTabs, tabs] = useLazyGetTabsQuery();

  useLayoutEffect(() => {
    getTabs(menuId);
  }, [getTabs, menuId]);

  const setTab = useCallback(
    (tab: Item) => {
      dispatch(setCurrentTab(tab));
    },
    [dispatch],
  );

  return { tabs, setTab };
};
