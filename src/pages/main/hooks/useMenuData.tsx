import { useCallback, useLayoutEffect } from "react";
import { useLazyGetTabsQuery } from "../mainApi";
import { useAppDispatch } from "../../../app/store/hooks";
import { setCurrentTab } from "../mainSlice";
import { Item } from "@webmens-ru/ui_lib/dist/components/menu/types";

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
